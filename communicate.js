Communicate: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "83630WkXxNLGpOUmJH0INI9", "Communicate");
    var n = t("MsgParser"),
      i = t("CmdBuilder"),
      s = new ArrayBuffer(131072),
      r = new ArrayBuffer(65536),
      _ = 0,
      a = 0,
      o = 0,
      c = 0,
      l = 4294967295,
      E = 0,
      I = null,
      h = {},
      d = {},
      u = {},
      T = !0,
      R = [],
      g = {
        g_hookMap: {},
        find: function (t) {
          return this.g_hookMap[t];
        },
        remove: function (t, e) {
          if (this.g_hookMap[t]) {
            for (var n = [], i = 0; i < this.g_hookMap[t].length; i += 2)
              if (this.g_hookMap[t][i] == e) this.g_hookMap[t][i] = null;
              else {
                n.push(this.g_hookMap[t][i]);
                n.push(this.g_hookMap[t][i + 1]);
              }
            n.length < 1 ? delete this.g_hookMap[t] : (this.g_hookMap[t] = n);
          }
        },
        add: function (t, e, n) {
          if (this.g_hookMap[t]) {
            this.g_hookMap[t].push(e);
            this.g_hookMap[t].push(n);
          } else this.g_hookMap[t] = [e, n];
        },
        visit: function (t, e) {
          if (this.g_hookMap[t])
            for (var n = 0; n < this.g_hookMap[t].length; n += 2) {
              var i = this.g_hookMap[t][n],
                s = this.g_hookMap[t][n + 1];
              try {
                s.call(i, e, t);
              } catch (t) {
                gfExceptionProc(t);
              }
            }
        },
      },
      L = function () {},
      f = {
        onOpen: function () {
          null != d.target && null != d.callback && d.callback.call(d.target);
        },
        onClose: function () {
          if (I) {
            I.onopen = L;
            I.onmessage = L;
            I.onclose = L;
            I.onerror = L;
            I = null;
          }
          this.procAllMsg();
          null != u.target && null != u.callback && u.callback.call(u.target);
        },
        onError: function () {
          Logger.log("socket onError");
          this.close();
          this.procAllMsg();
          null != u.target && null != u.callback && u.callback.call(u.target);
        },
        onMessage: function (t) {
          if (_ > 65536) {
            a > 0 && new Uint8Array(s).copyWithin(0, _, _ + a);
            _ = 0;
          }
          new Uint8Array(s, _ + a, t.data.byteLength).set(
            new Uint8Array(t.data)
          );
          a += t.data.byteLength;
          for (; this.pickoutPacket(); );
        },
        close: function () {
          if (null != I) {
            I.onopen = L;
            I.onmessage = L;
            I.onclose = L;
            I.onerror = L;
            I.close();
            I = null;
          }
        },
        closeDirect: function () {
          null != I && I.close();
        },
        connect: function (t) {
          null != I && this.onClose();
          (I = new WebSocket(t)).binaryType = "arraybuffer";
          I.onopen = this.onOpen.bind(this);
          I.onmessage = this.onMessage.bind(this);
          I.onclose = this.onClose.bind(this);
          I.onerror = this.onError.bind(this);
        },
        calculateCheckSum: function (t) {
          for (var e = 0, n = 0; n < t.byteLength; ++n)
            e += (1 + (127 & e)) * t[n];
          return 65535 & e;
        },
        pickoutPacket: function () {
          if (a <= 8) return !1;
          var t = new Uint8Array(s, _, a),
            e = 0;
          for (e = 0; e < a && (77 != t[e] || 90 != t[e + 1]); ++e);
          if (e > 0) {
            _ += e;
            a -= e;
          }
          if (e >= a) return !1;
          if (a < 10) return !1;
          var i = (t = new DataView(s, _, a)).getUint16(8) + 10;
          if (i <= 0 || i > 65536) {
            a = 0;
            return !1;
          }
          if (i > a) return !1;
          var r = t.getUint16(2);
          if (0 !== r) {
            var o = this.calculateCheckSum(new Uint8Array(s, _ + 10, i - 10));
            if (o !== r) {
              _ += i;
              a -= i;
              Logger.log(
                "[recieve msg data error]   checkSum = " +
                  o +
                  " buf_check_sum =" +
                  r
              );
              return !0;
            }
          }
          t = new DataView(s, _ + 10, i - 10);
          _ += i;
          a -= i;
          var c = t.getUint16(0);
          if (MsgDefines.CMD_ECHO == c) {
            Logger.log("[recieve msg CMD_ECHO]");
            var I = new UtilMapping();
            I.set("reply_time", Date.now());
            this.cmdToServer(MsgDefines.MSG_REPLY_ECHO, I);
            return 1;
          }
          if (
            MsgDefines.MSG_ANSWER_FIELDS == c ||
            MsgDefines.MSG_TRADE_ASK_FIELDS == c
          ) {
            n.parse(t);
            return 1;
          }
          if (
            MsgDefines.MSG_REPLY_ECHO != c &&
            null == h[c] &&
            null == g.find(c)
          ) {
            Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  no callback");
            return 1;
          }
          var d = n.parse(t); // d:{msg:int, data:umap}
          if (null == d || null == d.data) {
            Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  parse failed");
            return 1;
          }
          if (MsgDefines.MSG_REPLY_ECHO == c) {
            l = d.data.queryInt("time");
            E = 0;
            GameMgr.syncServerTime(d.data.queryInt("server_time_offset"));
            return !0;
          }
          R.push(d);
          return !0;
        },
        procAllMsg: function () {
          for (var t = R.length, e = 0; e < t; ++e) {
            var n = R[e],
              i = n.msg;
            if (null != i) {
              try {
                var s = h[i];
                if (null != s && null != s.target && null != s.callback) {
                  Logger.log(
                    "[process " +
                      MsgDefines.toMsg(i) +
                      "] " +
                      gfToJsonString(n.data)
                  );
                  s.callback.call(s.target, n.data, i);
                }
              } catch (t) {
                gfExceptionProc(t);
              }
              g.visit(i, n.data);
            }
          }
          T = !0;
          R = [];
        },
        procMsg: function () {
          for (var t = 0, e = R.length; T && t < e; ) {
            var n = R[t++],
              i = n.msg;
            if (null != i) {
              try {
                var s = h[i];
                if (null != s && null != s.target && null != s.callback) {
                  Logger.log(
                    "[process " +
                      MsgDefines.toMsg(i) +
                      "] " +
                      gfToJsonString(n.data)
                  );
                  s.callback.call(s.target, n.data, i);//this,data_buf,msg_code
                }
              } catch (t) {
                gfExceptionProc(t);
              }
              g.visit(i, n.data);
            }
          }
          R.splice(0, t);
        },
        cmdToServer: function (t, e) {
          var n = new DataView(r);
          o = 0;
          n.setUint8(o++, 77);
          n.setUint8(o++, 90);
          n.setUint16(o, 0);
          o += 2;
          n.setUint32(o, Date.now());
          o += 4;
          n.setUint16(o, 0);
          o += 2;
          n.setUint16(o, t);
          o += 2;
          if (-1 !== (o = i.buildBuf(n, o, t, e))) {
            n.setUint16(8, o - 10);
            var s = this.calculateCheckSum(new Uint8Array(r, 10, o - 10));
            n.setUint16(2, s);
            if (null != I) {
              // I:WebSocket
              I.send(r.slice(0, o));
              MsgDefines.CMD_ECHO != t &&
                Logger.log(
                  "[send " + MsgDefines.toMsg(t) + "] " + gfToJsonString(e)
                );
            }
          } else Logger.log("[send " + MsgDefines.toMsg(t) + "]  failed");
        },
      };
    e.exports = {
      connect: function (t) {
        f.connect(t);
        c = 0;
        l = 4294967295;
        E = 0;
      },
      close: function () {
        f.close();
      },
      closeDirect: function () {
        f.closeDirect();
      },
      registerCallback: function (t, e, n) {
        if (null != t) {
          h[t] = h[t] || {};//t是msgcode
          var i = h[t];
          i.target = e;  //this
          i.callback = n; //callback fn
        } else Logger.log("registerCallback: msg undefined!");
      },
      unRegisterCallback: function (t, e) {
        var n = h[t];
        null != n && e == n.target && delete h[t];
      },
      setConnecttedCallback: function (t, e) {
        if (null != e) {
          d.target = t;
          d.callback = e;
        } else if (d.target == t) {
          d.target = null;
          d.callback = null;
        }
      },
      setClosedCallback: function (t, e) {
        if (null != e) {
          u.target = t;
          u.callback = e;
        } else if (u.target == t) {
          u.target = null;
          u.callback = null;
        }
      },
      cmdToServer: function (t, e) {
        f.cmdToServer(t, e);
      },
      isConnected: function () {
        return null != I && 1 === I.readyState;
      },
      update: function () {
        f.procMsg();
        if (this.isConnected())
          if (E > 3) {
            Logger.log("echo unresponsive, websocket close");
            E = 0;
            this.closeDirect();
          } else {
            var t = Date.now();
            if (t - c >= 1e4) {
              c = t;
              var e = new UtilMapping();
              e.set("current_time", t);
              e.set("peer_time", l);
              this.cmdToServer(MsgDefines.CMD_ECHO, e);
              E++;
            }
          }
      },
      setCanProcMsg: function (t) {
        T = t;
      },
      getSyncMessageMsgNo: function (t) {
        var e = t.query("data");
        if (null == e || e.byteLength <= 0) return 0;
        var n = new DataView(e);
        return n.getUint16(0) != e.byteLength ? 0 : n.getUint16(2);
      },
      decodeSyncMessage: function (t) {
        var e = t.query("data");
        if (
          !(null == e || e.byteLength <= 0) &&
          new DataView(e).getUint16(0) == e.byteLength
        ) {
          var i = n.parse(new DataView(e, 2), !0);
          if (null != i && null != i.data) {
            var s = i.msg;
            if (
              MsgDefines.MSG_REPLY_ECHO == s ||
              null != h[s] ||
              null != g.find(s)
            ) {
              if (i.data instanceof UtilMapping) i.data.set("syn_msg", TRUE);
              else if (i.data.length > 0)
                for (var r = 0; r < i.data.length; ++r)
                  i.data[r] instanceof UtilMapping &&
                    i.data[r].set("syn_msg", TRUE);
              R.push(i);
            } else
              Logger.log(
                "[recieve sync msg " + MsgDefines.toMsg(s) + "]  no callback"
              );
          }
        }
      },
      sendToLocal: function (t, e) {
        var n = h[t];
        if (null != n.target && null != n.callback) {
          Logger.log(
            "[local process " + MsgDefines.toMsg(t) + "] " + gfToJsonString(e)
          );
          n.callback.call(n.target, e, t);
        }
      },
      hook: g,
    };
    cc._RF.pop();
  },
  {
    CmdBuilder: "CmdBuilder",
    MsgParser: "MsgParser",
  },
];
