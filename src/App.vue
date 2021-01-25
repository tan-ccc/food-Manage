<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getSession } from "@/utils/storage";
import { setIconfont } from "@/utils/setIconfont.js";
export default {
  name: "App",
  mounted() {
    this.initSetIconfont();
    this.initSession();
  },
  methods: {
    // 设置批量第三方 icon 图标
    initSetIconfont() {
      setIconfont();
    },
    // 初始化系统布局配置，防止刷新的时候恢复默认状态
    initSession() {
      if (getSession("layoutConfig")) {
        this.$store.dispatch("setLayoutConfig", getSession("layoutConfig"));
      }
    },
  },
};
</script>