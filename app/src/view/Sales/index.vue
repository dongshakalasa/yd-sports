<template>
  <div class="w">
    <div class="header">
        <van-nav-bar
        title="退货"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
    <van-tabs v-model="active">
        <van-tab title="全部">
            <Product  :info="info"/>
        </van-tab>
        <van-tab title="处理中">
            <Product  :info="info"/>
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
    name:'Sales',
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
        if(this.active == 0){
           this.orderInfo.forEach((item)=> {
            if(item.tor_state == 2) {
              newArr.push(item);
            }
           })
           return newArr;
        }else {
            this.orderInfo.forEach((item)=> {
            if(item.tor_state == 6) {
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