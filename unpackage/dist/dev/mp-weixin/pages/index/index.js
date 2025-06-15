"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      testing: false,
      totalTests: 0,
      bestScore: 0,
      testItems: [
        {
          id: 1,
          name: "CPU",
          icon: "⚡",
          color: "#FF6B6B"
        },
        {
          id: 2,
          name: "GPU",
          icon: "🎮",
          color: "#4ECDC4"
        },
        {
          id: 3,
          name: "内存",
          icon: "💾",
          color: "#45B7D1"
        },
        {
          id: 4,
          name: "存储",
          icon: "💿",
          color: "#96CEB4"
        }
      ]
    };
  },
  onLoad() {
    this.loadHistory();
  },
  onShow() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      const history = common_vendor.index.getStorageSync("test_history") || [];
      this.totalTests = history.length;
      if (history.length > 0) {
        this.bestScore = Math.max(...history.map((item) => item.totalScore));
      }
    },
    startTest() {
      if (this.testing)
        return;
      this.testing = true;
      common_vendor.index.showLoading({
        title: "准备测试中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        this.testing = false;
        common_vendor.index.navigateTo({
          url: "/pages/testing/testing"
        });
      }, 1e3);
    },
    viewHistory() {
      const history = common_vendor.index.getStorageSync("test_history") || [];
      if (history.length === 0) {
        common_vendor.index.showToast({
          title: "暂无历史记录",
          icon: "none"
        });
        return;
      }
      const historyText = history.slice(-5).reverse().map((item, index) => {
        const date = new Date(item.timestamp).toLocaleString();
        return `第${history.length - index}次: ${item.totalScore}分 (${date})`;
      }).join("\n");
      common_vendor.index.showModal({
        title: "最近5次测试记录",
        content: historyText,
        showCancel: false
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.t($data.totalTests),
    c: common_vendor.t($data.bestScore),
    d: common_vendor.f($data.testItems, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: item.color,
        c: common_vendor.t(item.name),
        d: item.id
      };
    }),
    e: common_vendor.t($data.testing ? "测试中..." : "开始跑分"),
    f: common_vendor.o((...args) => $options.startTest && $options.startTest(...args)),
    g: $data.testing,
    h: common_vendor.o((...args) => $options.viewHistory && $options.viewHistory(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
