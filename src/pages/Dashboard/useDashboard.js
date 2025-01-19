import { ref, computed, onMounted } from 'vue';
import { mockUserCompanies, mockDashboardData } from '@/mock/mockData';

export function useDashboard() {
  const selectedCompany = ref('');
  const dateRange = ref(null);
  const availableCompanies = ref([]);
  const dashboardData = ref(null);
  const hasData = ref(false);

  const isAdmin = computed(() => {
    return localStorage.getItem('username') === 'admin';
  });

  const calculateAttendanceRate = computed(() => {
    if (!dashboardData.value) return 0;
    const { todayCheckins, totalEmployees } = dashboardData.value.overview;
    return Math.round((todayCheckins / totalEmployees) * 100);
  });

  // 初始化公司列表
  const initializeCompanies = () => {
    const userType = isAdmin.value ? 'admin' : 'manage';
    availableCompanies.value = mockUserCompanies[userType];
  };

  // 搜尋按鈕點擊事件
  const handleSearch = () => {
    if (!dateRange.value || !dateRange.value.length || 
        (isAdmin.value && !selectedCompany.value)) {
      hasData.value = false;
      return;
    }

    // 在實際應用中，這裡應該根據選擇的公司和日期範圍獲取數據
    dashboardData.value = mockDashboardData;
    hasData.value = true;
  };

  onMounted(() => {
    initializeCompanies();
    // 不預設顯示數據
    hasData.value = false;
  });

  return {
    selectedCompany,
    dateRange,
    availableCompanies,
    dashboardData,
    hasData,
    isAdmin,
    calculateAttendanceRate,
    handleSearch
  };
} 