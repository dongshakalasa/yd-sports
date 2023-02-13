<template>
  <van-row>
    <div style="height: 20px" v-if="init.announcement != undefined"><van-notice-bar scrollable :text="init.announcement.at_text" background="#fff" /></div>
    <van-popup v-model="show" position="left" :style="{ height: '100%' , width: '30%'}"/>
    <!-- 头部 -->
    <van-row class="guding">
      <div class="header">
        <div class="search">
          <van-icon name="bars" size="1.8rem" />
        </div>
        <van-search v-model="keyword" shape="round" placeholder="请输入搜索关键词" @blur="goSearch" />
        <div class="login" @click="$router.push('/login')" v-show="!cut">
          登录
        </div>
        <div class="login" v-show="cut" style="font-size: 20px;">
          <van-icon name="manager" @click="$router.push('/personal')"/>
        </div>
      </div>
    </van-row>
    <van-tabs>
      <!-- 推荐 -->
      <van-tab title="推荐">
          <!-- 轮播 -->
          <div class="my-swipe">
            <Carousel :list="init.rollList" />
          </div>
          <!-- 推荐 -->
          <van-row>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
              推荐产品
            </van-divider>
            <div class="product">
              <van-swipe :loop="false" :width="120">
                <van-swipe-item v-for="product in init.productRate" :key="product.tpt_id" @click="goDetail(product.tpt_id)">
                    <div class="img" >
                      <img style="width:100px;height:100px;margin: 0 auto;" :src="product.tpt_img">
                      <div class="price"><span>￥</span>{{product.tpt_price}}</div>
                    </div>
                </van-swipe-item>
              </van-swipe>
            </div>
          </van-row>
          <!-- 热门 -->
          <van-row>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
              热门产品
            </van-divider>
            <div class="product">
              <van-swipe :loop="false" :width="120">
                <van-swipe-item v-for="product in init.productSales" :key="product.tpt_id" @click="goDetail(product.tpt_id)">
                    <div class="img" >
                      <img style="width:100px;height:100px;margin: 0 auto;" :src="product.tpt_img">
                      <div class="price"><span>￥</span>{{product.tpt_price}}</div>
                    </div>
                </van-swipe-item>
              </van-swipe>
            </div>
          </van-row>
      </van-tab>
      <van-tab :title="category.tcy_name" v-for="category in init.categorys" :key="category.tcy_id">
        <Sort :category="category"></Sort>
      </van-tab>
    </van-tabs>
  </van-row>
</template>

<script>
import Sort from './Sort'
import {Toast} from 'vant'
import {removeToken} from '@/utils/token'
export default {
  name: "Home",
  components:{Sort},
  data() {
    return {
      keyword: "",
      count: 0,
      init:{},
      cut: false,
      show:false
    };
  },
  methods: {
    // 初始化
    async getData(){
      let result = await this.$API.reqGetInfo();
      if(result.code == 200) {
        this.init = result.data
      }
    },
    // 跳转search
    goSearch(){
      let keyword = this.keyword.trim();
      if(keyword == ''){
        Toast({message: '搜索信息不能空', position: 'top'});
      }else {
          let location = {
              name: "search",
              params: { keyword: keyword || undefined },
          };
          this.$router.push(location);
      }
    },
    // 自动登录
    async goAuthLogin(){
        const result = await this.$API.reqUserAuthLogin();
        if(result.code == 200) {
            this.cut = true;
        }else {
            Toast.fail("登录超时！")
            removeToken();
            this.$router.push('/login')
        }
    },
    // 商品详情
    goDetail(id){
      this.$router.push({
        name:'detail',
        params:{
          id: id
        }
      })
    }
  },
  mounted(){
    this.getData();
    this.goAuthLogin()
  }
};
</script>


<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-notice-bar {
  height: 20px!important;
  padding: 0;
}

.my-swipe {
  height: 160px;
  margin: 6px;
}

.header {
  display: flex;
  height: 50px;
  line-height: 50px;

  .search {
    width: 11%;
    padding-left: 2%;
    padding-top: 1%;
    height: 99%;

    .van-icon {
      van-icon-bars {
        display: inline-block;
        margin-left: 15px;
      }
    }
  }

  .van-search {
    padding: 10px 0;
    width: 72%;
  }

  .login {
    width: 15%;
    height: 100%;
    text-align: center;
  }
}

.product {
  padding: 0 7px;
  display: flex;
  
  .img {
      display: flex;
      justify-content: center;
      border-radius: 30px;
      position: relative;

      .price {
        position: absolute;
        top: 83px;
        left: 10px;
        background-color: red;
        color: #fff;
        border-radius: 5px;
        padding: 0 3px;
        font-size: 13px;
      }
    }
}
</style>