<template>
 <div>
  <el-form :inline="true" :model="formSearch" class="demo-form-inline">
    <el-form-item>
      <el-input v-model="formSearch.name" placeholder="账户代码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="formSearch.status" placeholder="提现状态">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="有效" value="shanghai"></el-option>
        <el-option label="无效" value="beijing"></el-option>
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
      prop="time"
      label="提现时间"
      width="200" align="center">
    </el-table-column>
    <el-table-column
      prop="orderNumb"
      label="订单号"
      width="250" align="center">
    </el-table-column>
    <el-table-column
      prop="fundingChannels"
      label="资金渠道" align="center">
    </el-table-column>
    <el-table-column
      prop="withdrawalAmount"
      label="提现金额" align="center">
    </el-table-column>
    <el-table-column
      prop="fee"
      label="手续费" align="center">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态" align="center">
    </el-table-column>
    <el-table-column
      label="查看"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
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
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
        },
        {
          time: '2018-02-02 23:07:19',
          orderNumb: '201801091000024963876',
          fundingChannels: 'XXX支行',
          withdrawalAmount: '3838.00',
          fee: '￥10',
          status: '成功'
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
