<template>
  <PageMain>
    <div class="welcome">欢迎 {{ user.name }} 来到管理后台，愉快的开始一天的工作吧！</div>
    <FlexBox :gutter="20">
      <!-- <CardItem label="待审核文章" icon="el-icon-document" value="10" />
      <CardItem label="全部文章" icon="el-icon-document" value="100" /> -->
      <CardItem
        v-for="(i, k) in cards"
        :key="k"
        :value="dashboard[i.field]"
        :label="i.label"
        :to="i.url"
        :icon="i.icon"
        :color="i.color"
        :prefix="i.prefix"
        :suffix="i.suffix"
      />
    </FlexBox>
    <!-- <div class="dashboard-text">role: {{ user.role }}</div> -->
  </PageMain>
</template>

<script>
import { mapState } from 'vuex'
import { getSiteCount } from '@/api/user'
export default {
  name: 'Dashboard',
  data () {
    return {
      cards: [
        { label: '待审核文章', field: 'checkArticle', color: 'orange', icon: 'el-icon-document', url: '/article?status=PENDING', suffix: '篇' },
        { label: '待审核会员', field: 'checkComplaint', color: 'green', icon: 'el-icon-user', url: '/user?status=PENDING', suffix: '人' },
        { label: '待处理投诉', field: 'checkUser', color: 'red', icon: 'el-icon-chat-dot-square', url: '/user/complaint?status=PENDING', suffix: '件' },
        { label: '待处理申请', field: 'checkApply', color: 'cyan', icon: 'el-icon-chat-line-round', url: '', suffix: '条' },
        { label: '全部文章', field: 'article', color: 'blue', icon: 'el-icon-document', url: '/article', suffix: '篇' },
        { label: '全部会员', field: 'user', color: 'purple', icon: 'el-icon-user', url: '/user/', suffix: '人' },
        { label: '全部投诉', field: 'complaint', color: 'yellow', icon: 'el-icon-chat-dot-square', url: '/user/complaint', suffix: '件' },
        { label: '全部申请', field: 'apply', color: 'magenta', icon: 'el-icon-chat-line-round', url: '', suffix: '条' }
      ],
      dashboard: {}
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const { data } = await getSiteCount()
      console.log(data)
      this.dashboard = data
    }
  }
}
</script>

<style lang="scss">
  .welcome {
    font-size: 13px;background: #f9f9f9;margin: -15px -15px 10px;height: 40px;line-height: 40px;padding: 0 15px;color: #1890ff;
  }

</style>
