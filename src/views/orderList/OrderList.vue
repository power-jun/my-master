<template>
 <div>
  <el-form :inline="true" :model="formSearch" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="formSearch.name" placeholder="订单编号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="formSearch.status" placeholder="订单状态">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="未支付" value="shanghai"></el-option>
        <el-option label="已支付" value="beijing"></el-option>
        <el-option label="待发货" value="beijing"></el-option>
        <el-option label="已发货" value="beijing"></el-option>
        <el-option label="待确认" value="beijing"></el-option>
        <el-option label="已退款" value="beijing"></el-option>
        <el-option label="申请退款" value="beijing"></el-option>
        <el-option label="退款中" value="beijing"></el-option>
        <el-option label="已退款" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-col :span="10" style="margin-right: 30px;">
        <el-date-picker type="date" placeholder="选择开始日期" v-model="formSearch.dateStart"></el-date-picker>
      </el-col>
      <el-col :span="10">
        <el-date-picker type="date" placeholder="选择结束日期" v-model="formSearch.dateEnd"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSubmit" style="margin-left: 8px">导出</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData3" height="600" border style="width: 100%;text-align: center">
    <el-table-column
      prop="id"
      label="ID"
      width="60">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户昵称"
      width="180" align="center">
    </el-table-column>
    <el-table-column
      prop="orderNumb"
      label="订单编号"
      width="180" align="center">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品名称" align="center">
    </el-table-column>
    <el-table-column
      prop="orderDate"
      label="下单时间" align="center">
    </el-table-column>
    <el-table-column
      prop="orderStatus"
      label="订单状态" align="center">
    </el-table-column>
    <el-table-column
      prop="orderAmount"
      label="订单金额" align="center">
    </el-table-column>
    <el-table-column
      prop="paymentMethod"
      label="付款方式" align="center">
    </el-table-column>
    <el-table-column
      prop="envelopeUsage"
      label="红包使用情况" align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        <el-button type="text" size="small">发货</el-button>
        <el-button type="text" size="small">退款审核</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-cont">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
  <Loading v-show="loadingFlag"></Loading>
 </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      formSearch: {
        dateStart: "",
        dateEnd: ""
      },

      tableData3: [
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
        {
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },{
          id: "1",
          userName: "KKKKK",
          orderNumb: "S20170623562389",
          goodsName: "XXX韩版女装",
          orderDate: "2016-06-23 00:00:00",
          orderStatus: "未支付",
          orderAmount: "￥50.00",
          paymentMethod:  "微信",
          envelopeUsage: "通用红包"
        },
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

    onSubmit: function() {
      
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
  margin-left: -20px;
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
  background: #ddd;
  width: 100%;
  height: 42px;
  padding: 5px 0;
}

.el-pagination {
  float: right;
}
</style>
