<template>
  <div class="upload">
    <el-upload
      :data="uploadData"
      :action="Config.QI_NIU_UPLOAD"
      :on-remove="doDeleteImg"
      :file-list="fileList"
      :on-error="uploadError"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
      list-type="picture"
      accept="image/jpeg,image/gif,image/png,image/bmp"
      :limit="1"
      :on-exceed="exceed"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传jpg/png/jpeg文件</div>
    </el-upload>
  </div>
</template>
<script>
import { qiniutoken, qiniuUpload } from '@/api/qiniu'
import { setCookie, getCookie, funcChina } from '@/utils/function'
import { message } from '@/utils/loading'

export default {
  props: {
    bgimglist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      uploadData: { key: '', token: '' },
      formAdd: { brandLogo: '' },
      fileList: [],
      imageUrl: ''
    }
  },
  watch: {
    bgimglist: {
      deep: true,
      handler() {
        this.fileList = this.bgimglist
      }
    }
  },
  mounted() {
    this.qiniutokenFun()
  },
  methods: {
    // 请求七牛云token
    qiniutokenFun() {
      if (getCookie('qiniutoken') === null) {
        qiniutoken('goods/token').then((res) => {
          if (res.status === 200) {
            // 储存1年
            setCookie('qiniutoken', res.data.message, 365)
          }
        })
      } else {
        this.uploadData.token = getCookie('qiniutoken')
      }
    },
    // 获取上传进度
    progress(res) {
      this.upLoadProgress = res
    },
    upload(req) {
      const formdata = new FormData()
      this.uploadData.key = `upload_pic_${new Date().getTime()}_${req.file.name}`
      formdata.append('file', req.file)
      formdata.append('token', this.uploadData.token)
      formdata.append('key', this.uploadData.key)
      this.isUpload = true
      qiniuUpload(this.Config.QI_NIU_DIMAIN, formdata, this.progress).then((res) => {
        this.imageUrl = this.Config.QI_NIU_UPLOAD + '/' + res.data.key
        let file = {
          name: req.file.name,
          url: this.imageUrl
        }
        this.fileList.push(file)
        this.$emit('bgimgFile', this.fileList)
      })
    },
    uploadError(err, file, fileList) {
      this.$message({
        message: err,
        type: 'error',
        center: true
      })
    },
    doDeleteImg(file, fileList) {
      this.fileList = fileList
      this.$emit('bgimgFileDel', this.fileList)
    },
    // 上传文件限制
    beforeAvatarUpload(file) {
      if (!funcChina(file.name)) {
        message('warning', '图片名称不能含有中文！请修改后重新上传。')
        return false
      }
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传背景图图片只能是 jpg、png、jpeg 格式!')
        return false
      }
    },
    exceed() {
      message('warning', '背景图只能为一张，如果需要更换背景图把刚上传的封面删除即可。')
    }

  }
}
</script>
<style lang="scss">
.upload {
  .el-progress {
    margin-top: 20px;
  }
}
</style>
