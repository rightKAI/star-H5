<template>
    <div style="background:#fff;min-height:100vh;widht:100%">
        <!-- <header-common :title="!showWho? '我的收益' : '我的提现'"></header-common> -->
        <div class="head">
          <div class="top-head">
            <div class="price">
              余额<span>{{earningData.residual}}</span>元
            </div>
            <div>
              <div class="detail">可提现金额{{earningData.earnings_month || 0}}元</div>
              <div class="detail">每月10日-15日可提现</div>
            </div>
            <div style="height:.6rem;">
              <button class="btn" v-if="hasCard">
                <div style="color:#fff" @click="widhdraw">
                  提现
                </div>
              </button>
              <button class="btn" v-else>
                <router-link style="color:#fff" to='/addCard'>
                  绑定银行卡
                </router-link>
              </button>
            </div>
          </div>
          <div class="bottom-head">
              <div class="money-box">
                <div class="money">{{earningData.earningsSum}}</div>
                <div class="moneyText">累计收益(元)</div>
              </div>
              <div class="line"></div>
              <div class="money-box">
                <div class="money">{{earningData.monthEarningsSum}}</div>
                <div class="moneyText">本月预估收益(元)</div>
              </div>
          </div>
          <img  class="tips-earnings" @click="showHint = true" src="../../assets/images/icon_txjl_03.png" alt="">
        </div>
        <div class="content">
          <div class="content-tab">
            <div :class="!showWho? 'checked' : ''" @click="showWho = false">收益记录</div>
            <div :class="showWho? 'checked' : ''" @click="showWho = true">提现记录</div>
          </div>
          <div v-if="showWho" class="detail-list">
            <div class="timeLine" v-for="(item) in withdrawList" :key="item.withdraw_time">
              <div class="time">{{item.withdraw_time}}</div>
              <div >
                <div class="time-card">
                  <i :style="`background:${item.color};`"></i>
                  <span :style="`color:${item.color};`">{{item.statusText}}</span>
                  <span class='time-line'>|</span>
                  <span class="details">【{{item.bank_name}}】{{item.withdraw_money}}元</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="detail-list">
            <div class="timeLine" v-for="(item) in walletList" :key="item.withdraw_time">
              <div class="time">{{item.create_time}}</div>
              <div >
                <div class="time-card pdAn">
                  <img class="icon" src="../../assets/images/img_wdsy_01.png" alt="">
                  <span style="color:#000;">{{item.title}}</span>
                  <span class='time-line'>|</span>
                  <span class="details">{{item.amount}}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hint v-if="showHint" title="收益规则" :detail="rulesList" @showCityName="closeHint"></hint>
    </div>
</template>

<style lang="less" scoped>
.head{
  width: 100%;
  height: 4.8rem;
  background: url('http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/img_txjl_01.png') no-repeat left top;
  background-size: 100%;
  position: relative;
  .tips-earnings{
    width: .4rem;
    height: .4rem;
    position:absolute;
    right: .3rem;
    top: .3rem;
  }
  .top-head{
    width: 100%;
    height: 3.27rem;
    display: flex;
    flex-wrap: wrap;
    font-family:PingFang-SC-Regular;
    justify-content: center;
    align-items: center;
    font-size:.26rem;
    .price{
      color: rgba(254,254,254,1);
      height: .5rem;
      vertical-align: text-bottom;
      span{
        font-size: .66rem;
        display: inline-block;
        color: #fff;
        margin: 0 .1rem;
        height: .6rem;
      }
    }
    .detail{
      color:rgba(191,191,191,1);
    }
    .btn{
      border: none;
      border: .01rem solid #8492ab;
      background: transparent;
      text-align: center;
      color: #fff;
      height: .6rem;
      width: 1.8rem;
      line-height: .6rem;
      border-radius: .3rem;
      margin-top: -.1rem;
    }
    div{
      width: 100%;
    }
  }
  .bottom-head{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.53rem;
    background: rgba(255,255,255,.1);
    display: flex;
    justify-content: space-between;
    .line{
      width: .02rem;
      height: .68rem;
      background: rgba(232, 232,232, .5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .money-box{
      width: 50%;
      height: 100%;
      .money{
        margin-top:8%;
        font-size: .36rem;
        color: #fff;
      }
      .moneyText{
        width: 100%;
        font-size: .26rem;
        color: rgba(191,191,191,1);
      }
    }
  }
}
.content{
  width: 100%;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  background: #fff;
  min-height: 1rem;
  margin-top: -.1rem;
  z-index: 99;
  position: relative;
  .details{
    font-size: .3rem;
  }
  .content-tab{
    height: 1rem;
    width: 100%;
    background: #fff;
    border-bottom: .01rem solid #eee;
    display: flex;
    justify-content: space-between;
    border-top-left-radius: .1rem;
    border-top-right-radius: .1rem;
    box-shadow:.02rem 0px .2rem rgba(105,114,227,0.1);
    div{
      width: 50%;
      height: 100%;
      line-height: 1rem;
      font-size: .36rem;
      color: #999;
      &.checked{
        color: #000;
      }
    }
  }
  .detail-list{
    width: 100%;
    padding: 0 .3rem;
    padding-top: .65rem;
  }
  .time{
    text-align: left;
    font-size:.28rem;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
  .timeLine{
    height: 2.6rem;
    width: 100%;
    background: url('http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_syjl_01.png') no-repeat left .14rem;
    background-size: .16rem;
    padding-left:.4rem;
    .time-line{
      margin: 0 .43rem 0 .3rem;
    }
  }
  .time-card{
    position: relative;
    width: 100%;
    height: 1.4rem;
    background:rgba(246,248,254,1);
    border-radius:.1rem;
    margin-top: .48rem;
    display: flex;
    align-items: center;
    padding-left: .77rem;
    justify-content: flex-start;
    &.pdAn{
      padding-left: 1.26rem;
    }
    .icon{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: .28rem;
      width: .7rem;
    }
    i{
      position: absolute;
      width:.18rem;
      height:.18rem;
      background:rgba(0,26,136,1);
      border-radius:50%;
      left: .28rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

<script>
import headerCommon from '../../components/commonHeader'
import hint from '../../components/hint'
export default {
  components: {
    headerCommon,
    hint
  },
  data () {
    return {
      showWho: false,
      showHint: false,
      hasCard: false,
      walletList: [],
      withdrawList: [],
      earningData: [],
      rulesList: []
    }
  },
  mounted () {
    this.getEarnings()
    this.getDescribe()
    if (this.$route.params.flag === '1') {
      this.showWho = false
    } else {
      this.showWho = true
    }
  },
  methods: {
    widhdraw () {
      if (this.earningData.withdrawDates) {
        this.$router.push({
          path: '/withdraw'
        })
      } else {
        this.$vux.toast.text('请在指定提现日期提现')
      }
    },
    closeHint (data) {
      if (data) {
        this.showHint = false
      }
    },
    getEarnings () {
      this.$get('/userPurseDetail/getAmount', {
        token: this.$cookies.get('token')
      }).then(res => {
        this.earningData = res.data
        this.hasCard = res.data.hasCard
        res.data.withdrawList.map(item => {
          switch (item.status) {
            case 0:
              item.statusText = '处理中'
              item.color = '#001A88'
              break
            case 1:
              item.statusText = '已完结'
              item.color = '#999999'
              break
            case 2:
              item.statusText = '已退货'
              item.color = '#999999'
              break
          }
        })
        this.walletList = res.data.walletList || []
        this.withdrawList = res.data.withdrawList || []
      })
    },
    getDescribe () {
      this.$get('/userPurseDetail/syDescribe', {}).then(res => {
        this.rulesList = res.data
      })
    }
  }
}
</script>
