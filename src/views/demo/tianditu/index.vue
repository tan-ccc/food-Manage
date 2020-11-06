<template>
  <div class="tianditu-warp" :style="styleHeight">
    <div id="tianditu"></div>
  </div>
</template>

<script>
export default {
  name: 'tiandituWarp',
  data() {
    return {
      maps: {
        map: null,
        zoom: 12
      }
    }
  },
  computed: {
    // 动态高度，适配各布局。单页面的画，高度设为100%即可。
    styleHeight() {
      let { layout, isTagsView } = this.$store.state.layoutConfig;
      if (layout === 'fashion' || layout === 'strange') {
        if (isTagsView) {
          return {
            height: `calc(100vh - 114px)`
          }
        } else {
          return {
            height: `calc(100vh - 80px)`
          }
        }
      } else {
        return {
          height: `calc(100vh - 80px)`
        }
      }
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    // 初始化天地图
    initMap() {
      this.maps.map = new T.Map('tianditu');
      this.maps.map.centerAndZoom(new T.LngLat(113.85755, 22.5786), this.maps.zoom);
      this.maps.map.addControl(new T.Control.MapType());
      const zoom = new T.Control.Zoom();
      zoom.setPosition(T_ANCHOR_BOTTOM_RIGHT);
      this.maps.map.addControl(zoom);
      this.addInfoWindow();
    },
    // 添加信息窗口
    addInfoWindow() {
      const marker = new T.Marker(new T.LngLat(113.85755, 22.5786));
      this.maps.map.addOverLay(marker);
      marker.addEventListener("click", function () {
        marker.openInfoWindow(new T.InfoWindow("广东省深圳市宝安区新湾路301-14号"));
      });
    }
  }
}
</script>

<style scoped lang="scss">
.tianditu-warp {
  border-radius: 0px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  #tianditu {
    width: 100%;
    height: 100%;
  }
}
</style>