<template>
  <div class="registed-box">
    <el-form ref="registedForm" :model="registedForm" label-width="90px" class="form-box registed-form">
      <el-row class="registed-center">
        <span>忘记密码</span>
      </el-row>
      <el-form-item label="手机号">
        <el-input v-model="registedForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码" :inline="true" class="code-line">
         <el-col :span="18"><el-input v-model="registedForm.code" placeholder="请输入短信中收到的验证码"></el-input></el-col>
        <el-col :span="6" class="get-code-btn"><el-button type="primary" @click="getCode">获取验证码</el-button></el-col>
      </el-form-item>
      <el-form-item class="primary-btn">
        <el-button type="primary" @click="onSubmit('registedForm')">重生获取密码</el-button>
        <p class="tips-password">(手机会收到分配新密码的短信)</p>
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
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },

    getCode() {}
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
  height: 180px;
  margin-left: -300px;
  margin-top: -90px;
  box-shadow: 0 1px 5px #422c2c;
}

.registed-center {
  margin-left: 208px;
  margin-bottom: 10px;
  span {
    color: #333;
  }
}

.primary-btn {
  margin-top: 10px;
  margin-left: 100px;
  .el-button--primary {
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

.tips-password {
  font-size: 14px;
  color: #ccc;
  margin-left: -40px;
}

.primary-btn .el-button--primary {
  padding: 10px;
}
</style>

