<template>
  <div class="docs">
    <div class="flex-warp">
      <div class="flex-warp-item" v-for="(v,k) in docList" :key="k" @click="onOpenLink(v)">
        <div class="flex-warp-item-box">
          <figure :class="v.animation">
            <img :src="v.url" />
            <figcaption :style="{'background': v.bg}">
              <h3>{{v.title}}</h3>
              <p>{{v.msg}}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "docs",
  data() {
    return {
      docList: [
        {
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2108698128,1973909400&fm=26&gp=0.jpg",
          title: "Vue.js",
          msg: "渐进式 JavaScript 框架",
          bg: "#03BF82",
          animation: "figure-fold-up",
          link: "https://cn.vuejs.org/v2/guide/",
        },
        {
          url:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194472908,169836920&fm=26&gp=0.jpg",
          title: "Vue 3.0.js",
          msg: "Vue 组合式 API 手册",
          bg: "#EE9723",
          animation: "figure-fold-right",
          link: "https://v3.vuejs.org/guide/instance.html#data-and-methods",
        },
        {
          url:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1362472642,3897454152&fm=11&gp=0.jpg",
          title: "Element",
          msg: "Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库",
          bg: "#3bb1ff",
          animation: "figure-fold-down",
          link: "https://element.eleme.cn/#/zh-CN/component/installation",
        },
        {
          url:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2117684592,2486658883&fm=26&gp=0.jpg",
          title: "Echarts",
          msg: "千万数据的前端展现",
          bg: "#46718D",
          animation: "figure-fold-left",
          link:
            "https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all",
        },
        {
          url: "https://www.68design.net/img/logo.png",
          title: "68Design",
          msg: "设计师接单平台",
          bg: "#0DA056",
          animation: "figure-fold-up",
          link: "https://www.68design.net/work/735272",
        },
        {
          url:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2009098085,3306645790&fm=26&gp=0.jpg",
          title: "在线ps软件",
          msg: "在线制作编辑图片ps精简版",
          bg: "#22CBDA",
          animation: "figure-fold-right",
          link: "https://www.uupoop.com/",
        },
        {
          url:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4223796494,866841805&fm=26&gp=0.jpg",
          title: "Node.js",
          msg: "Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。",
          bg: "#8CC84C",
          animation: "figure-fold-down",
          link: "http://nodejs.cn/learn",
        },
        {
          url:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=911206721,762108725&fm=26&gp=0.jpg",
          title: "React",
          msg: "用于构建用户界面的 JavaScript 库",
          bg: "#5BCBEA",
          animation: "figure-fold-left",
          link: "https://react.docschina.org/",
        },
        {
          url:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1529412836,2831265598&fm=26&gp=0.jpg",
          title: "uni-app",
          msg: "一个使用 Vue.js 开发跨平台应用的前端框架",
          bg: "#BF573E",
          animation: "figure-fold-up",
          link: "https://uniapp.dcloud.io/",
        },
        {
          url:
            "https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/5ab8e230-77fe-11ea-b35c-1dbe44a1237e_0.png?v=1599491160",
          title: "uView UI",
          msg:
            "多平台快速开发的UI框架，是uni-app生态最优秀的UI框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水。",
          bg: "#5BC1FF",
          animation: "figure-fold-right",
          link: "https://www.uviewui.com/",
        },
        {
          url:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3426523981,2308886724&fm=26&gp=0.jpg",
          title: "mavon-editor",
          msg: "基于Vue的markdown编辑器",
          bg: "#F85013",
          animation: "figure-fold-down",
          link: "https://www.npmjs.com/package/mavon-editor",
        },
        {
          url: "https://xuliangzhan_admin.gitee.io/vxe-table/logo.png",
          title: "vxe-table",
          msg: "一个全功能的 Vue 表格，满足绝大部分对 Table 的一切需求，与任意组件库完美兼容",
          bg: "#4FC921",
          animation: "figure-fold-down",
          link: "https://gitee.com/xuliangzhan_admin/vxe-table",
        },
      ],
    };
  },
  methods: {
    // 打开链接
    onOpenLink(v) {
      window.open(v.link);
    },
  },
};
</script>

<style scoped lang="scss">
.docs {
  .flex-warp {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;
    .flex-warp-item {
      padding: 5px;
      width: 20%;
      height: 188px;
      cursor: pointer;
      .flex-warp-item-box {
        width: 100%;
        height: 100%;
        background-color: rgba(1, 87, 155, 0.75);
        border-radius: 2px;
        overflow: hidden;
        [class^="figure-"] {
          position: relative;
          display: inline-block;
          margin: 0px;
          max-width: 100%;
          color: #fff;
          overflow: hidden;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        [class^="figure-"] figcaption {
          background-color: inherit;
          padding: 30px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
        [class^="figure-"] * {
          box-sizing: border-box;
          transition: all 0.3s ease-in-out;
        }
        [class^="figure-fold"] {
          perspective: 50em;
        }
        [class^="figure-fold"] img {
          transform-origin: 50% 0%;
        }
        [class^="figure-fold"] figcaption {
          z-index: 1;
          opacity: 0;
        }
        [class^="figure-fold"]:hover img {
          opacity: 0;
          transition-delay: 0;
        }
        [class^="figure-fold"]:hover figcaption {
          transform: rotateX(0deg) translate3d(0, 0%, 0) scale(1);
          opacity: 1;
          transition-delay: 0.2s;
        }
        .figure-fold-up,
        .figure-fold-right,
        .figure-fold-down,
        .figure-fold-left {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
          h3 {
            margin-bottom: 15px;
          }
        }
        /* figure-fold-up */
        .figure-fold-up img {
          transform-origin: 50% 0%;
        }
        .figure-fold-up figcaption {
          transform: rotateX(-90deg) translate3d(0%, -50%, 0) scale(0.6);
          transform-origin: 50% 100%;
        }
        .figure-fold-up:hover img {
          transform: rotateX(90deg) scale(0.6) translateY(50%);
        }
        /* figure-fold-righ */
        .figure-fold-right {
          perspective: 50em;
        }
        .figure-fold-right img {
          transform-origin: 100% 50%;
        }
        .figure-fold-right figcaption {
          transform: rotateY(-90deg) translate3d(50%, 0%, 0) scale(0.6);
          transform-origin: 0 50%;
        }
        .figure-fold-right:hover > img {
          transform: rotateY(90deg) scale(0.6) translateX(-50%);
        }
        /* figure-fold-down */
        .figure-fold-down img {
          transform-origin: 50% 100%;
        }
        .figure-fold-down figcaption {
          transform: rotateX(90deg) translate3d(0%, 50%, 0) scale(0.6);
          transform-origin: 50% 0%;
        }
        .figure-fold-down:hover img {
          transform: rotateX(-90deg) scale(0.6) translateY(-50%);
        }
        /* figure-fold-left */
        .figure-fold-left img {
          transform-origin: 0% 50%;
        }
        .figure-fold-left figcaption {
          transform: rotateY(90deg) translate3d(-50%, 0%, 0) scale(0.6);
          transform-origin: 100% 50%;
        }
        .figure-fold-left:hover img {
          transform: rotateY(-90deg) scale(0.6) translateX(50%);
        }
      }
    }
  }
}
</style>