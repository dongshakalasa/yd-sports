<template>
    <div class="w">
        <div class="imgs">
            <Carousel :list="productList.imgs" />
            <div class="close" @click="gohistory">
                <van-icon name="arrow-left" />
            </div>
        </div>
        <div class="title">
            <div class="price">
                <span>￥</span>{{productList.tpt_price}}
            </div>
            <div class="introduce">
                <img :src="productList.tpt_brand_img">
                <span>{{productList.tpt_brand}}&nbsp;{{productList.tpt_text}}</span>
            </div>
        </div>
        <!-- 评价 -->
        <van-empty description="暂无评价" v-show="orderRateList.length  == 0" />
        <div class="evaluate" v-show="orderRateList.length >0">
            <div class="top">
                <div class="left">
                   评价
                </div>
                <div class="right">
                </div>
            </div>
            <div class="floor" v-for="(orderRate,index) in orderRateList" :key="index">
                <div class="user">
                    <div class="img">
                        <img :src="orderRate.userInfo.tur_img">
                    </div>
                    <div class="info">
                        <div class="name">{{orderRate.userInfo.tur_name}}</div>
                        <div class="rate"><van-rate :value ="orderRate.oe_rate" size='10px'/></div>
                    </div>
                </div>
                <div class="text">{{orderRate.oe_text}}</div>
                <van-swipe :loop="false" :width="100">
                    <van-swipe-item v-for="(img,index) in orderRate.imgs" :key="index"><img :src="img" alt=""></van-swipe-item>
                </van-swipe>
                <div class="time">{{orderRate.oe_date}}</div>
            </div>
        </div>
        
        <!-- 加入购物车 -->
        <van-goods-action>
            <!-- <van-goods-action-icon icon="cart-o" text="购物车" /> -->
            <van-goods-action-icon icon="star-o" :text="text" :color="color" @click="collect(productList.tpt_id)"/>
            <van-goods-action-button type="warning" text="加入购物车" @click="show = true;"/>
        </van-goods-action>
        <!-- 弹框 -->
        <div class="popup">
            <van-popup v-model:show="show" position="bottom" :style="{ height: '40%' }">
                <div class="top">
                    <div class="left">
                        <img :src="productList.tpt_brand_img" alt="">
                    </div>
                    <div class="right">
                        <div class="price"><span>￥</span>1.00</div>
                        <div class="store">剩余{{productList.tpt_store}}</div>
                        <div class="text">请选择 <span v-for="(name,index) in productAttributeList" :key="index">{{name.name}}&nbsp;</span></div>
                    </div>
                </div>
                <!-- 数量 -->
                <div class="number">
                    <span class="jian" @click="handler('minus', -1, carInfo)">-</span>
                    <input type="text" v-model="carInfo.number" @change="handler('change', $event.target.value * 1, carInfo)">
                    <span class="jia" @click="handler('add', 1, carInfo)">+</span>
                </div>
                <div class="floor" v-for="(attribute,index) in productAttributeList" :key="index">
                    <div class="headline">{{attribute.name}}</div>
                    <div class="attribute">
                        <div :class="{attributeCut:value.taev_state == 1}" v-for="(value,index) in attribute.value" :key="index" @click="setAttribute(attribute.value,value)">
                            {{value.taev_value}}
                        </div>
                    </div>
                </div>
                <div class="submit" @click="goCart">确认</div>
            </van-popup>
        </div>
    </div>  
</template>

<script>
import {Toast} from 'vant'
export default {
    name: 'Detail',
    data(){
        return {
            show: false,
            orderRateList:[],
            productAttributeList:[],
            productList:{},
            carInfo:{
                number:1,
                attribute: []
            }
        }
    },
    mounted(){
        const id = this.$route.params.id;
        this.getData(id);
    },
    methods: {
        async getData(id){
            const result = await this.$API.reqDetail(id);
            if(result.code == 200) {
                this.orderRateList = result.data.orderRateList;
                this.productAttributeList = result.data.productAttributeList;
                this.productList = result.data.productList;
            }
        },
        // 返回按钮
        gohistory(){
            history.back()
        },
        //收藏按钮
        async collect(id){
            if(this.text == "已收藏") {
                const result = await this.$API.reqDeleteCollect(id);
                if(result.code == 200) {
                    this.getData(id)
                }else {
                    Toast.fail("出现错误！")
                }
            }else {
                const result = await this.$API.reqInsertCollect(id);
                if(result.code == 200) {
                    this.getData(id)
                }else {
                    Toast.fail("出现错误！")
                }
                
            }
        },
        // 属性选择
        setAttribute(attributeList,value){
            for(var attribute of attributeList) {
                attribute.taev_state = 0
            }
            value.taev_state = 1
        },
        // 加减
        handler(type, disNum, carInfo){
            switch (type) {
                case "add":
                    carInfo.number += 1 
                    break;
                case "minus":
                    carInfo.number = carInfo.number > 1 ? carInfo.number - 1 : 1;
                    break;
                case "change":
                    if(disNum > 1) {
                        carInfo.number = disNum
                    }else{
                        carInfo.number = 1
                    }
                    break;
            }
        },
        // 提交购物车
        async goCart(){
            // 整理参数
            this.carInfo.id = this.productList.tpt_id;
            for(var attributeList of this.productAttributeList) {
               for(var value of attributeList.value) {
                if(value.taev_state == 1) {
                    this.carInfo.attribute.push(value.taev_value)
                }
            }
            }
            const result = await this.$API.reqInsertCart(this.carInfo);
            console.log(result);
            console.log(this.carInfo);
        },
    },
    computed:{
        color:function(){
            if(this.productList.tpt_collect) {
                return "red"
            }else {
                return "#673c95"
            }
        },
        text:function(){
            if(this.productList.tpt_collect) {
                return "已收藏"
            }else {
                return "收藏"
            }
        }
    }
}
</script>

<style lang="less" scoped>
.w {
    padding-bottom: 50px;
    background-color: #e6e6e6;

    .popup {
        .top {
            padding: 10px 20px;
            display: flex;
            height: 90px;

            .left {
                width: 90px;
                height: 90px;

                img {
                    width: 90px;
                    height: 90px;
                }
            }

            .right {
                padding-left: 10px;
                width: 220px;
                height: 90px;

                >div {
                        height: 20px;
                        line-height: 20px;
                        font-size: 10px;
                    }

                .price {
                    height: 50px;
                    line-height: 50px;
                    font-size: 26px;
                    color: red;

                    span {
                        font-size: 14px;
                    }
                }
            }
        }

        .number {
              margin-right: 5px;
              margin-left: 250px;
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

        .floor {
            padding: 0 15px;
            height: 90px;
            border-bottom: 1px solid #e6e6e6;

            .headline {
                padding: 10px 0;
            }

            .attribute {
                display: flex;
                width: 340px;

                >div {
                    padding: 8px 10px;
                    background-color: #e6e6e6;
                    margin-right: 8px;
                    border-radius: 3px;
                }
            }

            .attributeCut {
                color: #fff;
                background-color: red!important;;
            }
        }
        
        .submit {
            margin: 0 10px;
            margin-bottom: 5px;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 354px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 30px;
            background-color: red;
        }
    }

    .imgs {
        position: relative;
        width: 375px;
        height: 340px;
        border-bottom: 1px solid #e6e6e6;

        .close {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            border-radius: 25px;
            font-size: 17px;
            font-weight: 600;
            background-color: rgba(0,0,0,0.4);
            color: #fff;
        }
    }

    .title {
        height: 120px;
        margin: 0 5px;
        margin-top: 20px;
        border-radius: 14px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 1px 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);
        box-sizing: border-box;

        
        .price {
            padding: 5px 10px;
            font-size: 20px;
            color: red;
            
            span {
                font-size: 14px;
            }
        }

        .introduce {
            padding: 0 10px;
            height: 50px;
            margin-top: 15px;
            display: flex;
            align-items: center;
            
            img {
                height: 30px;
                width: 50px;
            }

            span {
                margin-left: 5px;
                font-size: 13px;
                font-weight: 600;
                font-family: '宋体';
            }
        }
    }

    .evaluate {
        margin: 10px 5px;
        border-radius: 5px;
        background-color: #fff;

        .top {
            display: flex;
            justify-content: space-between;
            padding: 3px;

            .left {
                font-size: 17px;
                font-family: '黑体';

                span {
                    font-size: 11px;
                    color: #4e4646;
                }
            }

            .right {
                font-size: 13px;
                color: #464242;
            }
        }

        .floor {
            margin-top: 10px;
            padding: 0 5px;

            .user {
                height: 40px;
                display: flex;

                .img {
                    height: 40px;
                    width: 40px;

                    img {
                        height: 40px;
                        width: 40px;
                        border-radius: 15px;
                    }
                }

                .info {
                    padding-left: 6px;
                    height: 40px;

                    .name {
                        
                        width: 150px;
                        font-size: 14px;
                        overflow: hidden;
                    }
                }
            }

            .text {
                margin-top: 4px;
                margin-bottom: 8px;
                height:33px;
                font-size: 11px;
                overflow: hidden;
                font-family: '微软雅黑';
            }

            .van-swipe {
                padding:0 10px;
            }

            img {
                width: 80px;
                height: 80px;
            }

            .time {
                padding: 10px;
                font-size: 11px;
            }
        }
    }
 }
</style>