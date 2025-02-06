import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const apiService = {
  // 登入
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      console.log('Login success:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response || error);
      if (error.response) {
        // 服務器回應的錯誤
        throw new Error(error.response.data?.message || '登入失敗');
      } else if (error.request) {
        // 請求發出但沒有收到回應
        throw new Error('無法連接到服務器，請確認服務器是否正常運行');
      } else {
        // 請求配置出錯
        throw new Error('請求配置錯誤');
      }
    }
  },

  // 用戶相關
  getUsers: () => api.get('/users'),
  
  // 打卡記錄相關
  getAttendanceRecords: () => api.get('/attendance'),
  
  // 儀表板數據
  getDashboardData: () => api.get('/dashboard')
}; 