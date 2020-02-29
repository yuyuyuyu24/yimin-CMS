<template>
  <div class="user-import-content">
    <h1>批量导入</h1>
    <p>
      为了保证数据成功导入，请严格按照发单模板的内容填写。如果你还没有发单模板，<el-link
        type="primary"
        href=""
      >请点击这里下载发单模板</el-link>
    </p>
    <div class="user-import-upload">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div
          slot="tip"
          class="el-upload__tip"
        >
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.user-import-content {
  .user-import-upload {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .el-upload__tip {
      text-align: center;
    }
  }
}
</style>
