<template>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">{{msg}}</div></el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Project'
      }
    }
  }
</script>

<style lang="sass">
  .bg-purple-dark 
      color: yellow;
</style>