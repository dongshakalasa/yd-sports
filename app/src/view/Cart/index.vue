<template>
  <div class="cart">
    <!-- 头部 -->
    <div class="header">
      <div class="title">购物车</div>
      <div class="address"></div>
      <div class="editor" v-show="edit" @click="edit = false">完成</div>
      <div class="editor" v-show="!edit" @click="edit = true">编辑</div>
    </div>
    <!-- 切换 -->
    <div class="tool" v-show="cartInfo.length > 0">
      <div class="num">全部&nbsp;{{cartInfo.length}}</div>
      <div class="screen"></div>
    </div>

    <!-- 空状态 -->
    <van-empty description="购物车为空" v-show="cartInfo.length == 0" />

    <!-- 主体 -->
    <div class="content">
      <!-- 产品 -->
      <div class="product" v-for="product in cartInfo" :key="product.tcr_id">
        <!-- 复选 -->
        <div class="checked">
          <van-checkbox v-model="product.tcr_state" checked-color="#ee0a24" @click="updateChecked(product.tcr_id, product.tcr_state)"/>
        </div>
        <!-- 商品信息 -->
        <div class="info">
          <div class="img">
            <img :src="product.product.tpt_img">
          </div>
          <div class="introduce">
            <div class="title">{{product.product.tpt_brand}}{{product.product.tpt_text}}</div>
            <div class="attribute">
              <div class="value" v-for="(name,index) in product.attribute" :key="index">{{name}}</div>
            </div>
            <div class="floor">
              <div class="price"><span>￥</span>{{product.product.tpt_price}}</div>
              <div class="number">
                <span class="jian" @click="handler('minus', -1, product)">-</span>
                <input type="text" :value="product.tcr_number" @change="handler('change', $event.target.value * 1, product)">
                <span class="jia" @click="handler('add', 1, product)">+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Recommend />

    <!-- 编辑 -->
    <div class="edit" v-show="edit">
      <div class="checked">
        <van-checkbox :value="isAllCheck" checked-color="#ee0a24" @click="allCheck(isAllCheck)">全选</van-checkbox>
      </div>
      <div class="button">
        <button @click="deleteAll">删除</button>
      </div>
    </div>
    <div class="pay" v-show="!edit">
      <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="toPay">
        <van-checkbox :value="isAllCheck" @click="allCheck(isAllCheck)">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  name: "Cart",
  data() {
    return {
      checked: false,
      edit: false,
      cartInfo:[]
    };
  },
  methods: {
    // 初始化
    async getData(){
      const result = await this.$API.reqSelectCart();
      if(result.code == 200) {
        this.cartInfo = result.data;
      }
    },
     // 修改某个产品的状态
    async updateChecked(id, isChecked) {
      isChecked = isChecked ? "1" : "0";
      const result = await this.$API.reqUpdateCheckedById(id, isChecked);
      if (result.code == 200) {
        this.getData();
      }
    },
    // 修改一个产品的数量
    async handler(type, disNum, car) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = car.tcr_number > 1 ? -1 : 0;
          break;
        case "change":
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - car.tcr_number;
      }
      const result = await this.$API.reqUpdateShopCart(car.tcr_id, disNum);
      if (result.code == 200) {
        this.getData();
      } else {
        this.$message.error(result.message);
      }
    },
    // 删除选中的全部商品
    deleteAll() {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(async () => {
          const result = await this.$API.reqDeleteShoopCarts();
          if (result.code == 200) {
            this.getData()
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message.error(result.message)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toPay(){
      const result = this.cartInfo.some((item)=>{
        return item.tcr_state == 1
      })
      if(result) {
        this.$router.push('/pay')
      }else {
        Toast.fail("请选择商品")
      }
    },
    // 全选按钮
    async allCheck(checked){
      var state;
      if(checked) {
        state = 0
      }else {
        state = 1
      }
      const result = await this.$API.reqUpdateAllCheck(state);
      this.getData();
    }
  },
  computed:{
    // 全选判断
    isAllCheck() {
      return this.cartInfo.every((item) => item.tcr_state == 1);
    },
    // 总价
    totalPrice() {
      let sum = 0;
      this.cartInfo.forEach((item) => {
        if(item.tcr_state == 1) {
          sum += item.tcr_number * item.product.tpt_price;
        }
      });
      return sum * 100;
    },
  },
  mounted(){
    this.getData();
  }
};
</script>

<style>
  .pay .van-submit-bar {
    bottom: 50px;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .van-grid-item {
    border-radius: 15px!important;
  }
</style>

<style lang="less" scoped>
.cart {
  background-color: #e6e6e6;
  
  .header {
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
  }
  
  .tool {
    display: flex;
    justify-content: space-between;
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    background-color: #f1e5e5;
    padding: 0 10px;
  }

  .content {
    background-color: #f1e5e5;
    padding: 0 10px;
    padding-top: 5px;

    .product {
      margin-bottom: 20px;
      border-radius: 10px;
      height: 90px;
      display: flex;
      padding: 5px;
      background-color: #fff;

      .checked {
        width: 7%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info {
        display: flex;
        width: 93%;

        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 90px;
          height: 90px;

          img {
            width: 88px;
            height: 88px;
            border-radius: 8px;
          }
        }

        .introduce {
          width: 230px;
          height: 90px;
          padding-left: 10px;

          .title {
            margin-top: 2px;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            font-weight: 600;
            overflow: hidden;
          }

          .attribute {
            display: flex;
            align-items: center;
            height: 30px;

            .value {
              margin-right: 5px;
              padding: 1px;
              padding-left: 5px;
              padding-right: 5px;
              height: 17px;
              line-height: 19px;
              font-size: 11px;
              background-color: #e6e6e6;
              border-radius: 3px;

            }
          }

          .floor {
            height: 27px;
            line-height: 27px;
            display: flex;
            justify-content: space-between;

            .price {
              font-weight: 700;
              color: red;
              span {
                font-size: 10px;
              }
            }

            .number {
              margin-right: 5px;
              width: 90px;
              display: flex;
              border: 1px solid red;
              border-radius: 10px;

              input {
                width: 40px;
                border: 0;
                text-align: center;
              }

              span {
                width: 27px;
                text-align: center;
                font-size: 22px;
              }

              .jia {
                border-left: 1px solid red;
              }

              .jian {
                border-right: 1px solid red;
                line-height: 23px;
                font-size: 25px;
              }
            }
          }
        }
      }
    }
  }

  .love {
    padding: 0 10px;
    margin-bottom: 100px;
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

  .edit {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 51px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;

    .checked {
      margin-left: 16px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }

    .button {
      margin-right: 40px;
      display: flex;
      align-items: center;

      button {
        height: 30px;
        width: 50px;
        line-height: 30px;
        border-radius: 20px;
        font-size: 13px;
        border: 0;
      }
    }
  }
}
</style>