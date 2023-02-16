<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="$router.push('/single/add')">添加单页</ControlBtn>
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
      <el-table-column min-width="200" label="单页标题">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.title" />
        </template>
      </el-table-column>
      <el-table-column prop="hits" align="center" label="点击量" width="80" />
      <el-table-column prop="status" label="状态" align="center" width="80" :formatter="tableColFormat" />
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="success" size="small" icon="el-icon-edit" @click="$router.push(`/single/edit/${scope.row.id}`)">编辑</el-button>
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
// import { getChannel } from '@/api/channel'
export default {
  mixins: [listPage, listEdit],
  data () {
    return {
      // 页面基本信息
      pageInfo: {
        listApiName: 'single',
        itemName: '单页'
      },
      // 搜索项配置默认参数，为空的默认参数可不填写
      searchParams: {
        'title-like': ''
      },
      // 数组搜索参数拆解配置
      // 页面搜索项配置，详细配置查看 src/comps/TableSearch.vue 注释
      searchItems: {
        'title-like': {
          placeholder: '请输入标题'
        },
        status: {
          type: 'select', label: '', width: '110', placeholder: '审核状态',
          options: [
            { label: '已通过', value: 'NORMAL' },
            { label: '待审核', value: 'PENDING' }
          ]
        }
      },
      // 表格字段数据格式化配参字典
      tableBase: {}
    }
  },
  methods: {

  }
}
</script>
