 <template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <el-form ref="form" :model="form" label-width="160px">
        <h3>商品录入</h3>
        <el-form-item label="商品名称:" class="required" placeholder="不超过20个字" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:" class="required goods-describe" :rules="[{ required: true, message: ''}]">
          <quill-editor :options="editorOption"
                          ref="QuillEditor"
                          @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)"
                          @ready="onEditorReady($event)" style="width: 800px;height: 400px">
            </quill-editor>
        </el-form-item>
        <el-form-item label="商品图片:">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="pic-tips">建议上传比例为 1:1 的图片，图片大小不超过 200KB,图片最多不能超过五张</p>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="产地:" class="required" placeholder="不超过 40个字" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.origin"></el-input>
        </el-form-item>
        <el-form-item label="规格:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.specification"></el-input>
        </el-form-item>
        <el-form-item label="库存量:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="单账号限购数量:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input> 
        </el-form-item>
        <el-form-item label="成本:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="原价:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="最大优惠金额:" class="required" :rules="[{ required: true, message: ''}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="是否限时购买">
          <el-radio-group v-model="form.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限时购买时间">
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择开始日期" v-model="form.dateStart"></el-date-picker>
          </el-col>
          <el-col :span="10">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="form.dateEnd"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="分类">
          <el-select>
            <el-option label="服装" value="shanghai"></el-option>
            <el-option label="饮料" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="尺码:" :rules="[{ required: true, message: ''}]">
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
        </el-form-item>
        <el-form-item>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit" class="submit-btn">确认修改</el-button>
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
        name: "",
        imageUrl: "",
        desc: "",
        dateStart: "",
        dateEnd: ""
      },
      content: "",
      editorOption: {},
      dialogImageUrl: "",
      dialogVisible: false,
      fullscreenLoading: false,
      loadingFlag: true
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

  beforeMount: function() {},

  mounted: function() {
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
    },

    getUEContent() {
      return this.editor.getContent();
    },
    onEditorChange({ editor, html, text }) {
      this.content = html;
      console.log(html);
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

.pic-tips {
  text-align: left;
  color: #7e7e7e;
}

.goods-describe .el-form-item__content {
  width: 800px;
  height: 500px;
}
</style>
