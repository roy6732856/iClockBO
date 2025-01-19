<template>
  <div class="side-menu">
    <div class="logo-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
      <span class="logo-text">愛打卡 HR</span>
    </div>
    
    <el-menu
      :default-active="activeMenu"
      class="menu-container"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in menuItems" :key="item.id">
        <!-- 沒有子選單的選項 -->
        <el-menu-item 
          v-if="!item.children"
          :index="item.path"
          @click="handleSelect(item.path)"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>
            <span>{{ item.title }}</span>
          </template>
        </el-menu-item>

        <!-- 有子選單的選項 -->
        <el-sub-menu 
          v-else 
          :index="String(item.id)"
        >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          
          <el-menu-item
            v-for="child in item.children"
            :key="child.id"
            :index="child.path"
            @click="handleSelect(child.path)"
          >
            {{ child.title }}
          </el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>

    <div class="menu-footer">
      <el-button
        type="text"
        class="collapse-button"
        @click="toggleCollapse"
      >
        <el-icon>
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeFilled, User, Timer, Expand, Fold } from '@element-plus/icons-vue';
import { menuItems } from '@/constants/menuConfig';

export default {
  name: 'SideMenu',
  components: {
    HomeFilled,
    User,
    Timer,
    Expand,
    Fold
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isCollapse = ref(false);

    const activeMenu = computed(() => route.path);

    const handleSelect = (path) => {
      router.push(path);
    };

    const toggleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    return {
      menuItems,
      activeMenu,
      isCollapse,
      handleSelect,
      toggleCollapse
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.side-menu {
  width: v-bind('isCollapse ? "64px" : "250px"');
  height: 100vh;
  background: #001529;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
}

.logo-container {
  height: 64px;
  padding: 16px;
  display: flex;
  align-items: center;
  background: #002140;
  overflow: hidden;
  
  .logo-image {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    flex-shrink: 0;
  }
  
  .logo-text {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    opacity: v-bind('isCollapse ? 0 : 1');
    transition: opacity 0.3s;
  }
}

.menu-container {
  flex: 1;
  border-right: none;
  
  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;
    
    &.is-active {
      background: #1890ff !important;
    }
    
    &:hover {
      background: #1890ff40 !important;
    }
  }
  
  :deep(.el-sub-menu__title) {
    &:hover {
      background: #1890ff40 !important;
    }
  }
}

.menu-footer {
  padding: $spacing-md;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  
  .collapse-button {
    color: #fff;
    
    &:hover {
      background: #1890ff40;
    }
  }
}
</style> 