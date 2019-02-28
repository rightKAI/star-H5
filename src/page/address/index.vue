<template>
  <div>
    <!-- <header-common :title="titleFlag == 1 ? '添加地址' : '编辑地址'"></header-common> -->
    <ul class="address-box">
      <li>
        <x-input  :show-clear="true" v-model="name" placeholder="收货人"></x-input>
      </li>
      <li>
        <x-input type="number" :show-clear="true" v-model="phone" placeholder="手机号码"></x-input>
      </li>
      <li class="picker">
        <!-- <span>所在地区</span>
        <span>省份</span>
        <span>城市</span>
        <span>地区</span>
        <img src="../../assets/images/icon_wd_next.png" alt=""> -->
        <x-address :raw-value="true" value-text-align="left" title="" :value="addressValue" @on-shadow-change="addressChange"  @on-hide="addressChoose" :list="addressData"  placeholder="所在地区 省份 城市 地区"></x-address>
      </li>
      <li>
        <textarea v-model="addressDetail" :raw-value="true"  placeholder="详细地址：如街道、门牌号、楼栋号、单元室等" rows="10"></textarea>
      </li>
    </ul>
    <button class="save" @click="addAddress">保存</button>
  </div>
</template>

<style lang="less" scoped>
.save{
    border: none;
    width: 5rem;
    height: .9rem;
    background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
    border-radius:.45rem;
    box-shadow:.1rem 0 .2rem rgba(11,40,163,0.2);
    color: #fff;
    font-size: .32rem;
    margin-top: .6rem;
  }
.address-box{
  width: 6.9rem;
  height: 4.6rem;
  background: #fff;
  margin: 0 auto;
  padding: 0 .6rem;
  color: #999999;
  margin-top: .31rem;
  border-radius:.1rem;
  box-shadow:.02rem 0 .1rem rgba(105,114,227,0.08);
  .picker{
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1rem;
    padding: .2rem 0;
    width: 100%;
    border-bottom: .02rem solid #eee;
    color: #dadada;
    font-size: .3rem;
    span{
      &:not(:last-child){
        margin-right: .34rem;
      }
    }
    img{
      position: absolute;
      width: .2rem;
      right: 0;
      top: 50%;
      transform: translateY(-50%)
    }
  }
  textarea{
    width: 100%;
    height: 1.59rem;
    border: none;
    resize:none;
    outline:none;
    padding: .3rem 0;
    font-size: .3rem;
    color: #000;
    font-family:PingFang-SC-Regular;
  }
}
</style>
<style lang="less">
.address-box .weui-input{
  color:#000 !important;
}
.address-box .weui-cell{
    height: 1rem;
    border-bottom: .02rem solid #eee;
    padding-left:0;
}
.picker .weui-cell{
  width: 5.7rem;
  border-bottom: none;
  padding: 0;
  .vux-popup-picker-placeholder{
    color:inherit;
  }
}
.vux-popup-picker-value{
  color:#000 !important;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
<script>
import headerCommon from '../../components/commonHeader'
import { XAddress, XInput, ChinaAddressV4Data } from 'vux'
import { setTimeout } from 'timers'
export default {
  components: {
    XAddress,
    headerCommon,
    XInput
  },
  data () {
    return {
      name: '',
      phone: '',
      address: '',
      addressData: ChinaAddressV4Data,
      addressValue: [],
      addressDetail: '',
      titleFlag: false
    }
  },
  mounted () {
    this.titleFlag = this.$route.params.flag
    if (this.$route.params.flag !== '1' && this.$route.params.flag !== 1) {
      this.getUpdateAddressData()
    }
  },
  methods: {
    addressChange (arr, arrName) {
      this.address = arrName
    },
    addressChoose (flag) {
      if (!flag) {
        this.address = ''
      }
    },
    getUpdateAddressData (flag) {
      this.$get('/Partneraddress/get', {
        token: this.$cookies.get('token'),
        id: this.$route.query.id
      }).then(res => {
        this.name = res.data.userName
        this.phone = res.data.phone
        let arr = []
        arr[0] = res.data.provinceName
        arr[1] = res.data.cityName
        arr[2] = res.data.areaName
        this.addressValue = arr
        console.log(this.addressValue)
        this.addressDetail = res.data.address
      })
    },
    addAddress () {
      if (!this.name) {
        this.$vux.toast.text('姓名不能为空')
        return false
      } else if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$vux.toast.text('手机号码有误')
        return false
      } else if (!this.address) {
        this.$vux.toast.text('请选择地址')
        return false
      } else if (!this.addressDetail) {
        this.$vux.toast.text('请输入详细地址')
        return false
      } else {
        let url = ''
        if (this.$route.params.flag === '1') {
          url = '/Partneraddress/add'
        } else {
          url = '/Partneraddress/update'
        }
        this.$post(url, {}, {
          token: this.$cookies.get('token'),
          userName: this.name,
          phone: this.phone,
          province: this.address[0],
          city: this.address[1],
          area: this.address[2],
          address: this.addressDetail,
          id: this.$route.query.id,
          isDefault: '1'
        }).then(res => {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.back(-1)
          }, 500)
        })
      }
    }
  }
}
</script>
