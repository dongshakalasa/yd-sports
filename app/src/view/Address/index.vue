<template>
  <div>
    <van-nav-bar
    title="地址设置"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-address-list
    v-model="chosenAddressId"
    default-tag-text="默认"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    />
</div>
</template>

<script>
export default {
    name:'Address',
    data(){
        return {
            chosenAddressId:0,
            list: [],
            state:0,
        }
    },
    methods: {
        async getData(){
            const result =  await this.$API.reqUserAddress();
            if(result.code == 200) {
                this.list = result.data
            }
        },
        onClickLeft(){
            history.back()
        },
        onAdd() {
            st('新增地址');
        },
        onEdit(item) {
            const {id} = item
            this.$router.push({
                name:'addressset',
                params: {id:id}
            })
        },
    },
    mounted(){
        this.state = this.$route.query.id;
        this.getData()
    },
    watch:{
        list:{
            immediate:true,//初始化时执行一次handler
            handler(newValue,oldValue){
                this.list.some(item=>{
                    if(item.isDefault == 1) {
                        this.chosenAddressId = item.id
                    }
                }) 
            }
        },
        chosenAddressId:{
            immediate:true,
            handler(newValue,oldValue) {
                if(this.state == 1) {
                    // 整理参数
                    let address = {};
                    this.list.some(item=>{
                        if(item.id == this.chosenAddressId) {
                            address = item;
                        }
                    })
                    this.$router.replace({
                        path:"/pay",
                        query:{
                            address:address
                        }
                    });
                }
            }
        }
    }
}
</script>

<style>

</style>