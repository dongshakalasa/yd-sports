
<style lang="less">
.content {
    width: 30%;
    height: 600px;
    margin: 0 auto;
    margin-top: 60px;
    padding-top: 40px;
    position: relative;
    border: 1px solid #e8e8e8;

    .icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
        font-size: 20px;
    }

    .img {
        width: 90%;
        text-align: center;
    }

    .bottom {
        width: 60%;
        height: 80px;
        margin: 0 auto;
        margin-top: 80px;
        font-size: 20px;

        >div {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 60px;
            line-height: 60px;

            .left {
                width: 28%;
                text-align-last: justify
            }

            .right {
                width: 65%;
                text-align: left;
            }
        }
    }
}
</style>

<template>
  <div>
    <div class="content">
        <i class="el-icon-edit icon"></i>
        <div class="img">
            <img :src="info.tmt_img" style="width: 100px;height: 100px;border-radius: 50px;">
        </div>
        <div class="bottom">
            <div>
                <div class="left">店铺</div>
                <div class="right">{{ info.tmt_name }}</div>
            </div>
            <div>
                <div class="left">证件</div>
                <div class="right">{{ info.tmt_idcard }}</div>
            </div>
            <div>
                <div class="left">电话</div>
                <div class="right">{{ info.tmt_tel }}</div>
            </div>
            <div>
                <div class="left">注册时间</div>
                <div class="right">{{ info.tmt_time }}</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Pserson',
    data(){
        return {
            size:'',
            info:{}
        }
    },
    mounted(){
        this.getData()
    },
    methods: {
        async getData(){
            const result = await this.$API.reqMerchant();
            if(result.code == 200) {
                this.info = result.data
            }
        }
    }
}
</script>