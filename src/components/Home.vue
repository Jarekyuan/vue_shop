<template>

    <el-container class="home-container">   
         <!-- ------------头部---------------  -->
        <el-header>
            <div>
                <img src="../assets/logo002.jpg" alt="">
                <span>后台管理系统</span>
            </div>
            <el-button type="info" round @click="logout">退出</el-button>
        </el-header>

         <!---------------主体---------------  -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse"> || </div>

                <!-- 侧边栏菜单区 -->
                <!-- unique-opened 是否只保持一个子菜单的展开
                    collapse 是否水平折叠收起菜单  router 是否使用 vue-router 的模式 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="true" :collapse-transition="false" :router="true"   :default-active="activePath">

                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" :key="item.id" v-for="item in menulist">
                      <template slot="title">
                        <i class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                      </template>

                      <!-- 二级菜单 -->
                      <el-menu-item :index="'/'+ subitem.path" :key="subitem.id" v-for="subitem in item.children" @click="saveNavstate('/'+ subitem.path)">
                          <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                          </template>
                      </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!-- 右侧内容 -->
            <el-main>
                <!-- welcome 占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  
</template>


<script>
    export default {
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                // 菜单id=图标
                iconsObj: {
                    '125': 'iconfont icon-users',
                    '103': 'iconfont icon-tijikongjian',
                    '101': 'iconfont icon-3702mima',
                    '102': 'iconfont icon-danju',
                    '145': 'iconfont icon-baobiao'
                },
                // 判断菜单是否折叠
                isCollapse: false,
                // 被激活的链接的地址
                activePath:''
            }
        },
        created() {
            // 生命周期函数后台数据
            this.getMenuList()
            this.activePath = window.sessionStorage.getItem('activePath')
        },
        methods: {
            // 退出功能：清除token，重定向到登录页
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            },
            // 获取所有的菜单
            async getMenuList() {
                const { data: res } = await this.$http.get('menus');
                console.log(res);    // res为data数组和meta对象
                if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
                this.menulist = res.data
            },
            // 点击按钮，切换菜单折叠与展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
            },
            // 保存链接的激活状态（高亮显示目前菜单）
            saveNavstate(activePath) {
                window.sessionStorage.setItem('activePath', activePath) // session存的是path值
                this.activePath = activePath
            }
        }
    }
</script>



<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header {
        background-color: #373d41; 
        display: flex;
        justify-content: space-between; 
        align-items: center; 
        padding-left: 0;  
        color: #fff;
        font-size: 20px;    
        
        div {
            display: flex;
            align-items: center; 

             img {
            width: 64px;
            height: 60px;
            margin-right: 15px;
            }
        }
       

    }
    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }
    .el-main {
        background-color: #eaedf1;
    }
    .iconfont {
        margin-right: 10px;
    }
    .toggle-button {
        background-color: #4a5064;
        font-size: 15px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>