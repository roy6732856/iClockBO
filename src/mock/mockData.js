export const mockUsers = [
  {
    id: 1,
    name: '張小明',
    email: 'ming@example.com',
    department: '研發部',
    role: '員工'
  },
  // ... 更多用戶數據
];

export const mockAttendance = [
  {
    id: 1,
    userId: 1,
    userName: '張小明',
    checkInTime: '2024-03-20 09:00:00',
    checkOutTime: '2024-03-20 18:00:00',
    status: '正常'
  },
  // ... 更多打卡記錄
];

export const mockDashboardData = {
  todayAttendance: 45,
  totalEmployees: 50,
  lateToday: 2,
  leaveToday: 3,
  // ... 更多儀表板數據
}; 