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
    name: 'business',
    component: Body,
    children: [
      {
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
  }]
});

// routers.beforeEach((to, from, next) => {
//   debugger
//   if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       if (store.state.token) {  // 通过vuex state获取当前的token是否存在
//           next();
//       }
//       else {
//           next({
//               path: '/login',
//               query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           })
//       }
//   }
//   else {
//       next();
//   }
// })

export default routers;