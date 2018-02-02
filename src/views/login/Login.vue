<template>
  <div class="login-box">
    <el-form ref="form" :model="form">
      <el-row>
        <span>登录</span>
      </el-row>
      <el-form-item>
        <el-input v-model="form.name"  placeholder="账号/手机"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password"  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
      <el-row>
        <router-link tag="a" :to="'/registered'">去注册</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data: {
    name: "",
    password: ""
  },

  methods: {
    ononSubmit() {
      console.log("login");
    }
  }
};
</script>

<style lang="scss">
  .login-box {
    width: 100%;
    height: 100%;
  }
</style>
