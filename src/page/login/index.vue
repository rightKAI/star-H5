<template>
  <div>
    <div style="height:100vh;width:100%;background:#fff">
      <img class="logo" src="../../assets/images/LOGO02.png" alt="">
      <div class="form">
        <input placeholder="请输入手机号" v-model="phone" type="number">
        <div class="getCode">
          <input placeholder="请输入密码" v-model="code" type="password">
          <!-- <span :style="codeFlag?'color:grey;':''" @click="getCode">{{getCodeText}}</span> -->
        </div>
        <p style="text-align:right;color:#001a88;width:6rem;margin:0 auto;margin-top:.2rem;"><router-link style="color:#001a88" :to="{name:'forgetpsw'}">忘记密码</router-link></p>
      </div>
      <button class="btn {{}}" @click="login">登录</button>
      <p class="tip_login">此系统仅限内部使用</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.logo{
  width: 2.87rem;
  margin-top: .8rem;
  padding-bottom: .8rem;
}
.tip_login{
  font-size: .24rem;
  color: #bfbfbf;
  margin-top: .56rem;
}
.btn{
  width:6rem;
  height:.9rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:.45rem;
  box-shadow:.1rem 0 .2rem rgba(11,40,163,0.2);
  border: none;
  margin-top: .6rem;
  color: #ffffff;
}
.grenbtn{
  opacity: .5;
}
.getCode{
  position: relative;
  width:6rem;
  height:.9rem;
  margin: 0 auto;
  margin-top: .28rem;
  input{
    padding-right: 1.9rem;
  }
  span{
    position: absolute;
    font-size:.26rem;
    color: #001A88;
    line-height: .9rem;
    top: 0;
    right: .42rem;
  }
}
.form input {
  width:6rem;
  margin: 0 auto;
  height:.9rem;
  padding-left: .4rem;
  border:.01rem solid rgba(232,232,232,1);
  border-radius:.45rem;
}
::-webkit-input-placeholder{/*Webkit browsers*/
    color:#BFBFBF;
    font-size:16px;
  }
  :-moz-placeholder{/*Mozilla Firefox 4 to 8*/
    color:#BFBFBF;
    font-size:16px;
  }
  ::moz-placeholder{/*Mozilla Firefox 19+*/
    color:#BFBFBF;
    font-size:16px;
  }
  :-ms-input-placeholder{/*Internet Explorer 10+*/
      color:#BFBFBF;
      font-size:16px;
  }
</style>

<script>
import { setInterval, clearInterval, setTimeout } from 'timers'
export default {
  data () {
    return {
      phone: '',
      code: '',
      getCodeText: '获取验证码',
      codeFlag: false
    }
  },
  created () {
    if (this.$cookies.get('token')) {
      this.$router.push({
        name: 'home'
      })
    }
  },
  methods: {
    getCode () {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$vux.toast.text('手机号码有误')
      } else {
        if (!this.codeFlag) {
          this.codeFlag = true
          this.$post('/partner/getVerifyCode', {
            action: 'login',
            phone: this.phone
          }, {}, () => {
            this.codeFlag = false
          }).then(res => {
            // this.$vux.toast.text(res.data)
            if (res.code === '000000') {
              let time = 60
              let timer = setInterval(() => {
                time--
                this.getCodeText = `${time}后重新发送`
                if (time < 0) {
                  clearInterval(timer)
                  this.getCodeText = '获取验证码'
                  this.codeFlag = false
                }
              }, 1000)
            } else {
              this.codeFlag = false
            }
            // this.$vux.toast.text(res.msg)
          })
        }
      }
    },
    login () {
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$vux.toast.text('手机号码有误')
      } else {
        this.$post('/partner/loginByPwd', {
        }, {
          phone: this.phone,
          pwd: this.code
        }).then(res => {
          if (res.code === '000000') {
            this.$cookies.set('token', res.data.token, 60 * 60 * 24)
            setTimeout(() => {
              this.$router.push('/home')
            }, 500)
          }
          this.$vux.toast.text(res.msg)
        })
      }
    }
  }
}
</script>
