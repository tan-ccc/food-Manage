<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getSession } from "@/utils/storage";
export default {
  name: "App",
  mounted() {
    this.initSession();
  },
  methods: {
    // 初始化系统布局配置，防止刷新的时候恢复默认状态
    initSession() {
      if (getSession("layoutConfig")) {
        this.$store.dispatch("setLayoutConfig", getSession("layoutConfig"));
      }
    },
  },
};
</script>