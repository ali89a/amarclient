export default [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/admin/Login.vue'),
    meta: {
      guestAdminOnly: true,
      layout: 'full',
    },
  },
  {
    path: '/admin/home',
    name: 'admin.homepage',
    component: () => import('@/views/admin/Home.vue'),
    meta: {
      authAdminOnly: true,
      pageTitle: 'Home',
    },
  },
  {
    path: '/admin/shop',
    name: 'admin.shop',
    component: () => import('@/views/admin/shop/Index.vue'),
    meta: {
      authAdminOnly: true,
      pageTitle: 'Shops',
      breadcrumb: [
        {
          text: 'Shop list',
          active: true,
        },
      ],
    },
  },
]
