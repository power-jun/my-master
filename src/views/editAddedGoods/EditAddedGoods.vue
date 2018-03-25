 <template>
  <div class="editor-form">
    <el-row v-show="!loadingFlag" class="apply-shop-form">
      <el-form ref="form" :model="form" status-icon label-width="20%">
        <h3>商品录入</h3>
        <el-form-item label="商品名称:" prop="name" placeholder="不超过20个字" :rules="[{ required: true, message: '请输入商品名称'}]">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="picUrl" :rules="[{ required: true, message: '请上传商品图片'}]">
          <el-upload action="api/upload" list-type="picture-card" :limit="5" :file-list="cardFileList" multiple :on-exceed="handleExceed" :before-upload="beforeAvatarUpload" :on-error="errorFun" :on-preview="handlePreview" :on-success="successFun" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <p class="pic-tips-left">建议上传比例为 1:1 的图片，图片大小不超过 200KB,图片最多不能超过五张</p>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="库存量:" prop="stock" :rules="[{ required: true, message: '请输入库存量'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input  v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="单账号限购数量:" prop="limitNum" :rules="[{ required: true, message: '请输入单账号限购数量'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.limitNum"></el-input> 
        </el-form-item>
        <el-form-item label="成本:" prop="primeCost" :rules="[{ required: true, message: '请输入成本'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.primeCost"></el-input>
        </el-form-item>
        <el-form-item label="原价:" prop="originalPrice" :rules="[{ required: true, message: '请输入原价'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.originalPrice"></el-input>
        </el-form-item>
        <el-form-item label="最大优惠金额:" prop="maxDiscount" :rules="[{ required: true, message: '请输入最大优惠金额'}, { pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="form.maxDiscount"></el-input>
        </el-form-item>
         <el-form-item label="是否限时购买:">
          <el-radio-group v-model="form.limitBuy" @change="limitTimer">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="限时购买价:" v-show="limitTimerFlag" prop="limitPrice" :rules="[{ pattern: /^\d{1,20}$/, message: '只能输入1-20位数字'}]">
          <el-input v-model="limitProduct.limitPrice"></el-input>
        </el-form-item>
        <el-form-item label="限时购买时间:" v-show="limitTimerFlag">
          <el-col :span="20">
            <el-date-picker v-model="limitProduct.limitdate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="邮费:" prop="isBaoyou">
         <el-select v-model="form.isBaoyou" clearable placeholder="请选择邮费" @change="postageSelect">
          <el-option label="包邮" value="0"></el-option>
          <el-option label="不包邮" value="1"></el-option>
         </el-select>
         <el-row v-show="postageFlag" prop="postageRadio">
           <el-col :span="8">满<el-input v-model="postagePrice.baoyouAmt" class="full-reduction"></el-input>元免邮</el-col>
           <el-col :span="12">快递费 <el-input v-model="postagePrice.postage" class="full-reduction"></el-input></el-col>
         </el-row>
        </el-form-item>
        <el-form-item label="商品分类:" prop="type" :rules="[{ required: true, message: '请选择商品分类'}]">
          <el-select @change="productChange" clearable v-model="form.type" placeholder="请选择商品分类">
            <el-option v-for="(items, index) in productTypeList" :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分组:">
          <el-select :disabled="typeAttrFlag" clearable v-model="specListSelectVOne" @change="specListSelectNOne" placeholder="请选择规格名">
            <el-option v-for="(items, index) in productTypeAttr" :label="items.name" :value="items.id" :key="index"></el-option>
          </el-select>
          <el-button type="primary" v-show="!specListBtnTwoFlag" @click="specListTwoShow">添加规格项目</el-button>
          <el-row class="specification-list">
            <el-select
              v-model="specificationOne"
              filterable
              allow-create
              default-first-option
              multiple
              placeholder="请选择规格值"
              size=40
              :disabled="specificationOneFlag"
              @change="specificationChangeOne">
              <el-option
                v-for="(item, index) in specificationArry"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>
          <div v-show="specListTwoFlag">
            <el-select :disabled="typeAttrFlag" clearable v-model="specListSelectVTwo" @change="specListSelectNTwo" placeholder="请选择规格名">
              <el-option v-for="(item, index) in productTypeAttr" :label="item.name" :value="item.id" :key="index"></el-option>
            </el-select>
            <el-row class="specification-list">
              <el-select
                v-model="specificationTwo"
                filterable
                allow-create
                multiple
                default-first-option
                placeholder="请选择规格值"
                size=40
                :disabled="specificationTwoFlag"
                @change="specificationChangeTwo">
                <el-option
                  v-for="(item, index) in specificationArry"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-row>
          </div>
          <el-table
            v-show="specificationTabFlag"
            :data="specificationsTabData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%;margin: 10px 0;">
            <el-table-column 
            v-for="(item, index) in specificationsTabHead" :key="index"
             :prop="item.prop" :label="item.name" align="center">
              <template slot-scope="scope">
                <input v-if="item.prop == 'originalPrice'" type="number" v-model="inputValArry[scope.$index].originalPrice" class="specifications-input"/>
                <input v-else-if="item.prop == 'stock'" type="number" v-model="inputValArry[scope.$index].stock" class="specifications-input"/>
                <input v-else-if="item.prop == 'specCode'" type="number" v-model="inputValArry[scope.$index].specCode" class="specifications-input"/>
                <input v-else-if="item.prop == 'primeCost'" type="number" v-model="inputValArry[scope.$index].primeCost" class="specifications-input"/>
                <p v-else>{{scope.row[item.prop]}}</p>
              </template>
             </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item prop="productDesc" style="width: 800px;height: 700px" label="商品描述:" class="required goods-describe" :rules="[{ required: true, message: '请输入商品描述'}]">
           <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
            <quill-editor v-model="form.productDesc"
                            ref="QuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)"
                            @ready="onEditorReady($event)" style="width: 800px;height: 600px">
              </quill-editor>
              <el-upload action="api/upload" id="uploadFormMulti" v-show="false" class="upload-el-quill" list-type="picture-card" :before-upload="beforeQuillUpload" :on-error="errorFun" :on-success="successQuillFun">
                <i class="el-icon-plus"></i>
              </el-upload>
          </div>
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

// let businessUserInfo = JSON.parse(sessionStorage.getItem("businessUserInfo"));
let selectArry = [];
let specificationsCacheTabHead = [
  {
    prop: "originalPrice",
    name: "价格（元）"
  },
  {
    prop: "stock",
    name: "库存"
  },
  {
    prop: "specCode",
    name: "规格编码"
  },
  {
    prop: "primeCost",
    name: "成本价"
  }
];

// 商品分组缓存第一级和第二级数据
let nameArryOne = [];
let nameArryTwo = [];

export default {
  data() {
    return {
      form: {
        name: "",
        stock: "",
        productDesc:'',
        picUrl: "",
        limitNum: "",
        primeCost: "",
        originalPrice: "",
        maxDiscount: "",
        limitBuy: "",
        type: "",
        specList: [], // 规格属性
        stockList: [], // 规格明细
        isBaoyou: "",
        baoyouAmt: "",
        postage: ""
      },
      cardFileList: [],
      limitProduct: {
        limitPrice: "",
        limitdate: []
      },
      postagePrice: {
        baoyouAmt: "",
        postage: ""
      },
      inputValArry: [
        { originalPrice: "" },
        { stock: "" },
        { specCode: "" },
        { primeCost: "" }
      ],
      productDescText: "",
      productTypeList: [], //商品分类
      productTypeAttr: [], // 分类属性列表
      specificationOne: [],
      specificationTwo: [],
      specificationOneFlag: true,
      specificationTwoFlag: true,
      imageLoading: false,
      specificationArry: [], // 缓存用户使用过的规格值
      specListNameArryOne: [], // 规格名
      specListNameArryTwo: [],
      specificationsTabData: [
        {
          originalPrice: "",
          stock: "",
          specCode: "",
          primeCost: ""
        }
      ],
      specificationsTabHead: [
        {
          prop: "originalPrice",
          name: "价格（元）"
        },
        {
          prop: "stock",
          name: "库存"
        },
        {
          prop: "specCode",
          name: "规格编码"
        },
        {
          prop: "primeCost",
          name: "成本价"
        }
      ],
      specListSelectVOne: "", // 属性规格
      specListSelectVTwo: "",
      shopId: "",
      content: "",
      editorOption: {
        placeholder: "输入商品介绍",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }, { header: 3 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"]
          ]
        }
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fullscreenLoading: false,
      loadingFlag: true,
      postageFlag: true,
      limitTimerFlag: false,
      typeAttrFlag: true,
      specListTwoFlag: false,
      specListBtnTwoFlag: true,
      specificationTabFlag: false
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
      if (data.data.code == 1) {
        this.productTypeList = data.data.data;
      }
    });

    // 商品编辑
    if (this.$route.query && this.$route.query.id) {
      this.$axios
        .get("/vendor/productDetail", {
          params: { productId: this.$route.query.id }
        })
        .then(data => {
          if (data.data.code == 1) {
            this.form = data.data.data;

            let picUrlList = this.form.picUrl.split(",");
            for (let i in picUrlList) {
              // 商品图片
              this.cardFileList.push({
                url: "http://dev.pt800.com" + picUrlList[i]
              });
            }

            // 是否限时抢购
            if (this.form.limitBuy == 1) {
              this.limitProduct.limitdate[0] = new Date(
                this.form.limitBuyStartTime
              );
              this.limitProduct.limitdate[1] = new Date(
                this.form.limitBuyEndTime
              );
              this.limitProduct.limitPrice = this.form.limitPrice;
              this.limitTimerFlag = true;
            } else {
              this.limitTimerFlag = false;
            }

            // 是否包邮
            if (this.form.isBaoyou == 1) {
              this.postagePrice.baoyouAmt = this.form.baoyouAmt;
              this.postagePrice.postage = this.form.postage;
              this.postageFlag = true;
            } else {
              this.postageFlag = false;
            }

            if (this.form.type) {
              this.$axios
                .get("/vendor/productTypeAttr", {
                  params: { type: this.form.type }
                })
                .then(data => {
                  if (data.data.code == 1) {
                    this.productTypeAttr = data.data.data;

                    let specList = this.form.specList;
                    if (specList && specList.length) {
                      this.typeAttrFlag = false;
                      // 显示第一级 并且赋值
                      if (specList.length == 1) {
                        this.specificationOneFlag = false;
                        this.specificationOne = specList[0].attrValue.split(
                          ","
                        );
                        this.specListSelectVOne = specList[0].attrId;
                        nameArryOne = [{ prop: specList[0].attrId }];
                      } else if (specList.length == 2) {
                        // 显示第二级 并且赋值
                        this.specificationTwoFlag = false;
                        this.specListTwoFlag = true;
                        this.specListTwoShow = false;
                        this.specificationOneFlag = false;

                        for (let i = 0; i < specList.length; i++) {
                          if (specList[i].sort == 1) {
                            this.specificationOne = specList[i].attrValue.split(
                              ","
                            );
                            this.specListSelectVOne = specList[i].attrId;
                            nameArryOne = [{ prop: specList[i].attrId }];
                          } else if (specList[i].sort == 2) {
                            this.specificationTwo = specList[i].attrValue.split(
                              ","
                            );
                            this.specListSelectVTwo = specList[i].attrId;
                            nameArryTwo = [{ prop: specList[i].attrId }];
                          }
                        }
                      }
                    }

                    let stockList = this.form.stockList;
                    if (stockList && stockList.length) {
                      this.specificationTabFlag = true;
                      //组织表格header
                      if (specList.length == 1) {
                        this.specificationsTabHead.unshift({
                          prop: stockList[0].attrList[0].attrId,
                          name: stockList[0].attrList[0].attrValue
                        });
                      } else if (specList.length == 2) {
                        let attrList = stockList[0].attrList;
                        let oneUnshift = {};
                        let twoUnshift = {};

                        for (let i = 0; i < attrList.length; i++) {
                          if (attrList[i].sort == 1) {
                            twoUnshift.prop = attrList[i].attrId;
                            twoUnshift.name = attrList[i].attrValue;
                          } else if (attrList[i].sort == 2) {
                            oneUnshift.prop = attrList[i].attrId;
                            oneUnshift.name = attrList[i].attrValue;
                          }
                        }

                        this.specificationsTabHead.unshift(oneUnshift);
                        this.specificationsTabHead.unshift(twoUnshift);
                      }

                      // 组织表格body
                      this.specificationsTabData = [];

                      this.inputValArry = [];

                      for (let i = 0; i < stockList.length; i++) {
                        let bodyLineObj = {};
                        bodyLineObj.originalPrice = stockList[i].originalPrice;
                        bodyLineObj.sort = stockList[i].sort;
                        bodyLineObj.specCode = stockList[i].specCode;
                        bodyLineObj.stock = stockList[i].stock;
                        bodyLineObj.primeCost = stockList[i].primeCost;

                        let inputValItem = {
                          originalPrice: stockList[i].originalPrice,
                          stock: stockList[i].stock,
                          specCode: stockList[i].specCode,
                          primeCost: stockList[i].primeCost
                        };

                        bodyLineObj[stockList[i].attrList[0].attrId] =
                          stockList[i].attrList[0].attrValue;
                        bodyLineObj[stockList[i].attrList[1].attrId] =
                          stockList[i].attrList[1].attrValue;
                        this.specificationsTabData.push(bodyLineObj);
                        this.inputValArry.push(inputValItem);
                      }
                    }
                  }
                });
            }
          } else {
            this.$message({
              message: data.data.msg,
              type: "warning"
            });
          }
        });
    }
  },

  mounted: function() {
    this.loadingFlag = false;
    this.$refs.QuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
  },

  methods: {
    // 触发文本框中el-upload图片上传功能
    async imgHandler() {
      let $uploadFormMulti = document.getElementById("uploadFormMulti").getElementsByTagName('input')[0];
      $uploadFormMulti.click();
    },

    beforeQuillUpload(file) {
      const isJPG = file.type == "image/png";
      const imgSizeFlag = file.size / 1024 / 1024 < 6;
      let imgNumbFlag = true;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
        imgNumbFlag = false;
      }

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      return imgNumbFlag && imgSizeFlag;
    },

    successFun(response, file, fileList) {
      let imgArr = [];
      for (let i = 0; i < fileList.length; i++) {
        imgArr.push(fileList[i].response.data.url);
      }

      this.form.picUrl = imgArr.join(",");
    },

    successQuillFun(response, file, fileList) {
      this.imageLoading = true;
      let quillImgUrl = response.data.url;

      try {
        if (quillImgUrl != null && quillImgUrl.length > 0) {
          this.addImgRange = this.$refs.QuillEditor.quill.getSelection();
          quillImgUrl = 'http://dev.pt800.com' + quillImgUrl;
          // 插入到富文本框中
          this.$refs.QuillEditor.quill.insertEmbed(
            this.addImgRange != null ? this.addImgRange.index : 0,
            "image",
            quillImgUrl
          );
        } else {
          this.$message.warning("图片增加失败");
        }
      } catch ({ message: msg }) {
        this.$message.warning(msg);
      }

      this.imageLoading = false;
    },

    postageSelect(value) {
      if (value == 1) {
        this.postageFlag = true;
      } else {
        this.postageFlag = false;
      }
    },

    limitTimer(value) {
      if (value == "1") {
        this.limitTimerFlag = true;
      } else {
        this.limitTimerFlag = false;
      }
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex % (this.specificationTwo.length || 1) == 0) {
          return {
            rowspan: this.specificationTwo.length || 1,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    productChange(value) {
      this.specificationOneFlag = true;
      this.specificationTwoFlag = true;
      this.specificationTabFlag = false;
      // this.specListTwoFlag = false;
      this.specificationOne = [];
      this.specificationTwo = [];

      this.productTypeAttr = [];

      if (value) {
        this.$axios
          .get("/vendor/productTypeAttr", { params: { type: value } })
          .then(data => {
            if (data.data.code == 1) {
              this.productTypeAttr = data.data.data;
              this.specificationsTabHead.length > 4 &&
                (this.specificationsTabHead = specificationsCacheTabHead);
              this.typeAttrFlag = false;
            }
          });
      } else {
        this.productTypeAttr = [];
        this.typeAttrFlag = true;
      }
    },

    specificationChangeOne(value) {
      if (value) {
        this.specificationTabFlag = true;
      } else {
        this.specificationTabFlag = false;
      }

      this.specificationChangePublic(value, "one");
    },

    specificationChangeTwo(value) {
      this.specificationChangePublic(value, "two");
    },

    specificationChangePublic(value, type) {
      let resultSelectArry = [];
      for (var i in value) {
        if (selectArry.length) {
          for (var j in selectArry) {
            if (value[i] !== selectArry[j]) {
              resultSelectArry.push({ value: value[i], label: value[i] });
            }
          }
        } else {
          resultSelectArry.push({ value: value[i], label: value[i] });
        }
      }

      this.specificationArry = resultSelectArry;

      // 添加表格Header
      if (this.specificationsTabHead.length <= 6) {
        if (type == "one") {
          if (this.specListNameArryOne.length && this.specificationOne.length) {
            if (this.specificationsTabHead.length < 6) {
              // 判断表头第一列是不是已经包含第一级
              if (
                this.specificationsTabHead[0].prop !==
                this.specListNameArryOne[0].prop
              ) {
                this.specificationsTabHead.unshift(this.specListNameArryOne[0]);
                nameArryOne = this.specListNameArryOne;
                this.specificationTabFlag = true;
              }
            }

            this.specListBtnTwoFlag = false;
          } else {
            if (
              this.specificationsTabHead.length > 4 &&
              this.specificationsTabHead.length <= 6
            ) {
              this.specificationsTabData = [];
              this.specificationTabFlag = false;
              this.specListNameArryTwo = [];
              this.specificationTwoFlag = false;
              this.specificationTwo = [];
              this.specificationsTabHead.splice(0, 1);
            }

            this.specListBtnTwoFlag = true;
            this.specListTwoFlag = false;
          }
        } else if (type == "two") {
          if (this.specListNameArryTwo.length && this.specificationTwo.length) {
            if (this.specificationsTabHead.length < 6) {
              // 判断表头第一列是不是已经包含第二级
              if (
                this.specificationsTabHead[1].prop !==
                this.specListNameArryOne[0].prop
              ) {
                this.specificationsTabHead.splice(
                  1,
                  0,
                  this.specListNameArryTwo[0]
                );
                nameArryTwo = this.specListNameArryTwo;
              }
            }
          } else if (
            this.specificationsTabHead.length > 4 &&
            this.specificationsTabHead.length <= 6
          ) {
            this.specificationsTabHead.splice(1, 1);
          }
        }
      }

      let resultArryOne = [];
      let resultArrTwo = [];
      let specificationsOneProp = this.specificationsTabHead[0].prop;
      let specificationsTwoProp = this.specificationsTabHead[1].prop;

      if (this.specificationTwo.length) {
        for (let i = 0; i < this.specificationTwo.length; i++) {
          var resultTabData = {
            originalPrice: "",
            stock: "",
            specCode: "",
            primeCost: ""
          };

          resultTabData[specificationsTwoProp] = this.specificationTwo[i];
          resultArrTwo.push(resultTabData);
          this.specificationsTabData.push(resultArrTwo[i]);
        }

        this.specificationsTabData = [];

        for (var i in resultArrTwo) {
          this.specificationsTabData.push(resultArrTwo[i]);
        }
      }

      // 组织第一个规格名数据
      let totalTabLine =
        this.specificationOne.length * this.specificationTwo.length; //table的总行数
      let resultTotalArr = [];

      if (this.specificationOne.length) {
        if (this.specificationTwo.length) {
          this.specificationsTabData = [];
          for (let t = 0; t < this.specificationOne.length; t++) {
            for (let j = 0; j < resultArrTwo.length; j++) {
              resultArrTwo[j][specificationsOneProp] = this.specificationOne[t];
              // 必须要转换下数据 要不然数据会出错
              resultTotalArr.push(JSON.stringify(resultArrTwo[j]));
            }
          }

          for (var i = 0; i < resultTotalArr.length; i++) {
            this.specificationsTabData.push(JSON.parse(resultTotalArr[i]));
          }
        } else {
          for (let i = 0; i < this.specificationOne.length; i++) {
            var resultTabData = {
              originalPrice: "",
              stock: "",
              specCode: "",
              primeCost: ""
            };

            resultTabData[specificationsOneProp] = this.specificationOne[i];
            resultArryOne.push(resultTabData);
          }

          this.specificationsTabData = [];

          for (var i in resultArryOne) {
            this.specificationsTabData.push(resultArryOne[i]);
          }
        }
      }

      // 组织尺寸价格等基本输入框
      this.makeInput();
    },

    makeInput() {
      this.inputValArry = [];
      for (let i = 0; i < this.specificationsTabData.length; i++) {
        let inputValItem = {
          originalPrice: "",
          stock: "",
          specCode: "",
          primeCost: ""
        };

        this.inputValArry.push(inputValItem);
      }
    },

    specListSelectNOne(value) {
      let obj = {};
      let item = this.productTypeAttr;
      let breakFlag = true;

      for (var i in item) {
        if (item[i].id == value) {
          obj.name = item[i].name;
          // this.productTypeAttr.splice(i, 1);
        }
      }

      for (let i = 0; i < this.specificationsTabHead.length; i++) {
        if (this.specificationsTabHead[i].prop == value) {
          this.$message({
            message: "已经存在该规格名",
            type: "warning"
          });
          this.specListSelectVOne = [];
          breakFlag = false;
          return false;
        }
      }

      if (!breakFlag) {
        return false;
      }

      this.specListNameArryOne = [{ name: obj.name, prop: value }];

      if (value) {
        this.specificationOneFlag = false;
      } else {
        this.specificationOneFlag = true;
        this.specificationOne = [];
        this.specificationTwo = [];
        this.specListBtnTwoFlag = true;
        this.specListTwoFlag = false;
        this.specificationTabFlag = false;
        this.specificationsTabData = [];
      }
    },

    specListSelectNTwo(value) {
      let obj = {};
      let item = this.productTypeAttr;
      let breakFlag = true;

      for (var i in item) {
        if (item[i].id == value) {
          obj.name = item[i].name;
        }
      }

      for (let i = 0; i < this.specificationsTabHead.length; i++) {
        if (this.specificationsTabHead[i].prop == value) {
          this.$message({
            message: "已经存在该规格名",
            type: "warning"
          });
          this.specListSelectVTwo = [];
          breakFlag = false;
          return false;
        }
      }

      if (!breakFlag) {
        return false;
      }

      this.specListNameArryTwo = [{ name: obj.name, prop: value }];

      if (value) {
        this.specificationTwoFlag = false;
      } else {
        this.specificationTwoFlag = true;
        this.specificationTwo = [];
      }
    },

    specListTwoShow() {
      this.specListTwoFlag = true;
      this.specListBtnTwoFlag = true;
    },

    zeroFilling(n) {
      if (n > 10) {
        return n;
      } else if (n < 10) {
        return "0" + n + "";
      }
    },

    onSubmit(formName) {
      this.fullscreenLoading = true;

      if (this.$route.query && this.$route.query.id) {
        this.form.id = this.$route.query.id;
      }

      if (this.form.limitBuy == 1) {
        if (this.limitProduct.limitdate.length) {
          let start = new Date(this.limitProduct.limitdate[0]);
          let end = new Date(this.limitProduct.limitdate[1]);
          this.form.limitBuyStartTime =
            start.getFullYear() +
            "-" +
            this.zeroFilling(start.getMonth() + 1) +
            "-" +
            this.zeroFilling(start.getDate());
          this.form.limitBuyEndTime =
            end.getFullYear() +
            "-" +
            this.zeroFilling(end.getMonth() + 1) +
            "-" +
            this.zeroFilling(end.getDate());
        } else {
          this.$message({
            message: "请填写限时抢购时间段",
            type: "warning"
          });
          this.fullscreenLoading = false;
          return false;
        }

        if (this.limitProduct.limitPrice) {
          this.form.limitPrice = this.limitProduct.limitPrice;
        } else {
          this.fullscreenLoading = false;
          this.$message({
            message: "请填写限时抢购价格",
            type: "warning"
          });
          return false;
        }
      }
      if (this.form.isBaoyou.length) {
        if (this.form.isBaoyou == 1) {
          if (this.postagePrice.baoyouAmt) {
            this.form.baoyouAmt = this.postagePrice.baoyouAmt;
          } else {
            this.fullscreenLoading = false;
            this.$message({
              message: "请填写满多少钱免邮",
              type: "warning"
            });
            return false;
          }

          if (this.postagePrice.postage) {
            this.form.postage = this.postagePrice.postage;
          } else {
            this.fullscreenLoading = false;
            this.$message({
              message: "请填写快递费",
              type: "warning"
            });
            return false;
          }
        }
      } else {
        this.fullscreenLoading = false;
        this.$message({
          message: "请选择邮费",
          type: "warning"
        });
        return false;
      }

      this.form.specList = [];
      if (nameArryOne.length) {
        let specListOne = [{}];
        specListOne[0].attrId = nameArryOne[0].prop;
        specListOne[0].attrValue = this.specificationOne.join(",");
        specListOne[0].sort = 1;
        this.form.specList = specListOne;

        if (nameArryTwo.length) {
          let specListTwo = [{}];
          specListTwo[0].attrId = nameArryTwo[0].prop;
          specListTwo[0].attrValue = this.specificationTwo.join(",");
          specListTwo[0].sort = 2;
          this.form.specList.push(specListTwo[0]);
        }
      }

      this.form.stockList = [];
      let inputValFlag = true;
      let specificationsOneProp = this.specificationsTabHead[0].prop;
      let specificationsTwoProp = this.specificationsTabHead[1].prop;

      if (this.specificationOne.length) {
        for (let i = 0; i < this.specificationsTabData.length; i++) {
          this.form.stockList.push({
            attrList: [
              {
                attrId: specificationsOneProp,
                attrValue: this.specificationsTabData[i][specificationsOneProp],
                sort: 1
              }
            ]
          });

          if (this.specificationTwo.length) {
            this.form.stockList[i].attrList.push({
              attrId: specificationsTwoProp,
              attrValue: this.specificationsTabData[i][specificationsTwoProp],
              sort: 2
            });
          }

          this.form.stockList[i].originalPrice = this.inputValArry[
            i
          ].originalPrice;
          this.form.stockList[i].stock = this.inputValArry[i].stock;
          this.form.stockList[i].specCode = this.inputValArry[i].specCode;
          this.form.stockList[i].primeCost = this.inputValArry[i].primeCost;
          this.form.stockList[i].sort = i + 1;

          if (
            !this.inputValArry[i].originalPrice ||
            !this.inputValArry[i].stock
          ) {
            // 价格 库存必填项
            inputValFlag = false;
          }
        }
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!inputValFlag) {
            this.fullscreenLoading = false;
            this.$message({
              message: "请填写价格或者库存",
              type: "warning"
            });
            return false;
          }

          this.$axios.post("/vendor/addPorduct", this.form).then(data => {
            if (data.data.code == 1) {
              this.$message({
                message: "新建成功",
                type: "success"
              });
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
      const isJPG = file.type == "image/png";
      const imgSizeFlag = file.size / 1024 / 1024 < 6;
      let imgNumbFlag = true;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
        imgNumbFlag = false;
      }

      if (!imgSizeFlag) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }

      return imgNumbFlag && imgSizeFlag;
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 5 张图，本次选择了 ${
          files.length
        } 张图，共选择了 ${files.length + fileList.length} 张图`
      );
    },

    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        if (picUrlArry[i] == file.response.data.url) {
          delete picUrlArry[i];
        }
      }

      let picUrlStr = picUrlArry.join(",");
      if (picUrlStr.substring(picUrlStr.length - 1) == ",") {
        this.form.picUrl = picUrlStr.substring(0, picUrlStr.length - 1);
      } else if (picUrlStr.substring(0, 1) == ",") {
        this.form.picUrl = picUrlStr.substring(1, picUrlStr.length);
      } else {
        this.form.picUrl = picUrlStr;
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
    width: 60%;
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

.specification-list {
  margin-top: 10px;
  margin-bottom: 10px;
}

.specifications-input {
  border: 1px solid #ccc;
  width: 100%;
  height: 30px;
  padding-left: 5px;
}

.el-button--primary {
  margin-left: 10px;
  span {
    color: #fff;
  }
}

.ql-snow .ql-editor img {
  width: 400px;
}
</style>
