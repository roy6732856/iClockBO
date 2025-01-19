import { ref, computed, onMounted } from 'vue';
import { mockUserCompanies, mockAttendance } from '@/mock/mockData';
import dayjs from 'dayjs';

export function useAttendanceRecord() {
  const selectedCompany = ref('');
  const dateRange = ref(null);
  const records = ref(mockAttendance);
  const filteredRecords = ref([]);
  const availableCompanies = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalRecords = ref(0);
  const hasData = ref(false);

  const isAdmin = computed(() => {
    return localStorage.getItem('username') === 'admin';
  });

  // 日期快捷選項
  const dateShortcuts = [
    {
      text: '今天',
      value: () => {
        const start = dayjs().startOf('day');
        return [start, dayjs().endOf('day')];
      }
    },
    {
      text: '昨天',
      value: () => {
        const start = dayjs().subtract(1, 'day').startOf('day');
        return [start, dayjs().subtract(1, 'day').endOf('day')];
      }
    },
    {
      text: '本週',
      value: () => {
        const start = dayjs().startOf('week');
        return [start, dayjs().endOf('week')];
      }
    },
    {
      text: '上週',
      value: () => {
        const start = dayjs().subtract(1, 'week').startOf('week');
        const end = dayjs().subtract(1, 'week').endOf('week');
        return [start, end];
      }
    },
    {
      text: '本月',
      value: () => {
        const start = dayjs().startOf('month');
        return [start, dayjs().endOf('month')];
      }
    }
  ];

  const initializeCompanies = () => {
    const userType = isAdmin.value ? 'admin' : 'manage';
    availableCompanies.value = mockUserCompanies[userType];
  };

  const handleSearch = () => {
    // 確保公司和日期都必須選擇
    if (!dateRange.value || !dateRange.value.length || 
        (isAdmin.value && !selectedCompany.value)) {
      hasData.value = false;
      filteredRecords.value = [];
      return;
    }

    let filtered = records.value;

    // 根據公司篩選
    if (isAdmin.value) {
      const selectedCompanyName = availableCompanies.value.find(
        c => c.id === selectedCompany.value
      )?.name;
      filtered = filtered.filter(record => record.company === selectedCompanyName);
    }

    // 根據日期範圍篩選
    const startDate = dayjs(dateRange.value[0]).startOf('day');
    const endDate = dayjs(dateRange.value[1]).endOf('day');
    
    filtered = filtered.filter(record => {
      const recordDate = dayjs(record.checkInTime);
      return recordDate.isAfter(startDate) && recordDate.isBefore(endDate);
    });

    totalRecords.value = filtered.length;
    currentPage.value = 1; // 重置當前頁碼
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    filteredRecords.value = filtered.slice(start, end);
    hasData.value = filtered.length > 0;
  };

  const handleSizeChange = (val) => {
    pageSize.value = val;
    handleSearch();
  };

  const handleCurrentChange = (val) => {
    currentPage.value = val;
    handleSearch();
  };

  const handleSortChange = ({ prop, order }) => {
    if (!prop || !order) return;
    
    const sortedRecords = [...filteredRecords.value].sort((a, b) => {
      if (prop === 'checkInTime' || prop === 'checkOutTime') {
        return order === 'ascending' 
          ? dayjs(a[prop]).unix() - dayjs(b[prop]).unix()
          : dayjs(b[prop]).unix() - dayjs(a[prop]).unix();
      }
      
      return order === 'ascending'
        ? a[prop].localeCompare(b[prop])
        : b[prop].localeCompare(a[prop]);
    });
    
    filteredRecords.value = sortedRecords;
  };

  onMounted(() => {
    initializeCompanies();
    hasData.value = false;
  });

  return {
    selectedCompany,
    dateRange,
    filteredRecords,
    availableCompanies,
    currentPage,
    pageSize,
    totalRecords,
    isAdmin,
    hasData,
    dateShortcuts,
    handleSearch,
    handleSizeChange,
    handleCurrentChange,
    handleSortChange,
  };
} 