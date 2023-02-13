<template>
  <div class="div">
    <div class="sort">
      <!-- 子类 -->
      <div class="attribute">
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="sort in category.sort" :key="sort.tst_id">
            <img style="width:50px;height:50px" :src="sort.tst_img" @click="goSearch(sort.tst_name)">
            <div class="name">{{sort.tst_name}}</div>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 品牌精选 -->
      <div class="brand">
        <h5>精选品牌</h5>
        <van-grid :border="false">
          <van-grid-item v-for="brand in category.brand" :key="brand.tbd_id" >
            <img style="width:50px;height:45px" :src="brand.tbd_img" alt="" @click="goSearch(brand.tbd_name,brand.cy_name)">
            <div class="name">{{brand.tbd_name}}</div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="goods">
        <h5>热卖产品</h5>
        <van-swipe :loop="false" :width="110">
          <van-swipe-item v-for="product in category.produceSales" :key="product.tpt_id" @click="goDetail(product.tpt_id)">
              <div class="img" >
                <van-icon name="fire" color="#ee0a24" class="tag">近期热卖</van-icon>
                <img style="width:100px;height:100px;margin: 0 auto;" :src="product.tpt_img">
              </div>
              <div class="price"><span>￥</span>{{product.tpt_price}}</div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="love">
      <!-- 标题 -->
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        <van-icon name="like" />&nbsp;猜你喜欢
      </van-divider>
      <!-- 商品 -->
      <div class="product">
        <van-grid :gutter="1" column-num="2">
          <van-grid-item v-for="product in category.produceRate" :key="product.tpt_id" @click="goDetail(product.tpt_id)">
            <div class="goods">
              <div class="img">
                <img :src="product.tpt_img">
              </div>
              <div class="title">{{product.tpt_brand}}{{product.tpt_text}}</div>
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
    name:'Sort',
    props:["category"],
    methods: {
      goSearch(a,b){
        let location = {name:'search'}
        if(b) {
          location.query = {category:b,brand:a}
        }else {   
            location.query = {sort:a}
        }
        this.$router.push(location);
      },
      goDetail(id){
        this.$router.push({
          name:'detail',
          params: {
            id:id
          }
        })
      }
    }
}
</script>

<style>
  .van-swipe__indicators {
  display: none;
}
</style>

<style lang="less" scoped>
.sort {
  padding: 7px 10px;
  background-color: #e6e6e6;

  h5 {
    margin: 0;
    margin-bottom: 10px;
  }

  .attribute {
    margin-top: 7px;
    border-radius: 13px;
    padding: 10px;
    background-color: #ffffff;

    .name {
      font-size: 12px;
    }
  }

  .brand {
    border-radius: 15px;
    padding: 10px;
    background-color: #ffffff;
    margin-top: 15px;

    .name {
      font-size: 10px;
      color: #918d8d;
    }
  }

  .goods {
    border-radius: 15px;
    padding: 10px;
    background-color: #ffffff;
    margin-top: 15px;

    .tag {
      position:absolute;
      right: 0;
      top: 0;
      font-size: 5px;
      border-radius: 10px;
      border-bottom-right-radius: 0px;
      padding: 2px 5px;
      padding-right: 3px;
      color: rgb(139, 9, 9);
      background-color: blanchedalmond;
    }

    .img {
      display: flex;
      justify-content: center;
      border-radius: 30px;
      position: relative;
    }

    .price {
      padding-right: 5px;
      margin-top: 10px;
      text-align: center;
      color: red;
      font-weight: 700;
      font-size: 15px;

      span {
        font-size: 3px;
      }
    }
  }
}

.love {
  margin-bottom: 50px;
  padding: 0 10px;
  background-color: #e6e6e6;

  .van-divider  {
    margin: 0;
    padding-top: 20px;
  }

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
</style>