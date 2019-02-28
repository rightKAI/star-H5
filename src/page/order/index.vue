<template>
    <div>
        <!-- <header-common title="推广订单"></header-common> -->
        <ul class="header">
          <li @click="allFilter">{{filterText}}</li>
          <li @click="allOrder">{{orderText}}</li>
          <!-- <li>{{timeText}}</li> -->
        </ul>
        <div class="shade" v-if="showShade">
          <ul :class="showShade ? 'filter-list listed' : 'filter-list'">
            <li @click="chooseSource(index)"  :class=" choose === index ? 'active' : ''" v-for="(item, index) in sourceList" :key="index">{{item}}
              <img v-if="choose === index" src="../../assets/images/icon_tgdd_03.png" alt="">
            </li>
          </ul>
        </div>
        <ul class="orderList" v-if="orderList.length>0">
          <li :class="`order-item ${item.status!==2 ? '' : 'grey-card'}`" v-for="(item, index) in orderList" v-if="item" :key="index">
              <ul class="order-state">
                <li>{{item.order_time}}</li>
                <li :style="`color:${item.color};`">{{item.statusText}}</li>
              </ul>
              <ul class="order-card">
                <li class="left">
                  <p>订单号：{{item.order_no}}</p>
                  <p>顾 客：{{item.user_name}} 【{{item.title}}】</p>
                  <p>金 额：{{item.amount}}元 <span style="color:#90A5FF;font-weight:bold;">{{item.remind}}%提成</span>
                  </p>
                </li>
                <li class="right">
                  <div>
                    <p>预计收益</p>
                    <p>{{item.remindAmount}}</p>
                  </div>
                </li>
              </ul>
          </li>
        </ul>
        <emptyPage v-else imgURLStr='http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_tgdd_02.png' title='您还没有推广订单' btnText='立即推广' toUrl="/invite"></emptyPage>
    </div>
</template>
<style lang="less" scoped>
@borderColor: #eee;
.grey-card{
  opacity: .4;
}
.shade{
  position: absolute;
  height: 100%;
  z-index: 11;
  width: 100%;
  background: rgba(0,0,0,.2);
}

.filter-list{
  position: absolute;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 999;
  padding: 0 .3rem;
  li{
    height: .99rem;
    width: 100%;
    line-height: .99rem;
    text-align: left;
    color: #000;
    border-bottom: .01rem solid @borderColor;
    &.active{
      color: rgba(245,40,73,1);
      position: relative;
    }
    img{
      position: absolute;
      right: 0;
      top:50%;
      transform: translateY(-50%);
      width: .28rem;
    }
  }
}
.header{
  height: .93rem;
  width: 100%;
  background: #fff;
  border-bottom: .01rem solid @borderColor;
  display:flex;
  justify-content: center;
  align-items: center;
  li{
    width: 50%;
    height: 100%;
    line-height: .93rem;
    text-align: center;
    font-size: .28rem;
    color: #000;
    position: relative;
    &:after{
      content: '';
      position: absolute;
      right: 12%;
      top: 55%;
      transform: translateY(-50%);
      border: .1rem solid transparent;
      border-top-color: #000;
    }
  }
}
.orderList{
  width: 100%;
  padding: 0 4%;
}
.order-item{
  height: 2.92rem;
  .order-state{
    display: flex;
    justify-content: space-between;
    height: .8rem;
    align-items: flex-end;
    font-size: .26rem;
    li:first-child{
      color: #000;
    }
    li:last-child{
      color:rgba(245,40,73,1);
    }
  }
}
.order-card{
  position: relative;
  height: 2.04rem;
  width: 100%;
  background: rgba(0,26,136,1);
  margin-top: .1rem;
  border-radius: .1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:after{
    content:'';
    position: absolute;
    top: -.2rem;
    left: .3rem;
    border: .1rem solid transparent;
    border-bottom: .1rem solid rgba(0,26,136,1);
  }
  .left{
    display: flex;
    align-items: center;
    width: 73.44%;
    flex-wrap: wrap;
    padding: .0 0 0 7.2%;
    font-family:PingFang-SC-Regular;
    font-size: .26rem;
    p{
     color: rgba(255, 255, 255, .8);
     display: flex;
     justify-content: flex-start;
     &:not(:first-child){
       margin-top: .1rem;
     }
    }
  }
  .right{
    position: absolute;
    right: 0;
    top: 0;
    width: 26.56%;
    height: 100%;
    border-top-right-radius: .1rem;
    border-bottom-right-radius: .1rem;
    background: #1a3194;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    p{
      color: rgba(255, 255, 255, .8);
      &:first-child{
        font-size: .22rem;
      }
      &:last-child{
        color: #fff;
        width: 100%;
        font-size: .4rem;
      }
    }
  }
}
</style>

<script>
import emptyPage from '../../components/emptyPage'
import headerCommon from '../../components/commonHeader'
import { mapState } from 'vuex'
export default {
  components: {
    emptyPage,
    headerCommon
  },
  data () {
    return {
      sourceList: [],
      active: true,
      choose: 0,
      showShade: false,
      clickIndex: '',
      filterText: '全部来源',
      orderText: '全部订单',
      timeText: '起止时间',
      choose1: 0,
      choose2: 0,
      orderList: [],
      empty: false
    }
  },
  computed: {
    ...mapState(['userType'])
  },
  mounted () {
    this.getOrderList({
      token: this.$cookies.get('token')
    })
    console.log(this.userType)
  },
  methods: {
    chooseSource (index) {
      this.choose = index
      if (this.clickIndex === 0) {
        this.choose1 = index
        this.filterText = this.sourceList[index]
        this.showShade = false
        if (index !== 0) {
          this.getOrderList({
            token: this.$cookies.get('token'),
            status: this.choose2 - 1 >= 0 ? this.choose2 - 1 : '',
            type: this.choose1 - 1 === 2 ? (this.userType === '3' ? 7 : 2) : this.choose1 - 1
          })
        } else {
          this.getOrderList({
            token: this.$cookies.get('token'),
            status: this.choose2 - 1 >= 0 ? this.choose2 - 1 : ''
          })
        }
      } else {
        this.choose2 = index
        this.orderText = this.sourceList[index]
        this.showShade = false
        if (index !== 0) {
          this.getOrderList({
            token: this.$cookies.get('token'),
            type: this.choose1 - 1 >= 0 ? this.choose1 - 1 : '',
            status: this.choose2 - 1
          })
        } else {
          this.getOrderList({
            token: this.$cookies.get('token'),
            type: this.choose1 - 1 >= 0 ? this.choose1 - 1 : ''
          })
        }
      }
    },
    allFilter () {
      if (this.clickIndex === 0) {
        this.clickIndex = ''
        this.showShade = false
      } else {
        this.choose = this.choose1
        this.sourceList = []
        let fiterList = ['全部来源', '店长', '店员']
        if (this.userType === '3') {
          fiterList.push('集团合伙人')
        } else {
          fiterList.push('合伙人')
        }
        fiterList.map(item => {
          this.sourceList.push(item)
        })
        this.clickIndex = 0
        this.showShade = true
      }
    },
    allOrder () {
      if (this.clickIndex === 1) {
        this.clickIndex = ''
        this.showShade = false
      } else {
        this.choose = this.choose2
        this.sourceList = []
        let fiterList = ['全部订单', '待结算', '已结算', '已退货']
        fiterList.map(item => {
          this.sourceList.push(item)
        })
        this.clickIndex = 1
        this.showShade = true
      }
    },
    getOrderList (data) {
      this.$get('/userOrderController/getOrderList', data).then(res => {
        res.data.orderList.map(item => {
          switch (item.status) {
            case 0:
              item.statusText = '待结算'
              item.color = '#F52849'
              break
            case 1:
              item.statusText = '已结算'
              item.color = '#000'
              break
            case 2:
              item.statusText = '已退货'
              item.color = '#010101'
              break
          }
        })
        if (res.data.orderList.length < 1 && this.orderList.length > 0) {
          this.$vux.toast.text('该筛选条件暂无匹配数据')
          this.orderList = ['']
          return false
        }
        this.orderList = res.data.orderList
      })
    }
  }
}
</script>
