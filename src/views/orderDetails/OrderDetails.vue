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
        <el-row class="order-detail">
      <el-col :span="20">订单状态：<span style="color: #f00">{{userInfo.statusName}}</span></el-col>
    </el-row>
    <el-table :data="userInfo.orderDetailList" border style="text-align: center">
      <el-table-column
        prop="productName"
        label="商品名称" align="center">
      </el-table-column>
      <el-table-column
        prop="spec"
        label="规格" align="center">
      </el-table-column>
       <el-table-column
        prop="specNo"
        label="规格编码" align="center">
      </el-table-column>
      <el-table-column
        prop="originalPrice"
        label="单价" align="center">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量" align="center">
      </el-table-column>
    </el-table>
    <div class="order-address">
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>买家下单</span> <span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="6">配送方式：无无无</el-col>
      </el-row>
       <el-row class="order-detail">
        <el-col :span="6">订单总价： {{userInfo.amountPayable}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">红包使用情况: {{userInfo.couponReducePrice}}</el-col> 
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">应付款: {{userInfo.amountPaid}}</el-col>
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
      <el-row class="order-detail">
        <el-col :span="20">买家备注：{{userInfo.remrks}}</el-col>
      </el-row>
      </div>

     <div class="order-address" v-if="userInfo.status === 15">
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>交易关闭</span> <span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
       <el-row class="order-detail">
        <el-col :span="20">买家超时未付款自动取消/买家取消订单</el-col>
       </el-row>
     </div>

    <div class="order-address" v-else>
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>买家付款</span> <span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">付款方式：{{userInfo.payTypeName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">付款订单号：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">实付款：{{userInfo.amountPayable}}</el-col>
      </el-row>
    </div>

    <div class="order-address" v-if="userInfo.status === 1">
      <el-form label-width="120px" :model="expressInfo">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span style="color: #f60">商家发货</span></el-col>
        </el-row>
        <el-form-item label="快递公司:">
            <el-select v-model="express" placeholder="请选择快递公司" @change="companySel">
              <el-option v-for="(items, index) in expressArry" :label="items.name" :value="items.code" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号:" class="input-form">
            <el-input v-model="expressInfo.trackingNumber" auto-complete="off"></el-input>
          </el-form-item>
        <el-row>
          <el-button type="primary" @click="shipSubmit" class="btn-submit">发货</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="order-address" v-else>
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>商家发货</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20"><i class="star">*</i>快递公司：{{userInfo.deliveryInfo && userInfo.deliveryInfo.expressCompanyName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20"><i class="star">*</i>快递单号：{{userInfo.deliveryInfo && userInfo.deliveryInfo.expressNo}}</el-col>
      </el-row>
    </div>
    
     <div class="order-address" v-if="userInfo.status === 6 || userInfo.status === 10">
      <el-form label-width="120px" :model="refundReviewInfo">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span style="color: #f60">退款审核</span></el-col>
        </el-row>
        <el-form-item label="回寄地址:" class="input-form">
          <el-input v-model="refundReviewInfo.adress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件人:" class="input-form">
          <el-input v-model="refundReviewInfo.consignee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" class="input-form">
          <el-input v-model="refundReviewInfo.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="审核意见:" class="input-form">
          <el-input v-model="refundReviewInfo.opinion" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-button type="primary" @click="refundReview(true)">同意退货/退款</el-button>
          <el-button @click="refundReview(false)">驳回退货/退款申请</el-button>
        </el-row>
      </el-form>
    </div>

     <div class="order-address" v-else>
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>申请退款</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">服务类型：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">商品状态：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款原因：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款金额：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款说明：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款图片：无无无</el-col>
      </el-row>
    </div>

  
    <div class="order-address">
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>退款审核</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">回寄地址：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">收件人：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">联系电话：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">备注：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">审核状态：无无无</el-col>
      </el-row>
    </div>


     <div class="order-address">
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>已寄回件</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">快递公司：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">快递单号：无无无</el-col>
      </el-row>
    </div>

      <div class="order-address">
      <el-form label-width="120px">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span style="color: #f60">退款确认</span></el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20"><span style="color: #f00">请核对订单信息，点击"确认退款"后，货款将原路退回。如须客户退回货物，请确认已收到回件并检查无误。</span></el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">退款金额：无无无</el-col>
        </el-row>
        <el-form-item label="审核意见:" class="input-form">
            <el-input v-model="expressInfo.trackingNumber" auto-complete="off"></el-input>
          </el-form-item>
        <el-row>
          <el-button type="primary" @click="refundConfirm(true)">同意退款</el-button>
          <el-button @click="refundConfirm(false)">驳回退款申请</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="order-address">  
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>退款确认</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款金额：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款意见：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">审核状态：无无无</el-col>
      </el-row>
    </div>

    <div class="order-address">  
      <el-row class="order-detail detail-header">
        <el-col :span="6"><span>退款情况</span><span class="titme">{{userInfo.addTime}}</span></el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款金额：无无无</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款状态：无无无</el-col>
      </el-row>
    </div>
  </div>
  <Loading v-show="loadingFlag"></Loading>
 </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      loadingFlag: true,
      remarkSystem: "",
      expressArry: [], //物流公司
      express: "",
      expressInfo: {
        // 快递信息
        trackingNumber: ""
      },
      refundReviewInfo: {
        //退款审核信息
        address: "",
        phone: "",
        consignee: "",
        opinion: ""
      },
      userInfo: {
        orderNo: "",
        memberId: "",
        memberName: "",
        amountPayable: "",
        couponReducePrice: "",
        amountPaid: "",
        consignee: "",
        mobile: "",
        address: "",
        payType: "",
        deliveryInfo: {},
        orderDetailList: []
      }
    };
  },

  components: {
    Loading
  },

  beforeMount() {
    this.requestData();
    this.$axios
      .get("/getDictList", { params: { type: "express_company" } })
      .then(data => {
        if (data.data.code === 1) {
          this.expressArry = data.data.data;
        }
      });
  },

  mounted() {
    this.loadingFlag = false;
  },

  methods: {
    requestData() {
      this.$axios
        .get("/vendor/orderDetail", {
          params: { orderNo: this.$route.query.orderNo }
        })
        .then(data => {
          if (data.data.code === 1) {
            var datas = data.data.data;
            debugger;
            this.userInfo = datas;
            this.userInfo.address =
              datas.provinceName +
              datas.cityName +
              datas.districtName +
              datas.address;
          }
        });
    },

    submitForm() {
      if (!this.remarkSystem) {
        this.$message({
          message: "备注信息不能为空",
          type: "warning"
        });
        return;
      }

      this.$axios
        .post("/vendor/saveRemarkSystem", {
          orderNo: this.userInfo.orderNo,
          remarks: this.remarkSystem
        })
        .then(data => {
          if (data.data.code == 1) {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
            this.remarkSystem = "";
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    companySel(val) {
      debugger;
      this.express = val;
    },

    shipSubmit() {
      // 发货提交
      let param = {};

      if (!this.express) {
        this.$message({
          message: "请选择快递公司",
          type: "warning"
        });
        return;
      }

      if (!this.expressInfo.trackingNumber) {
        this.$message({
          message: "请输入快递单号",
          type: "warning"
        });
        return;
      }

      param.orderNo = tthis.userInfo.orderNo;
      param.express = this.express;
      param.deliveryNo = this.expressInfo.trackingNumber;

      this.$axios.post("/vendor/orderDelivery", param).then(data => {
        if (data.data.code == 1) {
          this.$message({
            message: "发货成功",
            type: "success"
          });

          this.dialogVisibleShop = false;
          this.requestData(); //刷新数据
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
    },

    refundConfirm(flag) {
      // 退款确认
    },

    refundReview(flag) {
      // 退款审核
      let param = {};

      if (!this.refundReviewInfo.adress) {
        this.$message({
          message: "请输入回寄地址",
          type: "warning"
        });
        return;
      }

      if (!this.refundReviewInfo.consignee) {
        this.$message({
          message: "请输入收件人姓名",
          type: "warning"
        });
        return;
      }

      if (!this.refundReviewInfo.phone) {
        this.$message({
          message: "请输入联系电话",
          type: "warning"
        });
        return;
      }

      param = {
        
      }
    }
  }
};
</script>

<style lang="scss">
.order-detail {
  margin-bottom: 15px;
  .star {
    color: red;
    margin-right: 5px;
  }
}

.input-form {
  .el-input {
    width: 40%;
  }
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

.detail-header {
  span {
    font-size: 22px;
    margin-right: 10px;
  }
  .titme {
    color: #666;
    font-size: 14px;
  }
}

.btn-submit {
  color: #fff;
  margin-left: 120px;
  span {
    color: #fff;
  }
}
</style>
