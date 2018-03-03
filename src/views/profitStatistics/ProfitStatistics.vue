<template>
 <div>
  <el-form :inline="true" :model="formSearch" class="demo-form-inline">
     <el-form-item>
      <el-input v-model="formSearch.name" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="formSearch.status" placeholder="时间类型">
        <el-option label="按月统计" value="shanghai"></el-option>
        <el-option label="按周统计" value="shanghai"></el-option>
        <el-option label="按日统计" value="beijing"></el-option>
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
      prop="goodsName"
      label="商品名称" align="center">
    </el-table-column>
    <el-table-column
      prop="orderNumb"
      label="SKUID"
      width="250" align="center">
    </el-table-column>
    <el-table-column
      prop="sales"
      label="销售额" align="center">
    </el-table-column>
    <el-table-column
      prop="cost"
      label="成本" align="center">
    </el-table-column>
    <el-table-column
      prop="withdrawalFee"
      label="提现手续费" align="center">
    </el-table-column>
    <el-table-column
      prop="profit"
      label="利润" align="center">
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
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },
        {
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },{
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },{
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },{
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },{
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
        },{
          orderNumb: '201801091000024963876',
          goodsName: 'XX茶叶',
          sales: '￥309',
          cost: '￥30',
          withdrawalFee: '￥30',
          profit: '￥10'
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
