<template>
  <div class="content">
    <form  v-on:submit.prevent>
      <div class="input-text clearFix">
        <span class="ico iconfont icon-youxiang1"></span>
        <input
          type="text"
          placeholder="请输入你的邮箱"
          v-model="account"
          name="account"
          v-validate="{
            required: true,
            regex: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          }"
          :class="{ invalid: errors.has('account') }"
        />
        <span class="error-msg">{{ errors.first("account") }}</span>
      </div>
      <div class="input-text clearFix">
        <span class="ico iconfont icon-mima1"></span>

        <input
          type="text"
          placeholder="请输入密码"
          v-model="password"
          name="password"
          v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
          :class="{ invalid: errors.has('password') }"
        />

        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <button class="btn" @click="sendLogin">登录</button>
    </form>
  </div>
</template>

<script>
import { setToken } from '@/utils/token'
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods:{
    
    // 登录
    async sendLogin(){
      // 整理参数
      const data = {account:this.account,password:this.password}
      const result = await this.$API.reqAccountLogin(data)
      console.log(result);
      if(result.code == 200) {
        setToken(result.data.uuidToken);
        this.$message({message:result.message,type:"success"})
        this.$router.push('/user/home')
      }else {
        this.$message.error(result.message)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  width: 380px;
  height: 280px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-top: none;
  padding: 18px;

  form {
    margin: 15px 0 18px 0;
    font-size: 12px;
    line-height: 18px;

    .input-text {
      margin-bottom: 16px;

      .ico {
        float: left;
        width: 37px;
        height: 40px;
        border: 1px solid #ccc;
        // background: url(../../assets/images/icons.png) no-repeat -10px -201px;
        box-sizing: border-box;
        border-radius: 2px 0 0 2px;
        line-height: 40px;
        text-align: center;
        font-size: 25px;
        font-weight: 500;
      }

      .error-msg {
        float: left;
        margin-left: 40px;
        margin-top: 5px;
        color: red;
      }

      input {
        width: 302px;
        height: 40px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-left: none;
        float: left;
        padding-top: 6px;
        padding-bottom: 6px;
        font-size: 14px;
        line-height: 22px;
        padding-right: 8px;
        padding-left: 8px;
        border-radius: 0 2px 2px 0;
        outline: none;
      }
    }

    .setting {
      label {
        float: left;
      }

      .forget {
        float: right;

        &:hover {
          color: #e1251b;
          cursor: pointer;
        }
      }
    }

    .btn {
      background-color: #7f2330;
      border-radius: 0;
      font-size: 19px;
      font-family: 微软雅黑;
      border: 1px solid #e1251b;
      color: #fff;
      width: 100%;
      height: 45px;
      margin-top: 10px;
      padding-left: 10px;
      cursor: pointer;
      text-align: center;
      letter-spacing: 10px;

      &:hover {
        background-color: #e1251b;
      }
    }
  }

  .call {
    ul {
      float: left;

      li {
        float: left;
        margin-right: 5px;
      }
    }

    .register {
      float: right;
      font-size: 15px;
      line-height: 38px;
      cursor: pointer;

      &:hover {
        color: #e1251b;
        text-decoration: underline;
      }
    }
  }
}
</style>