<template>
  <div>
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
      >只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import { qiniutoken, qiniuUpload } from '@/api/qiniu'
// import axios from 'axios'
import { setCookie, getCookie } from '@/utils/function'
import { message } from '@/utils/loading'

export default {
  data() {
    return {
      uploadData: { key: '', token: '' },
      formAdd: { brandLogo: '' },
      fileList: [],
      imageUrl: ''
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
            setCookie('qiniutoken', res.data.message, 1)
          }
        })
      } else {
        this.uploadData.token = getCookie('qiniutoken')
      }
    },
    upload(req) {
      const formdata = new FormData()
      this.uploadData.key = `upload_pic_${new Date().getTime()}_${req.file.name}`
      formdata.append('file', req.file)
      formdata.append('token', this.uploadData.token)
      formdata.append('key', this.uploadData.key)
      qiniuUpload(this.Config.QI_NIU_DIMAIN, formdata).then((res) => {
        this.imageUrl = this.Config.QI_NIU_UPLOAD + '/' + res.data.key
        let file = {
          name: req.file.name,
          url: this.imageUrl
        }
        this.fileList.push(file)
        this.$emit('coverFile', this.fileList)
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
      this.$emit('coverFile', this.fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 上传文件限制
    beforeAvatarUpload(file) {
      // var observable = qiniu.upload(file, key, token, putExtra, config)
      console.log(file)
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
    },
    exceed() {
      message('warning', '商品封面只能为一张，如果需要更换封面把上传的封面删除即可。')
    }

  }
}
</script>
