<template>
  <el-button type="success" @click="dialogVisible = true"> 编辑 </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="编辑项目"
    width="500px"
    :before-close="onClose"
    append-to-body
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item label="项目名称" prop="key">
        <el-input v-model="ruleForm.key" />
      </el-form-item>
      <el-form-item label="项目备注" prop="mark">
        <el-input v-model="ruleForm.mark" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onSubmit"> 确认 </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { editDict, getDict } from '@/api/dicts'
// import type { DictsItemProps } from '@/api/dicts'
const props = defineProps<{
  id: string | number
  getData: () => void
}>()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  key: '',
  mark: '',
  pid: 0,
  node: 1
})
const dialogVisible = ref(false)

watch(
  () => dialogVisible.value,
  async (show) => {
    console.log(props.id)
    if (show) {
      const { key, mark, pid, node } = await getDict(props.id)
      ruleForm.key = key
      ruleForm.mark = mark ?? ''
      ruleForm.pid = pid
      ruleForm.node = node
    }
  }
)

const rules = reactive<FormRules>({
  key: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  mark: [{ required: true, message: '请输入项目备注', trigger: 'blur' }]
})

const onClose = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.resetFields()
  dialogVisible.value = false
}

const onSubmit = async () => {
  if (!ruleFormRef.value) return
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      await editDict(props.id, ruleForm)
      await props.getData()
      onClose()
    }
  })
}
</script>
