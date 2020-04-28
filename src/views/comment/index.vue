<template>
  <div class="order-content">
    <div class="order-content-header">
      <h1>评论管理</h1>
    </div>
    <el-card shadow="hover">
      <el-form
        :inline="true"
        size="small"
        :model="searchFrom"
        class=""
      >
        <el-form-item
          label="用户名:"
          prop=""
        >
          <el-input
            v-model="searchFrom.userName"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="评论状态:">
          <el-select
            v-model="searchFrom.commentStatus"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.COMMENT_STATUS.COMMENT_STATUS_FUN()"
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
            @click="searchUser(searchFrom)"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:25px;">
      <div slot="header">
        <span>评论详情</span>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="userName"
          label="用户名"
        />
        <el-table-column
          prop="userImg"
          label="用户头像"
        >
          <template slot-scope="scope">
            <img
              class="userImg"
              :src="scope.row.userImg"
            >
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ formatDate(Number(scope.row.createTime)) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="评论"
          width="300"
        />
        <el-table-column
          prop=""
          label="评论状态"
        >
          <template slot-scope="scope">
            {{ changeCommentStatus(scope.row.commentStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.commentStatus === '1'"
              type="warning"
              size="small"
              @click="deleteComment(scope)"
            >删除评论</el-button>
            <el-button
              v-if="scope.row.commentStatus === '2'"
              type="primary"
              size="small"
              @click="recoveryComment(scope)"
            >恢复评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="tableDataLength"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { getComment, pageGetComment, queryComment, changeCommentStatus } from '@/api/comment'
import { startLoading, closeLoading, message } from '@/utils/loading'

export default {
  name: 'Comment',
  data() {
    return {
      searchFrom: {
        userName: '',
        commentStatus: '',
        pageSize: 10,
        pageNumber: 1
      },
      tableData: [],
      currentPage: 1,
      tableDataLength: 0,
      tableDataType: '',
      dialogVisible: false,
      goodsData: []
    }
  },
  mounted() {
    this.getCommentFun()
    this.pageGetCommentFun()
  },
  methods: {
    // 获取全部商品接口
    getCommentFun() {
      let _this = this
      startLoading()
      getComment('mini/getComment').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableDataLength = res.data.data.length
        }
      }).catch(() => {
        message('error', '服务器出现问题，请稍后重试！')
      })
    },
    // 分页获取全部用户
    pageGetCommentFun(e) {
      startLoading()
      let _this = this
      this.tableDataType = 'page'
      let data = {
        pageSize: 10,
        pageNumber: e || 1
      }
      pageGetComment('mini/pageGetComment', data).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = res.data.data
        }
      }).catch(() => { })
    },
    // 查询
    searchUser(searchFrom) {
      this.tableDataType = 'search'
      // 根据条件查询用户
      this.queryCommentFun(searchFrom)
    },
    // 查询事件
    queryCommentFun(searchFrom) {
      let _this = this
      startLoading()
      queryComment('mini/queryComment', searchFrom).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = res.data.data
        }
      }).catch(() => { })
    },
    // 分页事件
    handleCurrentChange(e) {
      if (this.tableDataType === 'page') {
        this.pageGetCommentFun(e)
      } else {
        let searchFrom = this.searchFrom
        searchFrom.pageNumber = e
        this.queryCommentFun(searchFrom)
        this.currentPage = e
      }
    },
    // 删除评论
    deleteComment(scope) {
      let _this = this
      this.$confirm('确定删除该用户的评论吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: scope.row.id,
          commentStatus: '2'
        }
        _this.changeCommentStatusFun(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 恢复评论
    recoveryComment(scope) {
      let _this = this
      this.$confirm('确定恢复该用户的评论吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: scope.row.id,
          commentStatus: '1'
        }
        _this.changeCommentStatusFun(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 改变订单状态 接口
    changeCommentStatusFun(data) {
      let _this = this
      startLoading()
      changeCommentStatus('mini/changeCommentStatus', data).then(res => {
        closeLoading()
        if (res.data.data) {
          message('success', '修改成功!')
          _this.pageGetCommentFun(_this.currentPage)
        }
      }).catch(() => { })
    },
    // 时间戳转时间
    formatDate(data) {
      let date = new Date(data)
      var YY = date.getFullYear() + '-'
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return YY + MM + DD + ' ' + hh + mm + ss
    },
    // 转换评论状态
    changeCommentStatus(val) {
      return this.Config.COMMENT_STATUS.COMMENT_STATUS_FUN(val)
    }
  }

}
</script>

<style lang="scss" scoped>
.order-content {
  margin: 50px 0;
  padding: 20px 40px;
  .order-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .userImg {
    width: 60px;
    height: 60px;
  }
}
</style>
