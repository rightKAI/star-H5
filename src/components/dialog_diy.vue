<template>
    <div>
      <div class="hint-shade">
        <div class="content">
          <img :src="icon" alt="">
          <div class="title">{{title}}</div>
          <div class="detail">{{detail}}</div>
          <button @click="closeShade">确定</button>
        </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
.hint-shade{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background:rgba(0,0,0,.7);
}
.content{
  height: 6rem;
  width: 5.6rem;
  background: #fff;
  border-radius:.10rem;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  padding: 0 1.3rem;
  .title{
    font-size:.36rem;
    color: #000;
    font-weight: bold;
    padding: .2rem 0;
  }
  .detail{
    font-size: .26rem;
  }
  img{
    width: 1.8rem;
    height: 1.8rem;
  }
  button{
    width:3rem;
    height:.7rem;
    background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
    border-radius:.35rem;
    color: #fff;
    box-shadow:.1rem 0 .2rem rgba(11,40,163,0.2);
    border: none;
    margin-top: .3rem;
  }
}
</style>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    detail: {
      type: String
    }
  },
  methods: {
    closeShade () {
      this.$emit('showCityName', true)
    }
  }
}
</script>
