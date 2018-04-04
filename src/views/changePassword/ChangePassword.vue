<template>
<div class="login-box">
  <el-form :model="registedForm" status-icon :rules="rules2" ref="registedForm" class="form-box">
      <el-row class="login-center">
        <span>修改密码</span>
      </el-row>
       <el-form-item  prop="oldPassword">
      <el-input type="password" placeholder="请输入旧密码" v-model="registedForm.oldPassword" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item  prop="newPassword">
      <el-input type="password" placeholder="请输入新密码" v-model="registedForm.newPassword" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="reNewPassword">
      <el-input type="password" placeholder="请确认新密码" v-model="registedForm.reNewPassword" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="login-center login-btn">
      <el-button type="primary" @click="submitForm('registedForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      var patterns = /^[A-Za-z0-9]{6,20}$/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!patterns.test(value)) {
        callback(new Error("6-20位字母数字组合"));
      } else {
        if (this.registedForm.reNewPassword !== "") {
          this.$refs.registedForm.validateField("reNewPassword");
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.registedForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registedForm: {
        oldPassword: "",
        newPassword: "",
        reNewPassword: ""
      },
      rules2: {
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        reNewPassword: [{ validator: validatePass2, trigger: "blur" }]
      },
      fullscreenLoading: false
    };
  },
  methods: {
    submitForm(formName) {
      let _this = this;
      this.fullscreenLoading = true;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/vendor/changePwd", {
              oldPassword: this.registedForm.oldPassword,
              newPassword: this.registedForm.newPassword,
              reNewPassword: this.registedForm.reNewPassword
            })
            .then(data => {
              if (data.data.code == 1) {
                this.$router.push("/");
              } else {
                this.$message({
                  message: data.data.msg,
                  type: "warning"
                });
              }

              this.fullscreenLoading = false;
            });
        } else {
          console.log("error submit!!");
          this.fullscreenLoading = false;
          return false;
        }
      });
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
  height: 260px;
  background: #fff;
  padding: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -130px;
  box-shadow: 0 1px 5px #422c2c;
}

.login-center {
  margin-bottom: 10px;
  margin-left: 120px;
}

.login-btn {
  margin-left: 84px;
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

.code-line {
  .el-button--primary {
    margin-left: 16%;
    span {
      color: #fff;
    }
  }
}
</style>
