<template>
  <div class="notice-content">
    <div class="notice-content-header">
      <h1>公告管理</h1>
      <el-button
        type="primary"
        @click="foundNotice"
      >创建公告</el-button>
    </div>
    <el-card shadow="hover">
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
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="有效时间:">
          <el-col :span="11">
            <el-date-picker
              v-model="search.start_time"
              type="datetime"
              placeholder="开始时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
          <el-col
            class="line"
            :span="1"
          >——</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="search.end_time"
              type="datetime"
              placeholder="结束时间"
              style="width: 100%;"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-col>
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
        @selection-change="countNoticeByStatus"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="notice_title"
          label="标题"
        />
        <el-table-column
          prop="notice_start_time"
          label="推送时间"
        />
        <el-table-column
          prop="notice_end_time"
          label="结束时间"
        />
        <el-table-column label="操作">
          <template slot-scope="scope">
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
                  prop="title"
                >
                  <el-input
                    v-model="noticeFrom.title"
                    placeholder="请输入标题"
                  />
                </el-form-item>
                <el-form-item
                  label="内容"
                  prop="content"
                >
                  <el-input
                    v-model="noticeFrom.content"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入标题"
                  />
                </el-form-item>
                <el-form-item
                  label="起始时间"
                  prop="time"
                >
                  <el-date-picker
                    v-model="noticeFrom.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
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
            <el-dialog
              :title="dialogTitle"
              :visible.sync="dialogVisibleDetails"
              width="590px"
            >
              <el-form
                ref="dynamicValidateForm"
                :disabled="disabled"
                label-position="left"
                :model="noticeDetals"
                label-width="100px"
              >
                <el-form-item
                  label="标题"
                  prop="title"
                >
                  <el-input
                    v-model="noticeDetals.title"
                    placeholder="请输入标题"
                  />
                </el-form-item>
                <el-form-item
                  label="内容"
                  prop="content"
                >
                  <el-input
                    v-model="noticeDetals.notice_content"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入标题"
                  />
                </el-form-item>
                <el-form-item
                  label="起始时间"
                  prop="time"
                >
                  <el-col :span="11">
                    <el-date-picker
                      v-model="noticeDetals.notice_start_time"
                      type="datetime"
                      placeholder="开始时间"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-col>
                  <el-col
                    class="line"
                    :span="1"
                  >——</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      v-model="noticeDetals.notice_end_time"
                      type="datetime"
                      placeholder="结束时间"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    />
                  </el-col>
                </el-form-item>
              </el-form>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="dialogVisibleDetails = false"
                >确 定</el-button>
              </span>
            </el-dialog>
            <el-button
              type="primary"
              size="small"
              @click="edit(scope)"
            >编辑</el-button>
            <el-button
              type="success"
              size="small"
              @click="details(scope)"
            >查看详情</el-button>
            <el-button
              type="danger"
              size="small"
              @click="deletes(scope)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="currentPage"
        style="margin-top:30px;"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {},
      shopList: [],
      currentPage: 1,
      tableData: [
        {
          'notice_title': '牛肉',
          'notice_content': '牛肉牛肉',
          'notice_start_time': '2019.11.27',
          'notice_end_time': '2019.11.27'
        },
        {
          'notice_title': '羊肉',
          'notice_content': '羊肉羊肉',
          'notice_start_time': '2019.11.27',
          'notice_end_time': '2019.11.27'
        }
      ],
      disabled: false,
      dialogVisible: false,
      dialogVisibleDetails: false,
      dialogTitle: '',
      noticeFrom: {},
      noticeDetals: {},
      appendToBody: true,
      countNoticeLength: [],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        time: [{ required: true, message: '请输入起始时间', trigger: 'blur' }]
      },
      courseList: [
        '英语',
        '数学'
      ]
    }
  },
  methods: {
    searchShop() { },
    handleCurrentChange() { },
    // 表格选择
    countNoticeByStatus(sel) {
      this.countNoticeLength = sel
    },
    // 创建公告
    foundNotice() {
      const _this = this
      _this.dialogVisible = true
      _this.dialogTitle = '创建公告'
    },
    // 编辑公告
    edit(scope) {
      const _this = this
      _this.dialogTitle = '编辑'
      _this.disabled = false
      _this.noticeDetals = scope.row
      _this.dialogVisibleDetails = true

      // _this.noticeFrom.title = _this.tableData[scope.$index].notice_title
    },
    // 取消发布
    handleClose() {
      const _this = this
      this.$confirm('是否取消发布', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          _this.dialogVisible = false
        })
        .catch(action => {
        })
    },
    // 确定发布
    submit(form) {
      const _this = this
      this.$refs[form].validate(async(valid) => {
        if (!valid) return false
        _this.dialogVisible = false
      })
    },
    // 查看详情
    details(scope) {
      const _this = this
      _this.dialogTitle = '查看详情'
      _this.disabled = true
      _this.noticeDetals = scope.row
      _this.dialogVisibleDetails = true
      _this.$refs.dynamicValidateForm.clearValidate()
    },
    // 删除
    deletes(scope) {
      this.$confirm(`是否删除该条公告?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-content {
  margin: 50px 0;
  padding: 40px;
  .notice-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  .form-btn__danger {
    margin-top: 20px;
  }
}
</style>
