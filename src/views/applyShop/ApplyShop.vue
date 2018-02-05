<template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <!-- <div id="example">
            <p>Computed reversed message: "{{ reversedMessage }}"</p>
          </div>-->
      <el-form ref="form" :model="form" label-width="100px">
        <h3>商家入驻申请</h3>
        <el-form-item label="News Title:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="News Cont:">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="Upload img:">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-error="errorFun" :before-upload="beforeUpload" :on-success="successFun" :on-remove="handleRemove" :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit" class="submit-btn">立即发布</el-button>
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
        desc: ""
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

  computed: {
    // reversedMessage: function() {
    //   `this` points to the vm instance
    //   return this.form.name.split('').reverse().join('')
    // }
  },

  beforeMount: function() {},

  mounted: function() {
    // bus.$emit('loadingDestory', false);
    let that = this;
    setTimeout(function() {
      that.loadingFlag = false;
    }, 2000);

    console.log(this.$store.state.news);

    var obj = new Proxy(
      {},
      {
        get: function(target, key, receiver) {
          console.log(`getting${key}`);
          return Reflect.get(target, key, value, receiver);
        },
        set: function(target, key, value, receiver) {
          console.log(`setting${key}`);
          return Reflect.set(target, key, value, receiver);
        }
      }
    );

    obj.a = 1;

    function run(generator, res) {
      const ret = generator.next(res);
      if (ret.done) return;
      ret.value.then(function(res) {
        run(generator, res);
      });
    }

    let count = 1;

    function tick(time) {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log("tick %s after %s ms", count++, time);
          resolve();
        }, time);
      });
    }

    function* main() {
      console.log("start run...");
      yield tick(500);
      yield tick(1000);
      yield tick(2000);
    }
    run(main());

    let a = new Set([1, 2, 3, 4]);
    let b = new Set([4, 3, 2, 5, 6]);
    let union = new Set([...a, ...b]);
    debugger;
    console.log(union);

    class logger {
      printName(name = "there") {
        this._print(`Hello ${name}`);
        this.name = `${name}`;
      }

      _print(msg) {
        console.log(msg);
      }
    }

    //new logger().printName();

    class childObj extends logger {
      constructor(x, y) {
        super();
        super.printName();
      }

      cosnon() {
        console.log(this.name);
      }
    }

    new childObj().cosnon();
  },

  created: function() {
    let args = [1, 2, 4, 4, 5];
    console.log(...args);
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
      debugger;
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
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  // background: url("../../assets/images/login_bg_color.jpg");
  @include minHeight(500px);
  h3 {
    text-align: center;
    margin-bottom: 20px;
    padding: 20px 0 0;
    color: #fff;
  }
  .el-form {
    width: 50%;
    @include marginCenter;
    padding: 20px;
    // box-shadow: 0 1px 5px #422c2c;
    textarea {
      width: 100%;
      height: 300px;
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
</style>
