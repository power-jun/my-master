<template>
 <div>
   <div v-show="!loadingFlag">
    <el-row class="order-detail">
      <el-col :span="20">订单编号： {{userInfo.orderNo}}</el-col>
    </el-row>
    <el-row class="order-detail">
      <el-col :span="20">用户ID: {{userInfo.memberId}}</el-col>
    </el-row>
    <el-row class="order-detail">
      <el-col :span="20">用户昵称：{{userInfo.memberName}}</el-col>
    </el-row>
    <el-table :data="userInfo.orderDetailList" border style="text-align: center">
      <el-table-column
        prop="productNo"
        label="商品编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="productName"
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
        prop="originalPrice"
        label="单价" align="center">
      </el-table-column>
      <el-table-column
        prop="primeCost"
        label="成本" align="center">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量" align="center">
      </el-table-column>
    </el-table>
    <div class="order-address">
      <el-row class="order-detail">
        <el-col :span="6">应付款：{{userInfo.amountPayable}}元</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">通用红包: -{{userInfo.couponReducePrice}}元</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">付款方式：{{userInfo.payType}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">实付款: ￥{{userInfo.amountPaid}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">收货人信息：{{userInfo.consignee}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">收货人手机：{{userInfo.mobile}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">收货人地址：{{userInfo.address}}</el-col>
      </el-row>
      <el-form :inline="true" class="form-inline">
        <el-form-item label="商家订单备注：">
          <el-input type="textarea" v-model="remarkSystem" placeholder="最多输入100字"></el-input>
        </el-form-item>
        <el-form-item class="save-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">保存备注</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <Loading v-show="loadingFlag"></Loading>`
 </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      loadingFlag: true,
      remarkSystem: "",
      userInfo: {
        orderNo: "20170608562364452",
        memberId: "",
        memberName: "飞扬",
        amountPayable: "",
        couponReducePrice: "",
        amountPaid: "",
        consignee: "",
        mobile: "",
        address: "",
        payType: "",
        orderDetailList: [
          {
            productNo: "S20170623562389",
            productName: "XXX韩版女装",
            address: "广东",
            specifications: "350ML",
            originalPrice: "￥50.00",
            primeCost: "￥30.00",
            quantity: "4"
          },
          {
            productNo: "S20170623562389",
            productName: "XXX韩版女装",
            address: "广东",
            specifications: "350ML",
            originalPrice: "￥50.00",
            primeCost: "￥30.00",
            quantity: "4"
          }
        ]
      }
    };
  },

  components: {
    Loading
  },

  beforeMount() {
    this.$axios.get('/vendor/orderDetail', { params: {orderNo : this.$route.query.orderNo }}).then(data => {
      if(data.data.code === 1) {
        this.userInfo = data.data.data;
      }
    })
  },

  mounted() {
    this.loadingFlag = false;
  },

  methods: {
    submitForm() {
      this.$axios
        .post("/vendor/saveRemarkSystem", {
          orderNo: this.userInfo.orderNo,
          remarkSystem: this.remarkSystem
        })
        .then(data => {
          if (data.data.code === 1) {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    }
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

.form-inline {
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
