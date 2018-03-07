<template>
   <el-row class="business-info">
      <h3>商家信息</h3>
      <el-col :span="20">店铺ID： 20170608562364452</el-col>
      <el-col :span="20">店铺链接：http://www.bac.com/shop?id=123456</el-col>
      <el-col :span="20">店铺名称： XXX女装旗舰店</el-col>
      <el-col :span="20">店铺类目： 女装</el-col>
      <el-col :span="20">店铺状态： 正常</el-col>
      <el-col :span="20">联系人： 李先生</el-col>
      <el-col :span="20">联系人手机： 3800138000</el-col>
      <el-col :span="20">联系地址： XXX省XXX市XXX区/县XX路XX大楼</el-col>
   </el-row>
</template>

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
