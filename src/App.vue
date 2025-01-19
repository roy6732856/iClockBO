<template>
  <div id="app">
    <div class="app-container" v-if="!isLoginPage">
      <side-menu />
      <div class="main-content">
        <top-menu />
        <div class="page-content">
          <router-view />
        </div>
      </div>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
import TopMenu from './components/Layout/TopMenu.vue'
import SideMenu from './components/Layout/SideMenu.vue'

export default {
  name: 'App',
  components: {
    TopMenu,
    SideMenu
  },
  computed: {
    isLoginPage() {
      return this.$route.path === '/login'
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 20px;
  background: #f5f5f5;
}
</style>
