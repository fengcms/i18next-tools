<template>
  <PageHeader :pid="pid" :sid="sid" :mark="section?.mark" :p-key="project?.key" :s-key="section?.key" />
  <div class="web-section-main">
    <DictItem v-for="(item, index) in dicts" :key="index" :item-data="item" :getData="getData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDictSection } from '@/api/dicts'
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
import PageHeader from '@@/PageHeader.vue'

import DictItem from './DictItem.vue'

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
</script>
