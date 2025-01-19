export const menuItems = [
  {
    id: 1,
    title: '儀表板',
    icon: 'HomeFilled',
    path: '/dashboard'
  },
  {
    id: 2,
    title: '使用者管理',
    icon: 'User',
    children: [
      {
        id: 21,
        title: '公司使用者',
        path: '/users/company'
      }
    ]
  },
  {
    id: 3,
    title: '打卡系統',
    icon: 'Timer',
    children: [
      {
        id: 31,
        title: '打卡紀錄報表',
        path: '/attendance/records'
      }
    ]
  }
]; 