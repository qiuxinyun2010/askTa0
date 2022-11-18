exports.UtilMapping = class {
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
};
function gfToNumber(t) {
    if (null == t) return 0;
    if ("string" == typeof t) {
      for (var e = 0; e < t.length && "0" == t[e]; ++e);
      t = t.substring(e);
    }
    var n = Number(t);
    return isNaN(n) ? 0 : n;
  }