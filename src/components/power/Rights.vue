<template>
    <div>
         <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <el-table :data="rightsList" border stripe>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <!-- 主体 -->
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level === '0'">一级权限</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level === '1'">二级权限</el-tag>
                        <el-tag type="warning" v-else>三级权限</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>


<script>
export default {
    data() {
        return {
            // 获取权限列表数据
            rightsList: [{
                "id": 101,
                "authName": "商品管理",
                "level": "0",
                "pid": 0,
                "path": goods
                },{
                "id": 102,
                "authName": "订单管理",
                "level": "1",
                "pid": 0,
                "path": parms
                },{
                "id": 103,
                "authName": "权限管理",
                "level": "3",
                "pid": 0,
                "path": null
            }],

        }
    },

    created() {
        this.getRightsList()
    },

    methods: {
        // 获取权限列表
        async getRightsList() {
            const { data: res } = await this.$http.get('rights/list');
                console.log(res);    // res为data数组和meta对象
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
                // data数据绑定，并且渲染页面
                this.rightsList = res.data

        }
    }
}
</script>

<style lang="less" scoped>

</style>