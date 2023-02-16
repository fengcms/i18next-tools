<template>
  <el-dialog :title="`${actionText}广告`" :visible="visible" width="620px" :close-on-click-modal="false" destroy-on-close :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="广告名称" prop="name">
          <el-input v-model="form.name" style="width: 200px" />
        </el-form-item>
        <el-form-item label="广告图片" prop="img">
          <UpImg v-model="form.img" :limit="1" />
        </el-form-item>
        <el-form-item label="广告链接" prop="link">
          <el-input v-model="form.link" style="width: 300px" />
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio v-for="i in base.status" :key="i.value" :label="i.value">{{ i.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告说明" prop="mark">
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
        apiName: 'show'
      },
      form: {
        name: '',
        mark: '',
        img: '',
        status: 'ENABLED',
        link: ''
      },
      base: {
        status: [
          { label: '启用', value: 'ENABLED' },
          { label: '禁用', value: 'DISABLED' }
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        img: [
          { required: true, message: '请上传广告图片', trigger: 'blur' }
        ],
        link: [
          { type: 'url', message: '网址格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {}
}
</script>
