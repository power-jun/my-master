<template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <!-- <div id="example">
            <p>Computed reversed message: "{{ reversedMessage }}"</p>
          </div>-->
      <el-form ref="form" :model="form" label-width="160px">
        <h3>商家入驻申请</h3>
        <p class="form-line-title">入驻联系人信息</p>
        <el-form-item label="联系人姓名:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="电子邮箱:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <p class="form-line-title">公司信息</p>
        <el-form-item label="公司名称:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="营业执照注册号:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法定代表身份证号码:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="营业执照副本电子版:">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="法人身份证电子版:">
          <el-row>
            <el-col :span="8">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p class="pic-tips">正面</p>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
            <el-col :span="8">
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p class="pic-tips">反面</p>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-col>
          </el-row>
        </el-form-item>
        <p class="form-line-title">银行账户信息</p>
        <el-form-item label="银行开户名:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="公司银行账号:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开户行支行名称:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="开户行支行地址:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <p class="form-line-title">经营信息</p>
        <el-form-item label="公司类型:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="最近一年销售额:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="预计评价客单价:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="常用快递公司:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <p class="form-line-title">店铺信息</p>
        <el-form-item label="店铺头像:" :rules="[{ required: true, message: ''}]">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
              <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="店铺类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="旗舰店"></el-radio>
            <el-radio label="专营店"></el-radio>
            <el-radio label="专卖店"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="店铺名称:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述:">
          <el-input type="textarea" v-model="form.desc" placeholder="至少输入50字，最多200字"></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
          <el-select placeholder="全部">
            <el-option label="北京" value="shanghai"></el-option>
            <el-option label="深圳" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="全部">
            <el-option label="区域1" value="shanghai"></el-option>
            <el-option label="区域2" value="beijing"></el-option>
          </el-select>
          <el-select placeholder="全部">
            <el-option label="区域1" value="shanghai"></el-option>
            <el-option label="区域2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit" class="submit-btn">提交申请</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script>
import Loading from "components/loading";

export default {
  data() {
    return {
      form: {
        name: "",
        imageUrl: "",
        desc: "",
        resource: "旗舰店"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fullscreenLoading: false,
      loadingFlag: true
    };
  },

  components: {
    Loading
  },

  computed: {},

  beforeMount: function() {},

  mounted: function() {
    // bus.$emit('loadingDestory', false);
    this.loadingFlag = false;
  },

  methods: {
    async onSubmit() {
      console.log(this.form);
      this.fullscreenLoading = true;

      await new Promise(resolve => {
        // async函数的await命令后面，可以是Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。
        setTimeout(resolve, 2000);
      });

      this.fullscreenLoading = false;
      console.log("loading complete");
    },

    beforeUpload: function(file) {
      const imgSizeFlag = file.size / 1024 / 1024 < 2;
      let imgNumbFlag = true;

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.form.imageUrl) {
        this.$message.error("最多只能上传一张图");
        imgNumbFlag = false;
      }

      return imgSizeFlag && imgNumbFlag;
    },

    successFun: function(response, file, fileList) {
      this.form.imageUrl = file.url;
    },

    errorFun: function(file, fileList) {
      
    },

    handleRemove(file, fileList) {
      this.form.imageUrl = "";
    },

    handlePictureCardPreview: function(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixin";
.editor-form {
  width: 100%;
  height: 100%;
  background: #fff;
  // background: url("../../assets/images/login_bg_color.jpg");
  margin-bottom: 150px;
  h3 {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px 0 0;
    color: #333;
  }
  .el-form {
    width: 50%;
    @include marginCenter;
    padding: 20px;
    // box-shadow: 0 1px 5px #422c2c;
    textarea {
      width: 100%;
      height: 150px;
      resize: none;
    }
  }
}

.submit-btn span {
  color: #fff;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}

.avatar {
  width: 108px;
  height: 108px;
  display: block;
}

.form-line-title {
  font-size: 18px;
  margin-bottom: 20px;
}

.el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.pic-tips {
  text-align: center;
  color: #7e7e7e;
}
</style>
