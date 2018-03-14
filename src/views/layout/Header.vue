<template>
  <el-row>
    <div class="head-top clearfix">
      <slot name="title"></slot>
      <p class="fr" :name="userInfo.age">
        <span class="modify-password quit-btn" @click="logOut"><img src="../../assets/images/quit.png" alt="">退出</span>
        <router-link tag="a" :to="'/changePassword'" class="modify-password"><i class="el-icon-edit"></i>修改密码</router-link>
      </p>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      childMessage: "header messge",
      name: 'chen',
      userInfo: {
        age: 22
      }
    };
  },

  props: ["parentData", "userName"],

  mounted() {
    console.log(this.parentData.bodyHeight);
    console.log(this.userName);
  },

  methods: {
    logOut() {
      this.$axios.post('/vendor/logout').then(data => {
        if(data.data.code === 1) {
          this.$router.push('/login');
        }
      })
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixin.scss";
.head-top {
  @include wh(100%, 40px);
  line-height: 40px;
  background: #333;
  padding-right: 35px;
  .el-icon-setting {
    margin-left: 10px;
    color: #04e881;
  }
  p,
  h3 {
    color: #fff;
  }
  h3 {
    margin-left: 25px;
  }
  .person-photo {
    display: inline-block;
    @include wh(30px, 30px);
    top: 8px;
  }
}

.quit-btn {
  color: #fff;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -4px;
  }
}

.modify-password {
  color: #fff;
  text-decoration: underline;
  cursor: pointer;
}

.el-icon-edit {
  color: #fff;
  margin-left: 10px;
}
</style>
