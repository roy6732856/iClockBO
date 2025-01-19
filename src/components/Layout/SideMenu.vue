<template>
  <div class="side-menu">
    <div class="logo">LOGO</div>
    <el-menu
      :default-active="activeMenu"
      class="menu-container"
      @select="handleSelect"
    >
      <template v-slot:default>
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>儀表板</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <span>使用者管理</span>
        </el-menu-item>
        <el-menu-item index="/attendance">
          <el-icon><Timer /></el-icon>
          <span>打卡紀錄</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { HomeFilled, User, Timer } from '@element-plus/icons-vue'

export default {
  name: 'SideMenu',
  components: {
    HomeFilled,
    User,
    Timer
  },
  data() {
    return {
      activeMenu: '/dashboard'
    }
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index)
    }
  },
  created() {
    // 根據當前路由設置活動菜單項
    this.activeMenu = this.$route.path
  }
}
</script>

<style scoped>
.side-menu {
  width: 250px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.menu-container {
  border-right: none;
}

.logo {
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style> 