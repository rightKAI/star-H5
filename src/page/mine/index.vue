<template>
    <div style="height:100vh;">
        <div class="header">
            <router-link class="header-logo" to="/mineInfo">
                <img :src="userInfo.iconUrl" alt="">
            </router-link>
            <div class="user-name">
                <img :style="userType === '5' || userType === '3' ? 'height: 0.5rem' : ''" :src="identity" alt="">
            </div>
            <div class="name">{{userName || '星球居民'}}</div>
            <router-link class="message" to="/message">
                <img  src="../../assets/images/icon_news.png" alt="">
                <!-- <i class="tips">3</i> -->
                <badge class="tips" v-if="userInfo.msgNum > 0"  :text="userInfo.msgNum"></badge>
            </router-link>
        </div>
        <div class="tabList">
          <router-link  class="tabItem" v-for="(item, index) in tabList" :key="index" :to="item.to">
            <div>
                <img class="item-img" :src="item.imgUrl" alt="">
                <span class="item-name">{{item.text}}</span>
            </div>
          </router-link>
        </div>
        <div class="action-list">
            <router-link class="action-item" v-for="(item, index) in actionList" :key="index" :to="item.to">
                <div class="item-left">
                    <img :src="item.imgUrl" alt="">
                    <span>{{item.text}}</span>
                </div>
                <img src="../../assets/images/icon_wdxq_09.png" alt="" class="item-right">
            </router-link>
        </div>
        <div class="details">
          使用本系统即代表同意《Dmallovo合伙人协议》
        </div>
        <!-- <div style="height:.98rem"></div> -->
        <bottomTab :tabFlag="false  "></bottomTab>
    </div>
</template>

<style lang="less" scoped>
@right: #ffc5c5c5;
@borderColor: #eee;
@fontColor: #333;
.header {
  height: 3.9rem;
  position: relative;
  width: 100%;
  background: url("../../assets/images/mine_bg.jpg") no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .header-logo {
    width: 1.6rem;
    height: 1.6rem;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 0.6rem;
    top: 0.5rem;
    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      margin-top: 0.05rem;
    }
  }
  .user-name {
    position: absolute;
    top: .9rem;
    left: 2.7rem;
    img {
      height: 0.4rem;
    }
  }
  .name {
    position: absolute;
    left: 2.7rem;
    top: 1.39rem;
    font-size: 0.36rem;
    color: #fff;
    font-family: PingFang-SC-Bold;
  }
  .message {
    position: absolute;
    top: 1.14rem;
    right: 0.81rem;
    height: 0.5rem;
    width: 0.5rem;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 0.5rem;
      height: 0.5rem;
    }
    .tips {
      position: absolute;
      background: #f52849;
      right: 0;
      transform: translate(30%, -50%);
    }
  }
}
.details{
  height: 1rem;
  width: 100%;
  line-height: 1rem;
  text-align: center;
  font-size: .24rem;
  background: #F6F8FE;
  color: rgba(153,153,153,1);
}
.tabList {
  width: 92%;
  height: 2.6rem;
  background: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 2.61rem;
  border-radius: 0.2rem;
  box-shadow: 0.02rem 0rem 0.2rem rgba(105, 114, 227, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  .tabItem {
    width: 0.9rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-right:9.5%;
    }
    .item-img {
      width: 0.9rem;
      height: 0.9rem;
      background: rgba(236, 239, 249, 1);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 0.43rem;
      }
    }
    .item-name {
      font-size: 0.28rem;
      margin-top: 0.1rem;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.action-list {
  width: 100%;
  height: 7rem;
  background: #fff;
  padding: 1.5rem 0.3rem 0 0.3rem;
  .action-item {
    width: 100%;
    height: 1.07rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:not(:last-child){
      border-bottom: 0.01rem solid @borderColor;
    }
    .item-left {
      width: 50%;
      font-size: 0.3rem;
      display: flex;
      align-items: center;
      color: @fontColor;
      img {
        width: 0.34rem;
        margin-right: 0.2rem;
      }
    }
    .item-right {
      width: 0.24rem;
    }
  }
}
</style>

<script>
import bottomTab from '../../components/bottomTab'
import { mapMutations } from 'vuex'
import { Badge } from 'vux'
export default {
  components: {
    bottomTab,
    Badge
  },
  data () {
    return {
      tabList: [
        {
          to: '/earnings/1',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_earnings.png',
          text: '收益'
        },
        {
          to: '/performance',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_proformance.png',
          text: '业绩'
        },
        {
          to: '/myteam',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_team.png',
          text: '团队'
        },
        {
          to: '/invite',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_invite.png',
          text: '邀请'
        }
      ],
      actionList: [
        {
          to: '/order',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_order.png',
          text: '推广订单'
        },
        {
          to: '/earnings/0',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_detail.png',
          text: '提现记录'
        },
        {
          to: '/mineInfo',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_data.png',
          text: '个人资料'
        },
        {
          to: '/mineCard',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_card.png',
          text: '我的银行卡'
        },
        {
          to: '/service',
          imgUrl: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_service.png',
          text: '联系客服'
        }
      ],
      userInfo: [],
      userType: '',
      userName: '',
      identity: ''
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['changeUserId']),
    getUserInfo () {
      this.$get('/partneruser/getUserInfomation', {
        token: this.$cookies.get('token')
      }).then(res => {
        this.userInfo = res.data
        this.userName = res.data.partnerObject.userName
        this.userType = res.data.partnerObject.userType
        this.identity = res.data.partnerObject.identity
        this.changeUserId(this.userType)
      })
    }
  }
}
</script>
