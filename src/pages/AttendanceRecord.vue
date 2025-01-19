<template>
  <div class="attendance-record">
    <div class="page-header">
      <h2>打卡紀錄</h2>
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
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          class="date-picker"
        />
        <el-button type="primary" @click="filterCompanies">搜尋</el-button>
      </div>
    </div>

    <el-card class="table-card">
      <el-table
        :data="filteredRecords"
        style="width: 100%"
        :border="true"
        stripe
        max-height="600px"
      >
        <el-table-column prop="userName" label="員工姓名" width="120" />
        <el-table-column prop="company" label="公司" width="120" />
        <el-table-column prop="checkInTime" label="打卡時間" width="180" />
        <el-table-column prop="checkOutTime" label="下班時間" width="180" />
        <el-table-column prop="status" label="狀態" width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 'warning'"
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRecords"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
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
      dateRange: [],
      currentPage: 1,
      pageSize: 10,
      totalRecords: 0,
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
      
      this.totalRecords = this.filteredRecords.length;
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.filteredRecords = this.filteredRecords.slice(start, end);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.filterCompanies();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filterCompanies();
    },
  },
  created() {
    this.filterCompanies();
  },
};
</script>

<style scoped>
.attendance-record {
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

.date-picker {
  width: 300px;
}

.table-card {
  margin-bottom: 24px;
  height: calc(100% - 100px);
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
  height: 100%;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #1f2f3d;
}
</style> 