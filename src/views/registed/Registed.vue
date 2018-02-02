<template>
  <div class="registed-box">
    <el-form ref="registedForm" :model="registedForm" label-width="90px" class="form-box registed-form">
      <el-row class="registed-center">
        <span>注册</span>
      </el-row>
      <el-form-item label="账号" prop="account" 
      :rules="[
        {required: true, message: '账号不能为空'},
        {type: 'number', message: '账号格式不正确，只能由4~10位的【字母、数字】组成，不区分大小写，且不能以数字开头'},
      ]"
      >
        <el-input v-model="registedForm.account" placeholder="账号格式不正确，只能由4~10位的【字母、数字】组成，不区分大小写，且不能以数字开头，如：a001、a002"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="registedForm.name" placeholder="请填写真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="registedForm.phone" placeholder="用于找回密码或登录，请认真填写"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" :inline="true" class="code-line">
         <el-col :span="18"><el-input v-model="registedForm.code" placeholder="请输入短信中收到的验证码"></el-input></el-col>
        <el-col :span="6" class="get-code-btn"><el-button type="primary" @click="getCode">获取验证码</el-button></el-col>
      </el-form-item>
     <el-form-item label="密码">
        <el-input v-model="registedForm.password" placeholder="请输入密码（6~20位【字母、数字】组合，区分大小写）"></el-input>
      </el-form-item>
     <el-form-item label="请确认">
        <el-input v-model="registedForm.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item class="primary-btn">
        <el-button type="primary" @click="onSubmit('registedForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registedForm: {
        account: "",
        name: "",
        code: "",
        phone: "",
        password: "",
        confirmPassword: ""
      }
    };
  },

  methods: {
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if(valid) {
          alert('submit!');
        } else {
          return false;
        }
      })
    },

    getCode(){

    }
  }
};
</script>

<style lang="scss">
.registed-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg_color.jpg");
}

.registed-form {
  width: 500px;
  height: 500px;
  margin-left: -300px;
  margin-top: -250px;
}

.registed-center {
  margin-left: 250px;
  margin-bottom: 10px;
  span {
    color: #333;
  }
}

.primary-btn {
  margin-top: 10px;
 .el-button--primary{
  padding: 10px 60px;
 }
 span {
   color: #fff;
 }
}

.code-line {
  .el-col-18 {
    width: 72%;
    margin-right: 10px;
  }
}

.get-code-btn {
  span {
    color: #fff;
  }
}
</style>

