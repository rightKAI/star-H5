<template>
    <div>
        <div class="bottom-tab">
            <router-link class="item" to="/home">
                <div class="flex-item">
                    <img :src="tabFlag ? homeImg[0] : homeImg[1]" alt="">
                    <span :style="tabFlag? 'color:rgba(0,26,136,1)' : ''">首页</span>
                </div>
            </router-link>
            <div class="line"></div>
            <router-link class="item" to="/mine">
                <div class="flex-item">
                    <img :src="!tabFlag ? starImg[0] : starImg[1]" alt="">
                    <span :style="!tabFlag? 'color:rgba(0,26,136,1)' : ''">我的</span>
                </div>
            </router-link>
        </div>
        <div style="height:.98rem">
        </div>
    </div>
</template>

<style lang="less" scoped>
.flex-item{
    display: flex;
    align-items: center;
    width: .45rem;
    flex-wrap: wrap;
}
.bottom-tab{
    position: fixed;
    background: #fff;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .98rem;
    .line{
        width: .015rem;
        height: .68rem;
        background: #e8e8e8;
    }
    &>.item{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items:center;
        img {
            width: .42rem;
        }
        width: 50%;
        font-size:.2rem;
        color: rgba(188,190,192,1);
    }
}
</style>

<script>
export default {
  props: {
    tabFlag: {
      type: Boolean
    }
  },
  data () {
    return {
      homeImg: ['http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/home_blue.png', 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/home_grey.png'],
      starImg: ['http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/mine_blue.png', 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/mine_grey.png']
    }
  }
}
</script>
