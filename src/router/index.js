import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path : '/',
        component : () => import('../components/view/FirstPage.vue')
    },
    {
        path : '/moviebox',
        component : () => import('../components/view/MovieBox.vue')
    },
    {
        path: '/update/:id',
        name: 'update',
        component: () => import('../components/view/UpdateMovie.vue')
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import('../components/view/EachMovie.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router