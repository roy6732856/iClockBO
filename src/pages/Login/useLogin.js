import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api, apiService } from '@/services/api';
import { ElMessage } from 'element-plus';

export function useLogin() {
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const loading = ref(false);

  const handleLogin = async () => {
    if (!username.value || !password.value) {
      ElMessage.warning('請輸入帳號和密碼');
      return;
    }

    loading.value = true;
    try {
      console.log('Attempting login with:', {
        username: username.value,
        password: password.value
      });

      const response = await apiService.login({
        username: username.value,
        password: password.value
      });

      console.log('Login response:', response);

      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username.value);
        
        // 設置 axios 默認 headers
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        
        ElMessage.success('登入成功');
        router.push('/dashboard');
      } else {
        throw new Error('未收到 token');
      }
    } catch (error) {
      console.error('Login error:', error);
      ElMessage.error(error.message || '帳號或密碼錯誤');
    } finally {
      loading.value = false;
    }
  };

  return {
    username,
    password,
    loading,
    handleLogin
  };
} 