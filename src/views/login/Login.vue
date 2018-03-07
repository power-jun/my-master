<template>
  <div class="login-box">
    <el-form ref="form" :model="loginForm" class="form-box">
      <el-row class="login-center">
        <span>登录</span>
      </el-row>
      <el-form-item>
        <el-input v-model="loginForm.name"  placeholder="账号/手机"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.password"  placeholder="密码"></el-input>
      </el-form-item>
       <el-form-item :inline="true" class="login-code-line">
         <el-col :span="18"><el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input></el-col>
         <el-col :span="6" class="code-img"><img src="../../assets/images/code.png" alt=""/></el-col>
      </el-form-item>
      <el-form-item class="login-center login-btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <el-row class="login-center" style="margin-left: 90px;">
        <router-link tag="a" :to="'/registed'">去注册</router-link>
        <router-link tag="a" :to="'/forgetPassword'">忘记密码</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
        code:''
      }
    };
  },

  methods: {
    onSubmit() {
      this.$router.push('/applyShop');
    }
  }
};
</script>

<style lang="scss">
.login-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login_bg_color.jpg");
}

.form-box {
  width: 300px;
  height: 250px;
  background: #fff;
  padding: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -175px;
  box-shadow: 0 1px 5px #422c2c;
}

.login-center {
  margin-bottom: 10px;
  margin-left: 120px;
}

.login-btn {
  margin-left: 76px;
}

.login-btn .el-button--primary {
  padding: 10px 60px;
}

.login-btn .el-button--primary span {
  color: #fff;
}

.login-center a {
  color: #666;
  text-decoration: underline;
}

.login-code-line {
  .el-col-18 {
    width: 69%;
    margin-right: 10px;
  }
}

.code-img img {
  height: 35px;
}

</style>
