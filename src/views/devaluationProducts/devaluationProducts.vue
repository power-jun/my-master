<template>
  <div class="devaluation-cont">
    <h3>已选择首推商品</h3>
    <el-table :data="devaluationData" border style="width: 100%;text-align: center">
      <el-table-column
        prop="id"
        label="商品ID" width="80">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称" align="center">
      </el-table-column>
      <el-table-column
        prop="goodscategory"
        label="商品类目" align="center">
      </el-table-column>
      <el-table-column
        prop="goodsStatus"
        label="商品状态" align="center">
      </el-table-column>
      <el-table-column
        prop="bannerPic"
        label="banner图片" align="center">
      </el-table-column>
      <el-table-column
        label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3>待选择商品</h3>
    <el-table :data="waitGoodsData" border style="width: 100%;text-align: center">
      <el-table-column
        prop="id"
        label="商品ID"
        width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称" align="center">
      </el-table-column>
      <el-table-column
        prop="goodscategory"
        label="商品类目" align="center">
      </el-table-column>
      <el-table-column
        prop="goodsStatus"
        label="商品状态" align="center">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间" align="center">
      </el-table-column>
      <el-table-column
        label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
      devaluationData: [
        {
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          bannerPic: "banner图片"
        },
        {
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          bannerPic: "banner图片"
        },{
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          bannerPic: "banner图片"
        },{
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          bannerPic: "banner图片"
        },
      ],

      waitGoodsData: [
        {
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          createDate: "2016-06-23 00:00:00"
        },
        {
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          createDate: "2016-06-23 00:00:00"
        },{
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          createDate: "2016-06-23 00:00:00"
        },{
          id: "12",
          goodsname: "XXX礼品",
          goodscategory: "礼品",
          goodsStatus: "正常",
          createDate: "2016-06-23 00:00:00"
        },
      ],
    };
  }
};
</script>

<style lang="scss">
  .devaluation-cont {
    h3 {
      margin-bottom: 15px;
    }
    .el-table {
      margin-bottom: 15px;
    }
  }
</style>
