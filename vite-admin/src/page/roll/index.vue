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
    <el-card style="margin: 30px">
      <!-- 按钮 -->
      <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="dialogFormVisible = true">添加</el-button>
      <el-table style="width: 100%" border :data="imgs">
        <el-table-column label="序号" width="80px" align="center" type="index">
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="{row}">
            <img :src="row.rl_img" alt="" style="width:250px;height:200px">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <!-- slot-scope="{row}" -->
          <template slot-scope="{row}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteImg(row.rl_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加滚动图片" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
    
        <el-form-item label="滚动图片">
          <!-- 
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload" 
                              
                             -->
          <el-upload action="#" :limit="4" :http-request="uploadPic" list-type="picture-card" :disabled="state" :file-list="img" :class="{hide:hideUploadEdit,hide2:hideUploadEdit2}">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quxiao">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'roll',
  data(){
    return {
      imgs:[],
      // 对话框显示与隐藏
      dialogFormVisible: false,
      state: false,
      hideUploadEdit: false,
      hideUploadEdit2: true,
      insertImg:{},
      img:[]
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    async getData(){
      const result = await this.$API.reqRollList();
      if(result.code == 200) {
        this.imgs = result.data
      }
    },
    async deleteImg(id) {
      const result = await this.$API.reqDeleteRoll(id)
      if(result.code == 200) {
        this.getData()
        this.$message({type: 'success',message:'删除成功'})
      }else {
        this.$message({ type: 'warning', message: '删除失败，请稍后再试！' })
      }
    },
    quxiao(){
      this.insert
    },
    submit(){
      this.insert();
      this.dialogFormVisible = false
    },
    async insert(){
      const result = await this.$API.reqInsertRoll(this.insertImg)
      if(result.code == 200) {
        this.$message({ type: 'success', message: '添加成功' })
        this.getData()
      }else {
        this.$message({ type: 'warning', message: '添加失败，请稍后再试！' })
      }
    },
    uploadPic(param) {
      var fileObj = param.file
      let name = 'http://vescow.pannifeng.top/' + fileObj.name;
      var form = new FormData()
      // 文件对象
      form.append('myfile', fileObj)
      axios
        .post('/api/merchant/product/upload', form)
        .then((res) => {
          //如果传入的响应状态码为200，则成功将文件发送给后台
          if (res.data.code === 200) {
            this.insertImg = {
              img: name
            }
          } else {
          }
        });
    },
  },
  watch: {
    insertImg(){
      if(this.insertImg != null) {
        console.log(1);
        this.hideUploadEdit = true
      }
    }
  }
}
</script>

<style>

</style>