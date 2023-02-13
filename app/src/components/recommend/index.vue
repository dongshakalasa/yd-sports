<template>
  <div>
    <!-- 猜你喜欢 -->
    <div class="love">
        <!-- 标题 -->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
            <van-icon name="good-job-o" />&nbsp;好物推荐
        </van-divider>
        <!-- 商品 -->
        <div class="product">
            <van-grid :gutter="1" column-num="2">
                <van-grid-item v-for="p in products" :key="p.tpt_id">
                    <div class="goods">
                        <div class="img">
                            <img :src="p.tpt_img">
                        </div>
                        <div class="title">{{ p.tpt_text }}</div>
                        <div class="price"><span>￥</span>{{ p.tpt_price }}</div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Recommend',
    data(){
        return {
            products:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            const result = await this.$API.reqRecommend()
            if(result.code == 200) {
                this.products = result.data
            }
        }
    }
}
</script>

<style lang="less" scoped>
.love {
    margin-bottom: 50px;
    padding: 0 10px;
    background-color: #f1e5e5;

    .van-divider {
        margin: 0;
        padding-top: 20px;
    }

    .product {
        display: flex;
        flex-wrap: wrap;

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