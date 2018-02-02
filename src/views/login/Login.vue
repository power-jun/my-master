<template>
  <div class="login-box">
    <el-form ref="form" :model="form" class="form-box">
      <el-row class="login-center">
        <span>登录</span>
      </el-row>
      <el-form-item>
        <el-input v-model="form.name"  placeholder="账号/手机"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password"  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item class="login-center login-btn">
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <el-row class="login-center">
        <router-link tag="a" :to="'/registered'">去注册</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },

  methods: {
    onSubmit() {
      this.$router.push('/home');
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
  height: 200px;
  background: #fff;
  padding: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
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
}

</style>
