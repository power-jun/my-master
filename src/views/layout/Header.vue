<template>
  <el-row>
    <div class="head-top clearfix">
      <slot name="title"></slot>
      <p class="fr" :name="userInfo.age">
        <span class="person-photo"><img src="../../assets/images/photo.jpeg" alt=""></span>
        {{userInfo.name}}
        <i class="el-icon-setting"></i>
      </p>
    </div>
  </el-row>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapMutations
  } from 'Vuex';
  export default {
    data() {
      return {
        childMessage: 'header messge',
      }
    },

    props: ['parentData', 'userName'],

    mounted() {
      console.log(this.parentData.bodyHeight);
      console.log(this.userName);

      //this.$store.commit('mutationName');
      // this.mutationName();

      //this.$store.dispatch('getUserInfo');
      this.promises();
    },

    computed: {
      ...mapState(['userInfo'])
    },

    methods: {
      ...mapActions(['getUserInfo']),
      // ...mapMutations(['mutationName'])
      async promises() {
        await this.getUserInfo();
        this.$emit('childMsg', this.childMessage);
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/mixin.scss';
  .head-top {
    @include wh(100%, 40px);
    line-height: 40px;
    background: #333;
    padding-right: 35px;
    .el-icon-setting {
      margin-left: 10px;
      color: #04e881;
    }
    ;
    p,
    h3 {
      color: #fff;
    }
    ;
    h3 {
      margin-left: 25px;
    }
    ;
    .person-photo {
      display: inline-block;
      @include wh(30px, 30px);
      top: 8px;
    }
  }
</style>
