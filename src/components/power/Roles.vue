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
                <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
            </el-row>

            <!-- 角色列表 -->
            <el-table :data="rolesList" border stripe>
                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :key="item1.id"  v-for="item1 in scope.row.children" :class="vcenter">
                            <!-- 一级权限 -->
                            <el-col :span="5">
                                <el-tag>{{item.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二级三级权限 -->
                            <el-col :span="19">
                                <el-row :key="item2.id"  v-for="item2 in item1.children" :class="vcenter">
                                    <!-- 二级 -->
                                    <el-col :span="6">
                                        <el-tag type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <!-- 三级 -->
                                    <el-col :span="18">
                                        <el-tag type="warning" :key="item3.id"  v-for="item3 in item2.children">
                                            {{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>                                     
                    </template>
                </el-table-column>                
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <!-- 主体 -->
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>                
                <el-table-column label="操作" width="290">
                    <template>
                        <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog">分配权限
                        </el-button>                        
                    </template>
                </el-table-column>                
            </el-table>   
        </el-card>

        <!-- 分配权限的对话框 -->
        <el-dialog title="分配权限" :visible.sync="SetRightDialogVisible" width="30%" >

            <!-- 树形控件展示所有权限 -->
            <el-tree :data="rightslist2" :props="treeProps" show-checkbox node-key="id" default-expand-all></el-tree>
               
            <!-- 操作按钮 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="SetRightDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="SetRightDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import RightsVue from './Rights.vue';
export default {
    data() {
        return {
            rolesList: [
                {
                    "id": 30,
                    "roleName": "主管",
                    "roleDesc": "技术负责人",
                    "children": [
                        {
                            "id": 101,
                            "authName": "商品管理",
                            "path": null,
                            "children": [
                                {
                                    "id": 104,
                                    "authName": "商品列表",
                                    "path": null,
                                    "children": [
                                        {
                                            "id": 105,
                                            "authName": "添加商品",
                                            "path": null
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                        }                       
            ],
            // 控制分配权限对话框显示与隐藏
            SetRightDialogVisible: false,
            // 选中的分配权限的所有数据
            rightslist2: [
                          {
                  id: 101,
                  authName: '商品管理',
                  path: null,
                  pid: 0,
                  children: [
                    {
                      id: 104,
                      authName: '商品列表',
                      path: null,
                      pid: 101,
                      children: [
                        {
                          id: 105,
                          authName: '添加商品',
                          path: null,
                          pid: '104,101'
                        }
                      ]
                    }
                  ]
                }
            ],
            // 树形控件属性绑定对象
            treeProps: {
                label: 'authName',
                children: 'children'
            }
        }   
    },

    created() {
        this.getRolesList()
    },

    methods: {
        // 获取权限列表
        async getRolesList() {
            const { data: res } = await this.$http.get('roles');
                console.log(res);    // res为data数组和meta对象
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // data数据绑定，并且渲染页面
                this.rolesList = res.data
        },
        
        // 展示分配权限的对话框
        async showSetRightDialog() {  
            // 获取所有权限的数据
            const { data: res } = await this.$http.get('rights/tree');
            if(res.meta.status == 200) return this.$message.error(res.meta.msg);
            // 赋值给data()
            this.rightslist2 = res.data;
            // 显示带值的对话框
            this.SetRightDialogVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>
.el-table {
    margin-top: 20px;
}
.el-tag {
    margin: 7px;
}
.vcenter {
    display: flex;
    align-items: center;
}
</style>