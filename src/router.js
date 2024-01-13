import { createRouter, createWebHistory } from 'vue-router';

// Components
import WebLogin from './views/Login'
import WebNotice from './views/Notice'

const routes = [
    { path: "/", component: WebLogin },
    { path: "/notice", component: WebNotice }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router }
