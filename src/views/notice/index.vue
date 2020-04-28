<template>
  <div class="notice-content">
    <div class="notice-content-header">
      <h1>公告管理</h1>
      <el-button
        v-if="false"
        type="primary"
        @click="foundNotice"
      >创建公告</el-button>
    </div>
    <el-card
      v-if="false"
      shadow="hover"
    >
      <el-form
        :inline="true"
        size="small"
        :model="search"
        class=""
      >
        <el-form-item
          label="关键词:"
          prop=""
        >
          <el-input
            v-model="search.key_word"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="弹窗类型:">
          <el-select
            v-model="search.type"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.NOTICE_TYPE.NOTICE_TYPE_STATUS()"
              :key="i"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="form-btn__defalut"
            type="success"
            @click="searchShop"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:25px;">
      <div
        slot="header"
        class="clearfix"
      >
        <span>公告明细</span>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="noticeTitle"
          label="标题"
        />
        <el-table-column
          prop="noticeContent"
          width="500"
          label="内容"
        />
        <el-table-column
          prop=""
          label="状态"
        >
          <template slot-scope="scope">
            <span :class="{class1:scope.row.noticeStatus===1,class2:scope.row.noticeStatus===2}">
              {{ changeNoticeStatus(scope.row.noticeStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="弹窗类型"
        >
          <template slot-scope="scope">
            {{ changeNoticeType(scope.row.noticeType) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.noticeStatus === 2"
              type="success"
              size="small"
              @click="useNotice(scope)"
            >使用</el-button>
            <el-button
              v-if="scope.row.noticeStatus === 1"
              type="danger"
              size="small"
              @click="stopNotice(scope)"
            >停用</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="false"
        background
        layout="prev, pager, next, jumper"
        :current-page="currentPage"
        style="margin-top:30px;"
        @current-change="handleCurrentChange"
      />
      <el-dialog
        :append-to-body="appendToBody"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="590px"
      >
        <el-form
          ref="noticeFrom"
          label-position="left"
          :model="noticeFrom"
          label-width="100px"
          :rules="rules"
        >
          <el-form-item
            label="标题"
            prop="notice_title"
          >
            <el-input
              v-model="noticeFrom.noticeTitle"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item
            label="内容"
            prop="notice_content"
          >
            <el-input
              v-model="noticeFrom.noticeContent"
              autosize
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item
            label="选择公告类型"
            prop=""
          >
            <el-radio-group
              v-model="noticeFrom.noticeType"
              :disabled="true"
              disable
            >
              <el-radio label="1">弹窗公告</el-radio>
              <el-radio label="2">首页公告</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="选择公告状态"
            prop=""
          >
            <el-radio-group
              v-model="noticeFrom.noticeStatus"
              :disabled="true"
            >
              <el-radio
                disable
                :label="1"
              >使用</el-radio>
              <el-radio
                disable
                :label="2"
              >停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="handleClose">取 消</el-button>
          <el-button
            type="primary"
            @click="submit('noticeFrom')"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getNotice, updateNotice, lowerNotice, upperNotice } from '@/api/notice'
import { startLoading, closeLoading, message } from '@/utils/loading'
export default {
  data() {
    return {
      search: {},
      shopList: [],
      currentPage: 1,
      tableData: [],
      dialogVisible: false,
      dialogTitle: '',
      noticeFrom: {
        noticeTitle: '',
        noticeContent: '',
        noticeType: '1',
        noticeStatus: 1
      },
      noticeDetals: {},
      appendToBody: true,
      rules: {
        noticeTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        noticeContent: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      },
      noticeId: 0
    }
  },
  mounted() {
    this.getNoticeFun()
  },
  methods: {
    // 获取全部公告
    getNoticeFun() {
      let _this = this
      startLoading()
      getNotice('notice/getNotice').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = res.data.data
        }
      }).catch(() => { })
    },
    // 使用公告
    useNotice(scope) {
      this.upperNoticeFun(scope)
    },
    // 使用公告接口
    upperNoticeFun(scope, noticeStatus) {
      let _this = this
      startLoading()
      let data = {
        id: scope.row.id,
        noticeStatus: 1
      }
      upperNotice('notice/upperNotice', data).then(res => {
        closeLoading()
        if (res.data) {
          this.$confirm(`是否使用${_this.changeNoticeType(scope.row.noticeType)}?`, '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              message('success', `${_this.changeNoticeType(scope.row.noticeType)}使用成功！`)
              _this.getNoticeFun()
            })
            .catch(action => {
              message('info', '取消')
            })
        }
      }).catch(() => { })
    },
    // 停用公告
    stopNotice(scope) {
      this.lowerNoticeFun(scope)
    },
    // 停用公告接口
    lowerNoticeFun(scope, noticeStatus) {
      let _this = this
      startLoading()
      let data = {
        id: scope.row.id,
        noticeStatus: 2
      }
      lowerNotice('notice/lowerNotice', data).then(res => {
        closeLoading()
        if (res.data) {
          this.$confirm(`是否停用${_this.changeNoticeType(scope.row.noticeType)}?`, '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              message('success', `${_this.changeNoticeType(scope.row.noticeType)}停用成功！`)
              _this.getNoticeFun()
            })
            .catch(action => {
              message('info', '取消')
            })
        }
      }).catch(() => { })
    },
    handleCurrentChange() { },
    // 创建公告
    foundNotice() {
      const _this = this
      _this.dialogVisible = true
      _this.dialogTitle = '创建公告'
    },
    // 编辑公告
    edit(scope) {
      const _this = this
      _this.noticeId = scope.row.id
      _this.dialogTitle = '编辑'
      this.noticeFrom = Object.assign({}, scope.row)
      _this.dialogVisible = true
    },
    // 取消发布
    handleClose() {
      const _this = this
      this.$confirm('是否取消编辑?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          message('info', '取消编辑')
          _this.dialogVisible = false
        })
        .catch(action => {
        })
    },
    // 确定发布
    submit(form) {
      const _this = this
      // eslint-disable-next-line space-before-function-paren
      this.$refs[form].validate(async (valid) => {
        if (!valid) return false
      })
      this.$confirm('是否发布更改后的公告？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.updateNoticeFun(_this.noticeId, _this.noticeFrom.noticeTitle, _this.noticeFrom.noticeContent)
        })
        .catch(action => {
        })
    },
    // 编辑公告接口
    updateNoticeFun(id, noticeTitle, noticeContent) {
      let _this = this
      let data = {
        id,
        noticeTitle,
        noticeContent
      }
      startLoading()
      updateNotice('notice/updateNotice', data).then(res => {
        closeLoading()
        if (res.data) {
          message('success', '公告更改成功！')
          _this.dialogVisible = false
          _this.getNoticeFun()
        }
      }).catch(() => { })
    },
    // 转换公告状态
    changeNoticeStatus(val) {
      return this.Config.NOTICE_STATUS.NOTICE_STATUS_FUN(val)
    },
    // 转换公告类型
    changeNoticeType(val) {
      return this.Config.NOTICE_TYPE.NOTICE_TYPE_STATUS(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-content {
  margin: 50px 0;
  padding: 20px 40px;
  .notice-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .form-btn__danger {
    margin-top: 20px;
  }
}
</style>
