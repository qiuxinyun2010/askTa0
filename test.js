const { UtilMapping } = require("./utilmap.js");
const { parse } = require("./msgparser.js");
// const { toMsg } = require("./msgdefine.js");
const MsgDefine = require("./msgdefine.js");
const {buildBuf} = require("./cmdbuilder.js");
function toUint8Array(hexString) {
  return new Uint8Array(
    hexString.match(/\w{2}/g).map(function (byte) {
      return parseInt(byte, 16);
    })
  );
}
function calculateCheckSum(t) {
  for (var e = 0, n = 0; n < t.byteLength; ++n) e += (1 + (127 & e)) * t[n];
  return 65535 & e;
}

// 
// var MsgParser = require("./msgparser.js");

exports.run = function(hex) {
  var t = toUint8Array(hex);
  var buf = t.buffer;
  // console.log("toUint8Array", t);
  // console.log("buf len:", t.byteLength);
  var v = new DataView(buf, 0, buf.byteLength);
  // console.log("msg len", v.getUint16(8));

  var r = v.getUint16(2);
  var o = calculateCheckSum(new Uint8Array(buf, 10, buf.byteLength - 10));
  if (r == o) {
    console.log("CheckSum True");
  } else {
    console.log("CheckSum False",r,o);
  }
  //t:data
  var t = new DataView(buf, 10, buf.byteLength - 10);
  var c = t.getUint16(0);
  var msg = MsgDefine.toMsg(c);
  console.log("cmd:", c, msg,c.toString(16));

  if (MsgDefine.MsgCode.CMD_ECHO == c) {
    console.log("[recieve msg CMD_ECHO]");
    // var I = new UtilMapping();
    // I.set("reply_time", Date.now());
    // console.log(I);
    // cmdToServer(MsgDefine.MsgCode.MSG_REPLY_ECHO, I);
    // return !0;
  }
  var d = parse(t); // d:{msg:int, data:umap}
  // console.log(d);
  console.log("cmd:",d.msg,"data:",gfToJsonString(d.data));
}

var r = new ArrayBuffer(65536);
// var input_hex = "4D 5A 88 7F 00 BE 57 C8 00 46 12 0C 00 05 E1 2C 00 00 27 10 00 0C 01 20 03 9A 01 2F 03 AC 01 3F 03 C2 01 53 03 DF 01 5D 03 F0 01 62 04 0A 01 68 04 31 01 69 04 39 01 6C 04 50 01 70 04 6F 01 80 04 8A 01 8C 04 9E 00 05 00 BE 57 C8 00 BE 57 A9"



// run(input_hex);

//msgcode, map
function cmdToServer(t, e) {
  var n = new DataView(r);
  var o = 0;
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
  console.log(o, n); //12 header:10 cmd:2 data:
  //dataview, o, msgcode, map

  if (-1 !== (o = buildBuf(n, o, t, e))) {
    n.setUint16(8, o - 10); //data长度
    var s = calculateCheckSum(new Uint8Array(r, 10, o - 10));
    n.setUint16(2, s);
    console.log("send", r.slice(0, o));
    //   I.send(r.slice(0, o));

    MsgDefine.MsgCode.CMD_ECHO != t &&
      console.log("[send " + MsgDefine.toMsg(t) + "] " + gfToJsonString(e));

    var sendbuf = r.slice(0, o);
    console.log("sendbuf:", new Uint8Array(sendbuf));
    //     if (null != I) {
    //
    //       MsgDefines.CMD_ECHO != t &&
    //       console.log("[send " + MsgDefines.toMsg(t) + "] " + gfToJsonString(e));
    //     }
  }
  // else console.log("[send " + MsgDefines.toMsg(t) + "]  failed");
}

function calculateCheckSum(t) {
  for (var e = 0, n = 0; n < t.byteLength; ++n) e += (1 + (127 & e)) * t[n];
  return 65535 & e;
}

function gfToJsonString(t) {
  var e = [];
  return JSON.stringify(t, function (t, n) {
    if ("object" == typeof n && null !== n) {
      if (-1 !== e.indexOf(n)) return;
      e.push(n);
    }
    return n;
  });
}

function gfToNumber(t) {
  if (null == t) return 0;
  if ("string" == typeof t) {
    for (var e = 0; e < t.length && "0" == t[e]; ++e);
    t = t.substring(e);
  }
  var n = Number(t);
  return isNaN(n) ? 0 : n;
}
