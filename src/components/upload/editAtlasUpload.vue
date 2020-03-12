<template>
  <div>
    <el-upload
      :data="uploadData"
      :action="Config.QI_NIU_UPLOAD"
      :before-remove="doDeleteImg"
      :file-list="fileList"
      :on-error="uploadError"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
      list-type="picture"
      accept="image/jpeg,image/gif,image/png,image/bmp"
      multiple
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
// import axios from 'axios'
import { setCookie, getCookie, funcChina } from '@/utils/function'
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
            setCookie('qiniutoken', res.data.message, 365)
          }
        })
      } else {
        this.uploadData.token = getCookie('qiniutoken')
      }
    },
    // 获取上传进度
    progress(res) { },
    upload(req) {
      const formdata = new FormData()
      this.uploadData.key = `upload_pic_${new Date().getTime()}_${req.file.name}`
      formdata.append('file', req.file)
      formdata.append('token', this.uploadData.token)
      formdata.append('key', this.uploadData.key)
      qiniuUpload(this.Config.QI_NIU_DIMAIN, formdata, this.progress).then((res) => {
        this.imageUrl = this.Config.QI_NIU_UPLOAD + '/' + res.data.key
        let file = {
          name: req.file.name,
          url: this.imageUrl
        }
        this.fileList.push(file)
        this.$emit('editAtlasUploadFile', this.fileList)
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
      this.$emit('editAtlasUploadDel', this.fileList, file)
    },
    // 上传文件限制
    beforeAvatarUpload(file) {
      if (!funcChina(file.name)) {
        message('warning', '图片名称不能含有中文！请修改后重新上传。')
        return false
      }
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.name === this.fileList[i].name) {
          this.$message.error('该张已上传过，请不要重复上传!')
          return false
        }
      }
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传图片只能是 jpg、png、jpeg 格式!')
        return false
      }
    }
  }
}
</script>
