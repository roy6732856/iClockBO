<template>
  <div class="user-management">
    <div class="page-header">
      <h2>使用者管理</h2>
      <div class="filter-section" v-if="isAdmin">
        <el-select
          v-model="selectedCompany"
          placeholder="請選擇公司"
          @change="filterCompanies"
          class="filter-select"
        >
          <el-option
            v-for="company in availableCompanies"
            :key="company.id"
            :label="company.name"
            :value="company.id"
          />
        </el-select>
        <el-button type="primary" @click="filterCompanies">搜尋</el-button>
      </div>
    </div>

    <el-card class="table-card">
      <el-table
        :data="filteredUsers"
        style="width: 100%"
        :border="true"
        stripe
        max-height="600px"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="email" label="信箱" width="200" />
        <el-table-column prop="department" label="部門" width="120" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="company" label="公司" width="120" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button 
              type="primary"
              size="small" 
              @click="handleEdit(scope.row)"
            >編輯</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >刪除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalUsers"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
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
      currentPage: 1,
      pageSize: 10,
      totalUsers: 0,
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
      
      let filtered = [];
      if (this.isAdmin && this.selectedCompany) {
        const selectedCompanyName = this.availableCompanies.find(
          c => c.id === this.selectedCompany
        )?.name;
        filtered = this.users.filter(
          user => user.company === selectedCompanyName
        );
      } else {
        const userCompany = mockUserCompanies.manage[0].name;
        filtered = this.users.filter(
          user => user.company === userCompany
        );
      }
      
      this.totalUsers = filtered.length;
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.filteredUsers = filtered.slice(start, end);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.filterCompanies();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filterCompanies();
    },
    handleEdit(row) {
      console.log('Edit:', row);
    },
    handleDelete(row) {
      console.log('Delete:', row);
    }
  },
  created() {
    this.filterCompanies();
  },
};
</script>

<style scoped>
.user-management {
  padding: 24px;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-section {
  display: flex;
  gap: 16px;
}

.filter-select {
  width: 200px;
}

.table-card {
  margin-bottom: 24px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-table) {
  margin: 16px;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #1f2f3d;
}
</style> 