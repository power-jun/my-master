<template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <!-- <div id="example">
            <p>Computed reversed message: "{{ reversedMessage }}"</p>
          </div>-->
      <el-form ref="form" :model="form" status-icon label-width="160px">
        <h3>商家入驻申请</h3>
        <p class="form-line-title">入驻联系人信息</p>
        <el-form-item prop="linkman" label="联系人姓名:" :rules="[{ required: true, message: '请输入联系人姓名'}, {pattern: '[\u4E00-\u9FA5]{2,4}', message: '姓名格式不正确'}]">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item prop="linkmanMobile" label="联系人手机号:" :rules="[{ required: true, message: '请输入手机号'}, { pattern: '/^[1][3,4,5,7,8][0-9]{9}$/', message: '手机号格式不正确'}]">
          <el-input v-model="form.linkmanMobile"></el-input>
        </el-form-item>
         <el-form-item prop="linkmanEmail" label="电子邮箱:" :rules="[{ required: true, message: '请输入电子邮箱', trigger: 'blur' },{ type: 'email', message: '请输入正确的电子邮箱'}]">
          <el-input v-model="form.linkmanEmail"></el-input> 
        </el-form-item>
        <p class="form-line-title">公司信息</p>
        <el-form-item prop="companyName" label="公司名称:" :rules="[{ required: true, message: '请输入公司名称'}, { pattern: '^[\u4e00-\u9fa5A-Za-z]{2,20}$', message: '请输入正确格式公司名称'}]">
          <el-input v-model="form.companyName"></el-input>
        </el-form-item>
        <el-form-item prop="companyCreditNo" label="营业执照注册号:" :rules="[{ required: true, message: '请输入营业执照注册号'}, { pattern: '/^([0-9ABCDEFGHJKLMNPQRTUWXY]{2})([0-9]{6})([0-9ABCDEFGHJKLMNPQRTUWXY]{9})([0-9Y])$/', message: '请输入正确的营业执照注册号'}]">
          <el-input v-model="form.companyCreditNo"></el-input>
        </el-form-item>
        <el-form-item prop="legalPerson" label="法定代表人姓名:" :rules="[{ required: true, message: '请输入法定代表人姓名'}, {pattern: '[\u4E00-\u9FA5]{2,4}', message: '姓名格式不正确'}]">
          <el-input v-model="form.legalPerson"></el-input>
        </el-form-item>
        <el-form-item prop="legalPersonCreditNo" label="法定代表身份证号码:" :rules="[{ required: true, message: '请输入身份证号码'}, { pattern: '/^[a-zA-Z]+\D*|^\d{0,16}[a-zA-Z]+|[^0-9Xx]/g', message: '请输入格式正确的身份证号'}]">
          <el-input v-model="form.legalPersonCreditNo"></el-input>
        </el-form-item>
        <el-form-item label="营业执照副本电子版:" prop="picUrl" :rules="[{ required: true, message: '请上传营业执照'}]">
          <el-upload action="api/upload" list-type="picture-card" :on-error="errorFun" :before-upload="picUrlBeforeUpload" :on-success="picUrlSuccessFun" :on-remove="picUrlhandleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="法人身份证电子版:" prop="legalCreditPic" :rules="[{ required: true, message: '请上传身份证正面'}]">
          <el-row class="id-card">
            <el-col :span="20">
              <el-upload action="api/upload" list-type="picture-card" :on-error="errorFun" :before-upload="cardBeforeUpload" :on-success="cardSuccessFun" :on-remove="cardHandleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p class="pic-tips">正面</p>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="" prop="legalCreditPic2" :rules="[{ required: true, message: '请上传身份证反面'}]">
          <el-row>
             <el-col :span="20">
              <el-upload action="api/upload" list-type="picture-card" :on-error="errorFun" :before-upload="card2BeforeUpload" :on-success="card2SuccessFun" :on-remove="card2HandleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <p class="pic-tips">反面</p>
            </el-col>
          </el-row>
        </el-form-item>
        <p class="form-line-title">银行账户信息</p>
        <el-form-item label="银行开户名:" prop="bankName" :rules="[{ required: true, message: '请输入银行开户名'}, { pattern: '[\u4E00-\u9FA5]{2,4}', message: '银行开户名格式不正确'}]">
          <el-input v-model="form.bankName"></el-input>
        </el-form-item>
        <el-form-item prop="bankAccount" label="公司银行账号:" :rules="[{ required: true, message: '请输入公司银行账号'}, { pattern: '/^\d{3,}$/', message: '银行账号必须为数字值'}]">
          <el-input v-model="form.bankAccount"></el-input>
        </el-form-item>
        <el-form-item prop="bankBranchName" label="开户行支行名称:" :rules="[{ required: true, message: '请输入开户行支行名称'}]">
          <el-input v-model="form.bankBranchName"></el-input>
        </el-form-item>
        <el-form-item label="开户行支行地址:" prop="bankBranchAddress" :rules="[{ required: true, message: '开户行支行地址'}]">
          <el-input v-model="form.bankBranchAddress"></el-input>
        </el-form-item>
        <p class="form-line-title">经营信息</p>
        <el-form-item label="公司类型:" prop="companyType" :rules="[{ required: true, message: '请选择公司类型'}]">
          <el-select v-model="form.companyType" aria-placeholder="请选择公司类型">
            <el-option v-for="(item, index) in companyTypeArry" :label="item.name" :value="item.code" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="salesAmount" label="最近一年销售额:" :rules="[{ required: true, message: '请输入最近一年销售额'}]">
          <el-input v-model="form.salesAmount"></el-input>
        </el-form-item>
        <el-form-item prop="avgPrice" label="预计评价客单价:" :rules="[{ required: true, message: '请输入预计评价客单价'}]">
          <el-input v-model="form.avgPrice"></el-input>
        </el-form-item>
        <el-form-item prop="express" label="常用快递公司:" :rules="[{ required: true, message: '请输入常用快递公司'}]">
          <el-input v-model="form.express"></el-input>
        </el-form-item>
        <p class="form-line-title">店铺信息</p>
        <el-form-item label="店铺头像:" prop="shopLogoUrl" :rules="[{ required: true, message: '请上传店铺头像'}]">
          <el-upload action="api/upload" list-type="picture-card" :on-error="errorFun" :before-upload="logBeforeUpload" :on-success="logSuccessFun" :on-remove="logHandleRemove">
              <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺类型" prop="shopType">
          <el-radio-group v-model="form.shopType">
            <el-radio v-for="(items, index) in shopTypeArry" :label="items.name" :value="items.code" :key="index"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="shopName" label="店铺名称:" :rules="[{ required: true, message: '请输入店铺名称'}]">
          <el-input v-model="form.shopName"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述:" prop="shopDesc"  :rules="[{ required: true, message: '请输入店铺描述'}]">
          <el-input type="textarea" v-model="form.shopDesc" placeholder="至少输入50字，最多200字"></el-input>
        </el-form-item>
        <el-form-item label="所在城市" class="link-select" prop="regionId" :rules="[{ required: true, message: '请选择区域'}]">
          <el-row>
            <el-col :span="7">
              <el-select placeholder="请选择" v-model="province" @change="provinceSelect">
            <el-option v-for="(items, index) in provinceArry"  :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
            </el-col>
            <el-col :span="7">
              <el-select placeholder="请选择" v-model="downtown" :disabled="downtownFlag" @change="citySelect">
            <el-option v-for="(items, index) in downtownArry"  :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
            </el-col>
            <el-col :span="7">
               <el-select placeholder="请选择" v-model="form.regionId" :disabled="areaFlag">
            <el-option v-for="(items, index) in areaArry"  :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit('form')" class="submit-btn">提交申请</el-button>
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
        linkman: '',
        linkmanMobile: '',
        linkmanEmail: '',
        companyName: '',
        companyCreditNo: '',
        legalPerson: '',
        legalPersonCreditNo: '',
        legalCreditPic: '',
        legalCreditPic2: '',
        picUrl: '',
        bankName: '',
        bankAccount: '',
        bankBranchName: '',
        bankBranchAddress: '',
        companyType: '',
        salesAmount: '',
        avgPrice: '',
        express: '',
        shopName: '',
        shopLogoUrl: '',
        shopCategoryId: '',
        shopType: '',
        shopDesc: '',
        regionId: ''
      },
      companyTypeArry: [],
      shopTypeArry: [],
      provinceArry: [],
      downtownArry: [],
      areaArry: [],
      legalCred: '',
      legalCred2: '',
      fullscreenLoading: false,
      loadingFlag: true,
      downtownFlag: true,
      areaFlag: true
    };
  },

  components: {
    Loading
  },

  beforeMount() {
    this.$axios
      .get("/getDictList", { params: { type: "company_type" } })
      .then(data => {
        if (data.data.code === 1) {
          this.companyTypeArry = data.data.data;
        }

        this.$axios
          .get("/getDictList", { params: { type: "shop_type" } })
          .then(data => {
            if (data.data.code === 1) {
              this.shopTypeArry = data.data.data;
            }
          });
      });

    this.$axios.get("/getRegionList", { params: { pid: "" } }).then(data => {
      if (data.data.code === 1) {
        this.provinceArry = data.data.data;
      }
    });
  },

  mounted: function() {
    this.loadingFlag = false;
  },

  methods: {
    onSubmit(formName) {
      console.log(this.form);
      this.fullscreenLoading = true;      

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/vendor/apply", this.form)
            .then(data => {
              if (data.data.code === "1") {
                this.$router.push("/businessInformation");
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

    getLinkCity(id, type) {
      this.$axios.get("/getRegionList", { params: { pid: id } }).then(data => {
        if (data.data.code === 1) {
          if (type === "city") {
            this.downtownArry = data.data.data;
          } else if (type === "area") {
            this.areaArry = data.data.data;
          }
        }
      });
    },

    provinceSelect(val) {
      this.getLinkCity(val, "city");

      if (this.downtownFlag) {
        this.downtownFlag = false;
      } else {
        this.downtownFlag = true;
        this.areaFlag = true;
      }
    },

    citySelect(val) {
      this.getLinkCity(val, "area");
      this.areaFlag = false;
    },

    picUrlBeforeUpload(file) {
      const imgSizeFlag = file.size / 1024 / 1024 < 2;
      let imgNumbFlag = true;

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.form.picUrl) {
        this.$message.error("最多只能上传一张图");
        imgNumbFlag = false;
      }

      return imgSizeFlag && imgNumbFlag;
    },

    logBeforeUpload(file) {
      const imgSizeFlag = file.size / 1024 / 1024 < 2;
      let imgNumbFlag = true;

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.form.picUrl) {
        this.$message.error("最多只能上传一张图");
        imgNumbFlag = false;
      }

      return imgSizeFlag && imgNumbFlag;
    },

    cardBeforeUpload(file) {
      const imgSizeFlag = file.size / 1024 / 1024 < 2;
      let imgNumbFlag = true;
      file.nam = "3333";

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.form.picUrl) {
        this.$message.error("最多只能上传一张图");
        imgNumbFlag = false;
      }

      return imgSizeFlag && imgNumbFlag;
    },

    card2BeforeUpload(file) {
      const imgSizeFlag = file.size / 1024 / 1024 < 2;
      let imgNumbFlag = true;
      file.nam = "3333";

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      if (this.form.picUrl) {
        this.$message.error("最多只能上传一张图");
        imgNumbFlag = false;
      }

      return imgSizeFlag && imgNumbFlag;
    },

    cardSuccessFun: function(response, file, fileList) {
      this.form.legalCreditPic = file.url;
    },

    card2SuccessFun: function(response, file, fileList) {
      this.form.legalCreditPic2 = file.url;
    },

    logSuccessFun: function(response, file, fileList) {
      this.form.shopLogoUrl = file.url;
    },

    picUrlSuccessFun: function(response, file, fileList) {
      this.form.picUrl = file.url;
    },

    errorFun: function(file, fileList) {},

    cardHandleRemove(file, fileList) {
      this.form.legalCred = "";
    },

    card2HandleRemove(file, fileList) {
      this.form.legalCred2 = "";
    },

    logHandleRemove(file, fileList) {
      this.form.shopLogoUrl = "";
    },

    picUrlHandleRemove(file, fileList) {
      this.form.picUrl = "";
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
  display: inline-block;
  width: 148px;
  text-align: center;
  color: #7e7e7e;
}

.link-select .el-col-7 {
  margin-right: 3.8%;
}

.id-card .el-col-8 {
  margin-right: 4%;
}
</style>
