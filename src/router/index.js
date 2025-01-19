import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import UserManagement from '../pages/UserManagement.vue';
import AttendanceRecord from '../pages/AttendanceRecord.vue';
import Login from '../pages/Login.vue';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: UserManagement },
  { path: '/attendance', component: AttendanceRecord },
  { path: '/login', component: Login },
  { path: '/', redirect: '/dashboard' } // 預設路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 