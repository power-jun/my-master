<template>
  <div class="registed-box">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.account" placeholder="账号格式不正确，只能由4~10位的【字母、数字】组成，不区分大小写，且不能以数字开头，如：a001、a002"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请填写真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" placeholder="用于找回密码或登录，请认真填写"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码">
        <el-input v-model="form.code" placeholder="请输入短信中收到的验证码"></el-input>
        <el-button type="primary" @click="onSubmit">获取验证码</el-button>
      </el-form-item>
     <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码（6~20位【字母、数字】组合，区分大小写）"></el-input>
      </el-form-item>
     <el-form-item label="请确认">
        <el-input v-model="form.confirmPassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: {
    account: '',
    name: '',
    code: '',
    phone: '',
    password: '',
    confirmPassword
  },

  methods: {
    onSubmit: {
      
    }
  }
};
</script>

<style lang="scss">

</style>

