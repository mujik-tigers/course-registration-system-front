import { createRouter, createWebHistory } from 'vue-router';

import WebLogin from './views/Login'
import WebNotice from './views/Notice'
import WebBasket from './views/Basket'

const routes = [
    { path: "/", component: WebLogin },
    { path: "/notice", component: WebNotice },
    { path: "/basket", component: WebBasket }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router }
