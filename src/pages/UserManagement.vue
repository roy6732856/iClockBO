<template>
  <div class="user-management">
    <h2>使用者管理</h2>
    <!-- 只有管理員可以看到公司選擇器 -->
    <div v-if="isAdmin" class="filter-section">
      <el-select v-model="selectedCompany" placeholder="請選擇公司" @change="filterCompanies">
        <el-option
          v-for="company in availableCompanies"
          :key="company.id"
          :label="company.name"
          :value="company.id"
        />
      </el-select>
      <el-button @click="filterCompanies">搜尋</el-button>
    </div>
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>部門</th>
            <th>角色</th>
            <th>公司</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.company }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mockUserCompanies, mockUsers } from '../mock/mockData';

export default {
  name: 'UserManagement',
  data() {
    return {
      selectedCompany: '',
      users: mockUsers,
      filteredUsers: [],
      availableCompanies: [],
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('username') === 'admin';
    }
  },
  methods: {
    filterCompanies() {
      const userType = this.isAdmin ? 'admin' : 'manage';
      this.availableCompanies = mockUserCompanies[userType];
      
      if (this.isAdmin && this.selectedCompany) {
        // 管理員可以按公司篩選
        const selectedCompanyName = this.availableCompanies.find(
          c => c.id === this.selectedCompany
        )?.name;
        this.filteredUsers = this.users.filter(
          user => user.company === selectedCompanyName
        );
      } else {
        // 非管理員只能看到自己公司的資料
        const userCompany = mockUserCompanies.manage[0].name;
        this.filteredUsers = this.users.filter(
          user => user.company === userCompany
        );
      }
    },
  },
  created() {
    this.filterCompanies();
  },
};
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.filter-section {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
}
</style> 