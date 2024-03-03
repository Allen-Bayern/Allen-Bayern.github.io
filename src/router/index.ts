import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
        },
        // 404页面
        {
            path: '/404',
            name: 'NotFound',
            component: () => import(/* webpackChunkName: "NotFound" */ '../views/Page404.vue'),
        },
    ],
});

// router guard
router.beforeEach(to => {
    // 如果路由不存在，跳转到 404 页面
    if (!to.matched.length) {
        // 直接跳转 404 路由的路径
        return '/404';
    }

    return true;
});

export { router };
