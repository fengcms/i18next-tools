<template>
  <el-button type="primary" :icon="Edit" size="small" @click="dialogVisible = true" />

  <el-dialog
    v-model="dialogVisible"
    title="编辑节点"
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
import { ElMessage } from 'element-plus'
import { editDict, getDict, getDicts } from '@/api/dicts'
import type { DictsItemProps } from '@/api/dicts'
import { Edit } from '@element-plus/icons-vue'
// import type { DictsItemProps } from '@/api/dicts'
const props = defineProps<{
  id: string | number
  getData: () => void
}>()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  key: '',
  id: 0,
  pid: 0,
  mark: ''
})
const dialogVisible = ref(false)
const nodeSourceData = ref<DictsItemProps>()
watch(
  () => dialogVisible.value,
  async (show) => {
    if (show) {
      const res = await getDict(props.id)
      const { key, mark, pid, id } = res
      nodeSourceData.value = res
      ruleForm.key = key
      ruleForm.pid = pid
      ruleForm.id = id
      ruleForm.mark = mark ?? ''
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
  if (ruleForm.key === nodeSourceData.value?.key && ruleForm.mark === nodeSourceData.value?.mark) {
    ElMessage.info('您没有修改任何信息')
    return
  }
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const { count } = await getDicts({
        pid: ruleForm.pid,
        'id-neq': ruleForm.id,
        key: ruleForm.key,
        pageSize: -1
      })
      if (count === 0) {
        await editDict(props.id, ruleForm)
        await props.getData()
        onClose()
        ElMessage.success('编辑成功')
      } else {
        ElMessage.error('同一节点下，Key 值不能重复，请检查一下哦！')
      }
    }
  })
}
</script>
