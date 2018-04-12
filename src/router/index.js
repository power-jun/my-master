import VueRouter from 'vue-router'

import Login from 'login/Login'
import Body from 'layout/Body'

const Registed = r => require.ensure([], () => r(require('registed/Registed')));
const ForgetPassword = r => require.ensure([], () => r(require('forgetPassword/ForgetPassword')));
const ApplyShop = r => require.ensure([], () => r(require('applyShop/ApplyShop')));
const ChangePassword = r => require.ensure([], () => r(require('changePassword/ChangePassword')));
const CommodityManage = r => require.ensure([], () => r(require('commodityManage/CommodityManage')));
const EditAddedGoods = r => require.ensure([], () => r(require('editAddedGoods/EditAddedGoods')));
const ModifyGoods = r => require.ensure([], () => r(require('modifyGoods/ModifyGoods')));
const OrderList = r => require.ensure([], () => r(require('orderList/OrderList')));
const OrderDetails = r => require.ensure([], () => r(require('orderDetails/OrderDetails')));
const DevaluationProducts = r => require.ensure([], () => r(require('devaluationProducts/DevaluationProducts')));
const FinancialOverview = r => require.ensure([], () => r(require('financialOverview/FinancialOverview')));
const CashManagement = r => require.ensure([], () => r(require('cashManagement/CashManagement')));
const SalesStatistics = r => require.ensure([], () => r(require('salesStatistics/SalesStatistics')));
const OrderStatistics = r => require.ensure([], () => r(require('orderStatistics/OrderStatistics')));
const ProfitStatistics = r => require.ensure([], () => r(require('profitStatistics/ProfitStatistics')));
const BusinessInformation = r => require.ensure([], () => r(require('businessInformation/BusinessInformation')));

const routers = new VueRouter({
  base: __dirname,
  routes: [{
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/registed',
      name: 'registed',
      component: Registed
    }, {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword
    }, {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    },
    {
      path: '/',
      redirect: '/login',
      name: 'business',
      component: Body,
      children: [{
          path: '/businessInformation',
          name: 'BusinessInformation',
          component: BusinessInformation
        },
        {
          path: '/applyShop',
          name: 'ApplyShop',
          component: ApplyShop
        },
        {
          path: '/commodityManage',
          name: 'CommodityManage',
          component: CommodityManage
        },
        {
          path: '/editAddedGoods',
          name: 'EditAddedGoods',
          component: EditAddedGoods
        },
        {
          path: '/modifyGoods',
          name: 'ModifyGoods',
          component: ModifyGoods
        },
        {
          path: '/orderList',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: '/orderDetails',
          name: 'OrderDetails',
          component: OrderDetails
        },
        {
          path: '/devaluationProducts',
          name: 'DevaluationProducts',
          component: DevaluationProducts
        },
        {
          path: '/financialOverview',
          name: 'FinancialOverview',
          component: FinancialOverview
        },
        {
          path: '/cashManagement',
          name: 'CashManagement',
          component: CashManagement
        },
        {
          path: '/salesStatistics',
          name: 'SalesStatistics',
          component: SalesStatistics
        },
        {
          path: '/orderStatistics',
          name: 'OrderStatistics',
          component: OrderStatistics
        },
        {
          path: '/profitStatistics',
          name: 'ProfitStatistics',
          component: ProfitStatistics
        }
      ]
    }
  ]
});

routers.beforeEach((to, from, next) => {
  let redirectUrl = '';
  var businessUserInfo = (localStorage.getItem("businessUserInfo") && JSON.parse(localStorage.getItem("businessUserInfo"))) || {};

  if (businessUserInfo.shopId && businessUserInfo.shop.status == 1) { // 已经成为商户
    if(to.path == '/applyShop') {
      alert('您已经入驻了店铺,不需要再申请');
    } else {
      next();
    }
  } else {
    if (to.path == '/applyShop' || to.path == '/login' || to.path == '/registed' || to.path == '/forgetPassword') {
      next();
    } else {
      alert('请先申请入住店铺');
    }
  }
})

export default routers;