import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectListView.vue'),
    },
    {
      path: '/workspace/:projectId',
      name: 'workspace',
      component: () => import('@/workspace/Workspace.vue'),
    },
    {
      path: '/share/:data',
      name: 'share',
      component: () => import('../views/ShareView.vue'),
    },
    {
      path: '/example-projects',
      name: 'example-projects',
      component: () => import('@/views/ExampleProjectsView.vue'),
    },
    {
      path: '/docs/:path*',
      name: 'docs',
      component: () => import('@/views/DocsView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
    },
  ],
});
