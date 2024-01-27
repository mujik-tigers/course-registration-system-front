import { createRouter, createWebHistory } from 'vue-router';

import WebLogin from './views/Login'
import WebNotice from './views/Notice'
import WebBasket from './views/Basket'
import WebEnrollment from './views/Enrollment'

const routes = [
    { path: "/", component: WebLogin },
    { path: "/notice", component: WebNotice },
    { path: "/basket", component: WebBasket },
    { path: "/enrollment", component: WebEnrollment },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export { router }
