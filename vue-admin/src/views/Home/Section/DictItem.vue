<template>
  <div class="web-dict-item">
    <template v-if="dict?.node === 1">
      <div class="web-dict-item-node">
        <strong>{{ dict?.key }}</strong>
        <p>{{ dict?.mark }}</p>
      </div>
      <DictItem v-for="(item, index) in dict.children" :key="index" :item-data="item" :get-data="props.getData" />
    </template>
    <ul class="web-dict-item-edit" v-else>
      <li>
        <strong>{{ dict.key }}</strong>
      </li>
      <li>{{ dict.en }}</li>
      <li>{{ dict.zh }}</li>
      <li>{{ dict.ja }}</li>
      <li>{{ dict.fr }}</li>
      <li>{{ dict.ko }}</li>
      <li>{{ dict.es }}</li>
      <li>{{ dict.tr }}</li>
      <li>
        <time>{{ dict.time }}</time>
      </li>
      <li><button @click="() => props.getData()">sss</button></li>
    </ul>
  </div>
</template>
<script setup lang="ts" name="DictItem">
import { onMounted, ref, watch } from 'vue'
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
const props = defineProps<{
  itemData: DictsSectionItemProps
  getData: () => void
}>()
const dict = ref(props.itemData)
</script>
