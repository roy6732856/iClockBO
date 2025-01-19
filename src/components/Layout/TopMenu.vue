<template>
  <header class="top-menu">
    <div class="logo">打卡系統</div>
    <div class="user-info">
      <el-avatar :icon="UserFilled" />
    </div>
  </header>
</template>

<script>
import { UserFilled } from '@element-plus/icons-vue'

export default {
  name: 'TopMenu',
  data() {
    return {
      UserFilled
    }
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