<template>
  <div class="user-role-warp" :style="styleHeight">
    <div class="user-role-warp-box">
      <div class="user-role-warp-left">
        <el-scrollbar style="height:100%;">
          <el-tree :props="props" :load="loadNode" lazy>
          </el-tree>
        </el-scrollbar>
      </div>
      <div class="user-role-warp-right">
        <el-table :data="tableData.data" border>
          <el-table-column prop="date" label="parent"></el-table-column>
          <el-table-column prop="date" label="icon"></el-table-column>
          <el-table-column prop="name" label="title"></el-table-column>
          <el-table-column prop="address" label="affix"></el-table-column>
          <el-table-column prop="address" label="hidden"></el-table-column>
          <el-table-column prop="address" label="isExternalLinks"></el-table-column>
          <el-table-column prop="address" label="externalLinkUrl"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userRole',
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      tableData: {
        data: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
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
            height: `calc(100vh - 84px)`
          }
        } else {
          return {
            height: `calc(100vh - 50px)`
          }
        }
      } else {
        return {
          height: `calc(100vh - 50px)`
        }
      }
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === 'region1') {
        hasChild = true;
      } else if (node.data.name === 'region2') {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  }
};
</script>

<style scoped lang="scss">
.user-role-warp {
  border-radius: 0px;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  .user-role-warp-box {
    padding: 15px;
    height: 100%;
    display: flex;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03) !important;
    .user-role-warp-left {
      width: 210px;
    }
    .user-role-warp-right {
      flex: 1;
      padding-left: 15px;
    }
  }
}
</style>
