<template>
  <div class="goods-content">
    <div class="goods-content-header">
      <h1>商品管理</h1>
      <el-button
        type="primary"
        @click="singleCreation"
      >增加商品</el-button>
      <el-button
        v-if="false"
        type="primary"
        @click="batchImport"
      >批量增加商品</el-button>
    </div>
    <el-card shadow="hover">
      <el-form
        :inline="true"
        size="small"
        :model="searchFrom"
        class=""
      >
        <el-form-item
          label="商品名:"
          prop=""
        >
          <el-input
            v-model="searchFrom.goodsName"
            placeholder="请输入商品名"
          />
        </el-form-item>
        <el-form-item label="价钱:">
          <el-input
            v-model="searchFrom.goodsPrice"
            placeholder="请输入价钱"
          />
        </el-form-item>
        <el-form-item label="商品分类:">
          <el-select
            v-model="searchFrom.goodsType"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="全部"
              value=""
            />
            <el-option
              v-for="(v, k, i) in Config.MEAT_TYPE.MEAT_TYPE_STATUS()"
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
        <span>商品详情</span>
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
          prop=""
          label="商品分类"
        >
          <template slot-scope="scope">
            {{ changeGoodsType(scope.row.goodsType) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
        />
        <el-table-column
          prop="goodsPrice"
          label="商品价格"
        />
        <el-table-column
          prop="goodsStock"
          label="商品库存"
        />
        <el-table-column
          prop=""
          label="商品状态"
        >
          <template slot-scope="scope">
            <span :class="{goods_status_normal: scope.row.goodsStatus === 1,goods_status_soldout: scope.row.goodsStatus === 2,goods_status_lowershelf: scope.row.goodsStatus === 3}">
              {{ changeGoodsStatus(scope.row.goodsStatus) }}
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
              @click="edit(scope)"
            >编辑</el-button>
            <el-button
              v-if="
                scope.row.goodsStatus === 1 || scope.row.goodsStatus === 2
              "
              type="danger"
              size="small"
              @click="lowerShelf(scope)"
            >下架商品</el-button>
            <el-button
              v-if="scope.row.goodsStatus === 3"
              type="warning"
              size="small"
              @click="upperShelf(scope)"
            >上架商品</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-if="false"
        class="form-btn__danger"
        type="danger"
        size="small"
        @click="batchLowerShelf"
      >批量下架商品</el-button>
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
import { getGoods, queryGoods, lowerGoods, pageGetGoods } from '@/api/goods'
import { startLoading, closeLoading, message } from '@/utils/loading'
import { changeQuerystring } from '@/utils/function'
export default {
  data() {
    return {
      typeList: [],
      currentPage: 1,
      searchFrom: {
        goodsName: '',
        goodsPrice: '',
        goodsType: '',
        pageSize: 10,
        pageNumber: 1
      },
      tableData: [],
      tableDataLength: 0,
      tableDataType: '',
      appendToBody: true,
      userFrom: {},
      rules: {
        number: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // 获取所有数据
    this.getGoodsFun()
    this.pageGetGoodsFun()
  },
  methods: {
    // 获取全部商品接口
    getGoodsFun() {
      let _this = this
      startLoading()
      getGoods('goods/getGoods').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableDataLength = res.data.data.length
        }
      }).catch(() => {
      })
    },
    // 分页获取全部商品
    pageGetGoodsFun(e) {
      let _this = this
      this.tableDataType = 'page'
      startLoading()
      let data = {
        pageSize: 10,
        pageNumber: e || 1
      }
      pageGetGoods('goods/pageGetGoods', data).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = changeQuerystring(res.data.data)
        }
      }).catch(() => {
      })
    },
    // 增加商品
    singleCreation() {
      this.$router.push('/createGoods?type=add')
    },
    // 批量增加商品
    batchImport() {
      this.$router.push('/userImport')
    },
    // 查询
    searchUser(searchFrom) {
      this.tableDataType = 'search'
      // 根据条件查询商品
      this.queryGoodsFun(searchFrom)
    },
    // 查询事件
    queryGoodsFun(searchFrom) {
      let _this = this
      startLoading()
      queryGoods('goods/queryGoods', searchFrom).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.tableData = changeQuerystring(res.data.data)
        }
      }).catch(() => {
      })
    },
    // 分页事件
    handleCurrentChange(e) {
      if (this.tableDataType === 'page') {
        this.pageGetGoodsFun(e)
      } else {
        let searchFrom = this.searchFrom
        searchFrom.pageNumber = e
        this.queryGoodsFun(searchFrom)
        this.currentPage = e
      }
    },
    // 编辑用户
    edit(scope) {
      this.$router.push(`/createGoods?type=edit&id=${this.Config.ENCODE(scope.row.id)}`)
    },
    // 取消发布
    handleClose() {
      const _this = this
      this.$confirm('是否取消?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          _this.dialogVisible = false
        })
        .catch(action => {
          message('info', '取消！')
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
    // 下架商品
    lowerShelf(scope) {
      this.$confirm(`是否确定下架 ${scope.row.goodsName} ?`, '注意！', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let data = {
            id: scope.row.id,
            goodsStatus: 3
          }
          startLoading()
          lowerGoods('goods/lowerGoods', data).then(res => {
            closeLoading()
            if (res.data.data) {
              message('success', '修改成功！')
              this.pageGetGoodsFun()
            }
          })
        })
        .catch(action => {
          message('info', '取消！')
        })
    },
    // 上架商品
    upperShelf(scope) {
      this.$confirm(`是否确定上架 ${scope.row.goodsName} ?`, '注意！', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let goods_tatus
          if (scope.row.goodsStock <= 0) {
            goods_tatus = 2
          } else {
            goods_tatus = 1
          }
          let data = {
            id: scope.row.id,
            goodsStatus: goods_tatus
          }
          startLoading()
          lowerGoods('goods/upperGoods', data).then(res => {
            closeLoading()
            if (res.status !== 200) {
              message()
            } else {
              this.$message({
                message: '修改成功!',
                type: 'success'
              })
              this.pageGetGoodsFun()
            }
          })
        })
        .catch(action => {
          this.$message({
            message: '取消!',
            type: 'info'
          })
        })
    },
    // 批量下架商品
    batchLowerShelf() { },
    // 转换商品类型
    changeGoodsType(val) {
      return this.Config.MEAT_TYPE.MEAT_TYPE_STATUS(val)
    },
    // 转换商品状态
    changeGoodsStatus(val) {
      return this.Config.GOODS_STATUS.GOODS_STATUS_FUN(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-content {
  margin: 50px 0;
  padding: 20px 40px;
  .goods-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .goods_status_normal {
    color: #67c23a;
  }
  .goods_status_soldout {
    color: #e6a23c;
  }
  .goods_status_lowershelf {
    color: #909399;
  }
  .form-btn__danger {
    margin-top: 20px;
  }
}
</style>
