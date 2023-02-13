<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <div style="display: flex;">
        <div style="width: 180px; ">
          <el-input placeholder="根据用户名搜索" v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div style="margin-left: 10px">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </el-card>
    <el-card style="margin-top: 30px">
      <el-table style="width: 100%" border :data="infoList">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="{row}">
            <img :src="row.tur_img" alt="" style="width:80px;height:60px">
          </template>
        </el-table-column>
        <el-table-column prop="tur_name" label="昵称"></el-table-column>
        <el-table-column prop="tur_account" label="账号"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="{row}">
            <div v-if="row.tur_state == 2" style="color: red">冻结中</div>
            <div v-else style="color: green">正常</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="{row}">
            <el-button type="danger" icon="el-icon-lock" size="mini" v-if="row.tmt_state == 0">冻结</el-button>
            <el-button type="success" icon="el-icon-unlock" size="mini" v-else>解冻</el-button>
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
  name: 'User',
  data() {
    return {
      infoList: [],
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      input:''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const {page,limit} = this
      const result = await this.$API.requserInfo(page,limit);
      if(result.code == 200) {
        this.infoList = result.data.userInfoList;
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

<style>
.search {
  display: flex;
}
</style>