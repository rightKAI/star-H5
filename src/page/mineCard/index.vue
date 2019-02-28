<template>
  <div style="padding-bottom:1rem">
    <!-- <header-common title="我的银行卡"></header-common> -->
    <div v-if="cardList.length>0">
      <ul class="cardList">
        <li class="card-item" v-for="(item, index) in cardList" :key="index">
          <ul>
            <li>{{item.bankName}}</li>
            <li>储蓄卡</li>
            <li>{{item.bankCard}}</li>
          </ul>
          <div class="delete" @click="linkTo(item.id)"></div>
        </li>
      </ul>
      <button class="addCard">
        <router-link style="color:#000;" to="/addCard">
          添加银行卡
        </router-link>
      </button>
    </div>
    <empty-page v-else btnText="立即添加" toUrl="/addCard" imgURLStr="http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_wdyhk_01.png" title="您还没有添加过银行卡" detail="添加银行卡，收益都进口袋吧~" ></empty-page>
  </div>
</template>

<style lang="less" scoped>
.addCard{
  width:3rem;
  height:.7rem;
  background:linear-gradient(-60deg,rgba(255,255,255,1) 0%,rgba(255,255,255,1) 100%);
  border-radius:.35rem;
  border: none;
  box-shadow:.05rem 0 .2rem rgba(11,40,163,0.1);
  margin-top: .78rem;
  color: #000;
}
.cardList{
  width: 100%;
  padding: 0 .3rem;
  margin-top: .5rem;
  .card-item{
    position: relative;
    width: 100%;
    padding:.6rem;
    height: 2.69rem;
    background: url('http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/img_wdyhk_01.png') no-repeat left top;
    background-size: 100%;
    .delete{
      position: absolute;
      width: .6rem;
      height: 0.6rem;
      right: .54rem;
      top: 0.54rem;
    }
    ul{
      min-width: 50%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      justify-content: flex-start;
      color: #fff;
      li{
        display: block;
        width: 100%;
        text-align: left;
        font-size: .3rem;
        &:first-child{
          font-size: .42rem;
        }
        &:nth-child(2){
          margin: .1rem 0;
        }
        &:last-child{
          font-size: .36rem;
        }
      }
    }
    &:not(:first-child){
      margin-top: .3rem;
    }
  }
}
</style>

<script>
import headerCommon from '../../components/commonHeader'
import emptyPage from '../../components/emptyPage.vue'
export default {
  components: {
    headerCommon,
    emptyPage
  },
  data () {
    return {
      cardList: []
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.$get('/bankcard/list', {
        token: this.$cookies.get('token'),
        pageNo: 1,
        pageSize: 100
      }).then(res => {
        console.log(res)
        this.cardList = res.data || []
      })
    },
    linkTo (id) {
      this.$router.push({
        path: '/addCard',
        query: {
          id
        }
      })
    }
  }
}
</script>
