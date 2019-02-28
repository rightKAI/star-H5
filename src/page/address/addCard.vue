<template>
  <div>
    <!-- <header-common :title='flag? "删除银行卡" : "添加银行卡"'></header-common> -->
    <ul class='address-box'>
      <li>
        <x-input title='持卡人' disabled :show-clear='true' v-model='name' placeholder=''></x-input>
      </li>
      <li>
        <x-input title='卡号' :disabled='flag' :min='12' :max='25' type='number' :show-clear='true' v-model='bankCard' placeholder='输入银行卡号'></x-input>
      </li>
      <li>
        <x-input title='所属银行' :disabled='flag' v-model='bankName' :show-clear='true' placeholder='输入您的开户银行全称'></x-input>
      </li>
      <li>
        <x-input title='开户银行' :disabled='flag' v-model='branchBankName' :show-clear='true' placeholder='输入您的开户银行全称'></x-input>
      </li>
    </ul>
    <button class='save' @click='addCard'>{{flag? '确认删除' : '确认添加'}}</button>
  </div>
</template>

<style lang='less' scoped>
.save {
  border: none;
  width: 5rem;
  height: 0.9rem;
  background: linear-gradient(
    -60deg,
    rgba(11, 40, 163, 1) 0%,
    rgba(0, 26, 136, 1) 100%
  );
  border-radius: 0.45rem;
  box-shadow: 0.1rem 0 0.2rem rgba(11, 40, 163, 0.2);
  color: #fff;
  font-size: 0.32rem;
  margin-top: 0.6rem;
}
.address-box {
  width: 6.9rem;
  height: 4.6rem;
  background: #fff;
  margin: 0 auto;
  padding: 0 0.6rem;
  color: #999999;
  margin-top: 0.31rem;
  border-radius: 0.1rem;
  box-shadow: 0.02rem 0 0.1rem rgba(105, 114, 227, 0.08);
  .picker {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 1rem;
    padding: 0.2rem 0;
    width: 100%;
    border-bottom: 0.02rem solid #eee;
    color: #dadada;
    font-size: 0.3rem;
    span {
      &:not(:last-child) {
        margin-right: 0.34rem;
      }
    }
    img {
      position: absolute;
      width: 0.2rem;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  textarea {
    width: 100%;
    height: 1.59rem;
    border: none;
    resize: none;
    outline: none;
    padding: 0.3rem 0;
    font-size: 0.3rem;
    color: #000;
    font-family: PingFang-SC-Regular;
  }
}
</style>
<style lang='less'>
.address-box .weui-input {
  color: #000 !important;
}
.address-box .weui-cell {
  height: 1rem;
  border-bottom: 0.02rem solid #eee;
  padding-left: 0;
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
      bankCard: '',
      bankName: '',
      branchBankName: '',
      flag: false,
      cardInfo: {},
      addressData: ChinaAddressV4Data
    }
  },
  mounted () {
    this.getName()
    if (this.$route.query.id) {
      this.deleteCard()
      this.flag = true
    }
  },
  methods: {
    addCard () {
      if (!this.flag) {
        if (!this.bankCard) {
          this.$vux.toast.text('请输入卡号')
          return false
        } else if (!this.bankName) {
          this.$vux.toast.text('请输入所属银行')
          return false
        } else if (!this.bankName) {
          this.$vux.toast.text('请输入开户银行')
          return false
        } else if (this.bankCard.length > 25 || this.bankCard.length < 12) {
          return false
        }
        let data = {
          token: this.$cookies.get('token'),
          bankCard: this.bankCard,
          bankName: this.bankName,
          branchBankName: this.branchBankName
        }
        this.$post('/bankcard/add', {}, data).then(res => {
          this.$vux.toast.text(res.msg)
          setTimeout(() => {
            this.$router.back(-1)
          }, 500)
        })
      } else {
        this.$post('/bankcard/delete', {}, {
          token: this.$cookies.get('token'),
          id: this.$route.query.id
        }).then(res => {
          this.$vux.toast.text('删除银行卡成功')
          setTimeout(() => {
            this.$router.back(-1)
          }, 500)
        })
      }
    },
    getName () {
      this.$post(
        '/bankcard/returnInfo',
        {},
        {
          token: this.$cookies.get('token')
        }
      ).then(res => {
        this.name = res.data.userName
      })
    },
    deleteCard () {
      let data = {
        token: this.$cookies.get('token'),
        id: this.$route.query.id
      }
      this.$post('/bankcard/deleteInfo', {}, data).then(res => {
        this.bankCard = res.data.bankCard
        this.bankName = res.data.bankName
        this.branchBankName = res.data.branchBankName
      })
    }
  }
}
</script>
