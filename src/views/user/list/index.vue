<template>
	<div class="user-list">
		<!-- <el-form  ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="姓名" prop="pass">
    <el-input  v-model="name" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="checkPass">
    <el-input v-model="age" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form> -->
<el-table
      :header-cell-style="{background:'#eef1f6'}"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="nickname"
        label="用户名"
        >
      </el-table-column>
      <el-table-column
        label="账号"
        >
         <template slot-scope="props">
                    <span>
                      {{ props.row.username }}
                    </span>
                  </template>
      </el-table-column>
      <el-table-column
        label="用户类型"
        >
         <template slot-scope="props">
                    <span>
                      {{ props.row.type==0?'普通用户':'管理员' }}
                    </span>
                  </template>
      </el-table-column>
       <el-table-column
        label="操作"
        >
         <template slot-scope="props">
                    <span v-if="props.row.username!='admin'" class="color-red pointer" @click="del(props.row.id)">
                      删除
                    </span>
                  </template>
      </el-table-column>
    </el-table>
	</div>
</template>

<script>
import { posttest,getall } from '../../../api/test/test'
export default {
	name: 'userList',
	  data() {
      return {
          name: '',
          age: '',
          tableData:[]
      }
  },
  created(){
    this.getdata()
  },
	methods: {
    del(id){
      console.log(id);
      
    },
    getdata(){
      getall({}).then(res=>{
        console.log(res);
        this.tableData=res
      })
    },
      submitForm() {
		  console.log(this.name,this.age);
		posttest({name:this.name,age:this.age}).then(res=>{
			console.log(res);
		})
      }
    }
};
</script>
