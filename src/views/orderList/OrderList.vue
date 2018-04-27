<template>
 <div>
   <div v-show="!loadingFlag">
      <el-form :inline="true" :model="formSearch" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formSearch.orderNo" placeholder="订单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formSearch.status" placeholder="订单状态" @change="statusSelect">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(items, index) in orderTypeList" :label="items.name" :value="items.code" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-col :span="10" style="margin-right: 30px;">
            <el-date-picker v-model="payTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item style="margin-left: -20px;">
          <el-button  type="primary" @click="onSubmit('formSearch')">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button @click="onSubmit" style="margin-left: 8px">导出</el-button>
        </el-form-item> -->
      </el-form>
      <el-table :data="tableData3"  v-loading="tabLoadingFlag" height="600" border style="width: 100%;text-align: center">
        <el-table-column
          prop="memberName"
          label="用户昵称"
          width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单编号"
          width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称" align="center">
        </el-table-column>
        <el-table-column
          prop="addTime"
          label="下单时间" align="center">
        </el-table-column>
        <el-table-column
          prop="statusName"
          label="订单状态" align="center">
        </el-table-column>
        <el-table-column
          prop="amountPayable"
          label="订单金额" align="center">
        </el-table-column>
        <el-table-column
          prop="payTypeName"
          label="付款方式" align="center">
        </el-table-column>
        <el-table-column
          prop="couponReducePrice"
          label="红包使用情况" align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="260" align="center">
          <template slot-scope="scope">
            <el-button size="mini"  @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" v-if="scope.row.status == 1" type="primary" @click="handleShip(scope.$index, scope.row)">发货</el-button>
            <el-button size="mini" v-else-if="(scope.row.status == 6 || scope.row.status == 10)" type="primary" @click="handleRefund(scope.$index, scope.row)">退款审核</el-button>
            <el-button size="mini" v-else-if="(scope.row.status == 16)" type="primary" @click="confirmRefund(scope.$index, scope.row)">确认退款</el-button>
            <el-button size="mini" v-else-if="(scope.row.status == 11)" type="primary" @click="handLookRefundInfo(scope.$index, scope.row)">查看退款信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-cont">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="30"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="发货" class="" width="30%" :center="true" :visible.sync="dialogVisibleShop">
      <el-form :model="shopForm"  label-width="100px">
        <el-form-item label="订单编号:">
          <el-input v-model="shopForm.orderNo" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名:">
          <el-input v-model="shopForm.memberName" auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="收货人电话:">
          <el-input v-model="shopForm.phone" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="收货人地址:">
          <el-input v-model="shopForm.address" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="收货人邮编:">
          <el-input v-model="shopForm.zipCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="快递公司:">
          <el-select v-model="shopForm.express" placeholder="请选择快递公司" @change="companySel">
            <el-option v-for="(items, index) in expressArry" :label="items.name" :value="items.code" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号:">
          <el-input v-model="shopForm.trackingNumber" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleShop = false">取 消</el-button>
        <el-button type="primary" @click="shopConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="确认退款" class="" width="30%" :center="true" :visible.sync="dialogVisibleConfirm">
      <el-form :model="confirmForm"  label-width="100px">
        <el-form-item label="订单编号:">
          <el-input v-model="confirmForm.orderNo" auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="退货快递公司:">
          <el-input v-model="confirmForm.deliveryName" auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="退货快递单号:">
          <el-input v-model="confirmForm.deliveryNo" auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="退款备注:">
          <el-input v-model="confirmForm.shopRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="refundConfirmTwo(11)">确认退款</el-button>
        <el-button @click="refundConfirmTwo(13)">驳回退款申请</el-button>
      </div>
    </el-dialog>

    <el-dialog title="退款信息" class="" width="30%" :center="true" :visible.sync="dialogLookRefund">
      <el-row class="o`rder-detail`">
        <el-col :span="20">订单编号： {{lookRefundInfo.orderNo}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款类型: {{lookRefundInfo.typeName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款金额: {{lookRefundInfo.refundPayable}}元</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款原因: {{lookRefundInfo.customReturnReason}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退单状态: {{lookRefundInfo.returnStatusIdName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退单原因: {{lookRefundInfo.returnReasonIdName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退款图片: 
          <p class="refun-img" v-for="(item,index) in lookRefundInfo.picUrl" :index="index" :key="index" >
            <img :src="'http://dev.pt800.com/' + item" alt="">
          </p>
        </el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">收件人: {{lookRefundInfo.consignee}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">电话号: {{lookRefundInfo.mobile}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">地址: {{lookRefundInfo.address}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">是否已经收货: {{lookRefundInfo.deliveryStatusName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">快递公司: {{lookRefundInfo.deliveryName}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">快递单号: {{lookRefundInfo.deliveryNo}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退单申请时间: {{lookRefundInfo.addTime}}</el-col>
      </el-row>
      <el-row class="order-detail">
        <el-col :span="20">退单完成时间: {{lookRefundInfo.finishTime}}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogLookRefund=false">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="refundForm.statusName" class="" width="30%" :center="true" :visible.sync="dialogVisibleRefund">
      <el-form :model="shopForm"  label-width="100px">
        <el-form-item label="订单编号:">
          <el-input v-model="refundForm.orderNo" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品状态:">
          <el-input v-model="refundForm.deliveryStatusName" auto-complete="off" disabled></el-input>
        </el-form-item>
         <el-form-item label="退款原因:">
          <el-input v-model="refundForm.reason" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款说明:">
          <el-input v-model="refundForm.remarks" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款金额:">
          <el-input v-model="refundForm.amt" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="退款图片:" class="refund-img">
          <img :src="'http://dev.pt800.com/' + refundForm.pic" alt="">
        </el-form-item>
        <el-form-item label="收件人姓名:">
          <el-input v-model="refundForm.consignee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件人手机:">
          <el-input v-model="refundForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收件人地址:">
          <el-input v-model="refundForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款备注:">
          <el-input v-model="refundForm.shopRemark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="refundConfirm(true)">确认退货/退款</el-button>
        <el-button @click="refundConfirm(false)">驳回退货/退款申请</el-button>
      </div>
    </el-dialog>
    
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      loadingFlag: true,
      tabLoadingFlag: true,
      dialogVisibleShop: false,
      dialogVisibleConfirm: false,
      dialogVisibleRefund: false,
      dialogLookRefund: false,
      orderTypeList: [],
      expressArry: [],
      payTime: '',
      total: 0,
      formSearch: {
        shopId: '',
        orderNo: '',
        status: '',
        pageSize: '',
        pageNo: ''
      },
      confirmForm:  {
        orderNo: "",
        shopRemark: ''
      },
      shopForm: {
        orderNo: "",
        memberName: "",
        address: "",
        phone: '',
        trackingNumber: "",
        zipCode: ''
      },
      refundForm: {
        orderNo: '',
        amt: 0,
        deliveryStatusName: '',
        reason: '',
        pic: '',
        shopRemark: '',
        remarks: '',
        statusName: ''
      },
      lookRefundInfo: {
        orderNo: '',
        refundPayable: '',
        customReturnReason: '',
        picUrl: '',
        consignee: '',
        mobile: '',
        address: '',
        addTime: ''
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      tableData3: []
    };
  },

  components: {
    Loading
  },

  beforeMount() {
    this.$axios
      .get("/getDictList", { params: { type: "order_status" } })
      .then(data => {
        if (data.data.code === 1) {
          this.orderTypeList = data.data.data;
          this.$axios
            .get("/getDictList", { params: { type: "express_company" } })
            .then(data => {
              if (data.data.code === 1) {
                this.expressArry = data.data.data;
              }
            });
        }
      });

      this.onSubmit();
  },

  mounted: function() {
    this.loadingFlag = false;
  },

  methods: {
    companySel(val) {
      this.express = val;
    },

    statusSelect() {
      this.onSubmit();
    },

    handleDetail(index, row) {
      this.$router.push({
        path: "/orderDetails",
        query: { orderNo: row.orderNo }
      });
    },

    //查看退款信息
    handLookRefundInfo(index, row) {
      this.dialogLookRefund = true;
      this.$axios
        .get("/vendor/orderReturnInfo", {params: { orderNo: row.orderNo }})
        .then(data => {
          if (data.data.code == 1) {
            this.lookRefundInfo = data.data.data;
            this.lookRefundInfo.picUrl = data.data.data.picUrl.split(',');
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    //确认退款
    confirmRefund(index, row) {
      this.confirmForm.orderNo = row.orderNo;
      this.confirmForm.deliveryName = row.refundInfo.deliveryName;
      this.confirmForm.deliveryNo = row.refundInfo.deliveryNo;
      this.dialogVisibleConfirm = true;
    },

    refundConfirmTwo(type) {
      if(type == 13 && !this.confirmForm.shopRemark) {
         this.$message({
              message: '请输入退款备注',
              type: "warning"
            });
            return;
      }

      var param = {};
      param.orderNo = this.confirmForm.orderNo;
      param.status = type;
      param.remarks = this.confirmForm.shopRemark;

      this.$axios
        .post("/vendor/orderReturnConfirm", param)
        .then(data => {
          if (data.data.code == 1) {
            this.$message({
              message: "退款成功",
              type: "success"
            });

            this.dialogVisibleConfirm = false;
            this.onSubmit();
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    handleShip(index, row) {
      this.shopForm.orderNo = row.orderNo;
      this.shopForm.memberName = row.consignee;
      this.shopForm.phone = row.mobile;
      this.shopForm.address = row.provinceName + row.cityName + row.districtName + row.address;
      this.shopForm.zipCode = row.zipCode;
      this.dialogVisibleShop = true;
    },

    shopConfirm() {
      var param = {};

      if(!this.shopForm.express) {
        this.$message({
              message: '请选择快递公司',
              type: "warning"
            });
            return;
      }

      if(!this.shopForm.trackingNumber) {
          this.$message({
              message: '请输入快递单号',
              type: "warning"
            });
            return;
      }

      param.orderNo = this.shopForm.orderNo;
      param.express = this.shopForm.express;
      param.deliveryNo = this.shopForm.trackingNumber;

      this.$axios
        .post("/vendor/orderDelivery", param)
        .then(data => {
          if (data.data.code == 1) {
            this.$message({
              message: "发货成功",
              type: "success"
            });

            this.dialogVisibleShop = false;
            this.onSubmit();
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    handleRefund(index, row) {
      this.refundForm.orderNo = row.orderNo;
      this.refundForm.amt = row.refundInfo.refundAmt;
      this.refundForm.deliveryStatusName = row.refundInfo.deliveryStatusName;
      this.refundForm.reason = row.refundInfo.reason;
      this.refundForm.pic = row.refundInfo.picUrl && row.refundInfo.picUrl.split(',')[0];
      this.refundForm.remarks = row.refundInfo.remrks;

      if(row.status == 10) {
        this.refundForm.statusName = '退款退货审核';
      } else if(row.status == 6) {
        this.refundForm.statusName = '退款审核';
      }

      this.refundStatus = row.status;
      this.dialogVisibleRefund = true;
    },

    refundConfirm(flag) {
      // 确认退款
      var url = '';
      var param = {};
      param.orderNo = this.refundForm.orderNo;
      // 退货退款
      if(this.refundStatus == 10) {
        url = '/vendor/orderReturn';
        if(flag) {
          // 同意
          param.status = 14;
        } else {
          // 驳回
          param.status = 13;
        }
      } else if(this.refundStatus == 6) {
        ///退款
        url = '/vendor/orderRefund';
        if(flag) {
          param.status = 17;
        } else {
          param.status = 12;
        }
      }

      if(this.refundStatus == 10) {
        if(!this.refundForm.consignee) {
           this.$message({
           message: '请填写收件人',
           type: "warning"
          });
          return;
        }

        if(!this.refundForm.mobile) {
           this.$message({
           message: '请填写收件人电话',
           type: "warning"
          });
          return;
        }
        
        if(!this.refundForm.address) {
           this.$message({
           message: '请填写收件人地址',
           type: "warning"
          });
          return;
        }
      }

      if((param.status == 12 || param.status == 13) && !this.refundForm.shopRemark) {
        this.$message({
           message: '请填写驳回说明',
           type: "warning"
        });
        return;
      }

      param.remarks = this.refundForm.shopRemark;
      param.consignee = this.refundForm.consignee;
      param.mobile = this.refundForm.mobile;
      param.address = this.refundForm.address;

      this.$axios
        .post(url, param)
        .then(data => {
          if (data.data.code == 1) {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
            setTimeout(() => {
              this.dialogVisibleRefund = false;
              this.onSubmit();
            }, 1000);
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    handleSizeChange(value) {
      this.formSearch.pageSize = value;
      this.onSubmit();
    },

    handleCurrentChange(value) {
      this.formSearch.pageNo = value;
      this.onSubmit();
    },

    zeroFilling(n) {
      if (n > 10) {
        return n;
      } else if (n < 10) {
        return "0" + n + "";
      }
    },

    onSubmit: function() {
      if (this.payTime.length) {
        let start = this.payTime[0];
        let end = this.payTime[1];
        this.formSearch.startTime =
          start.getFullYear() +
          "-" +
          this.zeroFilling(start.getMonth() + 1) +
          "-" +
          this.zeroFilling(start.getDate());
        this.formSearch.endTime =
          end.getFullYear() +
          "-" +
          this.zeroFilling(end.getMonth() + 1) +
          "-" +
          this.zeroFilling(end.getDate());
      }
      this.tabLoadingFlag = true;
      this.$axios
        .get("/vendor/orderList", { params: this.formSearch })
        .then(data => {
          if (data.data.code == 1) {
            this.tableData3 = data.data.data;
            this.total = data.data.total;
            this.tabLoadingFlag = false;
          } else {
            this.tabLoadingFlag = false;
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
.el-form--inline {
  .el-form-item {
    margin-right: 5px;
  }
}

.el-button--primary {
  span {
    color: #fff;
  }
}

.el-button--success {
  background-color: #00ae66;
  border-color: #00ae66;
  a {
    color: #fff;
  }
}

.pagination-cont {
  background: #fafafa;
  width: 100%;
  height: 42px;
  padding: 5px 0;
}

.el-pagination {
  float: right;
}

.el-date-editor .el-range-separator {
  width: 8%;
}

.refund-img {
  .el-form-item__content {
    width: 80px;
    height: 80px;
  }
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}

.refun-img {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  vertical-align: middle;
   img {
    width: 100%;
    height: 100%;
  }
}

.order-detail {
  margin-bottom: 10px;
}
</style>
