<style>
.hide .el-upload--picture-card {
  display: none;
}

.hide2 .el-upload-list__item-delete {
  visibility: hidden;

}
</style>
<template>
  <div>
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
      <el-table style="width: 100%" border :data="sortList">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column prop="tst_name" label="分类名称"></el-table-column>
        <el-table-column label="标识">
          <template slot-scope="{row}">
            <img :src="row.tst_img" alt="" style="width:80px;height:60px">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- slot-scope="{row}" -->
          <template slot-scope="{row}">
            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateRow(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(row.tst_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 20px; textAlign: center" :current-page.sync="page" :total="total" :page-size="limit"
        :page-sizes="[3, 5, 10]" :page-count="7" @current-change="getPlatform" @size-change="handleSizeChange"
        layout=" prev, pager, next, jumper,->,sizes,total">
      </el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="80px">
        <!-- 商品介绍 -->
        <el-form-item label="商品介绍">
          <el-input placeholder="请输入分类名称" v-model="form.tst_name"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="标识图片">
          <el-upload action="#" 
          :limit="4" 
          :http-request="uploadPic"
          list-type="picture-card" 
          :file-list="form.imgs"
          :class="{hide:hideUploadEdit}"
          :on-remove="removeImgs">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'platform',
  data(){
    return {
      categoryList:[],
      categoryName:'',
      show:false,
      // 代表分页器的第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      sortList:[],
      dialogFormVisible:false,
      hideUploadEdit: false,
      form:{
        tst_name:'',
        imgs:[]
      },
      title:''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 初始化分类
    async getData() {
      const result = await this.$API.reqCategoryName();
      if (result.code == 200) {
        this.categoryList = result.data
      }
    },
    // 获取品台属性
    async getPlatform() {
      // 解构出参数
      const { page, limit, categoryName } = this
      const result = await this.$API.reqPlatformLimt(page, limit, categoryName)
      if (result.code == 200) {
        this.sortList = result.data.sortList
        this.total = result.data.total;
      }
    },
    // 当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit
      this.getPlatform()
    },
    async deleteRow(id) {
      const result = await this.$API.reqPlatformDelete(id);
      if(result.code == 200) {
        this.$message({type:"success",message:'删除成功！'})
        this.getPlatform()
      }else {
        this.$message({ type: 'warning', message: '删除失败，请稍后再试！' })
      }
    },
    async updateRow(row){
      let imgsList = []
      imgsList.push({ url: row.tst_img })
      this.form = row
      this.form.imgs = imgsList
      this.getData()
      this.dialogFormVisible = true;
    },
    removeImgs(file, fileList) {
      this.form.imgs = []
      this.hideUploadEdit = false
    },
    uploadPic(param) {
      console.log(param);
      var fileObj = param.file
      let name = 'http://vescow.pannifeng.top/' + fileObj.name;
      var form = new FormData()
      // 文件对象
      form.append('myfile', fileObj)
      axios
        .post('/api/merchant/product/upload', form)
        .then((res) => {
          console.log(res);
          //如果传入的响应状态码为200，则成功将文件发送给后台
          if (res.data.code === 200) {
            this.form.imgs.push({ url: name })
            this.hideUploadEdit = true
          } else {
            console.log(res.data.message)//这块是请求失败后台给返回的相应的数据
          }
        });
    },
  },
  watch: {
    categoryName() {
      this.getPlatform()
    },
    'form.imgs':{
      handler(newvalue, oldvalue) {
        this.hideUploadEdit = true;
      }
    }
  }
  
}
</script>

<style>

</style>