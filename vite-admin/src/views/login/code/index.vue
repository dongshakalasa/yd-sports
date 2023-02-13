<template>
  <div class="content">
    <form v-on:submit.prevent>
      <!-- 邮箱账号 -->
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
      <!-- 验证码 -->
      <div class="input-text clearFix">
        <span class="ico iconfont icon-mima1"></span>
        <input
          type="text"
          class="code"
          placeholder="请输入验证码"
          v-model="code"
          name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }"
        />
        <el-button
          type="danger"
          size="mini"
          style="weight: 100px; height: 40px"
          @click="getCode"
          :disabled="abledBut"
          >{{ title }}</el-button
        >
        <span class="error-msg">{{ errors.first("code") }}</span>
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
      code: "",
      abledBut: false, //暂存并保存,true为禁止，false为不禁止
      time: 0, //设置初始时间为0
      timer: null,
      title: "获取验证码",
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 邮箱正则
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      // 判断邮箱是否正确
      if (regEmail.test(this.account)) {
        const result = await this.$API.reqGetCode(this.account);
        if (result.code == 200) {
          this.abledBut = true; // 设置为禁止
          this.time = 60;
          this.timer1();
        } else {
          this.$message.error(result.message);
        }
      } else {
        this.$message.error("邮箱格式不正确！");
      }
    },
    // 发送登录请求
    async sendLogin(){
      const data = {account:this.account,code:this.code}
      const result = await this.$API.reqCodeLogin(data)
      console.log(result);
      if(result.code == 200) {
        setToken(result.data.uuidToken);
        this.$message({message:result.message,type:"success"})
        this.$router.push('/user/home')
      }else {
        this.$message.error(result.message)
      }
    },
    // 点击获取按钮禁用60秒
    timer1() {
      //验证码60s内不能继续点击的函数
      if (this.time > 0) {
        this.title = this.time;
        this.time--;
        this.timer = setTimeout(this.timer1, 1000);
      } else {
        this.time = 0;
        this.title = "获取验证码";
        this.abledBut = false;
        clearTimeout(this.timer);
      }
    },
  },
};
</script>

<style lang="less">
.el-button {
  width: 94px;
}
</style>

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
        line-height: 40px;
        text-align: center;
        font-size: 25px;
        font-weight: 500;
        border: 1px solid #ccc;
        // background: url(../../assets/images/icons.png) no-repeat -10px -201px;
        box-sizing: border-box;
        border-radius: 2px 0 0 2px;
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

      .error-msg {
        float: left;
        margin-left: 40px;
        margin-top: 5px;
        color: red;
      }

      .code {
        width: 210px;
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