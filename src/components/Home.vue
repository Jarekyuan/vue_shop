<template>
  <div id="app">
      <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>




<script>
    export default {
        methods: {
            // 退出功能：清除token，重定向到登录页
            logout() {
                window.sessionStorage.clear();
                this.$router.push('/login');
            }
        }
    }
</script>




<style lang="less" scoped>

</style>