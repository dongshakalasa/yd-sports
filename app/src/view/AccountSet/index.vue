<template>
  <div class="w">
    <div class="header">
        <van-nav-bar
        title="账户设置"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="user">
        <div class="img">
          <img :src="userInfo.tur_img">
        </div>
        <div class="info">
          <div class="name">{{userInfo.tur_name}}</div>
          <div class="account">账号：{{userInfo.tur_account}}</div>
        </div>
        <!-- 工具栏 -->
        <div class="toolbar">
          <van-icon name="arrow" />
        </div>
        </div>
        <div class="address" @click="$router.push('/address')">
            <span>地址管理</span>
            <van-icon name="arrow" />
        </div>
        <div class="password">
            <span>修改密码</span>
            <van-icon name="arrow" />
        </div>
        <div class="logout" @click="logout">
            退出登录
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          userInfo:{}
        }
    },
    methods: {
      // 初始化
      async getData(){
        const result = await this.$API.reqUserInfo();
        if(result.code == 200) {
          this.userInfo = result.data
        }
      },
      // 撤退按钮
      onClickLeft() {
        history.back();
      },
      // 退出账号
      async logout(){
        const result = await this.$API.reqLogout();
        if(result.code == 200) {
          this.$router.push("/home")
        }
      }
    },
    mounted(){
        this.getData()
    }
}
</script>

<style lang="less">
.w {
    .header {
        .user {
            padding-top: 20px;
            display: flex;
            align-items: center;
            height: 70px;
            border-bottom: 1px solid #e6e6e6;
            position: relative;

            .img {
                width: 60px;
                height: 60px;
                margin-left: 10px;

                img {
                width: 60px;
                height: 60px;
                border-radius: 30px;
                }
            }

            .info {
                padding-left: 10px;
                width: 180px;
                overflow: hidden;

                .name {
                height: 30px;
                font-weight: 600;
                }

                .account {
                font-size: 12px;
                }
            }

            // 设置按钮
            .toolbar {
                position: absolute;
                right: 15px;
                top: 45px;
                height: 70px;
                font-size: 20px;

                div {
                font-size: 11px;
                }
            }
        }

        .address {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding: 0 10px;
            padding-right: 20px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-family: '宋体';
            border-bottom: 1px solid  #e6e6e6;

            &:hover {
            background-color: #e6e6e6;
          }
        }

        .password {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          padding-right: 20px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          font-family: '宋体';
          border-bottom: 1px solid  #e6e6e6;

          &:hover {
            background-color: #e6e6e6;
          }
        }

        .logout {
            margin-top: 50px;
            height: 45px;
            line-height: 45px;
            border-radius: 10px;
            text-align: center;
            background-color: #e6e6e6;
        }
    }
}
</style>