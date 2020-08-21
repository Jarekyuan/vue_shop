import Vue from 'vue'
import VueRouter from 'vue-router'


//------------------------------------------------- 路由懒加载
// import Login from '../components/login.vue'
const Login = () =>
    import ( /* webpackChunkName:"login_home_welcome" */ '../components/Login.vue');

// import Home from '../components/Home.vue'
const Home = () =>
    import ( /* webpackChunkName:"login_home_welcome" */ '../components/Home.vue');

// import Welcome from '../components/Welcome.vue'
const Welcome = () =>
    import ( /* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')


//----------------------------------------------------
// import Users from '../components/user/User.vue'
const Users = () =>
    import ( /* webpackChunkName:"user" */ '../components/user/Users.vue');

// import Rights from '../components/power/Rights.vue'
const Rights = () =>
    import ( /* webpackChunkName:"power" */ '../components/power/Rights.vue');

// import Roles from '../components/power/Roles.vue'
const Roles = () =>
    import ( /* webpackChunkName:"power" */ '../components/power/Roles.vue');


//---------------------------------------------------
// import Cate from '../components/goods/Cate.vue'
const Cate = () =>
    import ( /* webpackChunkName:"goods" */ '../components/goods/Cate.vue');

// import Params from './components/goods/Params.vue'  
const Params = () =>
    import ( /* webpackChunkName:"goods" */ '../components/goods/Params.vue');


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
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: Welcome
        }, {
            path: '/users',
            component: Users
        }, {
            path: '/rights',
            component: Rights
        }, {
            path: '/roles',
            component: Roles
        }, {
            path: '/categories',
            component: Cate
        }, {
            path: '/goods',
            component: Params
        }]
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