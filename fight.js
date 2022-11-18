FightMgr: [
    function (t, e) {
      "use strict";
      cc._RF.push(e, "2d6af7YeEpHB6HyHoO5awpM", "FightMgr");
      t("FightOpponent");
      t("FightFriend");
      t("FightPet");
      var n = t("UnitUpdate"),
        i = t("UnitUpdateImprove"),
        s = t("UnitOpponentInfo"),
        r = t("Game"),
        _ = t("FightLayer");
      e.exports = {
        regMsg: function (t, e) {
          Communicate.registerCallback(t, this, e);
        },
        regMsg2: function (t, e, n) {
          Communicate.registerCallback(t, this, n);
          Communicate.registerCallback(e, this, n);
        },
        init: function () {
          this.regMsg(MsgDefines.MSG_C_START_COMBAT, this.onMsgCStartCombat);
          this.regMsg(MsgDefines.MSG_C_END_COMBAT, this.onMsgCEndCombat);
          this.regMsg2(
            MsgDefines.MSG_C_FRIENDS,
            MsgDefines.MSG_LC_FRIENDS,
            this.onMsgCFriends
          );
          this.regMsg2(
            MsgDefines.MSG_C_OPPONENTS,
            MsgDefines.MSG_LC_OPPONENTS,
            this.onMsgCOpponents
          );
          this.regMsg2(
            MsgDefines.MSG_C_WAIT_COMMAND,
            MsgDefines.MSG_LC_WAIT_COMMAND,
            this.onMsgCWaitCommand
          );
          this.regMsg(MsgDefines.MSG_C_END_ROUND, this.onMsgCEndRound);
          this.regMsg(
            MsgDefines.MSG_C_ACCEPTED_COMMAND,
            this.onMsgCAcceptedCommand
          );
          this.regMsg2(
            MsgDefines.MSG_C_LEAVE_AT_ONCE,
            MsgDefines.MSG_LC_LEAVE_AT_ONCE,
            this.onMsgCLeaveAtOnce
          );
          this.regMsg(
            MsgDefines.MSG_C_COMMAND_ACCEPTED,
            this.onMsgCCommandAccepted
          );
          this.regMsg(
            MsgDefines.MSG_C_REFRESH_PET_LIST,
            this.onMsgCRerreshPetList
          );
          this.regMsg(
            MsgDefines.MSG_C_REFRESH_CHILD_LIST,
            this.onMsgCRerreshChildList
          );
          this.regMsg2(
            MsgDefines.MSG_C_SANDGLASS,
            MsgDefines.MSG_LC_SANDGLASS,
            this.onMsgCSandglass
          );
          this.regMsg2(
            MsgDefines.MSG_C_CHAR_OFFLINE,
            MsgDefines.MSG_LC_CHAR_OFFLINE,
            this.onMsgCCharOffline
          );
          this.regMsg(
            MsgDefines.MSG_GODBOOK_EFFECT_NORMAL,
            this.onMsgGodbookEffectNormal
          );
          this.regMsg(
            MsgDefines.MSG_GRAY_COMBAT_MENU,
            this.onMsgGrayCombatMenu
          );
          this.regMsg(MsgDefines.MSG_C_DIRECT_UPDATE, this.onMsgCUpdate);
          this.regMsg(
            MsgDefines.MSG_C_DIRECT_OPPONENT_INFO,
            this.onMsgCDirectOpponentInfo
          );
          this.regMsg(
            MsgDefines.MSG_SKILL_FROZEN_LIST,
            this.onMsgSkillFrozenList
          );
          this.regMsg(
            MsgDefines.MSG_C_ROUND_ANIMATE_TIME,
            this.onMsgCRoundAnimateTime
          );
          this.m_init = !0;
          this.m_combatType = 0;
          this.m_combatMode = 0;
          this.m_newRoundTime = 0;
          this.m_totalRound = 0;
          this.m_cookie = 0;
          this.m_combatEndTime = 0;
          this.m_useArtifactBack = !1;
          this.m_friendToAdd = [];
          this.m_cMsgToUpdate = [];
          this.m_fightObjectCon = [];
          this.m_showSandglass = !1;
          this.m_sandglass = [];
          this.m_frozenSkillList = {};
          this.m_selectMenu = FALSE;
          this.m_countDown = 0;
          this.m_animateEndTime = -1;
          this.m_tmpNames = {};
          this.m_shouldFlee = FALSE;
          this.m_meInputFaliedTimes = 0;
          this.m_petInputFaliedTimes = 0;
          for (var t = 0; t < FIGHT_OBJECT_MAX / 2; ++t)
            this.m_fightObjectCon.push(new FightOpponent());
          for (var e = 0; e < FIGHT_OBJECT_MAX / 4; ++e)
            this.m_fightObjectCon.push(new FightPet());
          for (var n = 0; n < FIGHT_OBJECT_MAX / 4; ++n)
            this.m_fightObjectCon.push(new FightFriend());
          var i = new CombatObj();
          i.setBasic("id", COMBAT_OBJ_ID);
          this.m_fightObjectCon.push(i);
          me.setBasic("c_enable_input", FALSE);
        },
        cleanup: function () {
          this.m_init = !1;
        },
        update: function (t) {
          if (this.m_init) {
            for (var e = this.m_fightObjectCon.length, n = 0; n < e; ++n) {
              var i = this.m_fightObjectCon[n];
              i.isInit() && i.update(t);
            }
            if (0 != this.m_countDown) {
              this.m_countDown -= t;
              this.m_countDown < 0 && (this.m_countDown = 0);
            }
            if (
              !GameMgr.combatIsEnd() &&
              !AutoFight.getCmdSended() &&
              FightActMgr.isEmpty(PROCESS_COMBAT_MSG) &&
              SeqMgr.allIsEnd()
            ) {
              if (this.m_shouldFlee) {
                Communicate.cmdToServer(
                  MsgDefines.CMD_C_FLEE,
                  new UtilMapping()
                );
                me.setBasic("c_me_finished_cmd", TRUE);
                null != _.instance && _.instance.enableFleeBtn();
                this.m_shouldFlee = FALSE;
              }
              AutoFight.sendAutoFightCmd(1 == this.m_totalRound);
              this.m_animateEndTime = 0;
            }
            -1 != this.m_animateEndTime &&
              0 != this.m_animateEndTime &&
              Date.now() > this.m_animateEndTime &&
              (this.m_animateEndTime = -1);
          }
        },
        setFlee: function () {
          this.m_shouldFlee = TRUE;
        },
        canEndAnimate: function () {
          return -1 == this.m_animateEndTime;
        },
        setCombatType: function (t) {
          this.m_combatType = t;
        },
        getCombatType: function () {
          return this.m_combatType;
        },
        setCombatMode: function (t) {
          this.m_combatMode = t;
        },
        getCombatMode: function () {
          return this.m_combatMode;
        },
        getNewRoundTime: function () {
          return this.m_newRoundTime;
        },
        setNewRoundTime: function (t) {
          this.m_newRoundTime = t;
        },
        setUseArtifactBack: function (t) {
          this.m_useArtifactBack = t;
        },
        isUseArtifactBack: function () {
          return this.m_useArtifactBack;
        },
        setCombatEndTime: function (t) {
          this.m_combatEndTime = t;
        },
        getCombatEndTime: function () {
          return this.m_combatEndTime;
        },
        clearTotalRound: function () {
          this.m_totalRound = 0;
        },
        setEndCookie: function (t) {
          this.m_cookie = t;
        },
        doEndAnimate: function () {
          if (0 != this.m_cookie) {
            gfCmdToServer(
              MsgDefines.CMD_C_END_ANIMATE,
              "cookie=%d",
              this.m_cookie
            );
            this.m_cookie = 0;
          }
        },
        clearNewFriend: function () {
          this.m_friendToAdd = [];
        },
        clearCMsgToUpdate: function () {
          this.m_cMsgToUpdate = [];
        },
        updatePetSpecialFields: function () {},
        getObjectByPos: function (t) {
          return this.m_fightObjectCon.length < FIGHT_OBJECT_MAX
            ? null
            : t < 0 || t >= FIGHT_OBJECT_MAX
            ? null
            : this.m_fightObjectCon[t];
        },
        getObjectById: function (t) {
          for (var e = this.m_fightObjectCon.length, n = 0; n < e; ++n) {
            var i = this.m_fightObjectCon[n];
            if (i.getId() == t) return i;
          }
          return null;
        },
        getObjectPosById: function (t) {
          for (var e = this.m_fightObjectCon.length, n = 0; n < e; ++n)
            if (this.m_fightObjectCon[n].getId() == t) return n;
          return -1;
        },
        addTmpName: function (t, e) {
          this.m_tmpNames[t] = e;
        },
        getObjectNameById: function (t) {
          var e = this.getObjectById(t);
          if (null != e) return e.getName();
          var n = this.m_tmpNames[t];
          return null != n ? n : "";
        },
        getFriPetPosByOwnerId: function (t) {
          if (this.m_fightObjectCon.length < FIGHT_OBJECT_MAX) return -1;
          for (var e = 0; e < FIGHT_OBJECT_MAX; ++e)
            if (this.m_fightObjectCon[e].getId() == t)
              return e - FIGHT_OBJECT_MAX / 4;
          return -1;
        },
        getFriPetByOwnerId: function (t) {
          if (this.m_fightObjectCon.length < FIGHT_OBJECT_MAX) return null;
          var e = this.getFriPetPosByOwnerId(t);
          return e < 0 || e >= FIGHT_OBJECT_MAX
            ? null
            : this.m_fightObjectCon[e];
        },
        offlineSomeone: function () {},
        sandglassSomeone: function () {},
        beShowSandglass: function (t) {
          for (var e = this.m_sandglass.length, n = 0; n < e; n++)
            if (t == this.m_sandglass[n]) return !this.m_showSandglass;
          return this.m_showSandglass;
        },
        clearFrozenSkillList: function () {
          this.m_frozenSkillList = {};
        },
        haveStatus: function (t, e) {
          var n = Math.floor(e / STATUS_SIZE);
          return !(n >= t.length || !(t[n] & (1 << e % STATUS_SIZE)));
        },
        updateRoundAni: function () {
          var t = "#r";
          t += TxtRes(1036893);
          t += "#R";
          t += gfArabic2Chinese(this.m_totalRound);
          t += "#n";
          t += TxtRes(1036894);
          null != _.instance && _.instance.addContent(t, !0);
        },
        setPetFinishCmd: function () {},
        changeMeActionFinished: function () {
          this.closeAllWindow();
          me.queryBasicInt("c_pet_finished_cmd") &&
            me.queryBasicInt("c_me_finished_cmd") &&
            CriticalMgr.cleanAllAction();
        },
        clearStatus: function () {
          this.closeAllWindow();
        },
        closeAllWindow: function () {},
        addNewFriend: function (t) {
          for (var e = this.m_friendToAdd.length, n = 0; n < e; ++n)
            if (t == this.m_friendToAdd[n]) return;
          this.m_friendToAdd.push(t);
        },
        delNewFriend: function (t) {
          for (var e = this.m_friendToAdd.length, n = 0; n < e; ++n)
            if (t == this.m_friendToAdd[n]) {
              this.m_friendToAdd.splice(n, 1);
              return;
            }
        },
        addCMsgToUpdate: function (t) {
          for (
            var e = t.queryInt("id"), n = this.m_friendToAdd.length, i = 0;
            i < n;
            ++i
          )
            if (e == this.m_friendToAdd[i]) return;
          this.m_cMsgToUpdate.push(t);
        },
        executeCMsgToUpdate: function (t) {
          for (var e = 0; e < this.m_cMsgToUpdate.length; )
            if (this.m_cMsgToUpdate[e].queryInt("id") == t) {
              var n = new i();
              n.setUnitIds(t, t);
              n.initMapping(this.m_cMsgToUpdate[e]);
              n.execute();
              this.m_cMsgToUpdate.splice(e, 1);
            } else ++e;
        },
        combatEnd: function () {
          AutoFightMgr.doWhenEndCombat();
          GameMgr.setCombatEnd(!0);
          FightActMgr.setMsgFlag(!1);
          this.setCombatEndTime(Date.now());
          this.clearTotalRound();
          this.clearNewFriend();
          this.clearCMsgToUpdate();
          this.m_countDown = 0;
          0 == this.m_animateEndTime && (this.m_animateEndTime = -1);
          _.instance && _.instance.closeStopAutoBtn();
        },
        autoFightRoundProcess: function () {
          for (var t = -1, e = 0; e < MAX_N_CONFIG; ++e)
            if (AutoFightMgr.getRoundCheck(e)) {
              var n = AutoFightMgr.getRound(e);
              if (null != n && "" != n) {
                if ("D" == n) {
                  if (-1 != t) continue;
                  if (0 == this.m_totalRound % 2) continue;
                } else if ("S" == n) {
                  if (-1 != t) continue;
                  if (0 != this.m_totalRound % 2) continue;
                } else if (gfToNumber(n) != this.m_totalRound) continue;
                t = e;
              }
            }
          -1 != t && AutoFightMgr.changeConfig(t);
        },
        onMsgCStartCombat: function (t) {
          GameMgr.changeState(SS_NORMAL_STATE);
          this.setCombatType(t.queryInt("combat_type"));
          this.setCombatMode(t.queryInt("combat_mode"));
          this.setUseArtifactBack(!1);
          if (t.queryInt("flag")) {
            GameMgr.changeState(SS_FIGHT_STATE);
            null != r.instance && r.instance.openFightLayer();
            GameMgr.m_startCombatCount <= 0 &&
              null != _.instance &&
              _.instance.playAni();
            GameMgr.m_startCombatCount++;
          } else GameMgr.changeState(SS_CRITICAL_STATE);
          GameMgr.setCombatEnd(!1);
          FightActMgr.setMsgFlag(!0);
          MsgDelayMgr.quickProcessAll(!0);
          this.setCombatEndTime(0);
          this.clearTotalRound();
          AutoFight.setCmdSended(TRUE);
        },
        onMsgCEndCombat: function (t) {
          GameMgr.m_startCombatCount = 0;
          this.combatEnd(t);
          AutoMgr.repaireEquip();
        },
        onMsgCFriends: function (t) {
          var e = t.length;
          if (!(e <= 0)) {
            for (var n = "", i = 0; i < e; ++i) {
              var s = t[i],
                r = s.queryInt("pos"),
                a = null;
              if (r > 0) {
                r <= FIGHT_OBJECT_MAX / 2 && (r = FIGHT_OBJECT_MAX + 1 - r);
                a = this.getObjectByPos(r - 1);
              }
              if (null != a) {
                a.cleanup();
                a.absorbBasicFields(s);
                a.create();
                a.recover();
                if (a instanceof FightFriend && a.getName() != me.getName()) {
                  "" != n && (n += TxtRes(1002543));
                  n += "#Y";
                  n += a.getName();
                  n += "#n";
                }
              }
            }
            null != _.instance &&
              ("" != n
                ? _.instance.addContent(
                    TxtRes(1036895) + n + TxtRes(1036896),
                    !0
                  )
                : _.instance.addContent(TxtRes(1036897), !0));
          }
        },
        onMsgCOpponents: function (t) {
          var e = t.length;
          if (!(e <= 0))
            for (var n = 0; n < e; ++n) {
              var i = t[n],
                s = i.queryInt("pos"),
                r = null;
              if (s > 0) {
                s > FIGHT_OBJECT_MAX / 2 && (s = FIGHT_OBJECT_MAX + 1 - s);
                r = this.getObjectByPos(s - 1);
              }
              if (null != r) {
                r.cleanup();
                r.absorbBasicFields(i);
                r.create();
                r.recover();
              }
            }
        },
        onMsgCWaitCommand: function (t) {
          this.m_newRoundTime = Date.now();
          CriticalMgr.setFlag(!1);
          this.m_tmpNames = {};
          FightActMgr.deleteSnycMsg(MsgDefines.MSG_C_WAIT_COMMAND);
          this.clearFrozenSkillList();
          if (COMBAT_MODE_ANTICHEATER == this.getCombatMode()) {
            var e = cc.find("Canvas/Menu");
            cc.isValid(e) && e.destroy();
          }
          var n = t.queryInt("time");
          this.m_selectMenu = t.queryInt("menu");
          if (!(n < 0)) {
            if (COMBAT_TYPE_ASKTAOTAOTAO != this.getCombatType()) {
              this.m_totalRound = t.queryInt("cur_round");
              this.updateRoundAni();
              this.autoFightRoundProcess();
            }
            1 == this.m_selectMenu
              ? this.sandglassSomeone(t.queryInt("id"), TRUE)
              : 0 == this.m_selectMenu && this.sandglassSomeone(-1, TRUE);
            if (1 != this.m_selectMenu) {
              this.m_countDown = n;
              AutoFight.setStartNum(n);
              AutoFight.setCmdSended(FALSE);
              me.setBasic("c_enable_input", TRUE);
              this.m_meInputFaliedTimes = 0;
              this.m_petInputFaliedTimes = 0;
              me.setBasic("c_me_finished_cmd", FALSE);
              me.setBasic("c_pet_finished_cmd", FALSE);
              this.setPetFinishCmd(!0);
              this.closeAllWindow();
            } else this.closeAllWindow();
          }
        },
        onMsgCEndRound: function (t) {
          this.setEndCookie(t.queryInt("cookie"));
        },
        onMsgCAcceptedCommand: function (t) {
          t.queryInt("me_accepted") > 0 &&
            me.setBasic("c_me_finished_cmd", TRUE);
          t.queryInt("pet_accepted") > 0 &&
            me.setBasic("c_pet_finished_cmd", TRUE);
          AutoFight.sendAutoFightCmd(1 == this.m_totalRound);
          -1 == this.m_animateEndTime && (this.m_animateEndTime = 0);
        },
        onMsgCLeaveAtOnce: function (t) {
          var e = this.getObjectById(t.queryInt("id"));
          null != e && e.cleanup();
        },
        onMsgCCommandAccepted: function (t) {
          if (me.queryBasicInt("c_enable_input")) {
            var e = t.queryInt("id");
            if (0 == t.queryInt("result")) {
              var n;
              if (
                1 ==
                (n =
                  e == me.getId()
                    ? ++this.m_meInputFaliedTimes
                    : ++this.m_petInputFaliedTimes)
              )
                AutoFight.sendDefaultCmd(e == me.getId());
              else if (2 == n) AutoFight.sendDefenseCmd(e == me.getId());
              else {
                Logger.error(
                  "onMsgCCommandAccepted proc failed too many times"
                );
                Logger.report();
              }
            }
          }
        },
        onMsgCRerreshPetList: function () {},
        onMsgCRerreshChildList: function () {},
        onMsgCSandglass: function (t) {
          this.sandglassSomeone(t.queryInt("id"), t.queryInt("show"));
        },
        onMsgCCharOffline: function (t) {
          this.offlineSomeone(t.queryInt("id"), t.queryInt("offline"));
        },
        onMsgGodbookEffectNormal: function () {},
        onMsgGrayCombatMenu: function () {},
        onMsgCUpdate: function (t) {
          var e = t.queryInt("id"),
            i = new n();
          i.setUnitIds(e, e);
          i.initMapping(t);
          i.execute();
        },
        onMsgCDirectOpponentInfo: function (t) {
          for (var e = t.length, n = 0; n < e; ++n) {
            var i = t[n].queryInt("id"),
              r = new s();
            r.setUnitIds(i, i);
            r.initMapping(t[n]);
            r.execute();
          }
        },
        onMsgSkillFrozenList: function () {},
        onMsgCRoundAnimateTime: function (t) {
          var e = t.queryInt("time");
          e < 1e3 && (e = 1e3);
          this.m_animateEndTime = Date.now() + e;
          _.instance && _.instance.adjustShowList(e);
        },
      };
      cc._RF.pop();
    },
    {
      FightFriend: "FightFriend",
      FightLayer: "FightLayer",
      FightOpponent: "FightOpponent",
      FightPet: "FightPet",
      Game: "Game",
      UnitOpponentInfo: "UnitOpponentInfo",
      UnitUpdate: "UnitUpdate",
      UnitUpdateImprove: "UnitUpdateImprove",
    },
  ]