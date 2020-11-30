<template>
  <div class="table-warp" :style="styleHeight">
    <el-card class="table-top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域" clearable>
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
          <el-button type="info" icon="el-icon-refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table-center mt5 mb5">
      <div class="table-center-flex-relative" v-loading="tableData.loading" element-loading-text="拼命加载中">
        <template v-if="!tableData.loading">
          <el-table :data="tableData.data" stripe border :height="tableData.data.length > 0 ? 'auto' : '100%'"
            class="table-center-flex-absolute">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column prop="desc" label="描述"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="onHandleCellClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-card>
    <el-card class="table-bottom">
      <el-pagination style="text-align: right;" background @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :current-page="tableData.param.pageNum"
        :page-size="tableData.param.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { tableList } from './mock'
export default {
  name: 'tables',
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      tableData: {
        data: [],
        total: 99,
        loading: false,
        param: {
          pageNum: 1,
          pageSize: 10,
        },
      },
    }
  },
  computed: {
    // 动态高度，适配各布局。单页面的话，高度设为100%即可。
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
  mounted() {
    this.getTabelData();
  },
  methods: {
    // 模拟表格数据
    getTabelData() {
      this.tableData.loading = true;
      setTimeout(() => {
        this.tableData.data = tableList;
        this.tableData.loading = false;
      }, 300);
    },
    // 查询点击
    onSearch() {
      this.tableData.param.pageNum = 1;
      this.tableData.param.pageSize = 10;
      this.getTabelData();
    },
    // 重置点击
    onReset() {
      this.formInline.user = "";
      this.formInline.region = "";
      this.onSearch();
    },
    // 查看点击
    onHandleCellClick(row) { },
    // 分页点击
    handleSizeChange(val) {
      this.tableData.param.pageSize = val;
    },
    // 分页点击
    handleCurrentChange(val) {
      this.tableData.param.pageNum = val;
    },
  }
}
</script>

<style scoped lang="scss">
.table-warp {
  display: flex;
  flex-direction: column;
  .table-top {
    padding: 10px;
    ::v-deep .el-form-item--small.el-form-item {
      margin-bottom: 0 !important;
    }
  }
  .table-center {
    flex: 1;
    display: flex;
    padding: 10px;
    ::v-deep .el-card__body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .table-center-flex-relative {
      position: relative;
      height: 100%;
      flex: 1;
      .table-center-flex-absolute {
        position: absolute;
        max-height: 100% !important;
        width: 100%;
        left: 0;
        top: 0;
      }
    }
  }
  .table-bottom {
    padding: 10px;
  }
}
</style>
