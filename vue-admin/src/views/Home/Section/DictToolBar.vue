<template>
  <el-dialog
    v-model="showAddNode"
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
    <el-button size="small" type="success" @click="showAddNode = true"
      >添加 {{ props.itemData?.label || props.itemData?.key }} 子节点</el-button
    >
    <el-button size="small" type="success" @click="showAddItem = true"
      >添加 {{ props.itemData?.label || props.itemData?.key }} 子翻译条目</el-button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { addDict } from '@/api/dicts'
import type { DictsSectionItemProps } from '@/api/dicts'
const props = defineProps<{
  itemData: DictsSectionItemProps
  getData: () => void
  currLang: string
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
  await addDict(nodeData.value)
  await props.getData()
  showAddNode.value = false
}
const showAddItem = ref(false)
const itemData = ref({ key: '', zh: '', en: '', pid: props.itemData?.id, node: 0 })

const onSubmitItem = async () => {
  await addDict(itemData.value)
  await props.getData()
  showAddItem.value = false
}
</script>
