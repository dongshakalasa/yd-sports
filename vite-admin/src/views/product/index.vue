<style>
.rate {
    color: #669bc9;
    cursor: pointer;
}

.top {
    display: flex;
    justify-content: space-between;
}

.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>

<template>
    <div>
        <div class="top">
            <div class="left" style="width: 300px;display: flex">
                <div style="width: 180px; ">
                    <el-input placeholder="根据商品介绍搜索" v-model="input">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
                <div style="margin-left: 10px">
                    <el-button icon="el-icon-search" circle></el-button>
                </div>
            </div>
            <div class="right">
                <!-- 按钮 -->
                <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px" @click="showDialog">添加</el-button>
            </div>
        </div>  
        <el-table 
            :data="list" 
            style="width: 100%"
            border>
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column label="默认图片" width="180" align="center">
                <template slot-scope="{row}">
                    <img :src="row.tpt_img" alt="" style="width:100px;height:100px">
                </template>
            </el-table-column>
            <el-table-column prop="tpt_text" label="商品介绍" width="250" align="center"></el-table-column>
            <el-table-column prop="tpt_brand" label="品牌" width="130" align="center">
            </el-table-column>
            <el-table-column prop="tpt_sort" label="商品类别" width="130"  align="center">
            </el-table-column>
            <el-table-column prop="tpt_price" label="价格" width="150"  align="center">
            </el-table-column>
            <el-table-column prop="tpt_sales" label="销量" width="130"  align="center">
            </el-table-column>
            <el-table-column prop="tpt_store" label="库存" width="180"  align="center">
            </el-table-column>
            <el-table-column label="用户评价" align="center" width="100">
                <template slot-scope="{row}">
                    <!-- 查看评论 -->
                    <a class="rate">查看评论</a>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                    <!-- 上架|下架 -->
                    <el-button icon="el-icon-bottom" type="info" size="mini" v-if="row.tpt_state==1" @click="handleState(row.tpt_id,0)">下架</el-button>
                    <el-button type="success" icon="el-icon-top" size="mini" v-else @click="handleState(row.tpt_id,1)">上架</el-button>
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateProduct(row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
             -->
        <el-pagination 
            style="margin-top: 20px; textAlign: center" 
            :current-page="page" 
            :total="total" 
            :page-size="limit"
            :page-sizes="[3, 5, 10]" 
            :page-count="7" 
            @current-change="getPageList" 
            @size-change="handleSizeChange"
            layout=" prev, pager, next, jumper,->,sizes,total">
        </el-pagination>

        <!-- 对话框 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="80px" >

                <el-form-item label="一级分类">
                    <el-select placeholder="请选择" v-model="form.tpt_category">
                        <el-option :label="tm" :value="tm" v-for="(tm,index) in categoryList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="请选择" v-model="form.tpt_sort">
                        <el-option :label="tm.tst_name" :value="tm.tst_name" v-for="tm in sortList" :key="tm.tst_id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-select placeholder="请选择" v-model="form.tpt_brand">
                        <el-option :label="tm.tbd_name" :value="tm.tbd_name" v-for="tm in brandList" :key="tm.tbd_id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 商品介绍 -->
                <el-form-item label="商品介绍">
                    <el-input placeholder="请输入产品介绍" v-model="form.tpt_text"></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="价格">
                    <el-input placeholder="请输入价格" v-model="form.tpt_price"></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="库存">
                    <el-input placeholder="请输入库存" v-model="form.tpt_store"></el-input>
                </el-form-item>
                <!-- 图片 -->
                <el-form-item label="商品图片">
                    <!-- 
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload" 
                          
                         -->
                    <el-upload 
                        action="#" 
                        :limit="4" 
                        :http-request="uploadPic" 
                        list-type="picture-card" 
                        :file-list="form.imgs" 
                        :on-remove="removeImgs"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <!-- 销售属性 -->
                <el-form-item label="销售属性">
                    <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrName">
                        <el-option :label="unselect" :value="unselect"
                            v-for="(unselect,index) in unSelectSaleAttr" :key="index"></el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;margin-left:10px"
                        :disabled="!attrName" @click="addAttr">添加销售属性</el-button>
                    <!-- 展示当前spu属于自己的销售属性 -->
                    <el-table style="width: 100%" border :data="form.attributeList">
                        <el-table-column type="index" label="序号" width="80" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="属性名" width="100">
                        </el-table-column>
                        <el-table-column label="属性值名称列表" width="width">
                            <template slot-scope="{row}">
                                <el-tag 
                                    :key="index" 
                                    v-for="(tag,index) in row.value" 
                                    closable 
                                    :disable-transitions="false"
                                    @close="row.value.splice(index,1)"> 
                                        {{ tag.taev_value }}
                                    </el-tag>
                                <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="mini"
                                    @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)"></el-input>
                                <el-button  class="button-new-tag" size="small" @click="addSaleAttrValue(row)" >添加</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="60">
                            <template slot-scope="{$index}">
                                <el-button type="danger" icon="el-icon-delete" size="mini"
                                    @click="form.attributeList.splice($index,1)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            // 代表分页器的第几页
            page: 1,
            // 当前页数展示数据条数
            limit: 3,
            // 总共数据条数
            total: 0,
            // 列表展示的数据
            list: [],
            // 表格
            // 对话框显示与隐藏
            dialogFormVisible: false,
            // 抽屉
            drawer: false,
            direction: 'rtl',
            // 添加商品收集信息
            form: {
                tpt_category:'',
                tpt_sort:'',
                tpt_brand: '',
                tpt_text:'',
                tpt_price:'',
                tpt_store: 0,
                imgs:[],
                attributeList:[]
            },
            categoryList:[],
            sortList:[],
            brandList: [],
            formLabelWidth: '120px',
            // 选择的平台属性名
            attrName:'',
            // 平台属性
            attributeNameList:[],
            title:'',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            //用来绑定加入的图片，后续用大图片预览
            dialogImageUrl: '',
            dialogVisible: false,
            input:''
        }
    },
    methods: {
        // 显示添加模态框
        showDialog(){
            // 清除数据
            this.form = {
                tpt_category: '',
                tpt_sort: '',
                tpt_brand: '',
                tpt_text: '',
                tpt_price: '',
                tpt_store: 0,
                imgs: [],
                attributeList: []
            }
            this.getPageList();
            this.title = "添加商品"
            this.dialogFormVisible = true;
            this.getData()
        },
        // 初始化一级分类、平台属性
        async getData(){
            const result = await this.$API.reqCategoryName()
            if (result.code == 200) {
                this.categoryList = result.data
            }
            const result2 = await this.$API.reqAttributeName();
            if (result2.code == 200) {
                this.attributeNameList = result2.data
            }
        },
        // 获取品牌列表的数据
        async getPageList(pager) {
            if(pager != undefined) {
                this.page = pager
            }
            // 解构出参数
            const { page, limit } = this
            let result = await this.$API.reqProduct(page, limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.list = result.data.products
            }
        },
        // 当分页器某一页需要展示数据条数发生变化的时候会触发
        handleSizeChange(limit) {
            this.limit = limit
            this.getPageList()
        },
        // 上架状态
        async handleState(id,state){
            const result = await this.$API.reqUpdateProductState(id,state)
            if(result.code == 200) {
                this.getPageList();
            }
        },
        // sort查询
        async categoryChange(name){
            const result = await this.$API.reqSort(name);
            if(result.code == 200) {
                this.sortList = result.data
            }
            const result2 = await this.$API.reqBrand(name)
            if(result2.code == 200) {
                this.brandList = result2.data
            }
        },
        // 添加商品属性
        addAttr(){
            // 整理向attributeNameList添加的数据
            let newAttr = {name:this.attrName,value:[]}
            this.form.attributeList.push(newAttr)
        },
        // el-input失去焦点的事件
        handleInputConfirm(row) {
            // 结构出销售属性中收集到的数据
            const {inputValue } = row
            // 新增的销售属性值的名称不能为空
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空')
                this.$refs.saveTagInput.focus()
                return;
            }
            // 属性值不能重复
            let result = row.value.every(item => item.taev_value != inputValue)
            if (!result) {
                this.$message('不能重复')
                return;
            }
            // 新增的销售属性值
            let newSaleAttrValue = {
                taev_value: inputValue
            }
            // 新增
            row.value.push(newSaleAttrValue)
            // 修改inputVisible的状态
            row.inputVisible = false
        },
        // 添加按钮的回调
        addSaleAttrValue(row) {
            // 给销售属性身上挂在响应式数据
            this.$set(row, 'inputVisible', true)
            // 通过响应式数据inputValue字段收集新增的响应式属性值
            this.$set(row, 'inputValue', '')
        },
        // 修改产品
        updateProduct(row){
            let imgsList = []
            row.imgs.forEach(item => {
                imgsList.push({url:item})
            });
            this.form = row
            this.form.imgs = imgsList
            this.getData()
            this.dialogFormVisible = true;
            // this.getPageList();
        },
        uploadPic(param) {
            console.log(param);
            var fileObj = param.file
            let name = 'http://vescow.pannifeng.top/' + fileObj.name;
            var form = new FormData()
            // 文件对象
            form.append('myfile', fileObj)
            axios
              .post('/api/merchant/product/upload', form)
              .then((res) => {
                console.log(res);
                //如果传入的响应状态码为200，则成功将文件发送给后台
                if (res.data.code === 200) {
                    this.form.imgs.push({ url: name })
                } else {
                  console.log(res.data.message)//这块是请求失败后台给返回的相应的数据
                }
              });
        },
        removeImgs(file,fileList){
            this.form.imgs = fileList
        },
        // 提交按钮
        async submit(){
            this.dialogFormVisible = false
            if(this.title == "添加商品") {
                this.form.tpt_store = this.form.tpt_store * 1
                const result = await this.$API.reqInsertProduct(this.form);
            }else {
                this.form.tpt_store = this.form.tpt_store * 1
                console.log(this.form);
                const result = await this.$API.reqUpdateProduct(this.form);
            }
            this.getPageList()
        }
    },
    mounted(){
        this.getPageList()
    },
    watch:{
        'form.tpt_category': {
            handler(newvalue) {
                this.categoryChange(newvalue)
            }
        }
    },
    computed: {
        // 计算出还未选择的属性
        unSelectSaleAttr() {
            let result = this.attributeNameList.filter(item => {
                return this.form.attributeList.every(item1 => {
                    return item != item1.name
                })
            })
            return result
        }
    }
}
</script>
