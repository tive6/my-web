import Vue from 'vue'
import Router from 'vue-router'
// import store from './../store'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/index'),
        meta: {
            title: 'My Heart ♥^♥',
        },
    },
    {
        path: '/huan',
        name: 'huan',
        component: () => import('../views/huan/index.vue'),
        meta: {
            title: '欢欢 ♥^♥',
        },
    },
    {
        path: '/xu',
        name: 'xu',
        component: () => import('../views/xu/index.vue'),
        meta: {
            title: 'xu',
        },
    },
    {
        path: '*',
        redirect: '/',
    },
]

const routers = new Router({
	// mode: 'history',
    linkActiveClass: '',
    linkExactActiveClass: 'bt-item-active',
	routes: [
		...routes
	]
})

routers.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // store.dispatch('User/getUserToken')
    next()
})

export default routers