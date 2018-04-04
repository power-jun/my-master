<template>
  <div class="login-box">
    <el-form ref="loginForm" status-icon :model="loginForm" class="form-box">
      <el-row class="login-center">
        <span>登录</span>
      </el-row>
      <el-form-item prop="mobile" :rules="[{ required: true, message: '请输入手机号', trigger: 'blur' },{ pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入格式正确的手机号', trigger: 'blur' }]">
        <el-input v-model="loginForm.mobile"  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur'}, { pattern:/^[A-Za-z0-9]{6,20}$/, message: '6-20位字母数字组合', trigger: 'blur'}]">
        <el-input v-model="loginForm.password"  placeholder="密码" type="password"></el-input>
      </el-form-item>
       <el-form-item prop="code" :inline="true" class="login-code-line" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
         <el-col :span="18"><el-input v-model="loginForm.code" placeholder="请输入验证码"></el-input></el-col>
         <el-col :span="6" class="code-img"><img :src="codeImgSrc" @click="getCodeImg()" alt=""/></el-col>
      </el-form-item>
      <el-form-item class="login-center login-btn">
        <el-button type="primary" @click="submitForm('loginForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
      </el-form-item>
      <el-row class="login-center" style="margin-left: 90px;">
        <router-link tag="a" :to="'/registed'">去注册</router-link>
        <router-link tag="a" :to="'/forgetPassword'">忘记密码</router-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      loginForm: {
        mobile: "15302752350", //18575677076
        password: "a123456",
        code: ""
      },
      fullscreenLoading: false,
      codeImgSrc: "/api/validateCode"
    };
  },

  methods: {
    submitForm(formName) {
      let _this = this;
      this.fullscreenLoading = true;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/vendor/login", {
              mobile: this.loginForm.mobile,
              password: this.loginForm.password,
              code: this.loginForm.code
            })
            .then(data => {
              if (data.data.code === 1) {
                sessionStorage.setItem('businessUserInfo',  JSON.stringify(data.data.data));
                let datas = data.data.data;
                let shopId = datas.shopId;
                let status = datas.shop && datas.shop.status;

                if(shopId && status && status == 1) {
                    this.$router.push('/BusinessInformation');
                  } else {
                   this.$router.push('/applyShop');
                  }
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

    getCodeImg() {
      this.codeImgSrc = 'api/validateCode?'+ Math.random();
    }
  },
  // beforeRouteLeave(to,from,next) {
  //   this.codeImgSrc = 'api/validateCode?'+ Math.random();
  //   next();
  // },
  watch: {
   '$route' (to, from) {
     debugger
     console.log(this.getStatus(this.$route.path))
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
  height: 270px;
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
  display: inline-block;
  width: 80px;
  height: 39px;
  cursor: pointer;
}
</style>
