const routes = [
  {
    path: '/',
    component: () => import('src/views/layouts/EmptyLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '/',
        component: () => import('src/views/layouts/MainLayout.vue'),
        redirect: to => { return '/about' },
        children: [
          {
            path: '/login',
            name: '/login',
            component: () => import('src/controllers/auth/SigninView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/register',
            name: '/register',
            component: () => import('src/controllers/auth/JoinView.vue'),
            meta: { requiresAuth: false }
          },
          {
            path: '/about',
            name: '/about',
            component: () => import('src/controllers/AboutController.vue'),
            meta: {
              breadcrumbName: 'About',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users',
            name: '/lists/users',
            component: () => import('src/controllers/lists/users/UserListController.vue'),
            meta: {
              breadcrumbName: 'Users',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/users/:rId/:rName',
            name: '/lists/users/:rId/:rName',
            component: () => import('src/controllers/lists/users/UserReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/users',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/brands',
            name: '/lists/brands',
            component: () => import('src/controllers/lists/brands/BrandListController.vue'),
            meta: {
              breadcrumbName: 'Brands',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/brands/:rId/:rName',
            name: '/lists/brands/:rId/:rName',
            component: () => import('src/controllers/lists/brands/BrandReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/brands',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/TestEntity',
            name: '/lists/TestEntity',
            component: () => import('src/controllers/lists/test-entity/TestEntityListController.vue'),
            meta: {
              breadcrumbName: 'TestEntity',
              breadcrumbParentName: '',
              requiresAuth: false,
            },
          },
          {
            path: '/lists/TestEntity/:rId/:rName',
            name: '/lists/TestEntity/:rId/:rName',
            component: () => import('src/controllers/lists/test-entity/TestEntityReadController.vue'),
            meta: {
              breadcrumbName: ':rName',
              breadcrumbParentName: '/lists/brands',
              requiresAuth: false,
            },
          }
        ],
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/controllers/ErrorNotFound.vue'),
    meta: { requiresAuth: false }
  }
];

export default routes;
