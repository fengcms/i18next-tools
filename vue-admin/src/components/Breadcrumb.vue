<template>
  <el-breadcrumb>
    <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
    <el-breadcrumb-item v-if="props.pid" :to="`/project/${props.pid}`">{{props.pKey}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="props.sid">{{props.sKey}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
const props = defineProps<{
  pid?: string | number
  pKey?: string
  sid?: string | number
  sKey?: string
}>()
</script>
