function rad50(s) {
    var v1 = 0;
    var v2 = 0;

    function charToIndex(c) {
        if (c >= 'A' && c <= 'Z')
            return c.charCodeAt(0) - 64;
        else if (c >= 'a' && c <= 'z')
            return c.charCodeAt(0) - 96;
        else if (c >= '0' && c <= '9')
            return c.charCodeAt(0) - 18;
        else if (c == '$')
            return 27;
        else if (c == '.')
            return 28;
        else if (c == '%')
            return 29;
        return 0;
    }

    for (var ii = 0; ii < 6; ++ii) {
        const c = (ii < s.length ? s.charAt(ii) : ' ');

        if (ii < (6 / 2)) {
            v1 *= 40;
            v1 += charToIndex(c);
        } else {
            v2 *= 40;
            v2 += charToIndex(c);
        }
    }
    return (v2 << 16) | v1;
}

function rad50ToString(r50) {
    const chars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ$.%0123456789";
    var s = [];
    var v1 = r50 & 0xffff;
    var v2 = (r50 >> 16) & 0xffff;

    for (var ii = 0; ii < 3; ii++) {
        s[3 - ii - 1] = chars.charAt(v1 % 40);
        v1 /= 40;
        s[6 - ii - 1] = chars.charAt(v2 % 40);
        v2 /= 40;
    }
    return s.join('').trim();
}

function Status(f, e) {
    this.status = (e === undefined) ? f : (e * 256 + f);
}

Status.prototype.toString = function () {
    return `[${this.status & 255} ${Math.floor(this.status / 256)}]`;
};

Status.prototype.isGood = function () { return this.status >= 0; };

Status.prototype.isBad = function () { return this.status < 0; };

Status.prototype.equals = function (f, e) {
    return this.status === (f + e * 256);
};

// Test function that lets us build a binary from an array of numbers.

function bldbin(a) {
    const b = new ArrayBuffer(a.length);
    const u8 = new Uint8Array(b);

    for (var ii = 0; ii < a.length; ++ii)
        u8[ii] = a[ii];
    return b;
}

// Test function which dumps the contents of an ArrayBuffer (since the
// Javascript console only displays "ArrayBuffer", or something
// similarly useless.)

function dump(b, n = b.byteLength) {
    const hex = d => Number(d).toString(16).padStart(2, '0');
    const u8 = new Uint8Array(b, 0, Math.min(b.byteLength, n));
    var res = "[";

    for (let ii of u8)
        res += " " + hex(ii);
    return res + " ]";
}

function splitAddr(a) {
    const part = a.split('@');

    if (part.length === 2)
        return part;
    else
        throw new Error(`ACNET: invalid address -- ${a}`);
}

function getHost() {
    return "wss://www-bd.fnal.gov/acnet-ws";
}

// Constructor of ACNET objects. An ACNET object manages a connection
// to 'acnetd' which allows a web application to perform ACNET
// communications.

function ACNET() {
    const obj = this;

    // No default callbacks for when we connect/disconnet with
    // 'acnetd'.

    this.onConnect = null;
    this.onDisconnect = null;
    this.tmpBuf = new ArrayBuffer(65536);
    this.ackq = [];
    this.handle = undefined;
    this.requests = {};

    const ACNET_DISCONNECT = new Status(1, -34);

    const bldNak = (() => {
        const nak = new ArrayBuffer(6);
        const dv = new DataView(nak);

        return s => {
            dv.setUint32(0, 0x00010000);
            dv.setInt16(4, s.status);
            return nak;
        }
    })();

    function prepSocket() {
        obj.ackq.push(function (d) {
            const dv = new DataView(d);

            if (dv.getUint32(2) === 0x00010000) {
                obj.handle = dv.getUint32(7);
                console.info("ACNET: connected as '" +
                    rad50ToString(obj.handle) + "'.");
            } else
                console.warn("ACNET: error receiving client handle -- " +
                    new Status(dv.getInt16(4)));
            if (obj.onConnect !== null)
                obj.onConnect(obj.handle);
        });

        function handleClose(e) {
            const errMsg = {
                sender: 0, status: ACNET_DISCONNECT, msg: null,
                last: true
            };

            // Loop through the open requests and send them a fatal
            // error message (indicating the request is closed. The
            // status of the error is ACNET_DISCONNECT.

            for (let ii in obj.requests)
                (obj.requests[ii])(errMsg);

            obj.requests = {};

            // Build a NAK packet indicating an ACNET disconnect.

            const nak = bldNak(ACNET_DISCONNECT);

            // Loop through pending commands and feed them the
            // disconnect status so they'll retry.

            for (let ii of obj.ackq)
                ii(nak);
            obj.ackq = [];

            if (obj.onDisconnect !== null)
                (obj.onDisconnect)();

            // delete this.socket.onclose;
            // this.socket.close();

            // Wait five seconds and then try to make a new connection
            // to ACNET.

            console.warn("ACNET: connection with acnetd is broken.");
            setTimeout(function (e) {
                console.info("ACNET: retrying connection.");
                prepSocket();
            }, 5000);
        }

        obj.socket = new WebSocket(getHost(), "acnet-client");
        obj.socket.binaryType = "arraybuffer";
        obj.socket.onclose = obj.socket.onerror = handleClose;

        obj.socket.onopen = function (e) {
            const dv = new DataView(obj.tmpBuf);

            dv.setUint32(0, 0x00010001);
            dv.setUint32(4, 0);
            dv.setUint32(8, 0);
            dv.setUint32(12, 0);
            dv.setUint16(16, 0);

            obj.socket.send(obj.tmpBuf.slice(0, 18));
        }

        obj.socket.onmessage = function (event) {
            const dv = new DataView(event.data);

            // If the first, 16-bit word of the packet is 2, then it's
            // a response to a command. Otherwise it's an ACNET header
            // and represents a reply to an active request.

            if (dv.getUint16(0) === 2) {
                const ack = obj.ackq.shift();

                if (ack !== undefined)
                    ack(event.data);
                else
                    console.info("ACNET: ignoring spurious ACK from acnetd.");
            } else {
                const s = new Status(dv.getInt16(4, true));
                const last = (dv.getUint16(2, true) & 1) === 0;

                if (!s.equals(1, 1) || last) {
                    const svr = dv.getUint16(6, false);
                    const rqid = dv.getUint16(16, true);
                    const msgLen = dv.getUint16(18, true);
                    const msg = msgLen > 18 ?
                        new DataView(event.data, 20, msgLen - 18) : null;

                    const shouldEnd =
                        (obj.requests[rqid])({
                            sender: svr, status: s,
                            msg: msg, last: last
                        });

                    if (shouldEnd === false && !last) {
                        const b = new ArrayBuffer(14);

                        dv = new DataView(b);
                        dv.setUint32(0, 0x00010008);
                        dv.setUint32(4, obj.handle);
                        dv.setUint16(12, rqid);
                        obj.socket.send(b);
                        obj.ackq.push(d => undefined);
                        delete obj.requests[rqid];
                    } else if (last)
                        delete obj.requests[rqid];
                }
            }
        }
    }

    prepSocket();
};

// Low-level send command. If the socket isn't ready, the send request
// is queued up and delivered when we have a valid connection.

ACNET.prototype.send = function (b, f) {
    this.socket.send(b);
    this.ackq.push(f);
};

ACNET.prototype.isConnected = function () {
    return this.socket.readyState === 1;
};

ACNET.prototype.notifyOnConnect = function (f) {
    const tmp = this.onConnect;

    this.onConnect =
        (tmp === null) ? f :
            function (v) {
                tmp(v);
                f(v);
            };

    // If we're connected, call the handler.

    if (this.isConnected())
        f(this.handle);
};

ACNET.prototype.notifyOnDisconnect = function (f) {
    const tmp = this.onDisconnect;

    this.onDisconnect =
        (tmp === null) ? f :
            function () {
                f();
                tmp();
            };
};

// Sends a request to acnetd to translate a RAD50 name to a trunk/node
// address. The result is given to the function specified by the
// second argument. If the name was successfully found, an integer
// representing the address is passed. Any error results in
// 'undefined' being passed.

ACNET.prototype.getNode = function (name, f) {
    const b = new ArrayBuffer(16);
    const dv = new DataView(b);

    function decode(d) {
        const dv = new DataView(d, 2);
        const s = new Status(dv.getInt16(2));

        f(dv.getUint16(0) === 4 && s.isGood() ? dv.getUint16(4) : s);
    }

    dv.setUint32(0, 0x0001000b);
    dv.setUint32(12, rad50(name));
    this.send(b, decode);
};

// Appends to an ArrayBuffer another ArrayBuffer or a marshalled
// message.

ACNET.prototype.appendPayload = function (dv, o, obj) {
    if (obj.marshal === undefined) {
        const ov = new DataView(obj);

        for (var ii = 0; ii < obj.byteLength; ++ii)
            dv.setUint8(ii + o, ov.getUint8(ii));
        return ii + o;
    } else {
        for (let ii of obj.marshal())
            dv.setUint8(o++, ii);
        return o;
    }
};

ACNET.prototype.makeRequest = function (dst, mult, obj, tmo, cb) {
    const part = splitAddr(dst);
    const c = this;
    const realCb = cb === undefined ? function () { } : cb;

    // Sends the request to the specified node.

    function sendReq(node) {
        function decodeReqAck(d) {
            const dv = new DataView(d, 2);
            const s = new Status(dv.getInt16(2));

            if (s.isBad())
                realCb({ status: s, msg: null, sender: 0, last: true });
            else
                c.requests[dv.getUint16(4)] = realCb;
        };

        // 'node' is an integer or a status, if there was an error
        // lookup up the node name.

        if (!(node instanceof Status)) {
            const dv = new DataView(c.tmpBuf);

            // Build the request packet header.

            dv.setUint32(0, 0x00010012);
            dv.setUint32(4, c.handle);
            dv.setUint32(12, rad50(part[0]));
            dv.setUint16(16, node);
            dv.setUint16(18, mult);
            dv.setUint32(20, tmo);

            // Send the packet. Specify decodeReqAck() as the
            // recipient function (it'll forward the result to the
            // user's callback.)

            c.send(c.tmpBuf.slice(0, c.appendPayload(dv, 24, obj)),
                decodeReqAck);
        } else
            console.warn("ACNET: " + node.toString() +
                " looking up destination node.");
    };

    // If the node name starts with '#', we have a trunk/node value
    // which doesn't require a lookup.

    if (part[1][0] == "#")
        sendReq(part[1].slice(1));
    else
        this.getNode(part[1], sendReq);
};

// Lets a client send a request to the specified destination. The
// destination is given in "TASK@NODE" format.

ACNET.prototype.oneshot = function (dst, obj, tmo, cb) {
    this.makeRequest(dst, 0, obj, tmo, cb);
};

ACNET.prototype.stream = function (dst, obj, tmo, cb) {
    this.makeRequest(dst, 1, obj, tmo, cb);
};

// Local Variables:
// mode:javascript
// tab-width:4
// End:
