<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <!-- @select="handleSelect" -->
                <el-menu 
                :efault-active="1" 
                class="el-menu-vertical-demo" 
                
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b">

                    <el-menu-item index="1" @click="$router.push('/admin/home')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-help"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="$router.push('/admin/roll')">滚动图片</el-menu-item>
                            <el-menu-item index="2-2" @click="$router.push('/admin/platform')">平台属性管理</el-menu-item>
                            <el-menu-item index="2-3" @click="$router.push('/admin/brand')">品牌管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span>客户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1" @click="$router.push('/admin/merchant')">商家管理</el-menu-item>
                            <el-menu-item index="3-2" @click="$router.push('/admin/user')">用户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>业务管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1" @click="$router.push('/admin/applay')">入住申请</el-menu-item>
                            <el-menu-item index="4-2" @click="$router.push('/admin/announcement')">公告管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
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
    },
    
}
</script>