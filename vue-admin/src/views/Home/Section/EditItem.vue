<template>
  <ul class="web-dict-item-edit">
    <li>
      <el-input v-model="dict.key" placeholder="键值"
        ><template #prepend>{{ keyPre }}</template></el-input
      >
    </li>

    <li>
      <el-input
        :disabled="!['zh', 'all'].includes(currLang)"
        v-model="dict.zh"
        placeholder="中文"
      />
    </li>
    <li>
      <el-input
        :disabled="!['en', 'all'].includes(currLang)"
        v-model="dict.en"
        placeholder="英语"
      />
    </li>
    <li v-show="['ja', 'all'].includes(currLang)">
      <el-input v-model="dict.ja" placeholder="日本语" />
    </li>
    <li v-show="['fr', 'all'].includes(currLang)">
      <el-input v-model="dict.fr" placeholder="法语" />
    </li>
    <li v-show="['ko', 'all'].includes(currLang)">
      <el-input v-model="dict.ko" placeholder="韩语" />
    </li>
    <li v-show="['es', 'all'].includes(currLang)">
      <el-input v-model="dict.es" placeholder="西班牙语" />
    </li>
    <li v-show="['tr', 'all'].includes(currLang)">
      <el-input v-model="dict.tr" placeholder="土耳其语" />
    </li>
    <li>
      <el-button type="primary" size="small" @click="onSubmit()">保存</el-button>
      <el-button type="danger" size="small" :icon="Delete" @click="deleteItem()"></el-button>
    </li>
    <li>
      <time>{{ timeFormat(dict.time, 'MM-DD HH:mm:ss') }}</time>
    </li>
  </ul>
</template>
<script setup lang="ts" name="DictItem">
import { onMounted, ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { editDict, deleteDict } from '@/api/dicts'
import type { DictsSectionItemProps } from '@/api/dicts'
import { timeFormat } from '@/utils/tools'
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
const dict = ref({ ...props.itemData })
const keyPre = computed(() => {
  const temp = (dict.value?.label || '').split('.')
  delete temp[temp.length - 1]
  return temp.join('.')
})
watch(
  () => props.itemData,
  (val) => {
    dict.value = { ...val }
  }
)
const onSubmit = async () => {
  console.log(
    dict.value.en,
    props.itemData.en,
    JSON.stringify(props.itemData) !== JSON.stringify(dict.value)
  )

  if (JSON.stringify(props.itemData) !== JSON.stringify(dict.value)) {
    console.log(111)
    await editDict(dict.value.id, { ...dict.value, time: +new Date() })
    await props.getData()
    ElMessage.success('编辑成功')
  }
}
const deleteItem = async () => {
  await ElMessageBox.confirm(`确认删除 ${dict.value.label} 的条目吗？`, '⚠️ 警告')
  await deleteDict(dict.value.id)
  await props.getData()
  ElMessage.success('删除成功')
}
</script>
