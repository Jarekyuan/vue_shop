import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)


// 路由规则
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/home',
        component: Home
    }]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') return next();
//     // 获取token
//     const tokenStr = window.sessionStorage.getItem('token');
//     // 强制跳转到登录页
//     if (!tokenStr) return next('/login')
//     next()
// })

export default router