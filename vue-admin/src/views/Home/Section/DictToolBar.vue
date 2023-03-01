<template>
  <el-dialog
    v-model="showAddNode"
    width="500px"
    :title="`添加 ${props.itemData?.label || props.itemData?.key} 子节点`"
  >
    <el-form label-position="top">
      <el-form-item :label="`编程 Key 值： `"
        ><el-input v-model="nodeData.key" placeholder="Key 值只能是英文"
          ><template #prepend
            >{{ props.itemData?.label || props.itemData?.key }}.</template
          ></el-input
        ></el-form-item
      >
      <el-form-item label="子节点备注"
        ><el-input
          v-model="nodeData.mark"
          type="textarea"
          placeholder="请输入子节点备注"
        ></el-input></el-form-item
      ><el-form-item
        ><el-button type="primary" @click="onSubmitNode()">保存</el-button></el-form-item
      >
    </el-form>
  </el-dialog>

  <el-dialog
    v-model="showAddItem"
    width="500px"
    :title="`添加 ${props.itemData?.label || props.itemData?.key} 子翻译条目`"
  >
    <el-form label-position="top">
      <el-form-item :label="`编程 Key 值： `"
        ><el-input v-model="itemData.key" placeholder="Key 值只能是英文"
          ><template #prepend
            >{{ props.itemData?.label || props.itemData?.key }}.</template
          ></el-input
        ></el-form-item
      >
      <el-form-item label="中文翻译"
        ><el-input v-model="itemData.zh" type="textarea" placeholder="请输入中文翻译"></el-input
      ></el-form-item>
      <el-form-item label="英文翻译"
        ><el-input v-model="itemData.en" type="textarea" placeholder="请输入英文翻译"></el-input
      ></el-form-item>
      <el-form-item
        ><el-button type="primary" @click="onSubmitItem()">保存</el-button></el-form-item
      >
    </el-form>
  </el-dialog>

  <div class="web-dict-item-bar">
    <EditNode :get-data="props.getData" :id="props.itemData?.id" />
    <el-button type="danger" size="small" :icon="Delete" @click="deleteNode()" />
    <el-button size="small" type="success" :icon="Plus" @click="showAddNode = true"
      >子节点</el-button
    >
    <el-button size="small" type="success" :icon="Plus" @click="showAddItem = true"
      >子条目</el-button
    >

    <el-button size="small" :icon="isShowChild ? ArrowUp : ArrowDown" @click="toggleShowChild()" />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { addDict, getDicts, deleteDict } from '@/api/dicts'
import type { DictsSectionItemProps } from '@/api/dicts'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Plus, ArrowUp, ArrowDown } from '@element-plus/icons-vue'
import EditNode from './EditNode.vue'
const props = defineProps<{
  itemData: DictsSectionItemProps
  getData: () => void
  toggleShowChild: () => void
  currLang: string
  isShowChild: boolean
}>()
const currLang = ref('all')
watch(
  () => props.currLang,
  (val) => {
    currLang.value = val
  }
)

const showAddNode = ref(false)
const nodeData = ref({ key: '', mark: '', pid: props.itemData?.id, node: 1 })

const onSubmitNode = async () => {
  const { count } = await getDicts({
    pid: props.itemData?.id,
    key: nodeData.value.key,
    pageSize: -1
  })
  if (count === 0) {
    await addDict(nodeData.value)
    await props.getData()
    showAddNode.value = false
  } else {
    ElMessage.error('同一节点下，Key 值不能重复，请检查一下哦！')
  }
}
const showAddItem = ref(false)
const itemData = ref({ key: '', zh: '', en: '', pid: props.itemData?.id, node: 0 })

const onSubmitItem = async () => {
  const { count } = await getDicts({
    pid: props.itemData?.id,
    key: itemData.value.key,
    pageSize: -1
  })
  if (count === 0) {
    await addDict(itemData.value)
    await props.getData()
    showAddItem.value = false
  } else {
    ElMessage.error('同一节点下，Key 值不能重复，请检查一下哦！')
  }
}

const deleteNode = async () => {
  await ElMessageBox.confirm(`确认删除 ${props.itemData?.label} 的条目吗？`, '⚠️ 警告')
  const status = await deleteDict(props.itemData?.id)
  if (status) {
    await props.getData()
    ElMessage.success('删除成功')
  } else {
    ElMessage.error('有子数据，请先删除子数据，再删除本数据')
  }
}
</script>
