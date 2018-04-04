<template>
   <el-row class="business-info">
      <h3>商家信息</h3>
      <el-col :span="20">店铺ID： {{shopId}}</el-col>
      <el-col :span="20">店铺链接：{{url}}</el-col>
      <el-col :span="20">店铺名称： {{name}}</el-col>
      <el-col :span="20">店铺类目： {{shopTypeName}}</el-col>
      <el-col :span="20">店铺状态： {{statusName}}</el-col>
      <el-col :span="20">联系人： {{linkman}}</el-col>
      <el-col :span="20">联系人手机： {{linkmanMobile}}</el-col>
      <el-col :span="20">联系地址： {{linkmanAddress}}</el-col>
   </el-row>
</template>
<script>
let baseInfo = JSON.parse(sessionStorage.getItem('businessUserInfo')) || {};
export default {
  data() {
    return {
      name: '',
      shopId: '',
      url: '',
      shopTypeName: '',
      statusName: '',
      linkman: '',
      linkmanMobile: '',
      linkmanAddress: ''
    }
  },
  
  created(){
    // var navParent = document.getElementById('slideNav');
    // var noApplyShop = document.getElementsByClassName('no-apply-shop');
    // debugger
    // for(var i=0; i < noApplyShop.length; i++) {
    //   noApplyShop[]
    // }
    // navParent.removeChild(noApplyShop);

    let shopId = baseInfo.shopId;
    this.$axios.get('/vendor/shopInfo', { params: { shopId: shopId } })
    .then(data => {
      if(data.data.code == 1) {
        var data = data.data.data;

        this.name = data.name;
        this.shopId = data.shopId;
        this.url = data.url;
        this.shopTypeName = data.shopTypeName;
        this.statusName = data.statusName;
        this.linkman = data.linkman;
        this.linkmanMobile = data.linkmanMobile;
        this.linkmanAddress = data.linkmanAddress;
      } else {
        this.$message({
          message: data.data.msg,
          type: "warning"
        });
      }
    });
  }
  
}
</script>


<style lang="scss">
  .business-info {
    background: #fff;
    padding: 20px;
    .el-col-20 {
      margin-top: 15px;
      text-align: left;
    }
  }
</style>
