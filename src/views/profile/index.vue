<template>
  <div class="profile">
    <div class="advanced-form-warp">
    <el-card>
      <div slot="header">
        <span>我的资料</span>
      </div>
     <div class="basic-form-warp" :style="styleHeight()">
    <div class="basic-form-warp-box" style="width:500px;margin-top:20px">
         <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="管理员名称" prop="nickname">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
		<el-form-item label="登录账号" prop="username">
          <el-input v-model="userInfo.username"></el-input>
        </el-form-item>
		<el-form-item label="登录密码" prop="password">
          <el-input v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="登录权限" prop="type" >
          {{userInfo.type==1?'管理员':'普通用户'}}
        </el-form-item>
         <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form-item>
         </el-form>
      </div>
       </div>
    </el-card>
    </div>
 
  </div>
</template>

<script>
import { edituser } from '../../api/login/index'
import { getSession } from "@/utils/storage";
export default {
  name: "profile",
  data() {
    return {
      userInfo:{},
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
    };
  },
  created(){
    this.userInfo=getSession('userInfo').userinfo
    console.log(getSession('userInfo'))
  },
  activated() {
    this.styleHeight()
  },
  methods:{
    submitForm(){
      console.log(this.userInfo)
      edituser({
      nickname:this.userInfo.nickname,
      username:this.userInfo.username,
      password:this.userInfo.password,
      id:this.userInfo.id
      }).then(res=>{
        console.log(res)
        if(res.err==0){
          this.$message.success('修改成功')
        }
      })
    },
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
  }
};
</script>

<style scoped lang="scss">
.profile {
}
</style>