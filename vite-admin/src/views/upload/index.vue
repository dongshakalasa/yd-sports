<template>
  <div>
    <el-upload action="#"
      :limit="4" 
      :http-request="uploadPic" 
      list-type="picture-card"
      :on-success="handleAvatarSuccess" 
      :before-upload="beforeAvatarUpload" 
      :file-list="imgs" 
      :on-remove="removeImgs" 
      :on-change="changeImgs"
      :disabled="false">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      imageUrl: '',
      imgs:[
        { url:'http://vescow.pannifeng.top/1.webp'},
        { url: 'http://vescow.pannifeng.top/1.webp' },
        { url: 'http://vescow.pannifeng.top/1.webp' },
        { url: 'http://vescow.pannifeng.top/1.webp' }
      ]
    }
  },
  methods: {
    beforeAvatarUpload(a){
      // console.log(a);
    },
    handleAvatarSuccess(a, b, c){
      // console.log(a,b,c);
    },
    uploadPic(param) {
      console.log(param);
      var fileObj = param.file
      var form = new FormData()
      // 文件对象
      form.append('myfile', fileObj)
      // axios
      //   .post('/api/merchant/product/upload', form)
      //   .then((res) => {
      //     //如果传入的响应状态码为200，则成功将文件发送给后台
      //     if (res.data.status === 200) {
      //       console.log(res);
      //     } else {
      //       console.log(res.data.message)//这块是请求失败后台给返回的相应的数据
      //     }
      //   });
      console.log(1);
    },
    removeImgs(file,fileList){
      console.log(file,fileList);
    },
    changeImgs(file,fileList){
      console.log(file,fileList);
    }
   
  }
}
</script>

<style>

</style>