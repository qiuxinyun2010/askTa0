### 收包函数

```js
function pickoutPacket() {
    // 从全局缓存池s中拷贝出字节数组t。
    var t = new Uint8Array(s, _, a),
 
    // 原数据包长度为a，先读取2个字节，77 90 代表魔数
    for (e = 0; e < a && (77 != t[e] || 90 != t[e + 1]); ++e);
    if (e > 0) {
        _ += e;
        a -= e;
    }

    // 读取校验和，2字节，并进行校验
    var r = t.getUint16(2);
    if (0 !== r) {
        var o = this.calculateCheckSum(new Uint8Array(s, _ + 10, i - 10));
        if (o !== r) {
            _ += i;
            a -= i;
            Logger.log("[recieve msg data error]   checkSum = " + o + " buf_check_sum =" +r);
            return 1;
        }
    }

    //  剥离头部（共10字节），magic(2)+checksum(2)+timestamp(4)+bytelength(2)=10
    t = new DataView(s, _ + 10, i - 10);
    _ += i;
    a -= i;

    // 读取cmd码(2字节)
    var c = t.getUint16(0);

    // 心跳包
    if (MsgDefines.CMD_ECHO == c) {
        Logger.log("[recieve msg CMD_ECHO]");
        var I = new UtilMapping(); 
        I.set("reply_time", Date.now());
        this.cmdToServer(MsgDefines.MSG_REPLY_ECHO, I);
        return 1;
    }

    if (MsgDefines.MSG_ANSWER_FIELDS == c ||MsgDefines.MSG_TRADE_ASK_FIELDS == c) {
        n.parse(t);
        return 1;
    }

    //判断是否有回调函数，
    //h存放cmd码注册的回调函数。h[c] = {target,callback}
    //g存放cmd码注册的hook函数
    if (MsgDefines.MSG_REPLY_ECHO != c &&null == h[c] &&null == g.find(c)) {
        Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  no callback");
        return 1;
    }

    //对数据包进行解包
    var d = n.parse(t); // d:{msg:int, data:umap}
    if (null == d || null == d.data) {
        Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  parse failed");
        return 1;
    }
    if (MsgDefines.MSG_REPLY_ECHO == c) {
        l = d.data.queryInt("time");
        E = 0;
        GameMgr.syncServerTime(d.data.queryInt("server_time_offset"));
        return 1;
    }

    //放入消息队列R
    R.push(d);
    return 1;
},
```
### 发包函数 
```js
function cmdToServer(t, e) {
    var n = new DataView(r);

    //数据包头部 magic(2)+checksum(2)+timestamp(4)+bytelength(2)=10
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
    
    //对data进行二进制序列化
    if (-1 !== (o = i.buildBuf(n, o, t, e))) {
        n.setUint16(8, o - 10);
        //设置校验和
        var s = this.calculateCheckSum(new Uint8Array(r, 10, o - 10));
        n.setUint16(2, s);
        if (null != I) {
            // I:WebSocket
            I.send(r.slice(0, o));
            MsgDefines.CMD_ECHO != t &&
            Logger.log("[send " + MsgDefines.toMsg(t) + "] " + gfToJsonString(e));
        }
    } 
    else Logger.log("[send " + MsgDefines.toMsg(t) + "]  failed");
}
      
```