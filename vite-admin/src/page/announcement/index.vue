
<style>
.top {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <div class="top">
        <div class="left" style="width: 300px;display: flex">
          <div style="width: 180px; ">
            <el-input placeholder="根据标题搜索" v-model="input">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div style="margin-left: 10px">
            <el-button icon="el-icon-search" circle></el-button>
          </div>
        </div>
        <div class="right">
          <!-- 按钮 -->
          <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" >添加</el-button>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 30px">
      <el-table style="width: 100%" border :data="infoList">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column label="标题" prop="at_text">
        </el-table-column>
        <el-table-column prop="at_time" label="发布时间" width="500"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="{row}">
            <div v-if="row.at_state == 0" style="color: red">未发布</div>
            <div v-else style="color: green">正常</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="{row}">
            <el-button type="success" size="mini" v-if="row.at_state == 0">发布</el-button>
            <el-button type="info"  size="mini" v-else>取消</el-button>
            <el-button type="danger"  size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px; textAlign: center" :current-page.sync="page" :total="total" :page-size="limit"
        :page-sizes="[3, 5, 10]" :page-count="7" @current-change="getData" @size-change="handleSizeChange"
        layout=" prev, pager, next, jumper,->,sizes,total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Announcement',
  data(){
    return {
      infoList: [],
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      input: ''
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    async getData(){
      const { page, limit } = this
      const result = await this.$API.reqAnnouncement(page, limit)
      if(result.code == 200) {
        this.infoList = result.data.announcements;
        this.total = result.data.total
      }
    },
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getBrand()
    },
  }
}
</script>

