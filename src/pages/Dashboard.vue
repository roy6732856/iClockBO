<template>
  <div class="dashboard">
    <h2>儀表板</h2>
    <div class="dashboard-stats">
      <div class="stat-card">
        <h3>今日出勤</h3>
        <p>{{ dashboardData.todayAttendance }}/{{ dashboardData.totalEmployees }}</p>
      </div>
      <div class="stat-card">
        <h3>遲到人數</h3>
        <p>{{ dashboardData.lateToday }}</p>
      </div>
      <div class="stat-card">
        <h3>請假人數</h3>
        <p>{{ dashboardData.leaveToday }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardPage',
  data() {
    return {
      dashboardData: {
        todayAttendance: 45,
        totalEmployees: 50,
        lateToday: 2,
        leaveToday: 3
      }
    }
  }
}
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