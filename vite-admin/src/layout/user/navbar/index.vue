<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <el-menu 
                :default-active="index" 
                class="el-menu-vertical-demo" 
                @select="handleSelect"
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-menu-item index="1" @click="$router.push('/user/home')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push('/user/product')">
                        <i class="el-icon-s-goods"></i>
                        <span slot="title">商品管理</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1" @click="goOrder(0)">全部订单</el-menu-item>
                            <el-menu-item index="3-2" @click="goOrder(1)">待发货</el-menu-item>
                            <el-menu-item index="3-3" @click="goOrder(2)">已发货</el-menu-item>
                            <el-menu-item index="3-5" @click="goOrder(6)">申请退款</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="4" @click="$router.push('/user/person')">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">我的</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            index: '1'
        }
    },
    methods: {
        handleSelect(a) {
            this.index = a
        },
        goOrder(a){
            this.$router.push(
                {
                    path:'/user/order',
                    query:{
                        id:a
                    }
                }
            )
        }
    },
    
}
</script>