<template>
 <div>
  <el-row class="order-detail">
    <el-col :span="6">订单编号： 20170608562364452</el-col>
    <el-col :span="6">用户ID: 65423</el-col>
    <el-col :span="6">用户昵称：飞扬</el-col>
  </el-row>
  <el-table :data="tableData3" border style="text-align: center">
    <el-table-column
      prop="goodsNumb"
      label="商品编号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品名称" align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="产地" align="center">
    </el-table-column>
    <el-table-column
      prop="specifications"
      label="重量规格" align="center">
    </el-table-column>
    <el-table-column
      prop="unitPrice"
      label="单价" align="center">
    </el-table-column>
    <el-table-column
      prop="cost"
      label="成本" align="center">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量" align="center">
    </el-table-column>
  </el-table>
  <div class="order-address">
    <el-row class="order-detail">
      <el-col :span="6">应付款：200元</el-col>
      <el-col :span="6">通用红包: -20元</el-col>
      <el-col :span="6">付款方式：微信支付</el-col>
      <el-col :span="6">实付款: ￥88.00</el-col>
    </el-row>
    <el-row class="order-detail">
      <el-col :span="6">收货人信息：李先生</el-col>
      <el-col :span="6">收货人手机：13800138000</el-col>
      <el-col :span="12">收货人地址：XXX省XXX市XXX区XXXX街道XXX小区XXXX楼</el-col>
    </el-row>
    <el-form :inline="true" :model="form" class="form-inline">
      <el-form-item label="商家订单备注：">
        <el-input type="textarea" v-model="form.desc" placeholder="最多输入100字"></el-input>
      </el-form-item>
      <el-form-item class="save-btn">
        <el-button type="primary" @click="submitForm('ruleForm')">保存备注</el-button>
      </el-form-item>
    </el-form>
  </div>
  <Loading v-show="loadingFlag"></Loading>
 </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      form: {
        desc: ""
      },

      tableData3: [
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        },
        {
          goodsNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          address: "广东",
          specifications: "350ML",
          unitPrice: "￥50.00",
          cost: "￥30.00",
          number: "4"
        }
      ]
    };
  },

  components: {
    Loading
  },

  mounted: function() {
    this.loadingFlag = false;
  },

  methods: {
    handleClick(row) {
      console.log(row);
    },

    onSubmit: function() {}
  }
};
</script>

<style lang="scss">
.order-detail {
  margin-bottom: 15px;
}

.order-address {
  margin-top: 15px;
  border: 1px solid #fff;
  padding: 10px;
  background: #fff;
}

.form-inline  {
  .el-form-item__label {
    color: #333;
  }
  .el-textarea__inner {
    margin-top: 10px;
    width: 400px;
    height: 200px;
  }
  .save-btn {
    display: block;
    margin-left: 107px;
    span {
      color: #fff;
    }
  }
}
</style>
