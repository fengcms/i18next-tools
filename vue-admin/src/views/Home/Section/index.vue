<template>
  <PageHeader
    :pid="pid"
    :sid="sid"
    :mark="section?.mark"
    :p-key="project?.key"
    :s-key="section?.key"
  >
    <el-space>
      当前编辑语言：
      <el-select v-model="currLang" placeholder="Select">
        <el-option
          v-for="item in langOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <ExportJsonButton :currLang="currLang" :section="section" :dicts="dicts" />
    </el-space>
  </PageHeader>
  <div class="web-section-main">
    <DictItem :currLang="currLang" section :item-data="section" :getData="getData" />

    <DictItem
      v-for="(item, index) in dicts"
      :key="index"
      :currLang="currLang"
      :item-data="item"
      :getData="getData"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDictSection } from '@/api/dicts'
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
import PageHeader from '@@/PageHeader.vue'

import DictItem from './DictItem.vue'
import ExportJsonButton from './ExportJsonButton.vue'

const { params } = useRoute()
const pid = String(params.pid)
const sid = String(params.sid)

const project = ref<DictsItemProps>()
const section = ref<DictsItemProps>()
const dicts = ref<DictsSectionItemProps[]>([])

const getData = async () => {
  const res = await getDictSection(pid, sid)
  project.value = res.project
  section.value = res.section
  dicts.value = res.dicts
}
onMounted(async () => {
  await getData()
})

watch(
  () => `${pid}-${sid}`,
  async () => await getData()
)

const currLang = ref('all')
// console.log(currLang.value)
const langOption = [
  { label: '全部', value: 'all' },
  { label: '英语', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '日本语', value: 'ja' },
  { label: '法语', value: 'fr' },
  { label: '韩语', value: 'ko' },
  { label: '西班牙语', value: 'es' },
  { label: '土耳其语', value: 'tr' }
]
</script>
