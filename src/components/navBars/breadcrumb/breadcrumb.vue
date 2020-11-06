<template>
  <div class="navbar-left">
    <template v-if="layouts.layout === 'classic'">
      <div class="logo" @click="onCollapseClick">
        <img src="@/assets/images/logo.svg" />
      </div>
      <SubMenuSplitClassic v-if="layouts.isSplitMenu" />
    </template>
    <template v-if="isFashionOrStrange()">
      <i :class="layouts.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="onCollapseClick"></i>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
            <span v-if="index == levelList.length - 1">{{
              item.meta.title
            }}</span>
            <a v-else @click.prevent="onHandleLink(item)">{{
              item.meta.title
            }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { setSession } from "@/utils/storage";
import SubMenuSplitClassic from "@/components/navBars/subMenuSplit/subMenuSplitClassic";
export default {
  name: "breadcrumb",
  components: { SubMenuSplitClassic },
  data() {
    return {
      levelList: null,
      layouts: {},
    };
  },
  computed: {
    ...mapState(["layoutConfig"]),
  },
  mounted() {
    this.layouts = this.layoutConfig;
  },
  methods: {
    ...mapActions(["setLayoutConfig"]),
    // 展开/收起左侧菜单
    onCollapseClick() {
      this.layouts.isCollapse = !this.layouts.isCollapse;
      setSession("layoutConfig", this.layouts);
      this.setLayoutConfig(this.layouts);
    },
    // 顶部 `breadcrumb 面包屑`，当为 `fashion 时尚布局` 或者 `strange 怪异布局` 时显示
    isFashionOrStrange() {
      return (
        (this.layouts.isBreadcrumb && this.layouts.layout === "fashion") ||
        (this.layouts.isBreadcrumb && this.layouts.layout === "strange")
      );
    },
    // 顶部 `breadcrumb 面包屑` 数组获取
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      this.levelList = matched.filter((item) => item.meta && item.meta.title);
    },
    // 顶部 `breadcrumb 面包屑` 点击
    onHandleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
  },
  watch: {
    // 监听路由变化，改变顶部 `breadcrumb 面包屑` 数组内容
    $route: {
      handler() {
        this.getBreadcrumb();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-left {
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  .logo {
    width: 210px;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  i {
    font-size: 20px;
    cursor: pointer;
    margin-right: 15px;
    margin-left: 15px;
  }
}
</style>