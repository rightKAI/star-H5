<template>
<div style="min-height:100vh;width:100%;background:#fff;padding-bottom:.2rem;">
  <!-- <header-common title="我的业绩"></header-common> -->
  <div>
    <div class="child" style='width:3.48rem;height:3.48rem;margin:0 auto;margin-top:.45rem'>
      <x-circle
        :percent="performance.finishRate >= 100 ? 100 : performance.finishRate"
        :stroke-width="12"
        :trail-width="12"
        stroke-color="#041f91"
        trail-color="#ececec">
        <div style="color:#000;font-size:.24rem">本月业绩(元)</div>
        <div style="color:#000;font-size:.4rem">{{performance.monthAmount}}</div>
      </x-circle>
    </div>
  </div>
    <p style="margin-top:.4rem" class="detail">
        <i></i>
        <span style="margin-right:.2rem">完成率</span>
        <span style="margin-right:.32rem">{{performance.finishRate}}%</span>
        <span class="detail-text" @click="goto">明细</span>
      </p>
      <p class="detail detail2">
        <i style="background:#ececec"></i>
        <span style="margin-right:.2rem">本月目标</span>
        <span>{{performance.baseAmount}}</span>
        <span>元</span>
    </p>
    <div class="banenr">
      <img :src="performance.finishRate >= 100 ? performance.successImg : performance.failImg" alt="">
    </div>
    <button class="btn">
      <router-link style="color:#fff" to="/invite">
        邀请赚钱
      </router-link>
    </button>
</div>
</template>

<style lang="less" scoped>
.banenr{
  width: 100%;
  height: 4.5rem;
  margin-top: .3rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.btn{
  width:3rem;
  height:.7rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:.35rem;
  box-shadow:0 .1rem .2rem 0 rgba(11,40,163,0.2);
  border: none;
  color: #fff;
  margin-top: .3rem;
}
.detail{
  display: flex;
  width: 60%;
  text-align: left;
  margin: 0 auto;
  font-size: .26rem;
  padding-left: 20%;
  line-height: .5rem;
  position: relative;
  .detail-text{
    color: #001a88;
    text-decoration: underline;
  }
  i{
    position: absolute;
    width: .1rem;
    height: .1rem;
    background: #041f91;
    border-radius: 50%;
    left: 20%;
    top: 50%;
    transform: translateY(-50%);
  }
  span:first-child{
    margin-right: .2rem;
  }
}
</style>

<script>
import { XCircle } from 'vux'
import headerCommon from '../../components/commonHeader'
export default {
  components: {
    XCircle,
    headerCommon
  },
  data () {
    return {
      percent: 0,
      performance: {}
    }
  },
  mounted () {
    this.getAchievement()
  },
  methods: {
    getAchievement () {
      this.$get('/partner/getAchievement', {
        token: this.$cookies.get('token')
      }).then(res => {
        console.log(res)
        this.performance = res.data
      })
    },
    goto () {
      this.$router.push('/order')
    }
  }
}
</script>
