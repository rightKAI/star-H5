<template>
  <div>
    <!-- <header-common title="我的资料"></header-common> -->
    <ul class="userInfo-box">
      <li class="logo">
        <span class="scond-title">头像</span>
        <div class="user-logo">
          <img :src="userInfo.iconUrl" alt="">
        </div>
      </li>
      <li>
        <span class="scond-title">手机</span>
        <div class="content">{{userInfo.phone}}</div>
      </li>
      <li>
        <span class="scond-title">姓名</span>
        <div class="content">{{userInfo.partnerObject.userName}}</div>
      </li>
      <li class="realName">
        <span class="scond-title">实名认证</span>
        <div class="content">{{showRealCode ? userInfo.idcard : userInfo.partnerObject.idCard}}</div>
        <img @click="showRealCode = !showRealCode" :src="`http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/${showRealCode? 'btn_wdzl_02' : 'btn_wdzl_01'}.png`" alt="">
      </li>
    </ul>
    <ul class="userInfo-box" style="margin-top:.2rem">
      <li>
        <span class="scond-title">我的伯乐</span>
        <div class="content">{{userInfo.inviteName || '无'}}</div>
      </li>
      <li>
        <span class="scond-title">加入时间</span>
        <div class="content">{{userInfo.partnerObject.createTime.split(" ")[0]}}</div>
      </li>
      <li>
        <span class="scond-title">身份</span>
        <div class="content">{{userInfo.partnerObject.identity}}</div>
      </li>
    </ul>
    <ul class="address-card" v-if="userInfo.dtoList.length>0">
      <li>
        <p class="name">
          <span style="margin-right:.33rem;">{{userInfo.dtoList[0].userName}}</span>
          <span>{{userInfo.dtoList[0].phone}}</span>
        </p>
        <p class="address">{{userInfo.dtoList[0].provinceName}} {{userInfo.dtoList[0].cityName}} {{userInfo.dtoList[0].areaName}} {{userInfo.dtoList[0].address}}</p>
      </li>
      <li>
        <img src="../../assets/images/btn_wdxq_02.png" alt="" @click="updateAddress(userInfo.dtoList[0].id)">
      </li>
    </ul>
    <button class="addBtn" v-else>
      <router-link style="color:#000" to="/address/1">
        添加地址
      </router-link>
    </button>
  </div>
</template>

<style lang="less" scoped>
.userInfo-box{
  width: 100%;
  background: #fff;
  padding: 0 .3rem;
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1rem;
    width: 100%;
    .scond-title{
      color: #000;
    }
    &.realName{
      position: relative;
      padding-right: .7rem;
      img{
        position: absolute;
        top:50%;
        right: 0;
        transform: translateY(-50%);
        width: .45rem;
      }
    }
    &:not(:first-child){
      border-top: .01rem solid #f4f4f4;
    }
    &.logo{
      height: 1.68rem;
      .user-logo img{
        width: 1.3rem;
        height: 1.3rem;
        border-radius: 50%;
      }
    }
  }
}
.addBtn{
  width:3rem;
  height:.7rem;
  background:#fff;
  border-radius:.35rem;
  box-shadow:.05rem 0px .2rem rgba(11,40,163,0.1);
  margin-top: .8rem;
  border: none;
}
.address-card{
  width: 100%;
  height: 2.3rem;
  background: #fff;
  margin-top: .2rem;
  padding: 0 .3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  li{
    height: 100%;
    &:first-child{
      width: 79%;
      padding-right: .9rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-content: center;
    }
    span{
      font-size: .3rem;
      font-weight: bold;
      color: #000;
    }
    .address{
      font-size: .26rem;
      text-align: left;
      margin-top: .1rem;
      overflow: hidden;
      height: 3em;
      width: 100%;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    &:last-child{
      width: 21%;
      height: 60%;
      display:flex;
      justify-content: center;
      align-items: center;
      border-left:.01rem solid #eee;
      img{
        width: .44rem;
      }
    }
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
      showRealCode: false,
      userInfo: {
        dtoList: [],
        iconUrl: '',
        idcard: '',
        partnerObject: {
          createTime: '',
          id: '',
          idCard: '',
          identity: '',
          usreId: '',
          userName: '',
          userType: ''
        },
        phone: '',
        sourceName: ''
      }
    }
  },
  mounted () {
    this.getInfoInvite()
  },
  methods: {
    getInfoInvite () {
      this.$get('/partneruser/getInfoInvite', {
        token: this.$cookies.get('token')
      }).then(res => {
        console.log(res.data.dtoList)
        this.userInfo = res.data
      })
    },
    updateAddress (id) {
      this.$router.push({
        path: '/address/0',
        query: {
          id
        }
      })
    }
  }
}
</script>
