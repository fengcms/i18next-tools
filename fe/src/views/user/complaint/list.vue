<template>
  <PageMain>
    <ControlBox v-permission="['admin']">
      <ControlBtn icon="el-icon-delete" type="danger" @click="batchDelRowItem">批量删除</ControlBtn>
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
      <el-table-column min-width="120" label="投诉主体">
        <template slot-scope="scope">
          <OneLineText outer-link :text="scope.row.defendant" />
        </template>
      </el-table-column>
      <el-table-column prop="problem" label="投诉事由" min-width="120">
        <template slot-scope="scope">
          <OneLineText outer-link :text="scope.row.problem" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="80" :formatter="tableColFormat" />
      <el-table-column prop="time" label="投诉日期" align="center" width="180" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button-group>
            <el-button v-if="['NORMAL', 'PENDING'].includes(scope.row.status)" type="success" size="small" icon="el-icon-edit" @click="editItem(scope.row)">编辑</el-button>
            <el-button v-permission="['admin']" type="danger" size="small" icon="el-icon-delete" @click="delRowItem(scope.row.id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </TableList>
    <editBox :visible="editStatus.showEdit" :edit-dat="editStatus.editDat" @close="closeEditBox" />
  </PageMain>
</template>
<script>
import listPage from '@/mixin/listPage'
import listEdit from '@/mixin/listEdit'
import editBox from './edit'
// import { getChannel } from '@/api/channel'
export default {
  components: { editBox },
  mixins: [listPage, listEdit],
  data () {
    return {
      // 页面基本信息
      pageInfo: {
        listApiName: 'complaint',
        itemName: '文章'
      },
      // 搜索项配置默认参数，为空的默认参数可不填写
      searchParams: {
        'defendant-like': '',
        'problem-like': '',
        status: null,
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
        'defendant-like': { placeholder: '投诉主体' },
        'problem-like': { placeholder: '投诉事由' },
        status: {
          type: 'select', label: '', width: '110', placeholder: '审核状态',
          options: [
            { label: '已回复', value: 'NORMAL' },
            { label: '审核中', value: 'PENDING' },
            { label: '被驳回', value: 'FAILURE' },
            { label: '已完成', value: 'FINISH' }
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

  }
}
</script>
