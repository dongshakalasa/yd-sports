<template>
  <div class="w">
    <div class="header">
      <van-icon name="cross" />
    </div>
    <div class="content">
      <div class="logo">
        密码登录
      </div>
      <div class="from">
        <div class="account">
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
        <div class="password">
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
        <button @click="sendLogin">登录</button>
      </div>
      <div class="other">
        <span>忘记密码</span>
        <span @click="$router.push('/register')">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import {setToken} from '@/utils/token'
import {Toast} from 'vant'
export default {
    name:'Login',
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
      const result = await this.$API.reqUserAccountLogin(data)
      if(result.code == 200) {
        setToken(result.data);
        Toast.success(result.message)
        this.$router.push('/home')
      }else {
        Toast.fail(result.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.w  {
  width: 100%;
  height: 667px;

  .header {
    height: 40px;
    padding: 0 10px;
    line-height: 40px;
  }

  .content {
    margin-top: 40px;

    .logo {
      height: 80px;
      line-height: 80px;
      font-size: 25px;
      text-align: center;
    }

    .from {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      height: 230px;

      >div {
        width: 280px;
        height: 70px;
        margin-bottom: 10px;

        input {
          border: 0;
          padding: 0;
          display: block;
          height: 50px;
          width: 280px;
          border-radius: 30px;
          text-align: center;
          border: 1px solid blue;
        }

        span {
          display: block;
          height: 20px;
          line-height: 20px;
          width: 280px;
          font-size: 11px;
          text-align: center;
          color: red;
        }
      }

      button {
        width: 280px;
        margin-top: 10px;
        height: 40px;
        border-radius: 5px;
        border: 0;
      }
    }

    .other {
      padding: 10px 50px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
    }
  }
}
</style>