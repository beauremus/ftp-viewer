// 'use strict';

function DPM(taskAndNode, shConn) {
  const obj = this;

  if (taskAndNode === undefined) {
    this.server = taskAndNode;
  } else if (taskAndNode.includes("@")) {
    const [task, node] = taskAndNode.split("@");
    this.task = task;
    this.server = node;
  }

  this.reqs = [];
  this.started = false;
  this.listId = null;
  this.servicePath = null;
  this.con = shConn === undefined ? new ACNET() : shConn;
  this.model = null;

  this.con.notifyOnConnect(function (handle) {
    discovery();
  });

  this.con.notifyOnDisconnect(function (handle) {
    obj.servicePath = null;
    obj.listId = null;
  });

  function sendRequest(ii) {
    if (obj.reqs[ii] === undefined)
      throw ('DPM: called sendRequest() with bad index:' + ii);

    if (obj.servicePath === null)
      throw ('DPM: called sendRequest() when servicePath isn\'t defined');

    const msg = new DPM_request_AddToList();

    msg.list_id = obj.listId;
    msg.ref_id = ii;
    msg.drf_request = obj.reqs[ii].request;

    obj.con.oneshot(obj.servicePath, msg, 1000);
  }

  this.addRequest = function (req, cb, ecb) {
    obj.reqs.push({
      request: req, callback: cb, errCallback: ecb,
      dInfo: undefined
    });
    if (obj.listId !== null)
      sendRequest(obj.reqs.length - 1);
  }

  function sendList() {
    for (var ii = 0; ii < obj.reqs.length; ++ii)
      sendRequest(ii);
  }

  function dpmReplies(o) {
    if (o.status.isGood()) {
      if (o.msg !== null)
        o.msg = DPM_PROTO.unmarshal_reply({ v: o.msg, o: 0 });

      if (o.msg instanceof DPM_reply_OpenList) {
        console.info("DPM: using list id " + o.msg.list_id);
        obj.listId = o.msg.list_id;
        sendList();
        if (obj.started)
          obj.start(obj.model);
      } else if (o.msg instanceof DPM_reply_DeviceInfo) {
        obj.reqs[o.msg.ref_id].dInfo = o.msg;
      } else if (o.msg instanceof DPM_reply_Status) {
        const tmp = obj.reqs[o.msg.ref_id];

        if (tmp.errCallback !== null) {
          if (tmp.errCallback !== undefined)
            tmp.errCallback(o.msg);
          else
            console.info("DPM: error status " +
              new Status(o.msg.status) +
              " for " + obj.reqs[o.msg.ref_id].request);
        }
      } else if (!(o.msg instanceof DPM_reply_ListStatus)) {
        const tmp = obj.reqs[o.msg.ref_id];

        tmp.callback(o.msg, tmp.dInfo);
      }
      return true;
    } else {
      console.warn("DPM: received error status, " + o.status);
      if (o.status.equals(1, -34))
        discovery();
      return false;
    }
  }

  function discovery() {
    obj.listId = null;
    if (obj.server === undefined) {
      obj.servicePath = null;
      obj.con.oneshot(`${obj.task}@MCAST`, new DPM_request_ServiceDiscovery(),
        3000, discoveryReply);
    } else {
      console.info("DPM: Forcing use of DPM on " + obj.server + ".");

      if (obj.task === undefined) {
        obj.con.stream(obj.servicePath = "DPMD@" + obj.server,
          new DPM_request_OpenList(), 10000, dpmReplies);
      } else {
        console.info("DPM: Forcing use of Task " + obj.task + ".");
        obj.con.stream(obj.servicePath = `${obj.task}@${obj.server}`,
          new DPM_request_OpenList(), 10000, dpmReplies);
      }
    }
  }

  function discoveryReply(o) {
    if (o.status.isGood()) {
      if (o.msg !== null)
        o.msg = DPM_PROTO.unmarshal_reply({ v: o.msg, o: 0 });

      const loc = o.msg.serviceLocation.trim();

      console.info("DPM: Using DPM on " + loc + ".");
      obj.con.stream(obj.servicePath = `${obj.task}@${loc}`,
        new DPM_request_OpenList(), 10000, dpmReplies);
    } else {
      console.warn("DPM: discovery error, " + o.status + ".");
      setTimeout(function (e) { discovery(); }, 5000);
    }
  }

  this.start = function () {
    obj.model = arguments.length > 0 ? arguments[0] : null;

    obj.started = true;
    if (obj.listId !== null) {
      const msg = new DPM_request_StartList();

      msg.list_id = obj.listId;
      msg.model = obj.model;
      obj.con.oneshot(obj.servicePath, msg, 1000);
    }
  }

  this.clear = function () {
    if (obj.listId !== null) {
      const msg = new DPM_request_ClearList();

      msg.list_id = obj.listId;
      obj.con.oneshot(obj.servicePath, msg, 1000);
      obj.reqs = [];
    }
  }

  this.stop = function () {
    if (obj.listId !== null && obj.started) {
      const msg = new DPM_request_StopList();

      msg.list_id = obj.listId;
      obj.started = false;
      obj.con.oneshot(obj.servicePath, msg, 1000);
    }
  }
}
