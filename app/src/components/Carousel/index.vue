<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img,index) in list" :key="index">
        <img :src="img" />
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 立即监听
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            speed : 1000, //速度

            autoplay : true, //自动切换
            autoplay : {
                delay : 1000, //自动切换的时间间隔，单位ms
                disableOnInteraction : false //用户操作swiper之后，是否禁止autoplay
            },

          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;

  img {
    width: 100%!important;
    height: 100%!important;
  }
}
</style>>