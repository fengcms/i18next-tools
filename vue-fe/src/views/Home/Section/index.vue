<template>
  <PageHeader
    :pid="pid"
    :sid="sid"
    :mark="section?.mark"
    :p-key="project?.key"
    :s-key="section?.key"
  >
    <el-space>
      当前编辑语言：
      <el-select v-model="currLang" placeholder="Select">
        <el-option
          v-for="item in langOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <ExportJsonButton :currLang="currLang" :section="section" :dicts="dicts" />
      <BatchImportSingleLangButton :section="section" :dicts="dicts" :getData="getData" />
    </el-space>
  </PageHeader>
  <div class="web-section-main">
    <DictItem
      :currLang="currLang"
      section
      :item-data="section ?? DictsItemDefaultData"
      :getData="getData"
    />

    <DictItem
      v-for="(item, index) in dicts"
      :key="index"
      :currLang="currLang"
      :item-data="item"
      :getData="getData"
    />
  </div>
  <div class="web-help">
    <h3>使用帮助</h3>
    <p>
      1. 双击蓝色的 Key 文字，可以复制
      <el-tag type="success">t('key 值')</el-tag> 用于编程中直接粘贴，<el-tag type="warning"
        >前端专用</el-tag
      >
    </p>
    <p>
      2. 如果需要修改 Key 名称，可以点击 Key 名称后面的编辑小图标，进行编辑。
      <el-tag type="warning">在开始编程的情况下，一般不能更改</el-tag>
    </p>
    <p>
      3. 如果你正在编辑某一种语言，可以在右上角下拉框中选择对应的语言，在这种模式下，
      会展示中文和英文字段，用于对照，并且文本输入框会比较长一点，便于录入。
    </p>
    <p>4. 编辑中文和英文的时候，只会展示中英文两个字段，用于对照。</p>
    <p>
      5.
      每一个主键值下，都可以无限级添加子节点，一般情况下，用两到三层子节点，会更有利于翻译人员对照和开发人员编程。
    </p>
    <p>6. 使用子节点，要和页面布局一一对照，这样会更清晰哦！</p>
    <p>
      7. 节点最右侧的箭头按钮，可以展开或隐藏该节点下的翻译条目哦！
      <el-tag type="warning">根节点无此功能，应避免在根节点下直接添加翻译条目</el-tag>
      <el-tag>如果你这么做，说明，该根节点下翻译条目不多，那么就没有必要使用这个功能了。</el-tag>
    </p>
    <p>
      8. Key 值中不能包含空格和标点符号，最好使用驼峰命名方式，如
      <el-tag>Header</el-tag>
      <el-tag>SellPrice</el-tag>等
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDictSection, DictsItemDefaultData } from '@/api/dicts'
import type { DictsItemProps, DictsSectionItemProps } from '@/api/dicts'
import PageHeader from '@@/PageHeader.vue'

import DictItem from './DictItem.vue'
import ExportJsonButton from './ExportJsonButton.vue'
import BatchImportSingleLangButton from './BatchImportSingleLangButton.vue'

const { params } = useRoute()
const pid = String(params.pid)
const sid = String(params.sid)

const project = ref<DictsItemProps>()
const section = ref<DictsItemProps>()
const dicts = ref<DictsSectionItemProps[]>([])

const getData = async () => {
  const res = await getDictSection(pid, sid)
  project.value = res.project
  section.value = res.section
  dicts.value = res.dicts
}
onMounted(async () => {
  await getData()
})

watch(
  () => `${pid}-${sid}`,
  async () => await getData()
)

const currLang = ref('all')
// console.log(currLang.value)
const langOption = [
  { label: '全部', value: 'all' },
  { label: '英语', value: 'en' },
  { label: '中文', value: 'zh' },
  { label: '日本语', value: 'ja' },
  { label: '法语', value: 'fr' },
  { label: '韩语', value: 'ko' },
  { label: '西班牙语', value: 'es' },
  { label: '土耳其语', value: 'tr' }
]
</script>
