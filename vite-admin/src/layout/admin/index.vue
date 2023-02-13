<template>
    <div class="w">
        <div class="navbar">
            <navbar />
        </div>
        <div class="info">
            <div class="top">
                <div class="left">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
                    </el-breadcrumb>
                </div>
                <div class="right">
                    <p>管理员</p>admin
                </div>
            </div>
            <div class="bottom">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>


<script>
import navbar from './navbar/index.vue'
export default {
    name: 'User',
    components: {
        navbar,
    },
    data() {
        return {
            merchant: {}
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>


<style>
.el-breadcrumb {
    height: 100% !important;
    line-height: 60px;
    font-size: 20px;
    padding-left: 15px;
}
</style>

<style lang="less" scoped>
.w {
    width: 100%;
    height: 100%;

    .navbar {
        transition: width 0.28s;
        width: 250px !important;
        background-color: #304156;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
    }

    .info {
        min-height: 100%;
        margin-left: 250px;
        position: relative;

        .top {
            position: fixed;
            display: flex;
            top: 0;
            left: 0;
            justify-content: space-between;
            height: 60px;
            width: 100%;
            z-index: 999;
            background-color: white;
            border-bottom: 1px solid #e6e6e6;

            .left {
                height: 100%;
                line-height: 60px;
                width: 50%;
                font-size: 28px;
            }

            .right {
                padding-right: 60px;
                display: flex;
                justify-content: right;
                align-items: center;
                width: 50%;

                img {
                    border-radius: 10px;
                }

                i {
                    width: 50px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: 700;

                    &:hover {
                        color: red;
                        cursor: pointer;
                    }
                }
            }
        }

        .bottom {
            min-height: calc(100vh - 110px);
            width: 96%;
            position: relative;
            overflow: hidden;
            padding: 2%;
            padding-top: 90px;
            padding-bottom: 0;
            display: block;
            box-sizing: inherit;
        }
    }
}
</style>>