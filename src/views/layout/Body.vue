<template>
  <div class="info-content">
    <el-row>
      <el-col :span="4" class="content-left" :style="{height: bodyHeight + 'px'}">
        <div class="grid-content bg-purple">
          <div class="header-info">
            <el-row>
              <p class="person-photo"><img :src="info.logoUrl" alt=""></p>
              <p class="name">{{info.name}}</p>
            </el-row>
          </div>
          <div class="slide-nav" id="slideNav">
            <el-menu router class="el-menu-vertical-demo" default-active="/home" @open="handleOpen">
              <el-menu-item index="/BusinessInformation" v-if="info.status == 1"><i class="el-icon-menu"></i>商家信息</el-menu-item>
              <el-submenu v-for="nav in navs" :index="nav.title" :key="nav.title" :class="nav.titleClass">
                <template slot="title">{{nav.title}}</template>
                <el-menu-item v-for="subnav in nav.subnavs" :index="subnav.router" :key="subnav.title">
                <i class="icon-menu"></i>{{subnav.title}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
          </div>
        </div>
    </el-col>
    <el-col :span="20" class="content-right">
      <Header :parent-data="bodyHeight" user-name="xjchen" v-on:childMsg = "getChildMsg">
        <h3 slot="title" class="fl">{{name}}</h3>
      </Header>
      <div class="grid-content bg-purple-light" :style="{maxHeight: bodyHeight + 'px'}">
        <transition name="router-fade" mode="out-in">
    	  	<router-view></router-view>
      	</transition>
      </div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "./Header";

let businessUserInfo = (localStorage.getItem("businessUserInfo") && JSON.parse(localStorage.getItem("businessUserInfo"))) || {};
let tabNavs = [];
let status = businessUserInfo.shop && businessUserInfo.shop.status;

// if (businessUserInfo.shopId && businessUserInfo.shop && businessUserInfo.shop.status == 1) {
  tabNavs = [
    {
      title: "开店申请",
      titleClass: 'apply-shop',
      subnavs: [
        {
          title: "商家入驻申请",
          router: "/applyShop"
        }
      ]
    },
    {
      title: "商品管理",
      titleClass: 'no-apply-shop',
      subnavs: [
        {
          title: "商品管理",
          router: "/commodityManage"
        }
      ]
    },
    {
      title: "订单管理",
      titleClass: 'no-apply-shop',
      subnavs: [
        {
          title: "订单列表",
          router: "/OrderList"
        }
      ]
    },
    {
      title: "营销管理",
      titleClass: 'no-apply-shop',
      subnavs: [
        {
          title: "首推产品设置",
          router: "/devaluationProducts"
        }
      ]
    },
    {
      title: "财务管理",
      titleClass: 'no-apply-shop',
      subnavs: [
        {
          title: "财务概览",
          router: "/financialOverview"
        },
        {
          title: "提现管理",
          router: "/cashManagement"
        }
      ]
    },
    {
      title: "销售统计",
      titleClass: 'no-apply-shop',
      subnavs: [
        {
          title: "销售额统计",
          router: "/salesStatistics"
        },
        {
          title: "订单统计",
          router: "/orderStatistics"
        },
        {
          title: "利润统计",
          router: "/profitStatistics"
        }
      ]
    }
  ];

//  else {
//   tabNavs = [
//     {
//       title: "开店申请",
//       subnavs: [
//         {
//           title: "商家入驻申请",
//           router: "/applyShop"
//         }
//       ]
//     }
//   ];
// }

export default {
  data() {
    return {
      info: {
        logoUrl: businessUserInfo && ("http://dev.pt800.com/" + businessUserInfo.shopLogoUrl || ''),
        name: businessUserInfo.shop && (businessUserInfo.shop.name || ''),
        shopId: businessUserInfo.shopId || '',
        status: status || ''
      },
      navs: tabNavs,
      bodyHeight: '',
      name: ''
    };
  },

  components: {
    Header
  },

  created: function() {
    this.bodyHeight = window.screen.height - 200;
  },

  mounted() {
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },

    getChildMsg(childData) {
      console.log(childData);
    }
  },
  //监控路由的变化
  watch: {
    $route(to, form) {
      console.log("watch route");
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/css/mixin";
// 路由动画
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}

.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}

.info-content {
  @include minWidth(1290px);
}

.content-left {
  height: 100%;
  background: $fc;
  padding-right: 0 !important;
  overflow-y: auto;
  // @include minWidth(250px);
}

.content-right {
  @include minHeight(800px);
  .grid-content {
    overflow-y: auto;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 20px;
  }
}

.icon-menu {
  display: inline-block;
  width: 8px;
  height: 8px;
  border: 1px solid #666;
  border-radius: 50%;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 5px;
}

.header-info {
  @include wh(100%, 200px);
  background: #333;
  position: relative;
  .el-row {
    margin-right: 0 !important;
    @include center;
  }
  .name {
    color: $fc;
    text-align: center;
    margin-top: 20px;
  }
  @at-root {
    .person-photo {
      @include wh(128px, 128px);
      border: 5px solid $fc;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      background: #88acdb;
      cursor: pointer;
    }
    .person-photo img {
      @include wh(100%, auto);
      @include center;
    }
    .person-photo:hover {
      background: #fff;
      border: 5px solid #88acdb;
      -webkit-box-shadow: 0 0 1.5em #88acdb;
      box-shadow: 0 0 1.5em #88acdb;
      -webkit-animation: rockAnimation 0.5s linear infinite alternate;
      -ms-animation: rockAnimation 0.5s linear infinite alternate;
      -moz-animation: rockAnimation 0.5s linear infinite alternate;
      animation: rockAnimation 0.5s linear infinite alternate;
    }
  }
}
</style>
