<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>   
            <el-row :gutter="15">
                <el-col :span="9">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区 -->
            <el-table :data="userList" style="width: 100%" border stripe >
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="username" label="姓名" ></el-table-column>
                <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column prop="role_name" label="角色"></el-table-column>
                <el-table-column label="状态">
                    <!-- 作用域插槽渲染状态 -->
                    <template slot-scope="scope">
                        <!-- {{scope.row.mg_state}} -->
                        <el-switch v-model="scope.row.mg_state" @click="stateChange(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <!-- <template slot-scope="scope"> -->
                        <el-button type="primary" icon="el-icon-edit" size="mini">
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">
                        </el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    <!-- </template> -->
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
             <el-pagination  @size-change="handleSizeChange"  @current-change="handleCurrentChange"  :current-page="queryInfo.pagenum"  :page-sizes="[1, 2, 5, 10]"  :page-size="queryInfo.pagesize"  layout="total, sizes, prev, pager, next, jumper"  :total="total">
             </el-pagination>
        </el-card>

        <!-- 添加用户时弹出的对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" >

            <!-- 添加用户表单 -->
            <el-form  :model="addForm" :rules="addFormRules" ref="addFormRef">
                <!-- 用户名 -->
                <el-form-item prop="username">
                  用户名<el-input type="text"  v-model="addForm.username"  ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                  密码<el-input type="password"  v-model="addForm.password" ></el-input>
                </el-form-item>
                <!-- 邮箱 -->
                <el-form-item prop="email">
                  邮箱<el-input type="email"  v-model="addForm.email" ></el-input>
                </el-form-item>
                <!-- 手机 -->
                <el-form-item prop="mobile">
                  手机<el-input type="mobile"  v-model="addForm.mobile" ></el-input>
                </el-form-item>
            </el-form>
            <!-- 操作按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>




<script>

export default {
    data() {
        // 自定义手机和邮箱的验证规则
          var checkEmail = (rule, value, cb) => {
            const regEmail = /^\w+@\w+(\.\w+)+$/;
            if (regEmail.test(value)) return cb();
            cb(new Error('请输入合法的邮箱'));
          };
          var checkMobile = (rule, value, cb) => {
            const regMobile = /^1[34578]\d{9}$/;
            if (regMobile.test(value)) {
              return cb();
            }
            //返回一个错误提示
            cb(new Error('请输入合法的手机号码'));
          };


        return {
            // 1.获取用户列表参数对象
            queryInfo: {
                query: '',
                // 当前的页数
                pagenum: 1,
                // 当前每页显示的数据个数
                pagesize: 2
            },
            // 2.获取用户列表数据
            userList: [{
                "id": 25,
                "username": "tige117",
                "mobile": "18616358651",
                "type": 1,
                "email": "tige112@163.com",
                "create_time": "2017-11-09T20:36:26.000Z",
                "mg_state": true, // 当前用户的状态
                "role_name": "炒鸡管理员"
                },{
                "id": 15,
                "username": "sdar654",
                "mobile": "13616358651",
                "type": 1,
                "email": "tige11234@163.com",
                "create_time": "2017-11-09T20:36:26.000Z",
                "mg_state": false, // 当前用户的状态
                "role_name": "普通用户"
                }],
            total: 2,

            // 3.控制对话框的显示与隐藏
            addDialogVisible: false,

            // 4.添加用户的表单数据
            addForm: {
                username:'',
                password:'',
                email: '',
                mobile: ''
            },
            // 5.添加表单验证规则
            addFormRules: {
                username: [
                { required: true, message: '请输入登录名', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ],
              email: [
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { validator: checkEmail, trigger: 'blur' }
              ],
              mobile: [
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { validator: checkMobile, trigger: 'blur' }
              ]
            },
        }
    },
    created() {
        // this.getUserList()
    },
    methods: {
        // 1.获取用户信息列表
        async getUserList() {
            const { data: res } = await this.$http.get('users', { params: this.queryInfo });
                // console.log(res);    // res为data数组和meta对象
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // data数据绑定，并且渲染页面
                this.userList = res.data.users
                this.total = res.data.total
        },

        // 2.监听页数改变的事件
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.queryInfo.pagesize = val;
            this.getUserList();
        },
        // 2.监听页码值改变
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.queryInfo.pagenum = val;
            this.getUserList();
        },

        // 3.监听开关状态的改变
        async stateChange(val) {
            // console.log(val);
            const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
            if(res.meta.status !== 200) {
                // 如果操作失败，则重新回到原来的状态
                userinfo.mg_state = !userinfo.mg_state;
                return this.$message.error(res.meta.msg);
            }
            this.$message.success('更新状态成功！');         
        }
    }
}
</script>



<style lang="less" scoped>

.el-table {
    margin-top: 15px;
    font-size: 14px;
}
.el-pagination {
    margin-top: 20px;
}
</style>