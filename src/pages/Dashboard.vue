<template>
  <div class="dashboard">
    <h2>儀表板</h2>
    <div>
      <el-input v-model="companyFilter" placeholder="搜尋公司"></el-input>
      <el-button @click="filterCompanies">搜尋</el-button>
    </div>
    <div class="dashboard-stats">
      <div v-for="company in filteredCompanies" :key="company.id" class="stat-card">
        <h3>{{ company.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mockUserCompanies } from '../mock/mockData';

export default {
  name: 'DashboardPage',
  data() {
    return {
      companyFilter: '',
      companies: [],
    };
  },
  computed: {
    filteredCompanies() {
      return this.companies.filter(company => 
        company.name.includes(this.companyFilter)
      );
    },
  },
  methods: {
    filterCompanies() {
      const userType = localStorage.getItem('username') === 'admin' ? 'admin' : 'manage';
      this.companies = mockUserCompanies[userType];
    },
  },
  created() {
    this.filterCompanies(); // 初始化時過濾公司
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 