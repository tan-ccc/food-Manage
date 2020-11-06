<template>
  <div class="dropdown-news">
    <transition name="el-zoom-in-top">
      <div v-show="isShow">
        <div class="sjx-box" @mouseenter="open()" @mouseleave="close()">
          <div class="head-box">
            <div class="head-box-title">通知</div>
            <div class="head-box-btn">全部已读</div>
          </div>
          <div class="content-box">
            <div class="content-box-item" v-for="v in 2" :key="v">
              <div>关于帐号原名称保护期已到期的通知</div>
              <div class="content-box-msg">
                你好，帐号已在2020年05月01日完成改名，原名称[petworld]的2天保护期已到期。2020年05月03日10时29分开始，原名称已释放，其他用户可申请使用。</div>
              <div class="content-box-time">2020-05-03</div>
            </div>
          </div>
          <div class="foot-box">前往通知中心</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'dropdownNews',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    // 打开
    open() {
      this.isShow = true;
    },
    // 关闭
    close() {
      this.isShow = false;
    }
  }
}
</script>

<style scoped lang="scss">
.dropdown-news {
  position: absolute;
  right: -106px;
  top: 50px;
  z-index: 1600;
  .sjx-box {
    width: 300px;
    position: relative;
    border-radius: 2px;
    background: white;
    border: 1px solid #ebeef5;
    border-radius: 0px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &::before {
      content: "";
      position: absolute;
      top: -5px;
      right: 115px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    &::after {
      content: "";
      position: absolute;
      top: -4px;
      right: 115px;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid white;
    }
    .head-box {
      display: flex;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
      color: #333333;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      padding: 0 15px;
      .head-box-btn {
        color: #0099ff;
        font-size: 13px;
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
    }
    .content-box {
      font-size: 13px;
      padding: 0 15px;
      .content-box-item {
        border-bottom: 1px solid #ebeef5;
        padding: 15px 0;
        &:last-of-type {
          border-bottom: 1px solid transparent;
        }
        .content-box-msg {
          color: #999999;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .content-box-time {
          color: #999999;
        }
      }
    }
    .foot-box {
      height: 40px;
      color: #0099ff;
      font-size: 13px;
      cursor: pointer;
      opacity: 0.8;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #ebeef5;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>