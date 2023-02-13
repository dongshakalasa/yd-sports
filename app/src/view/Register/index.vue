<template>
  <div class="w">
    <div class="header">
      <van-icon name="cross" />
      <span @click="$router.push('login')">登录</span>
    </div>
    <div class="content">
      <div class="logo">
        注册账号
      </div>
      <div class="from">
        <div class="email">
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
        <div class="code">
            <div class="input">
                <input
                  type="text"
                  placeholder="请输入验证码"
                  v-model="code"
                  name="code"
                  v-validate="{ required: true, regex: /^\d{6}$/ }"
                  :class="{ invalid: errors.has('code') }"
                />
                <span @click="getCode">{{title}}</span>
            </div>
            <span class="error-msg">{{ errors.first("code") }}</span>
        </div>
        <div class="password">
            <input
              type="text"
              placeholder="请输入你的登录密码"
              v-model="password"
              name="password"
              v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
              :class="{ invalid: errors.has('password') }"
            />
            <span class="error-msg">{{ errors.first("password") }}</span>
        </div>
        <button @click="sendRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Register',
    data() {
    return {
      account: "",
      code: "",
      password: "",
      abledBut: false, //暂存并保存,true为禁止，false为不禁止
      time: 0, //设置初始时间为0
      timer: null,
      title:'获取验证码'
    };
  },
  methods: {
    // 获取验证码
    async getCode(){
      // 邮箱正则
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      // 判断邮箱是否正确
      if(regEmail.test(this.account)){
        const result = await this.$API.reqGetCode(this.account)
        if(result.code == 200){
          this.abledBut = true; // 设置为禁止
          this.time = 60;
          this.timer1() 
        }else {
          this.$message.error(result.message)
        }
      }else {
        this.$message.error("邮箱格式不正确！")
      }
    },
    // 注册按钮
    async sendRegister(){
      const success = await this.$validator.validateAll();
      if (success) {
        try {
          // 整理参数
          const data = {account:this.account,password:this.password,code:this.code};
          // 发送请求
          const result = await this.$API.reqUserRegister(data)
          // 返回结果处理
          if(result.code == 200) {
            this.$message({message:result.message,type:"success"})
            this.$router.push('/login')
          }else {
            this.$message.error(result.message)
          }
        } catch (error) {
          this.$message(error.message)
        }
      }else {
        this.$message('输入存在错误！')
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
        this.title = '获取验证码';
        this.abledBut = false;
        clearTimeout(this.timer);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.w  {
  width: 100%;
  height: 667px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 0 10px;
    line-height: 40px;

    span {
        font-size: 14px;

        &:hover {
            color: rgb(200, 99, 21);
        }
    }

    .van-icon {
        line-height: 40px;
    }
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
      height: 300px;

      >div {
        padding-top: 1px;
        display: flex;
        flex-direction: column;
        width: 280px;
        height: 60px;

        input {
            height: 35px;
        }

        span {
            height: 20px;
            line-height: 20px;
            font-size: 11px;
        }
      }

      .input {
        display: flex;

        span {
            width: 78px;
            height: 40px;
            text-align: center;
            line-height: 41px;
            font-size: 14px;
            background-color: red;
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