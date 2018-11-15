<template>
  <div style="padding-bottom: 100px">
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
        <el-col :span="20">订单状态：
          <!-- <span style="color: #f00" v-if="userInfo.status == 15 || userInfo.status == 10 || userInfo.status == 20">交易关闭</span> -->
          <span style="color: #f00">
            {{userInfo.statusName}}
            <span style="color: #f00" v-if="userInfo.remarkSystem">
              ({{userInfo.remarkSystem}})
            </span>
          </span>
        </el-col>
      </el-row>
      <el-table :data="userInfo.orderDetailList" border style="text-align: center">
        <el-table-column prop="productName" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="spec" label="规格" align="center">
        </el-table-column>
        <el-table-column prop="specNo" label="规格编码" align="center">
        </el-table-column>
        <el-table-column prop="originalPrice" label="单价(元)" align="center">
        </el-table-column>
        <el-table-column prop="quantity" label="数量" align="center">
        </el-table-column>
      </el-table>

      <div class="order-address">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span>买家下单</span> <span class="titme">{{userInfo.addTime}}</span></el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="6" v-if="userInfo.deliveryTpe == '包邮'">配送方式：{{userInfo.deliveryTpe}}</el-col>
          <el-col :span="6" v-else>配送方式：{{userInfo.deliveryTpe}} {{userInfo.postage}}元</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="6">订单总价： {{userInfo.productTotalPrice}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">红包使用情况: 通用红包 {{userInfo.useUniversalEnvelope || 0}}, 店铺红包 {{userInfo.shopEnvelope || 0}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">应付款: {{userInfo.amountPayable}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">收货人信息：{{userInfo.consignee}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">收货人手机：{{userInfo.mobile}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">收货人地址：{{userInfo.address}}(邮政编码:{{userInfo.postCode}})</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">买家备注：{{userInfo.remarkCustomer}}</el-col>
        </el-row>
      </div>

      <div class="order-address" v-if="userInfo.status == 15 || userInfo.status == 10 || userInfo.status == 20">
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
          <el-col :span="20">付款订单号：{{userInfo.payTransactionNo || ''}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">实付款：{{userInfo.amountPaid}}元</el-col>
        </el-row>
      </div>

      <div class="order-address" v-if="userInfo.status == 1">
        <el-form label-width="120px" :model="expressInfo">
          <el-row class="order-detail detail-header">
            <el-col :span="6"><span style="color: #f60">商家发货</span></el-col>
          </el-row>
          <el-form-item label="快递公司:">
            <el-select v-model="express" placeholder="请选择快递公司" @change="companySel">
              <el-option v-for="(items, index) in expressArry" :label="items.name" :value="items.code" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号:">
            <el-input v-model="expressInfo.trackingNumber" auto-complete="off"></el-input>
          </el-form-item>
          <el-row>
            <el-button type="primary" @click="shipSubmit" class="btn-submit">发货</el-button>
          </el-row>
        </el-form>
      </div>

      <div class="order-address" v-else-if="userInfo.deliveryInfo && userInfo.deliveryInfo.expressCompanyName && userInfo.deliveryInfo.expressNo">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span>商家发货</span><span class="titme">{{userInfo.addTime}}</span></el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">快递公司：{{userInfo.deliveryInfo && userInfo.deliveryInfo.expressCompanyName}}</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">快递单号：{{userInfo.deliveryInfo && userInfo.deliveryInfo.expressNo}}</el-col>
        </el-row>
      </div>

      <div v-if="userInfo.refundList && userInfo.refundList.length && userInfo.refundInfo.type == 2">
        <div v-for="(item,index) in userInfo.refundList" :index="index" :key="index">

          <div class="order-address" v-if="!item.reviewType">
            <el-row class="order-detail detail-header">
              <el-col :span="6"><span>申请退款记录</span><span class="titme">{{item.addTime}}</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">服务类型：{{item.typeName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">商品状态：{{item.deliveryStatusName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款原因：{{item.reasonName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款金额：{{item.refundAmt || ''}}元</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款说明：{{item.remrks}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">
                <p style="float: left">退款图片：</p>
                <p class="refun-img" v-for="(item,index) in item.picUrl" :index="index" :key="index">
                  <img :src="'http://dev.pt800.com/' + item" alt='' @click="lookImg">
                </p>
              </el-col>
            </el-row>
          </div>

          <div class="order-address" v-if="index == (userInfo.refundList.length-1) && userInfo.refundInfo && userInfo.refundInfo.needAudited == 1">
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
                <el-button type="primary" class="agree-refund" @click="refundReview(true)">同意退货/退款</el-button>
                <el-button @click="refundReview(false)">驳回退货/退款申请</el-button>
              </el-row>
            </el-form>
          </div>

          <div class="order-address" v-if="item.reviewType">
            <el-row class="order-detail detail-header">
              <el-col :span="6"><span>退款审核</span><span class="titme">{{item.addTime}}</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">回寄地址：{{item.address}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">收件人：{{item.consignee}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">联系电话：{{item.mobile}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">备注：{{item.remrks}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">审核状态：<span class="check-status">{{item.statusName}}</span></el-col>
            </el-row>
          </div>
        </div>

        <el-row class="order-detail" style="padding: 20px 0" v-if="(userInfo.status == 22) && userInfo.refundList && userInfo.refundList.length">
          <el-button type="primary" class="agree-refund" @click="refundAgain()">再次退款</el-button>
        </el-row>
      </div>

      <div class="order-address" v-if="(userInfo.refundInfo && userInfo.refundInfo.deliveryNo) || userInfo.status == 16">
        <div v-if="userInfo.refundInfo && userInfo.refundInfo.deliveryNo">
          <el-row class="order-detail detail-header">
            <el-col :span="6"><span>已寄回件</span><span class="titme">{{userInfo.refundInfo.addTime}}</span></el-col>
          </el-row>
          <el-row class="order-detail" v-if="userInfo.status == 16">
            <el-col :span="20"><span style="color: #f00">请核对订单信息，点击"确认退款"后，货款将原路退回。如须客户退回货物，请确认已收到回件并检查无误。</span></el-col>
          </el-row>

          <el-row class="order-detail" v-if="userInfo.status == 16">
            <el-col :span="20">退款金额：{{userInfo.refundInfo.refundPayable}}</el-col>
          </el-row>

          <el-row class="order-detail">
            <el-col :span="20">快递公司：{{userInfo.refundInfo.deliveryName}}</el-col>
          </el-row>
          <el-row class="order-detail">
            <el-col :span="20">快递单号：{{userInfo.refundInfo.deliveryNo}}</el-col>
          </el-row>
          <el-row class="order-detail" v-if="userInfo.status == 16">
            <el-col :span="20" class="input-form">审核意见: <el-input v-model="goodsOpinion" auto-complete="off"></el-input>
            </el-col>
          </el-row>
        </div>
        <el-row class="order-detail" style="padding-bottom: 40px" v-if="userInfo.status == 16">
          <el-button type="primary" class="agree-refund" @click="goodsConfirm(11)">确认收货并退款</el-button>
          <el-button @click="goodsConfirm(13)">驳回退货退款</el-button>
        </el-row>
      </div>

      <div v-if="userInfo.refundInfo && userInfo.refundInfo.type == 1">
        <div class="order-address" v-if="userInfo.refundList && userInfo.refundList.length" v-for="(item,index) in userInfo.refundList" :index="index" :key="index">

          <div v-if="!item.reviewType">
            <el-row class="order-detail detail-header">
              <el-col :span="6"><span>申请退款</span><span class="titme">{{item.addTime}}</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">服务类型：{{item.typeName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">商品状态：{{item.deliveryStatusName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款原因：{{item.reasonName}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款金额：{{item.refundAmt || ''}}元</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款说明：{{item.remrks}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">
                <p style="float: left">退款图片：</p>
                <p class="refun-img" v-for="(item,index) in item.picUrl" :index="index" :key="index">
                  <img :src="'http://dev.pt800.com/' + item" alt="" @click="lookImg">
                </p>
              </el-col>
            </el-row>
          </div>

          <div v-if="item.reviewType">
            <el-row class="order-detail detail-header">
              <el-col :span="6"><span>退款审核</span><span class="titme">{{item.addTime}}</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款意见：{{item.remrks || ''}}</el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">审核状态：<span class="check-status">{{item.statusName || ''}}</span></el-col>
            </el-row>
          </div>
        </div>

        <div class="order-address" v-if="userInfo.refundInfo.status == 6">
          <el-form label-width="120px">
            <el-row class="order-detail detail-header">
              <el-col :span="6"><span style="color: #f60">退款确认</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20"><span style="color: #f00">请核对订单信息，点击"确认退款"后，货款将原路退回。如须客户退回货物，请确认已收到回件并检查无误。</span></el-col>
            </el-row>
            <el-row class="order-detail">
              <el-col :span="20">退款金额：{{userInfo.refundInfo.refundAmt}} 元</el-col>
            </el-row>
            <el-form-item label="审核意见:" class="input-form">
              <el-input v-model="shopOpinion" auto-complete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-button type="primary" class="agree-refund" @click="refundConfirm(true)">同意退款</el-button>
              <el-button @click="refundConfirm(false)">驳回退款申请</el-button>
            </el-row>
          </el-form>
        </div>

        <el-row class="order-detail" style="padding-bottom: 40px;margin-top:10px" v-if="(userInfo.status == 22) && userInfo.refundList && userInfo.refundList.length">
          <el-button type="primary" class="agree-refund" @click="refundAgain()">再次退款</el-button>
        </el-row>
      </div>

      <div class="order-address" v-if="userInfo.refundInfo && userInfo.refundInfo.refundPaid">
        <el-row class="order-detail detail-header">
          <el-col :span="6"><span>退款情况</span><span class="titme">{{userInfo.refundInfo.addTime}}</span></el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">退款金额：{{userInfo.refundInfo.refundPaid}} 元</el-col>
        </el-row>
        <el-row class="order-detail">
          <el-col :span="20">退款状态：<span class="check-status">{{userInfo.refundInfo.statusName || ''}}</span></el-col>
        </el-row>
      </div>
    </div>
    <Loading v-show="loadingFlag"></Loading>

    <el-dialog :visible.sync="dialogImg" width="50%" :center="true" class="dialog-img">
      <img width="100%" :src="dialogImgSrc" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      loadingFlag: true,
      remarkSystem: "",
      dialogImg: false,
      dialogImgSrc: "",
      expressArry: [], //物流公司
      express: "",
      shopOpinion: "", //退款审核意见
      goodsOpinion: "", //寄回件 确认收货审核意见
      expressInfo: {
        // 快递信息
        trackingNumber: ""
      },
      lookRefundInfo: {}, //退款信息
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
    lookImg(e) {
      this.dialogImg = true;
      this.dialogImgSrc = e.target.src;
    },

    requestData() {
      this.$axios
        .get("/vendor/orderDetail", {
          params: { orderNo: this.$route.query.orderNo }
        })
        .then(data => {
          if (data.data.code === 1) {
            let datas = data.data.data;
            this.userInfo = datas;
            if (this.userInfo.refundInfo) {
              this.userInfo.refundInfo.picUrlArry =
                this.userInfo.refundInfo.picUrl &&
                this.userInfo.refundInfo.picUrl.split(",");
            }

            // userRefundList 申请退款  vendorRefundList 退款审核

            let refundList = [];
            if (datas.userRefundList) {
              datas.userRefundList.forEach((item, index) => {
                refundList.push(item);
                if (datas.vendorRefundList[index]) {
                  datas.vendorRefundList[index].reviewType = true;
                  refundList.push(datas.vendorRefundList[index]);
                }
              });
            }
            debugger;
            if (refundList.length) {
              refundList.forEach(item => {
                if (item.picUrl) {
                  item.picUrl = item.picUrl.split(",");
                }
              });

              this.userInfo.refundList = refundList;
            }
            console.log(this.userInfo);

            this.userInfo.address =
              datas.provinceName +
              datas.cityName +
              datas.districtName +
              datas.address;
          }
        });
    },

    //查看退款信息
    // handLookRefundInfo() {
    //   this.$axios
    //     .get("/vendor/orderReturnInfo", {params: { orderNo: this.$route.query.orderNo}})
    //     .then(data => {
    //       if (data.data.code == 1) {
    //         this.lookRefundInfo = data.data.data;
    //       } else {
    //         this.$message({
    //           message: data.data.msg,
    //           type: "warning"
    //         });
    //       }
    //     });
    // },

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
      this.express = val;
    },

    refundAgain() {
      this.$axios
        .get("/vendor/orderRefundAgain", {
          params: { orderNo: this.userInfo.orderNo }
        })
        .then(data => {
          if (data.data.code == 1) {
            this.requestData(); //刷新数据
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
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

      param.orderNo = this.userInfo.orderNo;
      param.express = this.express;
      param.deliveryNo = this.expressInfo.trackingNumber;

      this.$axios.post("/vendor/orderDelivery", param).then(data => {
        if (data.data.code == 1) {
          this.$message({
            message: "发货成功",
            type: "success"
          });
          debugger;
          this.requestData(); //刷新数据
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
    },

    goodsConfirm(type) {
      if (type == 13 && !this.goodsOpinion) {
        this.$message({
          message: "请输入备注",
          type: "warning"
        });
        return;
      }

      var param = {};
      param.orderNo = this.userInfo.orderNo;
      param.status = type;
      param.remarks = this.goodsOpinion;

      this.$axios.post("/vendor/orderReturnConfirm", param).then(data => {
        if (data.data.code == 1) {
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
      let param = {};
      if (flag) {
        param.status = 17;
      } else {
        param.status = 12;
      }

      if (param.status == 12 && !this.shopOpinion) {
        this.$message({
          message: "请填写审核意见",
          type: "warning"
        });
        return;
      }

      param.orderNo = this.userInfo.orderNo;
      param.remarks = this.shopOpinion;

      this.$axios.post("/vendor/orderRefund", param).then(data => {
        if (data.data.code == 1) {
          this.$message({
            message: data.data.msg,
            type: "success"
          });
          setTimeout(() => {
            this.requestData();
          }, 1000);
        } else {
          this.$message({
            message: data.data.msg,
            type: "warning"
          });
        }
      });
    },

    refundReview(flag) {
      // 退款退货审核
      let param = {};

      if (!flag) {
        if (!this.refundReviewInfo.opinion) {
          this.$message({
            message: "请填写审核意见",
            type: "warning"
          });
          return;
        }
      } else {
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
      }

      param = {
        address: this.refundReviewInfo.adress,
        consignee: this.refundReviewInfo.consignee,
        mobile: this.refundReviewInfo.phone,
        remarks: this.refundReviewInfo.opinion,
        orderNo: this.userInfo.orderNo
      };

      if (flag) {
        // 同意
        param.status = 14;
      } else {
        // 驳回
        param.status = 13;
      }

      this.$axios.post("/vendor/orderReturn", param).then(data => {
        if (data.data.code == 1) {
          this.$message({
            message: data.data.msg,
            type: "success"
          });
          setTimeout(() => {
            this.requestData();
          }, 1000);
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
  .star {
    color: red;
    margin-right: 5px;
  }
}

.input-form {
  .el-form-item__label {
    width: auto !important;
    font-size: 18px;
    color: #333;
  }
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

.refun-img {
  width: 80px;
  height: 80px;
  float: left;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
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
    font-weight: bold;
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

.agree-refund {
  span {
    color: #fff;
  }
}

.check-status {
  color: #f60;
}

.dialog-img img {
  display: inline-block;
  width: 100%;
}
</style>
