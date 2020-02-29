<template>
  <div class="addAtlas-content">
    <div class="addAtlas-content-header">
      <h1>新增图集</h1>
    </div>
    <el-form
      ref="atlasFrom"
      label-width="auto"
      label-position="left"
      class="create-content-from"
      :model="atlasFrom"
      :rules="rules"
    >
      <el-form-item
        label="图集名称:"
        prop="atlasName"
      >
        <el-input
          v-model="atlasFrom.atlasName"
          placeholder="请输入图集名称"
        />
      </el-form-item>
      <el-form-item
        ref="atlasRef"
        label="上传图片:"
        prop="atlasList"
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="atlasHandlePreview"
          :on-remove="atlasHandleRemove"
          :on-success="atlasHandleSuccess"
          :file-list="atlasFrom.atlasList"
          list-type="picture"
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
        <p>注：上传的第一张图片默认为封面</p>
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          @click="submit('atlasFrom')"
        >提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'AddAtlas',
  data() {
    return {
      atlasFrom: {
        atlasList: []
      },
      rules: {
        atlasName: [
          { required: true, message: '请填写图集名称!', trigger: 'blur' }
        ],
        atlasList: [
          { required: true, message: '请上传图片！' }
        ]
      }
    }
  },
  methods: {
    atlasHandlePreview(file, fileList) {
      console.log(file, fileList)
    },
    atlasHandleRemove(file, fileList) {
      this.atlasFrom.atlasList = fileList
    },
    atlasHandleSuccess(response, file, fileList) {
      this.atlasFrom.atlasList = fileList
      this.$refs.atlasRef.clearValidate()
    },
    // 提交
    submit(atlasFrom) {
      let _that = this
      this.$refs[atlasFrom].validate((valid) => {
        if (this.atlasFrom.atlasList.length > 0) {
          this.$refs.atlasRef.clearValidate()
        }
        if (valid) {
          this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            setTimeout(() => {
              _that.$router.push('/atlas/index')
            }, 1000)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addAtlas-content {
  padding: 40px;
  .addAtlas-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  .create-content-from {
    width: 500px;
    .el-form-item {
      margin-bottom: 50px;
      p {
        white-space: nowrap;
        color: red;
      }
      .submit-button {
        margin-top: 30px;
      }
    }
  }
}
</style>
