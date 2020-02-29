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
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="headImgPreview"
          :on-remove="headImgRemove"
          :on-success="headImgSuccess"
          :file-list="headImgFrom.headImgList"
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
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
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
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="bgImgPreview"
          :on-remove="bgImgRemove"
          :on-success="bgImgSuccess"
          :file-list="bgImgFrom.bgImgList"
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
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          plain
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
        >提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: 'Center',
  data() {
    return {
      headImgFrom: {},
      bgImgFrom: {},
      shopReadmeFrom: {},
      editPhoneOneFrom: {},
      editPhoneTwoFrom: {}
    }
  },
  methods: {
    headImgPreview(file, fileList) {
      console.log(file, fileList)
    },
    headImgRemove(file, fileList) {
    },
    headImgSuccess(response, file, fileList) {
      console.log(fileList)
    },
    bgImgPreview(file, fileList) {
      console.log(file, fileList)
    },
    bgImgRemove(file, fileList) {
    },
    bgImgSuccess(response, file, fileList) {
      console.log(fileList)
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
    width: 500px;
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
