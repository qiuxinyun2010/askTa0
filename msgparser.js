// "use strict";
// t("UtilMapping");
// t("move");
const { UtilMapping } = require("./utilmap.js");
const {decode,encode} = require("./gbk.js");
const MsgDefines = require("./msgdefine.js");
require("./global_channel.js");
var msgParser = {

};
var n = new UtilMapping(),
  i = new UtilMapping(),
  s = new UtilMapping(),
  r = new UtilMapping(),
  _ = 0,
  a = null; //数据包Data段的二进制数组
// t("FieldMapJd").initFieldMapJd(s);
// t("FieldMap").initFieldMap(i);
n = i;
function gfSetFields() {
  n = gfIsJdDist() ? s : i;
}
function o() {
  return a.byteLength - _;
}

//读取1字节
function getByte() {
  if (-1 == _) return 0;
  if (a.byteLength - _ < 1) {
    _ = -1;
    return 0;
  }
  var t = a.getUint8(_);
  ++_;
  return t;
}

//读取2字节
function getShort() {
  if (-1 == _) return 0;
  if (a.byteLength - _ < 2) {
    _ = -1;
    return 0;
  }
  var t = a.getUint16(_);
  _ += 2;
  return t;
}
function h() {
  if (-1 == _) return 0;
  if (a.byteLength - _ < 2) {
    _ = -1;
    return 0;
  }
  var t = a.getInt16(_);
  _ += 2;
  return t;
}
//读取4字节
function getLong() {
  if (-1 == _) return 0;
  if (a.byteLength - _ < 4) {
    _ = -1;
    return 0;
  }
  var t = a.getUint32(_);
  _ += 4;
  return t;
}
function I() {
  if (-1 == _) return 0;
  if (a.byteLength - _ < 1) {
    _ = -1;
    return 0;
  }
  var t = a.getInt8(_);
  ++_;
  return t;
}
// 1字节+字符串 byteString
function getByteString() {
  var t = getByte();
  if (-1 == _) return "";
  if (a.byteLength - _ < t) {
    _ = -1;
    return "";
  }
  var e = decode(
    Array.prototype.slice.call(new Uint8Array(a.buffer, a.byteOffset + _, t))
  );
  _ += t;
  return e;
}
//2字节+字符串
function u() {
  var t = getShort();
  if (-1 == _) return "";
  if (a.byteLength - _ < t) {
    _ = -1;
    return "";
  }
  var e = decode(
    Array.prototype.slice.call(new Uint8Array(a.buffer, a.byteOffset + _, t))
  );
  _ += t;
  return e;
}
function T(t) {
  var e = getShort();
  if (!(-1 == _ || e <= 0))
    for (var n = 1; n <= e; ++n) {
      var i = getShort();
      if (-1 == _) return;
      var s = getByteString();
      if (-1 == _) return;
      t.set(i, s);
      t.set("val_type_" + i, getByte());
    }
}
function R(t, e, i) {
  void 0 === i && (i = !1);
  null == e && (e = "");
  var s = getShort();
  if (!(-1 == _ || s <= 0))
    for (var r = 1; r <= s; ++r) {
      var a = getShort(),
        o = i ? getByte() : n.queryInt("val_type_" + a);
      if (-1 == _) return;
      var T = 0;
      switch (o) {
        case FIELD_INT8:
          T = I();
          break;

        case FIELD_UINT8:
          T = getByte();
          break;

        case FIELD_INT16:
          T = h();
          break;

        case FIELD_UINT16:
          T = getShort();
          break;

        case FIELD_INT32:
          T = getLong();
          break;

        case FIELD_STRING:
          T = getByteString();
          break;

        case FIELD_LONG_STRING:
          T = u();
          break;

        default:
          console.log("BuildFields get undefined type!");
      }
      if (-1 == _) return;
      t.set(n.query(a) + e, T);
    }
}
function g(t, e) {
  void 0 === e && (e = 0);
  if (1 == e) {
    t.set("hair_mask_dress", 0);
    t.set("skin_mask_dress", 0);
    t.set("ornament_mask_dress", 0);
    t.set("weapon_mask_dress", 0);
    t.set("clothe_mask_dress", 0);
  } else {
    if (0 != e) return;
    t.set("hair_mask", 0);
    t.set("skin_mask", 0);
    t.set("ornament_mask", 0);
    t.set("weapon_mask", 0);
    t.set("clothe_mask", 0);
  }
}
function L(t) {
  var e = getByte();
  if (-1 != _)
    if (1 != e) {
      t.set("dye_index_dress", 0);
      if (2 == e) {
        getByte();
        t.set("hair_mask_dress", getByte());
        t.set("hair_color_dress", getByteString());
        t.set("skin_mask_dress", getByte());
        t.set("skin_color_dress", getByteString());
        t.set("ornament_mask_dress", getByte());
        t.set("ornament_color_dress", getByteString());
        t.set("weapon_mask_dress", getByte());
        t.set("weapon_color_dress", getByteString());
        t.set("clothe_mask_dress", getByte());
        t.set("clothe_color_dress", getByteString());
      }
    } else {
      t.set("dye_index_dress", getShort());
      g(t, 1);
    }
}
function f(t) {
  t.set("use_new_blend_color", 0);
  var e = getByte();
  if (-1 != _)
    if (1 != e) {
      t.set("dye_index", 0);
      if (2 == e) {
        getByte();
        t.set("hair_mask", getByte());
        t.set("hair_color", getByteString());
        t.set("skin_mask", getByte());
        t.set("skin_color", getByteString());
        t.set("ornament_mask", getByte());
        t.set("ornament_color", getByteString());
        t.set("weapon_mask", getByte());
        t.set("weapon_color", getByteString());
        t.set("clothe_mask", getByte());
        t.set("clothe_color", getByteString());
      }
    } else {
      t.set("dye_index", getShort());
      g(t);
    }
}
function S(t) {
  t.set("ride_pet_mask_colors", getByteString());
}
function p(t, e) {
  void 0 === e && (e = !1);
  for (var n = getShort(), i = 0; i < n; ++i) {
    var s = getByte(),
      r = "";
    switch (getByte()) {
      case FIELDS_BASIC:
        R(t, null, e);
        continue;

      case FIELDS_VALUE:
        r = "_" + s;
    }
    R(t, r, e);
  }
}
function m(t, e, n) {
  void 0 === n && (n = !1);
  for (var i = getShort(), s = !1, r = 0; r < i; ++r) {
    var _ = getByte(),
      a = "";
    switch (getByte()) {
      case FIELDS_BASIC:
        R(t, null, n);
        continue;

      case FIELDS_VALUE:
        a = "_" + _;
        break;

      case FIELDS_SCALE:
        a = "_scale_" + _;
    }
    s = !0;
    e.set(_.toString() + "_group", 1);
    R(e, a, n);
  }
  s && t.set("extra", e);
}
function D(t, e, n) {
  for (var i = 0; i < e; ++i) {
    var s = new UtilMapping();
    s.absorbFields(t);
    s.set("skill_no", getShort());
    s.set("skill_attrib", getLong());
    s.set("skill_name", getByteString());
    s.set("max_level", getShort());
    s.set("skill_level", getShort());
    s.set("skill_level_base", getShort());
    s.set("skill_level_research", getShort());
    s.set("level_improved", getShort());
    s.set("skill_mana_cost", getLong());
    s.set("skill_life_cost", getLong());
    s.set("skill_essence_cost", getShort());
    s.set("skill_anger_cost", getShort());
    s.set("class", getLong());
    s.set("subclass", getLong());
    s.set("ladder", getLong());
    s.set("passive_skill", getByte());
    s.set("temp_skill", getByte());
    s.set("skill_nimbus", getLong());
    s.set("point", getLong());
    s.set("max_point", getLong());
    for (
      var r = getByteString(), _ = gfExplodeString(r, ","), a = _.length, o = 0;
      o < a;
      ++o
    ) {
      var I = gfExplodeString(_[o], "=");
      2 == I.length && s.set("memo_" + I[0], I[1]);
    }
    s.set("is_used", getByte());
    var h = getShort();
    s.set("cost_type_count", h);
    for (var u = 1; u <= h; u++) {
      s.set("cost_type_" + u, getByteString());
      s.set("cost_point_" + u, getLong());
    }
    s.set("range", getShort());
    s.set("max_range", getShort());
    s.set("combat_desc", getByteString());
    n.push(s);
  }
}
function A(t, e) {
  void 0 === e && (e = -1);
  var n = "",
    i = function t(e, n) {
      return n < 0 ? e : cc.js.formatStr("inborn_%s_%d", t, n);
    };
  n = i("skill_name", e);
  t.set(n, getByteString());
  n = i("skill_class", e);
  t.set(n, getByte());
  n = i("subclass", e);
  t.set(n, getLong());
  n = i("skill_no", e);
  t.set(n, getShort());
  n = i("skill_level", e);
  t.set(n, getShort());
  n = i("stone_level", e);
  t.set(n, getShort());
  n = i("stone_color", e);
  t.set(n, getByteString());
  n = i("add_effect", e);
  t.set(n, getByteString());
}
function C(t) {
  var e = getByte();
  t.set("hunshoushi_count", e);
  for (var n = 1; n <= e; ++n) {
    t.set("hunshoushi_name_" + n, getByteString());
    t.set("hunshoushi_color_" + n, getByteString());
    t.set("hunshoushi_level_" + n, getShort());
  }
}
function F(t) {
  if (
    MOUNT_TYPE_YL == t.queryInt("mount_type") &&
    0 == t.queryInt("eclosion_rank")
  ) {
    var e = getByte();
    t.set("inborn_skill_count", e);
    for (var n = 0; n < e; ++n) A(t, n);
    C(t);
  }
}
function y(t) {
  if (
    MOUNT_TYPE_YL == t.queryInt("mount_type") &&
    0 == t.queryInt("eclosion_rank")
  ) {
    C(t);
    var e = getShort();
    t.set("inborn_skill_count", e);
    for (var n = 0; n < e; ++n) {
      t.set("inborn_skill_name_" + n, getByteString());
      t.set("inborn_skill_level_" + n, getShort());
    }
  }
}
function N(t) {
  if (!(o() <= 0)) {
    var e = getShort();
    t.set("img_count", e);
    for (var n = 0; n < e; ++n) {
      var i = getLong();
      if (a.byteLength - _ < i) {
        _ = -1;
        return;
      }
      var s = new Uint8Array(i);
      s.set(new Uint8Array(a.buffer, a.byteOffset + _, i));
      t.set("image" + n, s);
    }
  }
}
function M(t) {
  t.set("id", getLong());
  t.set("setting", getShort());
  t.set("portrait", getLong());
  t.set("spine_brow", getByteString());
  t.set("pic_no", getShort());
  t.set("name", getByteString());
  t.set("content", u());
  N(t);
}
function w(t) {
  var e = getShort();
  t.set("skill_count", e);
  for (var n = 0; n < e; n++) t.set("skill_name_" + n, getByteString());
  e = getShort();
  t.set("god_book_skill_count", e);
  for (var i = 0; i < e; i++) t.set("god_book_skill_name_" + i, getByteString());
}
function P(t) {
  for (var e = t.queryInt("skill_count"), n = 0; n < e; n++) {
    t.set("skill_level_" + n, getShort());
    t.set("class_" + n, getLong());
    t.set("subclass_" + n, getLong());
    t.set("ladder_" + n, getLong());
    t.set("skill_nimbus_" + n, getLong());
    t.set("point_" + n, getLong());
    t.set("max_point_" + n, getLong());
    var i = getByteString();
    if ("" != i)
      for (
        var s = gfExplodeLineToMap(i, ",", "="), r = s.getSortKeys(), _ = 0;
        _ < r.length;
        ++_
      )
        t.set("memo_" + r[_] + "_" + n, s.query(r[_]));
  }
  O(t, FALSE);
}
function v(t, e) {
  void 0 === e && (e = !1);
  var n = getShort();
  t.set("item_info_count", n);
  for (var i = 1; i <= n; i++) {
    var s = getShort();
    t.set("query_info_type", s);
    var r = new UtilMapping(),
      _ = new UtilMapping();
    if (OBJECT_TYPE_ITEM == s) m(r, _, e);
    else if (OBJECT_TYPE_GUARD == s) p(r, e);
    else if (OBJECT_TYPE_PET == s) {
      p(r, e);
      R(_, e);
      var a = getShort(),
        o = [];
      D(t, a, o);
      r.set("skill_count", a);
      for (var E = 0; E < a; E++)
        for (var I in o[E].getData()) {
          var h = cc.js.formatStr("%s_%d", I, E);
          r.set(h, o[E].query(I));
        }
      r.set("god_book_skill_count", getShort());
      O(r, !0);
      F(r);
    } else if (OBJECT_TYPE_CHILD == s) {
      p(r, e);
      var u = getShort(),
        T = [];
      D(t, u, T);
      r.set("skill_count", u);
      for (var g = 0; g < u; g++)
        for (var L in T[g].getData()) {
          var f = cc.js.formatStr("%s_%d", L, g);
          r.set(f, T[g].query(L));
        }
      var S = getByte();
      r.set("child_book_count", S);
      for (var A = 1; A <= S; ++A) r.set("child_book_name_" + A, getByteString());
    }
    t.set("basic_info_map_pointer_" + i, r);
    t.set("extra_info_map_pointer_" + i, _);
  }
  t.set("item_cookie_count", n);
}
function O(t, e, n) {
  void 0 === n && (n = !1);
  for (
    var i = gfIsJdDist(), s = t.queryInt("god_book_skill_count"), r = 0;
    r < s;
    r++
  ) {
    e && t.set("god_book_skill_name_" + r, getByteString());
    t.set("god_book_skill_level_" + r, getShort());
    t.set("god_book_skill_used_" + r, getByte());
    t.set("god_book_gift_" + r, getByte());
    t.set("god_book_skill_nimbus_" + r, getLong());
    t.set("god_book_skill_exp_" + r, getLong());
    t.set("god_book_skill_exp_to_" + r, getLong());
    t.set("god_book_color_" + r, getByteString());
    t.set("god_book_icon_" + r, getLong());
    if (i) {
      t.set("gbs_activated_" + r, getByte());
      var _ = getByte();
      t.set("gbs_prop_count_" + r, _);
      for (var a = 1; a <= _; ++a) {
        t.set(cprintf("gbs_prop_name_%d_%d", r, a), getByteString());
        t.set(cprintf("gbs_prop_base_%d_%d", r, a), getLong());
        t.set(cprintf("gbs_prop_total_%d_%d", r, a), getLong());
        t.set(cprintf("gbs_prop_max_%d_%d", r, a), getLong());
      }
    } else {
      var o = new UtilMapping();
      R(o, null, n);
      for (var I in o.m_data)
        t.set(
          cprintf("gbs_base%d_%s_%d", r, I, FIELDS_GODBOOK_PROP_BASIC),
          o.m_data[I]
        );
      o.cleanup();
      R(o, null, n);
      for (var h in o.m_data)
        t.set(cprintf("gbs_total%d_%s", r, h), o.m_data[h]);
      o.cleanup();
      R(o, null, n);
      for (var u in o.m_data)
        t.set(
          cprintf("gbs_extra%d_%s_%d", r, u, FIELDS_GODBOOK_PROP_EXTRA),
          o.m_data[u]
        );
      o.cleanup();
      R(o, null, n);
      for (var T in o.m_data) t.set(cprintf("gbs_max%d_%s", r, T), o.m_data[T]);
    }
  }
}
function B(t) {
  var e = new UtilMapping();
  e.set("id", getLong());
  e.set("syn_msg", t ? TRUE : FALSE);
  R(e);
  return e;
}
function b(t) {
  var e = new UtilMapping();
  e.set("id", getLong());
  e.set("partial_update", getByte());
  e.set("syn_msg", t ? TRUE : FALSE);
  R(e);
  return e;
}
function G(t) {
  var e = [],
    n = getShort();
  if (-1 == _ || n <= 0) return e;
  for (var i = 1; i <= n; ++i) {
    var s = new UtilMapping();
    s.set("no", getByte());
    s.set("id", getLong());
    s.set("syn_msg", t ? TRUE : FALSE);
    p(s);
    e.push(s);
  }
  return e;
}
function U(t) {
  var e = [],
    n = getShort();
  if (-1 == _ || n <= 0) return e;
  for (var i = 1; i <= n; ++i) {
    var s = new UtilMapping();
    s.set("no", getByte());
    s.set("id", getLong());
    s.set("syn_msg", t ? TRUE : FALSE);
    p(s);
    e.push(s);
  }
  return e;
}
function x(t) {
  var e = new UtilMapping();
  e.set("id", getLong());
  var n = getShort();
  if (-1 == _ || n <= 0) return e;
  var i = [];
  D(e, n, i);
  for (var s = 0; s < i.length; ++s) i[s].set("syn_msg", t ? TRUE : FALSE);
  return i;
}
function k() {
  var t = [],
    e = getByte();
  if (-1 == _ || e <= 0) return t;
  for (var n = 1; n <= e; ++n) {
    var i = new UtilMapping();
    i.set("id", getLong());
    i.set("leader", getShort());
    i.set("weapon_icon", getLong());
    i.set("pos", getShort());
    R(i);
    i.set("suit_light_effect", getLong());
    i.set("org_icon", getLong());
    i.set("suit_icon", getLong());
    i.set("pan_icon", getLong());
    i.set("pet_icon", getLong());
    i.set("shadow_icon", getLong());
    i.set("shelter_icon", getLong());
    i.set("show_icon", getLong());
    i.set("show_prop", getShort());
    i.set("pan_prop", getShort());
    L(i);
    f(i);
    S(i);
    i.set("child_id", getLong());
    i.set("child_icon", getLong());
    i.set("soul_id", getLong());
    i.set("soul_icon", getLong());
    i.set("ming_pai", getByteString());
    gfIsJdDist() || i.set("religion", getByte());
    i.set("polar", getByte());
    t.push(i);
  }
  return t;
}
function Y() {
  var t = new UtilMapping();
  t.set("attacker_id", getLong());
  t.set("action", getShort());
  t.set("victim_id", getLong());
  t.set("para", getLong());
  return t;
}
function q() {
  var t = new UtilMapping();
  t.set("id", getLong());
  t.set("hitter_id", getLong());
  t.set("para_ex", getLong());
  t.set("hitter_child_icon", getLong());
  t.set("victim_child_icon", getLong());
  t.set("missed", getShort());
  t.set("para", getShort());
  t.set("damage_type", getLong());
  t.set("para_ex2", getLong());
  t.set("para_ex3", getLong());
  t.set("ctl", getShort());
  t.set("double_hit_index", getShort());
  return t;
}
function H() {
  var t = new UtilMapping();
  t.set("check_enable", getByte());
  t.set("id", getLong());
  t.set("hitter_id", getLong());
  t.set("point", getLong());
  t.set("child_point", getLong());
  t.set("effect_no", getLong());
  t.set("damage_type", getLong());
  t.set("extra_type", getLong());
  return t;
}
function W() {
  var t = new UtilMapping();
  t.set("id", getLong());
  for (var e = getShort(), n = [], i = 1; i <= e; ++i) n.push(getLong());
  t.set("status", n);
  return t;
}
function V() {
  var t = [],
    e = gfIsJdDist(),
    n = getLong(),
    i = 0;
  e || (i = getLong());
  for (var s = getLong(), r = getShort(), o = !1, c = getShort(), I = 0; I < c; ++I) {
    var h = new UtilMapping();
    h.set("hitter_id", n);
    h.set("damage_type", s);
    h.set("double_hit_index", r);
    e || h.set("main_id", i);
    h.set("id", getLong());
    h.set("child_icon", getLong());
    I + 1 >= c && h.set("main_target", 1);
    h.set("missed", 1);
    t.push(h);
  }
  for (var d = 0; d < c; ++d)
    if (a.byteLength - _ > 0) {
      t[d].set("missed", getShort());
      t[d].set("can_show_magic_stunt", o ? 0 : 1);
      4 == t[d].query("missed") && (o = !0);
    }
  return t;
}
function X() {
  for (var t = [], e = getByte(), n = getByte(), i = getByte(), s = 0; s < i; ++s) {
    var r = new UtilMapping();
    r.set("seq", e);
    r.set("id", getLong());
    r.set("partial_update", n);
    R(r);
    t.push(r);
  }
  return t;
}
function K() {
  for (
    var t = [], e = getLong(), n = getLong(), i = getLong(), s = getShort(), r = getShort(), _ = 0;
    _ < r;
    ++_
  ) {
    var a = new UtilMapping();
    a.set("hitter_id", e);
    a.set("main_victim_id", n);
    a.set("damage_type", i);
    a.set("double_hit_index", s);
    a.set("id", getLong());
    a.set("missed", getShort());
    t.push(a);
  }
  return t;
}
function j(t) {
  var e = gfIsJdDist();
  t.set("id", getLong());
  R(t);
  t.set("pos_x", getShort());
  t.set("pos_y", getShort());
  t.set("map_id", getLong());
  t.set("map_index", getLong());
  t.set("map_name", getByteString());
  t.set("team_status", getByte());
  t.set("mobile_client", getByte());
  t.set("gold_finger", getByte());
  t.set("source_map_name", getByteString());
  t.set("obj_type", getLong());
  t.set("fuxi_mingw", getByteString());
  t.set("fuxi_mingw_level", getLong());
  t.set("fuxi_zhenx_effect", getByteString());
  t.set("change_icon", getLong());
  t.set("makeup/ck", getByte());
  t.set("makeup/db", getByte());
  t.set("in_wuyou", getByte());
  e || t.set("is_year_insider", getByte());
  t.set("org_icon", getLong());
  t.set("show_icon", getLong());
  t.set("weapon_icon", getLong());
  t.set("show_prop", SHOW_WEAPON);
  t.set("pet_icon", getLong());
  t.set("shadow_icon", getLong());
  t.set("shelter_icon", getLong());
  t.queryInt("pet_icon") && t.set("show_prop", SHOW_MOUNT);
  t.set("dress_icon", getLong());
  f(t);
  S(t);
  L(t);
  t.set("card_name", getByteString());
  t.set("card_end_time", getLong());
}
function J(t) {
  var e = getShort();
  t.set("skill_count", e);
  for (var n = [], i = 0; i < e; i++) {
    var s = new UtilMapping();
    s.set("skill_name", getByteString());
    s.set("skill_id", getByteString());
    s.set("skill_level", getShort());
    s.set("skill_used", getByte());
    s.set("skill_class", getLong());
    s.set("skill_sub_class", getLong());
    s.set("skill_ladder", getLong());
    n.push(s);
  }
  t.set("skill", n);
  t.set("org_icon", getLong());
  t.set("weapon_icon", getLong());
  t.set("suit_icon", getLong());
  t.set("act_type", getByte());
}
function Q(t) {
  t.set("ban_life", getByte());
  t.set("ban_phy_power", getByte());
  t.set("ban_mag_power", getByte());
  t.set("ban_def", getByte());
  t.set("ban_speed", getByte());
  t.set("fsl_draw_free_time", getLong());
  t.set("lss_draw_free_time", getLong());
}
var Z = {
  TEST_LOCATION_INFO:function(){
    var data = new UtilMapping();
    data.set("id",getLong());
    data.set("x",getShort());
    data.set("y",getShort());
    data.set("dir",getShort());
    return data; 
  },
  TEST_MOVE_INFO:function(){
    var t = new UtilMapping();
    t.set("id",getLong());
    t.set("map_id",getLong());
    t.set("count",getShort());
    var cnt = t.query("count");
    console.log(cnt);
    for (var i=0;i<cnt;i++){
      t.set("x"+i , getShort());
      t.set("y"+i , getShort());
    }
    t.set("dir" , getShort());
    t.set("send_time" , getLong());
    t.set("last_step_time" , getLong());
    return t; 
  },
  CMD_C_DO_ACTION_1: function() {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("victim_id", getLong());
    t.set("action", getLong());
    t.set("para", getLong());
    t.set("para_ex1", getByteString());
    t.set("para_ex2", getByteString());
    t.set("para_ex3", getByteString());
    t.set("skill_talk", getByteString());

    return t;
  },
  CMD_GENERAL_NOTIFY: function() {
    var t = new UtilMapping();
    t.set("type", getShort());
    t.set("para1", getByteString());
    t.set("para2", getByteString());
    return t;
  },
  MSG_ANSWER_FIELDS: function () {
    T(n);
  },
  MSG_TRADE_ASK_FIELDS: function () {
    r.cleanup();
    T(r);
  },
  MSG_REPLY_ECHO: function () {
    var t = new UtilMapping();
    t.set("time", getLong());
    t.set("server_time_offset", getLong());
    return t;
  },
  MSG_L_JOIN_QUEUE: function () {
    var t = new UtilMapping();
    t.set("cookie", getByteString());
    t.set("prior_number", getLong());
    t.set("wait_time", getLong());
    t.set("reconnect", getByte());
    return t;
  },
  MSG_L_CHECK_USER_DATA_EX: function () {
    var t = new UtilMapping();
    t.set("open_pwd_guard", getByte());
    t.set("qr_code_login", getByte());
    t.set("cookie", getByteString());
    return t;
  },
  MSG_L_AUTH: function () {
    var t = new UtilMapping();
    t.set("result", getLong());
    t.set("auth_key", getLong());
    t.set("msg", u());
    return t;
  },
  MSG_L_WEGAME_AUTH: function () {
    var t = new UtilMapping();
    t.set("result", getLong());
    t.set("auth_key", getLong());
    t.set("msg", u());
    return t;
  },
  MSG_L_GET_QR_CODE_INFO: function () {
    var t = new UtilMapping();
    t.set("qr_code_id", getByteString());
    t.set("my_qr_code", getByteString());
    t.set("countdown", getShort());
    return t;
  },
  MSG_L_LOGIN_BY_QR_CODE: function () {
    var t = new UtilMapping();
    t.set("qr_code_id", getByteString());
    t.set("account", getByteString());
    return t;
  },
  MSG_L_SERVER_LIST: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("server", getByteString());
      i.set("ip", getByteString());
      t.push(i);
    }
    if (-1 == _) return t;
    for (var s = 0; s < e; ++s) t[s].set("status", getShort());
    return t;
  },
  MSG_L_AGENT_RESULT: function () {
    var t = new UtilMapping();
    t.set("result", getLong());
    t.set("privilege", getShort());
    t.set("ip", getByteString());
    t.set("port", getShort());
    t.set("seed", getLong());
    t.set("msg", getByteString());
    return t;
  },
  MSG_EXISTED_CHAR_LIST: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      R(i);
      t.push(i);
    }
    return t;
  },
  MSG_ENTER_GAME: function () {
    var t = new UtilMapping();
    t.set("flag", getShort());
    t.set("dist", getByteString());
    t.set("server_name", getByteString());
    t.set("server_time", getByteString());
    t.set("server_time_offset", getLong());
    t.set("server_time_zone", getLong());
    t.set("dist_no", getLong());
    t.set("is_level_dist", getByte());
    return t;
  },
  MSG_DIALOG_OK: function () {
    var t = new UtilMapping();
    t.set("text", u());
    t.set("active", getShort());
    t.set("channel", getShort());
    return t;
  },
  MSG_UPDATE: function (t) {
    return B(t);
  },
  MSG_UPDATE_IMPROVEMENT: function (t) {
    return b(t);
  },
  MSG_SET_CURRENT_PET: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("pet_status", getShort());
    return t;
  },
  MSG_SET_OWNER: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("owner_id", getLong());
    return t;
  },
  MSG_UPDATE_PETS: function (t) {
    return G(t);
  },
  MSG_UPDATE_PET_INFO: function (t) {
    return U(t);
  },
  MSG_INVENTORY: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping(),
        s = new UtilMapping(),
        r = getLong();
      i.set("pos", r);
      s.set("pos", r);
      m(i, s);
      t.push(i);
    }
    return t;
  },
  MSG_UPDATE_INV_AMOUNT: function () {
    var t = new UtilMapping();
    t.set("pos", getLong());
    t.set("amount", getShort());
    return t;
  },
  MSG_CONTAINER_INVALID_RANGE: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("start_pos", getShort());
      i.set("range", getShort());
      i.set("type", getByteString());
      t.push(i);
    }
    return t;
  },
  MSG_INVENTORY_ITEM: function () {
    var t = new UtilMapping(),
      e = new UtilMapping(),
      n = getLong();
    t.set("pos", n);
    e.set("pos", n);
    m(t, e);
    return t;
  },
  MSG_UPDATE_SKILLS: function (t) {
    return x(t);
  },
  MSG_FINISH_SORT_PACK: function () {
    var t = new UtilMapping();
    t.set("start_range", getByte());
    return t;
  },
  MSG_PROMPT_BEFORE_LEAVE: function () {
    var t = [],
      e = getShort();
    if (e <= 0) return t;
    for (var n = 0; n < e; n++) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("name", getByteString());
      i.set("total_times", getShort());
      i.set("times", getShort());
      i.set("path", getByteString());
      i.set("start_time", getLong());
      i.set("end_time", getLong());
      i.set("gray", getByte());
      i.set("vitality", getShort());
      i.set("max_vitality", getShort());
      i.set("sd_left_point", getByteString());
      i.set("bounty_num", getLong());
      i.set("bounty_type", getByte());
      i.set("bounty_got", getByte());
      t.push(i);
    }
    e = getShort();
    var s = new UtilMapping();
    s.set("week_recommend_count", e);
    for (var r = 0; r < e; r++) s.set("name" + r, getByteString());
    t.push(s);
    return t;
  },
  MSG_TASK_PROMPT: function () {
    var t = [],
      e = getShort();
    if (e <= 0) return t;
    for (var n = 0; n < e; n++) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("task_type", getByteString());
      i.set("task_desc", u());
      i.set("task_prompt", u());
      i.set("task_tip", u());
      i.set("task_state", u());
      i.set("refresh", getShort());
      i.set("common_type", getByte());
      i.set("owner_type", getByte());
      i.set("need_show_tip", getByte());
      i.set("difficulty", getByte());
      i.set("suggest_team", getByteString());
      i.set("suggest_level", getByteString());
      i.set("task_reward", u());
      i.set("task_class", getByteString());
      i.set("task_prop", getLong());
      i.set("syn_msg", !1);
      t.push(i);
    }
    return t;
  },
  MSG_TIME_LUCK_INFO: function () {
    var t = new UtilMapping(),
      e = getByte();
    t.set("task_count", e);
    for (var n = 0; n < e; ++n) {
      t.set("task_no_" + n, getByte());
      t.set("task_name_" + n, getByteString());
      t.set("task_path_" + n, getByteString());
      t.set("task_tip_" + n, getByteString());
      t.set("task_finish_times_" + n, getByte());
      t.set("task_max_times_" + n, getByte());
      t.set("flag_" + n, getLong());
    }
    t.set("task_pet_name", getByteString());
    t.set("task_pet_desc", getByteString());
    t.set("task_pet_get", getByte());
    t.set("task_polar_name", getByteString());
    t.set("task_polar_desc", getByteString());
    t.set("task_polar_get", getByte());
    return t;
  },
  MSG_COMPACT_TIME_LUCK_INFO: function () {
    var t = new UtilMapping();
    t.set("shi_chen", getByteString());
    t.set("next_shi_chen_time", getLong());
    t.set("luck", getByteString());
    return t;
  },
  MSG_SERVICE_LOG: function () {
    var t = new UtilMapping();
    t.set("service_name", getByteString());
    t.set("desc", getByteString());
    t.set("log", u());
    t.set("task_state", u());
    t.set("refresh", getShort());
    t.set("difficulty", getByte());
    t.set("suggest_team", getByteString());
    t.set("suggest_level", getByteString());
    t.set("task_reward", u());
    t.set("task_class", getByteString());
    t.set("task_prop", getLong());
    return t;
  },
  MSG_C_START_COMBAT: function () {
    var t = new UtilMapping();
    t.set("flag", getShort());
    t.set("combat_type", getLong());
    t.set("combat_mode", getLong());
    t.set("fight_back_no", getLong());
    t.set("play_ani", getByte());
    t.set("is_pvp", getByte());
    t.set("question", getLong());
    return t;
  },
  MSG_C_END_COMBAT: function () {
    var t = new UtilMapping();
    t.set("flag", getShort());
    t.set("fight_type", 1);
    return t;
  },
  MSG_LC_START_LOOKON: function () {
    var t = new UtilMapping();
    t.set("flag", getByte());
    t.set("name", getByteString());
    t.set("fight_back_no", getLong());
    t.set("lookon_type", getByte());
    t.set("combat_type", getLong());
    t.set("is_pvp", getByte());
    t.set("friend_leader_pos", getByte());
    t.set("opponent_leader_pos", getByte());
    return t;
  },
  MSG_LC_INIT_STATUS: function () {
    var t = [],
      e = getByte();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("id", getLong());
      var s = getShort();
      if (-1 == _ || s <= 0) return t;
      for (var r = [], a = 1; a <= s; ++a) r.push(getLong());
      i.set("status", r);
      i.set("die", getShort());
      t.push(i);
    }
    return t;
  },
  MSG_LC_COMMAND_ACCEPTED: function () {
    var t = new UtilMapping();
    t.set("result", getByte());
    return t;
  },
  MSG_LC_END_LOOKON: function () {
    var t = new UtilMapping();
    t.set("fight_type", 2);
    t.set("clear_allact", getByte());
    return t;
  },
  MSG_C_FRIENDS: function () {
    return k();
  },
  MSG_LC_FRIENDS: function () {
    return k();
  },
  MSG_C_OPPONENTS: function () {
    return k();
  },
  MSG_LC_OPPONENTS: function () {
    return k();
  },
  MSG_C_WAIT_COMMAND: function () {
    var t = new UtilMapping();
    t.set("menu", getShort());
    t.set("id", getLong());
    t.set("time", getShort());
    t.set("question", getLong());
    t.set("cur_round", getShort());
    return t;
  },
  MSG_LC_WAIT_COMMAND: function () {
    var t = new UtilMapping();
    t.set("menu", getShort());
    t.set("id", getLong());
    t.set("time", getShort());
    t.set("cur_round", getShort());
    t.set("can_oper", getByte());
    return t;
  },
  MSG_C_ACCEPTED_COMMAND: function () {
    var t = new UtilMapping();
    t.set("me_accepted", getByte());
    t.set("pet_accepted", getByte());
    return t;
  },
  MSG_C_LEAVE_AT_ONCE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_LC_LEAVE_AT_ONCE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_C_COMMAND_ACCEPTED: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("result", getShort());
    return t;
  },
  MSG_C_REFRESH_PET_LIST: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("id", getLong());
      t.push(i);
    }
    return t;
  },
  MSG_C_REFRESH_CHILD_LIST: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("id", getLong());
      t.push(i);
    }
    return t;
  },
  MSG_C_SANDGLASS: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("show", getShort());
    return t;
  },
  MSG_LC_SANDGLASS: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("show", getShort());
    return t;
  },
  MSG_C_CHAR_OFFLINE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("offline", getShort());
    return t;
  },
  MSG_LC_CHAR_OFFLINE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("offline", getShort());
    return t;
  },
  MSG_GODBOOK_EFFECT_NORMAL: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("effect_no", getShort());
    return t;
  },
  MSG_GRAY_COMBAT_MENU: function () {
    var t = new UtilMapping();
    t.set("char_gray_item", getShort());
    t.set("pet_gray_item", getShort());
    return t;
  },
  MSG_C_DIRECT_UPDATE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    R(t);
    return t;
  },
  MSG_C_DIRECT_OPPONENT_INFO: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("id", getLong());
      R(i);
      t.push(i);
    }
    return t;
  },
  MSG_SKILL_FROZEN_LIST: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    var e = getByte();
    if (-1 == _ || e <= 0) return t;
    for (var n = [], i = 1; i <= e; ++i) n.push(getLong());
    t.set("skill_no", n);
    return t;
  },
  MSG_C_ACTION: function () {
    return Y();
  },
  MSG_LC_ACTION: function () {
    return Y();
  },
  MSG_C_ACCEPT_HIT: function () {
    return q();
  },
  MSG_LC_ACCEPT_HIT: function () {
    return q();
  },
  MSG_C_FLEE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("success", getByte());
    return t;
  },
  MSG_LC_FLEE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("success", getByte());
    return t;
  },
  MSG_C_LIFE_DELTA: function () {
    return H();
  },
  MSG_LC_LIFE_DELTA: function () {
    return H();
  },
  MSG_C_MANA_DELTA: function () {
    return H();
  },
  MSG_LC_MANA_DELTA: function () {
    return H();
  },
  MSG_C_ANGER_DELTA: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("anger_delta", getLong());
    return t;
  },
  MSG_C_CHAR_DIED: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("shake_back", getByte());
    return t;
  },
  MSG_LC_CHAR_DIED: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_C_CHAR_REVIVE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_LC_CHAR_REVIVE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_C_CATCH_PET: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("monster_id", getLong());
    t.set("success", getByte());
    return t;
  },
  MSG_LC_CATCH_PET: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("monster_id", getLong());
    t.set("success", getByte());
    return t;
  },
  MSG_C_ROUND_ANIMATE_TIME: function () {
    var t = new UtilMapping();
    t.set("time", getLong());
    return t;
  },
  MSG_GODBOOK_EFFECT_SUMMON: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("effect_no", getShort());
    return t;
  },
  MSG_ATTACH_SKILL_LIGHT_EFFECT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("effect_no", getShort());
    t.set("type", getLong());
    t.set("skill_name", getByteString());
    if (-1 == _) return t;
    t.set("icon", getLong());
    return t;
  },
  MSG_C_CHILD_EFFECT: function () {
    var t = new UtilMapping();
    t.set("owner_id", getLong());
    t.set("id", getLong());
    t.set("show_icon", getLong());
    t.set("effect_no", getLong());
    t.set("bottom_effect", getLong());
    t.set("top_effect", getLong());
    return t;
  },
  MSG_C_SET_FIGHT_PET: function () {
    var t = new UtilMapping(),
      e = getLong(),
      n = getShort();
    if (e <= 0 || n < 0) return t;
    t.set("id", e);
    t.set("pet_status", n);
    return t;
  },
  MSG_C_SET_CUSTOM_MSG: function () {
    var t = new UtilMapping(),
      e = getLong();
    if (e <= 0) return t;
    t.set("id", e);
    t.set("channel", getShort());
    t.set("show_extra", getShort());
    t.set("server_name", getByteString());
    t.set("msg", getByteString());
    return t;
  },
  MSG_C_ADD_FRIEND: function () {
    var t = k(),
      e = t.length;
    if (!(-1 == _ || null == e || e <= 0)) {
      for (var n = 0; n < e; ++n) t[n].set("actioner_id", getLong());
      return t;
    }
  },
  MSG_LC_ADD_FRIEND: function () {
    var t = k(),
      e = t.length;
    if (!(-1 == _ || null == e || e <= 0)) {
      for (var n = 0; n < e; ++n) t[n].set("actioner_id", getLong());
      return t;
    }
  },
  MSG_C_ADD_OPPONENT: function () {
    var t = k(),
      e = t.length;
    if (!(-1 == _ || null == e || e <= 0)) {
      for (var n = 0; n < e; ++n) t[n].set("actioner_id", getLong());
      return t;
    }
  },
  MSG_LC_ADD_OPPONENT: function () {
    var t = k(),
      e = t.length;
    if (!(-1 == _ || null == e || e <= 0)) {
      for (var n = 0; n < e; ++n) t[n].set("actioner_id", getLong());
      return t;
    }
  },
  MSG_C_QUIT_COMBAT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("owner_id", getLong());
    return t;
  },
  MSG_LC_QUIT_COMBAT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("owner_id", getLong());
    return t;
  },
  MSG_C_UPDATE_STATUS: function () {
    return W();
  },
  MSG_LC_UPDATE_STATUS: function () {
    return W();
  },
  MSG_C_ACCEPT_MAGIC_HIT: function () {
    return V();
  },
  MSG_LC_ACCEPT_MAGIC_HIT: function () {
    return V();
  },
  MSG_C_UPDATE_IMPROVEMENT: function () {
    return X();
  },
  MSG_LC_UPDATE_IMPROVEMENT: function () {
    return X();
  },
  MSG_C_MENU_SELECTED: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("menu_item", getByteString());
    return t;
  },
  MSG_LC_MENU_SELECTED: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("menu_item", getByteString());
    return t;
  },
  MSG_C_DELAY: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("delay_time", getLong());
    return t;
  },
  MSG_LC_DELAY: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("delay_time", getLong());
    return t;
  },
  MSG_C_LIGHT_EFFECT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("no", getLong());
    t.set("owner_id", getLong());
    t.set("drag", getByte());
    return t;
  },
  MSG_LC_LIGHT_EFFECT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("no", getLong());
    t.set("owner_id", getLong());
    return t;
  },
  MSG_C_UPDATE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    R(t);
    return t;
  },
  MSG_LC_UPDATE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    R(t);
    return t;
  },
  MSG_C_WAIT_ALL_END: function () {
    return new UtilMapping();
  },
  MSG_LC_WAIT_ALL_END: function () {
    return new UtilMapping();
  },
  MSG_C_START_SEQUENCE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("para", getLong());
    return t;
  },
  MSG_C_OPPONENT_INFO: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("id", getLong());
      R(i);
      t.push(i);
    }
    return t;
  },
  MSG_C_DIALOG_OK: function () {
    var t = new UtilMapping();
    t.set("msg", getByteString());
    return t;
  },
  MSG_C_MESSAGE: function () {
    var t = new UtilMapping();
    t.set("channel", getShort());
    t.set("name", getByteString());
    t.set("msg", getByteString());
    return t;
  },
  MSG_SYNC_MESSAGE: function () {
    var t = new UtilMapping();
    t.set(
      "data",
      a.buffer.slice(a.byteOffset + _, a.byteOffset + a.byteLength)
    );
    return t;
  },
  MSG_SEQ_MESSAGE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set(
      "data",
      a.buffer.slice(a.byteOffset + _, a.byteOffset + a.byteLength)
    );
    return t;
  },
  MSG_C_END_ACTION: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_LC_END_ACTION: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_C_ACCEPT_MULTI_HIT: function () {
    return K();
  },
  MSG_LC_ACCEPT_MULTI_HIT: function () {
    return K();
  },
  MSG_C_ADD_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("child_id", getLong());
    t.set("child_icon", getLong());
    return t;
  },
  MSG_LC_ADD_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("child_id", getLong());
    t.set("child_icon", getLong());
    return t;
  },
  MSG_C_GENERAL_NOTIFY: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("type", getShort());
    t.set("para", getByteString());
    return t;
  },
  MSG_C_UPDATE_IMPROVEMENT_EX: function () {
    var t = [],
      e = getByte(),
      n = getByte(),
      i = getShort();
    if (null == i || i <= 0) return t;
    for (var s = 0; s < i; ++s) {
      var r = new UtilMapping();
      r.set("seq", e);
      r.set("partial_update", n);
      r.set("id", getLong());
      R(r);
      t.push(r);
    }
    return t;
  },
  MSG_C_PET_ANGER_DELTA: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("anger_delta", getLong());
    t.set("cur_anger", getLong());
    return t;
  },
  MSG_C_CALLBACK_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("child_id", getLong());
    return t;
  },
  MSG_LC_CALLBACK_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("child_id", getLong());
    return t;
  },
  MSG_C_STATUS_IMPROVEMENT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("status", getShort());
    R(t);
    return t;
  },
  MSG_C_UPDATE_BACKGROUND: function () {
    var t = new UtilMapping();
    t.set("no", getLong());
    return t;
  },
  MSG_C_UPDATE_BACKGROUND_EX: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("no", getLong());
    return t;
  },
  MSG_C_UPDATE_STATUS_INFO: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    var e = getShort();
    if (null == e || e <= 0) return t;
    for (var n = 0; n < e; ++n) t.set(getShort(), getShort());
    return t;
  },
  MSG_C_ANIMATE_ACCELERATE: function () {
    var t = new UtilMapping();
    t.set("accelerate", getByte());
    return t;
  },
  MSG_C_BATCH_COMBAT_EFFECT: function () {
    var t = new UtilMapping();
    t.set("name", getByteString());
    t.set("ids", getByteString());
    return t;
  },
  MSG_C_CAST_MAICAL_SKILL: function () {
    var t = new UtilMapping();
    t.set("skill_no", getLong());
    t.set("id", getLong());
    t.set("st_nian_tou", getByteString());
    t.set("color", getByteString());
    t.set("para_x", getLong());
    return t;
  },
  MSG_C_REMOVE_MAICAL_SKILL: function () {
    var t = new UtilMapping();
    t.set("skill_no", getLong());
    return t;
  },
  MSG_C_TAIJI_MINGYU_STATUS: function () {
    var t = new UtilMapping();
    t.set("left_times", getShort());
    return t;
  },
  MSG_C_DELAY_MULTI_ATTACK: function () {
    var t = new UtilMapping();
    t.set("skill_no", getLong());
    var e = getShort();
    if (null == e || e <= 0) return t;
    for (var n = 0; n < e; ++n) {
      t.set("id" + n, getLong());
      t.set("hit" + n, getByte());
    }
    return t;
  },
  MSG_C_CAST_UNOWNED_SKILL: function () {
    var t = new UtilMapping();
    t.set("index", getShort());
    var e = getShort();
    if (null == e || e <= 0) return t;
    for (var n = 0; n < e; ++n) t.set("id" + n, getLong());
    return t;
  },
  MSG_C_APPLY_ITEM: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("victim_id", getLong());
    t.set("name", getByteString());
    return t;
  },
  MSG_C_MENU_LIST: function () {
    var t = new UtilMapping();
    M(t);
    return t;
  },
  MSG_C_MENU_LIST_EX: function () {
    var t = new UtilMapping();
    M(t);
    return t;
  },
  MSG_LC_MENU_LIST: function () {
    var t = new UtilMapping();
    M(t);
    return t;
  },
  MSG_MENU_LIST: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("portrait", getLong());
    t.set("spine_brow", getByteString());
    t.set("pic_no", getShort());
    t.set("content", u());
    t.set("secret_key", getByteString());
    t.set("setting", getShort());
    t.set("ignore_distance", getByte());
    t.set("name", getByteString());
    t.set("menu_id", getLong());
    t.set("atass_use", getByte());
    t.set("server_question", getLong());
    return t;
  },
  MSG_MENU_CLOSED: function () {
    return new UtilMapping();
  },
  MSG_GENERAL_NOTIFY: function () {
    var t = new UtilMapping();
    t.set("notify", getShort());
    t.set("para", getByteString());
    return t;
  },
  MSG_ENTER_ROOM: function () {
    var t = new UtilMapping();
    t.set("map_id", getLong());
    t.set("source_id", getLong());
    t.set("map_name", getByteString());
    t.set("x", getShort());
    t.set("y", getShort());
    t.set("dir", getShort());
    t.set("compact_map_index", getShort());
    t.set("npc_guide_index", getShort());
    t.set("map_index", getLong());
    t.set("map_alias", getByteString());
    t.set("map_music", getByteString());
    return t;
  },
  MSG_OPEN_MENU: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_UPDATE_WITHOUT_LEAVE_TEMP_TEAM_LIST: function () {
    var t = [],
      e = getShort();
    if (e <= 0) return [new UtilMapping()];
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("id", getLong());
      R(i);
      t.push(i);
    }
    return t;
  },
  MSG_UPDATE_LEAVE_TEMP_TEAM_LIST: function () {
    var t = [],
      e = getByte(),
      n = getByte(),
      i = getShort();
    if (i <= 0) return [new UtilMapping()];
    for (var s = 0; s < i; ++s) {
      var r = new UtilMapping();
      r.set("count", i);
      r.set("zhengx", e);
      r.set("zhengx_valid", n);
      j(r);
      t.push(r);
    }
    return t;
  },
  MSG_UPDATE_TEAM_LIST: function () {
    return this.MSG_UPDATE_LEAVE_TEMP_TEAM_LIST();
  },
  MSG_UPDATE_TEAM_BY_SINGLE: function () {
    var t = new UtilMapping();
    j(t);
    return t;
  },
  MSG_TEAM_REQUEST_TASK: function () {
    for (var t = [], e = getShort(), n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("name", getByteString());
      i.set("total_times", getShort());
      i.set("times", getShort());
      t.push(i);
    }
    if (!gfIsJdDist()) {
      e = getShort();
      for (var s = 0; s < e; ++s) {
        var r = new UtilMapping();
        r.set("festival_activity", 1);
        r.set("name", getByteString());
        var _ = getByteString();
        r.set("date", _);
        r.set("test_date", _);
        t.push(r);
      }
    }
    return t;
  },
  MSG_FRIEND_UPDATE_LISTS: function () {
    var t = [],
      e = getShort();
    if (e <= 1) return t;
    for (var n = 0; n < e; ++n) {
      for (var i = [], s = getByteString(), r = getShort(), _ = 0; _ < r; ++_) {
        var a = new UtilMapping();
        a.set("group_count", e);
        a.set("group", s);
        a.set("char_count", r);
        a.set("char", getByteString());
        L(a);
        R(a);
        a.haveKey("online") || a.set("online", 0);
        i.push(a);
      }
      t.push(i);
    }
    return t;
  },
  MSG_FRIEND_ADD_CHAR: function () {
    var t = [],
      e = getShort();
    if (e <= 0) return [new UtilMapping()];
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("group", getByteString());
      i.set("char", getByteString());
      R(i);
      i.haveKey("online") || i.set("online", 0);
      f(i);
      S(i);
      L(i);
      t.push(i);
    }
    return t;
  },
  MSG_FRIEND_REMOVE_CHAR: function () {
    var t = [],
      e = getShort();
    if (e <= 0) return [new UtilMapping()];
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("group", getByteString());
      i.set("char", getByteString());
      t.push(i);
    }
    return t;
  },
  MSG_FRIEND_NOTIFICATION: function () {
    var t = new UtilMapping();
    t.set("char", getByteString());
    t.set("server_name", getByteString());
    t.set("para", getShort());
    -1 != _ && o() > 0 && t.set("user_state", getByte());
    -1 != _ && o() > 0 && t.set("insider", getByte());
    return t;
  },
  MSG_FRIEND_UPDATE_PARTIAL: function () {
    var t = new UtilMapping();
    getShort();
    t.set("group", getByteString());
    t.set("char", getByteString());
    R(t);
    return t;
  },
  MSG_UPDATE_FRIEND_LIST_EX: function () {
    var t = [],
      e = getShort();
    if (e < 1) return [new UtilMapping()];
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("count", e);
      i.set("char", getByteString());
      i.set("group", getByteString());
      R(i);
      t.push(i);
    }
    return t;
  },
  MSG_REMOVE_ALL_BLACK_FRIENDS: function () {
    return new UtilMapping();
  },
  MSG_UPDATE_FRIEND_STATUS: function () {
    var t = new UtilMapping(),
      e = getShort();
    t.set("count", e);
    for (var n = 0; n < e; ++n) {
      t.set("name" + String(n), getByteString());
      t.set("server" + String(n), getByteString());
    }
    return t;
  },
  MSG_MESSAGE: function () {
    var t = new UtilMapping();
    t.set("channel", getShort());
    t.set("id", getLong());
    t.set("name", getByteString());
    t.set("msg", getByteString());
    t.set("time", getByteString());
    t.set("privilege", getShort());
    t.set("server_name", getByteString());
    o() >= 2 && t.set("show_extra", getShort());
    t.set("need_parse_server_res", 1);
    return t;
  },
  MSG_MESSAGE_EX: function () {
    var t = new UtilMapping(),
      e = getShort();
    t.set("channel", e);
    t.set("id", getLong());
    t.set("name", getByteString());
    t.set("msg", u());
    t.set("time", getByteString());
    t.set("privilege", getShort());
    t.set("server_name", getByteString());
    t.set("show_extra", getShort());
    t.set("compress", getShort());
    t.set("orgLength", getShort());
    if (o()) {
      CHANNEL_GROUP == e ? t.set("group_id", getByteString()) : t.set("recieve_name", getByteString());
      v(t);
      if (t.queryInt("item_info_count")) {
        var n = Math.floor(1e3 * Math.random())
            .toString()
            .padStart(5, "0"),
          i = new Date().toString().split(" "),
          s = cc.js.formatStr(
            "%s %s %s %s %s\n%s",
            i[0],
            i[1],
            i[2],
            i[4],
            i[3],
            n
          );
        t.set("item_cookie_1", s);
      }
      if (o()) {
        for (var r = getShort(), _ = 1; _ <= r; _++) {
          var a = "item_cookie_" + _;
          t.set(a, getByteString());
        }
        t.set("item_cookie_count", r);
        if (o()) {
          o() > 0 && t.set("msg_type", getShort());
          o() > 0 && t.set("level", getShort());
          o() > 0 && t.set("cycle_times", getShort());
          o() > 0 && t.set("cycle_interval", getShort());
          o() > 0 && t.set("is_year_insider", getShort());
          o() > 0 && t.set("insider", getShort());
          o() > 0 && t.set("city", getByteString());
          o() > 0 && t.set("sys_type", getShort());
          o() > 0 && t.set("bonus_idx", getByteString());
          o() > 0 && t.set("sys_start_time", getLong());
          o() > 0 && t.set("birth", getShort());
          o() > 0 && t.set("dailian", getShort());
          o() > 0 && t.set("is_newhand_instructor", getShort());
          o() > 0 && t.set("horn_color_type", getByte());
          o() > 0 && t.set("msg_id", getByteString());
          o() > 0 && t.set("doufa", getLong());
          o() > 0 && t.set("msg_source", getShort());
          gfIsJdDist() || (o() > 0 && t.set("msg_title", getByteString()));
          o() > 0 && t.set("need_parse_server_res", getByte());
          if (!gfIsJdDist()) {
            o() > 0 && t.set("source_dist", getByteString());
            o() > 0 && t.set("msg_dist", getByteString());
          }
          return t;
        }
      }
    }
  },
  MSG_LONG_MESSAGE: function () {
    var t = new UtilMapping();
    t.set("channel", getShort());
    t.set("name", getByteString());
    t.set("msg", u());
    t.set("time", getByteString());
    t.set("privilege", getShort());
    t.set("server_name", getByteString());
    o() >= 2 && t.set("show_extra", getShort());
    return t;
  },
  MSG_TITLE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    var e = getShort();
    t.set("count", e);
    for (var n = 1; n <= e; ++n) t.set(String(n), getByteString());
    return t;
  },
  MSG_DIALOG: function () {
    var t = [],
      e = getByteString(),
      n = getByteString(),
      i = getByteString(),
      s = getByteString(),
      r = getShort();
    if (r <= 0) return [new UtilMapping()];
    for (var a = 0; a < r; ++a) {
      var I = new UtilMapping();
      I.set("count", r);
      I.set("caption", e);
      I.set("content", n);
      I.set("peer_name", i);
      I.set("ask_type", s);
      R(I);
      "request_join" == s && I.set("id", getLong());
      I.set("tip", getByteString());
      t.push(I);
    }
    var h = 0;
    -1 != _ && o() > 0 && (h = getByte());
    for (var u = t.length, T = 0; T < u; ++T) t[T].set("flag", h);
    return t;
  },
  MSG_CLEAN_REQUEST: function () {
    var t = [],
      e = getByteString(),
      n = getShort();
    if (n <= 0) {
      var i = new UtilMapping();
      i.set("ask_type", e);
      t.push(i);
      return t;
    }
    for (var s = 0; s < n; ++s) {
      var r = new UtilMapping();
      r.set("ask_type", e);
      r.set("name", getByteString());
      t.push(r);
    }
    return t;
  },
  MSG_SET_SETTING: function () {
    for (var t = new UtilMapping(), e = getShort(), n = [], i = 0; i < e; ++i)
      n.push({
        setting: getByteString(),
        value: getShort(),
      });
    t.set("size", e);
    t.set("setting_list", n);
    return t;
  },
  MSG_TELEPORT_EX: function () {
    var t = new UtilMapping();
    t.set("type", getShort());
    t.set("tip", getByteString());
    t.set("gid", getByteString());
    return t;
  },
  MSG_BUTTON_DOUBLE_BONUS: function () {
    var t = new UtilMapping();
    t.set("hours", getShort());
    t.set("global_hours", getShort());
    t.set("six_rate_hour", getShort());
    return t;
  },
  MSG_OPEN_CONFIRM_DLG: function () {
    var t = new UtilMapping();
    t.set("type", getByte());
    t.set("modal", getByte());
    t.set("usage", getByte());
    t.set("content", u());
    t.set("para", getShort());
    t.set("para_string", getByteString());
    return t;
  },
  MSG_COMBAT_CAPACITY_RATE: function () {
    var t = new UtilMapping(),
      e = getByte();
    t.set("type", e);
    switch (e) {
      case CAPACITY_RATE_PLAYER:
        t.set("zb_zl", getByteString());
        t.set("ss_zl", getByteString());
        t.set("fb_zl", getByteString());
        t.set("wd_zl", getByteString());
        t.set("ylf_zl", getByteString());
        t.set("zx_zl", getByteString());
        t.set("xq_zl", getByteString());
        t.set("daowen_zl", getByteString());
        break;

      case CAPACITY_RATE_PET:
        t.set("id", getLong());
        t.set("zcz_zl", getByteString());
        t.set("ts_zl", getByteString());
        t.set("xf_zl", getByteString());
        t.set("qmd_zl", getByteString());
    }
    return t;
  },
  MSG_RUYI_RECOVER: function () {
    var t = new UtilMapping();
    t.set("me_life", getLong());
    t.set("me_max_life", getLong());
    t.set("me_mana", getLong());
    t.set("me_max_mana", getLong());
    t.set("pet_life", getLong());
    t.set("pet_max_life", getLong());
    t.set("pet_mana", getLong());
    t.set("pet_max_mana", getLong());
    return t;
  },
  MSG_REQUEST_SERVER_STATUS: function () {
    var t = [],
      e = getShort();
    if (-1 == _ || e <= 0) return t;
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("ip", getByteString());
      i.set("server", getByteString());
      i.set("status", getShort());
      t.push(i);
    }
    return t;
  },
  MSG_SWITCH_SERVER: function () {
    var t = new UtilMapping();
    t.set("result", getShort());
    t.set("msg", getByteString());
    return t;
  },
  MSG_SWITCH_SERVER_EX: function () {
    var t = new UtilMapping();
    t.set("result", getShort());
    t.set("msg", getByteString());
    t.set("server_name", getByteString());
    return t;
  },
  MSG_REFRESH_PET_GODBOOK_SKILLS: function () {
    var t = new UtilMapping(),
      e = getLong();
    if (0 >= e) return t;
    var n = getLong();
    if (!(0 >= n)) {
      t.set("owner_id", e);
      t.set("pet_id", n);
      t.set("god_book_skill_count", getShort());
      O(t, TRUE);
      return t;
    }
  },
  MSG_SET_PET_SETTING: function () {
    var t = new UtilMapping();
    t.set("no", getByte());
    for (var e = getShort(), n = 0; n < e; ++n) t.set(getByteString(), getByteString());
    return t;
  },
  MSG_PET_XINFA_EXP_CARD: function () {
    var t = new UtilMapping();
    t.set("is_buy", getByte());
    t.set("left_time", getByte());
    t.set("is_reward", getByte());
    return t;
  },
  MSG_AUTH_VIP_SMS: function () {
    var t = new UtilMapping(),
      e = getByte();
    t.set("oper_type", e);
    1 == e && t.set("key", getByteString());
    return t;
  },
  MSG_OPEN_AUTH_ALL_PROTECT: function () {
    var t = new UtilMapping();
    t.set("seq_no", getLong());
    t.set("args", u());
    t.set("main_lock", getByte());
    return t;
  },
  MSG_PASSWORD_DLG: function () {
    var t = new UtilMapping();
    t.set("content", getByteString());
    t.set("secret_key", getByteString());
    return t;
  },
  MSG_GUARDS_REFRESH: function (t) {
    for (var e = [], n = getLong(), i = 0; i < n; ++i) {
      var s = new UtilMapping();
      s.set("id", getLong());
      p(s);
      J(s);
      s.set("syn_msg", t ? TRUE : FALSE);
      e.push(s);
    }
    return e;
  },
  MSG_GUARDS_DROP: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_GUARDS_VISIBLE: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_SET_CURRENT_MOUNT: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_OPEN_MOUNT_INBORN_SKILLS: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    for (var e = [], n = getByte(), i = 0; i < n; ++i) {
      var s = new UtilMapping();
      A(s);
      e.push(s);
    }
    t.set("inborn_skill", e);
    return t;
  },
  MSG_UPDATE_CHILDREN: function () {
    for (var t = [], e = getShort(), n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("no", getByte());
      i.set("id", getLong());
      p(i);
      t.push(i);
    }
    return t;
  },
  MSG_UPDATE_CHILD_ATTRIB: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    R(t);
    return t;
  },
  MSG_SET_VISIBLE_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    return t;
  },
  MSG_SET_CURRENT_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("in_combat", getShort());
    return t;
  },
  MSG_SET_OWNER_CHILD: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("owner_id", getLong());
    t.set("no", getByte());
    return t;
  },
  MSG_CHILD_INVENTORY: function () {
    var t = new UtilMapping(),
      e = getLong();
    t.set("child_id", e);
    var n = getShort();
    if (-1 == _ || n <= 0) return t;
    for (var i = [], s = 1; s <= n; ++s) {
      var r = new UtilMapping(),
        a = new UtilMapping(),
        o = getByte();
      r.set("pos", o);
      r.set("child_id", e);
      a.set("pos", o);
      m(r, a);
      i.push(r);
    }
    t.set("inv", i);
    return t;
  },
  MSG_MAKEUP_INFO: function () {
    var t = new UtilMapping();
    t.set("icon", getLong());
    t.set("dress_label", getLong());
    return t;
  },
  MSG_STORE: function () {
    var t = [],
      e = getLong(),
      n = getShort(),
      i = getShort(),
      s = getByte(),
      r = getShort();
    if (r <= 0) {
      new UtilMapping().set("end", 1);
      return t;
    }
    for (var _ = 0; _ < r; ++_) {
      var a = new UtilMapping(),
        o = new UtilMapping(),
        I = getShort();
      a.set("end", _ == r - 1);
      a.set("id", e);
      a.set("count", r);
      a.set("pos", I);
      a.set("start_pos", n);
      a.set("store_size", i);
      a.set("limit_index", s);
      o.set("id", e);
      o.set("pos", I);
      m(a, o);
      t.push(a);
    }
    return t;
  },
  MSG_STORE_BOXES: function () {
    var t = new UtilMapping();
    t.set("box_dlg_type", getByte());
    var e = getByte();
    t.set("count", e);
    for (var n = 0; n < e; n++) {
      t.set("name_" + n, getByteString());
      t.set("time_" + n, getLong());
    }
    return t;
  },
  MSG_CLOSE_STORE: function () {
    return new UtilMapping();
  },
  MSG_PET_STORE: function () {
    var t = new UtilMapping(),
      e = getLong();
    t.set("npc_id", e);
    for (var n = [], i = getByte(), s = 0; s < i; ++s) {
      var r = new UtilMapping(),
        _ = getShort();
      p(r);
      y(r);
      r.set("no", _);
      r.set("npc_id", e);
      w(r);
      n.push(r);
    }
    for (var a = 0; a < i; ++a) P(n[a]);
    t.set("pets", n);
    return t;
  },
  MSG_KIND_GOODS_LIST: function () {
    for (var t = [], e = getShort(), n = getShort(), i = 0; i < e; ++i)
      for (
        var s = getShort(), r = getLong(), _ = getShort(), a = getShort(), o = getShort(), c = getShort(), I = 0;
        I < c;
        ++I
      ) {
        var h = new UtilMapping(),
          d = new UtilMapping();
        h.set("page_index", n);
        h.set("store_type", s);
        h.set("count", c);
        h.set("id", r);
        h.set("buy_rate", _);
        h.set("sell_rate", a);
        h.set("repair", o);
        var u = getShort();
        h.set("no", u);
        h.set("cost_type", getLong());
        h.set("supply_num", getShort());
        d.set("no", u);
        m(h, d);
        t.push(h);
      }
    return t;
  },
  MSG_SELL_PET_LIST: function () {
    for (
      var t = [], e = gfIsJdDist(), n = getByte(), i = getLong(), s = getShort(), r = 0;
      r < s;
      ++r
    ) {
      var _ = new UtilMapping();
      _.set("open_dlg", n);
      _.set("id", i);
      _.set("pos", getShort());
      _.set("pet_name", getByteString());
      _.set("pet_cash", getLong());
      _.set("pet_rank", getShort());
      _.set("pet_req_level", getShort());
      _.set("pet_level", getShort());
      e || _.set("tongyuan_label", getShort());
      t.push(_);
    }
    return t;
  },
  MSG_CLOSE_KIND_STORE: function () {
    return new UtilMapping();
  },
  MSG_TASK_SCORE_EXCHANGE_LIST: function () {
    var t = new UtilMapping(),
      e = getByte(),
      n = getLong(),
      i = 0,
      s = 0,
      r = 0;
    switch (e) {
      case TYPE_SENLUO_WANXIANG:
      case TYPE_CHILDREN_DAY_2017:
        i = getLong();
        break;

      case TYPE_WANGZHONGWANG:
        s = getShort();
        break;

      case TYPE_TIANYANJUE:
        r = getLong();
        break;

      case TYPE_WANGWEI_ZHENGDUOZHAN:
    }
    var _ = getShort();
    t.set("exchange_type", e);
    t.set("id", n);
    t.set("count", _);
    t.set("score", i);
    t.set("cash_type", s);
    t.set("bonus_end_time", r);
    for (var a = [], o = 1; o <= _; o++) {
      var I = new UtilMapping(),
        h = new UtilMapping();
      I.set("exchange_type", e);
      I.set("id", n);
      I.set("count", _);
      I.set("score", i);
      I.set("cash_type", s);
      I.set("bonus_end_time", r);
      I.set("no", getShort());
      I.set("pos", o);
      I.set("supply_num", getByte());
      I.set("accumulate_score", getLong());
      h.set("no", I.queryInt("no"));
      switch (e) {
        case TYPE_CHRISTMAS_NICE_NUM:
          I.set("name", getByteString());
          I.set("icon", getLong());
          break;

        case TYPE_SIX_ANNIVERSARY:
        case TYPE_SEVEN_YEAR_MALL:
          I.set("bonus_type", getByteString());
          I.set("name", getByteString());
          I.set("limit_month", getByte());
          I.set("sale_start", getByte());
          I.set("sale_end", getByte());
          I.set("show_start", getByte());
          I.set("show_end", getByte());
          if ("item" == I.query("bonus_type")) {
            I.set("gender", getByte());
            m(I, h);
          } else {
            I.set("icon", getLong());
            I.set("type", OBJECT_TYPE_PET);
          }
          break;

        case TYPE_TASK_SCORE:
          I.set("limit_day", getLong());
          m(I, h);
          break;

        case TYPE_MOTHER_DAY_2020:
        case TYPE_YINLUREN_JIFEN:
          I.set("time_limit_day", getLong());
          m(I, h);
          break;

        case TYPE_SUPER_CHANGE:
        case TYPE_WANSHENGJIE:
        case TYPE_WUXIN_QIUQIU:
        case TYPE_ARBOR_DAY_2015:
        case TYPE_WANSHENGJIE_2015:
        case TYPE_CHRISTMAS_DAY_2016:
        case TYPE_WANSHENGJIE_2016:
        case TYPE_XUANMAI_XUNKUANG:
          I.set("coin_type", getByteString());
          I.set("price", getLong());
          m(I, h);
          break;

        case TYPE_WANGWEI_ZHENGDUOZHAN:
          I.set("left_num", getLong());
          I.set("time_limit_day", getLong());
          I.set("quato_refresh_time", getLong());
          m(I, h);
          break;

        case TYPE_WUMAI_ZHENGFENG:
          I.set("time_limit_day", getByte());
          I.set("week_limit_num", getByte());
          I.set("total_quota", getByte());
          m(I, h);
          break;

        default:
          m(I, h);
      }
      a.push(I);
    }
    t.set("items", a);
    return t;
  },
  MSG_REFRESH_TODAY_STAT: function () {
    var t = new UtilMapping();
    t.set("max_level", getByte());
    t.set("me_tao", getLong());
    t.set("exp", getLong());
    t.set("exp_ex", getLong());
    t.set("tao", getLong());
    t.set("tao_ex", getLong());
    t.set("dao_fa", getLong());
    t.set("pot", getLong());
    t.set("total_score", getLong());
    t.set("reputation", getLong());
    t.set("total_fights", getLong());
    t.set("online_time", getLong());
    t.set("dead_times", getLong());
    t.set("glory", getLong());
    t.set("yesterday_activity", getLong());
    t.set("today_activity", getLong());
    t.set("activity_to_next", getLong());
    t.set("gongxun", getLong());
    return t;
  },
  MSG_WUDAO_STAGE_INFO: function () {
    var t = new UtilMapping();
    gfIsJdDist() || t.set("not_open", getByte());
    t.set("stage", getShort());
    t.set("char_stage", getShort());
    t.set("char_rep", getLong());
    t.set("req_level", getLong());
    for (var e = getShort(), n = 0; n < e; ++n) {
      var i = getByteString();
      t.set("enable_" + i, getLong());
      t.set("rep_att_" + i, getLong());
      t.set("rep_" + i, getLong());
      t.set("max_rep_" + i, getLong());
    }
    if (gfIsJdDist()) {
      e = getShort();
      for (var s = 0; s < e; ++s) {
        var r = getByteString();
        t.set("card_status_" + r, getShort());
        t.set("card_left_times_" + r, getByte());
      }
    } else {
      t.set("buy_card_type", getByteString());
      t.set("card_status", getShort());
      t.set("card_left_times", getByte());
    }
    t.set("cur_point_group", getByte());
    t.set("change_times", getLong());
    t.set("extra_attrib_name", getByteString());
    t.set("extra_attrib_value", getLong());
    t.set("extra_attrib_value_next", getLong());
    e = getShort();
    for (var _ = 0; _ < e; ++_) {
      var a = getByteString();
      t.set("Total_stage_attrib_" + a, getLong());
      t.set("ban_attrib_" + a, getByte());
    }
    return t;
  },
  MSG_WUDAO_PRE_ADD_ATTRIB_REP: function () {
    var t = new UtilMapping();
    t.set("power", getLong());
    t.set("speed", getLong());
    t.set("life", getLong());
    t.set("def", getLong());
    return t;
  },
  MSG_QIRI_QIANDAO: function () {
    var t = new UtilMapping();
    if (!gfIsJdDist()) {
      t.set("new_server_start_time", getLong());
      t.set("new_server_end_time", getLong());
      t.set("new_server_signed", getByte());
    }
    t.set("start_time", getLong());
    t.set("get_big_reward", getByte());
    var e = getShort();
    t.set("count", e);
    for (var n = 1; n <= e; n++) {
      t.set("reward_" + n, getByte());
      t.set("signed_" + n, getByte());
    }
    if (gfIsJdDist()) {
      t.set("bonus_state_1", getShort());
      t.set("bonus_state_2", getShort());
      t.set("bonus_state_3", getShort());
      t.set("bonus_state_4", getShort());
      t.set("bonus_state_5", getShort());
      t.set("bonus_state_6", getShort());
    } else {
      t.set("bonus_state_1", getShort());
      t.set("bonus_state_2", getShort());
      t.set("bonus_state_3", getShort());
      t.set("bonus_state_4", getShort());
      t.set("bonus_state_5", getShort());
      t.set("bonus_state_6", getShort());
      t.set("bonus_state_7", getShort());
      t.set("bonus_state_8", getShort());
      t.set("last_pet_id", getLong());
    }
    return t;
  },
  MSG_DAOHANG_FUND_LIST: function () {
    var t = new UtilMapping();
    t.set("start_time", getLong());
    t.set("end_time", getLong());
    var e = getByte();
    t.set("count", e);
    for (var n = 1; n <= e; n++) {
      t.set("type" + n, getByte());
      t.set("data" + n, getLong());
    }
    return t;
  },
  MSG_CHENGZHANG_FUND_LIST: function () {
    var t = new UtilMapping();
    t.set("start_time", getLong());
    t.set("end_time", getLong());
    var e = getByte();
    t.set("count", e);
    for (var n = 1; n <= e; n++) {
      t.set("type" + n, getByte());
      t.set("data" + n, getLong());
      for (var i = getByte(), s = 1; s <= i; s++) {
        var r = getShort();
        t.set("award_times" + n + "_" + r, getShort());
        t.set("get_today_award" + n + "_" + r, getShort());
      }
    }
    return t;
  },
  MSG_MOBILE_WELFARE_CENTER_DLG: function () {
    for (var t = [], e = getShort(), n = 0; n < e; n++) {
      var i = new UtilMapping();
      i.set("type", getShort());
      i.set("status", getByte());
      t.push(i);
    }
    return t;
  },
  MSG_FINGER: function () {
    var t = new UtilMapping();
    R(t);
    return t;
  },
  MSG_GET_FRIEND_VERIFY: function () {
    var t = new UtilMapping();
    t.set("name", getByteString());
    return t;
  },
  MSG_REPLY_FRIEND_VERIFY: function () {
    var t = new UtilMapping();
    t.set("name", getByteString());
    t.set("result", getByte());
    t.set("reply", getByteString());
    return t;
  },
  MSG_REQUEST_FRIEND_VERIFY: function () {
    var t = new UtilMapping();
    t.set("name", getByteString());
    t.set("verify", getByteString());
    t.set("group", getByteString());
    t.set("char", getByteString());
    R(t);
    t.haveKey("online") || t.set("online", 0);
    f(t);
    S(t);
    L(t);
    return t;
  },
  MSG_SKILL_COST_ATTRIB: function () {
    var t = new UtilMapping(),
      e = getShort();
    t.set("cost_type_count", e);
    for (var n = 1; n <= e; ++n) {
      t.set("cost_type_" + n.toString(), getByteString());
      t.set("cost_point_" + n.toString(), getLong());
    }
    return t;
  },
  MSG_SET_PENNANT_SKILL: function () {
    var t = new UtilMapping();
    if (gfIsJdDist()) {
      t.set("count", 1);
      t.set("qishu_skill_0", getShort());
    } else {
      var e = getByte();
      t.set("count", e);
      for (var n = 0; n < e; n++) t.set("qishu_skill_" + n, getShort());
    }
    return t;
  },
  MSG_REFRESH_PENNANT_SKILLS: function () {
    var t = [];
    D(new UtilMapping(), getShort(), t);
    return t;
  },
  MSG_ZHENXING_INFO: function () {
    var t = new UtilMapping(),
      e = getByte();
    t.set("zhengx_count", e);
    for (var n = 0; n < e; ++n) t.set("zhengx_" + n.toString(), getByte());
    t.set("cur_zhengx", getByte());
    return t;
  },
  MSG_OPEN_DIALOG: function () {
    var t = new UtilMapping();
    t.set("name", getByteString());
    t.set("opened", getByte());
    return t;
  },
  MSG_XIAOLV_DIANSHU: function () {
    var t = new UtilMapping();
    t.set("only_refresh", getByte());
    t.set("remainder_free_score", getLong());
    t.set("now_triple_score", getLong());
    t.set("now_ruyi_score", getLong());
    t.set("now_ziqi_score", getLong());
    t.set("now_pet_triple_score", getLong());
    t.set("now_qmsj_score", getLong());
    t.set("now_qmsd_score", getLong());
    if (!gfIsJdDist()) {
      t.set("now_bgsf_score", getLong());
      t.set("now_tdsf_score", getLong());
    }
    t.set("now_mrsj_score", getLong());
    t.set("now_mrsj_max_score", getLong());
    t.set("now_mzsd_score", getLong());
    t.set("now_mzsd_max_score", getLong());
    t.set("triple_switch", getByte());
    t.set("ruyi_switch", getByte());
    t.set("ziqi_switch", getByte());
    t.set("pet_triple_switch", getByte());
    if (!gfIsJdDist()) {
      t.set("global_hours", getShort());
      t.set("six_rate_hour", getShort());
      t.set("open_six_rate_hours", getByteString());
      t.set("open_global_hours", getByteString());
      t.set("global_forzen_time", getByteString());
    }
    return t;
  },
  MSG_PROMPT_JD_BOX: function () {
    var t = new UtilMapping();
    t.set("free_open_number", getLong());
    t.set("zhuli_vip_end_time", getLong());
    for (var e = getShort(), n = [], i = 0; i < e; ++i) {
      var s = new UtilMapping();
      s.set("name", getByteString());
      s.set("box_max_times", getByte());
      s.set("box_normal_times", getByte());
      s.set("box_insider_times", getByte());
      s.set("box_fairy_times", getByte());
      s.set("cur_times_to_open_box", getByte());
      s.set("total_times_to_open_box", getByte());
      n.push(s);
    }
    t.set("all_info_list", n);
    return t;
  },
  MSG_FAIRY_CLASS_INFO: function () {
    var t = new UtilMapping();
    t.set("fairy/class", getByte());
    t.set("fairy/layer", getByte());
    t.set("cur_state", getByte());
    t.set("zhen_fa", getByte());
    t.set("left_time", getLong());
    t.set("time_speed", getLong());
    t.set("cur_practice_val", getLong());
    t.set("total_practice_val", getLong());
    t.set("fairy/lijie", getByte());
    t.set("xinmo_rate", getLong());
    t.set("effect_rate", getLong());
    var e = getByte();
    t.set("count", e);
    for (var n = 1; n <= e; ++n) {
      t.set("pos_" + n, getByte());
      t.set("tingle_type_" + n, getByte());
    }
    t.set("have_nlearn_prop", getByte());
    t.set("xinmo_resist_times", getShort());
    return t;
  },
  MSG_FAIRY_ITEM_GROUP_EFFECT: function () {
    var t = new UtilMapping();
    t.set("index", getByte());
    t.set("time", getLong());
    return t;
  },
  MSG_FAIRY_ATTRIBS: function () {
    var t = new UtilMapping();
    gfIsJdDist() || t.set("not_open", getByte());
    var e = getByte();
    t.set("total_count", e);
    for (var n = 1; n <= e; ++n) {
      t.set("total_prop_name_" + n, getByteString());
      t.set("total_prop_val_" + n, getLong());
    }
    t.set("st_skill_name", getByteString());
    var i = getByte();
    t.set("fairy_equip_prop_count", i);
    for (var s = 1; s <= i; ++s) {
      t.set("fairy_equip_prop_name_" + s, getByteString());
      t.set("fairy_equip_prop_val_" + s, getLong());
    }
    var r = getByte();
    t.set("cur_count", r);
    for (var _ = 1; _ <= r; ++_) {
      t.set("cur_prop_name_" + _, getByteString());
      t.set("cur_prop_val_" + _, getLong());
    }
    t.set("change_prop_index", getByte());
    t.set("cur_prop_type", getByte());
    return t;
  },
  MSG_FSL_INCARNATION_INFO: function () {
    var t = {};
    t.refresh_all = getByte();
    var e = getShort();
    t.count = e;
    for (var n = 0; n < e; ++n) {
      var i = new UtilMapping();
      i.set("iid", getByteString());
      i.set("name", getByteString());
      i.set("friendly", getLong());
      i.set("friendship", getLong());
      i.set("max_friendly", getLong());
      i.set("is_guarded", getByte());
      i.set("is_binded", getByte());
      i.set("is_ju_xiang_hua", getByte());
      i.set("can_chat", getByte());
      i.set("attrib", getByteString());
      i.set("base_attrib", getLong());
      i.set("guard_attrib", getLong());
      t[n] = i;
    }
    return t;
  },
  MSG_FSL_DELETE_INCARNATION: function () {
    for (var t = [], e = getShort(), n = 0; n < e; ++n) t.push(getByteString());
    return t;
  },
  MSG_FSL_OVERVIEW_INFO: function () {
    var t = {},
      e = new UtilMapping();
    Q(e);
    t.basic_attrib_state = e;
    R((e = new UtilMapping()));
    t.properties = e;
    for (var n = [], i = getShort(), s = 0; s < i; ++s) {
      (e = new UtilMapping()).set("skill_no", getLong());
      var r = getShort();
      e.set("series_count", r);
      for (var _ = 1; _ <= r; ++_) {
        e.set("series_" + _.toString(), getShort());
        e.set("series_add_level_" + _.toString(), getShort());
      }
      n.push(e);
    }
    t.skill = n;
    return t;
  },
  MSG_FSL_FRAGMENT_INFO: function () {
    var t = new UtilMapping();
    t.set("sui_pian", getLong());
    return t;
  },
  MSG_FSL_DRAW_INCARNATION_INFO: function () {
    var t = new UtilMapping();
    t.set("dir", getByte());
    var e = getShort();
    t.set("count", e);
    for (var n = 0; n < e; ++n) {
      t.set("iid_" + n, getByteString());
      t.set("name_" + n, getByteString());
      t.set("attrib_" + n, getByteString());
      t.set("value_" + n, getLong());
    }
    return t;
  },
  MSG_FSL_INCANATION_ATTRIB: function () {
    var t = new UtilMapping();
    t.set("type", getByte());
    t.set("name", getByteString());
    t.set("intimacy", getLong());
    t.set("attrib", getByteString());
    t.set("basic_value", getLong());
    t.set("guard_value", getLong());
    t.set("full_guard_value", getLong());
    return t;
  },
  MSG_VENDUE_REFRESH_ITEMS: function () {
    var t = new UtilMapping();
    t.set("total_pages", getShort());
    t.set("depot_type", getByte());
    t.set("open_window", getByte());
    for (var e = [], n = getByte(), i = 1; i <= n; ++i) {
      var s = new UtilMapping(),
        r = getShort();
      s.set("pos", r);
      s.set("owner", getByteString());
      s.set("time_left", getLong());
      s.set("cur_price", getLong());
      s.set("exclusive_price", getLong());
      s.set("basic_price", getLong());
      s.set("vendue_iid", getByteString());
      s.set("merch_type", getByte());
      s.set("vendue_times", getLong());
      s.set("last_venduer", getByteString());
      s.set("attention_id", getByteString());
      var _ = new UtilMapping();
      _.set("pos", r);
      m(s, _);
      e.push(s);
    }
    t.set("items", e);
    return t;
  },
  MSG_VENDUE_REFRESH_PETS: function () {
    var t = new UtilMapping();
    t.set("total_pages", getShort());
    t.set("depot_type", getByte());
    t.set("open_window", getByte());
    t.set("clear_flag", getByte());
    for (var e = [], n = getByte(), i = 1; i <= n; ++i) {
      var s = new UtilMapping(),
        r = getShort();
      s.set("pos", r);
      s.set("owner", getByteString());
      s.set("time_left", getLong());
      s.set("cur_price", getLong());
      s.set("exclusive_price", getLong());
      s.set("basic_price", getLong());
      s.set("vendue_iid", getByteString());
      s.set("raw_skill", getByte());
      s.set("merch_type", getByte());
      s.set("vendue_times", getLong());
      s.set("last_venduer", getByteString());
      s.set("attention_id", getByteString());
      p(s);
      y(s);
      w(s);
      e.push(s);
    }
    for (var _ = 0; _ < n; ++_) P(e[_]);
    t.set("items", e);
    return t;
  },
  MSG_VENDUE_REFRESH_SYS: function () {
    var t = new UtilMapping();
    t.set("total_pages", getShort());
    t.set("depot_type", getByte());
    t.set("open_window", getByte());
    for (var e = gfIsJdDist(), n = [], i = getByte(), s = 1; s <= i; ++s) {
      var r = new UtilMapping(),
        _ = getShort();
      r.set("pos", _);
      r.set("owner", getByteString());
      r.set("time_left", getLong());
      r.set("cur_price", getLong());
      r.set("exclusive_price", getLong());
      r.set("basic_price", getLong());
      r.set("vendue_iid", getByteString());
      r.set("merch_type", getByte());
      r.set("vendue_times", getLong());
      r.set("last_venduer", getByteString());
      r.set("attention_id", getByteString());
      e || getByte();
      var a = new UtilMapping();
      a.set("pos", _);
      m(r, a);
      n.push(r);
    }
    t.set("items", n);
    return t;
  },
  MSG_VENDUE_PERMIT: function () {
    return new UtilMapping();
  },
  MSG_VENDUE_OPEN_STORE: function () {
    for (var t = [], e = getLong(), n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("type", getByte());
      i.set("name", getByteString());
      i.set("source", getByteString());
      i.set("days", getShort());
      i.set("price", getByteString());
      i.set("key_id", getByteString());
      i.set("has_upgraded", getByte());
      t.push(i);
    }
    return t;
  },
  MSG_VENDUE_GOT_IT: function () {
    for (var t = [], e = getLong(), n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("key_id", getByteString());
      t.push(i);
    }
    return t;
  },
  MSG_ATTENTION_STATUS: function () {
    var t = [];
    getByteString();
    for (var e = getShort(), n = 1; n <= e; ++n) {
      var i = new UtilMapping();
      i.set("attention_id", getByteString());
      i.set("status", getByte());
      t.push(i);
    }
    return t;
  },
  MSG_VENDUE_CAN_VENDUE: function () {
    var t = new UtilMapping();
    t.set("merch_type", getByte());
    t.set("id", getLong());
    return t;
  },
  MSG_JD_MALL_BASIC_INFO: function () {
    for (var t = [], e = getShort(), n = 0; n < e; n++) {
      var i = new UtilMapping(),
        s = new UtilMapping();
      i.set("name", getByteString());
      i.set("goods_type", getByte());
      var r = getLong();
      i.set("init_price", r);
      i.set("price", r);
      i.set("coin_type", getByte());
      m(i, s);
      t.push(i);
    }
    return t;
  },
  MSG_JD_MALL_PRICE_INFO: function () {
    var t = new UtilMapping(),
      e = getByte(),
      n = getLong(),
      i = getShort();
    if (i <= 0) {
      t.set("cookie", n);
      t.set("count", i);
      t.set("oper", e);
      return t;
    }
    for (var s = 0; s < i; s++) {
      t.set("cookie", n);
      t.set("count", i);
      t.set("oper", e);
      t.set("goods_name_" + s, getByteString());
      t.set("real_price_" + s, getLong());
      t.set("sell_price_" + s, getLong());
    }
    return t;
  },
  MSG_POPUP_SAFE_TIME: function () {
    for (var t = new UtilMapping(), e = getByte(), n = 0; n < e; n++) {
      t.set("type" + n, getByte());
      t.set("safe_time" + n, getLong());
      t.set("interval" + n, getLong());
    }
    t.set("count", e);
    return t;
  },
  MSG_MOUNT_INBORN_STONE_LIST: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    var e = getByte();
    e && t.set("clear", TRUE);
    for (var n = getByte(), i = [], s = 0; s < n; ++s) {
      var r = new UtilMapping(),
        _ = new UtilMapping();
      r.set("all_info", e);
      r.set("pos", getByte());
      m(r, _);
      i.push(r);
    }
    t.set("stones", i);
    return t;
  },
  MSG_STALL_NAME: function () {
    var t = new UtilMapping();
    t.set("server", getByteString());
    t.set("stall_id", getByteString());
    t.set("owner_name", getByteString());
    t.set("stall_name", getByteString());
    t.set("owner_gid", getByteString());
    t.set("type", getShort());
    t.set("map_name", getByteString());
    t.set("pos_x", getShort());
    t.set("pos_y", getShort());
    t.set("id", getLong());
    t.set("money", getLong());
    t.set("max_money", getLong());
    t.set("in_stall", getByte());
    t.set("open_dlg", getByte());
    t.set("remote_stall", getByte());
    return t;
  },
  MSG_STALL_ITEM_INFO: function () {
    var t = [],
      e = getByteString(),
      n = getByte(),
      i = getShort();
    if (i <= 0) {
      var s = new UtilMapping();
      s.set("owner_gid", e);
      return [s];
    }
    for (var r = 0; r < i; ++r) {
      var _ = new UtilMapping(),
        a = new UtilMapping();
      _.set("owner_gid", e);
      _.set("sign", n);
      _.set("count", i);
      _.set("price", getLong());
      _.set("exhibit", getByte());
      var o = getByte();
      _.set("pos", o);
      a.set("pos", o);
      m(_, a);
      t.push(_);
    }
    return t;
  },
  MSG_STALL_PET_INFO: function () {
    var t = [],
      e = getByteString(),
      n = getShort();
    if (n <= 0) {
      var i = new UtilMapping();
      i.set("owner_gid", e);
      return [i];
    }
    for (var s = 0; s < n; ++s) {
      var r = new UtilMapping();
      r.set("owner_gid", e);
      r.set("count", n);
      r.set("id", getLong());
      r.set("price", getLong());
      r.set("exhibit", getByte());
      p(r);
      y(r);
      w(r);
      t.push(r);
    }
    for (var _ = t.length, a = 0; a < _; ++a) P(t[a]);
    return t;
  },
  MSG_REFESH_STALL_LIST: function () {
    var t = new UtilMapping();
    t.set("owner_id", getLong());
    t.set("sign", getByte());
    return t;
  },
  MSG_STALL_LIST_REMOTE: function () {
    var t = [],
      e = getShort(),
      n = getShort(),
      i = getShort();
    if (i <= 0) return [new UtilMapping()];
    for (var s = 0; s < i; ++s) {
      var r = new UtilMapping();
      r.set("index", s);
      r.set("total_page", e);
      r.set("cur_page", n);
      r.set("count", i);
      r.set("server", getByteString());
      r.set("stall_id", getByteString());
      r.set("auto_stall", getByte());
      r.set("stall_name", getByteString());
      r.set("stall_time", getLong());
      t.push(r);
    }
    return t;
  },
  MSG_SEARCH_RESULT_REMOTE: function () {
    var t = [],
      e = getLong(),
      n = getShort(),
      i = getShort(),
      s = getShort(),
      r = getShort();
    if (r <= 0) {
      var _ = new UtilMapping();
      _.set("index", 0);
      _.set("cookie", e);
      _.set("type", n);
      _.set("total_page", i);
      _.set("cur_page", s);
      _.set("count", r);
      return [_];
    }
    for (var a = 0; a < r; ++a) {
      var o = new UtilMapping();
      o.set("index", a);
      o.set("cookie", e);
      o.set("type", n);
      o.set("total_page", i);
      o.set("cur_page", s);
      o.set("count", r);
      o.set("show_normal", getByte());
      o.set("server", getByteString());
      o.set("stall_id", getByteString());
      o.set("automatism_stall", getByte());
      o.set("id", getLong());
      o.set("icon", getLong());
      o.set("name", getByteString());
      o.set("amount", getLong());
      o.set("price", getLong());
      o.set("for_show", getByte());
      o.set("level", getShort());
      o.set("durability_full", getByte());
      o.set("item_polar", getByte());
      t.push(o);
    }
    return t;
  },
  MSG_REMOTE_STALL_ITEM_INFO: function () {
    var t = new UtilMapping(),
      e = new UtilMapping();
    t.set("search_type", getByte());
    t.set("server", getByteString());
    m(t, e);
    return t;
  },
  MSG_REMOTE_STALL_PET_INFO: function () {
    var t = new UtilMapping();
    t.set("server", getByteString());
    t.set("id", getLong());
    p(t);
    y(t);
    w(t);
    P(t);
    return t;
  },
  MSG_UPDATE_STALL_GOODS_REMOTE: function () {
    var t = new UtilMapping();
    t.set("type", getByte());
    t.set("server", getByteString());
    t.set("stall_id", getByteString());
    t.set("goods_id", getLong());
    t.set("amount", getLong());
    return t;
  },
  MSG_STALL_INPUT_PRICE: function () {
    var t = new UtilMapping();
    t.set("max", getLong());
    t.set("only_show", getByte());
    t.set("id", getLong());
    t.set("tip", getByteString());
    return t;
  },
  MSG_SHOW_SALE_LOG: function () {
    for (var t = [], e = (getByte(), getByteString()), n = getByte(), i = 0; i < n; ++i) {
      var s = new UtilMapping();
      s.set("time", getLong());
      s.set("total_cash", e);
      s.set("name", getByteString());
      s.set("amount", getByteString());
      s.set("money", getByteString());
      t.push(s);
    }
    return t;
  },
  MSG_STALL_REMOVE_GOODS: function () {
    var t = new UtilMapping();
    t.set("owner_gid", getByteString());
    t.set("goods_id", getLong());
    return t;
  },
  MSG_SUBMIT_CONFIRM_DLG: function () {
    var t = new UtilMapping();
    t.set("content", u());
    t.set("flag", getByte());
    return t;
  },
  MSG_SYNC_BAN_WORDS: function () {
    var t = new UtilMapping(),
      e = getShort();
    t.set("filter_add_count", e);
    for (var n = 0; n < e; n++) t.set("filter_add_" + n, getByteString());
    var i = getShort();
    t.set("filter_del_count", i);
    for (var s = 0; s < i; s++) t.set("filter_del_" + s, getByteString());
    e = getShort();
    t.set("send_add_count", e);
    for (var r = 0; r < e; r++) t.set("send_add_" + r, getByteString());
    i = getShort();
    t.set("send_del_count", i);
    for (var _ = 0; _ < i; _++) t.set("send_del_" + _, getByteString());
    e = getShort();
    t.set("strict_add_count", e);
    for (var a = 0; a < e; a++) t.set("strict_add_" + a, getByteString());
    i = getShort();
    t.set("strict_del_count", i);
    for (var o = 0; o < i; o++) t.set("strict_del_" + o, getByteString());
    e = getShort();
    t.set("ignore_add_count", e);
    for (var c = 0; c < e; c++) t.set("ignore_add_" + c, getByteString());
    i = getShort();
    t.set("ignore_del_count", i);
    for (var E = 0; E < i; E++) t.set("ignore_del_" + E, getByteString());
    return t;
  },
  MSG_STALL_GOODS_PRICE: function () {
    var t = new UtilMapping();
    t.set("owner_gid", getByteString());
    t.set("id", getLong());
    t.set("remote_stall", getByte());
    t.set("price", getLong());
    return t;
  },
  MSG_MOBILE_COMMON_RED_POINT: function () {
    for (var t = [], e = getByte(), n = 0; n < e; n++) {
      var i = new UtilMapping();
      i.set("task_type", getByte());
      i.set("red_point", getByte());
      t.push(i);
    }
    return t;
  },
  MSG_LUCKY_UPGRADE_PROP: function () {
    var t = new UtilMapping();
    t.set("item_unique", getLong());
    t.set("pink_luck_value", getLong());
    t.set("gold_luck_value", getLong());
    return t;
  },
  MSG_PICTURE_DIALOG: function () {
    var t = new UtilMapping();
    t.set("id", getLong());
    t.set("setting", getShort());
    t.set("name", getByteString());
    t.set("portrait", getLong());
    t.set("pic_no", getShort());
    t.set("content", u());
    N(t);
    return t;
  },
  MSG_C_END_ROUND: function () {
    var t = new UtilMapping();
    t.set("cur_round", getShort());
    t.set("cookie", getLong());
    return t;
  },
  MSG_YEAR_BOOK_2019: function () {
    for (var t = new UtilMapping(), e = getByte(), n = 0; n < e; n++) {
      var i = getByte();
      t.set(i, getByteString());
    }
    t.set("qr_code", getByteString());
    return t;
  },
};

exports.parse = function (t, e) {
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
  console.log("MsgParser data is null!");
};

const CHANNEL_MISC = 0;
const CHANNEL_CURRENT = 1;
const CHANNEL_WORLD = 2;
const CHANNEL_TELL = 3;
const CHANNEL_TEAM = 4;
const CHANNEL_PARTY = 5;
const CHANNEL_RUMOR = 6;
const CHANNEL_SYSTEM = 7;
const CHANNEL_ERROR = 8;
const CHANNEL_FRIEND = 9;
const CHANNEL_DEBUG = 10;
const CHANNEL_FAMILY = 11;
const CHANNEL_INFO = 12;
const CHANNEL_TRADE = 13;
const CHANNEL_MANAGE = 14;
const CHANNEL_CS = 14;
const CHANNEL_WHOOP = 15;
const CHANNEL_RAID = 16;
const CHANNEL_HEAD = 17;
const CHANNEL_IMPEACH = 18;
const CHANNEL_HORN = 19;
const CHANNEL_FRIEND_SCORE = 20;
const CHANNEL_CHILD_HALL = 21;
const CHANNEL_CHILD_MAP = 22;
const CHANNEL_CHILD_CURRENT = 23;
const CHANNEL_CHILD_EVENT = 24;
const CHANNEL_CHILD_COMBAT = 25;
const CHANNEL_CHILD_SCENE = 26;
const CHANNEL_CHILD_MISC = 27;
const CHANNEL_ARENA_CURRENT = 28;
const CHANNEL_ARENA_TEAM = 29;
const CHANNEL_PARTY_MSG = 30;
const CHANNEL_GROUP = 31;
const CHANNEL_NOTICE = 32;
const CHANNEL_LOOKON = 33;
const CHANNEL_WORLD_EX = 34;
const CHANNEL_TEAM_EX = 35;
const CHANNEL_SAME_CITY = 36;
const MSG_SHOW_EXTRA_NONE = 0;
const MSG_SHOW_EXTRA_INSIDER = 1;
const MSG_SHOW_EXTRA_SPECIAL_MOOD = 2;
const MSG_SEND_TYPE_NORMAL = 0;
const MSG_SEND_TYPE_AUTO_REPLY = 1;
const MSG_SEND_TYPE_ASKTAO = 2;
const MSG_SEND_TYPE_ASKTAO_WEIHU = 3;
const MSG_SEND_TYPE_ASKTAO_HUODONG = 4;
const CHANNEL_OBJ_TYPE_ITEM = 1;
const CHANNEL_OBJ_TYPE_MONSTER = 2;
const CHANNEL_OBJ_TYPE_GUARD = 3;
const CHANNEL_OBJ_TYPE_CHILD = 4;
const CHANNEL_OBJ_TYPE_ACHIEVE = 5;
const CHANNEL_OBJ_TYPE_TASK = 6;
const CHANNEL_OBJ_TYPE_TASK_SERVICE = 7;
const CHANNEL_OBJ_TYPE_GROUP = 8;
const CHANNEL_OBJ_TYPE_TODAY_STAT = 9;
const CHANNEL_OBJ_TYPE_HOUSE = 10;
const CHANNEL_OBJ_TYPE_USER_ATTRIB = 11;
const CHANNEL_OBJ_TYPE_LIUJIN_SUIYUE = 12;
const CHANNEL_OBJ_TYPE_DISCOVER_EVENT = 13;
const CHANNEL_OBJ_TYPE_CARD_TODAY_STAT = 14;
const CHANNEL_OBJ_TYPE_PARTY = 15;
const CHANNEL_OBJ_COLLECT_CARD = 16;
const CHANNEL_OBJ_TYPE_RECIPES = 17;
const CHANNEL_OBJ_FRIND_CIRCLE_NPC = 18;
const CHANNEL_OBJ_STAR_MAP_CARD = 19;
const CHANNEL_OBJ_SHOP_ITEM = 20;
const CHANNEL_OBJ_CHAR_MOUNT_COLOR_MASK = 21;
const CHANNEL_OBJ_MOUNT_COLOR_MASK = 22;
const CHANNEL_OBJ_TYPE_TEAM = 23;
const CHANNEL_OBJ_TYPE_INCARNATION = 24;
const CHANNEL_OBJ_TYPE_DRAW_INCARNATION = 25;
const SYSTEM_TYPE_SYSTEM = 1;
const SYSTEM_TYPE_PARTY = 2;
const SYSTEM_TYPE_RUMOR = 3;
const SYSTEM_TYPE_ACTIVITY = 4;
const SYSTEM_TYPE_EXCHANGE = 5;
const SYSTEM_TYPE_SAFE = 6;
const SYSTEM_TYPE_CS = 7;
const SYSTEM_TYPE_BONUS = 8;
const gfIsJdDist = function () {
  return 0;
};

const FIELD_INT8 = 1;
const FIELD_INT16 = 2;
const FIELD_INT32 = 3;
const FIELD_STRING = 4;
const FIELD_LONG_STRING = 5;
const FIELD_UINT8 = 6;
const FIELD_UINT16 = 7;
const FIELDS_BASIC = 1;
const FIELDS_VALUE = 2;
const FIELDS_SCALE = 3;
const FIELDS_NORMAL = 1;
const FIELDS_EXTRA1 = 2;
const FIELDS_EXTRA2 = 3;
const FIELDS_PROP3 = 4;
const FIELDS_PART_SUIT = 7;
const FIELDS_SUIT = 8;
const FIELDS_RECG = 9;
const FIELDS_REBUILD = 10;
const FIELDS_EFFECT = 11;
const FIELDS_PROP4 = 12;
const FIELDS_SEAL_PROP1 = 13;
const FIELDS_SEAL_PROP2 = 14;
const FIELDS_GRAY_PROP = 15;
const FIELDS_UPGRADE_EXTRA1 = 16;
const FIELDS_UPGRADE_EXTRA2 = 17;
const FIELDS_PROPERTY_BIND = 18;
const FIELDS_UPGRADE_EXTRA4 = 19;
const FIELDS_RESPONANCE = 20;
const FIELDS_RESPONANCE_EX = 21;
const FIELDS_ART_SEAL_PROP1 = 22;
const FIELDS_ART_SEAL_PROP2 = 23;
const FIELDS_ART_SEAL_PROP3 = 24;
const FIELDS_ART_SEAL_PROP4 = 25;
const FIELDS_ARTIFACT_SEAL = 26;
const FIELDS_ARTIFACT_SEAL_EX = 27;
const FIELDS_RUNE_BASE_PROP1 = 28;
const FIELDS_RUNE_BASE_PROP2 = 29;
const FIELDS_RUNE_BASE_PROP3 = 30;
const FIELDS_RUNE_BASE_PROP4 = 31;
const FIELDS_RUNE_COMP_PROP = 32;
const FIELDS_RUNE_COMP_PROP_NEXT = 33;
const FIELDS_GODBOOK_PROP_BASIC = 34;
const FIELDS_GODBOOK_PROP_EXTRA = 35;
const FIELDS_GODBOOK_PROP_BASIC_M = 36;
const FIELDS_NAMEPLATE_PROP1 = 37;
const FIELDS_NAMEPLATE_PROP2 = 38;
const FIELDS_NAMEPLATE_PROP3 = 39;
const FIELDS_SEAL_PET_INFO = 40;
const FIELDS_PET_TONGYUAN_PROP1 = 41;
const FIELDS_PET_TONGYUAN_PROP2 = 42;
const FIELDS_PET_TONGYUAN_PROP3 = 43;
const FIELDS_PET_TONGYUAN_PROP4 = 44;
const FIELDS_PET_TONGYUAN_HELP = 45;
const FIELDS_FAIRY_HIDE_PROP2 = 46;
const FIELDS_FAIRY_HIDE_PROP3 = 47;
const FIELDS_FAIRY_LINGYUN_ATTRIB = 48;
const FIELDS_LINGYUN_ATTRIB = 49;
const FIELDS_FAIRY_HIDE_PROP1 = 50;
const FIELDS_DAOWEN_PROP1 = 51;
const FIELDS_DAOWEN_PROP2 = 52;
const FIELDS_DAOWEN_PROP3 = 53;
const FIELDS_DAOWEN_PROP4 = 54;
const FIELDS_DAOWEN_PROP_COLOR1 = 55;
const FIELDS_DAOWEN_PROP_COLOR2 = 56;
const FIELDS_DAOWEN_PROP_COLOR3 = 57;
const FIELDS_DAOWEN_PROP_COLOR4 = 58;
const FIELDS_MAX = 58;
const FIELDS_PROP_COLOR = 100;
const FIELDS_MEDICINE = 11;
const FIELDS_PET_EXTRA = 12;
const FIELDS_MAX_PET_EXTRA = 10;
const FIELDS_MOUNT_ATTRIB = 23;
const FIELDS_CHILD_IMPROVE = 1;
const FIELDS_GUARD_EXTRA = 12;
const FIELDS_MAX_GUARD_EXTRA = 10;
const FIELD_NAME = 1;
const FIELD_STR = 2;
const FIELD_PHY_POWER = 3;
const FIELD_ACCURATE = 4;
const FIELD_CON = 5;
const FIELD_LIFE = 6;
const FIELD_MAX_LIFE = 7;
const FIELD_DEF = 8;
const FIELD_WIZ = 9;
const FIELD_MAG_POWER = 10;
const FIELD_MANA = 11;
const FIELD_MAX_MANA = 12;
const FIELD_DEX = 13;
const FIELD_SPEED = 14;
const FIELD_PARRY = 15;
const FIELD_ATTRIB_POINT = 16;
const FIELD_POLAR_POINT = 17;
const FIELD_STAMINA = 18;
const FIELD_MAX_STAMINA = 19;
const FIELD_TAO = 20;
const FIELD_FRIENDLY = 21;
const FIELD_CUR_PK = 22;
const FIELD_TOTAL_PK = 23;
const FIELD_DEGREE = 24;
const FIELD_EXP = 25;
const FIELD_POT = 26;
const FIELD_CASH = 27;
const FIELD_BALANCE = 28;
const FIELD_GENDER = 29;
const FIELD_MASTER = 30;
const FIELD_LEVEL = 31;
const FIELD_SKILL = 32;
const FIELD_PARTY_NAME = 33;
const FIELD_PARTY_CONTRIB = 34;
const FIELD_NICK = 35;
const FIELD_TITLE = 36;
const FIELD_NICE = 37;
const FIELD_REPUTATION = 38;
const FIELD_COUPLE = 39;
const FIELD_ICON = 40;
const FIELD_TYPE = 41;
const FIELD_DURABILITY = 42;
const FIELD_MAX_DURABILITY = 43;
const FIELD_POLAR = 44;
const FIELD_POLAR_METAL = 45;
const FIELD_POLAR_WOOD = 46;
const FIELD_POLAR_WATER = 47;
const FIELD_POLAR_FIRE = 48;
const FIELD_POLAR_EARTH = 49;
const FIELD_RESIST_METAL = 50;
const FIELD_RESIST_WOOD = 51;
const FIELD_RESIST_WATER = 52;
const FIELD_RESIST_FIRE = 53;
const FIELD_RESIST_EARTH = 54;
const FIELD_EXP_TO_NEXT_LEVEL = 55;
const FIELD_RESIST_POISON = 56;
const FIELD_RESIST_FROZEN = 57;
const FIELD_RESIST_SLEEP = 58;
const FIELD_RESIST_FORGOTTEN = 59;
const FIELD_RESIST_CONFUSION = 60;
const FIELD_LONGEVITY = 61;
const FIELD_MARTIAL = 62;
const FIELD_INTIMACY = 63;
const FIELD_SHAPE = 64;
const FIELD_RESIST_POINT = 65;
const FIELD_LOYALTY = 66;
const FIELD_DOUBLE_HIT = 67;
const FIELD_STUNT = 68;
const FIELD_COUNTER_ATTACK = 69;
const FIELD_LIFE_RECOVER = 70;
const FIELD_MANA_RECOVER = 71;
const FIELD_LIFE_RECOVER_RATE = 72;
const FIELD_MANA_RECOVER_RATE = 73;
const FIELD_ITEM_TYPE = 74;
const FIELD_TOTAL_SCORE = 75;
const FIELD_COUNTER_ATTACK_RATE = 77;
const FIELD_DOUBLE_HIT_RATE = 78;
const FIELD_STUNT_RATE = 79;
const FIELD_DAMAGE_SEL = 80;
const FIELD_FAMILY = 81;
const FIELD_REQ_STR = 82;
const FIELD_TOTAL_DIED = 83;
const FIELD_ITEM_UNIQUE = 84;
const FIELD_DAMAGE_SEL_RATE = 85;
const FIELD_PORTRAIT = 86;
const FIELD_PASSIVE_MODE = 87;
const FIELD_STATIC_MODE = 88;
const FIELD_ITEM_SOURCE = 89;
const FIELD_SIGNATURE = 90;
const FIELD_HARMONY = 91;
const FIELD_KINDNESS = 92;
const FIELD_CAREFULNESS = 93;
const FIELD_COURAGE = 94;
const FIELD_CHARACTER_DESC = 95;
const FIELD_PARTY_DESC = 96;
const FIELD_PARTY_JOB = 97;
const FIELD_FAMILY_TITLE = 98;
const FIELD_PARTY_TITLE = 99;
const FIELD_APPRENTICE_TITLE = 100;
const FIELD_REQ_CON = 101;
const FIELD_REQ_WIZ = 102;
const FIELD_REQ_DEX = 103;
const FIELD_PET_LIFE_SHAPE = 104;
const FIELD_PET_MANA_SHAPE = 105;
const FIELD_PET_SPEED_SHAPE = 106;
const FIELD_PET_PHY_SHAPE = 107;
const FIELD_PET_MAG_SHAPE = 108;
const FIELD_PET_RANK = 109;
const FIELD_PENETRATE = 110;
const FIELD_APPELLATION_FAMILY = 111;
const FIELD_APPELLATION_PARTY = 112;
const FIELD_APPELLATION_APPRENTICE = 113;
const FIELD_APPELLATION_BROTHER = 114;
const FIELD_APPELLATION_MARRY = 115;
const FIELD_SPECIAL_ICON = 116;
const FIELD_PENETRATE_RATE = 117;
const FIELD_NIMBUS = 118;
const FIELD_SILVER_COIN = 119;
const FIELD_GOLD_COIN = 120;
const FIELD_EXTRA_LIFE = 121;
const FIELD_EXTRA_MANA = 122;
const FIELD_HAVE_COIN_PWD = 123;
const FIELD_MAX_CASH = 124;
const FIELD_MAX_BALANCE = 125;
const FIELD_IGNORE_RESIST_METAL = 126;
const FIELD_IGNORE_RESIST_WOOD = 127;
const FIELD_IGNORE_RESIST_WATER = 128;
const FIELD_IGNORE_RESIST_FIRE = 129;
const FIELD_IGNORE_RESIST_EARTH = 130;
const FIELD_IGNORE_RESIST_FORGOTTEN = 131;
const FIELD_IGNORE_RESIST_POISON = 132;
const FIELD_IGNORE_RESIST_FROZEN = 133;
const FIELD_IGNORE_RESIST_SLEEP = 134;
const FIELD_IGNORE_RESIST_CONFUSION = 135;
const FIELD_SUPER_EXCLUSE_METAL = 136;
const FIELD_SUPER_EXCLUSE_WOOD = 137;
const FIELD_SUPER_EXCLUSE_WATER = 138;
const FIELD_SUPER_EXCLUSE_FIRE = 139;
const FIELD_SUPER_EXCLUSE_EARTH = 140;
const FIELD_B_SKILL_LOW_COST = 141;
const FIELD_C_SKILL_LOW_COST = 142;
const FIELD_D_SKILL_LOW_COST = 143;
const FIELD_SUPER_POISON = 144;
const FIELD_SUPER_SLEEP = 145;
const FIELD_SUPER_FORGOTTEN = 146;
const FIELD_SUPER_CONFUSION = 147;
const FIELD_SUPER_FROZEN = 148;
const FIELD_ENHANCED_METAL = 149;
const FIELD_ENHANCED_WOOD = 150;
const FIELD_ENHANCED_WATER = 151;
const FIELD_ENHANCED_FIRE = 152;
const FIELD_ENHANCED_EARTH = 153;
const FIELD_MAG_DODGE = 154;
const FIELD_JINGUANGZHAXIAN_ATT = 155;
const FIELD_ZHAIYEFEIHUA_ATT = 156;
const FIELD_DISHUICHUANSHI_ATT = 157;
const FIELD_JUHUOFENTIAN_ATT = 158;
const FIELD_LUOTUFEIYAN_ATT = 159;
const FIELD_METAL_MAG_POWER = 160;
const FIELD_WOOD_MAG_POWER = 161;
const FIELD_WATER_MAG_POWER = 162;
const FIELD_FIRE_MAG_POWER = 163;
const FIELD_EARTH_MAG_POWER = 164;
const FIELD_CARD_LEVEL = 165;
const FIELD_MAX_CARD_AMOUNT = 166;
const FIELD_CARD_AMOUNT = 167;
const FIELD_IGNORE_ALL_RESIST_POLAR = 168;
const FIELD_IGNORE_ALL_RESIST_EXCEPT = 169;
const FIELD_RELEASE_FORGOTTEN = 170;
const FIELD_RELEASE_POISON = 171;
const FIELD_RELEASE_FROZEN = 172;
const FIELD_RELEASE_SLEEP = 173;
const FIELD_RELEASE_CONFUSION = 174;
const FIFLD_TITLE_EFFECT = 175;
const FIELD_DESC = 201;
const FIELD_EQUIP_TYPE = 202;
const FIELD_AMOUNT = 203;
const FIELD_OWNER_ID = 204;
const FIELD_REQ_LEVEL = 205;
const FIELD_ITEM_ATTRIB = 206;
const FIELD_ITEM_VALUE = 207;
const FIELD_REBUILD_LEVEL = 208;
const FIELD_COLOR = 209;
const FIELD_QUALITY = 210;
const FIELD_SERVICE_TIMES = 211;
const FIELD_MAX_SERVICE_TIMES = 212;
const FIELD_CARPET_RADIUS = 213;
const FIELD_EQUIP_PAGE = 214;
const FIELD_ALL_ATTRIB = 220;
const FIELD_ALL_POLAR = 221;
const FIELD_ALL_RESIST_POLAR = 222;
const FIELD_ALL_RESIST_EXCEPT = 223;
const FIELD_ALL_SKILL = 224;
const FIELD_SKILL_EXP = 230;
const FIELD_SKILL_INTIMACY = 231;
const FIELD_LIFE_EFFECT = 232;
const FIELD_MANA_EFFECT = 233;
const FIELD_ATTACK_EFFECT = 234;
const FIELD_SPEED_EFFECT = 235;
const FIELD_PHY_EFFECT = 236;
const FIELD_MAG_EFFECT = 237;
const FIELD_PHY_ABSORB = 238;
const FIELD_MAG_ABSORB = 239;
const FIELD_ADD_MAX_LIFE = 240;
const FIELD_ADD_MAX_MANA = 241;
const FIELD_ADD_USER_LEVEL = 242;
const FIELD_ADD_RANDOM_SKILL = 243;
const FIELD_DOUBLE_TIME = 244;
const FIELD_ADD_PET_LEVEL = 245;
const FIELD_PET_AHEAD_SKILL = 246;
const FIELD_PET_LONGEVITY = 247;
const FIELD_UPGRADE_TYPE = 248;
const FIELD_ADD_PET_EXP = 249;
const FIELD_TO_BE_DELETED = 260;
const FIELD_LOCKED = 261;
const FIELD_PET_UPGRADED = 262;
const FIELD_LEFT_TIME_TO_DELETED = 263;
const FIELD_EXTRA_DESC = 264;
const FIELD_PET_PHY_REBUILD_LEVEL = 265;
const FIELD_PET_MAG_REBUILD_LEVEL = 266;
const FIELD_RAW_NAME = 267;
const FIELD_SUIT_POLAR = 268;
const FIELD_SUIT_ENABLED = 269;
const FIELD_GIFT = 270;
const FIELD_RECOGNIZED = 271;
const FIELD_PARTY_STAGE_NAME = 272;
const FIELD_PARTY_STAGE_COUNT = 273;
const FIELD_PARTY_STAGE_TIME = 274;
const FIELD_PARTY_STAGE_MEMBER = 275;
const FIELD_PROP2_COLOR = 276;
const FIELD_WRESTLE_SCORE = 277;
const FIELD_WRESTLE_SCORE_EX = 278;
const FIELD_DEF_EFFECT = 279;
const FIELD_GUARD_COMBAT = 280;
const FIELD_MOVING = 281;
const FIELD_ITEM_SUPER = 282;
const FIELD_WEAPON_ICON = 290;
const FIELD_SUIT_ICON = 291;
const FIELD_ORG_ICON = 292;
const FIELD_TAO_EFFECT = 293;
const FIELD_MOUNT_TYPE = 294;
const FIELD_ITEM_TIMEOUT = 295;
const FIELD_INDIVI_SIGNATURE = 300;
const FIELD_INSIDER_TIME = 301;
const FIELD_USER_STATE = 302;
const FIELD_AUTOMATIC_MSG = 303;
const FIELD_INDIVI_IMAGE = 304;
const FIELD_GID = 305;
const FIELD_USER_UPGRADE_IMMORTAL = 306;
const FIELD_USER_UPGRADE_MAGIC = 307;
const FIELD_USER_UPGRADE_STATE = 308;
const FIELD_USER_UPGRADE_TYPE = 309;
const FIELD_ITEM_OWNER_POLAR = 310;
const FIELD_ITEM_UNIT = 311;
const FILED_PET_UPGRADED = 312;
const FIELD_ASKTAO_SHOW_STATE = 313;
const FIELD_ASKTAO_SHOW_ICON = 314;
const FIELD_FURNITURE_TYPE = 315;
const FIELD_LEFT_TIME = 316;
const FIELD_MOVE_SPEED = 317;
const FIELD_VOUCHER = 318;
const FIELD_REMARK = 319;
const FIELD_BEAUTIFUL = 320;
const FIELD_COMFORT = 321;
const FIELD_FURNITURE_NUM = 322;
const FIELD_MAX_FURNITURE_NUM = 323;
const FIELD_POSITION = 324;
const FIELD_DIRECTION = 325;
const FIELD_NPC_ICON = 326;
const FIELD_FURNITURE_FUNC = 327;
const FIELD_BOX_NUM = 328;
const FIELD_FEED_BACK = 329;
const FIELD_GUARD_UPGRADED = 330;
const FIELD_IGNORE_DOUBLE_HIT_RATE = 331;
const FIELD_IGNORE_STUNT_RATE = 332;
const FIELD_WEEK_ACT = 333;
const FIELD_SEAL_SUIT1 = 334;
const FIELD_SEAL_FLAG = 335;
const FIELD_CHASE = 336;
const FIELD_SUPER_OBSTRUCT = 337;
const FIELD_SEAL_ICON = 338;
const FIELD_MAGIC_TOWER_STAGE = 339;
const FIELD_MAGIC_TOWER_TIME = 340;
const FIELD_LOTTERY_NUM = 341;
const FIELD_LOTTERY_INFO = 342;
const FIELD_LOTTERY_DATE = 343;
const FIELD_BINDED = 344;
const FIELD_SIGN_POINT = 345;
const FIELD_SIGN_RANK = 346;
const FIELD_SIGN_STATE = 347;
const FIELD_SIGN_SUC = 348;
const FIELD_NEXT_CARD = 349;
const FIELD_LOTTERY_NO = 351;
const FIELD_SIGN_PLACES = 352;
const FIELD_INSIDER = 353;
const FIELD_NOSALE = 354;
const FIELD_CHARGE_ITEM = 355;
const FIELD_IGNORE_MAG_DODGE = 356;
const FIELD_SIGN_DIST = 357;
const FIELD_CSC_NAME = 358;
const FIELD_CSC_RANK = 359;
const FIELD_CSC_SCORE = 360;
const FIELD_CSC_ALL_NAMES = 361;
const FIELD_IS_ON = 362;
const FIELD_NEED_ITEM = 364;
const FIELD_TIME_LIMIT = 365;
const FIELD_MAP_LIMIT = 366;
const FIELD_LEVEL_LIMIT = 367;
const FIELD_TOTAL_PAGES = 368;
const FIELD_PAGE_INDEX = 369;
const FIELD_WUDOU_APPELLATION = 370;
const FIELD_CINTIMACY_MALE = 371;
const FIELD_FOOD = 372;
const FIELD_MAX_FOOD = 373;
const FIELD_MOOD = 374;
const FIELD_MAX_MOOD = 375;
const FIELD_STATUS = 376;
const FIELD_BIRTHDAY = 377;
const FIELD_CAPACITY = 378;
const FIELD_WIT_EFFECT = 379;
const FIELD_STAMINA_EFFECT = 380;
const FIELD_WISDOM = 381;
const FIELD_PHYSIQUE = 382;
const FIELD_CINTIMACY_FEMALE = 383;
const FIELD_RECOG_LEFT_TIME = 384;
const FIELD_USER_UPGRADE_TOTAL = 385;
const FIELD_BAOHUA_YULUWAN = 386;
const FIELD_SANQINGWAN = 387;
const FIELD_JIUZHUAN_XIANLINGLU = 388;
const FIELD_MEDICINE_POLAR = 389;
const FIELD_MOUNT_ADD_ATTRIB = 390;
const FIELD_MOUNT_ADD_PHY = 391;
const FIELD_MOUNT_ADD_MAG = 392;
const FIELD_MOUNT_ADD_DEF = 393;
const FIELD_CARD_TYPE = 396;
const FIELD_LIMIT_RECOVER_LEVEL = 397;
const FIELD_MANA_LIMIT_RECOVER = 398;
const FIELD_LIFE_LIMIT_RECOVER = 399;
const FIELD_MANA_SCALE_LIMIT_RECOVER = 400;
const FIELD_LIFE_SCALE_LIMIT_RECOVER = 401;
const FIELD_MAX_ASSIGN_POLAR = 402;
const FIELD_PET_DEF = 403;
const FIELD_UNIDENTIFIED = 404;
const FIELD_ITEM_SELL_VALUE = 406;
const FIELD_ENHANCED_PHY = 405;
const FIELD_PROPERTY_BINDED = 407;
const FIELD_PET_ENCHANT_STATE = 408;
const FIELD_MAX_NIMBUS = 409;
const FIELD_PROPERTY_TIME = 410;
const FIELD_PROPERTY_ID = 411;
const FIELD_PROPERTY_TYPE = 412;
const FIELD_CAPACITY_LEVEL = 413;
const FIELD_MOUNT_CATEGORY = 414;
const FIELD_PET_EVOLVE = 415;
const FIELD_MATCH_ID = 416;
const FIELD_MATCH_RESULT = 417;
const FIELD_LEAGUE_ID = 418;
const FIELD_PROPERTY_ADMIN = 419;
const FIELD_PROPERTY_EXCHANGE = 420;
const FIELD_REBUILD_CUMULATE_RATE = 427;
const FILED_MEDICINE_CLASS = 440;
const FIELD_EQUIP_FAKE = 428;
const FIELD_BASIC_LIFE_SHAPE = 421;
const FIELD_BASIC_MANA_SHAPE = 422;
const FIELD_BASIC_SPEED_SHAPE = 423;
const FIELD_BASIC_PHY_SHAPE = 424;
const FIELD_BASIC_MAG_SHAPE = 425;
const FIELD_BASIC_SHAPE = 426;
const FIELD_TRADING_STATE = 429;
const FIELD_TRADING_LEFT_TIME = 430;
const FIELD_TRADING_PRICE = 431;
const FIELD_TRADING_ORG_PRICE = 432;
const FIELD_EVOLVE_LEVEL = 433;
const FIELD_PARTY_LEVEL = 434;
const FIELD_REGAL = 435;
const FIELD_WAR_VICTORY = 436;
const FIELD_MONEY = 437;
const FIELD_TONGTT_NUM = 438;
const FIELD_TONGTT_TIME = 439;
const FIELD_PARTY_CHANGING_BANGZHU = 441;
const FIELD_PARTY_AVG_SALARY = 442;
const FIELD_PARTY_PAY_RATE = 443;
const FIELD_PERFECT_DEGREE = 444;
const FIELD_QUESTION_COST = 445;
const FIELD_QUESTION_SCORE = 446;
const FIELD_CS_EXCHANGE_POINT = 447;
const FIELD_DURATION = 448;
const FIELD_MIN_REQ_LEVEL = 449;
const FIELD_MAX_REQ_LEVEL = 450;
const FIELD_SCROLL_PHY_POWER = 451;
const FIELD_SCROLL_MAG_POWER = 452;
const FIELD_ADD_SK_LEVEL = 453;
const FIELD_LIMIT_SK_LEVEL = 454;
const FIELD_STR_EFFECT = 455;
const FIELD_DEX_EFFECT = 456;
const FIELD_CHILD_SPEED = 457;
const FIELD_CHILD_CARRIED = 458;
const FIELD_FAKE_SUIT_ICON = 459;
const FIELD_OWNER_NAME = 460;
const FIELD_CHILD_HEALTH = 461;
const FIELD_CHILD_ACTIVATED_GS = 462;
const FIELD_APPELLATION_1 = 463;
const FIELD_APPELLATION_2 = 464;
const FIELD_APPELLATION_3 = 465;
const FIELD_APP_1_LEFT_TIME = 466;
const FIELD_APP_2_LEFT_TIME = 467;
const FIELD_APP_3_LEFT_TIME = 468;
const FIELD_FIGHT_SCORE = 469;
const FIELD_CHILD_ALL_ATTRIB = 491;
const FIELD_CHILD_PHYSIQUE = 492;
const FIELD_CHILD_STR = 493;
const FIELD_CHILD_WISDOM = 494;
const FIELD_CHILD_DEX = 495;
const FIELD_CHILD_MAG_DAMAGE = 496;
const FIELD_CHILD_PHY_DAMAGE = 497;
const FIELD_CHILD_DAMAGE_REDUCE = 498;
const FIELD_CHILD_SUPER_OBSTRUCT = 499;
const FIELD_CHILD_COMBAT_ACTIVITY = 500;
const FIELD_CHILD_REDUCE_MAG = 537;
const FIELD_CHILD_RD_METAL = 538;
const FIELD_CHILD_RD_WOOD = 539;
const FIELD_CHILD_RD_WATER = 540;
const FIELD_CHILD_RD_FIRE = 541;
const FIELD_CHILD_RD_EARTH = 542;
const FIELD_CHILD_IR_ALL = 543;
const FIELD_CHILD_IR_METAL = 544;
const FIELD_CHILD_IR_WOOD = 545;
const FIELD_CHILD_IR_WATER = 546;
const FIELD_CHILD_IR_FIRE = 547;
const FIELD_CHILD_IR_EARTH = 548;
const FIELD_CHILD_PHY_STUNT = 549;
const FIELD_CHILD_MAG_STUNT = 550;
const FIELD_CHILD_IGNORE_DEF = 551;
const FIELD_CHILD_REDUCE_PHY = 552;
const FIELD_CHILD_ANGER = 553;
const FIELD_CHILD_ANGER_DELTA = 554;
const FIELD_CHILD_RR_ANGER = 555;
const FIELD_CHILD_IG_ANGER = 556;
const FIELD_SUB_TYPE = 557;
const FIELD_REQ_CHILD_ANGER = 558;
const FILED_SCROLL_TOTAL_TIMES = 503;
const FILED_SCROLL_FINISHERS = 504;
const FILED_SCROLL_BONUS_TYPE = 505;
const FILED_SCROLL_LEVEL = 506;
const FIELD_BOTTLE_ID = 470;
const FIELD_BOTTLE_TYPE = 471;
const FIELD_BOTTLE_ANONYMOUS = 472;
const FIELD_BOTTLE_RECV_DIST = 473;
const FIELD_BOTTLE_RECV_GID = 474;
const FIELD_BOTTLE_RECV_NAME = 475;
const FIELD_BOTTLE_RECV_LEVEL = 476;
const FIELD_BOTTLE_RECV_POLAR = 477;
const FIELD_BOTTLE_RECV_GENDER = 478;
const FIELD_BOTTLE_RECV_READ = 479;
const FIELD_BOTTLE_RECV_TIME = 480;
const FIELD_BOTTLE_SEND_DIST = 481;
const FIELD_BOTTLE_SEND_GID = 482;
const FIELD_BOTTLE_SEND_NAME = 483;
const FIELD_BOTTLE_SEND_LEVEL = 484;
const FIELD_BOTTLE_SEND_POLAR = 485;
const FIELD_BOTTLE_SEND_GENDER = 486;
const FIELD_BOTTLE_SEND_READ = 487;
const FIELD_BOTTLE_SEND_TIME = 488;
const FIELD_BOTTLE_DESTOY_TIME = 489;
const FIELD_BOTTLE_COMMENTS = 490;
const FIELD_LIGHT = 501;
const FIELD_SUPER_LIGHT = 502;
const FIELD_AMULET = 508;
const FILED_ARENA_VALUE = 507;
const FIELD_SEAL_SKILL = 510;
const FIELD_ARENA_POINT = 511;
const FIELD_ARENA_SCORE = 512;
const FIELD_ARENA_GIFT_POINT = 513;
const FIELD_MOVE_TYPE = 514;
const FIELD_ARENA_LEVEL = 515;
const FIELD_GBG_ID = 516;
const FIELD_GBG_COIN_TYPE = 517;
const FIELD_GBG_ORI_PRICE = 518;
const FIELD_GBG_DIS_PRICE = 519;
const FIELD_GBG_MAX_SINGLE_BUY = 520;
const FIELD_GBG_EFFECT_REQ_BUY = 521;
const FIELD_GBG_ALREADY_BUY = 522;
const FIELD_GBG_MAX_TOTAL_BUY = 523;
const FIELD_GBG_MAX_BUY_USERS = 524;
const FIELD_SCROLL_TYPE = 525;
const FIELD_OPEN_NIMBUS = 526;
const FIELD_VIP_SMS = 527;
const FIELD_VIP_SCORE = 528;
const FIELD_VIP_STATE = 529;
const FIELD_VIP_LEVEL = 530;
const FIELD_VIP_NEXT_SCORE = 531;
const FIELD_CHILD_USE_COMBAT = 532;
const FIELD_CHILD_SCORE_LV = 533;
const FIELD_CHILD_SCORE_SKILL = 534;
const FIELD_CHILD_SCORE_EQUIP = 535;
const FIELD_CHILD_SCORE_BOOK = 536;
const FIELD_PET_MORPH_LIFE_STAT = 559;
const FIELD_PET_MORPH_LIFE_TIMES = 560;
const FIELD_PET_MORPH_MANA_STAT = 561;
const FIELD_PET_MORPH_MANA_TIMES = 562;
const FIELD_PET_MORPH_SPEED_STAT = 563;
const FIELD_PET_MORPH_SPEED_TIMES = 564;
const FIELD_PET_MORPH_PHY_STAT = 565;
const FIELD_PET_MORPH_PHY_TIMES = 566;
const FIELD_PET_MORPH_MAG_STAT = 567;
const FIELD_PET_MORPH_MAG_TIMES = 568;
const FIELD_PET_MAX_MORPH_STAT = 569;
const FIELD_VIP_VALUE = 570;
const FIELD_TRAIN_PROCESS = 571;
const FIELD_KILL_PKERS = 572;
const FIELD_KILL_OFFICERS = 573;
const FIELD_EXTRA_SKILL = 574;
const FIELD_EXTRA_SKILL_COST = 575;
const FIELD_QIANKJ_LEVEL = 576;
const FIELD_ITEM_ALIAS = 577;
const FIELD_LOTTERY_START_DATE = 578;
const FIELD_LOTTERY_END_DATE = 579;
const FIELD_SOUL_COMBAT_RATE = 580;
const FIELD_FINISH_TIANREN_HEYI = 581;
const FIELD_FLY_MOVE_SPEED = 582;
const FIELD_TOTAL_ZHENFA = 584;
const FIELD_JEWELRY_CONVERT_TIMES = 583;
const FIELD_LIMIT_TRADE_COIN = 585;
const FIELD_PROPERTY_LEFT_TIME = 586;
const FIELD_APPOINTER_NAME = 587;
const FIELD_USER_MOOD_NO = 589;
const FIELD_USER_MOOD_DESC = 590;
const FIELD_PET_SKILL_BOOK_TYPE = 588;
const FIELD_JEWELRY_MAX_CONVERT_TIMES = 593;
const FIELD_LIMIT_CAN_EXCHANGE = 595;
const FIELD_TAO_EX = 596;
const FIELD_WARCRAFT_MODE = 591;
const FIELD_WARCRAFT_BET = 592;
const FIELD_LOCK_EXP = 594;
const FIELD_ACHIEVE = 597;
const FIELD_ACHIEVE_NAME = 598;
const FIELD_ACHIEVE_TIME = 599;
const FIELD_TT_WEIBO_NAME = 600;
const FIELD_TT_WEIBO_TOKEN = 601;
const FIELD_ZHENFA_SCHEDULE = 602;
const FIELD_USER_UPGRADE_LEVEL = 604;
const FIELD_WEDDING_ICON = 629;
const FIELD_CHILD_MAG_DAMAGE_MAX = 605;
const FIELD_CHILD_PHY_DAMAGE_MAX = 606;
const FIELD_CHILD_DAMAGE_REDUCE_MAX = 607;
const FIELD_CHILD_PHYSIQUE_MAX = 608;
const FIELD_CHILD_STR_MAX = 609;
const FIELD_CHILD_WISDOM_MAX = 610;
const FIELD_CHILD_DEX_MAX = 611;
const FIELD_CHILD_ALL_ATTRIB_MAX = 612;
const FIELD_CHILD_REDUCE_PHY_MAX = 613;
const FIELD_CHILD_REDUCE_MAG_MAX = 614;
const FIELD_CHILD_RD_METAL_MAX = 615;
const FIELD_CHILD_RD_WOOD_MAX = 616;
const FIELD_CHILD_RD_WATER_MAX = 617;
const FIELD_CHILD_RD_FIRE_MAX = 618;
const FIELD_CHILD_RD_EARTH_MAX = 619;
const FIELD_CHILD_IR_ALL_MAX = 620;
const FIELD_CHILD_IR_METAL_MAX = 621;
const FIELD_CHILD_IR_WOOD_MAX = 622;
const FIELD_CHILD_IR_WATER_MAX = 623;
const FIELD_CHILD_IR_FIRE_MAX = 624;
const FIELD_CHILD_IR_EARTH_MAX = 625;
const FIELD_CHILD_PHY_STUNT_MAX = 626;
const FIELD_CHILD_MAG_STUNT_MAX = 627;
const FIELD_CHILD_IGNORE_DEF_MAX = 628;
const FIELD_ANGER = 630;
const FIELD_MAX_ANGER = 631;
const FIELD_LVUP_TIMES = 632;
const FIELD_EXTRA_SKILL_LEVEL = 633;
const FIELD_ARTIFACT_TYPE = 634;
const FIELD_CHILD_GENDER = 635;
const FIELD_FEIXF = 637;
const FIELD_LAST_LOGOUT_TIME = 638;
const FIELD_PET_DRESS_INVENTORY = 639;
const FIELD_PET_DRESS_ITEM_ICON = 640;
const FIELD_PET_DRESS_ICON = 641;
const FIELD_RECTOPRO_LEFT_TIME = 642;
const FIELD_LIMIT_EXCHANGE_LEFT_TIME = 643;
const FIELD_IMPORTANT_ITEM = 644;
const FIELD_DIANDQK_FROZEN_ROUND = 645;
const FIELD_MERGE_RATE = 646;
const FIELD_HAS_PASSPOD = 647;
const FIELD_ADD_PENNANT_SKILL = 648;
const FIELD_LIANHUN = 649;
const FIELD_MAX_LIANHUN = 650;
const FIELD_PLACE_TYPE = 651;
const FIELD_CUR_ATTRIB_PLAN = 652;
const FIELD_FINISH_YUANSHEN_HETI = 653;
const FIELD_DODGE_EFFECT = 654;
const FIELD_DEFAULT_CAPACITY_LEVEL = 655;
const FIELD_LAST_CHANGE_ATTRIB_TIME = 656;
const FIELD_MAG_STUNT_RATE = 657;
const FIELD_IGNORE_MAG_STUNT_RATE = 658;
const FIELD_MIN_RESONANCE_LEVEL = 659;
const FIELD_MAX_RESONANCE_LEVEL = 660;
const FIELD_ECLOSION_NIMBUS = 661;
const FIELD_MAX_ECLOSION_NIMBUS = 662;
const FIELD_ECLOSION_RANK = 663;
const FIELD_ECLOSION = 664;
const FIELD_RISIST_SHENSZG = 665;
const FIELD_RESIST_YOUSZS = 666;
const FIELD_RESIST_SHEMYJ = 667;
const FIELD_RESIST_FANZQK = 668;
const FIELD_RESIST_MANTXW = 669;
const FIELD_CLIENT_TYPE = 674;
const FIELD_PET_ANGER = 671;
const FIELD_MAX_PET_ANGER = 672;
const FIELD_DUNWU_LEFT_TIMES = 673;
const FIELD_GHOST_PET_TYPE = 675;
const FIELD_QIXJH_ROUND = 676;
const FIELD_QIXJH_TYPE = 677;
const FIELD_QIXJH_TIME = 678;
const FIELD_CHEER = 679;
const FIELD_TRADING_UPSET_PRICE = 680;
const FIELD_TRADING_ORG_UPSET_PRICE = 681;
const FIELD_TITLE_TYPE = 682;
const FIELD_TITLE_TYPE_EFFECT = 683;
const FIELD_ITEM_CUR_EXP = 688;
const FIELD_XIELING = 689;
const FIELD_FISHING_SILVER_SCORE = 690;
const FIELD_FISHING_GOLD_SCORE = 691;
const FIELD_IGNORE_PHY_ABSORB = 692;
const FIELD_RANK_DESC = 693;
const FIELD_LADDER = 694;
const FIELD_BASE_DODGE = 695;
const FIELD_RESIST_REPRESS = 696;
const FIELD_RESIST_MELT = 697;
const FIELD_RESIST_CAGE = 698;
const FIELD_RESIST_LOCK = 699;
const FIELD_RESIST_LOST = 700;
const FIELD_IGNORE_RESIST_REPRESS = 701;
const FIELD_IGNORE_RESIST_MELT = 702;
const FIELD_IGNORE_RESIST_CAGE = 703;
const FIELD_IGNORE_RESIST_LOCK = 704;
const FIELD_IGNORE_RESIST_LOST = 705;
const FIELD_RELEASE_REPRESS = 706;
const FIELD_RELEASE_MELT = 707;
const FIELD_RELEASE_CAGE = 708;
const FIELD_RELEASE_LOCK = 709;
const FIELD_RELEASE_LOST = 710;
const FIELD_SUPER_REPRESS = 711;
const FIELD_SUPER_MELT = 712;
const FIELD_SUPER_CAGE = 713;
const FIELD_SUPER_LOCK = 714;
const FIELD_SUPER_LOST = 715;
const FIELD_RELIGION_CONVERT_TIME = 716;
const FIELD_STUN_IMPR = 717;
const FIELD_RELIGION = 718;
const FIELD_PET_PHY_REBUILD_RATE = 719;
const FIELD_PET_MAG_REBUILD_RATE = 720;
const FIELD_INBORN_STONE_ATTRIB_PVE = 721;
const FIELD_INBORN_STONE_ATTRIB_PVP = 722;
const FIELD_TUNT_NAME = 723;
const FIELD_TUNT_TIME = 724;
const FIELD_FALSE_TAO = 725;
const FIELD_DUNWU_RATE = 726;
const FIELD_RESERVE_END = 727;
const FIELD_MOUNT_CHANGING_ITEM = 728;
const FIELD_MOUNT_CHANGING_END_TIME = 729;
const FIELD_SHID_NAME = 730;
const FIELD_SHID_TIME = 731;
const FIELD_ENERGY = 732;
const FIELD_MAX_ENERGY = 733;
const FIELD_MASTERY_SKILL = 734;
const FIELD_B4_RANGE_1_RATE = 735;
const FIELD_B5_RANGE_1_RATE = 736;
const FIELD_LP_RANGE_1_RATE = 737;
const FIELD_B4_RANGE_2_RATE = 738;
const FIELD_B5_RANGE_2_RATE = 739;
const FIELD_LP_RANGE_2_RATE = 740;
const FIELD_RUNE_BASE_ATTRIB = 741;
const FIELD_RUNE_SUIT_ATTRIB = 742;
const FIELD_B1_RANGE_1_RATE = 743;
const FIELD_B2_RANGE_1_RATE = 744;
const FIELD_B3_RANGE_1_RATE = 745;
const FIELD_B1_RANGE_2_RATE = 746;
const FIELD_B2_RANGE_2_RATE = 747;
const FIELD_B3_RANGE_2_RATE = 748;
const FIELD_EFFECT_FOOT = 749;
const FIELD_CUMULATE = 750;
const FIELD_FORBID_OPER = 751;
const FIELD_FRIEND_SCORE = 752;
const FIELD_HOLE_LEVEL = 753;
const FIELD_PET_XINFA_EXP = 754;
const FILED_SHAPE_UPGRADE = 755;
const FILED_SHAPE_ENCHANT = 756;
const FILED_SHAPE_STRENGTHEN = 757;
const FILED_SHAPE_MORPH = 758;
const FILED_SHAPE_ECLOSION = 759;
const FILED_SHAPE_EVOLVE = 760;
const FIELD_COST_CHILD_ANGER = 761;
const FIELD_SANQINGWAN_EX = 762;
const FIELD_BAOHUA_YULUWAN_EX = 763;
const FIELD_JIUZHUAN_XIANLINGLU_EX = 764;
const FIELD_EXP_EX = 765;
const FIELD_DUNWU_TOTAL_TIMES = 770;
const FILED_GB_CHUQBY = 766;
const FIELD_GB_WUFWT = 767;
const FIELD_GB_FUZZL = 768;
const FIELD_GB_CHONGS = 769;
const FIELD_IS_YEAR_INSIDER = 771;
const FIELD_KUILW_NAME = 772;
const FIELD_KUILW_TIME = 773;
const FIELD_GB_ZHENB_1 = 774;
const FIELD_GB_ZHENB_2 = 775;
const FIELD_GB_ZHENB_3 = 776;
const FIELD_GB_MOB_1 = 777;
const FIELD_GB_MOB_2 = 778;
const FIELD_GB_MOB_3 = 779;
const FIELD_GB_SHENGG_1 = 780;
const FIELD_GB_SHENGG_2 = 781;
const FIELD_GB_SHENGG_3 = 782;
const FIELD_GB_LINGH_1 = 783;
const FIELD_GB_LINGH_2 = 784;
const FIELD_GB_LINGH_3 = 785;
const FIELD_GB_ZHIY_1 = 786;
const FIELD_GB_ZHIY_2 = 787;
const FIELD_GB_ZHIY_3 = 788;
const FIELD_GB_FUZ_1 = 789;
const FIELD_GB_FUZ_2 = 790;
const FIELD_GB_FUZ_3 = 791;
const FIELD_GB_ZHANG_1 = 792;
const FIELD_GB_ZHANG_2 = 793;
const FIELD_GB_ZHANG_3 = 794;
const FIELD_GB_QIANGJ_1 = 795;
const FIELD_GB_QIANGJ_2 = 796;
const FIELD_GB_QIANGJ_3 = 797;
const FIELD_GB_ZHUANZ_1 = 798;
const FIELD_GB_ZHUANZ_2 = 799;
const FIELD_GB_ZHUANZ_3 = 800;
const FIELD_GB_JIS_1 = 801;
const FIELD_GB_JIS_2 = 802;
const FIELD_GB_JIS_3 = 803;
const FIELD_MONTH_TAO = 804;
const FIELD_MONTH_TAO_EX = 805;
const FIELD_WUDAO_STAGE = 806;
const FIELD_LIMIT_PACK = 807;
const FIELD_PET_DRESS_TIME_LIMIT = 808;
const FIELD_MIN_EQUIP_LV = 809;
const FIELD_MAX_EQUIP_LV = 810;
const FIELD_ASSIST_EQUIP = 811;
const FIELD_VIGOUR = 812;
const FIELD_MAX_VIGOUR = 813;
const FIELD_USER_PROVINCE = 814;
const FIELD_USER_CITY = 815;
const FIELD_PROGRESS = 816;
const FIELD_MAX_PROGRESS = 817;
const FIELD_NEW_SKILL_EFFECT = 818;
const FIELD_DUST_CHONGS = 819;
const FIELD_DUST_MIES = 820;
const FIELD_DUST_SHENGG = 821;
const FIELD_RAIN_CHONGS = 822;
const FIELD_RAIN_MIES = 823;
const FIELD_RAIN_ZHENB = 824;
const FIELD_SNOW_CHONGS = 825;
const FIELD_SNOW_MIES = 826;
const FIELD_SNOW_LINGH = 827;
const FIELD_FOG_CHONGS = 828;
const FIELD_FOG_MIES = 829;
const FIELD_FOG_FUZ = 830;
const FIELD_HEAT_CHONGS = 831;
const FIELD_HEAT_MIES = 832;
const FIELD_HEAT_MOB = 833;
const FIELD_USER_REGION_FLAG = 834;
const FIELD_ADD_MOVE_SPEED = 835;
const FIELD_SUPER_EVOLVE_LEVEL = 836;
const FIELD_FIGHT_CAPACITY_VAL = 837;
const FIELD_FIGHT_CAPACITY_LV = 838;
const FIELD_FIGHT_CAPACITY_NEXT_VAL = 840;
const FIELD_GB_JINFR_1 = 841;
const FIELD_GB_JINFR_2 = 842;
const FIELD_GB_JINFR_3 = 843;
const FIELD_GB_JINRH_1 = 844;
const FIELD_GB_JINRH_2 = 845;
const FIELD_GB_JINRH_3 = 846;
const FIELD_GB_JINZY_1 = 847;
const FIELD_GB_JINZY_2 = 848;
const FIELD_GB_JINZY_3 = 849;
const FIELD_GB_JINFZ_1 = 850;
const FIELD_GB_JINFZ_2 = 851;
const FIELD_GB_JINFZ_3 = 852;
const FIELD_GB_JINTY_1 = 853;
const FIELD_GB_JINTY_2 = 854;
const FIELD_GB_JINTY_3 = 855;
const FIELD_SEAL_MOSHI = 856;
const FIELD_SEAL_JINSHEN = 857;
const FIELD_SEAL_SHENYOU = 858;
const FIELD_SEAL_XUESHA = 859;
const FILED_ZUNDAO = 860;
const FIELD_LEAVE_TEMP = 861;
const FIELD_PARTY_TANGKOU_JOB = 862;
const FIELD_DZZB_TYPE = 863;
const FIELD_MIN_DZZB_RATE = 864;
const FIELD_MAX_DZZB_RATE = 865;
const FIELD_FUXI_EXP = 866;
const FIELD_EXTRA_LOYALTY = 867;
const FIELD_MOUNT_ICON = 868;
const FIELD_MOUNT_SHADOW = 869;
const FIELD_MOUNT_SHELTER = 870;
const FIELD_MOUNT_APPEARANCE = 871;
const FIELD_IGNORE_ABSORB = 873;
const FIELD_CHILD_BOOK_DISABLE = 874;
const FIELD_PET_DIE_MONTH = 875;
const FIELD_PET_REVIVE_MONTH = 876;
const FIELD_PARTY_SHS_SCORE = 877;
const FIELD_ADD_PARTY_SHS_SCORE = 878;
const FIELD_NEED_AUTH_PROTECT = 879;
const FIELD_JINJIE_RATE = 880;
const FIELD_BIND_PASSPOD = 886;
const FIELD_TONGYUAN_STATE = 881;
const FIELD_TONGYUAN_LABEL = 882;
const FIELD_ACT_TONGYUAN_NUM = 883;
const FIELD_DCZW_LABEL = 884;
const FIELD_DCZW_LABEL_END_TIME = 885;
const FIELD_PET_CAPCITY_PAY = 887;
const FIELD_EFFECT_HEAD = 888;
const FIELD_PAUSE_UP_LEVEL = 889;
const FIELD_YLZ_NUM = 890;
const FILED_SP_SKILL_NUM = 892;
const FIELD_FALSE_MARTIAL = 903;
const FILED_PET_MASK_COLORS = 902;
const FIELD_GB_BENNLD_1 = 893;
const FIELD_GB_BENNLD_2 = 894;
const FIELD_GB_BENNLD_3 = 895;
const FIELD_GB_BENNHZ_1 = 896;
const FIELD_GB_BENNHZ_2 = 897;
const FIELD_GB_BENNHZ_3 = 898;
const FIELD_GB_BENNCC_1 = 899;
const FIELD_GB_BENNCC_2 = 900;
const FIELD_GB_BENNCC_3 = 901;
const FIELD_TIANYJ_SKILL = 907;
const FIELD_TRANSFER_STATE = 904;
const FIELD_TRANSFER_END_TI = 905;
const FIELD_TRANSFER_DIST = 906;
const FIELD_ZHENXING_MW = 908;
const FILED_GIFT_OPER_TI = 909;
const FIELD_IN_USE = 910;
const FIELD_MAKEUP_CK = 911;
const FIELD_DODGE = 914;
const FIELD_INTIMACY_CUMULATE = 913;
const FILED_PET_DRESS_MASK_COLORS = 915;
const FIELD_QMD_PHY_POWER = 916;
const FIELD_QMD_MAG_POWER = 917;
const FIELD_QMD_DEF = 918;
const FIELD_QMD_REVIVE_RATE = 919;
const FIELD_QMD_REVIVE = 920;
const FIELD_QMD_STUNT_RATE = 921;
const FIELD_QMD_MSTUNT_RATE = 922;
const FIELD_QMD_DOUBLE_HIT_RATE = 923;
const FIELD_UID = 924;
const FIELD_PARTY_SHS_LEVEL = 925;
const FIELD_IN_GAME_LEVELING = 926;
const FIELD_RESTRAINT_TIME = 927;
const FIELD_FAIRY_LINGYUN_LIST = 928;
const FIELD_FAIRY_PROP3_SKILL = 929;
const FIELD_FAIRY_2_TJMY = 930;
const FIELD_FAIRY_2_YYXY = 931;
const FIELD_FAIRY_2_YGMJ = 932;
const FIELD_FAIRY_2_ZWMF = 933;
const FIELD_FAIRY_2_YQJJ = 934;
const FIELD_FAIRY_2_SSMB = 935;
const FIELD_FAIRY_2_JYYX = 936;
const FIELD_FAIRY_3_GLZJ = 937;
const FIELD_FAIRY_3_LQSF = 938;
const FIELD_FAIRY_3_SWSF = 939;
const FIELD_FAIRY_3_JSCX = 940;
const FIELD_FAIRY_3_JSLQ = 941;
const FIELD_REQ_FAIRY_TOTAL_LAYER = 942;
const FIELD_FAIRY_CLASS = 943;
const FIELD_FAIRY_LAYER = 944;
const FIELD_FAIRY_FACTOR_C = 945;
const FIELD_FIGHT_BIND_CAPACITY_LV = 946;
const FIELD_WEDDING_LEVEL = 948;
const FIELD_FAIRY_XL_DUR = 947;
const FIELD_FAIRY_LIJIE = 949;
const FIELD_TASTE = 951;
const FIELD_DRESS_LABEL = 952;
const FIELD_CHAT_SCENES = 953;
const FIELD_CHAT_BUBBLE = 954;
const FILED_COMM_MASK_COLORS = 955;
const FIELD_COUPON_VAL = 957;
const FIELD_CUR_DOUFA = 956;
const FIELD_IN_WUYOU_TAOCAN = 958;
const FIELD_ZHANLI_RATING = 961;
const FIELD_LOCK_TITLE = 974;
const FIELD_TRIGGER_RATE = 980;
const FIELD_JEWELRY_MELT = 981;
const FIELD_SUPPRESS_PET = 985;
const FIELD_PET_PRACTICE_ITEM_LEVEL = 987;
const FIELD_PET_PRACTICE_ITEM_EXP = 988;
const FIELD_PET_PRACTICE_ITEM_MARTIAL = 989;
const FIELD_SEAL_SUIT2 = 990;
const FIELD_IS_NEWHAND_INSTRUCTOR = 991;
const FIELD_HUAXING_ANGER = 992;
const FIELD_MAX_HUAXING_ANGER = 993;
const FIELD_YAOZU_SKILL_CLASS = 994;
const FIELD_ONLINE = 995;
const FIELD_SERVER_NAME = 996;
const FIELD_MAP_NAME = 997;
const FIELD_ENHANCED_MAG = 998;
const FIELD_PHY_EFFECT_INCARNATION = 999;
const FIELD_MAG_EFFECT_INCARNATION = 1e3;
const FIELD_SPEED_EFFECT_INCARNATION = 1001;
const FIELD_DEF_EFFECT_INCARNATION = 1002;
const FIELD_INCARNATION_NAME = 1006;
const FIELD_PERROUND_TRANSFORM_REDUCE = 1003;
const FIELD_PERROUND_TRANSFORM_ADD = 1004;
const FIELD_FIRST_ROUND_TRANSFORM = 1005;
const FIELD_GOLDFINGER_POINT = 1007;
const FIELD_GOLDFINGER_ENABLE = 1008;
const FIELD_ORG_WEAPON_TYPE = 1009;
const FILED_RANDOM_ATTRIB = 1013;
const FILED_ASSIST_EXP = 1014;
const FIELD_EXTRA_MAX = 1010;
const FIELD_EXTRA_MIN = 1011;
const FIELD_EXTRA_AVG = 1012;
const FIELD_IN_EFFECT = 1015;
const FIELD_XXBJ_BYXS = 1016;
const FIELD_XXBJ_HDJH = 1017;
const FIELD_XXBJ_YYJH = 1018;
const FIELD_XXBJ_SMJH = 1019;
const FIELD_XXBJ_SXJH = 1020;
const FIELD_ALIAS_NAME = 1021;
const FIELD_STAR_SHIP_NAME = 1023;
const FIELD_STAR_SHIP_LEVEL = 1024;
const FIELD_STAR_SHIP_LEVEL_UT = 1025;
const FIELD_STAR_SHIP_ZCCZ = 1026;
const FIELD_STAR_SHIP_ZCSL = 1027;
const FIELD_STAR_SHIP_YSJS = 1028;
const FIELD_STAR_SHIP_YSJS_UT = 1029;
const FIELD_STAR_SHIP_CONTRIB = 1032;
const FIELD_STAR_SHIP_CAPTAIN = 1033;
const FIELD_IID = 1030;
const FIELD_ADVENTURE_DRAW_TI = 1031;
const FIELD_LIUGUANG_TYPE = 1037;
const FIELD_INCARNATION_IID = 986;
const FIELD_FINISH_ZHIYFH = 1040;
const FIELD_MN_PARA_X = 1041;
const FIELD_MN_PARA_Y = 1042;
const FIELD_OBSTACLE_DODGE = 1047;
const FIELD_DAOWEN_RATE = 1048;
const FIELD_IGNORE_COUNTER_ATTACK = 1049;
const FIELD_IGNORE_DAMAGE_SEL_RATE = 1050;
const FIELD_D_SKILL_EFFECT = 1051;
const FIELD_MASTER_CON = 1052;
const FIELD_MASTER_WIZ = 1053;
const FIELD_MASTER_DEX = 1054;
const FIELD_MASTER_STR = 1055;
const FIELD_MASTER_RESIST_EXCEPT = 1056;
const FIELD_MASTER_IGNORE_RESIST_POLAR = 1057;
const FIELD_MASTER_DOUBLE_HIT = 1058;
const FIELD_MASTER_STUNT = 1059;
const FIELD_MASTER_PENETRATE = 1060;
const FIELD_RELEASE_OBSTACLE = 1061;
const FIELD_NEW_ITEM = 1062;
const FIELD_RARE = 1063;
const FIELD_LOGIN_REGION = 1069;
const FIELD_WEDDING_RELIGION = 1070;
const FIELD_ACHIEVE_WEIMING = 1071;
const FIELD_BIAH_ATTRIB = 1073;
const FIELD_DAOWEN_LOCKED = 1072;

const FALSE = 0;
const TRUE = 1;

const  CAPACITY_LEVEL_0 = 0;
const  CAPACITY_LEVEL_E = 1;
const  CAPACITY_LEVEL_D = 2;
const  CAPACITY_LEVEL_C = 3;
const  CAPACITY_LEVEL_B = 4;
const  CAPACITY_LEVEL_A = 5;
const  CAPACITY_LEVEL_S = 6;
const  CAPACITY_LEVEL_S_PLUS = 7;
const  CAPACITY_LEVEL_SS = 8;
const  CAPACITY_LEVEL_SS_PLUS = 9;
const  CAPACITY_LEVEL_SSS = 10;
const  CAPACITY_RATE_PLAYER = 1;
const  CAPACITY_RATE_PET = 2;