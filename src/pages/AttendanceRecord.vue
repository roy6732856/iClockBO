<template>
  <div class="attendance-record">
    <h2>打卡紀錄</h2>
    <div class="record-list">
      <table>
        <thead>
          <tr>
            <th>員工姓名</th>
            <th>打卡時間</th>
            <th>下班時間</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.userName }}</td>
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
export default {
  name: 'AttendanceRecord',
  data() {
    return {
      records: [
        {
          id: 1,
          userName: '張小明',
          checkInTime: '2024-03-20 09:00:00',
          checkOutTime: '2024-03-20 18:00:00',
          status: '正常'
        }
      ]
    }
  }
}
</script>

<style scoped>
.attendance-record {
  padding: 20px;
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