<template>
  <el-page-header
    @back="home ? $router.push('/') : $router.back()"
    :icon="home ? null : ArrowLeft"
    :title="home ? ' ' : '返回'"
  >
    <template #content>
      <Breadcrumb :pid="props?.pid" :pKey="props?.pKey" :sid="props?.sid" :sKey="props?.sKey" />
    </template>
    <template #extra>
      <slot></slot>
    </template>
    <el-alert v-if="props?.mark" type="info" :description="props?.mark" :closable="false" />
  </el-page-header>
</template>

<script lang="ts" setup>
import Breadcrumb from '@@/Breadcrumb.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
const props = defineProps<{
  home?: boolean
  pid?: string | number
  pKey?: string
  sid?: string | number
  sKey?: string
  mark?: string | null
}>()
</script>
