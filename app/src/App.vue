<template>
  <div id="app">
    <router-view></router-view>
    <!-- Tabber -->
    <van-tabbar route v-show="$route.meta.show">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/personal"  icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.van-swipe__indicators{
  display: none!important;
}

.app {
  width: 100%;
  height: 667px;
}
</style>

