"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      result: {
        timestamp: Date.now(),
        cpuScore: 0,
        gpuScore: 0,
        memoryScore: 0,
        storageScore: 0,
        totalScore: 0,
        duration: 0
      },
      maxScore: 8e3
    };
  },
  computed: {
    scoreItems() {
      return [
        {
          name: "CPU性能",
          icon: "⚡",
          color: "#FF6B6B",
          score: this.result.cpuScore
        },
        {
          name: "GPU性能",
          icon: "🎮",
          color: "#4ECDC4",
          score: this.result.gpuScore
        },
        {
          name: "内存性能",
          icon: "💾",
          color: "#45B7D1",
          score: this.result.memoryScore
        },
        {
          name: "存储性能",
          icon: "💿",
          color: "#96CEB4",
          score: this.result.storageScore
        }
      ];
    },
    performanceLevel() {
      const score = this.result.totalScore;
      if (score >= 18e3) {
        return {
          text: "顶级性能",
          description: "哪来的三体科技？",
          color: "#FF6B6B"
        };
      } else if (score >= 12e3) {
        return {
          text: "高端性能",
          description: "非常优秀的性能，可以借我打游戏吗？",
          color: "#4ECDC4"
        };
      } else if (score >= 8e3) {
        return {
          text: "中高端性能",
          description: "性能表现良好，可以满足日常使用需求",
          color: "#45B7D1"
        };
      } else if (score >= 5e3) {
        return {
          text: "中端性能",
          description: "性能OK，可以满足日常使用需求",
          color: "#96CEB4"
        };
      } else if (score >= 3e3) {
        return {
          text: "入门性能",
          description: "平常刷刷视频，看看小说还是不错的",
          color: "#F39C12"
        };
      } else {
        return {
          text: "较低性能",
          description: "建议换锅碗瓢盆",
          color: "#BDC3C7"
        };
      }
    }
  },
  onLoad(options) {
    if (options.result) {
      try {
        this.result = JSON.parse(decodeURIComponent(options.result));
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/result/result.vue:146", "解析测试结果失败:", e);
        this.backHome();
      }
    }
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    },
    shareResult() {
      const shareText = `我在【跑个分】测试中获得了 ${this.result.totalScore} 分！
CPU: ${this.result.cpuScore}分
GPU: ${this.result.gpuScore}分
内存: ${this.result.memoryScore}分
存储: ${this.result.storageScore}分
性能等级: ${this.performanceLevel.text}`;
      common_vendor.index.setClipboardData({
        data: shareText,
        success: () => {
          common_vendor.index.showToast({
            title: "结果已复制到剪贴板",
            icon: "success"
          });
        }
      });
    },
    testAgain() {
      common_vendor.index.showModal({
        title: "确认重新测试",
        content: "是否要进行新的性能测试？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.redirectTo({
              url: "/pages/testing/testing"
            });
          }
        }
      });
    },
    backHome() {
      common_vendor.index.switchTab ? common_vendor.index.switchTab({
        url: "/pages/index/index"
      }) : common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.result.totalScore),
    b: common_vendor.t($options.performanceLevel.text),
    c: common_vendor.t($options.performanceLevel.description),
    d: common_vendor.t($data.result.duration),
    e: common_vendor.t($options.formatDate($data.result.timestamp)),
    f: common_vendor.f($options.scoreItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.icon),
        b: item.color,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.score),
        e: item.score / $data.maxScore * 100 + "%",
        f: item.color,
        g: index
      };
    }),
    g: common_vendor.o((...args) => $options.shareResult && $options.shareResult(...args)),
    h: common_vendor.o((...args) => $options.testAgain && $options.testAgain(...args)),
    i: common_vendor.o((...args) => $options.backHome && $options.backHome(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/result/result.js.map
