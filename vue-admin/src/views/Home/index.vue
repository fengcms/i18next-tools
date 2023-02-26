<template>
  <AddProjectButton />
  <p>{{ list }}</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getDicts } from '@/api/dicts'
import type { DictsItemProps } from '@/api/dicts'
import AddProjectButton from './AddProjectButton.vue'

const list = ref<DictsItemProps[]>([])

onMounted(async () => {
  const res = await getDicts({ pid: 0, pageSize: -1 })
  list.value = res.list
  console.log(res)
})
</script>
