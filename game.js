GameMgr: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "1b2a3aX6SROmZ2x8eMCqHmu", "GameMgr");
    var n = t("Game"),
      i = t("LoginBroadcast"),
      s = [
        [
          MsgDefines.CMD_C_DO_ACTION_0,
          MsgDefines.CMD_C_DO_ACTION_1,
          MsgDefines.CMD_C_DO_ACTION_2,
        ],
        [
          MsgDefines.CMD_OPEN_MENU_0,
          MsgDefines.CMD_OPEN_MENU_1,
          MsgDefines.CMD_OPEN_MENU_2,
        ],
        [
          MsgDefines.CMD_SELECT_MENU_ITEM_0,
          MsgDefines.CMD_SELECT_MENU_ITEM_1,
          MsgDefines.CMD_SELECT_MENU_ITEM_2,
        ],
        [
          MsgDefines.CMD_ENTER_ROOM_0,
          MsgDefines.CMD_ENTER_ROOM_1,
          MsgDefines.CMD_ENTER_ROOM_2,
        ],
      ],
      r = [0, 0, 0, 0],
      _ = [];
    e.exports = {
      addMgr: function (t) {
        _.push(t);
      },
      init: function (t) {
        this.m_spriteState = SS_LOGIN_STATE;
        this.m_combatEnd = !1;
        this.m_dist = "";
        this.m_serverName = "";
        this.m_isTest = !1;
        this.m_serverTimeZone = 28800;
        this.m_targetGs = "";
        if (!t) {
          this.m_account = "";
          this.m_authKey = "";
          this.m_seed = "";
        }
        this.m_canTryReconnect = null;
        this.m_xinFaWeekCardBuy = 0;
        this.m_xinFaWeekCardReward = 0;
        this.m_xinFaWeekCardLeftTimes = 0;
        this.m_startCombatCount = 0;
        this.m_strDunBondType = "";
        me.cleanup();
        gfLoadAniNo();
        for (var e = _.length, n = 0; n < e; ++n) {
          var i = _[n];
          null != i.init && i.init.call(i, t);
        }
        FightMgr.cleanup();
        Communicate.registerCallback(
          MsgDefines.MSG_SWITCH_SERVER,
          this,
          this.onMsgSwitchServer
        );
        Communicate.registerCallback(
          MsgDefines.MSG_SWITCH_SERVER_EX,
          this,
          this.onMsgSwitchServerEx
        );
        Communicate.registerCallback(
          MsgDefines.MSG_DIALOG_OK,
          this,
          this.onMsgDialogOk
        );
        Communicate.registerCallback(
          MsgDefines.MSG_ENTER_GAME,
          this,
          this.onMsgEnterGame
        );
        Communicate.registerCallback(
          MsgDefines.MSG_MENU_LIST,
          this,
          this.onMsgMenuList
        );
        Communicate.registerCallback(
          MsgDefines.MSG_MENU_CLOSED,
          this,
          this.onMsgMenuClosed
        );
        Communicate.registerCallback(
          MsgDefines.MSG_PICTURE_DIALOG,
          this,
          this.onMsgPictureDialog
        );
        Communicate.registerCallback(
          MsgDefines.MSG_C_MENU_LIST,
          this,
          this.onMsgCMenuList
        );
        Communicate.registerCallback(
          MsgDefines.MSG_C_MENU_LIST_EX,
          this,
          this.onMsgCMenuList
        );
        Communicate.registerCallback(
          MsgDefines.MSG_LC_MENU_LIST,
          this,
          this.onMsgCMenuList
        );
        Communicate.registerCallback(
          MsgDefines.MSG_GENERAL_NOTIFY,
          this,
          this.onMsgGeneralNotify
        );
        Communicate.registerCallback(
          MsgDefines.MSG_TITLE,
          this,
          this.onMsgTitle
        );
        Communicate.registerCallback(
          MsgDefines.MSG_DIALOG,
          this,
          this.onMsgRequest
        );
        Communicate.registerCallback(
          MsgDefines.MSG_CLEAN_REQUEST,
          this,
          this.onMsgCleanRequest
        );
        Communicate.registerCallback(
          MsgDefines.MSG_OPEN_MENU,
          this,
          this.onMsgOpenMenu
        );
        Communicate.registerCallback(
          MsgDefines.MSG_TELEPORT_EX,
          this,
          this.onMsgTeleportEx
        );
        Communicate.registerCallback(
          MsgDefines.MSG_OPEN_CONFIRM_DLG,
          this,
          this.onOpenConfirmDlg
        );
        Communicate.registerCallback(
          MsgDefines.MSG_PET_XINFA_EXP_CARD,
          this,
          this.onMsgPetXinfaExpCard
        );
        Communicate.registerCallback(
          MsgDefines.MSG_AUTH_VIP_SMS,
          this,
          this.onMsgAuthVipSms
        );
        Communicate.registerCallback(
          MsgDefines.MSG_OPEN_AUTH_ALL_PROTECT,
          this,
          this.onMsgOpenAuthAllProtect
        );
        Communicate.registerCallback(
          MsgDefines.MSG_PASSWORD_DLG,
          this,
          this.onMsgPasswordDlg
        );
        Communicate.registerCallback(
          MsgDefines.MSG_OPEN_DIALOG,
          this,
          this.onMsgOpenDlg
        );
        Communicate.registerCallback(
          MsgDefines.MSG_SUBMIT_CONFIRM_DLG,
          this,
          this.onMsgSubmitConfirmDlg
        );
        Communicate.registerCallback(
          MsgDefines.MSG_MOBILE_COMMON_RED_POINT,
          this,
          this.onMsgMobileCommonRedPoint
        );
      },
      reloadJson: function () {
        for (var t = _.length, e = 0; e < t; ++e) {
          var n = _[e];
          null != n.reloadJson && n.init.call(n);
        }
      },
      onGSConnected: function () {
        Logger.log("connect to GS success");
        var t = new UtilMapping();
        t.set("user", this.m_account);
        t.set("auth_key", this.m_authKey);
        t.set("seed", this.m_seed);
        t.set("version", gfEncryptVersion(MOBILE_CLIENT_VERSION_INNER));
        t.set("client_type", this.getClientType());
        MOBILE_CLIENT &&
          t.set(
            "mobile",
            gfDesEncryptAt(this.m_account.toLowerCase(), "gbits")
          );
        Communicate.cmdToServer(MsgDefines.CMD_LOGIN, t);
      },
      doReturnLoginScene: function () {
        cc.director._loadingScene
          ? cc.director.once(
              cc.Director.EVENT_AFTER_SCENE_LAUNCH,
              function () {
                Logger.log("cc.Director.EVENT_AFTER_SCENE_LAUNCH");
                this.loadScene("LoginScene");
              }.bind(this)
            )
          : this.loadScene("LoginScene");
      },
      onGSConnectClosed: function () {
        Logger.log("GS connection closed");
        this.m_canTryReconnect && null != n.instance
          ? n.instance.scheduleOnce(function () {
              ReconnectMgr.reconnect();
            }, 1)
          : this.doReturnLoginScene();
      },
      setGSConnectProc: function () {
        Communicate.setConnecttedCallback(this, this.onGSConnected);
        Communicate.setClosedCallback(this, this.onGSConnectClosed);
      },
      update: function (t) {
        Communicate.update();
        for (var e = _.length, i = 0; i < e; ++i) {
          var s = _[i];
          null != s.update && s.update.call(s, t);
        }
        if (CriticalMgr.isEnd()) {
          this.setCombatEnd(!1);
          this.changeState(SS_NORMAL_STATE);
          null != n.instance && n.instance.closeFightLayer();
        }
        CriticalMgr.doNextAction();
        MsgDelayMgr.quickProcessAll(!1);
      },
      setTargetGs: function (t) {
        this.m_targetGs = t;
      },
      getTargetGs: function () {
        return this.m_targetGs;
      },
      setAccount: function (t) {
        this.m_account = t;
      },
      getAccount: function () {
        return this.m_account;
      },
      getDist: function () {
        return this.m_dist;
      },
      getServerName: function () {
        return this.m_serverName;
      },
      getClientType: function () {
        var t = CLIENT_TYPE_NORMAL;
        if (MOBILE_CLIENT) {
          t = CLIENT_TYPE_MOBILE_IOS;
          cc.sys.os === cc.sys.OS_ANDROID && (t = CLIENT_TYPE_MOBILE_ANDROID);
        }
        return t;
      },
      changeState: function (t) {
        CriticalMgr.cleanAllAction();
        switch (t) {
          case SS_NORMAL_STATE:
            if (
              SS_CRITICAL_STATE == this.m_spriteState &&
              COMBAT_MODE_ANTICHEATER == FightMgr.getCombatMode()
            ) {
              var e = cc.find("Canvas/Menu");
              cc.isValid(e) && e.destroy();
            }
            FightMgr.cleanup();
            break;

          case SS_CRITICAL_STATE:
            break;

          case SS_FIGHT_STATE:
            FightMgr.init();
            FightActMgr.init();
            SeqMgr.init();
            break;

          case SS_LOGIN_STATE:
        }
        this.m_spriteState = t;
      },
      getSpriteState: function () {
        return this.m_spriteState;
      },
      combatIsEnd: function () {
        return this.m_combatEnd;
      },
      setCombatEnd: function (t) {
        this.m_combatEnd = t;
      },
      isTestDist: function () {
        return this.m_isTest;
      },
      tryOpenTeamInvite: function () {
        var e = t("Game");
        null != e.instance && e.instance.tryOpenTeamInvite();
      },
      refreshTeamInvite: function () {
        var e = t("TeamInviteLayer");
        null != e.instance && e.instance.refresh();
      },
      switchLine: function (t) {
        if (t.queryInt("result")) {
          var e = t.query("msg"),
            s = gfExplodeString(e, " ");
          if (4 == s.length) {
            n.switchInfo = {
              agreeDisclaimerState: i._agreeDisclaimer,
              agreeDisclaimerGid: me.queryBasic("gid"),
            };
            this.m_authKey = s[2];
            this.m_seed = s[3];
            gfShowSmallTips(TxtRes(45581) + this.m_targetGs);
            Communicate.close();
            this.init(!0);
            this.setGSConnectProc();
            Communicate.connect("ws://" + s[0] + ":" + s[1]);
          }
        } else gfShowSmallTips(t.query("msg"));
      },
      onMsgSwitchServer: function (t) {
        this.m_canTryReconnect = null;
        this.switchLine(t);
      },
      onMsgSwitchServerEx: function (t) {
        this.m_canTryReconnect = null;
        GameMgr.setTargetGs(t.query("server_name"));
        this.switchLine(t);
      },
      onMsgDialogOk: function (t) {
        var e = t.query("text"),
          n = ConfigMgr.parseServerResText(e);
        n.bFind && (e = n.strInfo);
        gfShowSmallTips(e);
        0 != t.queryInt("channel") && gfSendChannelMsg(CHANNEL_MISC, e);
      },
      onMsgEnterGame: function (t) {
        this.m_dist = t.query("dist");
        this.m_serverName = t.query("server_name");
        gfSetLevelDist(t.queryInt("is_level_dist"));
        (!cc.sys.isBrowser && null != window.jsb) ||
        "" == window.g_strCodingJdDistName
          ? gfSetDistFlag(this.m_dist, !0)
          : gfSetDistFlag(window.g_strCodingJdDistName, !1);
        this.m_isTest =
          -1 != this.m_dist.indexOf(TxtRes(1005060)) ||
          -1 != this.m_dist.indexOf(TxtRes(57860));
        this.saveCmdIdx(t.query("server_time"));
        this.saveServerTime(
          t.queryInt("server_time_offset"),
          t.queryInt("server_time_zone")
        );
        this.m_loginTick = Date.now();
        this.loadScene("GameScene");
        this.m_canTryReconnect = !0;
        ReconnectMgr.clear();
        this.setGSConnectProc();
        AutoFightMgr.loadAutoFightConfig();
        SocInfoMgr.loadLocalFriendInfo();
        this.changeState(SS_NORMAL_STATE);
        Communicate.setCanProcMsg(!1);
        var e = gfGetComputerId();
        ReconnectMgr.setWid(e);
        BuyPlatformMgr.addTestDistVipItem();
        gfCmdToServer(MsgDefines.CMD_LOCAL_ENCRYPT_LOCK_FAILED, "wid = %s", e);
        gfCmdToServer(
          MsgDefines.CMD_MOBILE_VERIFY_DEVICE,
          "info = %s",
          gfGetEncryptedEmulatorInfo()
        );
        gfNotify(NotifyDefines.NOTIFY_QUERY_TODAY_STAT_BONUS);
      },
      onMsgMenuList: function (t) {
        n.instance && n.instance.showMenu(t);
      },
      onMsgMenuClosed: function () {},
      onMsgPictureDialog: function (t) {
        if (COMBAT_MODE_ANTICHEATER == FightMgr.getCombatMode()) {
          t.set("atass_use", 2);
          t.set("no_menu", 1);
          n.instance && n.instance.showMenu(t);
        }
      },
      onMsgCMenuList: function (t) {
        if (COMBAT_MODE_ANTICHEATER == FightMgr.getCombatMode()) {
          t.set("atass_use", 2);
          t.set("fight_menu", 1);
          n.instance && n.instance.showMenu(t);
        }
      },
      onMsgGeneralNotify: function (t) {
        NoticeDefines.onMsgGeneralNotify(t);
      },
      onMsgTitle: function (t) {
        me.getId() == t.queryInt("id") && me.refreshTitle(t);
      },
      onMsgRequest: function (t) {
        for (var e = t.length, n = 0; n < e; ++n) {
          var i = t[n],
            s = i.query("ask_type");
          switch (s) {
            case REQUEST_JOIN_TEAM:
            case REQUEST_JOIN_TEAM_REMOTE:
              TeamMgr.add(i, FALSE);
              TeamExMgr.addApplyer(i);
              CorpsMgr.addRequestType(
                REQUEST_JOIN_TEAM == s ? CM_TEAM_APPLY : CM_TEAM_APPLY_REMOTE
              );
              this.tryOpenTeamInvite();
              break;

            case INVITE_JOIN_TEAM:
            case INVITE_JOIN_TEAM_REMOTE:
              InviteRequestMgr.addInviter(i);
              CorpsMgr.addRequestType(
                INVITE_JOIN_TEAM == s ? CM_TEAM_INVITE : CM_TEAM_INVITE_REMOTE
              );
              this.tryOpenTeamInvite();
          }
        }
      },
      onMsgCleanRequest: function (t) {
        for (var e = t.length, n = 0; n < e; ++n) {
          var i = t[n].query("ask_type"),
            s = t[n].query("name");
          switch (i) {
            case REQUEST_JOIN_TEAM:
            case REQUEST_JOIN_TEAM_REMOTE:
              TeamMgr.deleteTeamMem(s, FALSE);
              TeamExMgr.deleteApplyer(s);
              TeamExMgr.getApplyerSize() <= 0 &&
                CorpsMgr.cleanRequestType(
                  REQUEST_JOIN_TEAM == i ? CM_TEAM_APPLY : CM_TEAM_APPLY_REMOTE
                );
              this.refreshTeamInvite();
              break;

            case INVITE_JOIN_TEAM:
            case INVITE_JOIN_TEAM_REMOTE:
              var r = new UtilMapping();
              r.set("name", s);
              InviteRequestMgr.removeInviter(r);
              InviteRequestMgr.getCount() <= 0 &&
                CorpsMgr.cleanRequestType(
                  INVITE_JOIN_TEAM == i ? CM_TEAM_INVITE : CM_TEAM_INVITE_REMOTE
                );
              this.refreshTeamInvite();
          }
        }
      },
      doFightAction: function (t, e, n, i) {
        var s = new UtilMapping();
        s.set("id", t);
        s.set("victim_id", e);
        s.set("action", n);
        s.set("para", i);
        Communicate.cmdToServer(GameMgr.getCurCmdNo(0), s);
      },
      onMsgOpenMenu: function (t) {
        var e = new UtilMapping();
        e.set("id", t.queryInt("id"));
        Communicate.cmdToServer(this.getCurCmdNo(1), e);
      },
      onMsgTeleportEx: function (t) {
        gfConfirm(
          t.query("tip"),
          this,
          function () {
            var e = new UtilMapping();
            e.set("oper", t.queryInt("type"));
            e.set("para2", t.query("gid"));
            Communicate.cmdToServer(MsgDefines.CMD_OPER_TELEPORT_ITEM, e);
          },
          null,
          60
        );
      },
      onOpenConfirmDlg: function (t) {
        switch (t.queryInt("type")) {
          case DLG_TYPE_PARTY_MSG:
            break;

          case DLG_TYPE_DEFAULT:
          case DLG_TYPE_DEFAULT_EX:
            gfOpenAskDlgEx(t);
            break;

          case DLG_TYPE_CONFIRM:
            var e = function (t) {
              var e = new UtilMapping();
              e.set("confirm", t);
              e.set("info", "");
              Communicate.cmdToServer(MsgDefines.CMD_OPEN_CONFIRM_DLG, e);
            };
            gfConfirm(
              t.query("content"),
              this,
              e.bind(this, TRUE),
              e.bind(this, FALSE)
            );
        }
      },
      onMsgPetXinfaExpCard: function (e) {
        this.m_xinFaWeekCardBuy = e.queryInt("is_buy");
        this.m_xinFaWeekCardReward = e.queryInt("is_reward");
        this.m_xinFaWeekCardLeftTimes = e.queryInt("left_time");
        var n = t("XinfaSkillLayer");
        n.instance && n.instance.refreshXinfaExpBuy();
      },
      onMsgAuthVipSms: function (e) {
        var n = t("MessageVerifyLayer"),
          i = e.queryInt("oper_type");
        if (0 != i) {
          if (1 != i);
          else if (null == n.instance && -1 != this.m_messageVerifyPrefab) {
            var s = this,
              r = function () {
                cc.find("Canvas").addChild(
                  cc.instantiate(s.m_messageVerifyPrefab)
                );
              };
            if (null == s.m_messageVerifyPrefab) {
              s.m_messageVerifyPrefab = -1;
              gfLoadPrefab("messageVerifyLayer", function (t) {
                t.addRef();
                s.m_messageVerifyPrefab = t;
                r();
              });
            } else r();
          }
        } else null != n.instance && n.instance.node.destroy();
      },
      onMsgOpenAuthAllProtect: function (e) {
        var n = t("ProtectedLayer");
        if (n.instance) n.instance.refresh(e);
        else if (-1 != this.m_protectedPrefab) {
          var i = this,
            s = function (t) {
              var e = cc.instantiate(i.m_protectedPrefab);
              e.getComponent("ProtectedLayer").refresh(t);
              cc.find("Canvas").addChild(e);
            };
          if (null == i.m_protectedPrefab) {
            i.m_protectedPrefab = -1;
            gfLoadPrefab("protectedLayer", function (t) {
              var n = e;
              null != i.m_protectedPrefab &&
                -1 != i.m_protectedPrefab &&
                (n = i.m_protectedPrefab);
              t.addRef();
              i.m_protectedPrefab = t;
              s(n);
            });
          } else s(e);
        } else this.m_protectedPrefab = e;
      },
      onMsgPasswordDlg: function (t) {
        gfOpenPasswordDlg(t);
      },
      onMsgOpenDlg: function (e) {
        switch (e.query("name")) {
          case "XianRJJShiJieDlg":
            if (e.queryInt("opened")) {
              var n = t("FairyLayer");
              n.open && n.open();
            }
            break;

          case "XianLingCardDlg":
            if (e.queryInt("opened") <= 0) {
              XianLingCardMgr.closeXianLingCardDlg();
              return;
            }
        }
      },
      onMsgSubmitConfirmDlg: function (t) {
        var e = MenuMgr.parseMenu(t.query("content")),
          n = (function (t) {
            if (1 != t.menuItems.length) return "";
            var e = t.menuItems[0];
            if ("[" != e[0] || "]" != e[e.length - 1]) return "";
            var n = e.slice(1, -1).split("/");
            return n.length > 1 ? n[1] : n[0];
          })(e),
          i = t.queryInt("flag");
        if ("" == e.instruction && "" != n) {
          if (-1 != n.indexOf("#DLG:1")) {
            var s = MenuMgr.parseMenuItem(e.menuItems[0]),
              r = s.menuAction,
              _ = s.menuArguments;
            gfConfirm(
              MenuMgr.getMenuPrompt(_),
              null,
              function () {
                if (i) {
                  var t = this.getSpriteState();
                  if (SS_FIGHT_STATE == t || t == SS_CRITICAL_STATE) {
                    gfShowSmallTips(TxtRes(1005435));
                    return;
                  }
                }
                gfCmdToServer(
                  MsgDefines.CMD_SUBMIT_CONFIRM_DLG,
                  "menu_item = %s, para = %s",
                  r,
                  ""
                );
              },
              function () {
                gfCmdToServer(
                  MsgDefines.CMD_SUBMIT_CONFIRM_DLG,
                  "menu_item = %s, para = %s",
                  "cancel",
                  ""
                );
              }
            );
            return;
          }
          if ("!" == n[0]) {
            var a = MenuMgr.parseMenuItem(e.menuItems[0]),
              o = a.menuAction;
            a.menuArguments;
            if ("$" == n[1]);
            else if ("*" == n[1]);
            else {
              var c = new UtilMapping();
              c.set("content", n.slice(1));
              gfOpenAskDlgEx(
                c,
                function (t) {
                  if (i) {
                    var e = this.getSpriteState();
                    if (SS_FIGHT_STATE == e || e == SS_CRITICAL_STATE) {
                      gfShowSmallTips(TxtRes(1005435));
                      return;
                    }
                  }
                  gfCmdToServer(
                    MsgDefines.CMD_SUBMIT_CONFIRM_DLG,
                    "menu_item = %s, para = %s",
                    o,
                    t || ""
                  );
                },
                function () {
                  gfCmdToServer(
                    MsgDefines.CMD_SUBMIT_CONFIRM_DLG,
                    "menu_item = %s, para = %s",
                    "cancel",
                    ""
                  );
                }
              );
            }
            return;
          }
        }
      },
      onMsgMobileCommonRedPoint: function (t) {
        if (null != n && null != n.instance)
          for (var e = 0; e < t.length; e++) n.instance.setRedPoint(t[e]);
      },
      saveCmdIdx: function (t) {
        r = [0, 0, 0, 0];
        if (5 == t.length && !(Number(t[0]) < 5))
          for (var e = 0; e < 4; e++) r[e] = Number(t[e + 1]);
      },
      getCurCmdNo: function (t) {
        if (t < 0 || t >= 4) return 0;
        var e = r[t];
        return e < 0 || e >= 3 ? 0 : s[t][e];
      },
      loadScene: function (t) {
        cc.director.loadScene(t);
      },
      convertTime: function (t) {
        if (null != t && 14 == t.length) {
          var e = {};
          e.wYear = parseInt(t.slice(0, 4));
          e.wMonth = parseInt(t.slice(4, 6));
          e.wDay = parseInt(t.slice(6, 8));
          e.wHour = parseInt(t.slice(8, 10));
          e.wMinute = parseInt(t.slice(10, 12));
          e.wSecond = parseInt(t.slice(12, 14));
          e.wMilliseconds = 0;
          e.wDayOfWeek = 0;
          return e;
        }
      },
      saveServerTime: function (t, e) {
        this.m_stRecTick = Date.now();
        this.m_stRecTime = t;
        this.m_serverTimeZone = e;
      },
      syncServerTime: function (t) {
        if (this.m_stRecTick) {
          this.m_stRecTick = Date.now();
          this.m_stRecTime = t;
        }
      },
      getLoginTick: function () {
        return this.m_loginTick;
      },
      getCurServerTime: function () {
        return this.m_stRecTick
          ? this.m_stRecTime + Math.floor((Date.now() - this.m_stRecTick) / 1e3)
          : 0;
      },
    };
    cc._RF.pop();
  },
  {
    FairyLayer: "FairyLayer",
    Game: "Game",
    LoginBroadcast: "LoginBroadcast",
    MessageVerifyLayer: "MessageVerifyLayer",
    ProtectedLayer: "ProtectedLayer",
    TeamInviteLayer: "TeamInviteLayer",
    XinfaSkillLayer: "XinfaSkillLayer",
  },
];
Game: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "01452wd9hJAHYHxC562l72b", "Game");
    var n = t("AutoFightLayer"),
      i = t("SelLineExLayer"),
      s = t("ActivityLayer"),
      r = t("AutoDlg"),
      _ = t("FriendApplyLayer"),
      a = t("FriendReplyLayer"),
      o = t("DunLayer"),
      c = t("XiaoLvDianShuLayer"),
      l = t("MailLayer"),
      E = t("YearBookLayer"),
      I = cc.Class({
        extends: cc.Component,
        properties: {
          fightLayer: cc.Node,
          quikToolLayer: cc.Node,
          shengjiShuadaoPrefab: cc.Prefab,
          menuPrefab: cc.Prefab,
          autoDlgPrefab: cc.Prefab,
          teamLayerPrefab: cc.Prefab,
          teamInviteLayerPrefab: cc.Prefab,
          teamAni: cc.Node,
          taskLayerPrefab: cc.Prefab,
          packLayerPrefab: cc.Prefab,
          xiaoLvDianShuPrefab: cc.Prefab,
          helpPrefab: cc.Prefab,
          autoCfgLayerPrefab: cc.Prefab,
          petLayerPrefab: cc.Prefab,
          loginBroadcastPrefab: cc.Prefab,
          selLineExPrefab: cc.Prefab,
          askLayerPrefab: cc.Prefab,
          channelLayerPrefab: cc.Prefab,
          activityLayerPrefab: cc.Prefab,
          scrollNode: cc.Node,
          sender: cc.Label,
          charLayerPrefab: cc.Prefab,
          friendLayer: cc.Prefab,
          socAni: cc.Node,
          charStatusNode: cc.Node,
          dunLayer: cc.Prefab,
          mailLayer: cc.Prefab,
          mailBtn: cc.Node,
          triLayerPage1: cc.Node,
          triLayerPage2: cc.Node,
          _startWalkTime: 0,
          friendApplyLayer: cc.Prefab,
          friendReplyLayer: cc.Prefab,
          fairyLayerPrefab: cc.Prefab,
          fslLayerPrefab: cc.Prefab,
          YearBookPrefab: cc.Prefab,
        },
        statics: {
          instance: null,
          onLoadQueue: [],
          insertOnLoadQueue: function (t) {
            I.onLoadQueue.push(t);
          },
        },
        onLoad: function () {
          SmallTipsMgr.tryToRecover();
          I.instance = this;
          this.m_nTaoRedPointFlag = 0;
          Communicate.registerCallback(
            MsgDefines.MSG_REQUEST_SERVER_STATUS,
            this,
            this.onMsgRequestServerStatus
          );
          Communicate.registerCallback(
            MsgDefines.MSG_YEAR_BOOK_2019,
            this,
            this.onMsgYearBook
          );
          cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_UP,
            this.onKeyUp,
            this
          );
          Communicate.setCanProcMsg(!0);
          var e = cc.find("Canvas/toolLayer/taskBtn"),
            n = cc.find("Canvas/toolLayer/packBtn"),
            i = cc.find("Canvas/toolLayer/charBtn"),
            r = cc.find("Canvas/toolLayer/socBtn"),
            _ = cc.find("Canvas/toolLayer/teamBtn"),
            a = function (t) {
              var e = me.queryBasicInt("upgrade/state");
              TYPE_YUANYING != e && TYPE_XUEYING != e
                ? t.call(this)
                : gfConfirm(
                    TxtRes(1037590),
                    this,
                    function () {
                      Communicate.cmdToServer(
                        MsgDefines.CMD_CHANGE_UPGRADE_STATE,
                        new UtilMapping()
                      );
                    },
                    function () {
                      this.doExitGame();
                    }
                  );
            };
          e.on("click", a.bind(this, this.clickTask), this);
          n.on("click", a.bind(this, this.clickPack), this);
          i.on("click", a.bind(this, this.clickChar), this);
          _.on("click", a.bind(this, this.clickTeam), this);
          r.on("click", a.bind(this, this.clickFriend), this);
          this.toolBtns = {
            taskBtn: e,
            packBtn: n,
            charBtn: i,
            socBtn: r,
            teamBtn: _,
          };
          this.toolBtnLayers = {
            taskBtn: t("TaskLayer"),
            packBtn: t("PackLayer"),
            charBtn: t("CharLayer"),
            socBtn: t("FriendLayer"),
            teamBtn: t("TeamLayer"),
          };
          this.funcLayer = cc.find("Canvas/funcLayer");
          cc
            .find("Canvas/panTopLayer/bg/distInfo")
            .getComponent(cc.Label).string = GameMgr.getServerName();
          cc.find("Canvas/exitBtn").on("click", this.exitGameBtn, this);
          cc.find("Canvas/panTopLayer/bg/petPort").on(
            "click",
            this.clickPet,
            this
          );
          cc.find("tao", this.triLayerPage1).on(
            "click",
            this.clickShengjiShuadao,
            this
          );
          cc.find("baiBangMang", this.triLayerPage1).on(
            "click",
            this.clickBaiBangMang,
            this
          );
          cc.find("famiyTask", this.triLayerPage1).on(
            "click",
            this.clickFamilyTask,
            this
          );
          cc.find("partyChallenge", this.triLayerPage1).on(
            "click",
            this.clickpartyChallenge,
            this
          );
          cc.find("tongTianTa", this.triLayerPage1).on(
            "click",
            this.onTongTianTa,
            this
          );
          cc.find("roup", this.triLayerPage2).on("click", this.onRoup, this);
          cc.find("stall", this.triLayerPage2).on("click", this.onStall, this);
          cc.find("petXunLian", this.triLayerPage2).on(
            "click",
            this.onPetXunLian,
            this
          );
          cc.find("xuanMaiXunkuang", this.triLayerPage2).on(
            "click",
            this.onXuanMaiXunKuang,
            this
          );
          cc.find("familyChallenge", this.triLayerPage1).on(
            "click",
            this.onFamilyChallenge,
            this
          );
          if (gfIsJdDist()) {
            cc.find("shiJie", this.triLayerPage1).active = !1;
            cc.find("fuShengLu", this.triLayerPage1).active = !1;
          } else {
            cc.find("shiJie", this.triLayerPage1).on(
              "click",
              this.onSheJie,
              this
            );
            cc.find("fuShengLu", this.triLayerPage1).on(
              "click",
              this.clickFsl,
              this
            );
          }
          cc.find("Canvas/panTopLayer/bg2/activityBtn").on(
            "click",
            this.onActivityBtn,
            this
          );
          cc.find("Canvas/panTopLayer/bg2/fuliBtn").on(
            "click",
            this.onFuliBtn,
            this
          );
          this.mailBtn.on("click", this.onMailBtn, this);
          cc.find("Canvas/panTopLayer/bg2/YearBookBtn").on(
            "click",
            this.onYearBookBtn,
            this
          );
          cc.find("bg/xiaoLvBtn", this.quikToolLayer).on(
            "click",
            this.clickXiaoLvBtn,
            this
          );
          if (gfIsJdDist()) {
            cc.find("bg/HelpBtn", this.quikToolLayer).active = !0;
            cc.find("bg/HelpBtn", this.quikToolLayer).on(
              "click",
              this.clickHelpBtn,
              this
            );
            t("HelpDailyBoxLayer").init();
          } else cc.find("bg/HelpBtn", this.quikToolLayer).active = !1;
          cc.find("bg/autoConfigBtn", this.quikToolLayer).on(
            "click",
            this.clickAutoConfigBtn,
            this
          );
          this.quikToolLayer
            .getChildByName("foldBtn")
            .on("click", this.clickFoldQuikTool, this);
          this.doPageTips();
          this.refreshMeInfo();
          this.refreshPetInfo();
          this.schedule(this.checkState, 0.1);
          var o = I.switchInfo || {};
          I.switchInfo && delete I.switchInfo;
          assert(!I.switchInfo);
          this.openLoginBroadcast(o);
          s.initData();
          c.init();
          var l = t("FairyLayer");
          l && l.init();
          E.init();
          I.onLoadQueue.forEach(function (t) {
            !Array.isArray(t) || t.length < 2 || t[0].call(t[1], t.slice(2));
          });
          I.onLoadQueue.splice(0, I.onLoadQueue.length);
        },
        doPageTips: function () {
          if (ConfigMgr.getFromLocal("TriggerLayerPageBtn", !0)) {
            var t = cc.find("Canvas/triggerLayer/nextPageBtn");
            t.active = !0;
            var e = t
              .getChildByName("01055-1")
              .getComponent(cc.Animation)
              .play();
            e.wrapMode = cc.WrapMode.Loop;
            e.repeatCount = Infinity;
            cc.find("Canvas/triggerLayer/pageview").on(
              "page-turning",
              function () {
                t.active = !1;
                ConfigMgr.saveToLocal("TriggerLayerPageBtn", !1, !1);
              }.bind(this),
              this
            );
          }
          if (ConfigMgr.getFromLocal("TriggerLayerPageTips", !0)) {
            var n = cc.find("Canvas/triggerLayer/01056");
            n.active = !0;
            var i = n.getChildByName("01056-1").getComponent(cc.Animation);
            i.play().repeatCount = 3;
            n
              .getChildByName("01056-2")
              .getComponent(cc.Animation)
              .play().repeatCount = 3;
            i.on(
              "finished",
              function () {
                n.active = !1;
                ConfigMgr.saveToLocal("TriggerLayerPageTips", !1, !1);
              }.bind(this),
              this
            );
          }
        },
        openDunLayer: function () {
          if (null == o.instance) {
            var t = cc.instantiate(this.dunLayer);
            cc.find("Canvas").addChild(t);
            return t.getComponent("DunLayer");
          }
          return o.instance;
        },
        openLoginBroadcast: function (t) {
          (t.agreeDisclaimerState &&
            t.agreeDisclaimerGid == me.queryBasic("gid")) ||
            (this.loginBroadcastPrefab &&
              cc
                .find("Canvas")
                .addChild(
                  cc.instantiate(this.loginBroadcastPrefab),
                  LAYER_TAG_BROADCAST_WEB,
                  "login_broadcast"
                ));
        },
        onDestroy: function () {
          cc.systemEvent.off(
            cc.SystemEvent.EventType.KEY_UP,
            this.onKeyUp,
            this
          );
          Communicate.unRegisterCallback(
            MsgDefines.MSG_REQUEST_SERVER_STATUS,
            this
          );
          I.instance = null;
        },
        onKeyUp: function (t) {
          switch (t.keyCode) {
            case cc.macro.KEY.back:
              this.exitGame();
          }
        },
        update: function () {
          if (
            !(
              0 == this._startWalkTime ||
              Date.now() - this._startWalkTime < 1500
            )
          ) {
            this._startWalkTime = Date.now();
            null == r.instance && this.setCharStatus(!1);
          }
        },
        checkState: function () {
          this.teamAni.active =
            InviteRequestMgr.getCount() > 0 ||
            CorpsMgr.haveRequestType(CM_TEAM_APPLY) ||
            CorpsMgr.haveRequestType(CM_TEAM_APPLY_REMOTE);
          this.updateToolBtns();
        },
        updateToolBtns: function () {
          var t = "";
          for (var e in this.toolBtnLayers)
            if (this.toolBtnLayers[e].instance) {
              t = e;
              break;
            }
          if (this.selBtn != t) {
            if ("" != t)
              for (var n in this.toolBtns)
                n == t
                  ? gfHighLightSprite(this.toolBtns[n])
                  : gfLowLightSprite(this.toolBtns[n]);
            else for (var i in this.toolBtns) gfNormalSprite(this.toolBtns[i]);
            this.selBtn = t;
          }
        },
        clickTask: function () {
          if (null == this.funcLayer.getChildByName("TaskLayer")) {
            this.funcLayer.destroyAllChildren();
            this.funcLayer.addChild(cc.instantiate(this.taskLayerPrefab));
          }
        },
        clickPack: function () {
          if (null == this.funcLayer.getChildByName("PackLayer")) {
            this.funcLayer.destroyAllChildren();
            this.funcLayer.addChild(cc.instantiate(this.packLayerPrefab));
          }
        },
        clickChar: function () {
          this.addFuncLayer("CharLayer", this.charLayerPrefab);
        },
        clickTeam: function () {
          var e = t("DanceLayer");
          e && e.instance && e.instance.isDancing()
            ? gfShowSmallTips(TxtRes(1038427))
            : this.openTeamLayer(!0, !0);
        },
        clickFriend: function () {
          if (SocInfoMgr.haveVerifyMsg()) {
            var t = SocInfoMgr.getFirstVerifyMsg();
            switch (t.queryInt("msg_no")) {
              case MsgDefines.MSG_REQUEST_FRIEND_VERIFY:
                if (null == _.instance) {
                  var e = cc.instantiate(this.friendApplyLayer);
                  e.getComponent("FriendApplyLayer").setCharInfo(t);
                  cc.find("Canvas").addChild(e);
                  SocInfoMgr.haveVerifyMsg() || this.cancelPlaySocAni();
                }
                break;

              case MsgDefines.MSG_REPLY_FRIEND_VERIFY:
                if (null == a.instance) {
                  var n = cc.instantiate(this.friendReplyLayer);
                  n.getComponent("FriendReplyLayer").setReplyInfo(t);
                  cc.find("Canvas").addChild(n);
                  SocInfoMgr.haveVerifyMsg() || this.cancelPlaySocAni();
                }
            }
          } else {
            this.cancelPlaySocAni();
            if (null == this.funcLayer.getChildByName("FriendLayer")) {
              this.funcLayer.destroyAllChildren();
              this.funcLayer.addChild(cc.instantiate(this.friendLayer));
            }
          }
        },
        openFightLayer: function () {
          var e = this.fightLayer.getComponent("FightLayer");
          e.removeAllContent();
          e.reset();
          this.fightLayer.active = !0;
          var n = t("Menu");
          n.instance && n.instance.destroyMenu();
          NotifyDefines.notifyToServer({
            type: NotifyDefines.NOTIFY_AUTO_COMBAT_STATUS,
            para1: AUTO_GET_TASK_OPEN,
          });
          AutoFightMgr.isConfigured() || gfShowSmallTips(TxtRes(1036887));
          var i = t("FightLayer");
          if (null != i._stopAutoCombatType) {
            i.instance.openStopAutoBtn(i._stopAutoCombatType);
            i._stopAutoCombatType = null;
          }
        },
        closeFightLayer: function () {
          var t = this.fightLayer.getComponent("FightLayer");
          t.removeAllContent();
          t.reset();
          this.fightLayer.active = !1;
        },
        openTeamLayer: function (e, n) {
          if (gfIsLimitStatus(MF_LIMIT_EXCHANGE))
            n && gfShowSmallTips(TxtRes(1028344));
          else if (!e || !this.addTeamInviteLayer()) {
            var i = t("TeamLayer");
            if (null != i.instance) i.instance.refresh();
            else if (null != this.funcLayer) {
              this.funcLayer.destroyAllChildren();
              this.funcLayer.addChild(cc.instantiate(this.teamLayerPrefab));
            }
          }
        },
        addPopLayer: function (t, e) {
          var n = cc.find("Canvas"),
            i = n.getChildByName(t);
          if (null == i) {
            i = cc.instantiate(e);
            n.addChild(i);
          }
          return i;
        },
        addFuncLayer: function (t, e) {
          if (null == this.funcLayer) return null;
          var n = this.funcLayer.getChildByName(t);
          if (null == n) {
            n = cc.instantiate(e);
            this.funcLayer.destroyAllChildren();
            this.funcLayer.addChild(n);
          }
          return n;
        },
        closeFuncLayer: function () {
          null != this.funcLayer && this.funcLayer.destroyAllChildren();
        },
        onOpenChannelLayer: function () {
          if (!gfDlgIsOpen("channelLayer")) {
            this.funcLayer.destroyAllChildren();
            cc.find("Canvas").addChild(cc.instantiate(this.channelLayerPrefab));
          }
        },
        refreshMeInfo: function () {
          var t = cc.find("Canvas/panTopLayer/bg");
          t.getChildByName("name").getComponent(cc.Label).string = me.getName();
          gfShowPortrait(
            t.getChildByName("port"),
            me.queryBasicInt("portrait")
          );
        },
        refreshMeTeamInfo: function () {
          var t = cc.find("Canvas/panTopLayer/bg"),
            e = me.getName();
          t.getChildByName("teamStatus").getComponent(cc.Label).string =
            gfGetTeamStatus(e);
          var n = TeamExMgr.isTeamMember(e);
          t.getChildByName("teamFlag").active = n;
          var i = n && !TeamExMgr.isTeamLeave(e);
          this.charStatusNode.active = i;
          i && this.setCharStatus(!1);
        },
        setCharStatus: function (t) {
          var e = this.charStatusNode.getComponent(sp.Skeleton);
          if (t) {
            e.setAnimation(0, "walk", !0);
            e.timeScale = 1.2;
            this._startWalkTime = Date.now();
          } else {
            e.setAnimation(0, "rest", !0);
            e.timeScale = 0.5;
            this._startWalkTime = 0;
          }
        },
        refreshPetInfo: function () {
          var t = cc.find("Canvas/panTopLayer/bg");
          if (cc.isValid(t, !0)) {
            var e = PetMgr.getFightPet(),
              n = 0;
            if (null == e)
              t.getChildByName("petName").getComponent(cc.Label).string = "";
            else {
              n = e.queryBasicInt("portrait");
              t.getChildByName("petName").getComponent(cc.Label).string =
                e.getName();
            }
            gfShowPortrait(t.getChildByName("petPort"), n);
          }
        },
        clickSwitchLine: function () {
          var t = new UtilMapping();
          t.set("net_type", NET_TYPE);
          Communicate.cmdToServer(MsgDefines.CMD_REQUEST_SERVER_STATUS, t);
        },
        clickShengjiShuadao: function () {
          if (this.shengjiShuadaoPrefab && this.funcLayer) {
            this.funcLayer.destroyAllChildren();
            var t = cc.instantiate(this.shengjiShuadaoPrefab);
            this.funcLayer.addChild(t);
            t.getComponentInChildren("ShengjiShuadao").init();
          }
        },
        showMenu: function (t) {
          if (t.query("atass_use")) {
            var e = cc.find("Canvas");
            if (this.menuPrefab && e) {
              var n = cc.find("Canvas/Menu");
              if (n) {
                n.removeFromParent();
                n.destroy();
              }
              n = cc.instantiate(this.menuPrefab);
              e.addChild(n);
              n.getComponentInChildren("Menu").initMenu(t);
              MenuMgr.getAutoSelectMenu() &&
                n.emit("auto-select-menu", "shengji-shuadao");
            }
          }
        },
        popupAutoDlg: function (e) {
          if (this.autoDlgPrefab) {
            var n = cc.find("Canvas");
            if (n) {
              var i = t("Menu");
              i.instance && i.instance.destroyMenu();
              this.closeFuncLayer();
              var s = cc.instantiate(this.autoDlgPrefab);
              s.getComponentInChildren("AutoDlg").init(e.query("para"));
              n.addChild(s, LAYER_TAG_AUTO_DLG, "auto_dlg");
              this.setCharStatus(!0);
            }
          }
        },
        clickXiaoLvBtn: function () {
          c && c.onDoubleBonusBtn();
        },
        clickHelpBtn: function () {
          assert(this.helpPrefab);
          var t = cc.find("Canvas");
          if (t) {
            var e = cc.find("helpLayer", t);
            e ? (e.active = !0) : t.addChild(cc.instantiate(this.helpPrefab));
          }
        },
        openXiaoLvDianShu: function () {
          assert(this.xiaoLvDianShuPrefab);
          var t = cc.find("Canvas/funcLayer");
          if (t) {
            t.destroyAllChildren();
            t.addChild(cc.instantiate(this.xiaoLvDianShuPrefab));
          }
        },
        clickBaiBangMang: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_ZHUREN_WEILE,
            });
        },
        clickAutoConfigBtn: function () {
          n.instance ||
            cc.find("Canvas").addChild(cc.instantiate(this.autoCfgLayerPrefab));
        },
        clickFoldQuikTool: function () {
          var t = gfIsJdDist() ? 100 : 181;
          if (this.quikToolLayer.x < t + (375 - t) / 2) {
            this.quikToolLayer.runAction(
              cc.moveTo(0.2, 375, this.quikToolLayer.y)
            );
            this.quikToolLayer.getChildByName("foldFlag").scaleX = -1;
          } else {
            this.quikToolLayer.runAction(
              cc.moveTo(0.2, t, this.quikToolLayer.y)
            );
            this.quikToolLayer.getChildByName("foldFlag").scaleX = 1;
          }
        },
        clickPet: function () {
          var t = cc.find("Canvas"),
            e = cc.find("panTopLayer/bg", t),
            n = cc.find("petPort", e).getPosition();
          n = e.convertToWorldSpaceAR(n);
          var i = cc.instantiate(this.petLayerPrefab);
          t.addChild(i);
          var s = i.getChildByName("bg"),
            r = s.x,
            _ = s.y;
          s.setScale(0.1);
          s.setPosition(t.convertToNodeSpaceAR(n));
          s.runAction(cc.spawn(cc.scaleTo(0.1, 1), cc.moveTo(0.1, r, _)));
        },
        exitGameBtn: function () {
          this.exitGame();
        },
        clickFamilyTask: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_SHIMEN_RENWU,
            });
        },
        clickpartyChallenge: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_BANGPAI_RICHANG_TIAOZHAN,
            });
        },
        onTongTianTa: function () {
          NotifyDefines.notifyToServer({
            type: NotifyDefines.NOTIFY_MOBILE_TALK,
            para1: TYPE_TONGTIANTA,
          });
        },
        onFamilyChallenge: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_MENPAI_SHILIAN,
            });
        },
        clickFsl: function () {
          me.getCharLevel() < 60
            ? gfShowSmallTips(TxtRes(1042277))
            : this.addFuncLayer("FslLayer", this.fslLayerPrefab);
        },
        onRoup: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_VENDUE,
            });
        },
        onStall: function () {
          gfIsInSafeTime()
            ? gfShowSmallTips(TxtRes(1004009))
            : gfIsLimitStatus(MF_LIMIT_STALL)
            ? gfShowSmallTips(TxtRes(1005338))
            : gfIsLimitStatus(MF_LIMIT_LAOJUNCHAGANG | MF_LIMIT_LAOJUNFANU)
            ? gfShowSmallTips(TxtRes(1026380))
            : gfIsLimitStatus(MF_LIMIT_FIGHT)
            ? gfShowSmallTips(TxtRes(1029468))
            : gfCmdToServer(MsgDefines.CMD_VIEW_STALL_LIST_REMOTE, "");
        },
        onPetXunLian: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_PET_XUNLIAN,
            });
        },
        onXuanMaiXunKuang: function () {
          gfCanStartCombat() &&
            NotifyDefines.notifyToServer({
              type: NotifyDefines.NOTIFY_MOBILE_TALK,
              para1: TYPE_XUANMAIXUNKUANG,
            });
        },
        setFuliRedPoint: function (t) {
          var e = cc.find("Canvas/panTopLayer/bg2/fuliBtn/flag");
          null != e && (e.active = t);
        },
        onFuliBtn: function () {
          gfNotify(NotifyDefines.NOTIFY_OPEN_MOBILE_WELFARE_DLG);
        },
        onYearBookBtn: function () {
          gfNotify(NotifyDefines.NOTIFY_WENDAO_NIANJIAN_2019);
        },
        onMailBtn: function () {
          if (SocSysMsgMgr.getMsgCount() <= 0) gfShowSmallTips(TxtRes(1037911));
          else if (null == l.instatnce) {
            var t = cc.instantiate(this.mailLayer);
            cc.find("Canvas").addChild(t);
          }
        },
        onSheJie: function () {
          NotifyDefines.notifyToServer({
            type: NotifyDefines.NOTIFY_FAIRY_CLASS_OPER,
            para1: "open",
          });
        },
        onActivityBtn: function () {
          if (null == this.funcLayer.getChildByName("ActivityLayer")) {
            this.funcLayer.destroyAllChildren();
            var t = cc.instantiate(this.activityLayerPrefab);
            this.funcLayer.addChild(t);
            t.getComponentInChildren("ActivityLayer").init();
          }
        },
        tryOpenTeamInvite: function () {
          var e = t("TeamInviteLayer");
          null != e.instance
            ? e.instance.refresh()
            : null == t("TeamLayer").instance ||
              gfIsLimitStatus(MF_LIMIT_EXCHANGE) ||
              this.addTeamInviteLayer();
        },
        addTeamInviteLayer: function () {
          var t = 0;
          InviteRequestMgr.getCount() > 0
            ? (t = LT_TEAM_INVITE)
            : (CorpsMgr.haveRequestType(CM_TEAM_APPLY) ||
                CorpsMgr.haveRequestType(CM_TEAM_APPLY_REMOTE)) &&
              (t = LT_TEAM_APPLY);
          if (0 != t) {
            var e = this.addPopLayer(
              "TeamInviteLayer",
              this.teamInviteLayerPrefab
            );
            null != e && e.getComponent("TeamInviteLayer").show(t);
            return !0;
          }
          return !1;
        },
        onNextPageBtn: function () {
          var t = cc
              .find("Canvas/triggerLayer/pageview")
              .getComponent(cc.PageView),
            e = t.getCurrentPageIndex();
          e < t.getPages().length - 1 && t.setCurrentPageIndex(e + 1);
        },
        cancelPlaySocAni: function () {
          this.socAni.active = !1;
        },
        playSocAni: function () {
          this.socAni.active = !0;
        },
        setRedPoint: function (t) {
          if (null != t) {
            var e = t.queryInt("red_point");
            switch (t.queryInt("task_type")) {
              case 0:
                I.instance.setRedPointActive(
                  "tongTianTa",
                  e,
                  this.triLayerPage1
                );
                break;

              case 1:
                I.instance.setRedPointActive(
                  "petXunLian",
                  e,
                  this.triLayerPage2
                );
                break;

              case 2:
                I.instance.setRedPointActive(
                  "xuanMaiXunkuang",
                  e,
                  this.triLayerPage2
                );
                break;

              case 3:
                I.instance.setRedPointActive("shiJie", e, this.triLayerPage1);
                break;

              case 4:
                I.instance.setRedPointActive(
                  "fuShengLu",
                  e,
                  this.triLayerPage1
                );
                break;

              case 5:
                I.instance.setRedPointActive(
                  "partyChallenge",
                  e,
                  this.triLayerPage1
                );
                break;

              case 6:
                I.instance.setRedPointActive(
                  "famiyTask",
                  e,
                  this.triLayerPage1
                );
                break;

              case 7:
                I.instance.setRedPointActive(
                  "familyChallenge",
                  e,
                  this.triLayerPage1
                );
                break;

              case 8:
                I.instance.setRedPointActive(
                  "baiBangMang",
                  e,
                  this.triLayerPage1
                );
                break;

              case 9:
                ShengjiShuadaoMgr.m_nTaoRedPointFlag = e
                  ? ShengjiShuadaoMgr.m_nTaoRedPointFlag | RP_BIT_SHENJI
                  : ShengjiShuadaoMgr.m_nTaoRedPointFlag & ~RP_BIT_SHENJI;
                I.instance.setRedPointActive(
                  "tao",
                  ShengjiShuadaoMgr.m_nTaoRedPointFlag,
                  this.triLayerPage1
                );
                break;

              case 10:
                ShengjiShuadaoMgr.m_nTaoRedPointFlag = e
                  ? ShengjiShuadaoMgr.m_nTaoRedPointFlag | RP_BIT_SHUA_TAO
                  : ShengjiShuadaoMgr.m_nTaoRedPointFlag & ~RP_BIT_SHUA_TAO;
                I.instance.setRedPointActive(
                  "tao",
                  ShengjiShuadaoMgr.m_nTaoRedPointFlag,
                  this.triLayerPage1
                );
            }
          }
        },
        setRedPointActive: function (t, e, n) {
          var i = cc.find(t, n);
          if (null != i) {
            var s = i.getChildByName("redPoint");
            null != s && (s.active = e > 0);
          }
        },
        showYearBookBtn: function (t) {
          var e = cc.find("Canvas/panTopLayer/bg2/YearBookBtn");
          null != e && (e.active = t);
        },
        exitGame: function () {
          gfConfirm("#m" + TxtRes(1037356), this, this.doExitGame);
        },
        doExitGame: function () {
          GameMgr.m_canTryReconnect = null;
          Communicate.cmdToServer(MsgDefines.CMD_LOGOUT, new UtilMapping());
        },
        switchLine: function (t) {
          var e = t.query("server");
          GameMgr.setTargetGs(e);
          var n = new UtilMapping();
          n.set("target_gs", e);
          Communicate.cmdToServer(MsgDefines.CMD_SWITCH_SERVER, n);
        },
        onMsgRequestServerStatus: function (t) {
          if (!i.instance) {
            var e = cc.instantiate(this.selLineExPrefab);
            cc.find("Canvas").addChild(e);
            e.getComponent("SelLineExLayer").showList(t, this, this.switchLine);
          }
        },
        onMsgYearBook: function (t) {
          if (null == E.instatnce) {
            var e = cc.instantiate(this.YearBookPrefab);
            cc.find("Canvas").addChild(e);
            var n = e.getComponent("YearBookLayer");
            null != n && n.refresh(t);
          }
        },
      });
    cc._RF.pop();
  },
  {
    ActivityLayer: "ActivityLayer",
    AutoDlg: "AutoDlg",
    AutoFightLayer: "AutoFightLayer",
    CharLayer: "CharLayer",
    DanceLayer: "DanceLayer",
    DunLayer: "DunLayer",
    FairyLayer: "FairyLayer",
    FightLayer: "FightLayer",
    FriendApplyLayer: "FriendApplyLayer",
    FriendLayer: "FriendLayer",
    FriendReplyLayer: "FriendReplyLayer",
    HelpDailyBoxLayer: "HelpDailyBoxLayer",
    MailLayer: "MailLayer",
    Menu: "Menu",
    PackLayer: "PackLayer",
    SelLineExLayer: "SelLineExLayer",
    TaskLayer: "TaskLayer",
    TeamInviteLayer: "TeamInviteLayer",
    TeamLayer: "TeamLayer",
    XiaoLvDianShuLayer: "XiaoLvDianShuLayer",
    YearBookLayer: "YearBookLayer",
  },
];
