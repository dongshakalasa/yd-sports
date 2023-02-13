<template>
  <div>
    <!-- 分类 -->
    <el-card>
      <el-form :inline="true" class="demo-form-inline" :disabled="show">
        <el-form-item label="分类">
          <el-select placeholder="请选择" v-model="categoryName">
            <el-option :label="c1" :value="c1" v-for="(c1, index) in categoryList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 品牌 -->
    <el-card style="margin-top: 30px">
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" :disabled="categoryName    ==''">添加</el-button>
      <el-table style="width: 100%" border :data="brandList">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column prop="tbd_name" label="品牌名称" ></el-table-column>
        <el-table-column label="品牌LOGO">
          <template slot-scope="{row}">
            <img :src="row.tbd_img" alt="" style="width:80px;height:60px">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px; textAlign: center" :current-page.sync="page" :total="total" :page-size="limit"
        :page-sizes="[3, 5, 10]" :page-count="7" @current-change="getBrand" @size-change="handleSizeChange"
        layout=" prev, pager, next, jumper,->,sizes,total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Brand',
  data(){
    return {
      categoryList: [],
      categoryName:'',
      brandList:[],
      show:false,
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    // 初始化分类
    async getData() {
      const result = await this.$API.reqCategoryName();
      if(result.code ==200) {
        this.categoryList = result.data
      }
    },
    // 分类品牌
    async getBrand(){
      // 解构出参数
      const { page, limit, categoryName } = this
      const result = await this.$API.reqBrandLimt(page, limit, categoryName)
      const result2 = await this.$API.reqBrand(categoryName);
      if(result.code == 200) {
        this.brandList = result.data
      }

      if(result2.code == 200) {
        this.total = result2.data.length
      }
    },
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getBrand()
    },
  },
  watch:{
    categoryName(){
      this.getBrand()
    }
  }
}
</script>

<style>

</style>