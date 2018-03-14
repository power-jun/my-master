<template>
  <div class="devaluation-cont">
    <div v-show="!loadingFlag">
      <h3>已选择首推商品</h3>
      <el-table :data="devaluationData" border style="width: 100%;text-align: center">
        <el-table-column
          prop="id"
          label="商品ID" width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称" align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类目" align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="商品状态" align="center">
        </el-table-column>
        <el-table-column
          prop="bannerPic"
          label="banner图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.bannerPic" alt="" @click="dilogBigImg(scope.$index)" style="width: 50px;height: 50px">
            <el-dialog :visible.sync="dialogVisible[scope.$index].dialog">
              <img width="100%" :src="scope.row.bannerPic" alt="">
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.native.prevent="handleRemove(scope.$index, devaluationData)">移除</el-button>
            <el-button size="mini" type="primary" @click="handleUpload(scope.$index, scope.row)">上传</el-button>
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
          prop="name"
          label="商品名称" align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="商品类目" align="center">
        </el-table-column>
        <el-table-column
          prop="status"
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
    <Loading v-show="loadingFlag"></Loading>
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
      loadingFlag: true,
      dialogVisible: [{ dialog: false }, { dialog: false }, { dialog: false }],
      devaluationData: [
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          bannerPic: "banner图片"
        },
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          bannerPic: "banner图片"
        },
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          bannerPic: "banner图片"
        }
      ],

      waitGoodsData: [
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          createDate: "2016-06-23 00:00:00"
        },
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          createDate: "2016-06-23 00:00:00"
        },
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          createDate: "2016-06-23 00:00:00"
        },
        {
          id: "12",
          name: "XXX礼品",
          type: "礼品",
          status: "正常",
          createDate: "2016-06-23 00:00:00"
        }
      ]
    };
  },

  beforeMount() {
    this.$axios
      .get("/vendor/firstProductList", { params: { shopId: "" } })
      .then(data => {
        if (data.data.code === 1) {
          this.devaluationData = data.data.data;
          console.log(this.devaluationData.length);
          for (let i = 0; i < this.devaluationData.length; i++) {
            this.dialogVisible.push({ dialog: false });
          }
        }
      });
  },

  mounted: function() {
    this.loadingFlag = false;
  },

  methods: {
    dilogBigImg(index) {
      this.dialogVisible[index].dialog = true;
    },

    handleRemove(index, row) {
      row.splice(index, 1);
    },

    handleUpload(index, row) {}
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

.el-button--primary {
  span {
    color: #fff;
  }
}
</style>
