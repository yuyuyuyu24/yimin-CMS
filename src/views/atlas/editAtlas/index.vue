<template>
  <div class="editAtlas-content">
    <div class="editAtlas-content-header">
      <h1>图集编辑</h1>
    </div>
    <el-card>
      <div slot="header">
        <span>{{ atlasList.atlasName }}</span>
      </div>
      <div class="editAtlas-card-body-button">
        <el-button
          v-if="!isRadio"
          type="primary"
          @click="batchEdit"
        >批量管理</el-button>
        <el-button
          v-if="false"
          type="success"
          @click="editCover"
        >调整封面</el-button>
        <el-button
          v-if="isBatch"
          type="danger"
          @click="removeAtlas"
        >删除</el-button>
        <el-button
          v-if="isRadio"
          type="danger"
          @click="editFristSwiper"
        >设置为第一张轮播图</el-button>
        <el-button
          type="warning"
          @click="addSwiper"
        >上传轮播图</el-button>
      </div>
      <div class="editAtlas-card-body-checkbox">
        <el-checkbox
          v-if="isBatch"
          v-model="checkAll"
          class="editAtlas-card-body-checkbox-checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group
          v-model="checkList"
          class="editAtlas-card-body-checkbox-group"
          size="mini"
          @change="handleCheckedCitiesChange"
        >
          <div
            v-for="(item,i) in atlasList.atlasImgs"
            :key="i"
            class="checkbox"
          >
            <img :src="item.url">
            <el-checkbox
              v-if="isBatch"
              :label="i"
            >&nbsp;</el-checkbox>
            <el-radio
              v-if="isRadio"
              v-model="radio"
              :label="i"
              @change="radioChange(i)"
            >&nbsp;</el-radio>
          </div>
        </el-checkbox-group>

      </div>
    </el-card>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <edit-atlas-upload
        @editAtlasUploadFile="editAtlasList"
        @editAtlasUploadDel="editAtlasListDel"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editAtlas"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getAtlasDetail, upAtlasData } from '@/api/atlas'
import { startLoading, closeLoading, message } from '@/utils/loading'
import { changeQuerystringEditAtlas } from '@/utils/function'
import querystring from 'querystring'
import editAtlasUpload from '@/components/upload/editAtlasUpload.vue'

export default {
  name: 'EditAtlas',
  components: {
    editAtlasUpload
  },
  data() {
    return {
      isBatch: false,
      checkList: [],
      atlasList: {},
      checkAll: false,
      isIndeterminate: true,
      radio: 0,
      isRadio: false,
      radioChangePosition: 0,
      dialogVisible: false,
      fileList: {
        atlasImgs: []
      },
      createFromChange: {}
    }
  },
  mounted() {
    let id = this.Config.UNENCODE(this.$route.query.id)
    this.getAtlasDetailFun({ id })
  },
  methods: {
    // 获取图集详情接口
    getAtlasDetailFun({ id }) {
      let _this = this
      startLoading()
      getAtlasDetail('atlas/getAtlasDetail', { id }).then(res => {
        closeLoading()
        if (res.data.data) {
          _this.atlasList = changeQuerystringEditAtlas(res.data.data)
          if (Object.keys(_this.atlasList.atlasImgs[0]).length === 0) {
            _this.atlasList.atlasImgs = []
          }
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 编辑图集接口
    upAtlasDataFun(data) {
      // let _this = this
      startLoading()
      upAtlasData('atlas/upAtlasData', data).then(res => {
        closeLoading()
        if (res.data.data) {
          this.$alert('图集编辑成功!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.go(0)
            }
          })
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 批量管理
    batchEdit() {
      this.isBatch = !this.isBatch
    },
    // 调整封面
    editCover() {
      this.isRadio = !this.isRadio
    },
    // 设置为第一张轮播图
    editFristSwiper() {
      if (this.radioChangePosition === 0) {
        return this.$message.error('该张已经是封面了哦！')
      }
      this.$confirm('是否将该张图片置为轮播图第一张?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.atlasList.atlasImgs.unshift(this.atlasList.atlasImgs.splice(this.radioChangePosition, 1)[0])
        this.radio = 0
        console.log(this.atlasList.atlasImgs)
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除
    removeAtlas() {
      if (this.checkList.length === 0) {
        return this.$message.error('请至少选择一张')
      }
      this.$confirm(`是否删除${this.checkList.length}张照片?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let min
        for (var i = 0; i < this.checkList.length; i++) {
          for (var j = i; j < this.checkList.length; j++) {
            if (this.checkList[i] > this.checkList[j]) {
              min = this.checkList[j]
              this.checkList[j] = this.checkList[i]
              this.checkList[i] = min
            }
          }
        }
        for (let i = this.atlasList.atlasImgs.length - 1; i >= 0; i--) {
          for (let j = 0; j < this.checkList.length; j++) {
            if (this.atlasList.atlasImgs[i]) {
              if (i === this.checkList[j]) {
                this.atlasList.atlasImgs.splice(i, 1)
                continue // 结束当前本轮循环，开始新的一轮循环
              }
            }
          }
        }
        if (this.atlasList.atlasImgs.length === 0) {
          this.isBatch = false
        }
        // 取到最后保存下的图片
        this.createFromChange = Object.assign({}, this.atlasList)

        let atlasList = []
        for (let i = 0; i < this.createFromChange.atlasImgs.length; i++) {
          atlasList.push(querystring.stringify(this.createFromChange.atlasImgs[i]))
        }

        if (this.createFromChange.atlasImgs.length === 0) {
          this.createFromChange.atlasImgs = ''
        } else {
          this.createFromChange.atlasImgs = "'" + atlasList + "'"
        }

        this.upAtlasDataFun(this.createFromChange)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCheckAllChange(val) {
      let arr = []
      for (let i = 0; i < this.atlasList.atlasImgs.length; i++) {
        arr.push(i)
      }
      this.checkList = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.atlasList.atlasImgs.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.atlasList.atlasImgs.length
    },
    // 单选框切换
    radioChange(i) {
      this.radioChangePosition = i
    },
    // 上传轮播图
    addSwiper() {
      this.dialogVisible = true
    },
    // 接受从子组件传过来的值
    editAtlasList(req) {
      this.createFromChange = JSON.parse(JSON.stringify(this.atlasList))
      for (let i = 0; i < req.length; i++) {
        this.createFromChange.atlasImgs.push(req[i])
      }
      console.log(this.createFromChange)
    },
    editAtlasListDel(req, file) {
      for (let i = this.createFromChange.atlasImgs.length - 1; i >= 0; i--) {
        if (file.uid === this.createFromChange.atlasImgs[i].uid) {
          this.createFromChange.atlasImgs.splice(i, 1)
          continue // 结束当前本轮循环，开始新的一轮循环
        }
      }
      console.log(this.createFromChange.atlasImgs)
    },
    // 确定上传图片
    editAtlas() {
      this.$confirm(`确定上传 ${this.createFromChange.atlasImgs.length} 张图片?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let atlasList = []
        for (let i = 0; i < this.createFromChange.atlasImgs.length; i++) {
          atlasList.push(querystring.stringify(this.createFromChange.atlasImgs[i]))
        }

        if (this.createFromChange.atlasImgs.length === 0) {
          message('warning', '请上传图片后再提交！')
        } else {
          this.createFromChange.atlasImgs = "'" + atlasList + "'"
          this.upAtlasDataFun(this.createFromChange)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editAtlas-content {
  margin: 50px 0;
  padding: 40px;
  .editAtlas-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  .editAtlas-card-body-checkbox {
    margin: 30px 0;
    .editAtlas-card-body-checkbox-checkAll {
      margin: 10px 0;
    }
    .editAtlas-card-body-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      .checkbox {
        width: 170px;
        position: relative;
        margin-right: 10px;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
        .el-checkbox {
          position: absolute;
          right: -5px;
          top: 6px;
        }
        .el-radio {
          position: absolute;
          right: -5px;
          top: 6px;
          >>> .el-radio__inner {
            width: 20px;
            height: 20px;
          }
          >>> .el-radio__inner::after {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }
}
</style>
