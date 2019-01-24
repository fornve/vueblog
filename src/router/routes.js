export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../components/home/index.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "posts" */ '../components/post/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/index.vue'),
    children: [
      {
        path: '/admin/posts',
        name: 'admin.posts',
        component: () => import(/* webpackChunkName: "admin.posts" */ '../components/admin/posts/index.vue')
      },
      {
        path: '/admin/posts/:id',
        name: 'admin.post.edit',
        component: () => import(/* webpackChunkName: "admin.posts.edit" */ '../components/admin/posts/edit.vue')
      },
      {
        path: '/admin/media',
        name: 'admin.media',
        component: () => import(/* webpackChunkName: "admin.media" */ '../components/admin/media/index.vue')
      },
      {
        path: '/admin/media/:id',
        name: 'admin.media.edit',
        component: () => import(/* webpackChunkName: "admin.media.edit" */ '../components/admin/media/edit.vue')
      },
    ]
  }
]