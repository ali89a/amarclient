export default [
  {
    path: '/login',
    name: 'user.login',
    component: () => import('@/views/Login.vue'),
    meta: {
      guestUserOnly: true,
      layout: 'full',
    },
  },
  {
    path: '/register',
    name: 'user.register',
    component: () => import('@/views/Register.vue'),
    meta: {
      guestUserOnly: true,
      layout: 'full',
    },
  },
  {
    path: '/verify',
    name: 'user.email.verify',
    component: () => import('@/views/shop/verify.vue'),
    meta: {
      layout: 'full',
      guestUserOnly: true,
    },
  },
  {
    path: '/',
    name: 'user.homepage',
    component: () => import('@/views/Home.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Home',
    },
  },
  {
    path: '/client',
    name: 'shop.client',
    component: () => import('@/views/shop/client/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Client',
      breadcrumb: [
        {
          text: 'Client list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/client/create',
    name: 'shop.client.create',
    component: () => import('@/views/shop/client/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create client',
      breadcrumb: [
        {
          text: 'Client',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/client/edit/:id',
    name: 'shop.client.edit',
    component: () => import('@/views/shop/client/Edit.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Edit client',
      breadcrumb: [
        {
          text: 'Client',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/supplier',
    name: 'shop.supplier',
    component: () => import('@/views/shop/supplier/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Suppliers',
      breadcrumb: [
        {
          text: 'Supplier list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/supplier/create',
    name: 'shop.supplier.create',
    component: () => import('@/views/shop/supplier/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create supplier',
      breadcrumb: [
        {
          text: 'Supplier',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/supplier/edit/:id',
    name: 'shop.supplier.edit',
    component: () => import('@/views/shop/supplier/Edit.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Edit supplier',
      breadcrumb: [
        {
          text: 'Supplier',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/purchase',
    name: 'shop.purchase',
    component: () => import('@/views/shop/purchase/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Purchases',
      breadcrumb: [
        {
          text: 'purchase list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/purchase/create',
    name: 'shop.purchase.create',
    component: () => import('@/views/shop/purchase/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create purchase',
      breadcrumb: [
        {
          text: 'purchase',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/purchase/edit/:id',
    name: 'shop.purchase.edit',
    component: () => import('@/views/shop/purchase/Edit.vue'),
    meta: {
      authOnly: true,
      pageTitle: 'Edit purchase',
      breadcrumb: [
        {
          text: 'purchase',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sale',
    name: 'shop.sale',
    component: () => import('@/views/shop/sale/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Sales',
      breadcrumb: [
        {
          text: 'Sales list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sale/create',
    name: 'shop.sale.create',
    component: () => import('@/views/shop/sale/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create sale',
      breadcrumb: [
        {
          text: 'Sale',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/sale/edit/:id',
    name: 'shop.sale.edit',
    component: () => import('@/views/shop/sale/Edit.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Edit sale',
      breadcrumb: [
        {
          text: 'Sale',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaction',
    name: 'shop.transaction',
    component: () => import('@/views/shop/transaction/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Transaction',
      breadcrumb: [
        {
          text: 'Transaction list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaction/create',
    name: 'shop.transaction.create',
    component: () => import('@/views/shop/transaction/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create transaction',
      breadcrumb: [
        {
          text: 'transaction',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/transaction/edit/:id',
    name: 'shop.transaction.edit',
    component: () => import('@/views/shop/transaction/Edit.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Edit transaction',
      breadcrumb: [
        {
          text: 'transaction',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product',
    name: 'shop.product',
    component: () => import('@/views/shop/product/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'product',
      breadcrumb: [
        {
          text: 'product list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/create',
    name: 'shop.product.create',
    component: () => import('@/views/shop/product/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create product',
      breadcrumb: [
        {
          text: 'product',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
  {
    path: '/product/edit/:id',
    name: 'shop.product.edit',
    component: () => import('@/views/shop/product/Edit.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Edit product',
      breadcrumb: [
        {
          text: 'product',
        },
        {
          text: 'Edit',
          active: true,
        },
      ],
    },
  },
  {
    path: '/emi',
    name: 'shop.emi',
    component: () => import('@/views/shop/emi/Index.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'EMI',
      breadcrumb: [
        {
          text: 'EMI list',
          active: true,
        },
      ],
    },
  },
  {
    path: '/emi/create',
    name: 'shop.emi.create',
    component: () => import('@/views/shop/emi/Create.vue'),
    meta: {
      authUserOnly: true,
      pageTitle: 'Create EMI',
      breadcrumb: [
        {
          text: 'Emi',
        },
        {
          text: 'Create',
          active: true,
        },
      ],
    },
  },
]
