<template>
  <div>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="orderList">
        <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
        <el-table-column label="商品" width="120" align="center">
            <template slot-scope="{row}">
                <img :src="row.product.tpt_img" alt="" style="width:100px;height:100px">
            </template>
        </el-table-column>
        <el-table-column label="描述" width="300">
            <template slot-scope="{row}">
                <div>{{ row.product.tpt_text }}</div>
                <div>
                    <el-tag :key="index" v-for="(tag,index) in row.attribute" >
                        {{ tag}}
                    </el-tag>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="订单金额" width="80" align="center">
            <template slot-scope="{row}">
                <div>{{ row.tor_price * row.tor_number }}</div>
            </template>
        </el-table-column>
        <el-table-column prop="tor_number" label="数量" width="60" align="center">
        </el-table-column>
        <el-table-column label="收件人信息" width="width" align="center">
            <template slot-scope="{row}">
                <div>{{ row.tor_name }}</div>
                <div>{{ row.tor_tel }}</div>
                <div>{{ row.tor_address }}</div>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" width="190" align="center">
            <template slot-scope="{row}">
                <div>{{ row.tor_time }}</div>
            </template>
        </el-table-column>
        <el-table-column label="订单状态" width="90" align="center">
            <template slot-scope="{row}">
                <div class="one" v-if="row.tor_state == 1">待发货</div>
                <div class="one" v-else-if="row.tor_state == 2">已发货</div>
                <div class="one" v-else-if="row.tor_state == 3">已完成</div>
                <div class="one" v-else-if="row.tor_state == 4">已取消</div>
                <div class="one" v-else-if="row.tor_state == 5">已完成</div>
                <div class="one" v-else-if="row.tor_state == 6">申请退款</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
            <template slot-scope="{row}">
                <!-- 操作-->
                <el-button type="success" size="mini" v-if="row.tor_state == 1" @click="setState(row.tor_id,2)">发货</el-button>
                <el-button type="success" size="mini" v-if="row.tor_state == 6" @click="setState(row.tor_id,2)">退款</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination 
        style="margin-top: 20px; textAlign: center" 
        :current-page.sync="page"
        :total="total" 
        :page-size="limit"
        :page-sizes="[3, 5, 10]" 
        :page-count="7" 
        @current-change="getData" 
        @size-change="handleSizeChange"
        layout=" prev, pager, next, jumper,->,sizes,total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    name:'Order',
    data(){
        return {
            page: 1,  // 代表当前第几页
            limit: 3, // 代表当前页面有几条数据
            total: 0,   // 存储分页器一共展示的数据
            orderList:[],
            state: 0
        }
    },
    mounted(){
        this.state = this.$route.query.id
        this.getData()
    },
    methods: {
        async getData(){
            const {page,limit,state} = this
            const result = await this.$API.reqOrderList(page,limit,state);
            // console.log(result);
            this.orderList = result.data.orderList
            this.total = result.data.total
        },
        // 分页器展示条数设置
        handleSizeChange(limit) {
            this.limit = limit
            this.getData()
        },
        async setState(id,state){
            const result = await this.$API.reqUpdateState();
        }
    },
    watch:{
        $route(){
            this.state = this.$route.query.id
            this.getData()
        }
    }
}
</script>

<style>

</style>