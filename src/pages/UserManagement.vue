<template>
  <div class="user-management">
    <h2>使用者管理</h2>
    <div class="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>信箱</th>
            <th>部門</th>
            <th>角色</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.department }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [
        {
          id: 1,
          name: '張小明',
          email: 'ming@example.com',
          department: '研發部',
          role: '員工'
        }
      ]
    }
  }
}
</script>

<style scoped>
.user-management {
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