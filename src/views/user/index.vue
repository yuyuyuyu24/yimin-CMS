<template>
  <div class="order-content">
    <div class="order-content-header">
      <h1>用户管理</h1>
    </div>
    <el-card shadow="hover">
      <el-form
        :inline="true"
        size="small"
        :model="searchFrom"
        class=""
      >
        <el-form-item
          label="用户姓名:"
          prop=""
        >
          <el-input
            v-model="searchFrom.userName"
            placeholder="请输入用户姓名"
          />
        </el-form-item>
        <el-form-item label="用户状态:">
          <el-select
            v-model="searchFrom.userStatus"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.USER_STATUS.USER_STATUS_FUN()"
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
        <span>用户详情</span>
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
          label="用户姓名"
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
          label="用户状态"
        >
          <template slot-scope="scope">
            {{ changeUserStatus(scope.row.userStatus) }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.userStatus === '1'"
              type="warning"
              size="small"
              @click="prohibit(scope)"
            >禁止用户支付</el-button>
            <el-button
              v-if="scope.row.userStatus === '2'"
              type="primary"
              size="small"
              @click="recovery(scope)"
            >恢复用户支付</el-button>
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
import { getUsers, pageGetUser, queryUser, changeUserStatus } from '@/api/users'
import { startLoading, closeLoading, message } from '@/utils/loading'

export default {
  name: 'User',
  data() {
    return {
      searchFrom: {
        userName: '',
        userStatus: '',
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
    this.getUsersFun()
    this.pageGetUserFun()
  },
  methods: {
    // 获取全部商品接口
    getUsersFun() {
      let _this = this
      startLoading()
      getUsers('mini/getUsers').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableDataLength = res.data.data.length
        }
      }).catch(() => {
        message('error', '服务器出现问题，请稍后重试！')
      })
    },
    // 分页获取全部用户
    pageGetUserFun(e) {
      startLoading()
      let _this = this
      this.tableDataType = 'page'
      let data = {
        pageSize: 10,
        pageNumber: e || 1
      }
      pageGetUser('mini/pageGetUser', data).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = res.data.data
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 查询
    searchUser(searchFrom) {
      this.tableDataType = 'search'
      // 根据条件查询用户
      this.queryUserFun(searchFrom)
    },
    // 查询事件
    queryUserFun(searchFrom) {
      let _this = this
      startLoading()
      queryUser('mini/queryUser', searchFrom).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = res.data.data
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 分页事件
    handleCurrentChange(e) {
      if (this.tableDataType === 'page') {
        this.pageGetUserFun(e)
      } else {
        let searchFrom = this.searchFrom
        searchFrom.pageNumber = e
        this.queryUserFun(searchFrom)
        this.currentPage = e
      }
    },
    // 禁用
    prohibit(scope) {
      let _this = this
      this.$confirm('确定禁止该用户支付吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: scope.row.id,
          userStatus: '2'
        }
        _this.changeUserStatusFun(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 启用
    recovery(scope) {
      let _this = this
      this.$confirm('确定恢复该用户支付吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: scope.row.id,
          userStatus: '1'
        }
        _this.changeUserStatusFun(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 改变订单状态 接口
    changeUserStatusFun(data) {
      let _this = this
      startLoading()
      changeUserStatus('mini/changeUserStatus', data).then(res => {
        closeLoading()
        if (res.data.data) {
          message('success', '修改成功!')
          _this.pageGetUserFun(_this.currentPage)
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 转换用户状态
    changeUserStatus(val) {
      return this.Config.USER_STATUS.USER_STATUS_FUN(val)
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
    width: 100px;
    height: 100px;
  }
}
</style>
