<template>
  <div class="web-dict-item">
    <template v-if="dict?.node === 1">
      <div class="web-dict-item-node">
        <main>
          <el-icon><PriceTag /></el-icon>
          <strong>{{ props?.section ? dict.key : dict?.label }}</strong>
          <p>{{ dict?.mark }}</p>
        </main>
        <DictToolBar :item-data="dict" :currLang="props.currLang" :get-data="props.getData" />
      </div>
      <DictItem
        v-for="(item, index) in dict.children"
        :currLang="props.currLang"
        :key="index"
        :item-data="item"
        :get-data="props.getData"
      />
      <div class="web-dict-item-empty" v-if="!dict.children && !props?.section">
        <el-icon><Warning /></el-icon> <em>暂无子节点或子翻译条目</em>
      </div>
    </template>
    <EditItem v-else :item-data="dict" :currLang="props.currLang" :get-data="props.getData" />
  </div>
</template>
<script setup lang="ts" name="DictItem">
import { ref, watch } from 'vue'
import { PriceTag, Warning } from '@element-plus/icons-vue'
import type { DictsSectionItemProps } from '@/api/dicts'

import EditItem from './EditItem.vue'
import DictToolBar from './DictToolBar.vue'

const props = defineProps<{
  itemData: DictsSectionItemProps
  getData: () => void
  currLang: string
  section?: boolean
}>()
const currLang = ref('all')
watch(
  () => props.currLang,
  (val) => {
    currLang.value = val
  }
)
const dict = ref(props.itemData)
watch(
  () => props.itemData,
  (val) => {
    dict.value = val
  }
)
</script>
