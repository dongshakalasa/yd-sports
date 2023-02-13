<template>
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="search">
        <van-icon name="arrow-left" @click="onClickLeft"/>
      </div>
      <van-search shape="round" placeholder="请输入搜索关键词" v-model="search.keyword" @blur="$router.push('/search')" />
      <div class="login">
        <van-icon name="weapp-nav"/>
      </div>
    </div>
    <div class="content">
      <div class="screen">
        <div class="sort">
          <div @click="search.order = 1;getData()" :class="{cut:search.order == 1}">销量</div>
          <div @click="cut" :class="{cut:search.order == 2 || search.order == 3}">
            价格
            <van-icon name="arrow-up" v-show="search.order == 2" />
            <van-icon name="arrow-down" v-show="search.order == 3" />
          </div>
        </div>
      </div>
    </div>
    <div class="love">
      <!-- 商品 -->
      <div class="product">
        <van-grid :gutter="1" column-num="2">
          <van-grid-item v-for="product in productList" :key="product.tpt_id">
            <div class="goods" @click="goDetail(product.tpt_id)">
              <div class="img">
                <img :src="product.tpt_img">
              </div>
              <div class="title">{{product.tpt_brand}}&nbsp;{{product.tpt_text}}</div>
              <div class="price"><span>￥</span>{{product.tpt_price}}</div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Search',
    data(){
      return {
        search:{
          // 关键字
          keyword:'',
          // 分类
          sort:'',
          // 品牌
          brand:'',
          // 大类
          category:'',
          // 排序方式
          order:0
        },
        productList:[]
      }
    },
    methods: {
        //后退按钮 
        onClickLeft(){
            history.back()
        },
        // 初始化
        async getData(){
          const result = await this.$API.reqSearch(this.search)
          if(result.code == 200) {
            this.productList = result.data
          }
        },
        // 排序方式切换
        cut(){
          let cut = this.search.order;
          if(cut == 0 || cut == 1) {
            this.search.order = 2
          }else if(cut == 3) {
            this.search.order = 2
          }else {
            this.search.order = 3
          }
          this.getData()
        },
        // 跳转商品详情
        goDetail(id){
          console.log(id);
          this.$router.push({
            name:'detail',
            params:{
              id:id
            }
          })
        }
    },
    beforeMount() {
      Object.assign(this.search, this.$route.query, this.$route.params);
    },
    mounted() {
      this.getData();
    },
}
</script>

<style lang="less" scoped>

.cut {
  color: red;
}
.search {

  .header {
    display: flex;
    height: 50px;
    line-height: 50px;
    background-color: #fff;

    .search {
      width: 10%;
      padding-left: 3%;
      height: 100%;
      font-size: 20px;
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

  .content {
    background-color: #e6e6e6;
    padding-top: 10px;
    .screen {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 12px;
    border: 1px solid #e6e6e6;

    .sort {
      display: flex;
      padding: 0 15px;

      >div {
        padding-right: 20px;
      }
      
    }

    .sortAll {
      line-height: 40px;
      padding-right: 10px;
    }
  }
  }

  .love {
  margin-bottom: 50px;


  .product {
    display: flex;
    flex-wrap:wrap;

    .goods {
      width: 160px;
      height: 230px;
      margin-left: 10;
      border-radius: 10px;

      .img {
        width: 160px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 150px;
          height: 150px;
        }
      }

      .title {
        padding: 0 5px;
        padding-top: 5px;
        width: 150px;
        height: 35px;
        font-size: 11px;
        overflow: hidden;
      }

      .price {
        padding-left: 40px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        color: red;
        font-weight: 600;

        span {
          font-size: 13px;
        }
      }
    }
  }
  }
}
</style>