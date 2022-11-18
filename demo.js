function toUint8Array(hexString) {
  return new Uint8Array(
    hexString.match(/\w{2}/g).map(function (byte) {
      return parseInt(byte, 16);
    })
  );
}
hexs = "4D 5A A2 7F 0D E3 91 A6 00 0A 20 D2 0D E3 91 A6 5E AB AD C4";

MsgDefines = {
  CMD_ECHO: 8402,
  MSG_REPLY_ECHO: 63939,
  MSG_ANSWER_FIELDS: 8475,
  MSG_TRADE_ASK_FIELDS: 6623,
  CMD_L_JOIN_QUEUE: 2824,
  MSG_L_JOIN_QUEUE: 2931,
  CMD_L_CHECK_USER_DATA_EX: 6944,
  MSG_L_CHECK_USER_DATA_EX: 6945,
  CMD_L_GET_QR_CODE_INFO: 4986,
  MSG_L_GET_QR_CODE_INFO: 4989,
  CMD_L_LOGIN_BY_QR_CODE: 4988,
  MSG_L_LOGIN_BY_QR_CODE: 4991,
  CMD_L_ACCOUNT: 9040,
  CMD_L_WEGAME_LOGIN: 9072,
  CMD_L_MOBILE_RECONNECT: 9046,
  MSG_L_AUTH: 21329,
  MSG_L_WEGAME_AUTH: 9081,
  CMD_L_GET_SERVER_LIST: 13140,
  MSG_L_SERVER_LIST: 17237,
  CMD_L_CLIENT_CONNECT_AGENT: 13142,
  MSG_L_AGENT_RESULT: 13143,
  CMD_LOGIN: 16676,
  MSG_EXISTED_CHAR_LIST: 61537,
  CMD_LOAD_EXISTED_CHAR: 4192,
  MSG_ENTER_GAME: 4321,
  CMD_LOGOUT: 15914,
  MSG_DIALOG_OK: 8165,
  MSG_UPDATE: 14833,
  MSG_UPDATE_IMPROVEMENT: 64001,
  MSG_SET_CURRENT_PET: 8815,
  MSG_SET_OWNER: 61619,
  MSG_UPDATE_PETS: 8399,
  MSG_UPDATE_PET_INFO: 64936,
  MSG_INVENTORY: 20739,
  MSG_UPDATE_INV_AMOUNT: 32263,
  MSG_CONTAINER_INVALID_RANGE: 2559,
  MSG_INVENTORY_ITEM: 9729,
  MSG_UPDATE_SKILLS: 10273,
  CMD_REQUEST_ITEM_INFO: 4500,
  CMD_C_FLEE: 8794,
  CMD_C_CATCH_PET: 4876,
  CMD_CHAT: 9028,
  MSG_MESSAGE: 2829,
  MSG_MESSAGE_EX: 16383,
  MSG_LONG_MESSAGE: 61653,
  MSG_PICTURE_DIALOG: 9089,
  MSG_LEVEL_UP: 5153,
  MSG_UPDATE_APPEARANCE: 9249,
  MSG_TASK_PROMPT: 9731,
  MSG_NOTICE_GET_ITEM: 64229,
  CMD_PROMPT_BEFORE_LEAVE: 8598,
  MSG_PROMPT_BEFORE_LEAVE: 8375,
  MSG_TIME_LUCK_INFO: 4477,
  MSG_COMPACT_TIME_LUCK_INFO: 4479,
  CMD_REFRESH_TASK_LOG: 4316,
  MSG_SERVICE_LOG: 63755,
  CMD_SORT_PACK: 14864,
  MSG_FINISH_SORT_PACK: 63959,
  CMD_IDENTIFY_EQUIP: 9136,
  CMD_APPLY_MAKEUP_ITEM: 8998,
  CMD_PUT_DOWN: 20770,
  CMD_EQUIP: 12316,
  CMD_UNEQUIP: 17478,
  CMD_APPLY: 8496,
  CMD_FEED_CHILD: 15916,
  MSG_C_START_COMBAT: 65503,
  MSG_C_END_COMBAT: 8617,
  MSG_C_FRIENDS: 61609,
  MSG_C_OPPONENTS: 7653,
  MSG_C_ACTION: 64825,
  MSG_C_CHAR_DIED: 4317,
  MSG_C_GENERAL_NOTIFY: 13581,
  MSG_C_CHAR_REVIVE: 65461,
  MSG_C_LIFE_DELTA: 63753,
  MSG_C_MANA_DELTA: 64037,
  MSG_C_UPDATE_STATUS: 16647,
  MSG_C_WAIT_COMMAND: 20995,
  MSG_C_ACCEPT_HIT: 4443,
  MSG_C_END_ACTION: 20021,
  MSG_C_QUIT_COMBAT: 4293,
  MSG_C_ADD_FRIEND: 4213,
  MSG_C_ADD_OPPONENT: 64051,
  MSG_C_UPDATE_IMPROVEMENT: 8753,
  MSG_C_UPDATE_APPEARANCE: 8981,
  MSG_C_ACCEPT_MAGIC_HIT: 5029,
  MSG_C_LEAVE_AT_ONCE: 16613,
  MSG_C_MESSAGE: 8477,
  MSG_C_DIALOG_OK: 8669,
  MSG_C_UPDATE: 8253,
  MSG_C_COMMAND_ACCEPTED: 61667,
  MSG_SYNC_MESSAGE: 6697,
  MSG_SEQ_MESSAGE: 2595,
  MSG_C_MENU_LIST_EX: 5147,
  MSG_C_MENU_LIST: 8465,
  MSG_C_MENU_SELECTED: 10733,
  MSG_C_REFRESH_PET_LIST: 16615,
  MSG_C_REFRESH_CHILD_LIST: 61167,
  MSG_C_DELAY: 65507,
  MSG_C_LIGHT_EFFECT: 12021,
  MSG_C_WAIT_ALL_END: 8999,
  MSG_C_START_SEQUENCE: 7655,
  MSG_C_SANDGLASS: 4659,
  MSG_C_CHAR_OFFLINE: 2573,
  MSG_C_OPPONENT_INFO: 4707,
  MSG_C_BATTLE_ARRAY: 8445,
  MSG_C_SET_FIGHT_PET: 65529,
  MSG_C_SET_CUSTOM_MSG: 4281,
  MSG_C_ACCEPT_MULTI_HIT: 4689,
  MSG_C_DIRECT_UPDATE: 13059,
  MSG_C_DIRECT_OPPONENT_INFO: 8611,
  MSG_C_ADD_CHILD: 4379,
  MSG_C_CALLBACK_CHILD: 2827,
  MSG_C_ANIMATE_ACCELERATE: 8507,
  MSG_C_ZHENXING_INFO: 17467,
  MSG_C_UPDATE_ZHENXING_ANGRY: 17471,
  MSG_C_VIBRATE_SCREEN: 17473,
  MSG_C_BATCH_COMBAT_EFFECT: 8509,
  MSG_C_UPDATE_IMPROVEMENT_EX: 9499,
  MSG_C_UPDATE_STATUS_INFO: 4173,
  MSG_C_CATCH_PET: 8547,
  MSG_GODBOOK_EFFECT_SUMMON: 64901,
  MSG_ATTACH_SKILL_LIGHT_EFFECT: 9732,
  MSG_C_CHILD_EFFECT: 8739,
  MSG_C_STATUS_IMPROVEMENT: 28675,
  MSG_C_UPDATE_BACKGROUND: 13317,
  MSG_C_UPDATE_BACKGROUND_EX: 13325,
  MSG_C_CAST_MAICAL_SKILL: 11811,
  MSG_C_REMOVE_MAICAL_SKILL: 11813,
  MSG_C_TAIJI_MINGYU_STATUS: 11815,
  MSG_C_DELAY_MULTI_ATTACK: 11817,
  MSG_C_CAST_UNOWNED_SKILL: 11819,
  MSG_SKILL_FROZEN_LIST: 9491,
  MSG_C_ACCEPTED_COMMAND: 16673,
  MSG_GODBOOK_EFFECT_NORMAL: 65463,
  MSG_GRAY_COMBAT_MENU: 9493,
  MSG_C_FLEE: 7671,
  MSG_C_ANGER_DELTA: 6643,
  MSG_C_PET_ANGER_DELTA: 2571,
  MSG_LC_START_LOOKON: 8849,
  MSG_LC_END_LOOKON: 64047,
  MSG_LC_FRIENDS: 64805,
  MSG_LC_OPPONENTS: 9255,
  MSG_LC_ACTION: 4387,
  MSG_LC_CHAR_DIED: 20481,
  MSG_LC_CHAR_REVIVE: 8129,
  MSG_LC_LIFE_DELTA: 10247,
  MSG_LC_MANA_DELTA: 61529,
  MSG_LC_UPDATE_STATUS: 13057,
  MSG_LC_WAIT_COMMAND: 28935,
  MSG_LC_ACCEPT_HIT: 19985,
  MSG_LC_END_ACTION: 89,
  MSG_LC_FLEE: 4195,
  MSG_LC_CATCH_PET: 2825,
  MSG_LC_INIT_STATUS: 8321,
  MSG_LC_QUIT_COMBAT: 13579,
  MSG_LC_UPDATE_IMPROVEMENT: 8353,
  MSG_LC_ACCEPT_MAGIC_HIT: 9011,
  MSG_LC_LEAVE_AT_ONCE: 15905,
  MSG_LC_ADD_FRIEND: 4611,
  MSG_LC_ADD_OPPONENT: 64851,
  MSG_LC_UPDATE: 9475,
  MSG_LC_MENU_LIST: 4309,
  MSG_LC_MENU_SELECTED: 10725,
  MSG_LC_DELAY: 64043,
  MSG_LC_LIGHT_EFFECT: 13097,
  MSG_LC_WAIT_ALL_END: 9047,
  MSG_LC_SANDGLASS: 16935,
  MSG_LC_CHAR_OFFLINE: 64059,
  MSG_LC_START_SEQUENCE: 9037,
  MSG_LC_ACCEPT_MULTI_HIT: 4099,
  MSG_LC_ADD_CHILD: 64065,
  MSG_LC_CALLBACK_CHILD: 64049,
  MSG_LC_ZHENXING_INFO: 17469,
  MSG_LC_COMMAND_ACCEPTED: 4637,
  MSG_C_APPLY_ITEM: 8551,
  MSG_C_ROUND_ANIMATE_TIME: 8511,
  MSG_MENU_LIST: 8247,
  MSG_MENU_CLOSED: 11731,
  MSG_OPEN_MENU: 8473,
  CMD_OPEN_MENU_0: 9736,
  CMD_SELECT_MENU_ITEM_0: 4286,
  CMD_C_DO_ACTION_0: 28686,
  CMD_ENTER_ROOM_0: 62322,
  CMD_OPEN_MENU_1: 12308,
  CMD_SELECT_MENU_ITEM_1: 8976,
  CMD_C_DO_ACTION_1: 8240,
  CMD_ENTER_ROOM_1: 62324,
  CMD_OPEN_MENU_2: 8382,
  CMD_SELECT_MENU_ITEM_2: 64067,
  CMD_C_DO_ACTION_2: 8550,
  CMD_ENTER_ROOM_2: 16662,
  CMD_GENERAL_NOTIFY: 4319,
  MSG_GENERAL_NOTIFY: 15859,
  MSG_ENTER_ROOM: 4437,
  CMD_C_END_ANIMATE: 8712,
  CMD_REQUEST_JOIN: 4488,
  CMD_QUIT_TEAM: 8966,
  CMD_TEAM_REQUEST_TASK: 244,
  CMD_TEAM_SEEK_MEMBER: 4345,
  CMD_TEAM_SEEK_LEADER: 12562,
  CMD_TEAM_CANCEL_SEEK: 8634,
  CMD_CHANGE_TEAM_LEADER: 8372,
  CMD_KICKOUT: 8640,
  CMD_ACCEPT: 24097,
  CMD_REJECT: 57345,
  MSG_UPDATE_WITHOUT_LEAVE_TEMP_TEAM_LIST: 12287,
  MSG_UPDATE_LEAVE_TEMP_TEAM_LIST: 64255,
  MSG_UPDATE_TEAM_LIST: 6,
  MSG_UPDATE_TEAM_BY_SINGLE: 2945,
  MSG_TEAM_REQUEST_TASK: 61607,
  CMD_REFRESH_FRIEND: 8962,
  MSG_FRIEND_UPDATE_LISTS: 61633,
  MSG_FRIEND_ADD_CHAR: 65019,
  MSG_FRIEND_REMOVE_CHAR: 4961,
  MSG_FRIEND_NOTIFICATION: 13825,
  MSG_FRIEND_UPDATE_PARTIAL: 16643,
  MSG_UPDATE_FRIEND_LIST_EX: 4225,
  MSG_REMOVE_ALL_BLACK_FRIENDS: 64961,
  MSG_UPDATE_FRIEND_STATUS: 64779,
  CMD_CLEAN_REQUEST: 8992,
  MSG_TITLE: 64029,
  MSG_DIALOG: 8603,
  MSG_CLEAN_REQUEST: 61641,
  MSG_SET_SETTING: 61695,
  CMD_OPER_TELEPORT_ITEM: 8542,
  MSG_TELEPORT_EX: 64228,
  CMD_BUTTON_DOUBLE_BONUS: 64944,
  MSG_BUTTON_DOUBLE_BONUS: 8419,
  CMD_REFRESH_SERVICE_LOG: 20620,
  MSG_OPEN_CONFIRM_DLG: 14819,
  CMD_OPEN_CONFIRM_DLG: 4366,
  CMD_SELECT_CURRENT_PET: 20494,
  CMD_TRAIN: 16558,
  MSG_REFRESH_PET_GODBOOK_SKILLS: 65511,
  CMD_DROP_PET: 8570,
  MSG_COMBAT_CAPACITY_RATE: 101,
  MSG_RUYI_RECOVER: 2939,
  CMD_BATCH_APPLY_MEDICINE: 5046,
  CMD_REQUEST_SERVER_STATUS: 222,
  MSG_REQUEST_SERVER_STATUS: 61663,
  CMD_SWITCH_SERVER: 4308,
  MSG_SWITCH_SERVER: 8405,
  MSG_SWITCH_SERVER_EX: 8406,
  CMD_EQUIP_PET_DRESS: 64960,
  CMD_FEED_PET: 8320,
  CMD_ADD_DUNWU_NIMBUS: 16402,
  CMD_ADD_SKILL_ESSENCE: 9286,
  CMD_REFRESH_PET_GODBOOK_SKILLS: 4872,
  CMD_UPDATE_GODBOOK_STATE: 4114,
  MSG_SET_PET_SETTING: 4683,
  CMD_SET_PET_SETTING: 21250,
  CMD_ADD_GODBOOK_DIRECT: 4640,
  CMD_SET_XINFA_SKILL_STATUS: 4996,
  MSG_PET_XINFA_EXP_CARD: 2839,
  MSG_AUTH_VIP_SMS: 2819,
  MSG_OPEN_AUTH_ALL_PROTECT: 9079,
  MSG_PASSWORD_DLG: 8741,
  CMD_PASSWORD_DLG: 4358,
  CMD_CANCEL_AUTH_VIP_SMS: 4654,
  CMD_AUTH_VIP_SMS: 12358,
  CMD_RESEND_VIP_SMS: 63508,
  CMD_OPEN_AUTH_ALL_PROTECT: 64834,
  CMD_CHANGE_UPGRADE_STATE: 28680,
  CMD_GUARDS_RECOVER: 8774,
  CMD_GUARDS_DROP_GUARD: 64808,
  CMD_GUARDS_CHEER: 12344,
  CMD_GUARDS_SET_TACTICS: 16386,
  MSG_GUARDS_REFRESH: 24586,
  MSG_GUARDS_DROP: 4272,
  MSG_GUARDS_VISIBLE: 13316,
  MSG_SET_CURRENT_MOUNT: 4441,
  MSG_OPEN_MOUNT_INBORN_SKILLS: 8449,
  CMD_SELECT_CURRENT_MOUNT: 16430,
  CMD_ADD_MOUNT_ITEM: 32266,
  CMD_SET_SETTING: 6660,
  CMD_SWITCH_BACK_EQUIP: 7174,
  MSG_MAKEUP_INFO: 119,
  MSG_STORE: 2557,
  CMD_TAKE: 10264,
  MSG_UPDATE_CHILDREN: 28929,
  MSG_UPDATE_CHILD_ATTRIB: 4965,
  MSG_SET_VISIBLE_CHILD: 8429,
  MSG_SET_CURRENT_CHILD: 8381,
  MSG_SET_OWNER_CHILD: 15879,
  CMD_SELECT_CURRENT_CHILD: 8584,
  CMD_CHILD_USE_COMBAT: 17440,
  CMD_DROP_CHILD: 2570,
  CMD_FEED_CHILD_EX: 64919,
  CMD_CHILD_USE_SKILL: 4162,
  MSG_CHILD_INVENTORY: 65475,
  CMD_RECOVER_CHILD_BOOK: 64033,
  MSG_SEND_IMAGE: 8707,
  CMD_FRIEND_TELL: 64896,
  CMD_CHANGE_ATTRIB_PLAN: 16644,
  CMD_GET_TODAY_STAT: 8540,
  MSG_REFRESH_TODAY_STAT: 4227,
  MSG_WUDAO_STAGE_INFO: 4331,
  MSG_WUDAO_PRE_ADD_ATTRIB_REP: 9129,
  CMD_WUDAO_STAGE_INFO: 8552,
  CMD_WUDAO_DRAW_REP_CARD: 61650,
  CMD_WUDAO_BUY_REP_CARD: 4632,
  CMD_WUDAO_ADD_ATTRIB_REP: 2852,
  CMD_WUDAO_PRE_ADD_ATTRIB_REP: 8790,
  CMD_WUDAO_CONVERT_EXTRA_ATTRIB: 8608,
  CMD_WUDAO_SET_ATTRIB_STATUS: 4388,
  CMD_WUDAO_ADD_ATTRIB_AUTO: 8744,
  CMD_WUDAO_BATCH_ADD_REP: 8430,
  CMD_STORE: 4652,
  CMD_WITHDRAW: 8234,
  CMD_DEPOSIT: 17482,
  CMD_CLOSE_REMOTE_STORE: 9282,
  MSG_STORE_BOXES: 9027,
  CMD_MANAGE_HOUSE: 17472,
  MSG_CLOSE_STORE: 24583,
  MSG_PET_STORE: 63969,
  CMD_OPERATE_PET_STORE: 8342,
  MSG_KIND_GOODS_LIST: 8728,
  MSG_SELL_PET_LIST: 61729,
  MSG_TASK_SCORE_EXCHANGE_LIST: 87,
  MSG_CLOSE_KIND_STORE: 4410,
  CMD_BUY_PET: 12592,
  CMD_TASK_SCORE_EXCHANGE_BONUS: 10010,
  CMD_GOODS_BUY: 63754,
  CMD_REPAIR: 9032,
  CMD_MUL_GOODS_BUY: 8586,
  MSG_QIRI_QIANDAO: 15929,
  MSG_DAOHANG_FUND_LIST: 21331,
  MSG_CHENGZHANG_FUND_LIST: 20997,
  MSG_MOBILE_WELFARE_CENTER_DLG: 2997,
  CMD_SET_FRIEND_REMARK: 12584,
  CMD_FINGER: 21248,
  MSG_FINGER: 64249,
  CMD_ADD_FRIEND: 11722,
  CMD_SWITCH_GROUP: 13314,
  CMD_SWITCH_GROUP_EX: 9250,
  MSG_GET_FRIEND_VERIFY: 19997,
  MSG_REPLY_FRIEND_VERIFY: 61673,
  MSG_REQUEST_FRIEND_VERIFY: 8361,
  CMD_REQUEST_FRIEND_VERIFY: 60,
  CMD_REPLY_FRIEND_VERIFY: 62738,
  MSG_SKILL_COST_ATTRIB: 2915,
  CMD_LEARN_SKILL: 4698,
  CMD_SKILL_LEVEL_DOWN: 8384,
  CMD_SET_PENNANT_SKILL: 17474,
  MSG_SET_PENNANT_SKILL: 28679,
  MSG_REFRESH_PENNANT_SKILLS: 8641,
  MSG_ZHENXING_INFO: 17463,
  CMD_SET_TEAM_ZHENXING_TYPE: 8470,
  CMD_IMPROVE_FUXI_SKILL: 4210,
  CMD_RECOVER_FUXI_DUR: 61646,
  MSG_OPEN_DIALOG: 8513,
  MSG_XIAOLV_DIANSHU: 111,
  MSG_C_RUYI_STATUS: 113,
  MSG_PROMPT_JD_BOX: 4103,
  MSG_JD_MARKET_ZH_LIST: 4105,
  MSG_JD_MARKET_LB_LIST: 4107,
  MSG_JD_DEALER_LIST: 4109,
  MSG_JD_JUQING_BONUS_LIST: 4113,
  MSG_FAIRY_CLASS_INFO: 2591,
  CMD_FAIRY_MOVE_ITEM: 8218,
  MSG_FAIRY_ITEM_GROUP_EFFECT: 2593,
  MSG_FAIRY_ATTRIBS: 61593,
  MSG_FSL_INCARNATION_INFO: 12561,
  MSG_FSL_DELETE_INCARNATION: 12563,
  MSG_FSL_OVERVIEW_INFO: 12565,
  MSG_FSL_FRAGMENT_INFO: 12567,
  MSG_FSL_DRAW_INCARNATION_INFO: 12571,
  MSG_FSL_INCANATION_ATTRIB: 12573,
  CMD_FSL_FRAGMENT_INCARNATION: 12386,
  CMD_FSL_SET_ATTRIB_STATUS: 12396,
  CMD_FSL_TAKEOUT_INCARNATION: 64948,
  CMD_FSL_TOUCH_INCARNATION_EVENT: 8590,
  CMD_FSL_OVERVIEW_INFO: 8800,
  CMD_FSL_INCARNATION_INFO: 64904,
  CMD_FSL_DRAW_INCARNATION: 4634,
  CMD_FSL_CALC_INCARNATION_ATTRIB: 4252,
  CMD_FSL_UNCONCRETIZE_INCARNATION: 518,
  MSG_VENDUE_REFRESH_ITEMS: 7669,
  MSG_VENDUE_REFRESH_PETS: 515,
  MSG_VENDUE_PERMIT: 64947,
  MSG_VENDUE_OPEN_STORE: 15855,
  MSG_VENDUE_GOT_IT: 8575,
  MSG_VENDUE_REFRESH_SYS: 64841,
  MSG_ATTENTION_STATUS: 8571,
  MSG_VENDUE_CAN_VENDUE: 8587,
  CMD_VENDUE_REFRESH: 16404,
  CMD_SET_ATTENTION: 53004,
  CMD_VENDUE_OFFER: 8746,
  CMD_VENDUE_MANAGE: 17468,
  CMD_VENDUE_FETCH: 8144,
  CMD_VENDUE_CAN_VENDUE: 4110,
  CMD_VENDUE_CANCEL: 8544,
  CMD_VENDUE_VENDUE_MERCH: 20646,
  CMD_JD_MALL_OPEN: 20784,
  CMD_JD_MALL_BUY: 20786,
  CMD_JD_MALL_SELL: 20788,
  MSG_JD_MALL_BASIC_INFO: 20785,
  MSG_JD_MALL_PRICE_INFO: 20787,
  MSG_POPUP_SAFE_TIME: 7703,
  MSG_MOUNT_INBORN_STONE_LIST: 24593,
  CMD_LOCAL_ENCRYPT_LOCK_FAILED: 20742,
  CMD_MOBILE_VERIFY_DEVICE: 4,
  MSG_STALL_NAME: 3581,
  MSG_STALL_ITEM_INFO: 8379,
  MSG_STALL_PET_INFO: 61623,
  MSG_REFESH_STALL_LIST: 4617,
  MSG_STALL_LIST_REMOTE: 5043,
  MSG_SEARCH_RESULT_REMOTE: 5041,
  MSG_REMOTE_STALL_ITEM_INFO: 5045,
  MSG_REMOTE_STALL_PET_INFO: 5047,
  MSG_UPDATE_STALL_GOODS_REMOTE: 5051,
  MSG_STALL_INPUT_PRICE: 12269,
  MSG_SHOW_SALE_LOG: 8191,
  MSG_STALL_REMOVE_GOODS: 61699,
  CMD_VIEW_STALL_LIST_REMOTE: 8982,
  CMD_VIEW_STALL_INFO_REMOTE: 32262,
  CMD_BUY_STALL_GOODS_REMOTE: 8272,
  CMD_BUY_FROM_STALL: 4504,
  CMD_START_STALL: 4336,
  CMD_REQUEST_ADD_STALL_PAGE: 4465,
  CMD_RENAME_STALL: 8224,
  CMD_TAKE_STALL_CASH: 4170,
  CMD_SET_STALL_GOODS: 8808,
  CMD_FINISH_STALL: 4275,
  CMD_APPLY_OFFLINE_STALL: 4692,
  CMD_START_AUTOMATISM_STALL: 12576,
  CMD_STALL_INPUT_PRICE: 21256,
  CMD_SHOW_SALE_LOG: 8136,
  CMD_SEARCH_STALL_GOODS: 8230,
  CMD_VIEW_REMOTE_STALL_GOODS_INFO: 2858,
  MSG_SUBMIT_CONFIRM_DLG: 62741,
  CMD_SUBMIT_CONFIRM_DLG: 16688,
  MSG_SYNC_BAN_WORDS: 64985,
  CMD_QUERY_STALL_GOODS_PRICE: 4182,
  MSG_STALL_GOODS_PRICE: 8699,
  CMD_CHECK_USER_NAME: 86,
  MSG_MOBILE_COMMON_RED_POINT: 20533,
  MSG_LUCKY_UPGRADE_PROP: 8243,
  CMD_C_SELECT_MENU_ITEM: 4266,
  MSG_C_END_ROUND: 517,
  MSG_YEAR_BOOK_2019: 2981,
};
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
class UtilMapping {
  constructor() {
    this.m_data = {};
  }

  getData() {
    return this.m_data;
  }
  getSize() {
    return Object.keys(this.m_data).length;
  }
  empty() {
    return 0 == this.getSize();
  }
  getSortKeys() {
    var t = [];
    for (var e in this.m_data) t.push(e);
    t.sort();
    return t;
  }
  queryInt(t, e) {
    var n = this.m_data[t];

    return null == n ? (null == e ? 0 : e) : gfToNumber(n) << 0;
  }
  query(t, e) {
    var n = this.m_data[t];
    return null == n
      ? null == e
        ? ""
        : e
      : "number" == typeof n
      ? String(n)
      : n;
  }
  set(t, e) {
    this.m_data[t] = e;
  }
  haveKey(t) {
    return null != this.m_data[t];
  }
  deleteKey(t) {
    null != this.m_data[t] && delete this.m_data[t];
  }
  absorbFields(t) {
    var e = t instanceof UtilMapping ? t.m_data : t;
    for (var n in e) this.m_data[n] = e[n];
  }
  cleanup() {
    this.m_data = {};
  }
  isEqual(t, e) {
    return this.m_data[t] == e;
  }
}

function run(hex) {
  var t = toUint8Array(hexs);
  var buf = t.buffer;
  console.log("toUint8Array", t);
  console.log("buf len:", t.byteLength);
  var v = new DataView(buf, 0, buf.byteLength);
  console.log("msg len", v.getUint16(8));

  var r = v.getUint16(2);
  var o = calculateCheckSum(new Uint8Array(buf, 10, buf.byteLength - 10));
  if (r == o) {
    console.log("CheckSum True");
  } else {
    console.log("CheckSum False");
  }
 //t:data
  var t = new DataView(buf, 10, buf.byteLength - 10);
  var c = t.getUint16(0);
  var msg = toMsg(c);
  console.log("cmd:", c, msg);

  if (MsgDefines.CMD_ECHO == c) {
    console.log("[recieve msg CMD_ECHO]");
    var I = new UtilMapping();
    I.set("reply_time", Date.now());
    console.log(I);
    cmdToServer(MsgDefines.MSG_REPLY_ECHO, I);
    // return !0;
  }
}
var r = new ArrayBuffer(65536);
// run("4D 5A A2 7F 0D E3 91 A6 00 0A 20 D2 0D E3 91 A6 5E AB AD C4");


var m = require("./m");
// var m = new m();
m.say();

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
  //dataview, o, msg_type, utilmap

  if (-1 !== (o = buildBuf(n, o, t, e))) {
    n.setUint16(8, o - 10); //data长度
    var s = calculateCheckSum(new Uint8Array(r, 10, o - 10));
    n.setUint16(2, s);
    console.log("send", r.slice(0, o));
    //   I.send(r.slice(0, o));

    MsgDefines.CMD_ECHO != t &&
      console.log("[send " + toMsg(t) + "] " + gfToJsonString(e));

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
function pickoutPacket() {
  if (a <= 8) return 0;
  var t = new Uint8Array(s, _, a),
    e = 0;
  for (e = 0; e < a && (77 != t[e] || 90 != t[e + 1]); ++e);
  // 找到77 90，以77 90 为开头
  if (e > 0) {
    _ += e;
    a -= e;
  }
  if (e >= a) return 0;
  if (a < 10) return 0;
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
        "[recieve msg data error]   checkSum = " + o + " buf_check_sum =" + r
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
    return !0;
  }
  if (
    MsgDefines.MSG_ANSWER_FIELDS == c ||
    MsgDefines.MSG_TRADE_ASK_FIELDS == c
  ) {
    n.parse(t);
    return !0;
  }
  if (MsgDefines.MSG_REPLY_ECHO != c && null == h[c] && null == g.find(c)) {
    Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  no callback");
    return !0;
  }
  //msg_code,回调函数
  var d = n.parse(t);
  if (null == d || null == d.data) {
    Logger.log("[recieve " + MsgDefines.toMsg(c) + "]  parse failed");
    return !0;
  }
  if (MsgDefines.MSG_REPLY_ECHO == c) {
    l = d.data.queryInt("time");
    E = 0;
    GameMgr.syncServerTime(d.data.queryInt("server_time_offset"));
    return !0;
  }
  R.push(d);
  return !0;
}

function parse(t, e) {
  if (null != t) {
    var n = (a = t).getUint16(0);
    _ = 2;
    var i = MsgDefines.toMsg(n);
    if (null == Z[i])
      return {
        msg: n,
      };
    if (
      MsgDefines.MSG_ANSWER_FIELDS == n ||
      MsgDefines.MSG_TRADE_ASK_FIELDS == n
    ) {
      Z[i].call(Z);
      return {
        msg: n,
      };
    }
    return {
      msg: n,
      data: Z[i].call(Z, e),
    };
  }
  Logger.error("MsgParser data is null!");
}

//dataview, o, msg_type, utilmap
function buildBuf(t, e, i, s) {
  var r = n[toMsg(i)];

  if (null == r) return 0;
  n.data = t;
  n.curSendLen = e;
  //序列化
  r.call(n, s);
  return n.curSendLen;
}
function toMsg(t) {
  for (var e in MsgDefines) if (MsgDefines[e] == t) return e;
  return "0X" + t.toString(16).toUpperCase();
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
