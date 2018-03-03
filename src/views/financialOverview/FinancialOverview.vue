<template>
  <div>
    <div v-show="!loadingFlag">
    <h3>可用余额 <span style="color: #3366FF;margin: 0 5px;">351.15</span>元 <el-button type="primary" class="withdraw-btn">提现</el-button></h3>
    <el-row style="margin: 10px 0;">
      <el-col :span="24">未扣除提现10%手续费1234.00元</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">最近一周账户流水：收入总金额：<span style="color: #006699">14,252.68</span> 元    |   支出总金额：  <span style="color: #FF0000">14,458.29</span>  元  </el-col>
    </el-row>
    <el-table :data="accountFlowData" height="400" border style="width: 100%;margin-top: 20px;">
      <el-table-column prop="flowTime" label="时间" width="200" align="center"></el-table-column>
      <el-table-column prop="orderNumber" label="商品订单号" width="300" align="center"></el-table-column>
      <el-table-column prop="revenueAmount" label="收入金额" align="center"></el-table-column>
      <el-table-column prop="amountPayout" label="支出金额" align="center"></el-table-column>
      <el-table-column prop="accountBalance" label="账户余额" align="center"></el-table-column>
      <el-table-column prop="partyName" label="对方户名" align="center"></el-table-column>
      <el-table-column prop="accounts" label="对方账号" align="center" width="300"></el-table-column>
      <el-table-column prop="transactionType" label="交易类型" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center"></el-table-column>
    </el-table>
    </div>
    <Loading v-show="loadingFlag"></Loading>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loadingFlag: true,
      accountFlowData: [{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },{
        flowTime: '2018-02-02 23:07:19',
        orderNumber: '2018020223071921601281454340',
        revenueAmount: '￥33',
        amountPayout: '￥3',
        accountBalance: '￥3',
        partyName: '陈XXX',
        accounts: '4455456456*******',
        transactionType: '商户结算',
        remarks: ''
      },]
    }
  },

  mounted: function() {
    this.loadingFlag = false;
  }
}
</script>
<style lang="scss">
  .withdraw-btn {
    margin-left: 20px;
    span {
      color: #fff;
    }
  }
</style>

