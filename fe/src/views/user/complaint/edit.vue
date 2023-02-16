<template>
  <el-dialog :title="`${actionText}投诉建议`" :visible="visible" width="620px" :close-on-click-modal="false" :close-on-press-escape="false" @open="init" @close="close">
    <template v-if="visible">
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="投诉会员" prop="user_name">
          <el-input v-model="form.user_name" placeholder="" disabled :maxlength="100" style="width: 300px" />
        </el-form-item>
        <el-form-item label="投诉主体" prop="defendant">
          <el-input v-model="form.defendant" placeholder="" disabled :maxlength="100" style="width: 300px" />
        </el-form-item>
        <el-form-item label="投诉事由" prop="problem">
          <el-input v-model="form.problem" placeholder="" disabled :maxlength="100" style="width: 500px" />
        </el-form-item>
        <el-form-item label="您的诉求" prop="appeal">
          <el-input v-model="form.appeal" placeholder="" disabled :maxlength="100" style="width: 500px" />
        </el-form-item>
        <el-form-item label="详情描述" prop="detail">
          <el-input v-model="form.detail" placeholder="" disabled type="textarea" :maxlength="1000" :rows="5" style="width: 500px" />
        </el-form-item>
        <el-form-item label="补充图片" prop="img">
          <UpImg v-model="form.img" :limit="1" />
          <Tip block>您还可以补充上传图片</Tip>
        </el-form-item>
        <el-form-item label="网站回复" prop="reply">
          <el-input v-model="form.reply" type="textarea" autocomplete="off" :rows="5" style="width: 500px" />
        </el-form-item>
        <el-form-item label="审核状态" clearable prop="status">
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
import { mapState } from 'vuex'
import { rsaEn } from '@/utils/tools'
export default {
  mixins: [editDialog],
  data () {
    return {
      pageInfo: {
        apiName: 'complaint'
      },
      changePassword: false,
      form: {
        appeal: '',
        defendant: '',
        detail: '',
        img: '',
        problem: '',
        reply: '',
        status: '',
        user_name: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        editor: [
          { required: true, message: '请选择常用编辑器', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3456789]\d{9}$/i, message: '手机号格式不正确', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        website: [
          { type: 'url', message: '网址格式不正确', trigger: 'blur' }
        ]
      },
      base: {
        status: [
          { label: '被驳回', value: 'FAILURE' },
          { label: '审核中', value: 'PENDING' },
          { label: '已回复', value: 'NORMAL' },
          { label: '已完成', value: 'FINISH' }
        ]
      }
    }
  },
  computed: { ...mapState(['user']) },
  methods: {
    beforeSubmit () {
      if (!this.isEdit && !this.user.rsaKey) {
        this.$message.error('RSA加密公钥丢失，请重新登录后重新尝试操作！')
        return false
      }
    },
    calcSubmitData (data) {
      if (data.password) {
        const { rsaKey } = this.user
        data.password = rsaEn(data.password, rsaKey)
      }
      return data
    },
    beforeClose () {
      this.changePassword = false
    }
  }
}
</script>
