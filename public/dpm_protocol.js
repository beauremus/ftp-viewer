if (DPM_PROTO === undefined) {
    var DPM_PROTO = {};

    // Define enumerations of the protocol.

    DPM_PROTO.enum = {

    };

    // Define user-defined structures of the protocol.

    // Define requests of the protocol.

    var DPM_request_ServiceDiscovery = function () {
    };

    DPM_request_ServiceDiscovery.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 223, 218, 81, 0]);
    };

    var DPM_request_OpenList = function () {
    };

    DPM_request_OpenList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 8, 28, 81, 0]);
    };

    var DPM_request_AddToList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.drf_request = "";
    };

    DPM_request_AddToList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 17, 97, 81, 6]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 99, 36]);
	PROTOCOL.m_string(d, this.drf_request);
    };

    var DPM_request_RemoveFromList = function () {
	this.list_id = 0;
	this.ref_id = 0;
    };

    DPM_request_RemoveFromList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 241, 33, 81, 4]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
    };

    var DPM_request_StartList = function () {
	this.list_id = 0;
	this.model = null;
    };

    DPM_request_StartList.prototype.marshal = function (d) {
	function countNulls() {
	    return (this.model === null ? 1 : 0);
	}

	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 221, 181]);
	PROTOCOL.m_tagged_int(0x50, d, (2 - countNulls()) * 2);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	if (this.model !== null) {
	    PROTOCOL.m_content(d, [18, 94, 99]);
	    PROTOCOL.m_string(d, this.model);
	}
    };

    var DPM_request_ClearList = function () {
	this.list_id = 0;
    };

    DPM_request_ClearList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 195, 9, 81, 2]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
    };

    var DPM_request_StopList = function () {
	this.list_id = 0;
    };

    DPM_request_StopList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 83, 169, 81, 2]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
    };

    DPM_PROTO.u_request_ServiceDiscovery = function (d) {
	if (PROTOCOL.u_tagged_int(0x50, d) !== 0)
	    throw "unknown field when building DPM_request_ServiceDiscovery";
	return new DPM_request_ServiceDiscovery();
    };

    DPM_PROTO.u_request_OpenList = function (d) {
	if (PROTOCOL.u_tagged_int(0x50, d) !== 0)
	    throw "unknown field when building DPM_request_OpenList";
	return new DPM_request_OpenList();
    };

    DPM_PROTO.u_request_AddToList = function (d) {
	var v = new DPM_request_AddToList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 25380:
		v.drf_request = PROTOCOL.u_string(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building DPM_request_AddToList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building DPM_request_AddToList";
	return v;
    };

    DPM_PROTO.u_request_RemoveFromList = function (d) {
	var v = new DPM_request_RemoveFromList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building DPM_request_RemoveFromList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building DPM_request_RemoveFromList";
	return v;
    };

    DPM_PROTO.u_request_StartList = function (d) {
	var v = new DPM_request_StartList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 24163:
		v.model = PROTOCOL.u_string(d);
		break;
	     default:
		throw "unknown field when building DPM_request_StartList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 1)
	    throw "required fields missing when building DPM_request_StartList";
	return v;
    };

    DPM_PROTO.u_request_ClearList = function (d) {
	var v = new DPM_request_ClearList();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building DPM_request_ClearList";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -6112)
	    throw "unknown field when building DPM_request_ClearList";
	v.list_id = PROTOCOL.u_int(d);
	return v;
    }

    DPM_PROTO.u_request_StopList = function (d) {
	var v = new DPM_request_StopList();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building DPM_request_StopList";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -6112)
	    throw "unknown field when building DPM_request_StopList";
	v.list_id = PROTOCOL.u_int(d);
	return v;
    }

    // Define replies of the protocol.

    var DPM_reply_ServiceDiscovery = function () {
	this.load = 0;
	this.serviceLocation = "";
    };

    DPM_reply_ServiceDiscovery.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 205, 126, 81, 4]);
	PROTOCOL.m_content(d, [18, 30, 179]);
	PROTOCOL.m_int(d, this.load);
	PROTOCOL.m_content(d, [18, 17, 175]);
	PROTOCOL.m_string(d, this.serviceLocation);
    };

    var DPM_reply_OpenList = function () {
	this.list_id = 0;
    };

    DPM_reply_OpenList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 52, 158, 81, 2]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
    };

    var DPM_reply_AddToList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    DPM_reply_AddToList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 139, 172, 81, 6]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var DPM_reply_RemoveFromList = function () {
	this.list_id = 0;
	this.ref_id = 0;
	this.status = 0;
    };

    DPM_reply_RemoveFromList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 244, 26, 81, 6]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var DPM_reply_StartList = function () {
	this.list_id = 0;
	this.status = 0;
    };

    DPM_reply_StartList.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 150, 0, 81, 4]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var DPM_reply_ListStatus = function () {
	this.list_id = 0;
	this.status = 0;
    };

    DPM_reply_ListStatus.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 115, 112, 81, 4]);
	PROTOCOL.m_content(d, [18, 232, 32]);
	PROTOCOL.m_int(d, this.list_id);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var DPM_reply_Status = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
    };

    DPM_reply_Status.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 214, 173, 81, 8]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
    };

    var DPM_reply_DeviceInfo = function () {
	this.ref_id = 0;
	this.di = 0;
	this.name = "";
	this.description = "";
	this.units = null;
	this.format_hint = null;
    };

    DPM_reply_DeviceInfo.prototype.marshal = function (d) {
	function countNulls() {
	    return (this.units === null ? 1 : 0) +
		(this.format_hint === null ? 1 : 0);
	}

	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 111, 237]);
	PROTOCOL.m_tagged_int(0x50, d, (4 - countNulls()) * 2);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 130, 221]);
	PROTOCOL.m_int(d, this.di);
	PROTOCOL.m_content(d, [18, 147, 28]);
	PROTOCOL.m_string(d, this.name);
	PROTOCOL.m_content(d, [18, 249, 44]);
	PROTOCOL.m_string(d, this.description);
	if (this.units !== null) {
	    PROTOCOL.m_content(d, [18, 61, 251]);
	    PROTOCOL.m_string(d, this.units);
	}
	if (this.format_hint !== null) {
	    PROTOCOL.m_content(d, [18, 126, 194]);
	    PROTOCOL.m_int(d, this.format_hint);
	}
    };

    var DPM_reply_Scalar = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = 0;
    };

    DPM_reply_Scalar.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 214, 171, 81, 10]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 127, 56]);
	PROTOCOL.m_float(d, this.data);
    };

    var DPM_reply_ScalarArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };

    DPM_reply_ScalarArray.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 89, 252, 81, 10]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 127, 56]);
	PROTOCOL.m_array(d, this.data, PROTOCOL.m_float);
    };

    var DPM_reply_Raw = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = new ArrayBuffer();
    };

    DPM_reply_Raw.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 207, 94, 81, 10]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 127, 56]);
	PROTOCOL.m_binary(d, this.data);
    };

    var DPM_reply_Text = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = "";
    };

    DPM_reply_Text.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 143, 50, 81, 10]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 127, 56]);
	PROTOCOL.m_string(d, this.data);
    };

    var DPM_reply_TextArray = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.status = 0;
	this.data = [];
    };

    DPM_reply_TextArray.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 50, 123, 81, 10]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 68, 84]);
	PROTOCOL.m_int(d, this.status);
	PROTOCOL.m_content(d, [18, 127, 56]);
	PROTOCOL.m_array(d, this.data, PROTOCOL.m_string);
    };

    var DPM_reply_AnalogAlarm = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.minimum = 0;
	this.maximum = 0;
	this.alarm_enable = false;
	this.alarm_status = false;
	this.abort = false;
	this.abort_inhibit = false;
	this.tries_needed = 0;
	this.tries_now = 0;
    };

    DPM_reply_AnalogAlarm.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 117, 136, 81, 22]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 35, 76]);
	PROTOCOL.m_float(d, this.minimum);
	PROTOCOL.m_content(d, [18, 226, 136]);
	PROTOCOL.m_float(d, this.maximum);
	PROTOCOL.m_content(d, [18, 143, 32]);
	PROTOCOL.m_bool(d, this.alarm_enable);
	PROTOCOL.m_content(d, [18, 96, 54]);
	PROTOCOL.m_bool(d, this.alarm_status);
	PROTOCOL.m_content(d, [18, 74, 28]);
	PROTOCOL.m_bool(d, this.abort);
	PROTOCOL.m_content(d, [18, 129, 114]);
	PROTOCOL.m_bool(d, this.abort_inhibit);
	PROTOCOL.m_content(d, [18, 1, 50]);
	PROTOCOL.m_int(d, this.tries_needed);
	PROTOCOL.m_content(d, [18, 43, 62]);
	PROTOCOL.m_int(d, this.tries_now);
    };

    var DPM_reply_DigitalAlarm = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.nominal = 0;
	this.mask = 0;
	this.alarm_enable = false;
	this.alarm_status = false;
	this.abort = false;
	this.abort_inhibit = false;
	this.tries_needed = 0;
	this.tries_now = 0;
    };

    DPM_reply_DigitalAlarm.prototype.marshal = function (d) {
	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 199, 155, 81, 22]);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	PROTOCOL.m_content(d, [18, 79, 29]);
	PROTOCOL.m_int(d, this.nominal);
	PROTOCOL.m_content(d, [18, 17, 235]);
	PROTOCOL.m_int(d, this.mask);
	PROTOCOL.m_content(d, [18, 143, 32]);
	PROTOCOL.m_bool(d, this.alarm_enable);
	PROTOCOL.m_content(d, [18, 96, 54]);
	PROTOCOL.m_bool(d, this.alarm_status);
	PROTOCOL.m_content(d, [18, 74, 28]);
	PROTOCOL.m_bool(d, this.abort);
	PROTOCOL.m_content(d, [18, 129, 114]);
	PROTOCOL.m_bool(d, this.abort_inhibit);
	PROTOCOL.m_content(d, [18, 1, 50]);
	PROTOCOL.m_int(d, this.tries_needed);
	PROTOCOL.m_content(d, [18, 43, 62]);
	PROTOCOL.m_int(d, this.tries_now);
    };

    var DPM_reply_BasicStatus = function () {
	this.ref_id = 0;
	this.timestamp = 0;
	this.cycle = 0;
	this.on = null;
	this.ready = null;
	this.remote = null;
	this.positive = null;
	this.ramp = null;
    };

    DPM_reply_BasicStatus.prototype.marshal = function (d) {
	function countNulls() {
	    return (this.on === null ? 1 : 0) +
		(this.ready === null ? 1 : 0) +
		(this.remote === null ? 1 : 0) +
		(this.positive === null ? 1 : 0) +
		(this.ramp === null ? 1 : 0);
	}

	PROTOCOL.m_content(d, [83, 68, 68, 2, 81, 3, 20, 177, 58, 112, 58, 18, 242, 249]);
	PROTOCOL.m_tagged_int(0x50, d, (3 - countNulls()) * 2);
	PROTOCOL.m_content(d, [18, 30, 171]);
	PROTOCOL.m_int(d, this.ref_id);
	PROTOCOL.m_content(d, [18, 213, 91]);
	PROTOCOL.m_int(d, this.timestamp);
	PROTOCOL.m_content(d, [18, 7, 64]);
	PROTOCOL.m_int(d, this.cycle);
	if (this.on !== null) {
	    PROTOCOL.m_content(d, [18, 92, 1]);
	    PROTOCOL.m_bool(d, this.on);
	}
	if (this.ready !== null) {
	    PROTOCOL.m_content(d, [18, 171, 35]);
	    PROTOCOL.m_bool(d, this.ready);
	}
	if (this.remote !== null) {
	    PROTOCOL.m_content(d, [18, 228, 134]);
	    PROTOCOL.m_bool(d, this.remote);
	}
	if (this.positive !== null) {
	    PROTOCOL.m_content(d, [18, 39, 22]);
	    PROTOCOL.m_bool(d, this.positive);
	}
	if (this.ramp !== null) {
	    PROTOCOL.m_content(d, [18, 146, 56]);
	    PROTOCOL.m_bool(d, this.ramp);
	}
    };

    DPM_PROTO.u_reply_ServiceDiscovery = function (d) {
	var v = new DPM_reply_ServiceDiscovery();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7859:
		v.load = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 4527:
		v.serviceLocation = PROTOCOL.u_string(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building DPM_reply_ServiceDiscovery";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building DPM_reply_ServiceDiscovery";
	return v;
    };

    DPM_PROTO.u_reply_OpenList = function (d) {
	var v = new DPM_reply_OpenList();

	if (PROTOCOL.u_tagged_int(0x50, d) !== 2)
	    throw "required fields missing when building DPM_reply_OpenList";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -6112)
	    throw "unknown field when building DPM_reply_OpenList";
	v.list_id = PROTOCOL.u_int(d);
	return v;
    }

    DPM_PROTO.u_reply_AddToList = function (d) {
	var v = new DPM_reply_AddToList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building DPM_reply_AddToList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building DPM_reply_AddToList";
	return v;
    };

    DPM_PROTO.u_reply_RemoveFromList = function (d) {
	var v = new DPM_reply_RemoveFromList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     default:
		throw "unknown field when building DPM_reply_RemoveFromList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building DPM_reply_RemoveFromList";
	return v;
    };

    DPM_PROTO.u_reply_StartList = function (d) {
	var v = new DPM_reply_StartList();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building DPM_reply_StartList";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building DPM_reply_StartList";
	return v;
    };

    DPM_PROTO.u_reply_ListStatus = function (d) {
	var v = new DPM_reply_ListStatus();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case -6112:
		v.list_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     default:
		throw "unknown field when building DPM_reply_ListStatus";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 3)
	    throw "required fields missing when building DPM_reply_ListStatus";
	return v;
    };

    DPM_PROTO.u_reply_Status = function (d) {
	var v = new DPM_reply_Status();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     default:
		throw "unknown field when building DPM_reply_Status";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 15)
	    throw "required fields missing when building DPM_reply_Status";
	return v;
    };

    DPM_PROTO.u_reply_DeviceInfo = function (d) {
	var v = new DPM_reply_DeviceInfo();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -32035:
		v.di = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case -27876:
		v.name = PROTOCOL.u_string(d);
		fflg[0] |= 4;
		break;
	     case -1748:
		v.description = PROTOCOL.u_string(d);
		fflg[0] |= 8;
		break;
	     case 15867:
		v.units = PROTOCOL.u_string(d);
		break;
	     case 32450:
		v.format_hint = PROTOCOL.u_int(d);
		break;
	     default:
		throw "unknown field when building DPM_reply_DeviceInfo";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 15)
	    throw "required fields missing when building DPM_reply_DeviceInfo";
	return v;
    };

    DPM_PROTO.u_reply_Scalar = function (d) {
	var v = new DPM_reply_Scalar();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 32568:
		v.data = PROTOCOL.u_float(d);
		fflg[0] |= 16;
		break;
	     default:
		throw "unknown field when building DPM_reply_Scalar";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building DPM_reply_Scalar";
	return v;
    };

    DPM_PROTO.u_reply_ScalarArray = function (d) {
	var v = new DPM_reply_ScalarArray();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 32568:
		v.data = PROTOCOL.u_array(d, PROTOCOL.u_float);
		fflg[0] |= 16;
		break;
	     default:
		throw "unknown field when building DPM_reply_ScalarArray";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building DPM_reply_ScalarArray";
	return v;
    };

    DPM_PROTO.u_reply_Raw = function (d) {
	var v = new DPM_reply_Raw();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 32568:
		v.data = PROTOCOL.u_binary(d);
		fflg[0] |= 16;
		break;
	     default:
		throw "unknown field when building DPM_reply_Raw";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building DPM_reply_Raw";
	return v;
    };

    DPM_PROTO.u_reply_Text = function (d) {
	var v = new DPM_reply_Text();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 32568:
		v.data = PROTOCOL.u_string(d);
		fflg[0] |= 16;
		break;
	     default:
		throw "unknown field when building DPM_reply_Text";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building DPM_reply_Text";
	return v;
    };

    DPM_PROTO.u_reply_TextArray = function (d) {
	var v = new DPM_reply_TextArray();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 17492:
		v.status = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 32568:
		v.data = PROTOCOL.u_array(d, PROTOCOL.u_string);
		fflg[0] |= 16;
		break;
	     default:
		throw "unknown field when building DPM_reply_TextArray";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 31)
	    throw "required fields missing when building DPM_reply_TextArray";
	return v;
    };

    DPM_PROTO.u_reply_AnalogAlarm = function (d) {
	var v = new DPM_reply_AnalogAlarm();
	var fflg = new Uint8Array(2);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 9036:
		v.minimum = PROTOCOL.u_float(d);
		fflg[0] |= 8;
		break;
	     case -7544:
		v.maximum = PROTOCOL.u_float(d);
		fflg[0] |= 16;
		break;
	     case -28896:
		v.alarm_enable = PROTOCOL.u_bool(d);
		fflg[0] |= 32;
		break;
	     case 24630:
		v.alarm_status = PROTOCOL.u_bool(d);
		fflg[0] |= 64;
		break;
	     case 18972:
		v.abort = PROTOCOL.u_bool(d);
		fflg[0] |= 128;
		break;
	     case -32398:
		v.abort_inhibit = PROTOCOL.u_bool(d);
		fflg[1] |= 1;
		break;
	     case 306:
		v.tries_needed = PROTOCOL.u_int(d);
		fflg[1] |= 2;
		break;
	     case 11070:
		v.tries_now = PROTOCOL.u_int(d);
		fflg[1] |= 4;
		break;
	     default:
		throw "unknown field when building DPM_reply_AnalogAlarm";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 255 || fflg[1] !== 7)
	    throw "required fields missing when building DPM_reply_AnalogAlarm";
	return v;
    };

    DPM_PROTO.u_reply_DigitalAlarm = function (d) {
	var v = new DPM_reply_DigitalAlarm();
	var fflg = new Uint8Array(2);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 20253:
		v.nominal = PROTOCOL.u_int(d);
		fflg[0] |= 8;
		break;
	     case 4587:
		v.mask = PROTOCOL.u_int(d);
		fflg[0] |= 16;
		break;
	     case -28896:
		v.alarm_enable = PROTOCOL.u_bool(d);
		fflg[0] |= 32;
		break;
	     case 24630:
		v.alarm_status = PROTOCOL.u_bool(d);
		fflg[0] |= 64;
		break;
	     case 18972:
		v.abort = PROTOCOL.u_bool(d);
		fflg[0] |= 128;
		break;
	     case -32398:
		v.abort_inhibit = PROTOCOL.u_bool(d);
		fflg[1] |= 1;
		break;
	     case 306:
		v.tries_needed = PROTOCOL.u_int(d);
		fflg[1] |= 2;
		break;
	     case 11070:
		v.tries_now = PROTOCOL.u_int(d);
		fflg[1] |= 4;
		break;
	     default:
		throw "unknown field when building DPM_reply_DigitalAlarm";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 255 || fflg[1] !== 7)
	    throw "required fields missing when building DPM_reply_DigitalAlarm";
	return v;
    };

    DPM_PROTO.u_reply_BasicStatus = function (d) {
	var v = new DPM_reply_BasicStatus();
	var fflg = new Uint8Array(1);
	var nFlds = PROTOCOL.u_tagged_int(0x50, d);

	while (nFlds > 0) {
	    switch (PROTOCOL.u_tagged_int(0x10, d)) {
	     case 7851:
		v.ref_id = PROTOCOL.u_int(d);
		fflg[0] |= 1;
		break;
	     case -10917:
		v.timestamp = PROTOCOL.u_int(d);
		fflg[0] |= 2;
		break;
	     case 1856:
		v.cycle = PROTOCOL.u_int(d);
		fflg[0] |= 4;
		break;
	     case 23553:
		v.on = PROTOCOL.u_bool(d);
		break;
	     case -21725:
		v.ready = PROTOCOL.u_bool(d);
		break;
	     case -7034:
		v.remote = PROTOCOL.u_bool(d);
		break;
	     case 10006:
		v.positive = PROTOCOL.u_bool(d);
		break;
	     case -28104:
		v.ramp = PROTOCOL.u_bool(d);
		break;
	     default:
		throw "unknown field when building DPM_reply_BasicStatus";
	    }
	    nFlds -= 2;
	}
	if (fflg[0] !== 7)
	    throw "required fields missing when building DPM_reply_BasicStatus";
	return v;
    };

    DPM_PROTO.unmarshal_request = function (d) {
	if (d.v.getUint8(d.o) !== 83 || d.v.getUint8(d.o + 1) !== 68 ||
	    d.v.getUint8(d.o + 2) !== 68 || d.v.getUint8(d.o + 3) !== 2)
	    throw "bad SDD header";

	d.o += 4;
	if (PROTOCOL.u_tagged_int(0x50, d) !== 3)
	    throw "badly formed message header";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -1321570246)
	    throw "unknown protocol type";
	switch (PROTOCOL.u_tagged_int(0x10, d)) {
	 case -8230:
	    return DPM_PROTO.u_request_ServiceDiscovery(d);
	 case 2076:
	    return DPM_PROTO.u_request_OpenList(d);
	 case 97:
	    return DPM_PROTO.u_request_AddToList(d);
	 case -3807:
	    return DPM_PROTO.u_request_RemoveFromList(d);
	 case -8779:
	    return DPM_PROTO.u_request_StartList(d);
	 case -15607:
	    return DPM_PROTO.u_request_ClearList(d);
	 case 21417:
	    return DPM_PROTO.u_request_StopList(d);
	 default:
	    throw "unknown request in protocol";
	}
    }

    DPM_PROTO.unmarshal_reply = function (d) {
	if (d.v.getUint8(d.o) !== 83 || d.v.getUint8(d.o + 1) !== 68 ||
	    d.v.getUint8(d.o + 2) !== 68 || d.v.getUint8(d.o + 3) !== 2)
	    throw "bad SDD header";

	d.o += 4;
	if (PROTOCOL.u_tagged_int(0x50, d) !== 3)
	    throw "badly formed message header";
	if (PROTOCOL.u_tagged_int(0x10, d) !== -1321570246)
	    throw "unknown protocol type";
	switch (PROTOCOL.u_tagged_int(0x10, d)) {
	 case -12930:
	    return DPM_PROTO.u_reply_ServiceDiscovery(d);
	 case 13470:
	    return DPM_PROTO.u_reply_OpenList(d);
	 case -29780:
	    return DPM_PROTO.u_reply_AddToList(d);
	 case -3046:
	    return DPM_PROTO.u_reply_RemoveFromList(d);
	 case -27136:
	    return DPM_PROTO.u_reply_StartList(d);
	 case 29552:
	    return DPM_PROTO.u_reply_ListStatus(d);
	 case -10579:
	    return DPM_PROTO.u_reply_Status(d);
	 case 28653:
	    return DPM_PROTO.u_reply_DeviceInfo(d);
	 case -10581:
	    return DPM_PROTO.u_reply_Scalar(d);
	 case 23036:
	    return DPM_PROTO.u_reply_ScalarArray(d);
	 case -12450:
	    return DPM_PROTO.u_reply_Raw(d);
	 case -28878:
	    return DPM_PROTO.u_reply_Text(d);
	 case 12923:
	    return DPM_PROTO.u_reply_TextArray(d);
	 case 30088:
	    return DPM_PROTO.u_reply_AnalogAlarm(d);
	 case -14437:
	    return DPM_PROTO.u_reply_DigitalAlarm(d);
	 case -3335:
	    return DPM_PROTO.u_reply_BasicStatus(d);
	 default:
	    throw "unknown reply in protocol";
	}
    }
}
