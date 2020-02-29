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
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl">
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
      >
        <el-form-item
          ref="swiperRef"
          label="上传轮播图:"
          prop="swiperList"
        >
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="swiperHandlePreview"
            :on-remove="swiperHandleRemove"
            :on-success="swiperHandleSuccess"
            :file-list="swiperFrom.swiperList"
            list-type="picture"
            :limit="limit"
            :on-exceed="swiperHandleExceed"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件。</div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="轮播图位置:"
          prop="position"
        >
          <el-select
            v-model="swiperFrom.position"
            filterable
            placeholder="请选择"
          >
            <el-option
              label="最前"
              value="foremost"
            />
            <el-option
              label="最后"
              value="last"
            />
          </el-select>
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

export default {
  name: 'Swiper',
  data() {
    return {
      swiperData: [
        { 'imgUrl': 'https://www.baidu.com/img/bd_logo1.png' },
        { 'imgUrl': 'https://www.baidu.com/img/bd_logo1.png' }
      ],
      dialogVisible: false,
      swiperFrom: {
        swiperList: []
      },
      limit: 1,
      rules: {
        swiperList: [
          { required: true, message: '请上传商品轮播图！' }
        ],
        position: [
          { required: true, message: '请选择轮播图位置', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 增加轮播图
    addSwiper() {
      this.dialogVisible = true
    },
    // 删除轮播图
    removeSwiper(scope) {
      this.$confirm('删除该张轮播图?', '提示', {
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
    swiperHandlePreview(file, fileList) {
      console.log(file, fileList)
    },
    swiperHandleRemove(file, fileList) {
      this.swiperFrom.swiperList = fileList
    },
    swiperHandleSuccess(response, file, fileList) {
      this.swiperFrom.swiperList = fileList
      this.$refs.swiperRef.clearValidate()
    },
    swiperHandleExceed(file, fileList) {
      if (file) {
        return this.$message.error('一次只能上传一张轮播图哦！')
      }
    },
    // 提交轮播图
    submit(swiperFrom) {
      let _that = this
      this.$refs[swiperFrom].validate((valid) => {
        if (this.swiperFrom.swiperList.length > 0) {
          this.$refs.swiperRef.clearValidate()
        }
        if (valid) {
          _that.$message({
            message: '提交成功',
            type: 'success'
          })
          _that.dialogVisible = false
          setTimeout(() => {
            _that.$router.go(0)
          }, 1000)
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
  padding: 40px;
  .swiper-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  .el-table {
    width: 100%;
    img {
      width: 170px;
      height: 85px;
    }
  }
}
</style>
