export const mockUsers = [
  {
    id: 1,
    name: '張小明',
    email: 'ming@example.com',
    department: '研發部',
    role: '員工',
    company: '公司A'
  },
  {
    id: 2,
    name: '李四',
    email: 'li@example.com',
    department: '設計部',
    role: '員工',
    company: '公司B'
  },
  {
    id: 3,
    name: '王五',
    email: 'wang@example.com',
    department: '行銷部',
    role: '經理',
    company: '公司C'
  }
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

export const mockCompanies = [
  { id: 1, name: '公司A', type: 'Admin' },
  { id: 2, name: '公司B', type: 'Admin' },
  { id: 3, name: '公司C', type: 'Manager' },
  { id: 4, name: '公司D', type: 'Manager' },
];

export const mockUserCompanies = {
  admin: [
    { id: 1, name: '公司A' },
    { id: 2, name: '公司B' },
    { id: 3, name: '公司C' },
    { id: 4, name: '公司D' },
  ],
  manage: [
    { id: 3, name: '公司C' },
  ],
}; 