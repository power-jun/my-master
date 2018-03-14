<template>
   <el-row class="business-info">
      <h3>商家信息</h3>
      <el-col :span="20">店铺ID： {{shopId}}</el-col>
      <el-col :span="20">店铺链接：{{url}}</el-col>
      <el-col :span="20">店铺名称： {{name}}</el-col>
      <el-col :span="20">店铺类目： {{shopTypeName}}</el-col>
      <el-col :span="20">店铺状态： {{status}}</el-col>
      <el-col :span="20">联系人： {{linkman}}}</el-col>
      <el-col :span="20">联系人手机： {{linkmanMobile}}</el-col>
      <el-col :span="20">联系地址： {{linkmanAddress}}</el-col>
   </el-row>
</template>
<script>
export default {
  data() {
    return {
      name: 'XXX女装旗舰店',
      shopId: '20170608562364452',
      url: 'http://www.bac.com/shop?id=123456',
      shopTypeName: '女装',
      status: '',
      linkman: '李先生',
      linkmanMobile: '3800138000',
      linkmanAddress: 'XXX省XXX市XXX区/县XX路XX大楼'
    }
  },
  
  created(){
    this.$axios.get('/vendor/shopInfo', { params: { shopId: '' } })
    .then(data => {
      if(data.data.code === 1) {
        var data = data.data.data;

        this.name = data.name;
        this.shopId = data.shopId;
        this.url = data.url;
        this.shopTypeName = data.shopTypeName;
        this.status = data.status;
        this.linkman = data.linkman;
        this.linkmanMobile = data.linkmanMobile;
        this.linkmanAddress = data.linkmanAddress;
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
