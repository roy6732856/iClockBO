const BASE_URL = 'http://your-api-base-url';

export const api = {
  // 用戶相關
  getUsers: () => fetch(`${BASE_URL}/users`).then(res => res.json()),
  
  // 打卡記錄相關
  getAttendanceRecords: () => fetch(`${BASE_URL}/attendance`).then(res => res.json()),
  
  // 儀表板數據
  getDashboardData: () => fetch(`${BASE_URL}/dashboard`).then(res => res.json()),
  
  // 登入
  login: (credentials) => fetch(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then(res => res.json())
}; 