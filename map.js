MapMgr: [
    function (t, e) {
      "use strict";
      cc._RF.push(e, "6caa2wmZipF9Z/DmqOuwE1Z", "MapMgr");
      e.exports = {
        init: function () {
          this.m_mapName = "";
          Communicate.registerCallback(
            MsgDefines.MSG_ENTER_ROOM,
            this,
            this.onMsgEnterRoom
          );
        },
        onMsgEnterRoom: function (t) {
          me.setBasic("map_id", t.query("map_id"));
          me.setBasic("map_name", t.query("map_name"));
          me.setBasic("map_index", t.query("map_index"));
          this.m_mapName = t.query("map_name");
          gfOperTeamLayer(TEAM_LAYER_SET_MAP);
        },
        isInPartyCopyMap: function () {
          return this.m_mapName == TxtRes(1035371);
        },
      };
      cc._RF.pop();
    },
    {},
  ]