import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * 2020/8/22 17:20 全局布局配置
     * 注意：其它属性布局为 `fashion` 才生效，
     * 此配置不可删除，否是页面可能出现未知异常。
     */
    layoutConfig: {
      isBreadcrumb: true, // 是否开启 Breadcrumb
      isTagsView: true, // 是否开启 Tags-View
      isFixedHead: false, // 是否固定 Header
      isLogo: false, // 是否侧边栏 Logo
      isCollapse: false, // 是否折叠导航菜单
      isUniqueOpened: false, // 是否只保持一个子菜单的展开
      isUserPhoto: true, // 是否显示登录用户头像
      layout: "fashion", // 切换布局：1、 classic 经典布局 2、 fashion 时尚布局 3、 elegant 典雅布局 4、 strange 怪异布局
      layoutLoading: false, // 切换布局时的 loading
      loadingTimer: 700, // 切换布局时的 loading 时间
      subMenuTheme: 'dark', // 菜单主题颜色 1、 dark 暗色  2、 light 亮色
      isSplitMenu: false, // 自动菜单分割(仅 classic 经典布局生效)
    },
  },
  mutations: {
    // 触发 layoutConfig 配置更新
    getLayoutConfig(state, res) {
      state.layoutConfig = res;
    },
  },
  actions: {
    // 触发 layoutConfig 配置更新
    setLayoutConfig({
      commit
    }, res) {
      commit("getLayoutConfig", res);
    },
  },
  modules: {},
});