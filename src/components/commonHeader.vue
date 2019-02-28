<template>
  <div>
    <div class="headerCommon">
      <div class="backBtn" @click="backBtn">
        <img src="http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/icon_wdyj_01.png" alt="">
      </div>
      {{title}}
    </div>
    <div style="height:.88rem"></div>
  </div>
</template>

<style lang="less" scoped>
.headerCommon{
  display: block;
  width: 100%;
  height: .88rem;
  background: #fff;
  line-height: .88rem;
  color: #000;
  font-size: .36rem;
  z-index: 111;
  position: fixed;
  border-bottom: .01rem solid #dfe0e3;
  top: 0;
  .backBtn{
     width: 1rem;
     height: .88rem;
     position: absolute;
     top: 50%;
     transform: translateY(-50%);
     img {
      width: .20rem;
      position: absolute;
      left: .3rem;
      top: 50%;
      transform: translateY(-50%);
     }
  }
}
</style>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  methods: {
    backBtn () {
      this.$router.back(-1)
    }
  }
}
</script>
