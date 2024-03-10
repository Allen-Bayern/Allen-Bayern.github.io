import { createRouter, createWebHashHistory } from 'vue-router';
import { DefaultLayout } from '@/layouts';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'defaultLayout',
            redirect: '/home',
            component: DefaultLayout,
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
                },
                {
                    path: 'article-page',
                    name: 'article',
                    component: () => import(/* webpackChunkName: "article-page" */ '../views/ArticleView.vue'),
                },
            ],
        },

        // 404页面
        {
            path: '/404',
            name: 'not-found',
            component: () => import(/* webpackChunkName: "not-found" */ '../views/Page404.vue'),
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
