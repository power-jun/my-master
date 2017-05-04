<template>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">{{msg}}</div></el-col>
    <el-col :span="24">
      <el-button @click="show = !show">toggle</el-button>
      <transition name="fade">
        <p class="scale-h" v-if="show"> fade show</p>
      </transition>

      <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
        <p v-if="show">hello</p>
      </transition>
    </el-col>
  </el-row>
</template>

<script>
 import 'animate.css';
  export default {
    data() {
      return {
        msg: 'Project',
        show: true
      }
    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .fade-enter, .fade-leave-active {
    transition: opacity .8s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .scale-h:hover {
    -webkit-transform: scale(1.2, 1.2);
    -webkit-transform: translate(-10px,-10px);
    transition: transform .5s ease-in;
  }

</style>
