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
          fixed
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          prop="notice_title"
          label="标题"
        />
        <el-table-column
          prop="notice_content"
          width="500"
          label="内容"
        />
        <el-table-column
          prop=""
          label="状态"
        >
          <template slot-scope="scope">
            <span :class="{class1:scope.row.notice_status===1,class2:scope.row.notice_status===2}">
              {{ changeNoticeStatus(scope.row.notice_status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="弹窗类型"
        >
          <template slot-scope="scope">
            {{ changeNoticeType(scope.row.notice_type) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              @click="stop(scope)"
            >停用</el-button>
            <el-button
              v-if="false"
              type="danger"
              size="small"
              @click="stop(scope)"
            >停用</el-button>

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
              v-model="noticeFrom.notice_title"
              placeholder="请输入标题"
              @input="test"
            />
          </el-form-item>
          <el-form-item
            label="内容"
            prop="notice_content"
          >
            <el-input
              v-model="noticeFrom.notice_content"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-form-item>
          <el-form-item
            label="选择公告类型"
            prop=""
          >
            <el-radio-group v-model="noticeFrom.notice_type">
              <el-radio label="1">弹窗公告</el-radio>
              <el-radio label="2">首页公告</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="选择公告状态"
            prop=""
          >
            <el-radio-group v-model="noticeFrom.notice_status">
              <el-radio label="1">使用</el-radio>
              <el-radio label="2">停用</el-radio>
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
export default {
  data() {
    return {
      search: {},
      shopList: [],
      currentPage: 1,
      tableData: [
        {
          'notice_title': '牛肉1',
          'notice_content': '牛肉牛肉',
          'notice_status': '1',
          'notice_type': '1'
        },
        {
          'notice_title': '羊肉',
          'notice_content': '羊肉羊肉',
          'notice_status': '2',
          'notice_type': '2'
        }
      ],
      dialogVisible: false,
      dialogTitle: '',
      noticeFrom: {
        notice_title: '',
        notice_content: '',
        notice_type: '1',
        notice_status: '1'
      },
      noticeDetals: {},
      appendToBody: true,
      rules: {
        notice_title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        notice_content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible: function(val, oldVal) {
      setTimeout(() => {
        console.log(val)
        console.log(oldVal)
      }, 100)
    }
  },

  methods: {
    test() {
      console.log(this.noticeFrom)
      console.log(this.tableData)
    },
    searchShop() { },
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
      _this.dialogTitle = '编辑'
      this.noticeFrom = Object.assign({}, scope.row)
      _this.dialogVisible = true
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
        console.log(this.noticeFrom)
        _this.dialogVisible = false
      })
    },
    // 删除
    stop(scope) {
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
