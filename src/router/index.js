import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path : '/',
        component : () => import('../components/MovieBox.vue')
    },
    {
        path : '/navbar',
        component : () => import('../components/header/Navbar.vue')
    },
    {
        path : '/moviebox',
        component : () => import('../components/MovieBox.vue')
    },
    {
        path: '/update/:id',
        name: 'update',
        component: () => import('../components/UpdateMovie.vue')
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import('../components/EachMovie.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router