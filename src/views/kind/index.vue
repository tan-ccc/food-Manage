<template>
  <div class="advanced-form-warp">
    <el-card>
      <div slot="header">
        <span>菜单中心</span>
      </div>
    
      <div class="advanced-title mb20">菜单列表</div>
      <el-table class="mb20" :data="goodsList" stripe v-loading="false">
        <!-- <el-table-column prop="id" label="菜品编号"></el-table-column> -->
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="商品价格">
           <template slot-scope="props">
             <span>{{props.row.price}}/元</span>
            </template>
        </el-table-column>
        <el-table-column  label="上架时间">
           <template slot-scope="props">
             <span>{{gettime(props.row.time)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="onHandle(scope.$index,scope.row)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button @click="onAddCellTable" size="small" icon="el-icon-plus" class="mt20" style="width:100%;">添加采购
      </el-button> -->
        <div class="advanced-title">添加菜单</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small">
        <el-row :gutter="20" class="flex flex-col">
          <el-col :span="12">
            <el-form-item label="菜品名称：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item label="菜品图片：" required >
              <el-upload
                class="avatar-uploader"
                action="api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上架时间：" prop="time">
              <el-date-picker  type="date" value-format="timestamp" placeholder="选择上架时间" v-model="ruleForm.time" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品价格：" prop="price">
              <el-input type="number" v-model="ruleForm.price" placeholder="请输入商品价格/元"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注：" prop="des">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入备注" v-model="ruleForm.des">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item >
             <el-button type="primary" icon="el-icon-shopping-cart-1" @click="addmenu">添加菜单</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- <el-card class="table-bottom mt15">
      <el-button size="small" type="primary" @click="submitForm('ruleForm')" icon="el-icon-shopping-cart-1">提交采购数据
      </el-button>
    </el-card> -->
    <el-dialog
      title="菜单详情"
      :visible.sync="refuseDialog"
      class="border"
      width="600px"
    >
       <el-form :model="activeitem" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small">
        <el-row :gutter="20" class="flex flex-col">
          <el-col :span="16">
            <el-form-item label="菜品名称：" prop="name">
              <el-input v-model="activeitem.name" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item label="菜品图片：" required >
              <el-upload
                class="avatar-uploader"
                action="api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="activeitem.img" :src="activeitem.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
        </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="上架时间：" prop="time">
              <el-date-picker  type="date" value-format="timestamp" placeholder="选择上架时间" v-model="activeitem.time" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="商品价格：" prop="price">
              <el-input type="number" v-model="activeitem.price" placeholder="请输入商品价格/元"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注：" prop="des">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" placeholder="请输入备注" v-model="activeitem.des">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="refuseDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="refuseConfirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatAxis, formatDate } from "@/utils/formatTime";
import { options } from './mock'
//  this.userInfo.time = formatDate(new Date(this.userInfo.time), 'YYYY-mm-dd HH:MM:SS')
import { getgoods,addGoods } from '../../api/all/all'
export default {
  name: 'kind',
  data() {
    return {
      activeitem:{},
      refuseDialog:false,
      imageUrl:'',
      options,
      ruleForm: {
        name: '',
        time: '',
        price: '',
        img:'',
        des: '',
      },
      rules: {
        name: [{ required: true, message: '请输入菜品名称', trigger: 'change' }],
        time: [{ type: 'date', required: true, message: '请选择上架时间', trigger: 'change' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }]
      },
      goodsList:[],
      tableData: {
        data: [],
        total: 99,
        loading: false,
        param: {
          pageNum: 1,
          pageSize: 10,
        },
      }
    }
  },
  created(){
    this.getdata()
  },
  mounted() {
    this.getTabelData();
  },
  methods: {
    // getimg(img){
    //   return `require(../../../public/${img})` 
    // },
    refuseConfirm(){},
    gettime(time){
      console.log(time)
      if(time){
        var date = Number(time)
        return formatDate(new Date(date), 'YYYY-mm-dd')
      }
      // formatDate(time, 'YYYY-mm-dd HH:MM:SS')
    },
    getdata(){
      getgoods().then(res=>{
        console.log(res)
        this.goodsList=res
      })
    },
    addmenu(){
      console.log(this.ruleForm)
      var item=this.ruleForm
      addGoods({
        ...item
      }).then(res=>{
        console.log(res)
      })
    },
      handleAvatarSuccess(res, file) {
        console.log(res,file)
        this.imageUrl = URL.createObjectURL(file.raw);
        this.ruleForm.img=res.site
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.ruleForm, this.tableData.data)
          console.log(params)
        } else {
          return false;
        }
      });
    },
    // 模拟表格数据
    getTabelData() {
      this.tableData.loading = true;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.tableData.data.push({
            a1: Math.floor(Math.random() * 100000000),
            a2: `好滋好味鸡蛋仔${i + 1}`,
            a3: '甜味，大包',
            a4: '',
            a5: ''
          })
        }
        this.tableData.loading = false;
      }, 300);
    },
    // 当前行详情
    onHandle(index, row) {
      // this.$confirm('删除该数据, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.tableData.data.splice(index, 1)
      // }).catch(() => { })
    
      // row.time=Number(row.time)
      this.activeitem=row
      // this.activeitem.img=`../../../public/${this.activeitem.img}`
        console.log(this.activeitem)
      this.refuseDialog=true
    },
    // 添加行
    onAddCellTable() {
      this.tableData.data.push({
        a1: Math.floor(Math.random() * 100000000),
        a2: `好滋好味鸡蛋仔${this.tableData.data.length + 1}`,
        a3: '甜味，大包',
        a4: '',
        a5: ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
.advanced-form-warp  ::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.advanced-form-warp {
  ::v-deep .el-card__body {
    padding: 15px !important;
    .advanced-title {
      color: #09f;
      position: relative;
      padding-left: 10px;
      &::after {
        content: "";
        width: 2px;
        height: 14px;
        background: #09f;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        border-radius: 3px;
      }
    }
    .demo-ruleForm {
      padding: 40px 25px 20px 0;
    }
  }
  .table-bottom {
    text-align: center;
    ::v-deep .el-card__body {
      padding: 15px !important;
    }
  }
}
</style>