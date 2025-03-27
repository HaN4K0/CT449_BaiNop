import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginUserView.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('../views/SignupUserView.vue'),
        },
        {
            path: '/book/:id',
            name: 'book',
            component: () => import('../views/DetailBook.vue'),
            props: true,
        },
        {
            path: '/history',
            name: 'history',
            beforeEnter(to, from, next) {
                const user = useUserStore();
                if (user.token) {
                    next();
                } else {
                    next('/login');
                }
            },
            component: () => import('../views/HistoryView.vue'),
        },
        {
            path: '/loginmanager',
            name: 'loginmanager',
            component: () => import('../views/LoginManagerView.vue'),
        },
        {
            path: '/manager',
            name: 'manager',
            component: () => import('../views/ManagerView.vue'),
            beforeEnter(to, from, next) {
                const user = useUserStore();
                if (user.token && user.userInfor.ChucVu) {
                    next();
                } else {
                    next('/loginmanager');
                }
            },
            children: [
                {
                    path: '',
                    name: 'book-default',
                    component: () => import('../components/Manager/BorrowBook.vue'),
                },
                {
                    path: 'book',
                    name: 'manager-book',
                    component: () => import('../components/Manager/Book.vue'),
                },
                {
                    path: 'nxb',
                    name: 'manager-nxb',
                    component: () => import('../components/Manager/Nxb.vue'),
                    // children: [

                    //     {
                    //         path: 'edit/:manxb',
                    //         name: 'edit-nxb',
                    //         component: () => import('../components/Manager/NXB/NxbEdit.vue'),
                    //         props: true,
                    //     },
                    // ],
                },
                {
                    path: 'nxb/add',
                    name: 'add-nxb',
                    component: () => import('../components/Manager/NXB/NxbAdd.vue'),
                },
                {
                    path: 'nxb/edit/:manxb',
                    name: 'edit-nxb',
                    component: () => import('../components/Manager/NXB/NxbEdit.vue'),
                    props: true,
                },
                {
                    path: 'book/add',
                    name: 'add-book',
                    component: () => import('../components/Manager/Book/BookAdd.vue'),
                },
                {
                    path: 'book/edit/:masach',
                    name: 'edit-book',
                    component: () => import('../components/Manager/Book/BookEdit.vue'),
                    props: true,
                },
                {
                    path: 'borrow',
                    name: 'manager-borrow',
                    component: () => import('../components/Manager/BorrowBook.vue'),
                },
            ],
        },

        // {
        //     path: '*',
        //     name: 'not-found',
        //     component: () => import('../views/NotFoundView.vue'),
        // },
    ],
});

export default router;
