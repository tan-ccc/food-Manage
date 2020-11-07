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
      this.key = new Date().getTime();
    });
  },
};
</script>
