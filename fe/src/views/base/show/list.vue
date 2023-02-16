<template>
  <PageMain>
    <ControlBox>
      <ControlBtn icon="el-icon-plus" @click="addItem">添加{{ pageInfo.itemName }}</ControlBtn>
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
      <el-table-column prop="name" label="名称" min-width="140" />
      <el-table-column prop="mark" label="说明" min-width="180">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.mark" />
        </template>
      </el-table-column>
      <el-table-column label="广告图" align="center" width="100">
        <template slot-scope="scope">
          <TableImage :src="scope.row.img" />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" min-width="180">
        <template slot-scope="scope">
          <OneLineText :link="scope.row.link" :text="scope.row.link" />
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="更新时间" :formatter="tableColFormatDate" />
      <el-table-column prop="status" width="100" label="更新时间" :formatter="tableColFormat" />
      <el-table-column fixed="right" align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button v-permission="['admin']" type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
          <el-button v-permission="['admin']" type="text" size="small" @click="delRowItem(scope.row.id)">删除</el-button>
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
export default {
  components: { editBox },
  mixins: [listPage, listEdit],
  data () {
    return {
      pageInfo: {
        listApiName: 'show',
        itemName: '广告'
      },
      searchParams: {},
      searchItems: {
        'name-like': '名称',
        status: {
          type: 'select', label: '', width: '110', placeholder: '是否启用',
          options: [
            { label: '启用', value: 'ENABLED' },
            { label: '禁用', value: 'DISABLED' }
          ]
        }
      },
      tableBase: {}
    }
  },
  methods: {
  }
}
</script>
