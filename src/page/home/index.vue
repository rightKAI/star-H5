<template>
    <div class="home">
      <!-- <swiper :auto="true" :loop="true" :aspect-ratio="900/750" :list="swiperData"></swiper> -->
      <swiper :show-dots="swiperData.length > 1" :aspect-ratio="900/750" :auto="true" :loop="true" dots-position="center">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in swiperData" :key="index">
        <img @click="goTo(item.link)" style='width:100%;' :src="item.imgurl">
      </swiper-item>
      </swiper>
      <div class="blank"></div>
      <div class="banner">
        <img @click="goTo(bannerData.link)" :src="bannerData.imgurl" alt="">
      </div>
      <bottomTab :tabFlag="true"></bottomTab>
    </div>
</template>

<style lang="less">
.home>.vux-slider > .vux-indicator > a > .vux-icon-dot.active, .vux-slider .vux-indicator-right > a > .vux-icon-dot.active{
  background: rgba(255, 255, 255, .3) !important;
}
</style>

<style lang="less" scoped>

.blank{
  height: .3rem;
  background: #fff;
  width: 100%;
}
.banner{
  width: 100%;
  height: 4.5rem;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>

<script>
import { Swiper, SwiperItem } from 'vux'
import bottomTab from '../../components/bottomTab'
export default {
  components: {
    Swiper,
    bottomTab,
    SwiperItem
  },
  data () {
    return {
      swiperData: [
        {
          img: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/banner1.jpg'
        },
        {
          img: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/banner1.jpg'
        },
        {
          img: 'http://img-dmallovo.oss-cn-shenzhen.aliyuncs.com/diamondStar_H5/banner1.jpg'
        }
      ],
      bannerData: []
    }
  },
  mounted () {
    this.getHomeData()
  },
  methods: {
    getHomeData () {
      this.$get('/mllad/list', {
        pageCode: 'yx_partner_index'
      }).then((res) => {
        console.log(res.data[1])
        this.swiperData = res.data[0].contentList
        this.bannerData = res.data[1].contentList[0]
      })
    },
    goTo (link) {
      if (link) {
        window.location.href = link
      }
    }
  }
}
</script>
