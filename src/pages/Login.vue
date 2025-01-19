<template>
  <div class="login-page">
    <div class="login-box">
      <h2>系統登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>帳號</label>
          <input type="text" v-model="username" placeholder="請輸入帳號">
        </div>
        <div class="form-group">
          <label>密碼</label>
          <input type="password" v-model="password" placeholder="請輸入密碼">
        </div>
        <button type="submit">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // 登入邏輯
      if ((this.username === 'admin' && this.password === 'abc123') || 
          (this.username === 'manage' && this.password === 'abc123')) {
        localStorage.setItem('username', this.username) // 儲存用戶名
        this.$router.push('/dashboard') // 登入成功後跳轉到儀表板
      } else {
        alert('帳號或密碼錯誤')
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #FFD54F;
  border: none;
  border-radius: 4px;
  color: #424242;
  cursor: pointer;
}

button:hover {
  background-color: #FFE082;
}
</style> 