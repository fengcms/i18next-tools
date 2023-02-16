<template>
  <el-dialog :title="`${actionText}友情链接`" :visible="visible" width="620px" :close-on-click-modal="false" destroy-on-close :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="form.name" style="width: 200px" />
        </el-form-item>
        <el-form-item label="网站网址" prop="link">
          <el-input v-model="form.link" style="width: 300px" />
        </el-form-item>
        <el-form-item label="栏目排序" prop="sort">
          <el-input-number v-model="form.sort" :step="1" :precision="0" style="width: 200px" />
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input v-model="form.mark" type="textarea" autocomplete="off" style="width: 500px" />
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
  data () {
    return {
      pageInfo: {
        apiName: 'flink'
      },
      form: {
        name: '',
        mark: '',
        link: '',
        sort: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        link: [
          { required: true, type: 'url', message: '网址格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {}
}
</script>
