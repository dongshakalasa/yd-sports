<template>
  <div>
    <el-card style="margin-bottom: 10px">
      <div style="display: flex;">
        <div style="width: 180px; ">
          <el-input placeholder="根据店铺搜索" v-model="input">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div style="margin-left: 10px">
          <el-button icon="el-icon-search" circle></el-button>
        </div>
      </div>
    </el-card>
    <el-table style="width: 100%" border :data="infoList">
      <el-table-column label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column label="LOGO">
        <template slot-scope="{row}">
          <img :src="row.tmt_img" alt="" style="width:80px;height:60px">
        </template>
      </el-table-column>
      <el-table-column prop="tmt_name" label="店名"></el-table-column>
      <el-table-column prop="tmt_idcard" label="身份证"></el-table-column>
      <el-table-column prop="tmt_tel" label="电话"></el-table-column>
      <el-table-column prop="tmt_time" label="申请时间"></el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="{row}">
          <el-button type="success" icon="el-icon-circle-check" size="small "></el-button>
          <el-button type="danger" icon="el-icon-circle-close" size="small "></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px; textAlign: center" :current-page.sync="page" :total="total"
      :page-size="limit" :page-sizes="[3, 5, 10]" :page-count="7" @current-change="getData"
      @size-change="handleSizeChange" layout=" prev, pager, next, jumper,->,sizes,total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Applay',
  data() {
    return {
      infoList: [],
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
      const { page, limit } = this
      const result = await this.$API.reqMerchantApplay(page, limit);
      if (result.code == 200) {
        this.infoList = result.data.merchants;
        this.total = result.data.total
      }
    },
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getBrand()
    },
  },

}
</script>

<style>

</style>