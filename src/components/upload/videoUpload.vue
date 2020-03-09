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
      accept="image/jpeg,image/gif,image/png,image/bmp"
      multiple
      :limit="1"
    >
      <el-button
        size="small"
        type="primary"
      >点击上传</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >只能上传mp4文件</div>
    </el-upload>
    <el-progress
      v-if="isUpload"
      :percentage="upLoadProgress"
    />
  </div>
</template>
<script>
import { qiniutoken, qiniuUpload } from '@/api/qiniu'
import { setCookie, getCookie, funcChina } from '@/utils/function'
import { message } from '@/utils/loading'

export default {
  props: {
    videolist: {
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
      videoUrl: '',
      upLoadProgress: 0,
      isUpload: false
    }
  },
  watch: {
    videolist: {
      deep: true,
      handler() {
        this.fileList = this.videolist
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
            setCookie('qiniutoken', res.data.message, 1)
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
        this.videoUrl = this.Config.QI_NIU_UPLOAD + '/' + res.data.key
        let file = {
          name: req.file.name,
          url: this.videoUrl
        }
        this.fileList.push(file)
        this.$emit('videoFile', this.fileList)
        setTimeout(() => {
          this.isUpload = false
          this.upLoadProgress = 0
        }, 2000)
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
      this.$emit('videoFile', this.fileList)
    },
    // 上传文件限制
    beforeAvatarUpload(file) {
      this.$alert('上传视频时不要刷新，关闭页面，否则会导致视频上传中断！', '注意！', {
        confirmButtonText: '确定'
      })
      if (!funcChina(file.name)) {
        message('warning', '图片名称不能含有中文！请修改后重新上传。')
        return false
      }
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.name === this.fileList[i].name) {
          this.$message.error('该视频已上传过，请不要重复上传!')
          return false
        }
      }
      const isMP4 = file.type === 'video/mp4'
      if (!isMP4) {
        this.$message.error('上传视频格式只能是MP4格式!')
        return false
      }
    },
    exceed() {
      message('warning', '商品视频封面只能为一个，如果需要更换视频把刚上传的视频删除即可。')
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
