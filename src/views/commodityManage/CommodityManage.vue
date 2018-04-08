<template>
 <div>
   <div v-show="!loadingFlag">
    <el-form :inline="true" :model="formSearch" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formSearch.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formSearch.status" placeholder="商品状态" clearable @change="statusSelect">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item, index) in statusArry" :label="item.name" :value="item.code" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-right: 30px;">
        <el-date-picker v-model="searchdate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
      </el-form-item>
      <el-form-item class="search-btn">
        <el-button type="primary" @click="onSubmit('formSearch')">查询</el-button>
        <el-button  @click="clearAll">清空</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="success">
          <router-link tag="a" :to="'/editAddedGoods'">新增商品</router-link>
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData3" v-loading="tabLoadingFlag" border height="620" style="width: 100%;text-align: center">
      <el-table-column
        prop="id"
        label="ID"
        width="200" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称" align="center">
      </el-table-column>
      <el-table-column
        prop="spec"
        label="重量/规格" align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="商品分类" align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="商品状态" align="center">
        <template slot-scope="scope">
           <span v-if="scope.row.status == 0">未审核</span>
           <span v-else-if="scope.row.status == 1">已审核，上架</span>
           <span v-else-if="scope.row.status == 2">已下架</span>
           <span v-else-if="scope.row.status == 3">审核未通过</span>
          </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间" align="center">
      </el-table-column>
      <!-- <el-table-column
        prop="place"
        label="产地" align="center">
      </el-table-column> -->
      <el-table-column
        prop="picUrl"
        label="商品图片"
        align="center"
        width="180">
        <template slot-scope="scope">
          <img :src="'http://dev.pt800.com/' + scope.row.picUrl.split(',')[0]" alt="" @click="dilogBigImg(scope.$index)" style="width: 50px;height: 50px">
          <el-dialog :visible.sync="dialogVisible[scope.$index].dialog">
            <img width="100%" :src="'http://dev.pt800.com/' + scope.row.picUrl.split(',')[0]" alt="">
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="left"
        width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDropOff(scope.$index, scope.row)" v-if="(scope.row.status == 1)">下架</el-button>
          <el-button size="mini" @click="handleDropOff(scope.$index, scope.row)" v-else-if="(scope.row.status == 2)">上架</el-button>
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
      formSearch: {
        name: "",
        status: "",
        pageNo: "1",
        pageSize: "10",
        startTime: "",
        endTime: ""
      },
      dialogVisible: [],
      searchdate: "",
      total: 0,
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

      statusArry: [],

      tableData3: []
    };
  },

  components: {
    Loading
  },

  computed: {
    editor() {
      return this.$refs.myTextEditor.quill;
    }
  },

  beforeMount() {
    this.$axios
      .get("/getDictList", { params: { type: "product_type" } })
      .then(data => {
        if (data.data.code === 1) {
          this.statusArry = data.data.data;
        }
      });
  },

  mounted: function() {
    this.loadingFlag = false;
    this.onSubmit();
  },

  methods: {
    dilogBigImg(index) {
      this.dialogVisible[index].dialog = true;
    },

    handleSizeChange(value) {
      this.formSearch.pageSize = value;
      this.onSubmit();
    },

    handleCurrentChange(value) {
      this.formSearch.pageNo = value;
      this.onSubmit();
    },

    statusSelect() {
      this.onSubmit();
    },

    handleEdit(index, row) {
      this.$router.push({ path: "/editAddedGoods", query: { id: row.id } });
    },

    handleDropOff(index, row) {
      let status = '';
      if (row.status == 1) {
        status = 2;
      } else if (row.status == 2) {
        status = 1;
      }

      this.$axios
        .get("/vendor/productOnsale", {
          params: { productId: row.id, status: status }
        })
        .then(data => {
          if (data.data.code === 1) {
            this.$message({
              message: data.data.msg,
              type: "success"
            });
            this.onSubmit();
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    },

    zeroFilling(n) {
      if (n > 10) {
        return n;
      } else if (n < 10) {
        return "0" + n;
      }
    },

    clearAll() {
      this.formSearch.name = "";
      this.formSearch.status = "";
      this.formSearch.startTime = "";
      this.formSearch.endTime = "";
      this.searchdate = "";
    },

    onSubmit() {
      this.tabLoadingFlag = true;
      let searchParam = {};
      searchParam.name = this.formSearch.name;
      searchParam.status = this.formSearch.status;
      searchParam.pageSize = this.formSearch.pageSize;
      searchParam.pageNo = this.formSearch.pageNo;

      if (this.searchdate.length) {
        let start = this.searchdate[0];
        let end = this.searchdate[1];
        searchParam.startTime =
          start.getFullYear() +
          "-" +
          this.zeroFilling(start.getMonth() + 1) +
          "-" +
          this.zeroFilling(start.getDate());
        searchParam.endTime =
          end.getFullYear() +
          "-" +
          this.zeroFilling(end.getMonth() + 1) +
          "-" +
          this.zeroFilling(end.getDate());
      }

      this.$axios
        .get("/vendor/productList", { params: searchParam })
        .then(data => {
          if (data.data.code === 1) {
            this.tableData3 = data.data.data || [];
            for (let i = 0; i < this.tableData3.length; i++) {
              this.dialogVisible.push({ dialog: false });
            }
            this.tabLoadingFlag = false;
            this.total = data.data.total;
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

.search-btn {
  .el-button--primary {
    margin-left: -20px;
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

.el-dialog__wrapper {
  .el-dialog {
    width: 40%;
  }
}
</style>
