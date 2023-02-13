<script>
export default {
    name:'Collect',
    data(){
      return {
        info:[]
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
        onClickLeft(){
            history.back();
        },
        async getData(){
          const result = await this.$API.reqSelectCollect();
          this.info = result.data;
        },
        async deleteGoods(id){
          const result = await this.$API.reqDeleteCollect(id)
          console.log(result);
          this.getData()
        }
    }
}
</script>

<template>
  <div class="w">
    <div class="header">
        <van-nav-bar
        title="商品收藏"
        left-arrow
        @click-left="onClickLeft"
        />
    </div>
    <van-empty description="没有收藏任何商品" v-if="info.length == 0" />
    <van-swipe-cell v-for="(product,index) in info" :key="index" v-else-if="info.length > 0" >
      <van-card
        :price="product.tpt_price"
        :title="product.tpt_text"
        class="goods-card"
        :desc="product.tpt_brand"
        :thumb="product.tpt_img"
      />
      <template #right>
        <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(product.tpt_id)"/>
      </template>
    </van-swipe-cell>
    <Recommend />
  </div>
  
</template>

<style>
  .goods-card {
    margin: 0;
    background-color: @white;
  }

  .delete-button {
    height: 100%!important;
  }
</style>