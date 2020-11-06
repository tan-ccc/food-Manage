<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "publics",
  data() {
    return {
      key: "",
    };
  },
  created() {
    this.bus.$on("refreshCurrentPage", (path) => {
      let t = new Date().getTime();
      this.key = t;
      this.$router.push({ path, query: { t } });
    });
  },
};
</script>
