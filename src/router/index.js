import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login/index.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard/index.vue')
  },
  {
    path: '/users/company',
    name: 'CompanyUsers',
    component: () => import('@/pages/UserManagement/index.vue')
  },
  {
    path: '/attendance/records',
    name: 'AttendanceRecords',
    component: () => import('@/pages/AttendanceRecord/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.path === '/login') {
    if (token) {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});

export default router; 