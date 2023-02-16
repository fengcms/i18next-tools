<template>
  <div class="video-tool">
    <el-button type="success" @click="initVideoTool">视频地址处理工具</el-button>
    <el-dialog
      title="视频地址处理工具"
      :visible.sync="isShowBox"
      width="600px"
      append-to-body
    >
      <div class="video-tool-content">
        <Tip block>1. 首先去优酷或其他视频网站，获取视频通用分享代码</Tip>
        <img src="/image/youku-help.jpg">
        <Tip block>2. 将复制过来代码，粘贴于下方文本框</Tip>
        <el-input v-model="videoCode" type="textarea" @change="filterCode" />
        <Tip block>3. 点击下方“获取视频地址”按钮，即可完成。</Tip>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">获取视频地址</el-button>
        <el-button @click="isShowBox = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'VideoTool',
  props: {
    value: { type: String, default: '' }
  },
  data () {
    return {
      isShowBox: false,
      videoCode: ''
    }
  },
  methods: {
    initVideoTool () {
      this.isShowBox = true
    },
    filterCode (str) {
      this.videoCode = str.replaceAll('<', '').replaceAll('>', '')
    },
    onSubmit () {
      try {
        const str = this.videoCode.split(' ').find(i => i.includes('src=')).split('src=').pop() || ''
        const url = str.replaceAll('\'', '').replaceAll('\"', '')
        const realUrl = url.substring(0, 2) === '//' ? `https:${url}` : url
        if (isExternal(realUrl)) {
          this.$emit('input', realUrl)
          this.isShowBox = false
          this.$message.success(`获取视频地址成功`)
        } else {
          this.$message.error(`获取视频地址失败，请检查通用代码是否正确`)
        }
      } catch (e) {
        this.$message.error(`获取视频地址失败，请检查通用代码是否正确`)
      }
    }
  }
}
</script>
<style lang="scss">
.video-tool {
  display: inline-block;
}
</style>
