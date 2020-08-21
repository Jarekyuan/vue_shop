<template>
  <div id="app" class="login_container">
      <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>


            <!-- ------------------------表单区------------------------ -->
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="ruleForm">

              <!-- 用户名 -->
              <el-form-item prop="username">
                <el-input type="text" prefix-icon="iconfont icon-user" v-model="loginForm.username"  ></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="password">
                <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" ></el-input>
              </el-form-item>
              <!-- 按钮 -->
              <el-form-item class="btns">
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>


      </div>
  </div>
</template>


<script>
export default {
    data() {
      return {
          // 1.登录表单的数据绑定对象
          loginForm: {
              username:'',
              password:''
          },
          // 2.验证规则
          rules: {
              username: [
                { required: true, message: '请输入登录名', trigger: 'blur' },
                { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
              ],
              password: [
                { required: true, message: '请输入登录密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ]
          }
      }
    },
    methods: {
      // 3.登录
      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          // 表单规则合法
          if (!valid) return;
            // 登录成功发送请求
            const { data: res } = await this.$http.post('login', this.loginForm);
            // 提示信息
            if(res.meta.status == !200) return this.$message.error('登录失败');  
            this.$message.success('登录成功');
            // 成功后给session中添加token值，跳转到主页
            // window.sessionStorage.setItem('token', res.data.token);
            this.$router.push('/home');
        });
      },
      // 4.重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>



<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
}
.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #ccc;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left:50%;
        transform: translate(-50%,-50%);

        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .btns{
        display: flex;
        justify-content: flex-end;
    }
}
</style>
