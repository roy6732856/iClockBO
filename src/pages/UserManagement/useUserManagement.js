import { ref, computed, onMounted } from 'vue';
import { mockUserCompanies, mockUsers } from '@/mock/mockData';

export function useUserManagement() {
  const selectedCompany = ref('');
  const searchName = ref('');
  const users = ref(mockUsers);
  const filteredUsers = ref([]);
  const availableCompanies = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalUsers = ref(0);
  const hasData = ref(false);

  const isAdmin = computed(() => {
    return localStorage.getItem('username') === 'admin';
  });

  const initializeCompanies = () => {
    const userType = isAdmin.value ? 'admin' : 'manage';
    availableCompanies.value = mockUserCompanies[userType];
  };

  const handleSearch = () => {
    // 如果是管理員且沒有選擇公司，也沒有輸入搜尋名稱，則不顯示數據
    if (isAdmin.value && !selectedCompany.value && !searchName.value) {
      hasData.value = false;
      filteredUsers.value = [];
      return;
    }

    let filtered = users.value;

    // 如果是管理員且選擇了公司，則按公司篩選
    if (isAdmin.value && selectedCompany.value) {
      const selectedCompanyName = availableCompanies.value.find(
        c => c.id === selectedCompany.value
      )?.name;
      filtered = filtered.filter(user => user.company === selectedCompanyName);
    }

    // 如果輸入了搜尋名稱，則進行模糊搜尋
    if (searchName.value) {
      const searchText = searchName.value.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchText)
      );
    }

    totalUsers.value = filtered.length;
    currentPage.value = 1; // 重置頁碼
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    filteredUsers.value = filtered.slice(start, end);
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

  const handleEdit = (row) => {
    console.log('Edit:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
  };

  const handleSortChange = ({ prop, order }) => {
    if (!prop || !order) return;
    
    const sortedUsers = [...filteredUsers.value].sort((a, b) => {
      if (prop === 'id') {
        return order === 'ascending' 
          ? a[prop] - b[prop]
          : b[prop] - a[prop];
      }
      
      return order === 'ascending'
        ? a[prop].localeCompare(b[prop])
        : b[prop].localeCompare(a[prop]);
    });
    
    filteredUsers.value = sortedUsers;
  };

  onMounted(() => {
    initializeCompanies();
    hasData.value = false;
  });

  return {
    selectedCompany,
    searchName,
    filteredUsers,
    availableCompanies,
    currentPage,
    pageSize,
    totalUsers,
    isAdmin,
    hasData,
    handleSearch,
    handleSizeChange,
    handleCurrentChange,
    handleEdit,
    handleDelete,
    handleSortChange,
  };
} 