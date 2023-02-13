<script>
export default {
    data() {
      return {
        active: 3,
        orderInfo:[],
      };
    },
    methods:{
        async getData(){
          const result = await this.$API.reqSelectOrder();
          this.orderInfo = result.data;
        },
        onClickLeft(){
            history.back()
        }
    },
    mounted(){
      this.active = Number(this.$route.query.active);
      this.getData();
      this.$on('geDate',()=>{
        console.log(1);
        this.getData()
      })
    },
    computed: {
      info() {
        const newArr = []
        // console.log(this.active);
        if(this.active == 0){
           this.orderInfo.forEach((item)=> {
            if(item.tor_state < 5) {
              newArr.push(item);
            }
           })
           return newArr;
        }else {
            if(this.active == 3) {
              this.orderInfo.forEach((item)=> {
              if(item.tor_state == this.active || item.tor_state == 5) {
                  newArr.push(item);
                }
              })
            }else {
                this.orderInfo.forEach((item)=> {
                if(item.tor_state == this.active) {
                  newArr.push(item);
                }
              })
            }
          return newArr;
        }
        
      }
    },
    watch:{
      active:{
        handler(newVal,oldVal) {
          this.$route.query.active = newVal
        }
      }
    }
}
</script>

<template>
  <div class="w">
    <div class="header">
        <van-nav-bar
        title="我的订单"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
    <van-tabs v-model="active">
      <van-tab title="全部">
        <van-empty description="暂未有订单信息！" v-if="orderInfo == undefined"/>
        <Product  :info="info" />
      </van-tab>
      <van-tab title="待发货">
        <Product  :info="info"/>
      </van-tab>
      <van-tab title="待收货">
        <Product  :info="info" />
      </van-tab>
      <van-tab title="已完成">
        <Product  :info="info"/>
      </van-tab>
      <van-tab title="已取消">
        <Product  :info="info"/>
      </van-tab>
    </van-tabs>
    <Recommend />
  </div>
</template>


<style lang="less" scoped>

.w {
  background-color: #e6e6e6;
    .main {
    margin-top: 4px;
    padding: 5px;
    padding-top: 6px;

    .floor {
      background-color: #fff;

      .product {
        padding: 10px;
        padding-top: 0;
        border-bottom: 1px solid black;
      
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
      }
    }
  }
}

</style>