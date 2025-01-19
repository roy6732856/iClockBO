export const mockUsers = [
  {
    id: 1,
    name: '張小明',
    email: 'ming@example.com',
    department: '研發部',
    role: '員工',
    company: '公司A',
    createdAt: '2025-01-20 09:00:00'
  },
  {
    id: 2,
    name: '李四',
    email: 'li@example.com',
    department: '設計部',
    role: '員工',
    company: '公司B',
    createdAt: '2025-01-19 09:00:00'
  },
  {
    id: 3,
    name: '王五',
    email: 'wang@example.com',
    department: '行銷部',
    role: '經理',
    company: '公司C',
    createdAt: '2025-01-18 09:00:00'
  }
];

export const mockAttendance = [
  {
    id: 1,
    userId: 1,
    userName: '張小明',
    company: '公司A',
    checkInTime: '2025-01-20 09:00:00',
    checkOutTime: '2025-01-20 18:00:00',
    status: '正常'
  },
  {
    id: 2,
    userId: 2,
    userName: '李四',
    company: '公司B',
    checkInTime: '2025-01-20 09:15:00',
    checkOutTime: '2025-01-20 18:05:00',
    status: '遲到'
  },
  {
    id: 3,
    userId: 3,
    userName: '王五',
    company: '公司A',
    checkInTime: '2025-01-19 08:55:00',
    checkOutTime: '2025-01-19 18:00:00',
    status: '正常'
  },
  {
    id: 4,
    userId: 4,
    userName: '趙六',
    company: '公司C',
    checkInTime: '2025-01-18 09:00:00',
    checkOutTime: '2025-01-18 18:00:00',
    status: '正常'
  }
];

export const mockDashboardData = {
  overview: {
    totalEmployees: 150,
    todayCheckins: 120,
    lateToday: 5,
    onLeave: 8
  },
  recentCheckins: [
    {
      id: 1,
      userName: '張小明',
      company: '公司A',
      checkInTime: '2025-01-20 09:00:00',
      status: '正常'
    },
    {
      id: 2,
      userName: '李四',
      company: '公司B',
      checkInTime: '2025-01-20 09:15:00',
      status: '遲到'
    }
  ],
  systemStatus: {
    serverStatus: 'healthy',
    lastUpdate: '2025-01-20 10:00:00',
    activeUsers: 45,
    systemLoad: '32%'
  }
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