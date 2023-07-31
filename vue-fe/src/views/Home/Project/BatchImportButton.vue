<template>
  <el-button @click="showDialog = true">项目文件批量导入</el-button>
  <el-dialog v-model="showDialog" title="项目文件批量导入" width="800px">
    <el-alert title="非前端开发人员请勿操作！" type="warning" show-icon :closable="false" />
    <br />
    <el-space>
      选择导入的语言：
      <el-select v-model="currLang" placeholder="Select">
        <el-option
          v-for="item in langOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      仅支持中文或者英文的导入文件，不要选错哦！
    </el-space>
    <br /><br />
    <el-input
      type="textarea"
      :rows="8"
      v-model="inputText"
      placeholder="请在文本框内粘贴无错误的翻译文件源码，支持 js 或 json 格式。"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addDict, getDicts } from '@/api/dicts'
import { toType, sleep } from '@/utils/tools'
const props = defineProps<{
  getData: () => void
  pid: string | number
}>()

const showDialog = ref(false)
const inputText = ref('')
const currLang = ref('en')
const langOption = [
  { label: '英语', value: 'en' },
  { label: '中文', value: 'zh' }
]

const upData = async (o: any, node: boolean) => {
  const { ids } = await addDict(o)
  ElMessage.success(`${node ? '节点' : '条目'} ${o.key} 添加成功， id 为 ${ids[0]}`)
  await sleep(500)
  return ids[0]
}

const addDictFunc = async (obj: Record<string, any>, pid: string | number) => {
  const arr = Object.keys(obj)
  for (const i of arr) {
    const t = toType(obj[i])
    if (t === 'object') {
      const o = { key: i, pid, mark: `${i}为批量导入，备注未填写`, node: 1 }
      const id = await upData(o, true)
      await addDictFunc(obj[i], id)
    } else {
      const o = { key: i, pid, node: 0 }
      // @ts-ignore
      o[currLang.value] = obj[i]
      await upData(o, false)
    }
  }
}

const onSubmit = async () => {
  try {
    const text = inputText.value.replace('export default ', '')
    const obj = new Function('return ' + text + ';')()
    if (!obj.section) {
      ElMessage.error('代码缺少 section 字段，该字段标识"段落"名称')
      return
    }
    if (!obj.dicts) {
      ElMessage.error('代码缺少 dicts 字段，该字段为该段落字典详情')
      return
    }
    const { count } = await getDicts({ pid: props.pid, key: obj.section })
    if (count !== 0) {
      ElMessage.error(
        `该项目下，已经有 ${obj.section} 段落，请不要重复导入，如果需要重新导入，请先删除原有段落后再执行导入操作。`
      )
      return
    }
    const pid = await upData({ key: obj.section, pid: props.pid, node: 1 }, true)
    await addDictFunc(obj.dicts, pid)
    ElMessage.success('所有内容已批量导入完毕，检查一下你的工作成果吧！')
    await props.getData()
    showDialog.value = false
    // console.log(JSON.stringify(obj))
  } catch (e) {
    ElMessage.error('输入的代码不符合标准，请仔细检查')
  }
}
</script>
