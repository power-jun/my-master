<template>
  <div class="registed-box">
    <el-form ref="changePassworeForm" :model="changePassworeForm" label-width="90px" class="form-box registed-form">
      <el-row class="registed-center">
        <span>修改密码</span>
      </el-row>
      <el-form-item label="手机号">
        <el-input v-model="changePassworeForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
     <el-form-item label="旧密码">
        <el-input v-model="changePassworeForm.oldPassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
     <el-form-item label="新密码">
        <el-input v-model="changePassworeForm.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="changePassworeForm.confirmNewPassword" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item class="primary-btn">
        <el-button type="primary" @click="onSubmit('changePassworeForm')">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changePassworeForm: {
        phone: "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
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
  height: 300px;
  margin-left: -300px;
  margin-top: -250px;
  box-shadow: 0 1px 5px #422c2c;
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
  margin-left: 100px;
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

