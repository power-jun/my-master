<template>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">{{msg}}</div></el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Movie'
      }
    },

    beforeRouteEnter: function(to, from, next) {
      console.log('movie router before' + '路由参数=' + to.params.id)
      if(true) {
        next();
      }
    },

    beforeRouteLeave: function(to, form,next) {
      console.log('movie router after')
      next();
    }
  }
</script>

<style lang="scss">
@import '../../assets/css/mixin';
  .bg-purple-dark {
    color: #000;
  }
</style>
