<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(i, k) in channelNames" :key="k">{{ i }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'ChannelBreadcrumb',
  props: {
    channelNames: {
      type: Array,
      default: () => []
    }
  }
}
</script>
