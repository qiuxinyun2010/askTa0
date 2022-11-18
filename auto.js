AutoMgr: [
  function (t, e) {
    "use strict";
    cc._RF.push(e, "8ad9ddnf+BJtL8W8mXi1bv2", "AutoMgr");
    var n = cc.Class({
      ctor: function () {
        this.m_id = 0;
        this.m_value = 0;
        this.m_maxValue = 0;
        this.m_allState = FALSE;
        this.m_strType = "";
        this.m_percent = 100;
      },
    });
    e.exports = {
      init: function () {
        this.m_max = 0;
        this.m_maxUsable = 0;
        this.m_damaged = 0;
        this.m_minDamaged = 0;
        this.m_useSpecialItem = FALSE;
        this.m_itemName = "";
        this.m_partyItemName = "";
        this.m_partyItemNameEx = "";
        this.m_extraFieldName = "";
        this.m_scaleFieldName = "";
        this.m_limitName = "";
        this.m_limitScaleName = "";
        this.m_id = 0;
        this.m_RecoverType = "";
        this.m_itemArr = [];
        this.m_applyItem = [];
        this.m_totalUsed = 0;
        this.initMedicineCfg();
        Communicate.registerCallback(
          MsgDefines.MSG_RUYI_RECOVER,
          this,
          this.onMsgRuyiRecover
        );
      },
      reloadJson: function () {
        this.initMedicineCfg();
      },
      initMedicineCfg: function () {
        this.m_medicineLimit = [];
        var t = this;
        gfLoadJson("MedicineRecoverLimit", function (e) {
          for (var n in e) {
            var i = new UtilMapping();
            i.absorbFields(e[n]);
            t.m_medicineLimit[n] = i;
          }
        });
      },
      getRecoverPoints: function (t, e, n, i, s, r) {
        if (null == t) return 0;
        var _,
          a = t.queryBasic("name"),
          o = this.m_medicineLimit[a];
        _ =
          null != o
            ? e >= o.queryInt("LimitLevel")
              ? Math.min(
                  o.queryInt("MaxRecover2"),
                  (t.queryExtraInt(i) * this.m_max) / 100
                )
              : Math.min(
                  o.queryInt("MaxRecover1"),
                  (t.queryExtraInt(i) * this.m_max) / 100
                )
            : e >= t.queryBasicInt("limit_recover_level")
            ? t.queryExtraInt(n) + (t.queryExtraInt(i) * this.m_max) / 100
            : t.queryBasicInt(s) + (t.queryBasicInt(r) * this.m_max) / 100;
        return Math.floor(_);
      },
      getMedicineLimit: function (t) {
        return this.m_medicineLimit[t];
      },
      insertIntoArray: function (t, e, n, i) {
        for (
          var s = {
              points: t,
              pos: e,
              amount: n,
              gift: i,
            },
            r = 0,
            _ = this.m_itemArr.length;
          r < _ &&
          (this.m_itemArr[r].points != t || this.m_itemArr[r].gift || !i) &&
          !(this.m_itemArr[r].points < t);
          ++r
        );
        r < _ ? this.m_itemArr.splice(r, 0, s) : this.m_itemArr.push(s);
      },
      getNormalItem: function (t) {
        for (
          var e = MapMgr.isInPartyCopyMap(), n = 0;
          n < ACTIVE_INVENTORY_SIZE;
          n++
        ) {
          var i = InventoryMgr.getInventory(START_INVENTORY_POS + n);
          if (null != i) {
            var s = i.queryInt("attrib");
            if (
              s & ITEM_IN_NORMAL &&
              (i.queryInt("item_type") == ITEM_TYPE_MEDICINE ||
                0 != (s & ITEM_APPLY_ON_USER))
            ) {
              var r = i.queryBasic("name");
              if (
                !(
                  ("" != this.m_itemName && -1 != r.indexOf(this.m_itemName)) ||
                  r == this.m_partyItemName ||
                  (e && r != this.m_partyItemNameEx)
                )
              ) {
                var _ = this.getRecoverPoints(
                  i,
                  t,
                  this.m_extraFieldName,
                  this.m_scaleFieldName,
                  this.m_limitName,
                  this.m_limitScaleName
                );
                _ <= 0 ||
                  this.insertIntoArray(
                    _,
                    START_INVENTORY_POS + n,
                    i.queryInt("amount"),
                    i.queryInt("gift") || i.queryInt("nosale")
                  );
              }
            }
          }
        }
      },
      getRecoverItemPos: function (t) {
        for (
          var e = 0, n = 0, i = MapMgr.isInPartyCopyMap(), s = 0;
          s < ACTIVE_INVENTORY_SIZE;
          ++s
        ) {
          var r = InventoryMgr.getInventory(START_INVENTORY_POS + s);
          if (null != r) {
            var _ = r.queryBasicInt("attrib");
            if (
              _ & ITEM_IN_NORMAL &&
              (r.queryInt("item_type") == ITEM_TYPE_MEDICINE ||
                0 != (_ & ITEM_APPLY_ON_USER))
            ) {
              var a = 0,
                o = r.queryBasic("name");
              if (
                !i ||
                o == this.m_partyItemName ||
                o == this.m_partyItemNameEx
              )
                if (
                  ("" != this.m_itemName && -1 != o.indexOf(this.m_itemName)) ||
                  o == this.m_partyItemName
                ) {
                  a = this.getLingLongPoint(o, t >= RECOVER_LIMIT_LEVEL);
                  if (
                    n <
                    (a = Math.min(r.queryExtraInt(this.m_extraFieldName), a))
                  ) {
                    n = a;
                    e = START_INVENTORY_POS + s;
                  }
                } else
                  (a = this.getRecoverPoints(
                    r,
                    t,
                    this.m_extraFieldName,
                    this.m_scaleFieldName,
                    this.m_limitName,
                    this.m_limitScaleName
                  )) <= 0 ||
                    this.insertIntoArray(
                      a,
                      START_INVENTORY_POS + s,
                      r.queryInt("amount"),
                      r.queryInt("gift") || r.queryInt("nosale")
                    );
            }
          }
        }
        return this.m_itemArr.length <= 0 || n >= this.m_itemArr[0].points
          ? e
          : this.m_itemArr[0].pos;
      },
      getLingLongPoint: function (t, e) {
        var n = e ? LINGLONG_RECOVER_RATIO_UPGRADE : LINGLONG_RECOVER_RATIO,
          i = Math.floor(n * this.m_max);
        -1 != t.indexOf(TxtRes(44352)) || -1 != t.indexOf(TxtRes(1035368))
          ? (i += e ? MAX_RECOVERD_FALINGLONG_UPGRADE : MAX_RECOVERD_FALINGLONG)
          : (-1 == t.indexOf(TxtRes(44351)) &&
              -1 == t.indexOf(TxtRes(1035367))) ||
            (i += e
              ? MAX_RECOVERD_XUELINGLONG_UPGRADE
              : MAX_RECOVERD_XUELINGLONG);
        return i;
      },
      sendTotalCmdToServer: function () {
        var t = this.m_applyItem.length;
        if (!(t <= 0)) {
          var e = new UtilMapping();
          e.set("id", this.m_id);
          e.set("type", this.m_RecoverType);
          e.set("total_used", this.m_totalUsed);
          e.set("count", t);
          for (var n = 0; n < t; n++) {
            var i = this.m_applyItem[n];
            if (null != i) {
              e.set("pos" + n, i.pos);
              e.set("amount" + n, i.amount);
            }
          }
          Communicate.cmdToServer(MsgDefines.CMD_BATCH_APPLY_MEDICINE, e);
        }
      },
      canRecoverAtt: function (t, e, n) {
        if (null == e || "" == e) return FALSE;
        var i = InventoryMgr.getInventory(t);
        if (null == i) return FALSE;
        var s = e + "_1",
          r = e + "_scale_1",
          _ = "limit_recover/" + e,
          a = "limit_recover_scale/" + e,
          o = i.queryBasicInt("attrib");
        return o & ITEM_IN_NORMAL
          ? i.queryInt("item_type") != ITEM_TYPE_MEDICINE &&
            0 == (o & ITEM_APPLY_ON_USER)
            ? FALSE
            : this.getRecoverPoints(i, n, s, r, _, a) > 0
          : FALSE;
      },
      autoFightRecover: function (t, e) {
        if (null == t || null == e || "" == e) return 0;
        this.init();
        if ("life" == e) {
          this.m_itemName = TxtRes(44351);
          this.m_partyItemName = TxtRes(1035367);
          this.m_partyItemNameEx = TxtRes(1035369);
        } else if ("mana" == e) {
          this.m_itemName = TxtRes(44352);
          this.m_partyItemName = TxtRes(1035368);
          this.m_partyItemNameEx = TxtRes(1035370);
        }
        this.m_extraFieldName = e + "_1";
        this.m_scaleFieldName = e + "_scale_1";
        this.m_limitName = "limit_recover/" + e;
        this.m_limitScaleName = "limit_recover_scale/" + e;
        this.m_max = t.queryInt("max_" + e);
        return this.getRecoverItemPos(t.queryBasicInt("level"));
      },
      applyItem: function (t) {
        for (var e = this.m_applyItem.length, n = 0; n < e; n++) {
          var i = this.m_applyItem[n];
          if (null != i && i.pos == t) {
            i.amount = i.amount + 1;
            break;
          }
        }
        n >= e &&
          this.m_applyItem.push({
            pos: t,
            amount: 1,
          });
      },
      useSpecialItem: function (t, e) {
        if ("life" == t) {
          this.m_itemName = TxtRes(44351);
          this.m_partyItemName = TxtRes(1035367);
        } else {
          if ("mana" != t) return FALSE;
          this.m_itemName = TxtRes(44352);
          this.m_partyItemName = TxtRes(1035368);
        }
        for (var n = MapMgr.isInPartyCopyMap(); ; ) {
          var i = 0;
          for (i = 0; i < ACTIVE_INVENTORY_SIZE; i++) {
            if (this.m_damaged <= this.m_minDamaged) return TRUE;
            var s = InventoryMgr.getInventory(START_INVENTORY_POS + i);
            if (null != s) {
              var r = s.queryBasic("name"),
                _ = r.indexOf(this.m_itemName);
              if (!((-1 == _ && r != this.m_partyItemName) || (n && -1 != _))) {
                this.m_maxUsable = this.getLingLongPoint(r, e);
                var a = s.queryExtraInt(this.m_extraFieldName);
                if (!(a <= 0)) {
                  this.applyItem(START_INVENTORY_POS + i);
                  var o = a > this.m_maxUsable ? this.m_maxUsable : a;
                  this.m_damaged -= o;
                  this.m_useSpecialItem = TRUE;
                  s.setExtra(this.m_extraFieldName, a - o);
                  if (
                    a > this.m_maxUsable &&
                    this.m_damaged > this.m_minDamaged
                  )
                    break;
                }
              }
            }
          }
          if (i >= ACTIVE_INVENTORY_SIZE) break;
        }
        return this.m_damaged <= this.m_minDamaged ? TRUE : FALSE;
      },
      doRecover: function (t) {
        if (null == t) return FALSE;
        if (!gfCanUseItem()) {
          gfShowSmallTips(TxtRes(17921));
          return FALSE;
        }
        if (!t.m_allState && GameMgr.getSpriteState != SS_NORMAL_STATE)
          return FALSE;
        this.init();
        var e = t.m_strType;
        this.m_RecoverType = t.m_strType;
        this.m_extraFieldName = e + "_1";
        this.m_scaleFieldName = e + "_scale_1";
        this.m_limitName = "limit_recover/" + e;
        this.m_limitScaleName = "limit_recover_scale/" + e;
        this.m_id = t.m_id;
        var n = me.getId(),
          i = me.queryBasicInt("level");
        if (n != this.m_id) {
          var s = PetMgr.getPetByID(this.m_id);
          if (null == s) return FALSE;
          s.getName();
          TxtRes(44801);
          i = s.queryBasicInt("level");
        }
        if ("life" == e) {
          TxtRes(44802);
          this.m_itemName = TxtRes(44351);
          this.m_partyItemName = TxtRes(1035367);
          this.m_partyItemNameEx = TxtRes(1035369);
          this.m_maxUsable = MAX_RECOVERD_XUELINGLONG;
        } else {
          if ("mana" != e) return FALSE;
          TxtRes(44804);
          this.m_itemName = TxtRes(44352);
          this.m_partyItemName = TxtRes(1035368);
          this.m_partyItemNameEx = TxtRes(1035370);
          this.m_maxUsable = MAX_RECOVERD_FALINGLONG;
        }
        this.m_max = t.m_maxValue;
        this.m_damaged = this.m_max - t.m_value;
        var r = t.m_percent;
        r > 100 && (r = 100);
        this.m_minDamaged = ((100 - r) * this.m_max) / 100;
        this.m_minDamaged = 0;
        if (this.m_damaged <= this.m_minDamaged) return FALSE;
        do {
          if (
            r >= 100 &&
            this.useSpecialItem(t.m_strType, i >= RECOVER_LIMIT_LEVEL)
          ) {
            this.sendTotalCmdToServer();
            break;
          }
          this.getNormalItem(i);
          this.optimizeUseItem();
          r >= 100 && this.completeUseItem();
          r < 100 && this.useSpecialItem(t.m_strType, i >= RECOVER_LIMIT_LEVEL);
          this.sendTotalCmdToServer();
        } while (0);
        return 0 != this.m_totalUsed;
      },
      optimizeUseItem: function () {
        for (
          var t = this.m_itemArr.length, e = 0;
          e < t && !(this.m_damaged <= this.m_minDamaged);

        )
          if (this.m_damaged < this.m_itemArr[e].points) e++;
          else if (this.m_itemArr[e].amount < 1) e++;
          else {
            this.applyItem(this.m_itemArr[e].pos);
            this.m_damaged -= this.m_itemArr[e].points;
            this.m_itemArr[e].amount = this.m_itemArr[e].amount - 1;
            this.m_totalUsed++;
          }
      },
      completeUseItem: function () {
        for (
          var t = this.m_itemArr.length, e = 0;
          e < t && !(this.m_damaged <= this.m_minDamaged);

        )
          if (this.m_itemArr[e].amount < 1) e++;
          else {
            this.applyItem(this.m_itemArr[e].pos);
            this.m_damaged -= this.m_itemArr[e].points;
            this.m_itemArr[e].amount = this.m_itemArr[e].amount - 1;
            this.m_totalUsed++;
          }
      },
      ruYiRecover: function (t) {
        var e = new n();
        e.m_allState = TRUE;
        e.m_percent = 95;
        var i = me.getId();
        if (me.queryInt("extra_life") <= 0) {
          e.m_id = i;
          e.m_value = t.queryInt("me_life");
          e.m_maxValue = t.queryInt("me_max_life");
          e.m_strType = "life";
          this.doRecover(e);
        }
        if (me.queryInt("extra_mana") <= 0) {
          e.m_id = i;
          e.m_value = t.queryInt("me_mana");
          e.m_maxValue = t.queryInt("me_max_mana");
          e.m_strType = "mana";
          this.doRecover(e);
        }
        var s = PetMgr.getFightPet(),
          r = t.queryInt("pet_max_life");
        if (null != s && 0 != r) {
          i = s.getId();
          if (s.queryInt("extra_life") <= 0) {
            e.m_id = i;
            e.m_value = t.queryInt("pet_life");
            e.m_maxValue = t.queryInt("pet_max_life");
            e.m_strType = "life";
            this.doRecover(e);
          }
          if (s.queryInt("extra_mana") <= 0) {
            e.m_id = i;
            e.m_value = t.queryInt("pet_mana");
            e.m_maxValue = t.queryInt("pet_max_mana");
            e.m_strType = "mana";
            this.doRecover(e);
          }
        }
      },
      repaireEquip: function () {
        for (var t = 0, e = IM_EQUIP.length; t < e; t++) {
          var n = InventoryMgr.getInventory(IM_EQUIP[t]);
          if (null != n && 0 == n.queryBasicInt("equip_fake")) {
            var i = n.queryBasicInt("equip_type");
            if (InventoryMgr.canMendEquip(i)) {
              var s = 0,
                r = 0;
              if (EQUIP_ARTIFACT == i) {
                if (!n.getBasicMap().haveKey("nimbus")) continue;
                s = n.queryBasicInt("nimbus");
                var _ = n.queryBasicInt("level");
                r = 100 * _ * _ + 300;
              } else {
                s = n.queryBasicInt("durability");
                r = n.queryBasicInt("max_durability");
              }
              if (!(s >= r)) {
                if (0 == s) break;
                if (3 * r > 10 * s) break;
              }
            }
          }
        }
        t < e &&
          NotifyDefines.notifyToServer({
            type: NotifyDefines.NOTIFY_AUTO_REPAIR,
          });
      },
      onMsgRuyiRecover: function (t) {
        this.ruYiRecover(t);
      },
    };
    cc._RF.pop();
  },
  {},
];
