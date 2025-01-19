<template>
    <header class="top-menu">
      <div class="logo">打卡系統</div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar :icon="UserFilled" />
            {{ username }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
  </template>
  
  
  <script>
  import { UserFilled } from '@element-plus/icons-vue'
  
  export default {
    name: 'TopMenu',
    data() {
      return {
        UserFilled,
        username: '' // 用於顯示當前用戶名
      }
    },
    methods: {
      handleLogout() {
        // 登出邏輯
        this.username = ''
        this.$router.push('/login') // 跳轉到登入頁面
      }
    },
    created() {
      // 獲取當前用戶名
      this.username = localStorage.getItem('username') || ''
    }
  }
  </script>
  
  <style scoped>
  .top-menu {
    background: #FFD54F;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  
  .user-info {
    cursor: pointer;
  }
  </style>