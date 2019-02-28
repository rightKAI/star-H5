<template>
  <div>
    <!-- <header-common title="提现记录"></header-common> -->
    <div class="content">
      <div class="top">
        <img src="../../assets/images/icon_txjl_01.png" alt="">
        <h2>提现成功</h2>
        <p style="margin-top:.2rem">您的提现预计7个工作日到账</p>
        <p>节假日顺延</p>
      </div>
      <div>
        <ul class="detail">
          <li>
            <span>提现金额</span>
            <span>￥{{price}}</span>
          </li>
          <li>
            <span>到账银行卡</span>
            <span>{{bankName}}</span>
          </li>
        </ul>
      </div>
      <button class="btn" @click="right">确认</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn{
  width:3rem;
  height:.9rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:.45rem;
  box-shadow:.1rem 0 .2rem rgba(11,40,163,0.2);
  border: none;
  margin-top: .6rem;
  font-size: .34rem;
  color: #ffffff;
}
.top{
  height: 4.64rem;
  width: 100%;
  border-bottom: .02rem solid #e8e8e8;
}
.detail{
  width: 100%;
  margin-top: .6rem;
  li{
    display: flex;
    justify-content: space-between;
    &:not(:first-child){
      margin-top: .24rem;
    }
  }
}
.content{
  width: 6.9rem;
  height: 8.44rem;
  background: #fff;
  margin: 0 auto;
  margin-top: .3rem;
  border-radius:.1rem;
  box-shadow:.02rem 0 .1rem rgba(105,114,227,0.1);
  padding: 0 .5rem;
  img{
    width: 1rem;
    margin-top: .67rem;
  }
  h2{
    font-size: .46rem;
    color: #001A88;
    margin-top: .2rem;
  }
  p{
    font-size: .3rem;
    color: #000;
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
      price: '',
      bankName: ''
    }
  },
  mounted () {
    this.price = this.$route.query.price
    this.bankName = this.$route.query.bankName
  },
  methods: {
    right () {
      this.$router.push('/mine')
    }
  }
}
</script>
