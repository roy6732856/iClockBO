<template>
  <div class="page-container">
    <div class="page-header">
      <h2>使用者管理</h2>
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

        <el-input
          v-model="searchName"
          placeholder="搜尋使用者姓名"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-button type="primary" @click="handleSearch">搜尋</el-button>
      </div>
    </div>

    <el-card class="table-card" v-if="hasData">
      <el-table 
        :data="filteredUsers" 
        style="width: 100%" 
        :border="true" 
        stripe
        @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="80" sortable="custom" />
        <el-table-column prop="name" label="姓名" width="120" sortable="custom" />
        <el-table-column prop="email" label="信箱" width="200" sortable="custom" />
        <el-table-column prop="department" label="部門" width="120" sortable="custom" />
        <el-table-column prop="role" label="角色" width="120" sortable="custom" />
        <el-table-column prop="company" label="公司" width="120" sortable="custom" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">編輯</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">刪除</el-button>
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

    <div v-else class="empty-state">
      <el-empty description="請選擇搜尋條件以查看數據" />
    </div>
  </div>
</template>

<script>
import { useUserManagement } from './useUserManagement';
import { Search } from '@element-plus/icons-vue';

export default {
  name: 'UserManagement',
  components: {
    Search
  },
  setup() {
    return {
      ...useUserManagement()
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/common.scss';
@import '@/styles/table.scss';

.search-input {
  width: 200px;
}

.table-container {
  padding: $spacing-lg;
}

.pagination-container {
  padding: $spacing-md $spacing-lg;
  display: flex;
  justify-content: flex-end;
}
</style> 