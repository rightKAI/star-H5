<template>
<div>
  <!-- <header-common title="我的消息"></header-common> -->
  <div class='container'>
    <div class='content'>
      <div class='messageItem' v-for="(item, index) in messageList" :key="index">
        <div class='time'>
          {{item.create_time}}
        </div>
        <div class='messageDetail' >
          <div class='title'>{{item.subject}}</div>
          <div class='detail'>{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="less" scoped>
.content{
  width: 100%;
  height: 100%;
  padding-top: .3rem;
  padding-bottom: .3rem;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  background: #F6F8FE;
}
.messageItem{
  min-height: 3.2rem;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.messageItem:not(:first-child){
  margin-top: .50rem;
}
.messageDetail{
  width:74%;
  height:auto;
  background:rgba(255,255,255,1);
  padding: 0 .30rem;
  padding-bottom: .46rem;
  border-radius:.10rem;
  box-shadow:.02rem 0rem .10rem rgba(105,114,227,0.1);
  margin-top: .21rem;
}
.messageDetail .title{
  font-size:.30rem;
  color: #000;
  display: block;
  width: 100%;
  line-height: 1rem;
  box-sizing: border-box;
  border-bottom: .02rem solid #eee;
  text-align: left;
}
.messageDetail .detail{
  display: block;
  text-align: left;
  width: 100%;
  font-size:.28rem;
  overflow-wrap: break-word;
  color:rgba(153,153,153,1);
  line-height:.48rem;
  margin-top: .10rem;
  min-height: .76rem;
}
.time{
  width:2.80rem;
  height:.40rem;
  background:rgba(205,205,205,1);
  border-radius:.06rem;
  font-size:.24rem;
  color: #fff;
  text-align: center;
  line-height: .40rem;
  padding: 0 .18rem;
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
      messageList: []
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    getMessageList () {
      this.$get('/partner/getMessageList', {
        token: this.$cookies.get('token')
      }).then(res => {
        this.messageList = res.data
      })
    }
  }
}
</script>
