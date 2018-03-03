import VueRouter from 'vue-router'

import Login from 'login/Login'
import Body from 'layout/Body'

const Registed = r => require.ensure([], () => r(require('registed/Registed')));
const ApplyShop = r => require.ensure([], () => r(require('applyShop/ApplyShop')));
const ChangePassword = r => require.ensure([], () => r(require('changePassword/ChangePassword')));
const CommodityManage = r => require.ensure([], () => r(require('commodityManage/CommodityManage')));
const AddedGoods = r => require.ensure([], () => r(require('addedGoods/AddedGoods')));
const ModifyGoods = r => require.ensure([], () => r(require('modifyGoods/ModifyGoods')));
const OrderList = r => require.ensure([], () => r(require('orderList/OrderList')));
const OrderDetails = r => require.ensure([], () => r(require('orderDetails/OrderDetails')));
const DevaluationProducts = r => require.ensure([], () => r(require('devaluationProducts/DevaluationProducts')));
const FinancialOverview = r => require.ensure([], () => r(require('financialOverview/FinancialOverview')));
const CashManagement = r => require.ensure([], () => r(require('cashManagement/CashManagement')));
const SalesStatistics = r => require.ensure([], () => r(require('salesStatistics/SalesStatistics')));
const OrderStatistics = r => require.ensure([], () => r(require('orderStatistics/OrderStatistics')));
const ProfitStatistics = r => require.ensure([], () => r(require('profitStatistics/ProfitStatistics')));

const routers = new VueRouter({
  mode: 'history',
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
    path: '/',
    name: 'News',
    component: Body,
    children: [{
      path: '',
      redirect: '/login'
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
      path: '/addedGoods',
      name: 'AddedGoods',
      component: AddedGoods
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

export default routers;