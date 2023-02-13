<template>
  <div class="w">
    <van-nav-bar
    title="填写订单"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-notice-bar
    left-icon="volume-o"
    text="受防疫举措变化影响，您的订单可能会延迟配货"
    />
    <div class="addressInfo" v-show="state == 0">
        <div><van-icon name="location-o"/>{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.city}}&nbsp;{{address.addressDetail}}</div>
        <div class="name"><van-icon name="manager-o" />{{address.name}} </div>
        <div><van-icon name="phone-o" />{{address.tel}}</div>
        <span @click="goAddress" ><van-icon name="arrow" /></span>
    </div>
    <div class="addressInfo" v-if="state == 1">
        <div><van-icon name="location-o"/>{{$route.query.address.address}}</div>
        <div class="name"><van-icon name="manager-o" />{{$route.query.address.name}} </div>
        <div><van-icon name="phone-o" />{{$route.query.address.tel}}</div>
        <span @click="goAddress" ><van-icon name="arrow" /></span>
    </div>
    <div class="goods">
        <div class="title">订单信息</div>
        <div class="info">
            <div class="left">
                <van-swipe :loop="false" :width="60">
                    <van-swipe-item v-for="(product,index) in productList" :key="index"><img :src="product.product.tpt_img" style="width: 60px;height: 60px" ></van-swipe-item>
                </van-swipe>
            </div>
            <div class="right" @click="show = true">
                共{{productList.length}}件<van-icon name="arrow"/>
            </div>
        </div>
    </div>
    <div class="sum">
        <!-- <div>
            <div>商品金额</div>
            <div>￥7611.00</div>
        </div> -->
        <div class="sum-price">
            合计：<span>￥{{totalPrice}}</span>
        </div>
    </div>
    <div class="submit" @click="submit">确认</div>

    <!-- 弹出层 -->
    <van-popup v-model:show="show" position="bottom" :style="{ height: '60%' }">
        <div class="goodslist-top">
            商品清单<span>共{{productList.length}}件</span>
        </div>
        <div class="floor" v-for="(product,index) in productList" :key="index">
            <div class="left">
                <img :src="product.product.tpt_img">
            </div>
            <div class="right">
                <div class="one">{{product.product.tpt_brand}}&nbsp;{{product.product.tpt_text}}</div>
                <div class="two"><span v-for="(name,index) in product.attribute" :key="index">{{name}}&nbsp;</span></div>
                <div class="three">
                    ￥{{product.product.tpt_price}} <span>x{{product.tcr_number}}</span>
                </div>
            </div>
        </div>
    </van-popup>
  </div>
</template>

<script>
export default {
    name:'Order',
    data(){
        return {
            show: false,
            address:{},
            productList:[],
            state: 0,
            addresss2:{}
        }
    },
    mounted(){
        this.getData();
        const address = this.$route.query.address;
        if(address != undefined) {
            this.state = 1;
        }
    },
    methods: {
        // 初始化
        async getData(){
            const result = await this.$API.reqGetPayInfo();
            if(result.code == 200) {
                this.address = result.data.address;
                this.productList = result.data.productList;
            }
        },
        // 后退按钮
        onClickLeft(){
            history.back()
        },
        // 选择收件人地址信息
        goAddress(){
            this.$router.push({
                path:'/address',
                query:{id:1}
            })
        },
        // 结算方式
        async submit(){
            // 地址参数
            let userInfo = {}
            if(this.state == 0) {
                let address = this.address.province+this.address.city+this.address.county+this.address.addressDetail;
                userInfo = {
                    address: address,
                    tel: this.address.tel,
                    name: this.address.name,
                }
            }else {
                userInfo = {
                    address: this.$route.query.address.address,
                    tel: this.$route.query.address.tel,
                    name: this.$route.query.address.name,
                }
            }
            // 发送参数
            let orderInfo = []
            for(var item of this.productList){
                 let info = {
                    crid:item.tcr_id,
                    number: item.tcr_number,
                    gsid: item.tcr_gs_id,
                    address: userInfo.address,
                    tel: userInfo.tel,
                    name: userInfo.name,
                    price: item.product.tpt_price
                }
                orderInfo.push(info)
            }
            console.log(orderInfo);

            const result = await this.$API.reqInsertOrder(orderInfo);
            console.log(result);
        }
    },
    computed:{
        // 总价
        totalPrice() {
        let sum = 0;
        this.productList.forEach((item) => {
            if(item.tcr_state == 1) {
            sum += item.tcr_number * item.product.tpt_price;
            }
        });
        return sum;
        },
    }
}
</script>

<style lang="less" scoped>
.w {
    background-color: #e6e6e6;
    .addressInfo {
        position: relative;
        padding: 10px;
        border-bottom: 4px dashed rgb(59, 75, 167);
        padding: 10px;
        background-color: #fff;

        >div {
            margin: 3px 0;
            font-size: 14px;
        }

        .name {
            font-size: 17px;
            font-weight: 600;
        }

        .van-icon {
            font-size: 17px;
            margin-right: 5px;
        }

        span {
            position: absolute;
            top: 40%;
            right: 2%;
            font-size: 20px;
        }
    }

    .goods {
        margin-top: 10px;
        padding: 10px 10px;
        border-radius: 7px;
        background-color: #fff;

        .title {
            padding: 5px 0;
            font-size: 10px;
            font-weight: 600;
        }

        .info {
            height: 60px;
            display: flex;
            border: 1px solid #e6e6e6;

            .left {
                width: 80%;

                .van-swipe-item {
                    padding: 0 5px;
                }
            }

            .right {
                text-align: center;
                width: 20%;
                line-height: 60px;
                font-size: 12px;
            }
        }

        
    }

    .sum {
        background-color: #fff;
        padding: 5px 10px;
        margin-top: 8px;
        border-radius: 5px;
        >div {
            padding: 8px 0;
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-family: '黑体';
        }

        .sum-price {
            padding-top: 12px;
            justify-content: right;

            span {
                color: red;
                font-weight: 600;
            }
        }
    }

    .submit {
        margin: 0 10px;
        margin-bottom: 5px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 354px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 30px;
        background-color: red;
        font-size: 18px;
        color: #fff;
    }

    .goodslist-top {
        padding: 10px 10px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 600;

        span {
            font-size: 10px;
            font-weight: 300;
        }
    }

    .floor {
        display: flex;
        padding: 5px 15px;
        padding-bottom: 15px;
        height: 90px;
        border-bottom: 1px solid #e6e6e6;

        .left {
            img {
                width: 90px;
                height: 90px;
            }
        }

        .right {
            padding: 0 10px;
            font-family: '黑体';

            .one {
                height: 34px;
                font-size: 14px;
                overflow: hidden;
            }
            
            .two {
                height: 20px;
                line-height: 20px;
                font-size: 5px;
                color: #696666;
            }

            .three {
                padding-top: 7px;
                height: 30px;
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                color: red;
                font-weight: 600;

                span {
                    font-size: 12px;
                }
            }
        }
    }
}

</style>