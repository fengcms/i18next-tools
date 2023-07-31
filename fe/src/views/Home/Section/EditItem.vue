<template>
  <ul class="web-dict-item-edit">
    <li>
      <div class="web-dict-item-edit-key" :class="{ edit: isEditKey }">
        <template v-if="isEditKey">
          <el-input v-model="dict.key" placeholder="键值"
            ><template #prepend>{{ keyPre }}</template></el-input
          >
          <el-button @click="onSubmit()" type="primary" :icon="Check" />
        </template>
        <template v-else>
          <el-icon><PriceTag /></el-icon>
          <strong @dblclick="copyLabel(dict.label ?? dict.key)">{{
            dict.label ?? dict.key
          }}</strong>
          <el-icon @click="isEditKey = true"><Edit /></el-icon>
        </template>
      </div>
    </li>

    <li>
      <el-tooltip effect="dark" :content="dict.zh" placement="right" :disabled="!Boolean(dict.zh)">
        <el-input
          :disabled="!['zh', 'all'].includes(currLang)"
          v-model="dict.zh"
          placeholder="中文"
      /></el-tooltip>
    </li>
    <li>
      <el-tooltip effect="dark" :content="dict.en" placement="right" :disabled="!Boolean(dict.en)">
        <el-input
          :disabled="!['en', 'all'].includes(currLang)"
          v-model="dict.en"
          placeholder="英语"
      /></el-tooltip>
    </li>
    <li v-show="['ja', 'all'].includes(currLang)">
      <el-tooltip effect="dark" :content="dict.ja" placement="right" :disabled="!Boolean(dict.ja)">
        <el-input v-model="dict.ja" placeholder="日本语" />
      </el-tooltip>
    </li>
    <li v-show="['fr', 'all'].includes(currLang)">
      <el-tooltip effect="dark" :content="dict.fr" placement="right" :disabled="!Boolean(dict.fr)">
        <el-input v-model="dict.fr" placeholder="法语"
      /></el-tooltip>
    </li>
    <li v-show="['ko', 'all'].includes(currLang)">
      <el-tooltip effect="dark" :content="dict.ko" placement="right" :disabled="!Boolean(dict.ko)">
        <el-input v-model="dict.ko" placeholder="韩语"
      /></el-tooltip>
    </li>
    <li v-show="['es', 'all'].includes(currLang)">
      <el-tooltip effect="dark" :content="dict.es" placement="right" :disabled="!Boolean(dict.es)">
        <el-input v-model="dict.es" placeholder="西班牙语"
      /></el-tooltip>
    </li>
    <li v-show="['tr', 'all'].includes(currLang)">
      <el-tooltip effect="dark" :content="dict.tr" placement="right" :disabled="!Boolean(dict.tr)">
        <el-input v-model="dict.tr" placeholder="土耳其语"
      /></el-tooltip>
    </li>
    <li>
      <el-button type="primary" size="small" :disabled="!isEdit" @click="onSubmit()"
        >保存</el-button
      >
      <el-button type="danger" size="small" :icon="Delete" @click="deleteItem()"></el-button>
    </li>
    <li>
      <time>{{ timeFormat(dict.time, 'MM-DD HH:mm:ss') }}</time>
    </li>
  </ul>
</template>
<script setup lang="ts" name="DictItem">
import { ref, watch, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PriceTag, Delete, Edit, Check } from '@element-plus/icons-vue'
import { editDict, deleteDict, getDicts } from '@/api/dicts'
import type { DictsSectionItemProps } from '@/api/dicts'
import { timeFormat, copyText } from '@/utils/tools'
const props = defineProps<{
  itemData: DictsSectionItemProps
  getData: () => void
  currLang: string
}>()
const currLang = ref('all')
const dict = ref({ ...props.itemData })
const isEditKey = ref(false)
watch(
  () => props.currLang,
  (val) => {
    currLang.value = val
  }
)

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
onMounted(() => {
  currLang.value = props.currLang
})

const isEdit = computed(() => JSON.stringify(props.itemData) !== JSON.stringify(dict.value))
const onSubmit = async () => {
  if (isEditKey.value) isEditKey.value = false
  if (isEdit.value) {
    const { count } = await getDicts({
      pid: dict.value.pid,
      'id-neq': dict.value.id,
      key: dict.value.key,
      pageSize: -1
    })
    if (count === 0) {
      await editDict(dict.value.id, { ...dict.value, time: +new Date() })
      await props.getData()

      ElMessage.success('编辑成功')
    } else {
      ElMessage.error('同一节点下，Key 值不能重复，请检查一下哦！')
    }
  }
}
const deleteItem = async () => {
  await ElMessageBox.confirm(`确认删除 ${dict.value.label} 的条目吗？`, '⚠️ 警告')
  await deleteDict(dict.value.id)
  await props.getData()
  ElMessage.success('删除成功')
}

const copyLabel = async (label: string) => {
  await copyText(`t('${label}')`)
  ElMessage.success(`t('${label}') 已经复制到剪切板`)
}
</script>
