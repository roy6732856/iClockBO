<template>
  <div class="page-container">
    <div class="page-header">
      <h2>打卡紀錄</h2>
      <div class="filter-section">
        <el-select
          v-if="isAdmin"
          v-model="selectedCompany"
          placeholder="請選擇公司"
          class="filter-select"
          clearable
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
          unlink-panels
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          :shortcuts="dateShortcuts"
          value-format="YYYY-MM-DD HH:mm:ss"
          class="date-picker"
        />
        
        <el-button type="primary" @click="handleSearch">搜尋</el-button>
      </div>
    </div>

    <el-card class="table-card" v-if="hasData">
      <div class="table-container">
        <el-table 
          :data="filteredRecords" 
          style="width: 100%" 
          :border="true" 
          stripe
          @sort-change="handleSortChange"
        >
          <el-table-column 
            prop="userName" 
            label="員工姓名" 
            width="120"
            sortable="custom"
          />
          <el-table-column 
            prop="company" 
            label="公司" 
            width="120"
            sortable="custom"
          />
          <el-table-column 
            prop="checkInTime" 
            label="上班時間" 
            width="180"
            sortable="custom"
          />
          <el-table-column 
            prop="checkOutTime" 
            label="下班時間" 
            width="180"
            sortable="custom"
          />
          <el-table-column 
            prop="status" 
            label="狀態" 
            width="100"
            sortable="custom"
          >
            <template #default="scope">
              <el-tag :type="scope.row.status === '正常' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

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

    <div v-else class="empty-state">
      <el-empty description="請選擇搜尋條件以查看數據" />
    </div>
  </div>
</template>

<script>
import { useAttendanceRecord } from './useAttendanceRecord';

export default {
  name: 'AttendanceRecord',
  setup() {
    return {
      ...useAttendanceRecord()
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
@import '@/styles/table.scss';

.page-container {
  padding: $spacing-lg;
}

.table-card {
  margin-top: $spacing-lg;
  
  .table-container {
    padding: $spacing-lg;
  }
}

.filter-section {
  display: flex;
  gap: $spacing-md;
  margin-top: $spacing-md;
}

.date-picker {
  width: 400px;
}

.pagination-container {
  padding: $spacing-md $spacing-lg;
  display: flex;
  justify-content: flex-end;
}

.empty-state {
  margin-top: $spacing-lg;
  text-align: center;
}
</style> 