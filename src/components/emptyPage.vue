<template>
    <div class="content">
      <img class="img" :src="imgURLStr" alt="">
      <h2>{{title}}</h2>
      <p>{{detail || '不推广，怎么会有业绩呢？'}}</p>
      <button class="common_btn">
        <router-link style="color:#fff" :to="toUrl">
          {{btnText || '立即推广'}}
        </router-link>
      </button>
    </div>
</template>

<style lang="less" scoped>
.content{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #fff;
}
.img{
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 1.88rem;
}
.common_btn{
  display: block;
  width:3rem;
  height:.7rem;
  background:linear-gradient(-60deg,rgba(11,40,163,1) 0%,rgba(0,26,136,1) 100%);
  border-radius:.35rem;
  box-shadow:.1rem 0px .2rem rgba(11,40,163,0.2);
  text-align: center;
  color: #ffffff;
  line-height: .7rem;
  border: none;
  margin: 0 auto;
  margin-top: .62rem;
}
h2{
  font-size:.46rem;
  font-weight: 600;
  text-align: center;
  margin-top: .3rem;
  font-family:PingFang-SC-Bold;
  color:rgba(191,191,191,1);
}
p{
  margin-top: .25rem;
  font-size:.3rem;
  font-family:PingFang-SC-Regular;
  font-weight:400;
  color:rgba(191,191,191,1);
}
</style>

<script>
export default {
  props: {
    imgURLStr: {
      type: String
    },
    toUrl: {
      type: String
    },
    title: {
      type: String
    },
    detail: {
      type: String
    },
    btnText: {
      type: String
    },
    btnUrl: {
      type: String
    }
  },
  data () {
    return {
    }
  }
}
</script>
