<template>
  <div class="attendance-record">
    <h2>打卡紀錄</h2>
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
    <div class="record-list">
      <table>
        <thead>
          <tr>
            <th>員工姓名</th>
            <th>公司</th>
            <th>打卡時間</th>
            <th>下班時間</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.id">
            <td>{{ record.userName }}</td>
            <td>{{ record.company }}</td>
            <td>{{ record.checkInTime }}</td>
            <td>{{ record.checkOutTime }}</td>
            <td>{{ record.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mockUserCompanies } from '../mock/mockData';

export default {
  name: 'AttendanceRecord',
  data() {
    return {
      selectedCompany: '',
      records: [
        { id: 1, userName: '張小明', company: '公司A', checkInTime: '2024-03-20 09:00:00', checkOutTime: '2024-03-20 18:00:00', status: '正常' },
        { id: 2, userName: '李四', company: '公司B', checkInTime: '2024-03-20 09:05:00', checkOutTime: '2024-03-20 18:05:00', status: '正常' },
        { id: 3, userName: '王五', company: '公司C', checkInTime: '2024-03-20 09:10:00', checkOutTime: '2024-03-20 18:10:00', status: '正常' },
      ],
      filteredRecords: [],
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
        const selectedCompanyName = this.availableCompanies.find(
          c => c.id === this.selectedCompany
        )?.name;
        this.filteredRecords = this.records.filter(
          record => record.company === selectedCompanyName
        );
      } else {
        const userCompany = mockUserCompanies.manage[0].name;
        this.filteredRecords = this.records.filter(
          record => record.company === userCompany
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
.attendance-record {
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