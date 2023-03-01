<template>
  <div class="login-layout">
    <div class="login">
      <h3>多语言文件管理系统</h3>
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="请输入您的账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入您的密码" />
        </el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">Sign In</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { getRsaKey, login } from '@/api/user'
import { rsaEn } from '@/utils/tools'
import { setToken } from '@/utils/auth'

const router = useRouter()

const form = reactive({
  account: '',
  password: ''
})

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  account: [{ required: true, message: '请输入您的账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入您的密码', trigger: 'blur' }]
})

const rsaKey = ref('')

onMounted(async () => {
  const res = await getRsaKey()
  rsaKey.value = res
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) onSignIn()
  })
}

const onSignIn = async () => {
  const enPw = rsaEn(form.password, rsaKey.value)
  const res = await login({ account: form.account, password: enPw, role: 'admin' })
  setToken(res.token)
  router.push('/')
  console.log('submit!', enPw, res)
}
</script>
