<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片 -->
        <el-card>
            <el-row>
                <el-button type="primary" @click="addcateDialogVisible">添加分类</el-button>
            </el-row>

            <!-- 商品分类列表 -->
            <tree-table class="tree-table" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index  index-text="#" border>
                <!-- 是否有效 列 -->
                <template slot='isok' slot-scope="scope">
                    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: #67C23A;"></i>
                    <i class="el-icon-error" v-else style="color: #67C23A;"></i>
                </template>
                <!-- 排序 列 -->
                <template slot='order' slot-scope="scope">
                    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
                    <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                    <el-tag size="mini" type="warning" v-else>三级</el-tag>
                </template>
                <!-- 操作 列 -->
                <template slot='opt' >
                    <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                </template>                                
            </tree-table>

            <!-- 分页 -->
             <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange"  :current-page="queryInfo.pagenum"  :page-sizes="[1, 2, 5, 10]"  :page-size="queryInfo.pagesize"  layout="total, prev, pager, next, jumper"  :total="total">
             </el-pagination>            
        </el-card>

        <!-- ------- 添加分类的对话框 -->
        <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClose">
            <!-- 添加分类的表单 -->
            <el-form :model="addcateForm" :rules="addcateFormRules" ref="addcateFormRef" label-width="100px">
                <!-- 1111 -->
                <el-form-item label="分类名称：" prop="cat_name">
                    <el-input v-model="addcateForm.cat_name"></el-input>
                </el-form-item>
                <!-- 222 -->
                <el-form-item label="父级分类">
                    <!-- 级联选择器  options：数据源  props: 配置对象-->
                    <el-cascader v-model="inputKeys" :options="parentCateList"  :props="props" expand-trigger="hover"  @change="parentChanged" clearable change-on-select>
                    </el-cascader>
                </el-form-item>                
            </el-form>
            <!-- 操作按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCate">确 定</el-button>
            </span>
        </el-dialog>   

    </div>
</template>

<script>
export default {
    data() {
        return {

            // 商品分类列表数据
            cateList: [{
                "cat_id": 1,
                "cat_name": "大家电",
                "cat_pid": 0,
                "cat_level": 1,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 3,
                        "cat_name": "电视",
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 6,
                                "cat_name": "曲面电视",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 7,
                                "cat_name": "海信",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]}, {
                "cat_id": 1,
                "cat_name": "手机",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": true,
                "children": [
                    {
                        "cat_id": 3,
                        "cat_name": "iphone",
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 6,
                                "cat_name": "智能手机",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 7,
                                "cat_name": "小米",
                                "cat_pid": 3,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]}],
            
           
            // 查询条件（参数）
            queryInfo: {
                type:3,
                pagenum:1,
                pagesize:5
            },
            // 总数据条数
            total: 2,

            // 为table指定列的定义 columns中为数组
            columns: [{
                label:'分类名称',
                prop:'cat_name',
            },{
                label:'是否有效',
                type:'template',
                // 当前模板名称
                template: 'isok',
            },{
                label:'排序',
                type:'template',
                // 当前模板名称
                template: 'order',
            },{
                label:'操作',
                type:'template',
                // 当前模板名称
                template: 'opt',
            }],

            // 控制对话框的显示与隐藏
            addCateDialogVisible: false,

            // 对话框：添加分类的表单数据对象
            addcateForm: {
                cat_name: '',
                cat_pid: 0,
                cat_level: 0,
            },
            // 对话框：添加分类的表单验证规则
            addcateFormRules: {
                cat_name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                ]
            },

            // 对话框：父级分类数据列表(2级) 
            parentCateList: [
                    {
                "cat_id": 1,
                "cat_name": "大家电",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 3,
                        "cat_name": "电视",
                        "cat_pid": 1,
                        "cat_level": 1,
                        "cat_deleted": false,
                    }
                ]
            }],
            // 对话框：配置对象
            props: {
                value:'cat_id',
                label: 'cat_name',
                children: 'children',
            },

            // 双向绑定，选中的父级分类的id数组
            inputKeys: []

        }
    },

    created() {
        // this.getCateList()
    },

    methods: {
        // 获取商品数据分类
        async getCateList() {
            const { data: res } = await this.$http.get('categories', { params: this.queryInfo });
                console.log(res);    // res为data数组和meta对象
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // data数据绑定，并且渲染页面
                this.cateList = res.data.result;
                this.total = res.data.total
        },

        // 监听分页改变的事件
        handleSizeChange(val) {
            this.queryInfo.pagesize = val;
            this.getCateList();
        },
        // 监听页码改变的事件
        handleCurrentChange(val) {
            this.queryInfo.pagenum = val;
            this.getCateList();            
        },

        // 点击按钮，展示添加对话框
        addcateDialogVisible() {
            // 先获取父级分类数据列表
            this.getParentCateList();
            // 在展示对话框
            this.addCateDialogVisible = true;           
        },

        // 获取父级分类的数据列表（用于添加分类）
        async getParentCateList() {
            const { data: res } = await this.$http.get('categories', { params: {type: 2}});
                // console.log(res);    // res为data数组和meta对象
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // data数据绑定，并且渲染页面
                this.parentCateList = res.data;              
        },

        // 对话框父级分类 选则项发生变化时触发
        parentChanged() {
            // 如果 inputKeys 数组中的长度为0，说明没用选任何父级，则添加为一级分类；
            // 如果 inputKeys 数组中的长度为1，说明选中了一级父级，则添加为二级分类；
            // 如果 inputKeys 数组中的长度为2，说明选中了二级父级，则添加为三级分类；
            if(this.inputKeys.length > 0) {
                // 父级的 pid
                this.addcateForm.cat_pid = this.inputKeys[this.inputKeys.length -1];
                // 为当前等级赋值
                this.addcateForm.cat_level = this.inputKeys.length;
                return 
            } else {
                // 父级的 pid
                this.addcateForm.cat_pid = 0;
                // 为当前等级赋值
                this.addcateForm.cat_level = 0;
            }
        },



        // ++++对话框点击确定按钮事件(添加分类到数据库)
        addCate() {
            console.log(this.addcateForm);
            this.$refs.addcateFormRef.validate(async valid => {
                if(!valid) return;
                const { data: res } = await this.$http.post('categories', this.addcateForm);
                if(res.meta.status !== 201) return this.$message.error('添加分类失败');
                this.$message.success('添加分类成功！');
                this.getCateList();
                this.addCateDialogVisible = false;           
            })
        },
    }
}
</script>

<style lang="less" scoped>
.tree-table {
    margin-top: 20px;
    font-size: 14px;
}
.el-pagination {
    margin-top: 20px;
    margin-left: 10px;
}
.el-cascader {
    width: 100%;
}
</style>