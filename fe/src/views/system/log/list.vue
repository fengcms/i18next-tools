<template>
  <PageMain>
    <ControlBox>
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
      <el-table-column prop="type" label="操作类型" width="140" />
      <el-table-column prop="role" label="操作角色" width="140" />
      <el-table-column prop="user_name" label="操作账号" width="150" />
      <el-table-column prop="user_id" label="账号ID" width="100" />
      <el-table-column min-width="200" label="操作详情">
        <template slot-scope="scope">
          <OneLineText :text="scope.row.mark" />
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="操作时间" :formatter="tableColFormatDate" />
      <el-table-column fixed="right" align="center" label="操作" width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="delRowItem(scope.row.id)">删除</el-button>
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
        listApiName: 'log',
        itemName: '超级管理员'
      },
      searchParams: {
        type: null,
        role: null,
        user_name: null,
        time: []
      },
      searchParamsTear: {
        time: 'between'
      },
      searchItems: {
        type: {
          type: 'select', label: '', width: '110', placeholder: '操作类型',
          options: [
            { label: '创建', value: '创建' },
            { label: '修改', value: '修改' },
            { label: '删除', value: '删除' }
          ]
        },
        role: {
          type: 'select', label: '', width: '110', placeholder: '操作角色',
          options: [
            { label: '超级管理员', value: '超级管理员' },
            { label: '编辑', value: '编辑' },
            { label: '注册会员', value: '注册会员' }
          ]
        },
        user_name: {
          placeholder: '操作账号'
        },
        time: {
          type: 'datePicker', label: '', pickerType: 'daterange'
        }
        // mobile: '手机'
      },
      tableBase: {
        editor: {
          MARKDOWN: 'MarkDown 编辑器', RICHEDITOR: '富文本编辑器'
        }
      }
    }
  },
  methods: {
  }
}
</script>
