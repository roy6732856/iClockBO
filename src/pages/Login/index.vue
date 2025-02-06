<template>
  <div class="login-page">
    <div class="login-box">
      <h2>系統登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>帳號</label>
          <el-input 
            v-model="username" 
            placeholder="請輸入帳號"
            :disabled="loading"
          />
        </div>
        <div class="form-group">
          <label>密碼</label>
          <el-input 
            v-model="password" 
            type="password" 
            placeholder="請輸入密碼"
            :disabled="loading"
            show-password
          />
        </div>
        <el-button 
          type="primary" 
          native-type="submit"
          :loading="loading"
          class="login-button"
        >
          登入
        </el-button>
      </form>
    </div>
  </div>
</template>

<script>
import { useLogin } from './useLogin';

export default {
  name: 'LoginPage',
  setup() {
    return {
      ...useLogin()
    };
  }
};
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: $spacing-lg;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: $spacing-lg;
}

label {
  display: block;
  margin-bottom: $spacing-sm;
}

input {
  width: 100%;
  padding: $spacing-sm;
  border: 1px solid $border-color;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: $spacing-sm;
  background-color: $primary-color;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
</style> 