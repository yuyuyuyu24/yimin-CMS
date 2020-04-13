<template>
  <div class="swiper-content">
    <div class="swiper-content-header">
      <h1>轮播图管理 </h1>
      <el-button
        type="primary"
        @click="addSwiper"
      >新增轮播图</el-button>
    </div>
    <el-card>
      <div slot="header">
        <span>轮播图详情</span>
      </div>
      <el-table
        :data="swiperData"
        stripe
        class="el-table"
      >
        <el-table-column
          type="index"
          label="序号"
          width="200"
        />
        <el-table-column label="图片(点击图片可查看大图)">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.url"
              :preview-src-list="srcList"
              class="el-table-image"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              @click="removeSwiper(scope)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="增加轮播图"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form
        ref="swiperFrom"
        size="small"
        :model="swiperFrom"
        :rules="rules"
        label-width="97px"
      >
        <el-form-item
          ref="swiperRef"
          label="上传轮播图:"
          prop="swiperList"
        >
          <roll-chart-upload
            @rollChartFile="rollChartList"
            @rollChartFileDel="rollChartFileDel"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit('swiperFrom')"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getSwiper, newSwiper, delSwiper } from '@/api/swiper'
import { startLoading, closeLoading, message } from '@/utils/loading'
import rollChartUpload from '@/components/upload/rollChartUpload.vue'

export default {
  name: 'Swiper',
  components: {
    rollChartUpload
  },
  data() {
    return {
      swiperData: [],
      dialogVisible: false,
      swiperFrom: {
        swiperList: []
      },
      limit: 1,
      rules: {
        swiperList: [
          { required: true, message: '请上传轮播图！' }
        ]
      },
      srcList: []
    }
  },
  mounted() {
    this.getSwiperFun()
  },
  methods: {
    // 获取全部轮播图
    getSwiperFun() {
      let _this = this
      startLoading()
      getSwiper('swiper/getSwiper').then(res => {
        closeLoading()
        if (res.data.data) {
          _this.swiperData = res.data.data
          for (let i = 0; i < _this.swiperData.length; i++) {
            this.srcList.push(_this.swiperData[i].url)
          }
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 增加轮播图
    addSwiper() {
      this.dialogVisible = true
    },
    // 删除轮播图
    removeSwiper(scope) {
      let _this = _this
      this.$confirm('是否删除该张轮播图?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          delSwiper('swiper/delSwiper', this.swiperData[scope.$index]).then(res => {
            closeLoading()
            if (res.data.data) {
              this.$alert('轮播图删除成功!', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.go(0)
                }
              })
            }
          }).catch(() => {
            message('error', '网络出现问题，请稍后重试！')
          })
        })
        .catch(action => {
          message('info', '取消删除！')
        })
    },
    rollChartList(req) {
      this.swiperFrom.swiperList = req
    },
    rollChartFileDel(req) {
      this.swiperFrom.swiperList = req
      this.$refs.swiperFrom.clearValidate()
    },
    // 提交轮播图
    submit(swiperFrom) {
      let _this = this
      this.$refs[swiperFrom].validate((valid) => {
        if (this.swiperFrom.swiperList.length > 0) {
          this.$refs.swiperRef.clearValidate()
        }
        if (valid) {
          this.$confirm('是否确认上传轮播图?', '确认信息', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          })
            .then(() => {
              newSwiper('swiper/newSwiper', _this.swiperFrom.swiperList[0]).then(res => {
                closeLoading()
                if (res.data.data) {
                  this.$alert('轮播图上传成功!', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.go(0)
                    }
                  })
                }
              }).catch(() => {
                message('error', '网络出现问题，请稍后重试！')
              })
            })
            .catch(action => {
              message('info', '取消！')
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-content {
  margin: 50px 0;
  padding: 20px 40px;
  .swiper-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .el-table {
    width: 100%;
    >>> .el-table-image {
      .el-image__inner {
        width: 170px;
        height: 85px;
      }
    }
  }
}
</style>
