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
      <el-table-column prop="name" label="来源名称" min-width="140" />
      <el-table-column label="LOGO" align="center" width="100">
        <template slot-scope="scope">
          <TableImage :src="scope.row.logo" />
        </template>
      </el-table-column>
      <el-table-column prop="contact" label="联系人" width="130" />
      <el-table-column prop="mobile" label="手机" width="130" />
      <el-table-column prop="email" label="邮箱" width="180">
        <template slot-scope="scope">
          <OneLineText :link="`${scope.row.email}`" mail :text="scope.row.email" />
        </template>
      </el-table-column>
      <el-table-column label="主页" width="180">
        <template slot-scope="scope">
          <OneLineText :link="scope.row.website" :text="scope.row.website" />
        </template>
      </el-table-column>
      <el-table-column prop="time" width="180" label="入驻时间" :formatter="tableColFormatDate" />
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
        listApiName: 'origin',
        itemName: '来源'
      },
      searchParams: {},
      searchItems: {
        'name-like': '姓名',
        'contact-like': '联系人',
        mobile: '手机'
      },
      tableBase: {}
    }
  },
  methods: {
  }
}
</script>
