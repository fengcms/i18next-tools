<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="$router.push('/article/add')">添加文章</ControlBtn>
      <ControlBtn v-permission="['admin']" icon="el-icon-delete" type="danger" @click="batchDelRowItem">批量删除</ControlBtn>
    </ControlBox>
    <TableSearch :model="searchParams" :items="searchItems" @upSearchParams="upSearchParams" />
    <TableList
      :table-loading="tableLoading"
      :table-data="tableData"
      :page-result="pageResult"
      :page-curr-change="pageCurrChange"
      :selection-change="selectionChange"
    >
      <el-table-column type="selection" align="center" width="45" />
      <el-table-column prop="id" align="center" label="ID" width="50" />
      <el-table-column min-width="200" label="文章标题">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.title" />
        </template>
      </el-table-column>
      <el-table-column prop="channelNames" label="归属栏目" min-width="180">
        <template slot-scope="scope">
          <ChannelBreadcrumb :channel-names="scope.row.channelNames" />
        </template>
      </el-table-column>
      <el-table-column label="封面图片" align="center" width="100">
        <template slot-scope="scope">
          <TableImage :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80" :formatter="tableColFormat" />
      <el-table-column prop="istop" label="是否置顶" align="center" width="80" :formatter="tableColFormat" />
      <!-- <el-table-column label="置顶" align="center" width="100">
        <template slot-scope="scope">
          <el-button :type="scope.row.istop === 0 ? 'success' : 'info'" size="small" @click="actionTop(scope.row)">
            {{ scope.row.istop === 1 ? '取消' : '置顶'}}
          </el-button>
        </template>
      </el-table-column> -->
      <el-table-column prop="type" label="文章类型" align="center" width="80" :formatter="tableColFormat" />
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="success" size="small" icon="el-icon-edit" @click="$router.push(`/article/edit/${scope.row.id}`)">编辑</el-button>
            <el-button v-permission="['admin']" type="danger" size="small" icon="el-icon-delete" @click="delRowItem(scope.row.id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </TableList>
  </PageMain>
</template>
<script>
import listPage from '@/mixin/listPage'
import listEdit from '@/mixin/listEdit'
import request from '@/utils/request'
// import { getChannel } from '@/api/channel'
export default {
  mixins: [listPage, listEdit],
  data () {
    return {
      // 页面基本信息
      pageInfo: {
        listApiName: 'article',
        itemName: '文章'
      },
      // 搜索项配置默认参数，为空的默认参数可不填写
      searchParams: {
        'title-like': '',
        channel_id: [],
        status: null,
        type: null,
        time: []
      },
      // 数组搜索参数拆解配置
      // 详细配置查看 src/mixin/listPage.js calcSearchParams 函数注释
      searchParamsTear: {
        time: 'between',
        channel_id: 'pop'
      },
      // 页面搜索项配置，详细配置查看 src/comps/TableSearch.vue 注释
      searchItems: {
        'title-like': {
          placeholder: '请输入标题'
        },
        channel_id: {
          type: 'cascader', label: '', options: this.$store.state.article.treeChannel, checkStrictly: false, placeholder: '请选择归属栏目'
        },
        status: {
          type: 'select', label: '', width: '110', placeholder: '审核状态',
          options: [
            { label: '已通过', value: 'NORMAL' },
            { label: '待审核', value: 'PENDING' },
            { label: '未通过', value: 'FAILURE' }
          ]
        },
        type: {
          type: 'select', width: '110', placeholder: '文章类型',
          options: [
            { label: '普通', value: 'NORMAL' },
            { label: '要闻', value: 'TOP' },
            { label: '热点', value: 'RECOMMEND' },
            { label: '多媒体', value: 'PHOTO' },
            { label: '舆情', value: 'HOT' },
            { label: '幻灯', value: 'FOCUS' }
          ]
        },
        istop: {
          type: 'select', width: '110', placeholder: '是否置顶',
          options: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]
        },
        time: {
          type: 'datePicker', label: '', pickerType: 'daterange'
        }
      },
      // 表格字段数据格式化配参字典
      tableBase: {}
    }
  },
  methods: {
    async afterGetData (data) {
      data.list = data.list.map(i => {
        const { channelIds, channelNames } = this.calcChannel(i.channel_id)
        return {
          ...i, channelIds, channelNames
        }
      })
      return data.list
    },
    async actionTop (item) {
      await request({
        url: `${this.pageInfo.listApiName}/${item.id}`,
        method: 'put',
        data: {
          istop: item.istop === 1 ? 0 : 1
        }
      })
      this.$message.success('文章置顶操作成功')
      this.getData()
    },
    calcChannel (id) {
      const { channel } = this.$store.state.article
      const channelNames = []
      const channelIds = []
      const calcChan = (id) => {
        const chanItem = channel.find(i => i.id === id)
        if (chanItem) {
          channelIds.push(chanItem.id)
          channelNames.push(chanItem.name)
          if (chanItem.pid !== 0) calcChan(chanItem.pid)
        }
      }
      calcChan(id)
      channelIds.reverse()
      channelNames.reverse()
      return {
        channelIds,
        channelNames
      }
    }
  }
}
</script>
