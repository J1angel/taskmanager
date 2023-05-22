import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../layouts/LayoutPage'
import TaskView from '../views/TaskView'
import Login from '../views/LoginView'
import { metaCheck1 } from '@/router/metacheck1'

Vue.use(VueRouter)

const childRoutes = (prop) => [
        {
            path: '/dashboard',
            name: prop + '.home',
            component: TaskView,
            beforeEnter: async (to, from, next) => {
               if (metaCheck1()){
                   next()
               }else {
                   window.location.href = "http://localhost:8080/";
               }
            }
        },
    ]

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        children: childRoutes('dashboard')
    },
    {
        path: '/',
        name: 'auth1',
        component: Login,
    },
]
const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router
