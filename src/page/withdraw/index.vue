<template>
    <div>
      <!-- <header-common title="提现记录"></header-common> -->
      <div class="content">
        <ul class="info">
          <li>到账银行</li>
          <li class="select" @click="showPop = true">{{defaultItem.bankName}} ({{defaultItem.bankCard.substr(defaultItem.bankCard.length-4)}})
            <i class="sj"></i>
          </li>
          <li class="text">提现到账时间：7个工作日</li>
        </ul>
        <ul class="actions">
          <li>提现金额</li>
          <li class="put-price">
            <span>￥</span>
            <input v-model="price" disabled="true" type="number">
          </li>
          <li style="margin-top:.3rem" class="text" v-if="!price || price.split('.')[0] == 0">当前可提现金额为{{residual}}</li>
          <li v-else-if="price && price<=residual" style="margin-top:.3rem" class="text">本次提现{{priceNow}}元，代扣税{{rate}}%，实际到账{{realPrice}}元</li>
          <li v-else-if="price && price>residual" style="margin-top:.3rem;color:red;" class="text">您当前最高可提现金额为{{residual}} 已超额</li>
        </ul>
        <img  class="tips-earnings" @click="showHint = true" src="../../assets/images/icon_txjl_02.png" alt="">
      </div>
      <button class="btn" @click="widthDraw">确认提现</button>
      <hint v-if="showHint" :detail="rulesList" title="提现规则" @showCityName="closeHint"></hint>
      <div>
      <popup v-model="showPop" position="bottom" max-height="50%">
        <div style="height:6rem;width:100%;background:#fff;">
          <div class="head_title_withdraw">
            <img src="../../assets/images/icon_bankcard_close.png" alt="">
            选择到账银行
          </div>
          <ul class="popContent_withdraw">
            <li v-for="(item, index) in cardList" :key="index" @click="chooseCard(item)">
              {{item.bankName}} 储蓄卡({{item.bankCard.substr(item.bankCard.length-4)}})
            </li>
            <li @click="go">
                使用新卡提现
            </li>
          </ul>
        </div>
      </popup>
    </div>
    </div>
</template>

<style lang="less" scoped>
input:disabled{
  background: #fff;
}
.btn{
  border: none;
  width:5rem;
  height:0.9rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:0rem;
  margin-top: .8rem;
  box-shadow:0rem 10rem 20rem 0rem rgba(11,40,163,0.2);
  font-size:0.32rem;
  color:rgba(255,255,255,1);
  border-radius: 1rem;
}
.text{
  color: #666;
  font-size: .26rem;
  text-align: center;
  margin-top: .2rem;
}
.content{
  position: relative;
  width: 6.9rem;
  height: 6.1rem;
  background: #fff;
  display: block;
  margin: 0 auto;
  overflow: hidden;
  padding: 0 .5rem;
  .tips-earnings{
    width: .4rem;
    height: .4rem;
    position:absolute;
    right: .3rem;
    top: .3rem;
  }
  .info{
    li{
     &:first-child{
       color: #000;
       font-size: .3rem;
       margin-top: .6rem;
       text-align: left;
     }
     &.select{
       width: 100%;
       border-bottom: .01rem solid #E8E8E8;
       height: .75rem;
       line-height: .75rem;
       margin-top: .2rem;
      //  padding-left: .68rem;
       color: #000;
       text-align: left;
       position: relative;
       .sj{
         position: absolute;
         border: .12rem solid transparent;
         border-top-color: #666;
         right: 0;
         top: 58%;
         transform: translateY(-50%);
       }
     }
    }
  }
  .actions{
    margin-top: .78rem;
    li{
      &:first-child{
        color: #000;
        margin-top: .4rem;
        font-size: .3rem;
        text-align: left;
      }
      &.put-price{
        position: relative;
        width: 100%;
        height: .75rem;
        line-height: .75rem;
        border-bottom: .02rem solid #E8E8E8;
        span{
          position: absolute;
          left: 0;
          top: .1rem;
        }
        input{
          color: #000;
          font-size: .56rem;
          overflow: hidden;
          width: 100%;
          border: none;
          padding-left: .3rem;
        }
      }
    }
  }
}
</style>
<style lang="less">
.head_title_withdraw{
  line-height: 1.14rem;
  text-align:center;
  color:#333;
  font-size:.36rem;
  border-bottom:.02rem solid #eee;
  background: #fff;
  position: relative;
  img{
    position: absolute;
    width: .22rem;
    height: .22rem;
    left: .3rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
.popContent_withdraw{
  width: 100%;
  background: #fff;
  padding: 0 .3rem;
  li{
    line-height: 1.1rem;
    border-bottom: .02rem solid #eee;
    text-align:left;
    font-size: .3rem;
  }
}
</style>

<script>
import hint from '../../components/hint'
import headerCommon from '../../components/commonHeader'
import { Popup } from 'vux'
import { setTimeout } from 'timers'
export default {
  components: {
    headerCommon,
    Popup,
    hint
  },
  data () {
    return {
      showHint: false,
      showPop: false,
      residual: 0,
      defaultItem: [],
      cardList: [],
      rate: '',
      realPrice: '',
      ratePrice: '',
      priceNow: '',
      price: '',
      rulesList: []
    }
  },
  mounted () {
    this.getWidthdrawInfo()
    this.getDescribe()
  },
  methods: {
    closeHint (data) {
      if (data) {
        this.showHint = false
      }
    },
    getWidthdrawInfo () {
      this.$get('/userPurseDetail/withdrawInfo', {
        token: this.$cookies.get('token')
      }).then(res => {
        console.log(res.data)
        this.defaultItem = res.data.bankCardList[0]
        this.cardList = res.data.bankCardList
        this.residual = res.data.residual
        this.price = res.data.residual
      })
    },
    chooseCard (item) {
      this.defaultItem = item
      this.showPop = false
    },
    getCountAmount (val) {
      this.$get('/userPurseDetail/countAmount', {
        amount: val,
        token: this.$cookies.get('token')
      }).then(res => {
        console.log(res)
        this.priceNow = res.data.amount
        this.rate = res.data.rate
        this.ratePrice = res.data.ratePrice
        this.realPrice = res.data.afterWithdrawalAmount
      })
    },
    widthDraw () {
      if (this.price > 0) {
        this.$post('/userPurseDetail/withdrawOperate', {}, {
          id: this.defaultItem.id,
          token: this.$cookies.get('token'),
          amount: this.price
        }).then(res => {
          this.$vux.toast.text('提现成功')
          setTimeout(() => {
            this.$router.push({
              path: '/withdraw_log',
              query: {
                price: res.data.amount,
                bankName: `${res.data.bankName}(${res.data.bankCard})`
              }
            })
          }, 500)
        })
      } else {
        this.$vux.toast.text('您的余额不足以提现')
        return false
      }
    },
    getDescribe () {
      this.$get('/userPurseDetail/syDescribe', {}).then(res => {
        this.rulesList = res.data
      })
    },
    go () {
      this.$router.push('/addCard')
    }
  },
  watch: {
    price (newVal, oldVal) {
      if (newVal >= 100) {
        this.getCountAmount(newVal)
      }
    }
  }
}
</script>
