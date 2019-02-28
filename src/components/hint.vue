<template>
    <div>
      <div class="hint-shade">
        <div class="content">
          <div class="title">
            {{title}}
          </div>
          <ul class="detail">
            <li v-for="(item, index) in detail" :key="index">
              <span>{{index+1}}、</span>
              <div>{{item}}</div>
            </li>
          </ul>
        </div>
        <img class="close" @click="closeShade" src="../assets/images/icon_close.png" alt="">
      </div>
    </div>
</template>

<style lang="less" scoped>
.content{
  position: absolute;
  width: 86%;
  height: 5.6rem;
  border-radius:.1rem;
  background: #fff;
  top: 2.65rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 .3rem;
  .title{
    font-size: .36rem;
    color: #000;
    margin-top: .4rem;
  }
  .detail{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: .2rem;
    font-size: .26rem;
    color: #000;
    li{
      display: flex;
      justify-content: space-between;
      line-height: .5rem;
      text-align: left;
    }
  }
}
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
.close{
  width: .6rem;
  height: .6rem;
  position: absolute;
  top: 8.86rem;
  left: 50%;
  transform: translateX(-50%)
}
</style>

<script>
export default {
  props: {
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
