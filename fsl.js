FslMgr: [
    function (t, e) {
      "use strict";
      cc._RF.push(e, "4c7e5jRmYpJVJ9UiEbgL5IF", "FslMgr");
      var n = t("FslLayer"),
        i = t("FslHuaShenLayer"),
        s = t("FslDrawLayer");
      e.exports = {
        init: function () {
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_OVERVIEW_INFO,
            this,
            this.onMsgFslOverviewInfo
          );
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_INCARNATION_INFO,
            this,
            this.onMsgFslIncarnationInfo
          );
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_DELETE_INCARNATION,
            this,
            this.onMsgFslDeleteIncarnation
          );
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_FRAGMENT_INFO,
            this,
            this.onMsgFslFragmentInfo
          );
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_INCANATION_ATTRIB,
            this,
            this.onMsgFslIncanationAttrib
          );
          Communicate.registerCallback(
            MsgDefines.MSG_FSL_DRAW_INCARNATION_INFO,
            this,
            this.onMsgFslDrawIncarnationInfo
          );
          this.m_suiPian = 0;
          this.m_huaShen = [];
          this.m_ownSkill = [];
          this.m_incarnationAttrib = [];
          this.m_basicAttribState = new UtilMapping();
          this.m_ownAttrib = new UtilMapping();
          this.m_ownHuaShen = [];
          this.m_maxFriendRate = {};
          this.m_willOpenLayer = "";
          this.initFslData();
        },
        initFslData: function () {
          var t = this;
          gfLoadJson("FslInfo", function (e) {
            var n = function (t) {
              var n = new UtilMapping(),
                i = e[t];
              if (null != i) for (var s in i) n.set(s, i[s]);
              return n;
            };
            t.m_series = n("Series");
            t.m_polar = n("Polar");
            t.m_seriesImg = n("SeriesImg");
            t.m_pianXiangImg = n("PianXiangImg");
            t.m_allAttrib = n("Attrib");
            t.m_starBackImg = n("StarBackImg");
            t.m_attribTranslate = n("AttribTranslate");
            t.m_skillName = n("FslSkill");
            t.m_seriesToSkill = n("SeriesToSkill");
            t.m_charImg = n("CharImg");
            t.initHuaShen();
          });
        },
        initHuaShen: function () {
          var t = this;
          t.m_huaShen = [];
          gfLoadList("incarnation", function (e) {
            for (var n = e.length, i = 0; i < n; ++i) {
              var s = e[i];
              if (null != s) {
                var r = s.query("attrib");
                if (r.length > 2) {
                  r = r.slice(1, r.length - 1);
                  s.set("attrib", r);
                }
                s.set(
                  "polar_cn",
                  null != t.m_polar ? t.m_polar.query(s.query("polar")) : ""
                );
                s.set(
                  "attrib_cn",
                  null != t.m_attribTranslate
                    ? t.m_attribTranslate.query(r)
                    : ""
                );
                s.set(
                  "series_cn",
                  null != t.m_series
                    ? t.m_series.query(s.query("series"))
                    : ""
                );
                t.m_huaShen.push(s);
              }
            }
            gfStableSort(t.m_huaShen, function (t, e) {
              return e.queryInt("level") - t.queryInt("level");
            });
          });
        },
        getAttribTranslate: function (t) {
          return null != this.m_attribTranslate
            ? this.m_attribTranslate.query(t)
            : "";
        },
        getHuaShenFixedInfo: function (t) {
          for (var e = this.m_huaShen.length, n = 0; n < e; ++n) {
            var i = this.m_huaShen[n];
            if (null != i && i.query("name") == t) return i;
          }
          return null;
        },
        getMaxIntimacy: function (t) {
          if (null == t) return 0;
          var e = t.indexOf(TxtRes(1034020));
          -1 != e && (t = t.slice(0, e));
          var n = this.getHuaShenFixedInfo(t);
          if (null == n) return 0;
          switch (n.queryInt("level")) {
            case 1:
              return 15e4;

            case 2:
              return 1e6;

            case 3:
              return 685e4;

            case 4:
              return 228e5;

            case 5:
              return 618e5;

            default:
              return 0;
          }
        },
        getAttribDesc: function (t, e) {
          return "all_attrib" == t ||
            "all_polar" == t ||
            "mag_power" == t ||
            "speed" == t ||
            "def" == t ||
            "max_life" == t ||
            "phy_power" == t ||
            "base_dodge" == t
            ? e.toString()
            : e.toString() + "%";
        },
        clearIncarnationAttrib: function () {
          this.m_incarnationAttrib = [];
        },
        findIncarnationAttrib: function (t, e) {
          if (null == t || null == e) return null;
          for (var n = this.m_incarnationAttrib.length, i = 0; i < n; ++i) {
            var s = this.m_incarnationAttrib[i];
            if (s.name == t && s.intimacy == e) return s;
          }
          return null;
        },
        getIncarnationAttrib: function (t, e) {
          if (null == t) return null;
          var n = this.findIncarnationAttrib(t, e);
          if (null != n) return n;
          var i = t.indexOf(TxtRes(1034020)),
            s = new UtilMapping();
          s.set("type", 1);
          s.set("name", -1 != i ? t.slice(0, i) : t);
          s.set("intimacy", e);
          Communicate.cmdToServer(
            MsgDefines.CMD_FSL_CALC_INCARNATION_ATTRIB,
            s
          );
          this.m_incarnationAttrib.push({
            name: t,
            intimacy: e,
            attrib: "",
            basic: 0,
            guard: 0,
          });
          return null;
        },
        updateIncarnationAttrib: function (t) {
          if (1 == t.queryInt("type")) {
            var e = this.findIncarnationAttrib(
              t.query("name") + TxtRes(1034020),
              t.queryInt("intimacy")
            );
            if (null != e) {
              e.prop = t.query("attrib");
              e.basic = t.queryInt("basic_value");
              e.guard = t.queryInt("guard_value");
            }
            var n = InfoShowDlg.getNode();
            null != n &&
              n.isValid &&
              n.getComponent("InfoShowLayer").refreshShow();
          }
        },
        getOwnSkillByNo: function (t) {
          for (var e = this.m_ownSkill.length, n = 0; n < e; ++n)
            if (
              null != this.m_ownSkill[n] &&
              this.m_ownSkill[n].queryInt("skill_no") == t
            )
              return this.m_ownSkill[n];
          return null;
        },
        clearOwnHuaShen: function () {
          this.m_ownHuaShen = [];
          this.m_maxFriendRate = {};
        },
        addOwnHuaShen: function (t) {
          if (null != t) {
            for (
              var e = 0, n = t.query("iid"), i = this.m_ownHuaShen.length;
              e < i && this.m_ownHuaShen[e].query("iid") != n;
              ++e
            );
            var s = this.getHuaShenFixedInfo(t.query("name"));
            null != s && t.absorbFields(s);
            t.set("attrib_cn", this.getAttribTranslate(t.query("attrib")));
            var r = t.queryInt("max_friendly");
            0 != r &&
              t.set(
                "friendly_rate",
                Math.trunc((100 * t.queryInt("friendly")) / r)
              );
            if (e < i) {
              this.m_ownHuaShen[e].cleanup();
              this.m_ownHuaShen[e].absorbFields(t);
            } else {
              var _ = new UtilMapping();
              _.absorbFields(t);
              this.m_ownHuaShen.push(_);
            }
          }
        },
        deleteOwnHuaShen: function (t) {
          for (var e = this.m_ownHuaShen.length, n = 0; n < e; ++n)
            if (this.m_ownHuaShen[n].query("iid") == t) {
              this.m_ownHuaShen.splice(n, 1);
              break;
            }
          null != i.instance && i.instance.deleteHuaShen(t);
        },
        getOwnHuaShen: function (t) {
          for (var e = this.m_ownHuaShen.length, n = 0; n < e; ++n)
            if (this.m_ownHuaShen[n].query("iid") == t)
              return this.m_ownHuaShen[n];
          return null;
        },
        onMsgFslOverviewInfo: function (t) {
          this.m_basicAttribState.cleanup();
          this.m_basicAttribState.absorbFields(t.basic_attrib_state);
          this.m_ownAttrib.cleanup();
          this.m_ownAttrib.absorbFields(t.properties);
          this.m_ownSkill = t.skill;
          null != n.instance && n.instance.refresh();
        },
        onMsgFslIncarnationInfo: function (t) {
          t.refresh_all && this.clearOwnHuaShen();
          for (var e = t.count, s = 0; s < e; ++s) this.addOwnHuaShen(t[s]);
          gfStableSort(this.m_ownHuaShen, function (t, e) {
            var n = t.queryInt("level"),
              i = e.queryInt("level");
            if (n != i) return i - n;
            var s = t.query("name"),
              r = e.query("name");
            return s != r
              ? GBK.encode(s) < GBK.encode(r)
                ? 1
                : -1
              : e.queryInt("friendly_rate") - t.queryInt("friendly_rate");
          });
          if (null != i.instance) i.instance.refreshHuaShen(t);
          else if ("FslHuaShenLayer" == this.m_willOpenLayer) {
            this.m_willOpenLayer = "";
            null != n.instance && n.instance.addHuaShenLayer();
          }
        },
        onMsgFslDeleteIncarnation: function (t) {
          for (var e = t.length, n = 0; n < e; ++n)
            this.deleteOwnHuaShen(t[n]);
        },
        onMsgFslFragmentInfo: function (t) {
          this.m_suiPian = t.queryInt("sui_pian");
          null != i.instance && i.instance.setSuiPian();
          null != s.instance && s.instance.setCostType();
        },
        onMsgFslIncanationAttrib: function (t) {
          this.updateIncarnationAttrib(t);
        },
        onMsgFslDrawIncarnationInfo: function (e) {
          t("FslDrawResultLayer").show(function (t) {
            t.setData(e);
          });
        },
      };
      cc._RF.pop();
    },
    {
      FslDrawLayer: "FslDrawLayer",
      FslDrawResultLayer: "FslDrawResultLayer",
      FslHuaShenLayer: "FslHuaShenLayer",
      FslLayer: "FslLayer",
    },
  ]