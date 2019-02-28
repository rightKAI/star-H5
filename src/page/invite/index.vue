<template>
  <div style="width:100%;min-height:100vh;background:#fff;padding-bottom:.6rem;">
    <!-- <header-common title="邀请赚钱"></header-common> -->
    <div>
      <img class="banner" :src="inviteData.imgPath" alt="">
    </div>
    <div class="detail">
      <div class="title">玩星球,赚收益</div>
      <ul v-if="description" class="detail-child">
        <li v-for="(item, index) in description" :key="index">
          <span>{{index+1}}、</span>
          <div>{{item}}</div>
        </li>
      </ul>
    </div>
    <img class="code" :src="inviteData.qrCode" alt="">
    <p style="font-size:.24rem;color:#001A88;margin-top:.26rem;">微信扫码 进入玛丽莱星球</p>
    <p style="font-size:.24rem;color:#001A88">开启赚钱GO!</p>
  </div>
</template>

<style lang="less" scoped>
.title{
  font-size: .42rem;
  color: #000;
  margin: .2rem 0;
  font-weight: bold;
}
.banner{
  height: 4.5rem;
  width: 100%;
}
.code{
  width: 3.18rem;
  margin-top: .6rem;
}
.detail-child{
  width: 78%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: .2rem;
  font-size: .26rem;
  color: #000;
  li{
    display: flex;
    justify-content: space-between;
    line-height: .5rem;
    text-align: left;
  }
}
</style>

<script>
import headerCommon from '../../components/commonHeader'
export default {
  components: {
    headerCommon
  },
  data () {
    return {
      inviteData: {},
      description: []
    }
  },
  mounted () {
    this.getInviteData()
  },
  methods: {
    getInviteData () {
      this.$get('/partner/getInviteInfo', {
        token: this.$cookies.get('token'),
        page: 'pages/index/index',
        width: 430
      }).then(res => {
        console.log(res)
        if (res.data.description) {
          this.description = res.data.description.split('##')
        }
        this.inviteData = res.data
      })
    }
  }
}
</script>
