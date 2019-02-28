<template>
    <div>
          <div style="height:100vh;width:100%;background:#fff;">
            <!-- <header-common title="推广订单"></header-common> -->
              <div class="head">
              <img class="user_logo" :src="teamData.userIcon" alt="">
              <div class="my_team">
                <div>我的团队</div>
              </div>
              <div class="body_num">
                <span>{{teamData.partnerNum}}</span>人
              </div>
            </div>
            <div v-if="isStore" class="content">
                <div class="content-tab">
                <div :class="!showWho? 'checked' : ''" @click="showWho = false">店员({{clerkList.length}})</div>
                <div :class="showWho? 'checked' : ''" @click="showWho = true">合伙人({{partnerList.length}})</div>
              </div>
              <div v-if="showWho" class="detail-list">
                      <div v-if="partnerList.length > 0">
                      <ul class="detail-item" v-for="(item) in partnerList" :key="item.id">
                        <li>
                          <span class="name">{{item.name}}</span>
                          <span class="time">{{item.create_time}}</span>
                        </li>
                        <li>
                          <span class="priceNum">{{item.allAmount}}</span>
                          <span class="price">累计业绩(元)</span>
                        </li>
                        <li>
                          <span class="mondthPrice">{{item.monthAmount}}</span>
                          <span class="price">本月业绩(元)</span>
                        </li>
                      </ul>
                      <!-- <ul class="loadmoreText">
                        <li class="line"></li>
                        <li>下拉加载更多</li>
                        <li class="line"></li>
                      </ul> -->
                    </div>
                    <div class="blank-text" v-else>
                        您还没有合伙人哟！
                    </div>
              </div>
              <div v-else class="detail-list">
                  <div v-if="clerkList.length>0">
                    <ul class="detail-item" v-for="item in clerkList" :key="item.id">
                      <li>
                        <span class="name">{{item.name}}</span>
                        <span class="time">{{item.create_time}}</span>
                      </li>
                      <li>
                        <span class="priceNum">{{item.allAmount}}</span>
                        <span class="price">累计业绩(元)</span>
                      </li>
                      <li>
                        <span class="mondthPrice">{{item.monthAmount}}</span>
                        <span class="price">本月业绩(元)</span>
                      </li>
                    </ul>
                  </div>
              </div>
            </div>
            <div class="content" v-if="!isStore">
              <div class="detail-list">
                      <div v-if="partnerList.length > 0">
                      <ul class="detail-item" v-for="(item) in partnerList" :key="item.id">
                        <li>
                          <span class="name">{{item.name}}</span>
                          <span class="time">{{item.create_time}}</span>
                        </li>
                        <li>
                          <span class="priceNum">{{item.allAmount}}</span>
                          <span class="price">累计业绩(元)</span>
                        </li>
                        <li>
                          <span class="mondthPrice">{{item.monthAmount}}</span>
                          <span class="price">本月业绩(元)</span>
                        </li>
                      </ul>
                      <!-- <ul class="loadmoreText">
                        <li class="line"></li>
                        <li>下拉加载更多</li>
                        <li class="line"></li>
                      </ul> -->
                    </div>
                    <div class="blank-text" v-else>
                        您还没有合伙人哟！
                    </div>
              </div>
            </div>
          </div>
      </div>
</template>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 2.6rem;
  background: url("http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/img_wdtd_01.png")
    no-repeat left top;
  background-size: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 0.3rem;
  align-items: center;
  .user_logo {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    overflow: hidden;
  }
  .my_team {
    font-size: 0.32rem;
    color: #fff;
    margin-left: 0.5rem;
    width: 3.2rem;
    text-align: left;
  }
  .body_num {
    font-size: 0.26rem;
    margin-left: 0.47rem;
    color: #fff;
    span {
      font-size: 1rem;
    }
  }
}
.blank-text{
  font-size:.46rem;
  font-weight: bold;
  margin-top: 1.48rem;
  font-family:PingFang-SC-Bold;
  color:rgba(205,205,205,1);
}
.content {
  width: 100%;
  border-top-left-radius: 0.1rem;
  border-top-right-radius: 0.1rem;
  background: #fff;
  // height: 74.975%;
  margin-top: -0.1rem;
  z-index: 99;
  position: relative;
  .content-tab {
    height: 1rem;
    width: 100%;
    background: #fff;
    border-bottom: 0.01rem solid #eee;
    display: flex;
    color: #999;
    justify-content: space-between;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    box-shadow: 0.02rem 0px 0.2rem rgba(105, 114, 227, 0.1);
    div {
      width: 50%;
      height: 100%;
      line-height: 1rem;
      font-size: 0.36rem;
      &.checked {
        color: #000;
      }
    }
  }
  .loadmore {
    position: absolute;
    bottom: 0;
  }
}
.detail-list {
  height: 84.97%;
  padding: 0 0.2rem;
  .mondthPrice {
    color: #f52849;
  }
  .priceNum {
    font-size: 0.34rem;
    color: #333;
  }
  .name {
    font-size: 0.34rem;
    color: #000;
  }
  .time {
    font-size: 0.22rem;
    color: #000;
  }
  .price {
    font-size: 0.22rem;
  }
  .detail-item {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-left: .1rem;
    height: 1.7rem;
    text-overflow: clip;
    li:first-child{
      width: 1.8rem;
      span:first-child{
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
      }
    }
    &:not(:first-child) {
      border-top: 0.01rem solid #e8e8e8;
    }
    li {
      span {
        text-align: left;
        display: block;
      }
    }
  }
  .loadmoreText {
    position: absolute;
    bottom: -1rem;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    font-size: 0.24rem;
    color: #bdbdbd;
    display: flex;
    align-items: center;
    justify-content: center;
    li:nth-child(2) {
      margin: 0 0.2rem;
    }
    .line {
      width: 30%;
      height: 0.02rem;
      background: #e8e8e8;
    }
  }
}
</style>

<script>
import { Scroller, LoadMore } from 'vux'
import headerCommon from '../../components/commonHeader'
export default {
  components: {
    LoadMore,
    headerCommon,
    Scroller
  },
  data () {
    return {
      showWho: true,
      isStore: false,
      onFetching: false,
      teamData: {},
      partnerList: []
    }
  },
  mounted () {
    this.getTeamData()
  },
  methods: {
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.onFetching = false
        }, 2000)
      }
    },
    getTeamData () {
      this.$get('/partner/getTeamInfo', {
        token: this.$cookies.get('token')
      }).then(res => {
        this.teamData = res.data
        this.isStore = res.data.isManager
        this.partnerList = res.data.partnerList || []
        this.clerkList = res.data.clerkList || []
      })
    }
  }
}
</script>
