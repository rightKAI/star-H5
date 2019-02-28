<template>
  <div>
    <!-- <header-common title="联系客服"></header-common> -->
    <div class="head">
      <img  src="../../assets/images/icon_lxkf_02.png" alt="">
      <p style="margin-top:.2rem;">客服电话  400-076-1901</p>
      <p>服务时间  9:00-17:00</p>
    </div>
    <div class="area">
      <x-textarea v-model.trim="rebateText" placeholder="对我们的服务，您有更好的建议吗？您还希望在玛丽莱星球上兑换什么礼物呢？请告诉我们..." rows="4" :max="200" ></x-textarea>
    </div>
    <button class="sub" @click="sub">提交反馈</button>
    <dialog-diy v-if="showShade" @showCityName="closeLog" title="感谢反馈" detail="留言我们已经收到,谢谢您对我们的支持！" icon="http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_lxkf_01.png"></dialog-diy>
  </div>
</template>

<style lang="less" scoped>
.head{
  width: 100%;
  height: 4rem;
  background: #fff;
  font-size: .26rem;
  color: #000;
  img{
    width: 1.8rem;
    margin-top: .6rem;
  }
}
.sub{
  width:3rem;
  height:0.7rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:.35rem;
  border: none;
  margin-top: .6rem;
  color: #fff;
}
.area{
  width: 100%;
  height: 3rem;
  padding: .2rem .3rem 0 .3rem;
  background: #fff;
  margin-top: .2rem;
}
</style>

<script>
import headerCommon from '../../components/commonHeader'
import dialogDiy from '../../components/dialog_diy'
import { XTextarea } from 'vux'
import { setTimeout } from 'timers'
export default {
  components: {
    headerCommon,
    XTextarea,
    dialogDiy
  },
  data () {
    return {
      showShade: false,
      rebateText: ''
    }
  },
  methods: {
    sub () {
      if (this.rebateText) {
        this.$post('/InviteFeedback/save', {}, {
          token: this.$cookies.get('token'),
          content: this.rebateText
        }).then(res => {
          this.showShade = true
        })
      } else {
        this.$vux.toast.text('反馈不能为空噢~')
        return false
      }
    },
    closeLog () {
      this.showShade = false
      setTimeout(() => {
        this.$router.back(-1)
      }, 100)
    }
  }
}
</script>
