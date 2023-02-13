<template>
  <div>
    <van-empty description="暂未有订单信息！" v-if="!info.length"/>
        <div class="main">
          <div class="floor">
            <div class="product" v-for="(product,index) in info" :key="index">
              <div class="one" v-if="product.tor_state == 1">待发货</div>
              <div class="one" v-else-if="product.tor_state == 2">待收货</div>
              <div class="one" v-else-if="product.tor_state == 3">已完成</div>
              <div class="one" v-else-if="product.tor_state == 4">已取消</div>
              <div class="one" v-else-if="product.tor_state == 5">已评价</div>
              <div class="two">
                <div class="left">
                  <img :src="product.product.tpt_img" alt="">
                </div>
                <div class="right">
                  <div class="l">
                    <div class="top">
                      {{product.product.tpt_brand}}&nbsp;{{product.product.tpt_text}}
                    </div>
                    <div class="bottom">
                      <span v-for="(attribute,index) in product.attribute" :key="index">{{attribute}}</span>
                    </div>
                  </div>
                  <div class="r">
                    <div class="top">
                      ￥{{product.tor_price}}
                    </div>
                    <div class="bottom">
                      x{{product.tor_number}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="three" v-if="product.tor_state != 4 && product.tor_state != 5">
                <span v-if="product.tor_state == 1" @click="showPopup(product)">取消订单</span>
                <span v-if="product.tor_state == 2">申请退货</span>
                <span v-if="product.tor_state == 2" @click="showPopup(product)">确认收货</span>
                <span v-if="product.tor_state == 3" @click="goRate(product)">评价商品</span>
                <span v-if="product.tor_state == 6" @click="showPopup(product)">取消申请</span>
              </div>
            </div>
            <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" class="popup" closeable>
                <div class="button">
                  <div v-if="productInfo.tor_state == 1">&nbsp;&nbsp;&nbsp;&nbsp;确定取消订单了？</div>
                  <div v-else-if="productInfo.tor_state == 2">&nbsp;&nbsp;&nbsp;&nbsp;确定收到货了？</div>
                  <div v-else-if="productInfo.tor_state == 6">&nbsp;&nbsp;&nbsp;&nbsp;确定取消申请？</div>
                  <div class="img">
                    <!-- <img :src="productInfo.product.tpt_img" alt=""> -->
                  </div>
                  <button @click="submit()">确定</button>
                </div>
              </van-popup>
          </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'Product',
    props:['info'],
     data() {
      return {
        show: false,
        productInfo:{}
      };
  },
  methods: {
    // 模态框
    showPopup(product) {
      this.show = true;
      this.productInfo = product;
    },
    // 确定按钮
    async submit(){
      const id = this.productInfo.tor_id;
      let state = this.productInfo.tor_state;
      // 整理参数
      if(state == 1) {
        // 取消订单
        state = 4;
      }else if(state == 2) {
        // 确认收获
        state = 3
      }else if(state == 6){
        state = 2
      }
      
      // 发送请求
      const result = await this.$API.reqUpdateState(id,state)
      location.reload();
    },
    goRate(product){
      this.$router.push({
        path:'/rate',
        query:{
          id:product.product.tpt_id,
          img:product.product.tpt_img,
          orderId:product.tor_id,
        }
      })
    }
  },
}
</script>

<style lang="less">
  .van-overlay {
          background-color: rgba(0,0,0,0.3)!important;
        }
</style>

<style lang="less" scoped>
.main {
    margin-top: 4px;
    padding: 5px;
    padding-top: 6px;

    .floor {

      .product {
        background-color: #fff;
        margin-bottom: 5px;
        padding: 20px;
        padding-top: 0;
        border-bottom: 1px solid black;
        border-radius: 5px;
      
        .one {
          height: 25px;
          padding: 5px 0;
          line-height: 25px;
          font-size: 14px;
          // text-align: right;
          color: red;
          font-family: '黑体';
        }

        .two {
          height: 90px;
          display: flex;
          justify-content: space-between;

          .left {
            display: flex;
            height: 100%;
            width: 30%;
              img {
                height: 90px;
                width: 90px;
              }
          }

          .right {
            height: 100%;
            width: 70%;
            display: flex;
            
            .l {
              width: 75%;
              height: 100%;

              .top {
                height: 40px;
                font-size: 13px;
                font-family: "黑体";
                line-height: 18px;
                overflow:hidden;
                text-overflow: ellipsis;
                // white-space:nowrap;
              }

              .bottom {
                span {
                  display: inline-block;
                  font-size: 9px;
                  color: #422b2b;
                  margin-right: 3px;
                }
              }
            }

            .r {
              width: 25%;
              height: 100%;

              .top {
                height: 70%;
                line-height: 20px;
                font-size: 18px;
                color: red;
              }

              .bottom {
                height: 30%;
                text-align: center;
              }
            }
          }
        }

        .three {
          padding-top: 10px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: right;

          span {
            height: 35px;
            line-height: 35px;
            margin-left: 10px;
            padding: 0 10px;
            font-size: 13px;
            border: 1px solid black;
            border-radius: 5px;
          }
        }

        .popup {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .button {
          width: 100%;
            height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin: auto;

          .img {
            margin: 20px 0;
            margin-bottom: 30px;

            img {
              height: 100%;
              width: 100%;
            }
          }

          button {
            width: 90%;
            height: 18%;
            border: 0;
            border-radius: 15px;
            background-color: red;
            color: #fff;
            font-size: 17px;
          }
        }
  }
</style>