<template>
  <el-button @click="onExportOpen">导出 JSON</el-button>
  <el-drawer v-model="showDrawer" title="I am the title" :with-header="false" size="80%">
    <el-tabs v-model="tabActiveName">
      <el-tab-pane label="JS 格式" name="js">
        <el-button @click="onCopy(resultJs)">复制代码到剪切板</el-button>

        <div v-highlight>
          <pre><code class="javascript">{{ resultJs }}</code></pre>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Json 格式" name="json">
        <el-button @click="onCopy(resultJson)">复制代码到剪切板</el-button>

        <div v-highlight>
          <pre><code class="json">{{ resultJson }}</code></pre>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import { useRoute } from 'vue-router'
// import { getDictSection } from '@/api/dicts'
import { ElMessage } from 'element-plus'
// @ts-ignore
import stringifyObject from 'stringify-object'
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
import { copyText } from '@/utils/tools'

const props = defineProps<{
  section?: DictsItemProps
  dicts: DictsSectionItemProps[]
  currLang: string
}>()
const resultJs = ref('')
const resultJson = ref('')
const showDrawer = ref(false)
const tabActiveName = ref('js')

const onExportOpen = () => {
  if (props.currLang === 'all') {
    ElMessage.error('请在前面下拉框中选择要导出的语言，不能为全部，只能一个一个导出。')
    return
  }
  const resultObj = {
    section: props.section?.key,
    dicts: {}
  }

  const formatDicts = (arr: DictsSectionItemProps[]) => {
    const o = {}
    for (const i of arr) {
      if (i.node === 1) {
        // @ts-ignore
        o[i.key] = i.children ? formatDicts(i.children) : {}
      } else {
        // @ts-ignore
        o[i.key] = i[props.currLang]
      }
    }
    return o
  }
  resultObj.dicts = formatDicts(props.dicts)
  showDrawer.value = true
  resultJs.value = `export default ${stringifyObject(resultObj, { indent: '  ' })}`
  resultJson.value = JSON.stringify(resultObj, null, '  ')
}

const onCopy = async (str: string) => {
  await copyText(str)
  ElMessage.success('代码复制成功，去编辑器里粘贴吧！')
  showDrawer.value = false
}
</script>
