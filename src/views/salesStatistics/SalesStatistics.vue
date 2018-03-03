<template>
 <div>
   <div v-show="!loadingFlag"> 
  <el-form :inline="true" :model="formSearch" class="demo-form-inline">
    <el-form-item>
      <el-select v-model="formSearch.status" placeholder="红包类型">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="专属红包" value="shanghai"></el-option>
        <el-option label="通用红包" value="beijing"></el-option>
        <el-option label="未使用红包" value="beijing"></el-option>
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
  </el-form>
  <el-table :data="tableData3" height="400" border style="width: 100%;">
    <el-table-column
      prop="orderNumb"
      label="订单编码号"
      width="250" align="center">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品名称" align="center">
    </el-table-column>
    <el-table-column
      prop="orderAmount"
      label="订单金额" align="center">
    </el-table-column>
    <el-table-column
      prop="payAmount"
      label="支付金额" align="center">
    </el-table-column>
    <el-table-column
      prop="envelopeAmount"
      label="使用红包金额" align="center">
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
    <el-row style="margin: 15px 0;float: right">
     <el-col :span="24">总订单金额：<span style="color: #006699">1235.0</span>   总支付金额：<span style="color: #FF0000">2345.0</span>  总红包金额：<span style="color: #FF0000">65.0</span></el-col>
  </el-row>
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
      formSearch: {
        dateStart: "",
        dateEnd: ""
      },

      tableData3: [
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
        },
        {
          orderNumb: "201801091000024963876",
          goodsName: "XX茶叶",
          orderAmount: "￥3838.00",
          payAmount: "￥3800",
          envelopeAmount: "￥30"
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
