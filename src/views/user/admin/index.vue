<template>
  <div class="basic-form-warp" :style="styleHeight()">
    <div class="basic-form-warp-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="管理员名称" prop="nickname">
          <el-input v-model="ruleForm.nickname"></el-input>
        </el-form-item>
		<el-form-item label="登录账号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
		<el-form-item label="登录密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域" style="width:100%;">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="活动时间" required>guan
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <!-- <el-form-item label="上传图片" prop="imgurl">
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
            style="width:100%;" :on-success="handleAvatarSuccess">
            <img v-if="ruleForm.imgurl" :src="ruleForm.imgurl">
            <template v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            </template>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { posttest } from '../../../api/test/test'
export default {
  name: 'basicForm',
  data() {
    return {
      ruleForm: {
        nickname: '',
        username: '',
        password: '',
        // imgurl: '',
        // desc: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
		],
		 username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
		],
		 password: [
          { required: true, message: '请设置登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
        // imgurl: [{ required: true, message: '请上传图片', trigger: 'change' }]
      }
    }
  },
  // 组件缓存才在这里初始化事件等
  activated() {
    this.styleHeight()
  },
  methods: {
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
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
			console.log(this.ruleForm)
			posttest({
			nickname:this.ruleForm.nickname,
			username:this.ruleForm.username,
			password:this.ruleForm.password}).then(res=>{
				console.log(res)
			})

        } else {
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 上传成功后，手动验证一次表单，去掉红色提示
    handleAvatarSuccess(res, file) {
      this.ruleForm.imgurl = res.data.filepath;
      this.$refs.form.validateField('imgurl');
    }
  }
}
</script>

<style scoped lang="scss">
.basic-form-warp {
  border-radius: 0px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: auto;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.03) !important;
  margin: 15px;
  .basic-form-warp-box {
    max-width: 700px;
    margin: 30px auto;
    .line {
      text-align: center;
    }
    ::v-deep .el-upload {
      width: 100%;
      .el-upload-dragger {
        width: 100%;
      }
    }
  }
}
</style>