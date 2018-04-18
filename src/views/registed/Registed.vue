<template>
<div class="login-box">
  <el-form :model="registedForm" status-icon :rules="rules2" ref="registedForm" class="form-box">
     <el-row class="login-center">
        <span>注册</span>
      </el-row>
       <el-form-item prop="mobile">
        <el-input v-model="registedForm.mobile" v-on:blur="blurMobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code" :inline="true" class="login-code-line" :rules="[{ required: true, message: '请输入图像验证码', trigger: 'blur' }]">
         <el-col :span="18"><el-input v-model="registedForm.code" placeholder="请输入图像验证码"></el-input></el-col>
         <el-col :span="6" class="code-img"><img :src="codeImgSrc" @click="getCodeImg()" alt=""/></el-col>
      </el-form-item>
       <el-form-item prop="checkCode" :inline="true" class="code-line">
         <el-col :span="14"><el-input v-model="registedForm.checkCode" placeholder="请输入短信验证码"></el-input></el-col>
         <el-col :span="6" class="get-code-btn"><el-button type="primary" :disabled="getCodeFlag" @click="getCode">{{getCodeMsg}}</el-button></el-col>
      </el-form-item>
    <el-form-item  prop="pass">
      <el-input type="password" placeholder="请输入密码" v-model="registedForm.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" placeholder="请再次输入密码" v-model="registedForm.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item class="login-center login-btn">
      <el-button type="primary" @click="submitForm('registedForm')" v-loading.fullscreen.lock="fullscreenLoading">立即注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  data() {
    let checkMobile = (rule, value, callback) => {
      var pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!value) {
        this.phoneVerification = false;
        return callback(new Error("手机号不能为空"));
      } else {
        if (!pattern.test(value)) {
          this.phoneVerification = false;
          return callback(new Error("请输入格式正确的手机号"));
        } else {
          this.phoneVerification = true;
          callback();
        }
      }
    };

    let checkCodes = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("短信验证码不能为空"));
      } else {
         callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      var patterns = /^[A-Za-z0-9]{6,20}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!patterns.test(value)) {
        callback(new Error("6-20位字母数字组合"));
      } else {
        if (this.registedForm.checkPass !== "") {
          this.$refs.registedForm.validateField("checkPass");
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registedForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      codeImgSrc: "/api/validateCode",
      registedForm: {
        code: '',
        mobile: "",
        checkCode: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        mobile: [{ validator: checkMobile, trigger: "blur" }],
        checkCode: [{ validator: checkCodes, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      fullscreenLoading: false,
      getCodeMsg: "获取验证码",
      getCodeFlag: true,
      phoneVerification: false
    };
  },
  methods: {
    getCodeImg() {
      this.codeImgSrc = "api/validateCode?" + Math.random();
    },
    submitForm(formName) {
      let _this = this;
      this.fullscreenLoading = true;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/vendor/reg", {
              mobile: this.registedForm.mobile,
              password: this.registedForm.pass,
              repassword: this.registedForm.checkPass,
              checkCode: this.registedForm.checkCode
            })
            .then(data => {
              if (data.data.code == 1) {
                this.$message({
                  message: data.data.msg,
                  type: "success"
                });
                this.$router.push("/login");
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
    },

    blurMobile(e) {
      let pattern = /^[1][3,4,5,7,8][0-9]{9}$/;
      if(!pattern.test(this.registedForm.mobile)) {
        return;
      }

      this.$axios
        .get("/vendor/verifyMobile", { params: {
          mobile: this.registedForm.mobile
        }})
        .then(data => {
          if(data.data.code == 1){
            this.getCodeFlag = false;
            this.$message({
               message: '手机号可用',
               type: "success"
            });
          } else {
            this.getCodeFlag = true;
            this.$message({
               message: data.data.msg,
               type: "warning"
            });
          }
        })
    },

    getCode() {
      this.$refs.registedForm.validateField("mobile");

      if (!this.phoneVerification) {
        return;
      }

      if(!this.registedForm.code) {
        this.$message({
           message: '请输入图像验证码',
           type: "warning"
        });
        return;
      }

      this.getCodeFlag = true;
      this.$axios
        .post("/vendor/sendSmsVerifyCode", {
          mobile: this.registedForm.mobile,
          code: this.registedForm.code
        })
        .then(data => {
          if (data.data.code == 1) {
            let wait = 60;
            let codeTimer = null;
            codeTimer = setInterval(() => {
              wait--;
              if (wait === 0) {
                this.getCodeMsg = "获取验证码";
                this.getCodeFlag = false;
                clearInterval(codeTimer);
              } else {
                this.getCodeMsg = wait + "秒后再获取";
                this.getCodeFlag = true;
              }
            }, 1000);
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
            this.getCodeFlag = false;
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
  background: #fff;
  padding: 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  box-shadow: 0 1px 5px #422c2c;
}

.login-center {
  margin-bottom: 10px;
  margin-left: 120px;
}

.login-btn {
  margin-left: 60px;
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
.code-img img {
  display: inline-block;
  width: 80px;
  height: 39px;
  cursor: pointer;
}
</style>
