
const MsgDefine = require("./msgdefine.js");
var n = {
  data: {},
  curSendLen: 0,
  putChar: function (t) {
    if (-1 == this.curSendLen || this.data.byteLength - this.curSendLen < 1)
      return -1;
    this.data.setUint8(this.curSendLen, t);
    ++this.curSendLen;
  },
  putShort: function (t) {
    if (-1 == this.curSendLen || this.data.byteLength - this.curSendLen < 2)
      return -1;
    this.data.setUint16(this.curSendLen, t);
    this.curSendLen += 2;
  },
  putLong: function (t) {
    if (-1 == this.curSendLen || this.data.byteLength - this.curSendLen < 4)
      return -1;
    this.data.setUint32(this.curSendLen, t);
    this.curSendLen += 4;
  },
  putLenString: function (t) {
    if (-1 == this.curSendLen) return -1;
    var e = GBK.encode(t);
    if (e.length > 255) return -1;
    this.putChar(e.length);
    if (
      -1 == this.curSendLen ||
      this.data.byteLength - this.curSendLen < e.length
    )
      return -1;
    new Uint8Array(this.data.buffer, this.curSendLen, e.length).set(e);
    this.curSendLen += e.length;
  },
  putLenString2: function (t) {
    if (-1 == this.curSendLen) return -1;
    var e = GBK.encode(t);
    if (e.length > 65535) return -1;
    this.putShort(e.length);
    if (
      -1 == this.curSendLen ||
      this.data.byteLength - this.curSendLen < e.length
    )
      return -1;
    new Uint8Array(this.data.buffer, this.curSendLen, e.length).set(e);
    this.curSendLen += e.length;
  },
  putLenString4: function (t) {
    if (-1 == this.curSendLen) return -1;
    var e = GBK.encode(t);
    if (e.length > 65535) return -1;
    this.putLong(e.length);
    if (
      -1 == this.curSendLen ||
      this.data.byteLength - this.curSendLen < e.length
    )
      return -1;
    new Uint8Array(this.data.buffer, this.curSendLen, e.length).set(e);
    this.curSendLen += e.length;
  },
  putItemInfo: function (t) {
    this.putShort(t.queryInt("item_count"));
    for (var e = t.queryInt("item_count"), n = 1; n <= e; n++) {
      this.putLenString(t.query("id" + n));
      this.putChar(t.query("type" + n));
    }
  },
  CMD_ECHO: function (t) {
    this.putLong(t.queryInt("current_time"));
    this.putLong(t.queryInt("peer_time"));
  },
  MSG_REPLY_ECHO: function (t) {
    this.putLong(t.queryInt("reply_time"));
  },
  CMD_L_JOIN_QUEUE: function (t) {
    this.putLenString(t.query("cookie"));
  },
  CMD_L_CHECK_USER_DATA_EX: function () {},
  CMD_L_GET_QR_CODE_INFO: function (t) {
    this.putLenString(t.query("dist"));
  },
  CMD_L_LOGIN_BY_QR_CODE: function (t) {
    this.putLenString(t.query("dist"));
    this.putLenString(t.query("account"));
    this.putLenString(t.query("password"));
    this.putLenString(t.query("my_qr_code"));
  },
  CMD_L_ACCOUNT: function (t) {
    this.putLenString(t.query("account"));
    this.putLenString(t.query("password"));
    this.putLenString(t.query("id"));
    this.putLenString(t.query("data"));
    this.putLenString(t.query("lock"));
    this.putLenString(t.query("dist"));
    this.putChar(t.queryInt("login_type"));
    this.putLenString(t.query("version"));
    this.putLenString(t.query("qr_code_id"));
  },
  CMD_L_WEGAME_LOGIN: function (t) {
    this.putChar(t.queryInt("login_type"));
    this.putLenString(t.query("wg_id"));
    this.putLenString2(t.query("certs"));
    this.putLenString(t.query("id"));
    this.putLenString(t.query("data"));
    this.putLenString(t.query("version"));
    this.putLenString(t.query("dist"));
  },
  CMD_L_MOBILE_RECONNECT: function (t) {
    this.putLenString(t.query("account"));
    this.putLenString(t.query("id"));
    this.putLenString(t.query("dist"));
    this.putLenString(t.query("version"));
    this.putLenString(t.query("wid"));
    this.putLenString(t.query("mobile_uid"));
    this.putLenString(t.query("server"));
  },
  CMD_L_GET_SERVER_LIST: function (t) {
    this.putLenString(t.query("account"));
    this.putLong(t.queryInt("auth_key"));
    this.putLenString(t.query("dist"));
    this.putChar(t.queryInt("net_type"));
  },
  CMD_L_CLIENT_CONNECT_AGENT: function (t) {
    this.putLenString(t.query("account"));
    this.putLong(t.queryInt("auth_key"));
    this.putLenString(t.query("server"));
  },
  CMD_LOGIN: function (t) {
    this.putLenString(t.query("user"));
    this.putLong(t.queryInt("auth_key"));
    this.putLong(t.queryInt("seed"));
    this.putLenString(t.query("version"));
    this.putLenString(t.query("client_type"));
    this.putLenString(t.query("mobile"));
    this.putLenString(t.query("computer_id"));
  },
  CMD_LOAD_EXISTED_CHAR: function (t) {
    this.putLenString(t.query("char_name"));
    var e = t.queryInt("order_count");
    this.putChar(e);
    for (var n = 0; n < e; ++n) this.putLenString(t.query("order_gid_" + n));
  },
  CMD_LOGOUT: function () {},
  CMD_REQUEST_ITEM_INFO: function (t) {
    this.putLenString(t.query("item_cookie"));
  },
  CMD_SORT_PACK: function (t) {
    this.putShort(t.queryInt("count"));
    this.putLenString2(t.query("range"));
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("start_pos"));
  },
  CMD_APPLY_MAKEUP_ITEM: function (t) {
    this.putLong(t.queryInt("pos"));
  },
  CMD_PUT_DOWN: function () {},
  CMD_EQUIP: function (t) {
    this.putChar(t.queryInt("pos"));
    this.putChar(t.queryInt("equip_part"));
  },
  CMD_UNEQUIP: function (t) {
    this.putChar(t.queryInt("from_pos"));
    this.putChar(t.queryInt("to_pos"));
  },
  CMD_APPLY: function (t) {
    this.putChar(t.queryInt("pos"));
  },
  CMD_FEED_CHILD: function (t) {
    this.putChar(t.queryInt("no"));
    this.putChar(t.queryInt("pos"));
  },
  CMD_IDENTIFY_EQUIP: function (t) {
    this.putShort(t.queryInt("pos_identifier"));
    this.putShort(t.queryInt("pos_equip"));
  },
  CMD_C_FLEE: function () {},
  CMD_C_CATCH_PET: function (t) {
    this.putLong(t.queryInt("id"));
  },
  DoUserCDoAction: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("victim_id"));
    this.putLong(t.queryInt("action"));
    this.putLong(t.queryInt("para"));
    this.putLenString(t.query("para_ex1"));
    this.putLenString(t.query("para_ex2"));
    this.putLenString(t.query("para_ex3"));
    this.putLenString(t.query("skill_talk"));
  },
  CMD_C_DO_ACTION_0: function (t) {
    return this.DoUserCDoAction(t);
  },
  CMD_C_DO_ACTION_1: function (t) {
    return this.DoUserCDoAction(t);
  },
  CMD_C_DO_ACTION_2: function (t) {
    return this.DoUserCDoAction(t);
  },
  CMD_C_END_ANIMATE: function (t) {
    this.putLong(t.queryInt("answer"));
    this.putLong(t.queryInt("cookie"));
  },
  CMD_SELECT_MENU_ITEM: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLenString(t.query("menuItem"));
    this.putLenString(t.query("para"));
    this.putLong(t.queryInt("cookie"));
  },
  CMD_SELECT_MENU_ITEM_0: function (t) {
    return this.CMD_SELECT_MENU_ITEM(t);
  },
  CMD_SELECT_MENU_ITEM_1: function (t) {
    return this.CMD_SELECT_MENU_ITEM(t);
  },
  CMD_SELECT_MENU_ITEM_2: function (t) {
    return this.CMD_SELECT_MENU_ITEM(t);
  },
  CMD_GENERAL_NOTIFY: function (t) {
    this.putShort(t.queryInt("type"));
    this.putLenString(t.query("para1"));
    this.putLenString(t.query("para2"));
  },
  CMD_REQUEST_JOIN: function (t) {
    this.putLenString(t.query("peer_name"));
    this.putLenString(t.query("ask_type"));
  },
  CMD_QUIT_TEAM: function (t) {
    this.putChar(t.queryInt("type"));
  },
  CMD_TEAM_REQUEST_TASK: function () {},
  CMD_TEAM_SEEK_MEMBER: function (t) {
    this.putLenString(t.query("purpose"));
    this.putShort(t.queryInt("min_level"));
    this.putShort(t.queryInt("max_level"));
    this.putLong(t.queryInt("min_tao"));
    this.putLong(t.queryInt("max_tao"));
    this.putChar(t.queryInt("min_zhanli"));
    this.putChar(t.queryInt("family_req"));
  },
  CMD_TEAM_SEEK_LEADER: function (t) {
    this.putLenString(t.query("purpose"));
  },
  CMD_TEAM_CANCEL_SEEK: function () {},
  CMD_CHANGE_TEAM_LEADER: function (t) {
    this.putLenString(t.query("new_leader_id"));
    this.putChar(t.queryInt("type"));
  },
  CMD_KICKOUT: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLenString(t.query("name"));
    this.putChar(t.queryInt("type"));
  },
  CMD_REFRESH_FRIEND: function (t) {
    this.putLenString(t.query("group"));
    this.putLenString(t.query("char"));
    this.putLenString(t.query("gid"));
  },
  CMD_ACCEPT: function (t) {
    this.putLenString(t.query("peer_name"));
    this.putLenString(t.query("ask_type"));
    this.putChar(t.queryInt("auto_pass"));
  },
  CMD_REJECT: function (t) {
    this.putLenString(t.query("peer_name"));
    this.putLenString(t.query("ask_type"));
  },
  CMD_CLEAN_REQUEST: function (t) {
    this.putLenString(t.query("ask_type"));
  },
  CMD_OPEN_MENU: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_OPEN_MENU_0: function (t) {
    return this.CMD_OPEN_MENU(t);
  },
  CMD_OPEN_MENU_1: function (t) {
    return this.CMD_OPEN_MENU(t);
  },
  CMD_OPEN_MENU_2: function (t) {
    return this.CMD_OPEN_MENU(t);
  },
  CMD_PROMPT_BEFORE_LEAVE: function () {},
  CMD_REFRESH_TASK_LOG: function (t) {
    this.putLenString(t.query("task_name"));
    this.putChar(t.queryInt("owner_type"));
    this.putChar(t.queryInt("refresh_flag"));
  },
  CMD_OPER_TELEPORT_ITEM: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("oper"));
    this.putShort(t.queryInt("para1"));
    this.putLenString(t.query("para2"));
  },
  CMD_BUTTON_DOUBLE_BONUS: function (t) {
    this.putChar(t.queryInt("cmd_type"));
    this.putChar(t.queryInt("hours"));
  },
  CMD_REFRESH_SERVICE_LOG: function (t) {
    this.putLenString(t.query("service_name"));
    this.putChar(t.queryInt("refresh_flag"));
  },
  CMD_OPEN_CONFIRM_DLG: function (t) {
    this.putChar(t.queryInt("confirm"));
    this.putLenString(t.query("info"));
  },
  CMD_SELECT_CURRENT_PET: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pet_status"));
  },
  CMD_TRAIN: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_DROP_PET: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_BATCH_APPLY_MEDICINE: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLenString(t.query("type"));
    this.putLong(t.queryInt("total_used"));
    var e = t.queryInt("count");
    this.putChar(e);
    for (var n = 0; n < e; n++) {
      this.putShort(t.queryInt("pos" + n));
      this.putShort(t.queryInt("amount" + n));
    }
  },
  CMD_REQUEST_SERVER_STATUS: function (t) {
    this.putChar(t.queryInt("net_type"));
  },
  CMD_SWITCH_SERVER: function (t) {
    this.putLenString(t.query("target_gs"));
  },
  CMD_EQUIP_PET_DRESS: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pos"));
  },
  CMD_FEED_PET: function (t) {
    this.putChar(t.queryInt("no"));
    this.putChar(t.queryInt("pos"));
  },
  CMD_ADD_DUNWU_NIMBUS: function (t) {
    this.putLong(t.queryInt("pet_id"));
    this.putLenString(t.query("skill_name"));
  },
  CMD_ADD_SKILL_ESSENCE: function (t) {
    this.putLong(t.queryInt("pet_id"));
    this.putLenString(t.query("skill_name"));
  },
  CMD_REFRESH_PET_GODBOOK_SKILLS: function (t) {
    this.putLong(t.queryInt("pet_id"));
  },
  CMD_UPDATE_GODBOOK_STATE: function (t) {
    this.putLong(t.queryInt("pet_id"));
    this.putLenString(t.query("book_name"));
    this.putChar(t.queryInt("used"));
  },
  CMD_SET_PET_SETTING: function (t) {
    this.putChar(t.queryInt("no"));
    this.putLenString(t.query("set"));
    this.putLenString(t.query("val"));
  },
  CMD_ADD_GODBOOK_DIRECT: function (t) {
    this.putLong(t.queryInt("pet_id"));
    this.putLenString(t.query("godbookname"));
  },
  CMD_SET_XINFA_SKILL_STATUS: function (t) {
    this.putShort(t.queryInt("pet_no"));
    this.putLenString(t.query("skill_name"));
    this.putChar(t.queryInt("un_useful"));
  },
  CMD_PASSWORD_DLG: function (t) {
    this.putLenString(t.query("info"));
  },
  CMD_CANCEL_AUTH_VIP_SMS: function () {},
  CMD_RESEND_VIP_SMS: function () {},
  CMD_AUTH_VIP_SMS: function (t) {
    this.putLenString(t.query("code"));
  },
  CMD_OPEN_AUTH_ALL_PROTECT: function (t) {
    this.putLong(t.queryInt("seq_no"));
    this.putChar(t.queryInt("confirm"));
    this.putLenString(t.query("passpod"));
    this.putLenString2(t.query("matrix"));
  },
  CMD_CHANGE_UPGRADE_STATE: function () {},
  CMD_CHAT: function (t) {
    this.putShort(t.queryInt("channel"));
    this.putShort(t.queryInt("compress"));
    this.putShort(t.queryInt("orgLength"));
    this.putLenString2(t.query("msg"));
    this.putItemInfo(t);
  },
  CMD_GUARDS_RECOVER: function (t) {
    this.putLong(t.queryInt("guard_id"));
  },
  CMD_GUARDS_DROP_GUARD: function (t) {
    this.putLong(t.queryInt("guard_id"));
  },
  CMD_GUARDS_CHEER: function (t) {
    this.putLong(t.queryInt("guard_id"));
    this.putChar(t.queryInt("cheer"));
  },
  CMD_GUARDS_SET_TACTICS: function (t) {
    this.putLong(t.queryInt("guard_id"));
    this.putChar(t.queryInt("type"));
  },
  CMD_SELECT_CURRENT_MOUNT: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_ADD_MOUNT_ITEM: function (t) {
    this.putChar(t.queryInt("no"));
  },
  CMD_SET_SETTING: function (t) {
    this.putLenString(t.query("setting"));
    this.putShort(t.queryInt("value"));
  },
  CMD_SWITCH_BACK_EQUIP: function (t) {
    this.putChar(t.queryInt("page"));
  },
  CMD_TAKE: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("from_pos"));
    this.putShort(t.queryInt("to_pos"));
    this.putShort(t.queryInt("amount"));
  },
  CMD_SELECT_CURRENT_CHILD: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("in_combat"));
  },
  CMD_CHILD_USE_COMBAT: function (t) {
    this.putLong(t.queryInt("id"));
    this.putChar(t.queryInt("combat_type"));
    this.putChar(t.queryInt("use"));
  },
  CMD_DROP_CHILD: function (t) {
    this.putLong(t.queryInt("child_id"));
  },
  CMD_FEED_CHILD_EX: function (t) {
    this.putChar(t.queryInt("no"));
  },
  CMD_CHILD_USE_SKILL: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("skill_id"));
    this.putChar(t.queryInt("use"));
  },
  CMD_RECOVER_CHILD_BOOK: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_FRIEND_TELL: function (t) {
    this.putShort(t.queryInt("flag"));
    this.putLenString(t.query("name"));
    this.putShort(t.queryInt("compress"));
    this.putShort(t.queryInt("orgLength"));
    this.putLenString2(t.query("msg"));
    this.putItemInfo(t);
    this.putChar(t.queryInt("recent_sended"));
  },
  CMD_CHANGE_ATTRIB_PLAN: function () {},
  CMD_GET_TODAY_STAT: function () {},
  CMD_SET_FRIEND_REMARK: function (t) {
    this.putLenString(t.query("gid"));
    this.putLenString(t.query("remark"));
  },
  CMD_FINGER: function (t) {
    this.putLenString(t.query("char"));
    this.putChar(t.queryInt("type"));
  },
  CMD_ADD_FRIEND: function (t) {
    this.putLenString(t.query("group"));
    this.putLenString(t.query("char"));
    this.putChar(t.queryInt("type"));
  },
  CMD_SWITCH_GROUP: function (t) {
    this.putLenString(t.query("char"));
    this.putLenString(t.query("from_group"));
    this.putLenString(t.query("to_group"));
  },
  CMD_SWITCH_GROUP_EX: function (t) {
    this.putLenString(t.query("char"));
    this.putLenString(t.query("from_group"));
    this.putChar(t.queryInt("type"));
    this.putLenString(t.query("to_group"));
  },
  CMD_REQUEST_FRIEND_VERIFY: function (t) {
    this.putLenString(t.query("name"));
    this.putLenString(t.query("verify"));
  },
  CMD_REPLY_FRIEND_VERIFY: function (t) {
    this.putLenString(t.query("name"));
    this.putChar(t.queryInt("result"));
    this.putLenString(t.query("reply"));
    this.putLenString(t.query("char"));
  },
  CMD_WUDAO_STAGE_INFO: function (t) {
    this.putShort(t.queryInt("stage"));
  },
  CMD_WUDAO_DRAW_REP_CARD: function (t) {
    this.putLenString(t.query("card_type"));
    this.putChar(t.queryInt("not_open_dlg"));
  },
  CMD_WUDAO_BUY_REP_CARD: function (t) {
    this.putLenString(t.query("card_type"));
  },
  CMD_WUDAO_ADD_ATTRIB_REP: function (t) {
    this.putLong(t.queryInt("power_rep"));
    this.putLong(t.queryInt("speed_rep"));
    this.putLong(t.queryInt("life_rep"));
    this.putLong(t.queryInt("def_rep"));
  },
  CMD_WUDAO_PRE_ADD_ATTRIB_REP: function (t) {
    this.putLong(t.queryInt("power_rep"));
    this.putLong(t.queryInt("speed_rep"));
    this.putLong(t.queryInt("life_rep"));
    this.putLong(t.queryInt("def_rep"));
  },
  CMD_WUDAO_CONVERT_EXTRA_ATTRIB: function () {},
  CMD_WUDAO_SET_ATTRIB_STATUS: function (t) {
    this.putLenString(t.query("attrib"));
    this.putChar(t.queryInt("status"));
    this.putShort(t.queryInt("stage"));
    gfIsJdDist() || this.putChar(t.queryInt("not_open"));
  },
  CMD_WUDAO_ADD_ATTRIB_AUTO: function () {},
  CMD_WUDAO_BATCH_ADD_REP: function () {},
  CMD_STORE: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("from_pos"));
    this.putShort(t.queryInt("to_pos"));
    this.putShort(t.queryInt("amount"));
  },
  CMD_WITHDRAW: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("amount"));
  },
  CMD_DEPOSIT: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("amount"));
  },
  CMD_CLOSE_REMOTE_STORE: function (t) {
    this.putLong(t.queryInt("id"));
  },
  CMD_MANAGE_HOUSE: function (t) {
    this.putLong(t.queryInt("npc_id"));
    this.putChar(t.queryInt("type"));
    this.putChar(t.queryInt("oper"));
    var e = t.queryInt("count");
    this.putChar(e);
    for (var n = 1; n <= e; n++) this.putLong(t.queryInt("pos" + n));
  },
  CMD_OPERATE_PET_STORE: function (t) {
    this.putChar(t.queryInt("dir"));
    this.putShort(t.queryInt("pos"));
    this.putLong(t.queryInt("id"));
  },
  CMD_BUY_PET: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pos"));
  },
  CMD_TASK_SCORE_EXCHANGE_BONUS: function (t) {
    this.putShort(t.queryInt("no"));
    this.putLong(t.queryInt("npc_id"));
    this.putShort(t.queryInt("count"));
    this.putShort(t.queryInt("exchange_type"));
    this.putShort(t.queryInt("para"));
  },
  CMD_GOODS_BUY: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pos"));
    this.putShort(t.queryInt("amount"));
    this.putShort(t.queryInt("to_pos"));
  },
  CMD_REPAIR: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pos"));
  },
  CMD_MUL_GOODS_BUY: function (t) {
    var e = t.queryInt("count");
    this.putLong(t.queryInt("id"));
    this.putShort(e);
    for (var n = 1; n <= e; ++n) {
      this.putShort(t.queryInt("pos" + n));
      this.putShort(t.queryInt("amount" + n));
      this.putShort(t.queryInt("to_pos" + n));
    }
  },
  CMD_LEARN_SKILL: function (t) {
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("student_id"));
    this.putShort(t.queryInt("no"));
  },
  CMD_SKILL_LEVEL_DOWN: function (t) {
    this.putLong(t.queryInt("npc_id"));
    this.putLong(t.queryInt("student_id"));
    this.putShort(t.queryInt("skill_no"));
    this.putShort(t.queryInt("level"));
  },
  CMD_SET_PENNANT_SKILL: function (t) {
    this.putShort(t.queryInt("skill_no"));
    gfIsJdDist() || this.putChar(t.queryInt("add"));
  },
  CMD_SET_TEAM_ZHENXING_TYPE: function (t) {
    this.putChar(t.queryInt("zhenx"));
  },
  CMD_IMPROVE_FUXI_SKILL: function (t) {
    this.putLong(t.queryInt("skill_no"));
  },
  CMD_RECOVER_FUXI_DUR: function (t) {
    this.putLong(t.queryInt("type"));
  },
  CMD_FSL_FRAGMENT_INCARNATION: function (t) {
    var e = t.queryInt("count");
    this.putChar(e);
    for (var n = 1; n <= e; ++n) this.putLenString(t.query("iid" + n));
  },
  CMD_FSL_SET_ATTRIB_STATUS: function (t) {
    this.putLenString(t.query("attrib"));
    this.putChar(t.queryInt("status"));
  },
  CMD_FSL_TAKEOUT_INCARNATION: function (t) {
    var e = t.queryInt("count");
    this.putChar(e);
    for (var n = 1; n <= e; ++n) this.putLenString(t.query("iid" + n));
  },
  CMD_FSL_TOUCH_INCARNATION_EVENT: function (t) {
    this.putLenString(t.query("iid"));
  },
  CMD_FSL_OVERVIEW_INFO: function () {},
  CMD_FSL_INCARNATION_INFO: function () {},
  CMD_FSL_DRAW_INCARNATION: function (t) {
    this.putChar(t.queryInt("dir"));
    this.putChar(t.queryInt("times"));
    this.putChar(t.queryInt("cost_type"));
    this.putChar(t.queryInt("new"));
    this.putChar(t.queryInt("free"));
  },
  CMD_FSL_CALC_INCARNATION_ATTRIB: function (t) {
    this.putChar(t.queryInt("type"));
    this.putLenString(t.query("name"));
    this.putLong(t.queryInt("intimacy"));
  },
  CMD_FSL_UNCONCRETIZE_INCARNATION: function (t) {
    this.putLenString(t.query("iid"));
  },
  CMD_FAIRY_MOVE_ITEM: function (t) {
    this.putChar(t.query("from_pos"));
    this.putChar(t.query("to_pos"));
  },
  CMD_VENDUE_REFRESH: function (t) {
    this.putChar(t.queryInt("depot_type"));
    this.putChar(t.queryInt("action_type"));
    this.putChar(t.queryInt("index"));
  },
  CMD_SET_ATTENTION: function (t) {
    this.putLenString(t.query("type"));
    this.putLenString(t.query("id"));
    this.putChar(t.queryInt("status"));
  },
  CMD_VENDUE_OFFER: function (t) {
    this.putChar(t.queryInt("depot_type"));
    this.putChar(t.queryInt("merch_type"));
    this.putChar(t.queryInt("vendue_type"));
    this.putShort(t.queryInt("pos"));
    this.putLenString(t.query("vendue_iid"));
  },
  CMD_VENDUE_MANAGE: function (t) {
    this.putChar(t.queryInt("type"));
  },
  CMD_VENDUE_FETCH: function (t) {
    this.putLenString(t.query("key_id"));
  },
  CMD_VENDUE_CAN_VENDUE: function (t) {
    this.putChar(t.queryInt("merch_type"));
    this.putLong(t.queryInt("id"));
  },
  CMD_VENDUE_CANCEL: function (t) {
    this.putChar(t.queryInt("depot_type"));
    this.putChar(t.queryInt("merch_type"));
    this.putShort(t.queryInt("pos"));
    this.putLenString(t.query("vendue_iid"));
  },
  CMD_VENDUE_VENDUE_MERCH: function (t) {
    this.putChar(t.queryInt("action_type"));
    this.putChar(t.queryInt("type"));
    this.putLong(t.queryInt("price"));
    this.putLong(t.queryInt("time"));
    this.putLong(t.queryInt("pos"));
  },
  CMD_JD_MALL_OPEN: function (t) {
    this.putChar(t.queryInt("oper"));
    this.putLong(t.queryInt("cookie"));
  },
  CMD_JD_MALL_SELL: function (t) {
    var e = t.queryInt("count");
    this.putChar(e);
    for (var n = 1; n <= e; n++) this.putShort(t.queryInt("pos" + n));
    for (var i = 1; i <= e; i++) this.putLong(t.queryInt("price" + i));
  },
  CMD_LOCAL_ENCRYPT_LOCK_FAILED: function (t) {
    this.putLenString(t.query("wid"));
  },
  CMD_MOBILE_VERIFY_DEVICE: function (t) {
    this.putLenString2(t.query("info"));
  },
  CMD_VIEW_STALL_LIST_REMOTE: function () {},
  CMD_VIEW_STALL_INFO_REMOTE: function (t) {
    this.putLenString(t.query("server"));
    this.putLenString(t.query("stall_id"));
    this.putLong(t.queryInt("cookie"));
  },
  CMD_BUY_STALL_GOODS_REMOTE: function (t) {
    this.putLenString(t.query("server"));
    this.putLenString(t.query("stall_id"));
    this.putLong(t.queryInt("goods_id"));
    this.putLong(t.queryInt("amount"));
    this.putLong(t.queryInt("price"));
    this.putChar(t.queryInt("type"));
  },
  CMD_BUY_FROM_STALL: function (t) {
    this.putLenString(t.query("gid"));
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("amount"));
    this.putLong(t.queryInt("price"));
    this.putLong(t.queryInt("cookie"));
  },
  CMD_START_STALL: function () {},
  CMD_REQUEST_ADD_STALL_PAGE: function () {},
  CMD_RENAME_STALL: function (t) {
    this.putLenString(t.query("name"));
  },
  CMD_TAKE_STALL_CASH: function (t) {
    this.putLong(t.queryInt("cash"));
  },
  CMD_SET_STALL_GOODS: function (t) {
    this.putLong(t.queryInt("id"));
    this.putShort(t.queryInt("pos"));
    this.putShort(t.queryInt("amount"));
  },
  CMD_FINISH_STALL: function () {},
  CMD_APPLY_OFFLINE_STALL: function (t) {
    this.putChar(t.queryInt("type"));
  },
  CMD_START_AUTOMATISM_STALL: function () {},
  CMD_STALL_INPUT_PRICE: function (t) {
    this.putLong(t.queryInt("price"));
    this.putChar(t.queryInt("show"));
  },
  CMD_SHOW_SALE_LOG: function (t) {
    this.putChar(t.queryInt("type"));
  },
  CMD_SEARCH_STALL_GOODS: function (t) {
    this.putChar(t.queryInt("type"));
    this.putLenString(t.query("name"));
    this.putLenString(t.query("level"));
    this.putLenString(t.query("quality"));
    this.putLenString(t.query("sp_att"));
    this.putChar(t.queryInt("sub_type"));
    this.putLong(t.queryInt("cookie"));
    this.putLong(t.queryInt("id"));
    this.putLong(t.queryInt("wuxue"));
    this.putLenString(t.query("shop_type"));
  },
  CMD_VIEW_REMOTE_STALL_GOODS_INFO: function (t) {
    this.putLenString(t.query("server"));
    this.putLenString(t.query("stall_id"));
    this.putLong(t.queryInt("goods_id"));
    this.putChar(t.queryInt("type"));
  },
  CMD_SUBMIT_CONFIRM_DLG: function (t) {
    this.putLenString(t.query("menu_item"));
    this.putLenString(t.query("para"));
  },
  CMD_QUERY_STALL_GOODS_PRICE: function (t) {
    this.putLenString(t.query("owner_gid"));
    this.putLong(t.queryInt("id"));
    this.putChar(t.queryInt("remote_stall"));
    this.putLenString(t.query("server"));
  },
  CMD_CHECK_USER_NAME: function (t) {
    this.putLenString(t.query("para"));
    this.putLenString(t.query("name"));
  },
  CMD_C_SELECT_MENU_ITEM: function (t) {
    this.putLenString(t.query("menu_item"));
    this.putLenString(t.query("para"));
  },
};
exports.buildBuf = function (t, e, i, s) {
  var r = n[MsgDefine.toMsg(i)];
  if (null == r) return 0;
  n.data = t;
  n.curSendLen = e;
  r.call(n, s);
  return n.curSendLen;
};

// window.gfCmdToServer = function (t, e) {
//   for (
//     var n = gfExplodeString(e, ","),
//       i = arguments.length,
//       s = new Array(i > 2 ? i - 2 : 0),
//       r = 2;
//     r < i;
//     r++
//   )
//     s[r - 2] = arguments[r];
//   if (n.length == s.length) {
//     for (var _ = new UtilMapping(), a = 0; a < n.length; a++) {
//       var o = gfExplodeString(n[a], "=");
//       o.length > 0 && _.set(o[0], s[a]);
//     }
//     Communicate.cmdToServer(t, _);
//   } else Logger.error("keys != values");
// };
