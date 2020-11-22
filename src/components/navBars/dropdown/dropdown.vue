<template>
  <div class="navbar-right">
    <i class="el-icon-setting icon" title="全局配置" @click="$refs.dropdownDrawer.openDrawer()"></i>
    <div @mouseenter="$refs.dropdownNews.open()" @mouseleave="$refs.dropdownNews.close()">
      <el-badge is-dot>
        <i class="el-icon-bell icon"></i>
        <DropdownNews ref="dropdownNews" />
      </el-badge>
    </div>
    <i :class="!isFullscreen?'el-icon-zoom-in':'el-icon-remove-outline'" @click="onScreenfull" class="icon mr10"
      :title="!isFullscreen?'开全屏':'关全屏'"></i>
    <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onDropdownCommand">
      <span class="el-dropdown-link">
        <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1813762643,1914315241&fm=26&gp=0.jpg"
          class="user-photo mr5" v-if="$store.state.layoutConfig.isUserPhoto" />
        {{userInfo.userName}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :command="v" :divided="v.type === 'signUp'" v-for="(v,k) in dropdownList" :key="k">{{v.label}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <DropdownDrawer ref="dropdownDrawer" />
  </div>
</template>

<script>
import screenfull from "screenfull";
import { getSession, clearSession } from "@/utils/storage";
import { dropdownList } from "@/mock/dropdownList";
import DropdownDrawer from "@/components/navBars/dropdown/dropdownDrawer";
import DropdownNews from "@/components/navBars/dropdown/dropdownNews";
export default {
  name: "dropdown",
  components: { DropdownDrawer, DropdownNews },
  data() {
    return {
      dropdownList,
      isFullscreen: false,
      userInfo: {}
    };
  },
  mounted() {
    this.initUserInfo()
    this.initScreenfull();
  },
  destroyed() {
    this.destroyScreenfull();
  },
  methods: {
    // 初始化登录信息
    initUserInfo() {
      if (!getSession('userInfo')) return false
      this.userInfo = getSession('userInfo')
    },
    // 初始化全屏
    initScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.on("change", this.changeScreenfull);
      }
    },
    // 全屏改变时
    changeScreenfull() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    // 监听全屏关闭
    destroyScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.off("change", this.changeScreenfull);
      }
    },
    // 全屏点击时
    onScreenfull() {
      if (!screenfull.isEnabled) {
        this.$message.warning("暂不不支持全屏");
        return false;
      }
      screenfull.toggle();
    },
    // `dropdown 下拉菜单` 当前项点击
    onDropdownCommand(item) {
      let { link, type, path } = item;
      if (type === "signUp") {
        this.$msgbox({
          closeOnClickModal: false,
          closeOnPressEscape: false,
          title: "提示",
          message: "此操作将退出登录, 是否继续?",
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "退出中";
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 700);
            } else {
              done();
            }
          },
        })
          .then((action) => {
            clearSession();
            // 清空地址栏多余参数
            this.$router.push('/login')
            window.location.reload()
            setTimeout(() => {
              this.$message.success("退出成功！记得回来哟~");
            }, 300);

          })
          .catch(() => { });
      } else if (path) {
        this.$router.push(path);
      } else {
        window.open(link);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.navbar-right {
  display: flex;
  align-items: center;
  .icon {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s;
    color: #000000;
    height: 50px;
    line-height: 50px;
    &:hover {
      background: rgba(0, 0, 0, 0.04);
    }
  }
  ::v-deep .is-dot {
    top: 38% !important;
    right: 15px !important;
  }
  .el-dropdown-link {
    height: 100%;
    display: flex;
    align-items: center;
    .user-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
}
</style>