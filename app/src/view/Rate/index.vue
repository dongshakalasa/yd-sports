<script>
import axios from 'axios'
export default {
  data() {
    return {
      rateInfo:{
        oe_rate: 5,
        oe_text:'',
        imgs:[],
        oe_gs_id:''
      },
      fileList: [
      ],
      img:'',
      orderId:0,
    };
  },
  mounted(){
    this.img = this.$route.query.img;
    this.rateInfo.oe_gs_id = this.$route.query.id;
    this.orderId = this.$route.query.orderId;
  },
  methods: {
    async submit(){
      // 上传图片
      this.setImg()
      // 发送保存请求
      const result = await this.$API.reqInsertOrderRate(this.rateInfo);
      if(result.code == 200) {
        const result = await this.$API.reqUpdateState(this.orderId,5)
        console.log(result);
        history.back()
      }
    },
    // 上传图片方法
    setImg(){
      for(let file of this.fileList) {
        // 整理提交参数
        let img = 'http://vescow.pannifeng.top/'+file.file.name;
        this.rateInfo.imgs.push(img);
        console.log(img);
        // 整理上传参数length
        const forms = new FormData();
        forms.append("myfile", file.file);
        axios
        .post('/api/order/rate', forms)
        .then((res) => {
          //如果传入的响应状态码为200，则成功将文件发送给后台
          if (res.data.status === 200) {
            console.log(res);
          } else {
            console.log(res.data.message)//这块是请求失败后台给返回的相应的数据
          }
        });
      }
    },
    onChange(value) {
      this.oe_rate = value
    },
    // 返回
    history(){
      history.back();
    }
  },
  computed:{
    num(){
      return this.rateInfo.oe_text.length
    }
  }
};
</script>

<template>
  <div class="w">
    <!-- 头部 -->
    <div class="header">
      <div class="history" @click="history">
        &nbsp;<van-icon name="arrow-left" />
      </div>
      <div class="img">
        <img :src="img">
        <span>评价</span>
      </div>
      <div class="submit">
        <span @click="submit">提交</span>
      </div>
    </div>
    <div class="rate">
      <div class="title">商品评价</div>
      <van-rate
        v-model="rateInfo.oe_rate"
        :size="22"
        color="red"
        void-icon="star"
        void-color="#eee"
        @change="onChange"
      />
    </div>
    <div class="textarea">
      <textarea cols="30" rows="8" placeholder="感觉怎么样？跟大家分享一下？" v-model="rateInfo.oe_text"></textarea>
      <div class="title">{{num}}/500字</div>
    </div>
    <div class="input">
      <van-uploader v-model="fileList"  :max-count="4" />
      <div class="title">可以上传最多4张图片</div>
    </div>
  </div>
</template>

<style lang="less" scoped>

  .w {
    .header {
      display: flex;
      height: 50px;
      line-height: 50px;
      background-color: #e9dedefe;

      .history {
        width: 10%;
        font-size: 17px;
      }

      .img {
          width: 78%;
          display: flex;
          align-items: center;
          justify-content: center;
          

          img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          span {
            padding: 0 8px;
            font-size: 15px;
            font-family: '黑体';
          }
        }

      .submit {
        width: 12%;
        color: red;
        font-family: '黑体';
      }
    }

    .rate {
      display: flex;
      align-items: center;
      height: 50px;

      .title {
        width: 20%;
        text-align: center;
        font-size: 15px;
        font-family: "黑体";
        margin-right: 5px;
      }

    }

    .textarea {

      textarea {
        padding: 10px;
        width: 94%;
        height: 100%;
        border: 0;
        font-size: 13px;
      }

      .title {
        height: 25px;
        line-height: 25px;
        padding: 0 8px;
        font-size: 11px;
      }
    }

    .input {
      padding: 8px;
      padding-left: 15px;

      .title {
        padding: 4px 0;
        font-size: 9px;
        color: #7575a1;
      }
    }
  }

</style>

<style>
</style>