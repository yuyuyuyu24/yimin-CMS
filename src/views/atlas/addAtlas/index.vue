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
        prop="atlasImgs"
      >
        <add-atlas-upload
          @addAtlasUploadFile="addAtlasList"
          @addAtlasUploadDel="addAtlasListDel"
        />
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
import addAtlasUpload from '@/components/upload/addAtlasUpload.vue'
import querystring from 'querystring'
import { newAtlas } from '@/api/atlas'
import { startLoading, closeLoading } from '@/utils/loading'

export default {
  name: 'AddAtlas',
  components: {
    addAtlasUpload
  },
  data() {
    return {
      atlasFrom: {
        atlasName: '',
        atlasImgs: []
      },
      rules: {
        atlasName: [
          { required: true, message: '请填写图集名称!', trigger: 'blur' }
        ],
        atlasImgs: [
          { required: true, message: '请上传图片！' }
        ]
      },
      createFromChange: {}
    }
  },
  methods: {
    // 接受从子组件传过来的值
    addAtlasList(req) {
      this.atlasFrom.atlasImgs = req
      this.$refs.atlasRef.clearValidate()
    },
    addAtlasListDel(req) {
      this.atlasFrom.atlasImgs = req
    },
    // 提交
    submit(atlasFrom) {
      this.$refs[atlasFrom].validate((valid) => {
        if (this.atlasFrom.atlasImgs.length > 0) {
          this.$refs.atlasRef.clearValidate()
        }
        if (valid) {
          this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.createFromChange = Object.assign({}, this.atlasFrom)
            let atlasImgs = []
            for (let i = 0; i < this.createFromChange.atlasImgs.length; i++) {
              atlasImgs.push(querystring.stringify(this.createFromChange.atlasImgs[i]))
            }
            this.createFromChange.atlasImgs = "'" + atlasImgs + "'"
            this.newAtlasFun(this.createFromChange)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
        } else {
          return false
        }
      })
    },
    // 创建图集接口
    newAtlasFun(data) {
      startLoading()
      newAtlas('atlas/newAtlas', data).then(res => {
        closeLoading()
        if (res.data.data) {
          this.$alert('创建图集成功!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/atlas')
            }
          })
        }
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.addAtlas-content {
  margin: 50px 0;
  padding: 20px 40px;
  .addAtlas-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .create-content-from {
    width: 500px;
    .el-form-item {
      margin-bottom: 20px;
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
