<template>
  <div class="w">
    <div class="header">
        <van-nav-bar
        title="评价中心"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
    <van-tabs v-model="active">
        <van-tab title="待评价">
            <van-empty description="暂未有订单信息！" v-if="orderInfo == undefined"/>
            <Product  :info="info" />
        </van-tab>
        <van-tab title="已评价">
            <Product  :info="info"/>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    name:'OrderRate',
    data() {
      return {
        active: 0,
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
      this.getData();
    },
    computed: {
      info() {
        const newArr = []
        // console.log(this.active);
        if(this.active == 0){
           this.orderInfo.forEach((item)=> {
            if(item.tor_state == 3) {
              newArr.push(item);
            }
           })
           return newArr;
        }else {
            this.orderInfo.forEach((item)=> {
            if(item.tor_state == 5) {
              newArr.push(item);
            }
          })
          return newArr;
        }
        
      }
    },
}
</script>

<style>

</style>