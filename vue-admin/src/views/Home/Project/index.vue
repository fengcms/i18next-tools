<template>
  <PageHeader :pid="pid" :mark="project?.mark" :p-key="project?.key">
    <AddSectionButton :getData="getData" :pid="pid" />
    <BatchImportButton :getData="getData" :pid="pid" />
  </PageHeader>
  <div class="web-project-list">
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="key" label="项目名称" width="120" />
      <el-table-column prop="mark" label="项目备注" />
      <el-table-column
        prop="time"
        label="Time"
        :formatter="(row: DictsItemProps) => timeFormat(row.time)"
        width="200"
      />
      <el-table-column fixed="right" label="Operations" width="300">
        <template #default="scope">
          <el-button
            type="primary"
            @click="$router.push(`/project/${scope.row.pid}/section/${scope.row.id}`)"
            >详情</el-button
          >
          <EditSectionButton :id="scope.row.id" :getData="getData" />
          <el-button @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getDicts, deleteDict, getDict } from '@/api/dicts'
import type { DictsItemProps } from '@/api/dicts'
import { timeFormat } from '@/utils/tools'
import AddSectionButton from './AddSectionButton.vue'
import EditSectionButton from './EditSectionButton.vue'
import BatchImportButton from './BatchImportButton.vue'
import PageHeader from '@@/PageHeader.vue'

const { params } = useRoute()
const pid = String(params.pid)
const list = ref<DictsItemProps[]>([])
const project = ref<DictsItemProps>()
const getData = async () => {
  const res = await getDicts({ pid, pageSize: -1 })
  list.value = res.list
  project.value = await getDict(pid)
}
onMounted(async () => {
  await getData()
})

watch(
  () => pid,
  async () => await getData()
)

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
