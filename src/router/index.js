import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../components/home/index.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post" */ '../components/post/index.vue')
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
        component: () => import(/* webpackChunkName: "admin.posts" */ '../components/admin/posts.vue')
      },
      {
        path: '/admin/post/:id',
        name: 'admin.post.edit',
        component: () => import(/* webpackChunkName: "admin.post.edit" */ '../components/admin/post/edit.vue')
      },

    ]
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
