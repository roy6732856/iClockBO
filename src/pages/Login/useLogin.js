import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useLogin() {
  const router = useRouter();
  const username = ref('');
  const password = ref('');

  const handleLogin = () => {
    if ((username.value === 'admin' && password.value === 'abc123') || 
        (username.value === 'manage' && password.value === 'abc123')) {
      localStorage.setItem('username', username.value);
      router.push('/dashboard');
    } else {
      alert('帳號或密碼錯誤');
    }
  };

  return {
    username,
    password,
    handleLogin
  };
} 