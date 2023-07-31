<template>
  <PageHeader home>
    <AddProjectButton :getData="getData" />
  </PageHeader>
  <div class="web-project-list">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="key" label="项目名称" width="200" />
      <el-table-column prop="mark" label="项目备注" />
      <el-table-column prop="time" label="Time" :formatter="timeFormat" width="200" />
      <el-table-column fixed="right" label="Operations" width="300">
        <template #default="scope">
          <el-button type="primary" @click="$router.push(`/project/${scope.row.id}`)"
            >详情</el-button
          >
          <EditProjectButton :id="scope.row.id" :getData="getData" />
          <el-button @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { getDicts, deleteDict } from '@/api/dicts'
import dayjs from 'dayjs'
import type { DictsItemProps } from '@/api/dicts'
import AddProjectButton from './AddProjectButton.vue'
import EditProjectButton from './EditProjectButton.vue'
import PageHeader from '@@/PageHeader.vue'

const list = ref<DictsItemProps[]>([])

const getData = async () => {
  const res = await getDicts({ pid: 0, pageSize: -1 })
  list.value = res.list
}

const timeFormat = (item: DictsItemProps) => dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')

onMounted(async () => {
  await getData()
})

const deleteItem = async (id: string | number) => {
  const status = await deleteDict(id)
  if (status) {
    await getData()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('有子数据，请先删除子数据，再删除本数据')
  }
}
</script>
