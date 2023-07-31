<template>
  <header class="web-header">
    <h1>多语言管理系统</h1>
    <el-button size="small" @click="goSignOut">退出登录</el-button>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { logout, getProfile } from '@/api/user'
const router = useRouter()
const goSignOut = async () => {
  await logout()
  router.push('/login')
  ElMessage.success('退出成功')
}

onMounted(async () => {
  await getProfile()
})
</script>
