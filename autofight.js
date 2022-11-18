AutoFightMgr: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "2d7baNovhZIKbL3Jj7Tglgm", "AutoFightMgr");
    t("TxtRes");
    var n = t("AutoFightLayer"),
      i = [
        [TxtRes(1036219), TxtRes(1036222)],
        [TxtRes(1036220), TxtRes(1036223)],
        [TxtRes(1036221), TxtRes(1036224)],
      ];
    window.AF_ACTCFG_PLAYER = 1;
    window.AF_ACTCFG_HUAXING = 2;
    window.AF_ACTCFG_PET = 3;
    e.exports = {
      init: function () {
        this.m_meAutoCmd = [];
        this.m_hxAutoCmd = [];
        this.m_petAutoCmd = [];
        for (var t = 0; t < MAX_N_CONFIG; ++t) {
          this.m_meAutoCmd.push(new UtilMapping());
          this.m_hxAutoCmd.push(new UtilMapping());
          this.m_petAutoCmd.push(new UtilMapping());
        }
        this.m_roundCheck = [0, 0, 0];
        this.m_round = ["", "", ""];
        this.m_enableConfig = -1;
        this.m_isChangeMeCmdInHuaXing = !1;
        this.m_isMeRecover = FALSE;
        this.m_isPetRecover = FALSE;
        this.m_isPetRecoverLife = FALSE;
        this.m_charTarget = -1;
        this.m_petTarget = -1;
      },
      isConfigured: function () {
        return null != ConfigMgr.getMeCfgFromLocal("EnableConfig");
      },
      setAutoCmd: function (t, e, n) {
        if (!(e < 0 || e >= MAX_N_CONFIG)) {
          var i = !0,
            s = null;
          switch (n) {
            case AF_ACTCFG_PLAYER:
              s = this.m_meAutoCmd[e];
              i = !this.m_isChangeMeCmdInHuaXing;
              break;

            case AF_ACTCFG_HUAXING:
              s = this.m_hxAutoCmd[e];
              i = this.m_isChangeMeCmdInHuaXing;
              break;

            case AF_ACTCFG_PET:
              s = this.m_petAutoCmd[e];
              i = !0;
              break;

            default:
              return;
          }
          if (null != s && null != t) {
            if (
              !t.isEqual("action_type", s.query("action_type")) ||
              !t.isEqual("name", s.query("name")) ||
              !t.isEqual("para", s.query("para"))
            ) {
              s.cleanup();
              s.absorbFields(t);
              this.saveConfig(s, e, n);
            }
            i &&
              e == this.m_enableConfig &&
              AutoFight.updateAutoCmd(s, this.isMeActType(n));
          }
        }
      },
      getConfig: function () {
        return this.m_enableConfig;
      },
      setAutoRecover: function (t, e, n) {
        if (
          t != this.m_isMeRecover ||
          e != this.m_isPetRecover ||
          n != this.m_isPetRecoverLife
        ) {
          this.m_isMeRecover = t;
          this.m_isPetRecover = e;
          this.m_isPetRecoverLife = n;
          ConfigMgr.saveMeCfgToLocal(
            "AutoRecover",
            this.m_isMeRecover +
              "," +
              this.m_isPetRecover +
              "," +
              this.m_isPetRecoverLife
          );
        }
      },
      setFightTarget: function (t, e) {
        if (t != this.m_charTarget || e != this.m_petTarget)
          if (SS_NORMAL_STATE == GameMgr.getSpriteState()) {
            this.m_charTarget = t;
            this.m_petTarget = e;
            ConfigMgr.saveMeCfgToLocal(
              "FightTarget",
              this.m_charTarget + "," + this.m_petTarget
            );
          } else gfShowSmallTips(TxtRes(1037704));
      },
      canChangePet: function (t) {
        var e = t.queryInt("action_type");
        if (0 == e) return FALSE;
        var n = PetMgr.getInFightingScenePet();
        return null != n &&
          e == ACTION_CAST_MAGIC &&
          null == SkillMgr.findSkillByNo(n.getId(), t.queryInt("para"))
          ? FALSE
          : TRUE;
      },
      fightCmdCanUse: function (t, e) {
        var n = t.queryInt("action_type"),
          i = TRUE,
          s = TRUE;
        n
          ? n == ACTION_CAST_MAGIC &&
            null == SkillMgr.findSkillByNo(me.getId(), t.queryInt("para")) &&
            (i = FALSE)
          : (i = FALSE);
        var r = gfIsLimitStatus(MF_LIMIT_FIGHT)
          ? PetMgr.getInFightingScenePet()
          : PetMgr.getFightPet();
        if (null != r) {
          var _ = e.queryInt("action_type");
          _
            ? _ == ACTION_CAST_MAGIC &&
              null == SkillMgr.findSkillByNo(r.getId(), e.queryInt("para")) &&
              (this.replacePetSkill(e) || (s = FALSE))
            : (s = FALSE);
        }
        return i && s ? TRUE : FALSE;
      },
      replacePetSkill: function (t) {
        var e = gfIsLimitStatus(MF_LIMIT_FIGHT)
          ? PetMgr.getInFightingScenePet()
          : PetMgr.getFightPet();
        if (null == e) return FALSE;
        if (TxtRes(1036205) != e.getName()) return FALSE;
        if (ACTION_CAST_MAGIC != t.queryInt("action_type")) return FALSE;
        for (var n = t.query("name"), s = i.length, r = 0; r < s; ++r) {
          var _ = -1;
          if (n == i[r][0]) _ = 1;
          else {
            if (n != i[r][1]) continue;
            _ = 0;
          }
          var a = ConSklsMgr.getSklByName(i[r][_]);
          if (null == a) return FALSE;
          t.set("name", i[r][_]);
          t.set("para", a.queryInt("skill_no"));
          return TRUE;
        }
        return FALSE;
      },
      changeConfig: function (t) {
        if (t < 0 || t > 2) return FALSE;
        this.m_enableConfig = t;
        ConfigMgr.saveMeCfgToLocal("EnableConfig", t);
        var e = this.m_meAutoCmd[t];
        if (
          gfIsMeInHuaXing() &&
          this.fightCmdCanUse(this.m_hxAutoCmd[t], this.m_petAutoCmd[t], !1)
        ) {
          e = this.m_hxAutoCmd[t];
          this.m_isChangeMeCmdInHuaXing = !0;
        }
        AutoFight.updateAutoCmd(e, TRUE);
        AutoFight.updateAutoCmd(this.m_petAutoCmd[t], FALSE);
        n.instance && n.instance.refreshConfig();
        return TRUE;
      },
      initConfig: function (t, e) {
        var n = ConfigMgr.getMeCfgFromLocal(e);
        null != n && t.absorbFields(n);
      },
      saveConfig: function (t, e, n) {
        var i = "";
        switch (n) {
          case AF_ACTCFG_PLAYER:
            i = "MeAction" + (e + 1);
            break;

          case AF_ACTCFG_HUAXING:
            i = "HuaXingAction" + (e + 1);
            break;

          case AF_ACTCFG_PET:
            i = "PetAction" + (e + 1);
            break;

          default:
            return;
        }
        ConfigMgr.saveMeCfgToLocal(i, t.m_data);
      },
      loadAutoFightConfig: function () {
        for (var t = 0; t < MAX_N_CONFIG; ++t) {
          this.initConfig(this.m_meAutoCmd[t], "MeAction" + (t + 1));
          this.initConfig(this.m_hxAutoCmd[t], "HuaXingAction" + (t + 1));
          this.initConfig(this.m_petAutoCmd[t], "PetAction" + (t + 1));
          this.m_round[t] = ConfigMgr.getMeCfgFromLocal("Round" + t, "");
        }
        var e = ConfigMgr.getMeCfgFromLocal("AutoRecover");
        if (null == e) {
          this.m_isMeRecover = TRUE;
          this.m_isPetRecover = TRUE;
          this.m_isPetRecoverLife = TRUE;
        } else {
          var n = e.split(",");
          this.m_isMeRecover = 0 != gfToNumber(n[0]) ? TRUE : FALSE;
          this.m_isPetRecover = 0 != gfToNumber(n[1]) ? TRUE : FALSE;
          this.m_isPetRecoverLife = 0 != gfToNumber(n[2]) ? TRUE : FALSE;
        }
        var i = ConfigMgr.getMeCfgFromLocal("RoundCheck");
        if (null == i) {
          this.m_roundCheck[0] = FALSE;
          this.m_roundCheck[1] = FALSE;
          this.m_roundCheck[2] = FALSE;
        } else {
          var s = i.split(",");
          this.m_roundCheck[0] = 0 != gfToNumber(s[0]) ? TRUE : FALSE;
          this.m_roundCheck[1] = 0 != gfToNumber(s[1]) ? TRUE : FALSE;
          this.m_roundCheck[2] = 0 != gfToNumber(s[2]) ? TRUE : FALSE;
        }
        var r = ConfigMgr.getMeCfgFromLocal("FightTarget");
        if (null == r) {
          this.m_charTarget = -1;
          this.m_petTarget = -1;
        } else {
          var _ = r.split(",");
          this.m_charTarget = gfToNumber(_[0]);
          this.m_petTarget = gfToNumber(_[1]);
        }
        this.m_enableConfig = ConfigMgr.getMeCfgFromLocal("EnableConfig", 0);
        AutoFight.updateAutoCmd(this.m_meAutoCmd[this.m_enableConfig], TRUE);
        AutoFight.updateAutoCmd(this.m_petAutoCmd[this.m_enableConfig], FALSE);
      },
      initFightCmd: function (t, e, n) {
        t.cleanup();
        switch (n) {
          case AF_ACTCFG_PLAYER:
            t.absorbFields(this.m_meAutoCmd[e]);
            break;

          case AF_ACTCFG_HUAXING:
            t.absorbFields(this.m_hxAutoCmd[e]);
            break;

          case AF_ACTCFG_PET:
            t.absorbFields(this.m_petAutoCmd[e]);
            break;

          default:
            return;
        }
      },
      getCmdName: function (t, e) {
        switch (t.queryInt("action_type")) {
          case ACTION_CAST_MAGIC:
          case ACTION_USE_ARTIFACT_EXTRA_SKILL:
            var n = 0;
            if (e) n = me.getId();
            else {
              var i = PetMgr.getInFightingScenePet();
              null != i && (n = i.getId());
            }
            var s = SkillMgr.findSkillByNo(n, t.queryInt("para"));
            return null != s
              ? s.query("skill_name")
              : null != (s = ConSklsMgr.getSklByNo(t.queryInt("para")))
              ? s.query("skill_name")
              : t.query("name");

          case ACTION_PHYSICAL_ATTACK:
            return TxtRes(1004068);

          case ACTION_DEFENSE:
            return TxtRes(32810);

          case ACTION_APPLY_ITEM:
            return t.query("name");

          case ACTION_GUARD:
            return TxtRes(1004075);

          case ACTION_CATCH_PET:
            return TxtRes(1004078);
        }
        return "";
      },
      setRoundCheck: function (t, e) {
        if (!(t < 0 || t >= MAX_N_CONFIG) && this.m_roundCheck[t] != e) {
          this.m_roundCheck[t] = e;
          ConfigMgr.saveMeCfgToLocal(
            "RoundCheck",
            this.m_roundCheck[0] +
              "," +
              this.m_roundCheck[1] +
              "," +
              this.m_roundCheck[2]
          );
        }
      },
      setRound: function (t, e) {
        if (
          !(t < 0 || t >= MAX_N_CONFIG) &&
          null != e &&
          this.m_round[t] != e
        ) {
          this.m_round[t] = e;
          ConfigMgr.saveMeCfgToLocal("Round" + t, this.m_round[t]);
        }
      },
      getRoundCheck: function (t) {
        return t < 0 || t >= MAX_N_CONFIG ? FALSE : this.m_roundCheck[t];
      },
      getRound: function (t) {
        return t < 0 || t >= MAX_N_CONFIG ? "" : this.m_round[t];
      },
      isMeActType: function (t) {
        return AF_ACTCFG_PLAYER == t || AF_ACTCFG_HUAXING == t;
      },
      doWhenEndCombat: function () {
        this.removeHuaXingCmd();
      },
      switchHuaXingCmd: function () {
        if (me.isInCombat())
          if (gfIsMeInHuaXing()) {
            if (this.m_enableConfig < 0 || this.m_enableConfig >= MAX_N_CONFIG)
              return;
            if (
              !this.fightCmdCanUse(
                this.m_hxAutoCmd[this.m_enableConfig],
                this.m_petAutoCmd[this.m_enableConfig],
                !1
              )
            )
              return;
            this.m_isChangeMeCmdInHuaXing = !0;
            AutoFight.updateAutoCmd(
              this.m_hxAutoCmd[this.m_enableConfig],
              TRUE
            );
          } else this.removeHuaXingCmd();
      },
      removeHuaXingCmd: function () {
        if (this.m_isChangeMeCmdInHuaXing) {
          this.m_isChangeMeCmdInHuaXing = !1;
          this.m_enableConfig >= 0 &&
            this.m_enableConfig < MAX_N_CONFIG &&
            AutoFight.updateAutoCmd(
              this.m_meAutoCmd[this.m_enableConfig],
              TRUE
            );
        }
      },
    };
    cc._RF.pop();
  },
  {
    AutoFightLayer: "AutoFightLayer",
    TxtRes: "TxtRes",
  },
];
AutoFight: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "edc19/u8iZMxY6LTmwGEWrd", "AutoFight");
    e.exports = {
      init: function () {
        this.m_meFightCmd = new UtilMapping();
        this.m_petFightCmd = new UtilMapping();
      },
      sendAutoFightCmd: function (t) {
        var e = me.queryBasicInt("c_pet_finished_cmd"),
          n = me.queryBasicInt("c_me_finished_cmd");
        if (!e || !n) {
          t &&
            AutoFightMgr.fightCmdCanUse(
              this.m_meFightCmd,
              this.m_petFightCmd,
              FALSE
            );
          var i = this.getMeInFight(),
            s = 0,
            r = this.getPetInFight();
          null != r && (s = r.getId());
          var _ = FALSE;
          0 != s && !e && n && (_ = TRUE);
          var a = FALSE,
            o = FALSE;
          AutoFightMgr.m_isMeRecover &&
            !_ &&
            (a = this.isCharAutoRecoverMana(i, r));
          _ || a || this.sendAutoCmd(this.m_meFightCmd, TRUE);
          if (0 != s && null != r) {
            AutoFightMgr.m_isPetRecoverLife &&
              (o = this.isPetAutoRecoverLife(i, r));
            AutoFightMgr.m_isPetRecover &&
              (o = o || this.isPetAutoRecoverMana(i, r));
          }
          if (0 != s && !o) {
            var c = !1;
            if (!AutoFightMgr.isConfigured()) {
              var l = PetMgr.getPetByID(s);
              if (null != l && l.queryBasicInt("polar") != POLAR_PHYSICAL) {
                var E = SkillMgr.findSkills(s),
                  I = null,
                  h = null;
                if (null != E)
                  for (var d = 0; d < E.length; ++d)
                    if (E[d].queryInt("subclass") == SKILL_SUBCLASS_B) {
                      var u = E[d].queryInt("ladder");
                      if (SKILL_LADDER_1 != u || null != I) {
                        if (SKILL_LADDER_2 == u) {
                          h = E[d];
                          break;
                        }
                      } else I = E[d];
                    }
                if (h || I) {
                  var T = h || I,
                    R = new UtilMapping();
                  R.set("action_type", ACTION_CAST_MAGIC);
                  R.set("name", T.query("skill_name"));
                  R.set("para", T.queryInt("skill_no"));
                  this.sendAutoCmd(R, FALSE);
                  c = !0;
                }
              }
            }
            c || this.sendAutoCmd(this.m_petFightCmd, FALSE);
          }
          this.setCmdSended(TRUE);
          me.setBasic("c_pet_finished_cmd", TRUE);
          me.setBasic("c_me_finished_cmd", TRUE);
          FightMgr.changeMeActionFinished();
        }
      },
      isCharAutoRecoverMana: function (t, e) {
        if (null == t) return FALSE;
        var n = this.m_meFightCmd.queryInt("action_type");
        if (ACTION_CAST_MAGIC != n) return FALSE;
        var i = SkillMgr.findSkill(me.getId(), this.m_meFightCmd.query("name"));
        if (null == i) return FALSE;
        if (t.queryInt("mana") >= gfGetSkillManaCost(i)) return FALSE;
        if (
          null != e &&
          ACTION_APPLY_ITEM == this.m_petFightCmd.queryInt("action_type") &&
          me.getId() == this.m_petFightCmd.queryInt("victim_id") &&
          AutoMgr.canRecoverAtt(
            this.m_petFightCmd.queryInt("para"),
            "mana",
            t.queryBasicInt("level")
          ) > 0
        )
          return FALSE;
        var s = AutoMgr.autoFightRecover(t, "mana");
        if (null == InventoryMgr.getInventory(s)) return FALSE;
        GameMgr.doFightAction(me.getId(), me.getId(), ACTION_APPLY_ITEM, s);
        return TRUE;
      },
      isPetAutoRecoverMana: function (t, e) {
        if (null == t || null == e) return FALSE;
        var n = e.getId();
        if (t.queryInt("life") <= 0) {
          var i = AutoMgr.autoFightRecover(t, "life");
          if (null != InventoryMgr.getInventory(i)) {
            GameMgr.doFightAction(n, me.getId(), ACTION_APPLY_ITEM, i);
            return TRUE;
          }
        }
        var s = this.m_petFightCmd.queryInt("action_type");
        if (ACTION_CAST_MAGIC != s) return FALSE;
        var r = SkillMgr.findSkill(n, this.m_petFightCmd.query("name"));
        if (null == r) return FALSE;
        if (e.queryInt("mana") >= gfGetSkillManaCost(r)) return FALSE;
        if (
          ACTION_APPLY_ITEM == this.m_meFightCmd.queryInt("action_type") &&
          n == this.m_meFightCmd.queryInt("victim_id") &&
          AutoMgr.canRecoverAtt(
            this.m_meFightCmd.queryInt("para"),
            "mana",
            e.queryBasicInt("level")
          ) > 0
        )
          return FALSE;
        var _ = AutoMgr.autoFightRecover(e, "mana");
        if (null == InventoryMgr.getInventory(_)) return FALSE;
        GameMgr.doFightAction(n, n, ACTION_APPLY_ITEM, _);
        return TRUE;
      },
      isPetAutoRecoverLife: function (t, e) {
        if (null == t || null == e) return FALSE;
        if (t.queryInt("life") <= 0 && AutoFightMgr.m_isPetRecover)
          return FALSE;
        var n = e.getId();
        if (e.queryInt("life") >= 0.1 * e.queryInt("max_life")) return FALSE;
        if (
          ACTION_APPLY_ITEM == this.m_meFightCmd.queryInt("action_type") &&
          n == this.m_meFightCmd.queryInt("victim_id") &&
          AutoMgr.canRecoverAtt(
            this.m_meFightCmd.queryInt("para"),
            "life",
            e.queryBasicInt("level")
          ) > 0
        )
          return FALSE;
        var i = AutoMgr.autoFightRecover(e, "life");
        if (null == InventoryMgr.getInventory(i)) return FALSE;
        GameMgr.doFightAction(n, n, ACTION_APPLY_ITEM, i);
        return TRUE;
      },
      getStartNum: function () {
        return this.m_startNum;
      },
      setStartNum: function (t) {
        t < 5 && (t = 25);
        this.m_startNum = t;
      },
      getCmdSended: function () {
        return this.m_sended;
      },
      setCmdSended: function (t) {
        this.m_sended = t;
      },
      getAutoDelay: function () {
        return 3;
      },
      getMeInFight: function () {
        var t = FightMgr.getObjectById(me.getId());
        if (null == t) return null;
        t.setBasic("level", me.queryBasicInt("level"));
        return t;
      },
      getPetInFight: function () {
        var t = PetMgr.getInFightingScenePet();
        if (null == t) return null;
        var e = FightMgr.getObjectById(t.getId());
        if (null == e) return null;
        e.setBasic("level", t.queryBasicInt("level"));
        return e;
      },
      getPetId: function () {
        var t = PetMgr.getInFightingScenePet();
        return null != t ? t.getId() : 0;
      },
      getActorId: function (t) {
        return t ? me.getId() : this.getPetId();
      },
      skillCanUseTo: function (t, e, n) {
        if (!(e & MAY_CAST_IN_COMBAT)) return !1;
        var i = FightMgr.getObjectByPos(n);
        if (null == i || !i.isInit()) return !1;
        if (i.isDied() && !(e & MAY_CAST_DEAD)) return !1;
        if (n == FightMgr.getObjectPosById(t)) {
          if (e & CANNT_CAST_SELF) return !1;
        } else if (e & MAY_CAST_SELF) return !1;
        var s = i.queryBasicInt("type");
        do {
          if (e & MAY_CAST_ALL) break;
          var r = n >= FIGHT_OBJECTS_MAX / 2 && n < FIGHT_OBJECTS_MAX;
          if (e & MAY_CAST_ENEMY) {
            if (r) return !1;
          } else if (!r) return !1;
        } while (0);
        if (s == OBJECT_TYPE_PET) {
          if (e & CANNT_CAST_PET) return !1;
        } else if (e & ONLY_CAST_PET) return !1;
        return !(
          (e & ONLY_CAST_PET_SELF && i.queryBasicInt("owner_id") != t) ||
          (e & CANNT_CAST_GUARD && s == OBJECT_TYPE_GUARD) ||
          ((e & ONLY_CAST_FRIEND_CHAR || e & ONLY_CAST_ENEMY_CHAR) &&
            s != OBJECT_TYPE_CHAR)
        );
      },
      isNoTargetItem: function (t) {
        return t & ITEM_IN_COMBAT && t & ITEM_APPLY_NO_TARGET;
      },
      itemCanUseTo: function (t, e, n) {
        if (!(e & ITEM_IN_COMBAT)) return !1;
        var i = FightMgr.getObjectByPos(n);
        if (null == i || !i.isInit()) return !1;
        if (n == FightMgr.getObjectPosById(t) && e & ITEM_APPLY_ON_MYSELF)
          return !0;
        var s = n >= FIGHT_OBJECTS_MAX / 2 && n < FIGHT_OBJECTS_MAX;
        return (
          !!(s && e & ITEM_APPLY_ON_FRIEND) ||
          !(s || !(e & ITEM_APPLY_ON_VICTIM))
        );
      },
      getPhyAttackVictimId: function () {
        var t = FightMgr.getObjectByPos(2);
        if (null != t && t.isInit() && !t.isDied()) return t.getId();
        if (
          null != (t = FightMgr.getObjectByPos(7)) &&
          t.isInit() &&
          !t.isDied()
        )
          return t.getId();
        for (var e = 0; e < FIGHT_OBJECTS_MAX / 2; ++e)
          if (
            null != (t = FightMgr.getObjectByPos(e)) &&
            t.isInit() &&
            !t.isDied()
          )
            return t.getId();
        return 0;
      },
      getCastMagicVictimId: function (t, e) {
        if (this.skillCanUseTo(t, e, 2))
          return FightMgr.getObjectByPos(2).getId();
        if (this.skillCanUseTo(t, e, 7))
          return FightMgr.getObjectByPos(7).getId();
        for (var n = 0; n < FIGHT_OBJECTS_MAX; ++n)
          if (this.skillCanUseTo(t, e, n))
            return FightMgr.getObjectByPos(n).getId();
        return 0;
      },
      getApplyItemVictimId: function (t, e) {
        if (this.itemCanUseTo(t, e, FightMgr.getObjectPosById(t))) return t;
        if (this.itemCanUseTo(t, e, 2))
          return FightMgr.getObjectByPos(2).getId();
        if (this.itemCanUseTo(t, e, 7))
          return FightMgr.getObjectByPos(7).getId();
        for (var n = 0; n < FIGHT_OBJECTS_MAX; ++n)
          if (this.itemCanUseTo(t, e, n))
            return FightMgr.getObjectByPos(n).getId();
        return 0;
      },
      fillCmdVictim: function (t, e, n) {
        Logger.log(
          "targetPos = " + n + ",     fightCmd = " + gfToJsonString(e)
        );
        (n < 0 || n > FIGHT_OBJECTS_MAX) && (n = 2);
        var i = e.queryInt("action_type");
        if (ACTION_DEFENSE != i) {
          var s = 0,
            r = e.queryInt("para");
          if (ACTION_CAST_MAGIC != i)
            if (ACTION_PHYSICAL_ATTACK != i)
              if (ACTION_APPLY_ITEM != i);
              else {
                if (this.itemExist(r, e)) {
                  var _ = InventoryMgr.getInventory(e.queryInt("para"));
                  if (null != _) {
                    var a = _.queryBasicInt("attrib");
                    s = this.isNoTargetItem(a)
                      ? t
                      : this.itemCanUseTo(t, a, n)
                      ? FightMgr.getObjectByPos(n).getId()
                      : this.getApplyItemVictimId(t, a);
                  }
                }
                e.set("victim_id", s);
              }
            else {
              var o = FightMgr.getObjectByPos(n);
              s =
                null != o && o.isInit() && !o.isDied()
                  ? o.getId()
                  : this.getPhyAttackVictimId();
              e.set("victim_id", s);
            }
          else {
            if (
              SKILL_YANGJING_XURUI == r ||
              SKILL_FALI_HUDUN == r ||
              SKILL_YIHUA_JIEMU == r ||
              SKILL_PIAOMIAO_XUHUAN == r ||
              SKILL_HOUFA_ZHIREN == r ||
              SKILL_SHIXUE_KUANGLUAN == r ||
              SKILL_JINSHEN_BUMIE == r ||
              SKILL_RUHUAN_SIMENG == r ||
              SKILL_RENCHONG_HETI == r ||
              SKILL_XIANYUN_MIWU == r
            ) {
              s =
                SKILL_RUHUAN_SIMENG == r
                  ? this.getPetId()
                  : SKILL_RENCHONG_HETI == r
                  ? me.getId()
                  : t;
              e.set("victim_id", s);
              return;
            }
            var c = 0,
              l = ConSklsMgr.getSklByNo(r);
            null != l && (c = l.queryInt("auto_sel_obj"));
            if (0 != c) {
              s = 1 == c ? me.getId() : 2 == c ? this.getPetId() : t;
              e.set("victim_id", s);
              return;
            }
            var E = SkillMgr.findSkill(t, e.query("name"));
            if (null == E) {
              e.set("victim_id", s);
              return;
            }
            var I = E.queryInt("skill_attrib");
            s = this.skillCanUseTo(t, I, n)
              ? FightMgr.getObjectByPos(n).getId()
              : this.getCastMagicVictimId(t, I);
            e.set("victim_id", s);
          }
        } else e.set("victim_id", t);
      },
      sendAutoCmd: function (t, e) {
        if (null != t) {
          var n = this.getActorId(e);
          if (0 != n && null != FightMgr.getObjectById(n)) {
            this.fillCmdVictim(
              n,
              t,
              e ? AutoFightMgr.m_charTarget : AutoFightMgr.m_petTarget
            );
            var i = t.queryInt("victim_id");
            0 == i
              ? this.sendDefaultCmd(e)
              : GameMgr.doFightAction(
                  n,
                  i,
                  t.queryInt("action_type"),
                  t.queryInt("para")
                );
          } else {
            Logger.error("sendAutoCmd have no actor");
            Logger.report();
          }
        }
      },
      sendDefaultCmd: function (t) {
        var e = this.getActorId(t);
        if (0 != e && null != FightMgr.getObjectById(e)) {
          var n = new UtilMapping();
          n.set("action_type", ACTION_PHYSICAL_ATTACK);
          this.fillCmdVictim(
            e,
            n,
            t ? AutoFightMgr.m_charTarget : AutoFightMgr.m_petTarget
          );
          GameMgr.doFightAction(
            e,
            n.queryInt("victim_id"),
            ACTION_PHYSICAL_ATTACK,
            ""
          );
        } else {
          Logger.error("sendDefaultCmd have no actor");
          Logger.report();
        }
      },
      sendDefenseCmd: function (t) {
        var e = this.getActorId(t);
        if (0 != e && null != FightMgr.getObjectById(e)) {
          var n = new UtilMapping();
          n.set("action_type", ACTION_DEFENSE);
          this.fillCmdVictim(
            e,
            n,
            t ? AutoFightMgr.m_charTarget : AutoFightMgr.m_petTarget
          );
          GameMgr.doFightAction(e, n.queryInt("victim_id"), ACTION_DEFENSE, "");
        }
      },
      itemExist: function (t, e) {
        if (-1 == t) return TRUE;
        do {
          var n = InventoryMgr.getInventory(t);
          if (null == n) break;
          if (e.query("name") != n.getName()) break;
          return TRUE;
        } while (0);
        var i = InventoryMgr.findSameInventory(t, e.query("name"));
        if (0 == i) return FALSE;
        e.set("para", i);
        return TRUE;
      },
      updateAutoCmd: function (t, e) {
        if (e) {
          this.m_meFightCmd.cleanup();
          this.m_meFightCmd.absorbFields(t);
        } else {
          this.m_petFightCmd.cleanup();
          this.m_petFightCmd.absorbFields(t);
        }
      },
    };
    cc._RF.pop();
  },
  {},
];
