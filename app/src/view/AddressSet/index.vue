<template>
    <div class="w">
        <van-nav-bar
        title="地址编辑"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-address-edit
        :address-info="AddressInfo"
        :area-list="areaList"
        show-delete
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
export default {
  name: 'AddressSet',
  data() {
    return {
      areaList,
      AddressInfo: {
        // 省市
        province:'',
        // 城市
        city:'',
        // 区
        county:'',
        // 地址详细信息
        addressDetail: '',
        // 姓名
        name:'张云飞',
        // 电话
        tel:'18639998362'

      }
    };
  },
  methods: {
    // 初始化
    async getData(id){
      const result = await this.$API.reqUserAddressInfo(id);
      if(result.code == 200) {
        this.AddressInfo = result.data
      }
    },
    // 更新地址信息
    async onSave(info) {
      const result = await this.$API.reqUpdateUserAddressInfo(info);
      if(result.code == 200) {
        this.onClickLeft();
        Toast.success("保存成功")
      }else {
        Toast.fail("保存失败！")
      }
    },
    // 删除地址
    async onDelete(info) {
      const {id} = info
      const result = await this.$API.reqDeleteUserAddressInfo(id);
      if(result.code == 200) {
        this.onClickLeft()
        Toast.success("删除成功！")
      }
    },
    onClickLeft(){
        history.back()
    }
  },
  mounted(){
    const id = this.$route.params.id;
    if(id !== 0) {
      this.getData(id)
    }
  }
};
</script>

<style>

</style>