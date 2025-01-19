<template>
  <div class="page-container">
    <div class="page-header">
      <h2>儀表板</h2>
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

        <date-range-picker
          v-model="dateRange"
          class="date-picker"
        />
        
        <el-button type="primary" @click="handleSearch">搜尋</el-button>
      </div>
    </div>

    <div v-if="hasData" class="dashboard-content">
      <!-- 概覽卡片 -->
      <div class="overview-cards">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <el-icon><User /></el-icon>
              <span>總員工數</span>
            </div>
          </template>
          <div class="card-value">{{ dashboardData.overview.totalEmployees }}</div>
        </el-card>

        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <el-icon><Timer /></el-icon>
              <span>今日打卡</span>
            </div>
          </template>
          <div class="card-value">{{ dashboardData.overview.todayCheckins }}</div>
          <div class="card-footer">
            出勤率: {{ calculateAttendanceRate }}%
          </div>
        </el-card>

        <el-card class="stat-card warning">
          <template #header>
            <div class="card-header">
              <el-icon><Warning /></el-icon>
              <span>今日遲到</span>
            </div>
          </template>
          <div class="card-value">{{ dashboardData.overview.lateToday }}</div>
        </el-card>

        <el-card class="stat-card info">
          <template #header>
            <div class="card-header">
              <el-icon><Calendar /></el-icon>
              <span>請假人數</span>
            </div>
          </template>
          <div class="card-value">{{ dashboardData.overview.onLeave }}</div>
        </el-card>
      </div>

      <!-- 最近打卡記錄 -->
      <el-card class="recent-records">
        <template #header>
          <div class="card-header">
            <span>最近打卡記錄</span>
          </div>
        </template>
        <el-table :data="dashboardData.recentCheckins" style="width: 100%">
          <el-table-column prop="userName" label="員工姓名" width="120" />
          <el-table-column prop="company" label="公司" width="120" />
          <el-table-column prop="checkInTime" label="打卡時間" width="180" />
          <el-table-column prop="status" label="狀態" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '正常' ? 'success' : 'warning'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 系統狀態 -->
      <el-card class="system-status">
        <template #header>
          <div class="card-header">
            <span>系統狀態</span>
          </div>
        </template>
        <div class="status-grid">
          <div class="status-item">
            <div class="status-label">伺服器狀態</div>
            <div class="status-value">
              <el-tag type="success">{{ dashboardData.systemStatus.serverStatus }}</el-tag>
            </div>
          </div>
          <div class="status-item">
            <div class="status-label">最後更新</div>
            <div class="status-value">{{ dashboardData.systemStatus.lastUpdate }}</div>
          </div>
          <div class="status-item">
            <div class="status-label">在線用戶</div>
            <div class="status-value">{{ dashboardData.systemStatus.activeUsers }}</div>
          </div>
          <div class="status-item">
            <div class="status-label">系統負載</div>
            <div class="status-value">{{ dashboardData.systemStatus.systemLoad }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <div v-else class="empty-state">
      <el-empty description="請選擇公司以查看數據" />
    </div>
  </div>
</template>

<script>
import { useDashboard } from './useDashboard';
import DateRangePicker from '@/components/DateRangePicker.vue';

export default {
  name: 'DashboardPage',
  components: {
    DateRangePicker
  },
  setup() {
    return {
      ...useDashboard()
    };
  }
};
</script>

<style lang="scss">
@import '@/styles/common.scss';

.dashboard-content {
  display: grid;
  gap: $spacing-lg;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: $spacing-lg;

  .stat-card {
    .card-header {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      
      .el-icon {
        font-size: 20px;
      }
    }

    .card-value {
      font-size: 36px;
      font-weight: bold;
      color: $text-color;
      margin: $spacing-md 0;
    }

    .card-footer {
      font-size: 14px;
      color: #666;
    }

    &.warning .card-value {
      color: $warning-color;
    }

    &.info .card-value {
      color: $primary-color;
    }
  }
}

.recent-records {
  margin-top: $spacing-lg;
}

.system-status {
  margin-top: $spacing-lg;

  .status-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-lg;
  }

  .status-item {
    .status-label {
      font-size: 14px;
      color: #666;
      margin-bottom: $spacing-sm;
    }

    .status-value {
      font-size: 16px;
      font-weight: 500;
    }
  }
}

.empty-state {
  margin-top: 100px;
  text-align: center;
}
</style> 