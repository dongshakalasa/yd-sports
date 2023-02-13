<template>
  <div class="w">
    <div class="navbar">
      <navbar />
    </div>
    <div class="info">
      <div class="top">
        <div class="left">
        </div>
        <div class="right">
            <img :src="merchant.tmt_img" style="width: 50px;height: 50px" alt="">
            <i class="el-icon-switch-button" @click="logout"></i>
        </div>
      </div>
      <div class="bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<script>
import navbar from './navbar/index.vue'
export default {
    name:'User',
    components:{
      navbar,
    },
    data() {
      return {
        merchant: {}
      }
    },
    methods:{
      // getData
      async getData() {
        const result = await this.$API.reqAuthLogin();
        if (result.code == 200) {
          this.merchant = result.data
        }
      },
      // 退出登录
      async logout(){
        const result = await this.$API.reqLogout();
        if(result.code == 200) {
          this.$router.push('/login')
        }
      }
    },
    mounted() {
      this.getData()
    }
}
</script>


<style>
.el-breadcrumb {
    height: 100%!important;
    line-height: 60px;
    font-size: 20px;
    padding-left: 15px;
  }
</style>

<style lang="less" scoped>
.w {
  width: 100%;
  height: 100%;

  .navbar {
    transition: width 0.28s;
      width: 250px !important;
      background-color: #304156;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
  }

  .info {
    min-height: 100%;
    margin-left: 250px;
    position: relative;

    .top {
      display: flex;
      justify-content: space-between;
      height: 60px;
      border-bottom: 1px solid #e6e6e6;

      .left {
        height: 100%;
        line-height: 60px;
        width: 50%;
        font-size: 28px;
      }

      .right {
        padding-right: 60px;
        display: flex;
        justify-content: right;
        align-items: center;
        width: 50%;

        img {
          border-radius: 10px;
        }

        i {
          width: 50px;
          text-align: center;
          font-size: 20px;
          font-weight: 700;

          &:hover {
            color: red;
            cursor: pointer;
          }
        }
      }
    }

    .bottom {
      min-height: calc(100vh - 50px);
      width: 96%;
      position: relative;
      overflow: hidden;
      padding: 2%;
      display: block;
      box-sizing: inherit;
    }
  }
 }
</style>>