<template>
  <div class="editAtlas-content">
    <div class="editAtlas-content-header">
      <h1>图集编辑</h1>
    </div>
    <el-card>
      <div slot="header">
        <span>{{ atlasData.name }}</span>
      </div>
      <div class="editAtlas-card-body-button">
        <el-button
          v-if="!isRadio"
          type="primary"
          @click="batchEdit"
        >批量管理</el-button>
        <el-button
          v-if="!isBatch"
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
            v-for="(item,i) in atlasList.imgs"
            :key="i"
            class="checkbox"
          >
            <img :src="item">
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
      title="上传轮播图"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handlescuess"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button
          size="small"
          type="primary"
        >点击上传</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        >只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: 'EditAtlas',
  data() {
    return {
      atlasData: {},
      isBatch: false,
      checkList: [],
      atlasList: {},
      checkAll: false,
      isIndeterminate: true,
      radio: 0,
      isRadio: false,
      radioChangePosition: 0,
      dialogVisible: false,
      fileList: []
    }
  },
  mounted() {
    this.atlasList = JSON.parse(this.$route.query.data)
    // console.log(typeof this.atlasList.imgs)
  },
  methods: {
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
        this.atlasList.imgs.unshift(this.atlasList.imgs.splice(this.radioChangePosition, 1)[0])
        this.radio = 0
        console.log(this.radio)
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
        for (let i = this.atlasList.imgs.length - 1; i >= 0; i--) {
          for (let j = 0; j < this.checkList.length; j++) {
            if (this.atlasList.imgs[i]) {
              if (i === this.checkList[j]) {
                this.atlasList.imgs.splice(i, 1)
                continue // 结束当前本轮循环，开始新的一轮循环
              }
            }
          }
        }
        if (this.atlasList.imgs.length === 0) {
          this.isBatch = false
        }
        // 取到最后保存下的图片
        // console.log(this.atlasList.imgs)

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
    handleCheckAllChange(val) {
      let arr = []
      for (let i = 0; i < this.atlasList.imgs.length; i++) {
        arr.push(i)
      }
      this.checkList = val ? arr : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.atlasList.imgs.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.atlasList.imgs.length
    },
    // 单选框切换
    radioChange(i) {
      this.radioChangePosition = i
    },
    // 上传轮播图
    addSwiper() {
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handlescuess(res, file, fileList) {
      console.log(fileList)
    }
  }
}
</script>

<style lang="scss" scoped>
.editAtlas-content {
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
