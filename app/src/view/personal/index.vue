<template>
  <div class="w">
    <!-- 头部 -->
    <div class="header">
      <div class="user">
        <div class="img">
          <img :src="userInfo.tur_img">
        </div>
        <div class="info">
          <div class="name">{{userInfo.tur_name}}</div>
          <div class="account">账号：{{userInfo.tur_account}}</div>
        </div>
        <!-- 工具栏 -->
        <div class="toolbar" @click="$router.push('/accountset')">
          <van-icon name="setting-o" />
          <div>设置</div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="top">
        <div class="collect" @click="$router.push('/collect')">
          <van-icon name="star-o" />商品收藏
        </div>
      </div>
      <div class="floor">
        <div class="no" @click="goOrder(1)">
          <van-icon name="tosend" />
          <span>待发货</span>
        </div>
        <div class="send" @click="goOrder(2)">
          <van-icon name="send-gift-o"/>
          <span>待收货</span>
        </div>
        <div class="rate" @click="$router.push('/orderrate')">
          <van-icon name="chat-o" />
          <span>待评价</span>
        </div>
        <div @click="$router.push('/sales')">
          <van-icon name="after-sale" />
          <span>退款</span>
        </div>
        <div class="orderInfo" @click="goOrder(0)">
          <van-icon name="orders-o" />
          <span>我的订单</span>
        </div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <Recommend />
  </div>
</template>

<script>
export default {
    name:'Personal',
    data(){
      return {
        userInfo:{}
      }
    },
    methods:{
      // 初始化
      async getData(){
        const result = await this.$API.reqUserInfo();
        if(result.code == 200) {
          this.userInfo = result.data
        }
      },
      // 订单跳转
      goOrder(n){
        this.$router.push({
          path:'/order',
          query:{
            active: n
          }
        })
      }
    },
    mounted(){
      this.getData()
    }
}
</script>

<style lang="less" scoped>
 .w {
  background-color: #f1e5e5;

  .header {
    .user {
      padding-top: 20px;
      display: flex;
      align-items: center;
      height: 70px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;

      .img {
        width: 60px;
        height: 60px;
        margin-left: 10px;

        img {
          width: 60px;
          height: 60px;
          border-radius: 30px;
        }
      }

      .info {
        padding-left: 10px;
        width: 180px;
        overflow: hidden;

        .name {
          height: 30px;
          font-weight: 600;
        }

        .account {
          font-size: 12px;
        }
      }

      // 设置按钮
      .toolbar {
        position: absolute;
        right: 10px;
        top: 8px;
        height: 70px;
        font-size: 22px;

        div {
          font-size: 11px;
        }
      }
    }
  }

  .order {
    margin: 0 10px;
    margin-top: 30px;
    margin-bottom: 40px;
    background-color: #e6e6e6;
    border-radius: 10px;
    border: 1px solid #e6e6e6;

    >div {
      display: flex;
    }

    .top {
      padding: 5px 10px;
    }

    .collect {
      font-size: 11px;
    }

    .floor {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 15px;

      >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 60px;
        font-size: 25px;

        span {
          font-size: 12px;
        }
      }
    }
  }

  .love {
  margin-bottom: 50px;
  padding: 0 10px;
  background-color: #f1e5e5;

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
 }
</style>