<template>
  <el-button @click="showDialog = true">批量导入单语言</el-button>
  <el-dialog v-model="showDialog" title="批量导入单语言" width="800px">
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
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
import { editDict } from '@/api/dicts'
import { toType, sleep } from '@/utils/tools'
const props = defineProps<{
  section?: DictsItemProps
  dicts: DictsSectionItemProps[]
  getData: () => void
}>()
const showDialog = ref(false)
const inputText = ref('')
const currLang = ref('en')
const langOption = [
  { label: '英语', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '日本语', value: 'ja' },
  { label: '法语', value: 'fr' },
  { label: '韩语', value: 'ko' },
  { label: '西班牙语', value: 'es' },
  { label: '土耳其语', value: 'tr' }
]

const addDictFunc = async (obj: Record<string, any>, sourceDicts: Record<string, any>) => {
  const arr = Object.keys(obj)
  for (const i of arr) {
    const t = toType(obj[i])
    if (sourceDicts[i]) {
      if (t === 'object') {
        await addDictFunc(obj[i], sourceDicts[i].child)
      } else {
        const o = {}
        // @ts-ignore
        o[currLang.value] = obj[i]
        const id = sourceDicts[i].id
        await editDict(id, o)
        ElMessage.success(`ID 为 ${id} 的条目更新语言字段成功！`)
        await sleep(500)
      }
    } else {
      ElMessage.error(
        `Key 值为 ${i}, 翻译为 ${obj[i]} 的条目在表格中没有哦！请在导入完成后，再检查一下！`
      )
    }
  }
}

const formatDicts = (arr: DictsSectionItemProps[]) => {
  const o = {}
  for (const i of arr) {
    if (i.node === 1) {
      // @ts-ignore
      o[i.key] = { child: i.children ? formatDicts(i.children) : {}, id: i.id }
    } else {
      // @ts-ignore
      o[i.key] = { value: i[props.currLang], id: i.id }
    }
  }
  return o
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
    if (obj.section !== props.section?.key) {
      ElMessage.error(
        `导入段落名称为 ${obj.section}，和本页面编辑段落名称 ${props.section?.key} 不一致，是不是搞错了啊！`
      )
      return
    }
    const sourceDicts = formatDicts(props.dicts)
    await addDictFunc(obj.dicts, sourceDicts)
    ElMessage.success('所有内容已批量导入完毕，检查一下你的工作成果吧！')
    await props.getData()
    showDialog.value = false
    inputText.value = ''
    currLang.value = 'en'
  } catch (e) {
    console.log(e)
    ElMessage.error('输入的代码不符合标准，请仔细检查')
  }
}
</script>
