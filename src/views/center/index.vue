<template>
  <div class="center-content">
    <div class="center-content-header">
      <h1>个人中心</h1>
    </div>
    <el-form
      :inline="true"
      :model="headImgFrom"
      label-width="150px"
      class="center-content-from"
    >
      <el-form-item
        label="修改头像:"
        prop=""
      >
        <head-upload
          :headlist="headImgFrom.headList"
          @headFile="headList"
          @headFileDel="headFileDel"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
          @click="editAdminHeadFun"
        >提交</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="bgImgFrom"
      label-width="150px"
      class="center-content-from"
    >
      <el-form-item
        label="修改背景图:"
        prop=""
      >
        <bg-img-upload
          :bgimglist="bgImgFrom.bgImgList"
          @bgimgFile="bgimgList"
          @bgimgFileDel="bgimgFileDel"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
          @click="editAdminBgFun"
        >提交</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="shopReadmeFrom"
      label-width="150px"
      class="center-content-from"
    >
      <el-form-item
        label="修改商家自述:"
        prop=""
      >
        <el-input
          v-model="shopReadmeFrom.textarea"
          autosize
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
        />

      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
          @click="editAdminWordFun"
        >提交</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="editPhoneOneFrom"
      label-width="150px"
      class="center-content-from"
    >
      <el-form-item
        label="修改联系电话1:"
        prop=""
      >
        <el-input
          v-model="editPhoneOneFrom.phoneOne"
          placeholder="请输入内容"
        />

      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
          @click="editAdminPhoneOneFun"
        >提交</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :inline="true"
      :model="editPhoneTwoFrom"
      label-width="150px"
      class="center-content-from"
    >
      <el-form-item
        label="修改联系电话2:"
        prop=""
      >
        <el-input
          v-model="editPhoneTwoFrom.phoneTwo"
          placeholder="请输入内容"
        />

      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
          @click="editAdminPhoneTwoFun"
        >提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getAdminDetail, editAdminHead, editAdminBg, editAdminWord, editAdminPhoneOne, editAdminPhoneTwo } from '@/api/admin'
import { startLoading, closeLoading, message } from '@/utils/loading'
import headUpload from '@/components/upload/headUpload.vue'
import bgImgUpload from '@/components/upload/bgImgUpload.vue'
import querystring from 'querystring'

export default {
  name: 'Center',
  components: {
    headUpload,
    bgImgUpload
  },
  data() {
    return {
      headImgFrom: {
        headList: []
      },
      bgImgFrom: {
        bgImgList: []
      },
      shopReadmeFrom: {
        'textarea': ''
      },
      editPhoneOneFrom: {
        'phoneOne': ''
      },
      editPhoneTwoFrom: {
        'phoneTwo': ''
      },
      changeHeadImgFrom: {},
      changeBgImgFrom: {}
    }
  },
  mounted() {
    this.getAdminDetailFun()
  },
  methods: {
    // 获取admin信息
    getAdminDetailFun() {
      let _this = this
      startLoading()
      getAdminDetail('admin/getAdminDetail', { id: 1 }).then(res => {
        closeLoading()
        if (res.status !== 200) {
          message('error', '网络出现问题，请稍后重试！')
        } else {
          let headList = []
          if (res.data.data.head === '') {
            _this.headImgFrom.headList = []
          } else {
            headList.push(querystring.parse(res.data.data.head))
            _this.headImgFrom.headList = headList
          }
          let bgimgList = []
          if (res.data.data.background === '') {
            _this.bgImgFrom.bgImgList = []
          } else {
            bgimgList.push(querystring.parse(res.data.data.background))
            _this.bgImgFrom.bgImgList = bgimgList
          }
          _this.shopReadmeFrom.textarea = res.data.data.shopWord
          _this.editPhoneOneFrom.phoneOne = res.data.data.phoneOne
          _this.editPhoneTwoFrom.phoneTwo = res.data.data.phoneTwo
        }
      })
    },
    // 修改admin头像
    editAdminHeadFun() {
      if (this.headImgFrom.headList.length === 0) {
        return message('warning', '头像不能为空！')
      }
      this.$confirm('是否确认修改头像?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let _this = this
          startLoading()
          this.changeHeadImgFrom = Object.assign({}, this.headImgFrom)
          this.changeHeadImgFrom.headList = querystring.stringify(this.changeHeadImgFrom.headList[0])
          let data = {
            id: 1,
            head: _this.changeHeadImgFrom.headList
          }
          editAdminHead('admin/editAdminHead', data).then(res => {
            closeLoading()
            if (res.data) {
              this.$alert('头像修改成功!', '提示', {
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
    },
    // 修改背景
    editAdminBgFun() {
      if (this.bgImgFrom.bgImgList.length === 0) {
        return message('warning', '背景图不能为空！')
      }
      this.$confirm('是否确认修改背景图?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let _this = this
          startLoading()
          this.changeBgImgFrom = Object.assign({}, this.bgImgFrom)
          this.changeBgImgFrom.bgImgList = querystring.stringify(this.changeBgImgFrom.bgImgList[0])
          let data = {
            id: 1,
            background: _this.changeBgImgFrom.bgImgList
          }
          editAdminBg('admin/editAdminBg', data).then(res => {
            closeLoading()
            if (res.data) {
              this.$alert('背景图修改成功!', '提示', {
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
    },
    // 修改商家简介
    editAdminWordFun() {
      this.$confirm('是否修改商家简介?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let _this = this
          startLoading()
          let data = {
            id: 1, shopWord: _this.shopReadmeFrom.textarea
          }
          editAdminWord('admin/editAdminWord', data).then(res => {
            closeLoading()
            if (res.data.data) {
              message('success', '修改成功！')
              this.getAdminDetailFun()
            }
          }).catch(() => {
            message('error', '网络出现问题，请稍后重试！')
          })
        })
        .catch(action => {
          message('info', '取消！')
        })
    },
    // 修改手机号1
    editAdminPhoneOneFun() {
      this.$confirm('是否修改手机号码1?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let _this = this
          startLoading()
          let data = {
            id: 1,
            phoneOne: _this.editPhoneOneFrom.phoneOne
          }
          editAdminPhoneOne('admin/editAdminPhoneOne', data).then(res => {
            closeLoading()
            if (res.data.data) {
              message('success', '修改成功！')
              this.getAdminDetailFun()
            }
          }).catch(() => {
            message('error', '网络出现问题，请稍后重试！')
          })
        })
        .catch(action => {
          message('info', '取消！')
        })
    },
    // 修改手机号2
    editAdminPhoneTwoFun() {
      this.$confirm('是否修改手机号码2?', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          let _this = this
          startLoading()
          let data = {
            id: 1,
            phoneTwo: _this.editPhoneTwoFrom.phoneTwo
          }
          editAdminPhoneTwo('admin/editAdminPhoneTwo', data).then(res => {
            closeLoading()
            if (res.data) {
              message('success', '修改成功！')
              this.getAdminDetailFun()
            }
          }).catch(() => {
            message('error', '网络出现问题，请稍后重试！')
          })
        })
        .catch(action => {
          message('info', '取消！')
        })
    },
    // 接受从子组件传过来的head值
    headList(req) {
      this.headImgFrom.headList = req
    },
    headFileDel(req) {
      this.headImgFrom.headList = req
    },
    // 接受从子组件传过来的bgimg值
    bgimgList(req) {
      this.bgImgFrom.bgImgList = req
    },
    bgimgFileDel(req) {
      this.bgImgFrom.bgImgList = req
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  &-content {
    margin: 50px 0;
    padding: 40px;
  }
  &-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  &-content-from {
    width: 700px;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
    >>> .el-textarea__inner,
    .el-input {
      width: 249px;
    }
  }
}
</style>
