Me: [
    function (t, e) {
      "use strict";
      cc._RF.push(e, "623f37EyCFAMqq+nbeEDXb/", "Me");
      t("Player");
      var n = t("PetFightLayer"),
        i = t("CharEquipLayer"),
        s = t("CharAttribLayer"),
        r = t("YinlfSkillLayer"),
        _ = t("FslDrawLayer");
      cc.Class({
        extends: Player,
        m_nCharLevel: 0,
        ctor: function () {
          Communicate.registerCallback(
            MsgDefines.MSG_UPDATE,
            this,
            this.onMsgUpdate
          );
          Communicate.registerCallback(
            MsgDefines.MSG_UPDATE_IMPROVEMENT,
            this,
            this.onMsgUpdateImprovement
          );
          Communicate.registerCallback(
            MsgDefines.MSG_COMBAT_CAPACITY_RATE,
            this,
            this.onMsgCombatCapacityRate
          );
          this.m_nCharLevel = 0;
          this.m_equipPage = 0;
        },
        isGeneralLookOn: function () {
          return (
            !(!this.isLookOn() && !this.isRemoteLookon()) ||
            0 != this.queryBasicInt("start_lookon")
          );
        },
        isPicking: function () {
          return !1;
        },
        getCharLevel: function () {
          return this.m_nCharLevel;
        },
        getEquipPage: function () {
          return this.m_equipPage;
        },
        absorbBasicFields: function (t) {
          this._super(t);
          this.m_equipPage = this.queryBasicInt("equip_page");
          this.m_nCharLevel = me.queryBasicInt("level");
          var e = me.queryBasicInt("upgrade/state");
          (TYPE_YUANYING != e && TYPE_XUEYING != e) ||
            (this.m_nCharLevel = me.queryBasicInt("upgrade/level"));
          return t;
        },
        getFlyItemExtraDesc: function () {
          var t = "";
          switch (this.queryBasicInt("feixf")) {
            case TO_LIZONGBING:
              t = TxtRes(1006568);
              break;

            case TO_TONGLINGDAOREN:
              t = TxtRes(1007021);
              break;

            case TO_LUYAZHENREN:
              t = TxtRes(1007022);
              break;

            case TO_MENPAISHIZHE:
              t = TxtRes(1007023);
              break;

            case TO_DUOBAODAOREN:
              t = TxtRes(1007024);
              break;

            case TO_YUJIANSHANGREN:
              t = TxtRes(1007025);
              break;

            case TO_TAIXUANZHENJUN:
              t = TxtRes(1007444);
              break;

            default:
              return "";
          }
          return sprintf(TxtRes(1007026), t);
        },
        refreshLayer: function () {
          var e = t("Game");
          null != e.instance && e.instance.refreshMeInfo();
          null != i.instance && i.instance.refreshChar();
          null != s.instance && s.instance.refreshLayer();
          null != r.instance &&
            (gfIsJdDist()
              ? r.instance.setLingFanCost()
              : r.instance.setSkillCost());
          null != _.instance && _.instance.setCostType();
        },
        onMsgUpdate: function (t, e) {
          if (0 != t.queryInt("delay_msg")) {
            FslMgr.clearIncarnationAttrib();
            this.absorbBasicFields(t);
            this.refreshLayer();
          } else MsgDelayMgr.addDelayMsg(e, t);
        },
        onMsgUpdateImprovement: function (e, n) {
          if (0 != e.queryInt("delay_msg")) {
            var i = t("Game");
            if (e.queryInt("id") == this.getId()) {
              0 == e.queryInt("partial_update") && this.cleanupExtra();
              this.absorbExtraFields(e);
              this.refreshLayer();
            } else {
              PetMgr.addExtraMapping(e);
              cc.isValid(i.instance, !0) && i.instance.refreshPetInfo();
            }
          } else MsgDelayMgr.addDelayMsg(n, e);
        },
        onMsgCombatCapacityRate: function (t) {
          cc.isValid(n.instance, !0) && n.instance.setCombatCapacityRate(t);
          cc.isValid(s.instance, !0) && s.instance.setCombatCapacityRate(t);
        },
      });
      cc._RF.pop();
    },
    {
      CharAttribLayer: "CharAttribLayer",
      CharEquipLayer: "CharEquipLayer",
      FslDrawLayer: "FslDrawLayer",
      Game: "Game",
      PetFightLayer: "PetFightLayer",
      Player: "Player",
      YinlfSkillLayer: "YinlfSkillLayer",
    },
  ]