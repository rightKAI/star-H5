
<template>
  <div style="background:#fff;height:100vh">
    <header-common :title="!isSet?'设置密码':'忘记密码'"></header-common>
    <div v-if='isSet'>
      <div class='form-box'>
        <input v-model='phoneNumber' class='code' maxlength="11" placeholder='请输入手机号' type='text'>
        <div class='getPhone'>
          <input type='text' v-model='codeNumber' maxlength='4' placeholder='请输入验证码'>
          <button @click='getCode()' :class='{active:codeBtnStatus}'>{{codeBtnText || '获取验证码'}}</button>
        </div>
      </div>
      <button @click='login()' :class='{login:true,active:loginBtnStatus}'>登录</button>
    </div>
    <div class='setBox' v-else>
      <p>* 为了您的账号安全，请重新设置密码</p>
      <input v-model='firstWord' minlength='6' maxlength='10' class='code' placeholder='请输入6-10位的密码' type='password'>
      <input v-model='scondWord' minlength='6' maxlength='10' class='code' placeholder='重新输入' type='password'>
      <p>请输入6-10位的字母或数字</p>
      <button @click='updateWord()' class='login active'>确定</button>
    </div>
  </div>
</template>

<style lang='less' scoped>
.setBox{
  width: 5.9rem;
  margin: 0 auto;
  p{
    font-size:.24rem;
    font-family:MicrosoftYaHei;
    font-weight:400;
    text-align: left;
    color:#001A88
  }
  input{
    margin-top: .3rem;
  }
}
.topImg {
  width: 100%;
  height: 4.29rem;
}
p {
  font-size: 0.24rem;
  margin-top: 0.29rem;
  font-family: MicrosoftYaHei;
  color: rgba(153, 153, 153, 1);
  text-align: center;
}
.login {
  width: 5.9rem;
  height: 0.9rem;
  border-radius: 0.1rem;
  background: #ddd;
  color: #fff;
  border: none;
  display: block;
  margin: 0 auto;
  margin-top: 0.8rem;
  font-size: 0.32rem;
}
.active {
  background: #001a88 !important;
}
.form-box {
  width: 100%;
  padding: 0 0.8rem;
  margin-top: 0.8rem;
}
.code {
  width: 100%;
  border: none;
  border-bottom: 0.01rem solid #bdbdbd;
  height: 0.7rem;
  font-size: 0.32rem;
}
.getPhone {
  width: 100%;
  margin-top: 0.5rem;
  height: 0.7rem;
  display: flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  input {
    width: 3.5rem;
    border: none;
    border-bottom: 0.01rem solid #bdbdbd;
    height: 0.7rem;
    font-size: 0.32rem;
  }
  button {
    border-radius: 0.04rem;
    width: 2rem;
    height: 0.7rem;
    color: #fff;
    font-size: 0.26rem;
    margin-left: 0.4rem;
    background: #ddd;
    border: none;
  }
}
</style>

<script>
import headerCommon from '../../components/commonHeader'
import { setTimeout } from 'timers'
export default {
  components: {
    headerCommon
  },
  data () {
    return {
      loginBtnStatus: false,
      firstWord: '',
      scondWord: '',
      isSet: true,
      codeBtnStatus: false,
      phoneNumber: '',
      codeBtnText: '',
      codeNumber: '',
      phoneNumberSub: ''
    }
  },
  methods: {
    updateWord () {
      if (!this.firstWord || !this.scondWord) {
        this.$vux.toast.text('密码不能为空')
      } else if (this.firstWord.length < 6) {
        this.$vux.toast.text('密码长度最少应为6位')
      } else if (!/^[0-9a-zA-Z]+$/.test(this.firstWord)) {
        this.$vux.toast.text('密码长度应为6-10位数字或字母组成')
      } else if (this.firstWord !== this.scondWord) {
        this.$vux.toast.text('两次输入的密码不一致')
      } else {
        this.$post('/partner/changePwd', {phone: this.phoneNumberSub, newPwd: this.scondWord
        }, {
          phone: this.phoneNumberSub,
          newPwd: this.scondWord
        }).then(res => {
          console.log(res)
          if (res.code === '000000') {
            this.$vux.toast.text('修改成功')
            setTimeout(() => {
              this.$router.push({
                name: 'login'
              })
            }, 500)
          } else {
            this.$vux.toast.text(res.msg)
          }
        })
      }
    },
    getCode () {
      if (this.codeBtnStatus) {
        if (!/^1[3|4|5|6|8|7][0-9]\d{4,8}$/.test(this.phoneNumber)) {
          this.$vux.toast.text('请输入正确的手机号码')
          return false
        } else {
          this.$post('partner/getVerifyCode', {
            action: 'login',
            phone: this.phoneNumber
          })
            .then(res => {
              console.log(res)
              if (res.code === '000000') {
                this.$vux.toast.text(res.msg)
                this.codeBtnStatus = false
                let time = 60
                let timer = setInterval(() => {
                  this.codeBtnText = `${time}s`
                  time--
                  if (time < 0) {
                    clearInterval(timer)
                    this.codeBtnText = ''
                    this.codeBtnStatus = true
                  }
                }, 1000)
              } else {
                this.$vux.toast.text(res.msg)
              }
            })
        }
      }
    },
    login () {
      if (this.loginBtnStatus) {
        if (!/^1[3|4|5|6|8|7][0-9]\d{4,8}$/.test(this.phoneNumber)) {
          this.$vux.toast.text('请输入正确的手机号码')
          return false
        } else {
          this.$post('/partner/checkVerifyCode', {},
            {
              phone: this.phoneNumber,
              verifyCode: this.codeNumber
            }
          )
            .then(res => {
              if (res.code === '000000') {
                this.$vux.toast.text('验证通过')
                this.phoneNumberSub = this.phoneNumber
                this.isSet = false
              } else {
                this.$vux.toast.text(res.msg)
              }
            })
        }
      }
    }
  },
  watch: {
    phoneNumber (val) {
      if (val.length === 11) {
        this.codeBtnStatus = true
        if (this.codeNumber.length === 4) {
          this.loginBtnStatus = TextTrackCueList
        }
      } else {
        this.codeBtnStatus = false
        this.loginBtnStatus = false
      }
    },
    codeNumber (val) {
      if (val.length === 4 && this.phoneNumber.length === 11) {
        this.loginBtnStatus = true
      } else {
        this.loginBtnStatus = false
      }
    },
    scondWord (val) {
      if (!/^[0-9a-zA-Z]+$/.test(val)) {
        if (val.length > 6) {
          this.$vux.toast.text('请勿输入非法字符')
        }
      }
    }
  }
}
</script>
