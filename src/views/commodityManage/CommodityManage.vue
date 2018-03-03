<template>
 <div>
   <div v-show="!loadingFlag">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formSearch.status" placeholder="商品状态">
          <el-option label="全部" value="shanghai"></el-option>
          <el-option label="已上架" value="shanghai"></el-option>
          <el-option label="未上架" value="beijing"></el-option>
          <el-option label="未审核" value="beijing"></el-option>
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
      <el-form-item style="float: right">
        <el-button type="success">
          <router-link tag="a" :to="'/addedGoods'">新增商品</router-link>
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData3" border style="width: 100%;text-align: center">
      <el-table-column
        prop="id"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="commodityNumb"
        label="商品编号"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="commodityName"
        label="商品名称" align="center">
      </el-table-column>
      <el-table-column
        prop="specification"
        label="重量/规格" align="center">
      </el-table-column>
      <el-table-column
        prop="commodityClassify"
        label="商品分类" align="center">
      </el-table-column>
      <el-table-column
        prop="commodityStatus"
        label="商品状态" align="center">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间" align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="产地" align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "可口可乐",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "海外"
        },
        {
          id: "44",
          commodityNumb: "S20170623562389",
          commodityName: "雪碧",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
        {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "韩版流行女装",
          specification: "1件",
          commodityClassify: "服装",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
        {
          id: "44",
          commodityNumb: "S20170623562389",
          commodityName: "雪碧",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
         {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "韩版流行女装",
          specification: "1件",
          commodityClassify: "服装",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
         {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "韩版流行女装",
          specification: "1件",
          commodityClassify: "服装",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
        {
          id: "44",
          commodityNumb: "S20170623562389",
          commodityName: "雪碧",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
        {
          id: "55",
          commodityNumb: "S20170623562389",
          commodityName: "可口可乐",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "海外"
        },
        {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "可口可乐",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "海外"
        },
         {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "韩版流行女装",
          specification: "1件",
          commodityClassify: "服装",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        }, {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "韩版流行女装",
          specification: "1件",
          commodityClassify: "服装",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "广东"
        },
        {
          id: "1",
          commodityNumb: "S20170623562389",
          commodityName: "可口可乐",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "海外"
        },
        {
          id: "66",
          commodityNumb: "S20170623562389",
          commodityName: "可口可乐",
          specification: "350ML",
          commodityClassify: "饮料",
          commodityStatus: "已上架",
          createDate: "2016-06-23 00:00:00",
          address: "海外"
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
