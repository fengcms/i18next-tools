<template>
  <el-dialog :title="`${actionText}栏目`" :visible="visible" width="620px" :close-on-click-modal="false" :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="栏目名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 200px" />
        </el-form-item>
        <el-form-item label="归属栏目" prop="pidArr">
          <el-cascader
            v-model="form.pidArr"
            :options="base.treeChannel"
            :props="{ checkStrictly: true }"
            style="width: 400px"
            clearable
          />
        </el-form-item>
        <el-form-item label="栏目排序" prop="sort">
          <el-input-number v-model="form.sort" :step="1" :precision="0" style="width: 200px" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-input v-model="form.keywords" autocomplete="off" style="width: 300px" />
          <QuickAssistant v-model="form.keywords" type="tags" mode="append" />
          <Tip block>英文逗号隔开</Tip>
        </el-form-item>
        <el-form-item label="栏目广告" prop="show_img">
          <UpImg v-model="form.show_img" :limit="1" />
        </el-form-item>
        <el-form-item label="广告链接" prop="website">
          <el-input v-model="form.website" style="width: 300px" />
        </el-form-item>
        <el-form-item label="栏目描述" prop="description">
          <el-input v-model="form.description" type="textarea" autocomplete="off" style="width: 500px" />
        </el-form-item>
        <el-form-item label="显示状态" clearable prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="i in base.status" :key="i.value" :label="i.value">{{ i.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" :loading="sumbiting" @click="submit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import editDialog from '@/mixin/editDialog'
export default {
  mixins: [editDialog],
  props: {
    addPid: {
      type: Number, default: 0
    }
  },
  data () {
    return {
      pageInfo: {
        apiName: 'channel'
      },
      form: {
        name: '',
        pidArr: [],
        sort: 0,
        keywords: '',
        show_img: '',
        description: '',
        status: 'NORMAL'
      },
      base: {
        treeChannel: [{ label: '顶级栏目', value: 0, children: [] }],
        channel: [],
        status: [
          { label: '显示', value: 'NORMAL' },
          { label: '隐藏', value: 'HIDE' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        pidArr: [
          { required: true, type: 'array', message: '请选择归属栏目', trigger: 'blur' }
        ],
        sort: [
          { required: true, type: 'number', message: '请输入栏目排序', trigger: 'blur' }
        ],
        website: [
          { type: 'url', message: '网址格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addInit () {
      this.form.pidArr = this.calcPidArr(this.addPid)
    },
    beforeInit () {
      this.base.treeChannel[0].children = this.$store.state.article.treeChannel
      this.base.channel = this.$store.state.article.channel
    },
    beforeGetData () {
      this.base.treeChannel[0].children = this.$store.state.article.treeChannel
      this.base.channel = this.$store.state.article.channel
    },
    afterGetData (data) {
      data.pidArr = this.calcPidArr(data.pid)
      return data
    },
    calcSubmitData (data) {
      data.pid = data.pidArr.pop()
      delete data.pidArr
      return data
    },
    afterSubmit () {
      this.$store.dispatch('article/getChannel')
      this.$store.dispatch('article/getTreeChannel')
    },
    calcPidArr (pid) {
      const channel = []
      const calcChan = (id) => {
        const chanItem = this.base.channel.filter(i => i.id === id)[0]
        channel.push(chanItem.id)
        if (chanItem.pid !== 0) calcChan(chanItem.pid)
      }
      pid !== 0 && calcChan(pid)
      channel.reverse()
      return [0, ...channel]
    }
  }
}
</script>
