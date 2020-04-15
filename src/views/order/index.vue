<template>
  <div class="order-content">
    <div class="order-content-header">
      <h1>订单管理</h1>
    </div>
    <el-card shadow="hover">
      <el-form
        :inline="true"
        size="small"
        :model="searchFrom"
        class=""
      >
        <el-form-item
          label="买家姓名:"
          prop=""
        >
          <el-input
            v-model="searchFrom.userName"
            placeholder="请输入买家姓名"
          />
        </el-form-item>
        <el-form-item label="买家手机号:">
          <el-input
            v-model="searchFrom.userPhone"
            placeholder="请输入买家手机号"
          />
        </el-form-item>
        <el-form-item label="订单号:">
          <el-input
            v-model="searchFrom.orderNumber"
            placeholder="请输入订单号"
          />
        </el-form-item>
        <el-form-item label="配送方式:">
          <el-select
            v-model="searchFrom.deliveryMthods"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.DELIVERY_TYPE.DELIVERY_TYPE_FUN()"
              :key="i"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select
            v-model="searchFrom.orderStatus"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.ORDER_STATUS.ORDER_STATUS_FUN()"
              :key="i"
              :label="v"
              :value="k"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单日期:">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="seleteTime"
          />
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
        <span>订单详情</span>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="订单编号">
                <span>{{ props.row.orderNumber }}</span>
              </el-form-item>
              <el-form-item label="商品总价格（不含配送费）">
                <span>{{ props.row.goodsPrice }}</span>
              </el-form-item>
              <el-form-item label="配送费">
                <span>{{ props.row.deliveryMoney }}</span>
              </el-form-item>
              <el-form-item label="用户地址">
                <span>{{ props.row.userAddress }}</span>
              </el-form-item>
              <el-form-item label="商品信息">
                <span>点击查看详情查看</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ props.row.remarks }}</span>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="买家姓名"
        />
        <el-table-column
          prop="userPhone"
          label="买家手机号"
        />
        <el-table-column
          prop=""
          label="配送方式"
        >
          <template slot-scope="scope">
            {{ changeDeliveryStatus(scope.row.deliveryMthods) }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="订单创建时间"
          width="200"
        >
          <template slot-scope="scope">
            {{ formatDate(Number(scope.row.createdTime)) }}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="订单状态"
        >
          <template slot-scope="scope">
            <span :class="{waiting_pay: scope.row.orderStatus === '1', to_be_shipped:scope.row.orderStatus === '2',success: scope.row.orderStatus === '3',close: scope.row.orderStatus === '4'}">
              {{ changeOrderStatus(scope.row.orderStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="toDetail(scope)"
            >查看详情</el-button>
            <el-button
              v-if="scope.row.orderStatus === '2'"
              type="warning"
              size="small"
              @click="deliver(scope)"
            >发货</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="tableDataLength"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      />
      <el-dialog
        title="购买商品详情"
        :visible.sync="dialogVisible"
        width="500px"
      >
        <div
          v-for="(item,index) in goodsData"
          :key="index"
          class="el-dialog-div"
        >
          <img :src="item.coverList.url">
          <p>商品名称: {{ item.goodsName }}</p>
          <span>数量: {{ item.goodsNum }}</span>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getAllOrder, pageGetOrder, queryOrders, batchQuery, changeOrderStatus } from '@/api/order'
import { startLoading, closeLoading, message } from '@/utils/loading'
import querystring from 'querystring'

export default {
  name: 'Order',
  data() {
    return {
      searchFrom: {
        userName: '',
        userPhone: '',
        orderNumber: '',
        deliveryMthods: '',
        orderStatus: '',
        pageSize: 10,
        pageNumber: 1,
        startTime: '',
        endTime: ''
      },
      tableData: [],
      currentPage: 1,
      tableDataLength: 0,
      tableDataType: '',
      dialogVisible: false,
      goodsData: [],
      intervalId: null,
      time: ''
    }
  },
  mounted() {
    this.getGoodsFun()
    this.pageGetOrderFun()
    // this.dataRefreh()
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear()
  },
  methods: {
    // 获取全部商品接口
    getGoodsFun() {
      let _this = this
      startLoading()
      getAllOrder('mini/getAllOrder').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableDataLength = res.data.data.length
        }
      }).catch(() => {
        message('error', '服务器出现问题，请稍后重试！')
      })
    },
    // 分页获取全部商品
    pageGetOrderFun(e) {
      startLoading()
      let _this = this
      this.tableDataType = 'page'
      let data = {
        pageSize: 10,
        pageNumber: e || 1
      }
      pageGetOrder('mini/pageGetOrder', data).then(res => {
        closeLoading()
        if (res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].goodsInfo = JSON.parse(res.data.data[i].goodsInfo)
          }
          _this.tableData = res.data.data
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 查询
    searchUser(searchFrom) {
      this.tableDataType = 'search'
      console.log(searchFrom)
      // 根据条件查询商品
      this.queryGoodsFun(searchFrom)
    },
    // 查询事件
    queryGoodsFun(searchFrom) {
      let _this = this
      startLoading()
      queryOrders('mini/queryOrders', searchFrom).then(res => {
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
        this.pageGetOrderFun(e)
      } else {
        let searchFrom = this.searchFrom
        searchFrom.pageNumber = e
        this.queryGoodsFun(searchFrom)
        this.currentPage = e
      }
    },
    // 点击查看详情
    toDetail(scope) {
      let _this = this
      // scope.row.goodsInfo = JSON.parse(scope.row.goodsInfo)
      let ordersId = []
      let ordersNum = []
      for (let i = 0; i < scope.row.goodsInfo.length; i++) {
        ordersId.push(scope.row.goodsInfo[i].id)
        ordersNum.push(scope.row.goodsInfo[i].num)
      }
      batchQuery('mini/batchQuery', ordersId).then(res => {
        closeLoading()
        if (res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].goodsNum = ordersNum[i]
            res.data.data[i].coverList = querystring.parse(res.data.data[i].coverList)
          }
          _this.goodsData = res.data.data
          _this.dialogVisible = true
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 发货按钮
    deliver(scope) {
      let _this = this
      this.$confirm('确定该订单的状态改为已发货吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: scope.row.id,
          orderStatus: '3'
        }
        _this.changeOrderStatusFun(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    },
    // 改变订单状态 接口
    changeOrderStatusFun(data) {
      let _this = this
      startLoading()
      changeOrderStatus('mini/changeOrderStatus', data).then(res => {
        closeLoading()
        if (res.data.data) {
          message('success', '修改成功!')
          _this.pageGetOrderFun(_this.currentPage)
          console.log(_this.currentPage)
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 定时刷新数据函数
    dataRefreh() {
      let _this = this
      // 计时器正在进行中，退出函数
      if (_this.intervalId != null) {
        return
      }
      // 计时器为空，操作 1分钟
      _this.intervalId = setInterval(() => {
        _this.pageGetOrderFun() // 加载数据函数
      }, 60000)
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId) // 清除计时器
      this.intervalId = null // 设置为null
    },
    // 转换配送方式类型
    changeDeliveryStatus(val) {
      return this.Config.DELIVERY_TYPE.DELIVERY_TYPE_FUN(val)
    },
    // 转换订单类型
    changeOrderStatus(val) {
      return this.Config.ORDER_STATUS.ORDER_STATUS_FUN(val)
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
    // 把选中的时间范围传给查询表单
    seleteTime(e) {
      if (e != null) {
        this.searchFrom.startTime = e[0]
        this.searchFrom.endTime = e[1]
      } else {
        this.searchFrom.startTime = ''
        this.searchFrom.endTime = ''
      }
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  >>> .el-dialog-div {
    width: 460px;
    height: auto;
    padding: 20px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
      padding-left: 10px;
      font-size: 16px;
    }
    span {
      padding-left: 10px;
      font-size: 16px;
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
  .waiting_pay {
    color: #e6a23c;
  }
  .to_be_shipped {
    color: #f56c6c;
  }
  .success {
    color: #67c23a;
  }
  .close {
    color: #909399;
  }
}
</style>
