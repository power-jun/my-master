 <template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <el-form ref="form" :model="form" status-icon label-width="18%">
        <h3>商品录入</h3>
        <el-form-item label="商品名称:" prop="name" class="required" placeholder="不超过20个字" :rules="[{ required: true, message: '请输入商品名称'}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="picUrl">
          <el-upload action="api/upload" list-type="picture-card" :limit="5" multiple :on-exceed="handleExceed" :before-upload="beforeAvatarUpload" :on-error="errorFun" :on-preview="handlePreview" :on-success="successFun" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="pic-tips-left">建议上传比例为 1:1 的图片，图片大小不超过 200KB,图片最多不能超过五张</p>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="库存量:" prop="stock" class="required" :rules="[{ required: true, message: '请输入库存量'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input  v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="单账号限购数量:" prop="limitNum" class="required" :rules="[{ required: true, message: '请输入单账号限购数量'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.limitNum"></el-input> 
        </el-form-item>
        <el-form-item label="成本:" class="required" prop="primeCost" :rules="[{ required: true, message: '请输入成本'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.primeCost"></el-input>
        </el-form-item>
        <el-form-item label="原价:" prop="originalPrice" class="required" :rules="[{ required: true, message: '请输入原价'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="最大优惠金额:" prop="maxDiscount" class="required" :rules="[{ required: true, message: '请输入最大优惠金额'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.maxDiscount"></el-input>
        </el-form-item>
         <el-form-item label="是否限时购买">
          <el-radio-group v-model="limitBuyRadio" pro="limitBuy" @change="limitTimer">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限时购买时间" v-show="limitTimerFlag">
          <el-col :span="20">
            <el-date-picker v-model="limitdate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="邮费" prop="postageV">
         <el-select v-model="postageV" placeholder="邮费选择" @change="postageSelect">
          <el-option label="包邮" value="0"></el-option>
          <el-option label="不包邮" value="1"></el-option>
         </el-select>
         <el-row v-show="postageFlag">
           <el-radio-group v-model="postage" prop="postage">
            <el-radio label="满减">满<el-input v-model="form.name" class="full-reduction"></el-input>元免邮</el-radio>
            <el-radio label="邮费">快递费 <el-input v-model="form.name" class="full-reduction"></el-input></el-radio>
           </el-radio-group>
         </el-row>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select>
            <el-option v-for="(items, index) in productTypeList" :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="尺码:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="颜色:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="品牌:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="材质:" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item prop="productDesc" label="商品描述:" class="required goods-describe" :rules="[{ required: true, message: '请输入商品描述'}]">
          <quill-editor v-model="form.productDesc" 
                          :options="productDesc"
                          ref="QuillEditor"
                          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)"
                          @ready="onEditorReady($event)" style="width: 800px;height: 400px">
            </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit('form')" class="submit-btn">确认新建</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>

<script>
import Loading from "components/loading";
import Vue from "vue";

import { quillEditor } from "vue-quill-editor";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    return {
      form: {
        name: '',
        stock: '',
        productDesc: '',
        picUrl: '',
        limitNum: '',
        primeCost: '',
        originalPrice: '',
        maxDiscount: '',
        limitBuy: '',
        type: '',
        attrList: '',
        attrId: '',
        attrValue: ''
      },
      productDescText: '',
      productTypeList: [], //商品分类
      limitdate: '',
      limitBuyRadio: '',
      postageV: '',
      shopId: '',
      content: '',
      editorOption: {},
      dialogImageUrl: '',
      dialogVisible: false,
      fullscreenLoading: false,
      loadingFlag: true,
      postageFlag: true,
      limitTimerFlag: false
    };
  },

  components: {
    Loading,
    quillEditor
  },

  computed: {
    editor() {
      return this.$refs.QuillEditor.quill;
    }
  },

  beforeMount() {
    this.$axios.get("/vendor/productTypeList").then(data => {
      if (data.data.code === 1) {
        this.productTypeList = data.data.data;
      }
    });
  },

  mounted: function() {
    this.loadingFlag = false;
    this.shopId = this.$route.query.shopId;
  },

  methods: {
    postageSelect(value) {
      if (value === 1) {
        this.postageFlag = true;
      } else {
        this.postageFlag = false;
      }
    },

    limitTimer(value) {
      if (value === '是') {
        this.limitTimerFlag = true;
        this.form.limitBuy = true;
      } else {
        this.limitTimerFlag = false;
        this.form.limitBuy = false;
      }
    },

    onSubmit(formName) {
       this.fullscreenLoading = true;

       if (this.limitdate.length) {
        let start = this.limitdate[0];
        let end = this.limitdate[1];
        this.form.startTime = start.getFullYear() + '-' + this.zeroFilling(start.getMonth()+1) + '-' + this.zeroFilling(start.getDate());
        this.form.endTime = end.getFullYear() + '-' + this.zeroFilling(end.getMonth()+1) + '-' + this.zeroFilling(end.getDate());
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/vendor/addPorduct", this.form).then(data => {
            if (data.data.code === "1") {
              this.$router.push("/CommodityManage");
            } else {
              this.$message({
                message: data.data.msg,
                type: "warning"
              });
            }

            this.fullscreenLoading = false;
          });
        } else {
          console.log("error submit!!");
          this.fullscreenLoading = false;
          return false;
        }
      });
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const imgSizeFlag = file.size / 1024 / 1024 < 6;
      let imgNumbFlag = true;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
        imgNumbFlag = false;
      }

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      return imgNumbFlag;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 张图，本次选择了 ${
          files.length
        } 张图，共选择了 ${files.length + fileList.length} 张图`
      );
    },

    successFun(response, file, fileList) {
      let imgArr = [];
      for (let i = 0; i < fileList.length; i++) {
        imgArr.push(fileList[i].response.data.url);
      }

      this.form.picUrl = imgArr.join(",");
    },

    errorFun(file, fileList) {},

    handleRemove(file, fileList) {
      let picUrlArry = this.form.picUrl.split(",");
      for (let i = 0; i < picUrlArry.length; i++) {
        if (picUrlArry[i] === file.response.data.url) {
          delete picUrlArry[i];
        }
      }

      let picUrlStr = picUrlArry.join(',');
      if(picUrlStr.substring(picUrlStr.length-1)==',') {
        this.form.picUrl = picUrlStr.substring(0,picUrlStr.length-1);
      } else if(picUrlStr.substring(0,1)==',') {
        this.form.picUrl = picUrlStr.substring(1,picUrlStr.length);
      } else {
        this.form,picUrl = picUrlStr;
      }
    },

    getUEContent() {
      return this.editor.getContent();
    },
    onEditorChange({ editor, html, text }) {
      this.form.productDesc = html;
      this.productDescText = text;
    },
    onEditorFocus() {},
    onEditorReady() {},
    onEditorBlur() {}
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixin";
.editor-form {
  width: 100%;
  height: 100%;
  background: #fff;
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

.required .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

.pic-tips-left {
  text-align: left;
  color: #7e7e7e;
}

.goods-describe .el-form-item__content {
  width: 80%;
  height: 500px;
}

.full-reduction.el-input {
  width: 60px;
  margin: 0 10px;
  .el-input__inner {
    height: 30px;
  }
}

.el-date-editor .el-range-separator {
  width: 8%;
}
</style>
