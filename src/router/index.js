import {createRouter, createWebHistory} from 'vue-router'
import IndexView from "@/views/IndexView.vue";
import MapView from "@/views/MapView.vue";
import InfoView from "@/views/InfoView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
    {
        path: '/',
        name: 'IndexView',
        component: IndexView
    },
    {
        path: '/map',
        name: 'MapView',
        component: MapView
    },
    {
        path: '/map/:uid',
        name: 'MapViewFromIndex',
        component: MapView
    },
    {
        path: '/info/:title',
        name: 'InfoView',
        component: InfoView
    },
    {
        path: '/404',
        name: 'NotFoundView',
        component: NotFoundView
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

export default router
