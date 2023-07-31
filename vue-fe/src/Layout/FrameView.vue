<template>
  <WebHeader />
  <main class="web-main">
    <router-view :key="$route.path"/>
  </main>
</template>

<script setup lang="ts">
import WebHeader from '@@/WebHeader.vue'
</script>
