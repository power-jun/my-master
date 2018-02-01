<template>
  <el-row>
    <div class="head-top clearfix">
      <slot name="title"></slot>
      <p class="fr" :name="userInfo.age">
        <span class="person-photo"><img src="../../assets/images/shop-logo.png" alt=""></span> {{userInfo.name}}
        <i class="el-icon-setting"></i>
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

  methods: {}
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
</style>
