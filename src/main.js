// -----------------入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入 axios 包
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/' //配置请求根路径
Vue.prototype.$http = axios //通过this可以访问 $http





Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')