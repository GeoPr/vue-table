import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Choice from '../pages/Choice.vue';
import Home from '@/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Choice',
        component: Choice,
    },
    {
        path: '/home/:urlType',
        name: 'Home',
        component: Home,
    },
];

export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
