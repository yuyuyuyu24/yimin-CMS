<template>
  <div class="create-content">
    <div class="create-content-header">
      <h1>增加商品</h1>
    </div>
    <el-form
      ref="createFrom"
      label-width="auto"
      label-position="left"
      class="create-content-from"
      :model="createFrom"
      :rules="rules"
    >
      <el-form-item
        label="商品名称:"
        prop="goodsName"
      >
        <el-input
          v-model="createFrom.goodsName"
          placeholder="请输入商品名称"
        />
      </el-form-item>
      <el-form-item
        label="商品价格:"
        prop="goodsPrice"
      >
        <el-input
          v-model.number="createFrom.goodsPrice"
          type="number"
          placeholder="请输入商品价格"
        />
      </el-form-item>
      <el-form-item
        label="商品留言:"
        prop="goodsInfo"
      >
        <el-input
          v-model="createFrom.goodsInfo"
          placeholder="请输入商品留言"
        />
      </el-form-item>
      <el-form-item
        label="商品单位:"
        prop="goodsUnit"
      >
        <el-input
          v-model="createFrom.goodsUnit"
          placeholder="请输入商品单位"
        />
        <p>例：500克，袋，个，盒等。</p>
      </el-form-item>
      <el-form-item
        ref="coverFrom"
        label="商品封面:"
        prop="coverList"
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="coverHandlePreview"
          :on-remove="coverHandleRemove"
          :on-success="coverHandleSuccess"
          :file-list="createFrom.coverList"
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
      <el-form-item
        ref="swiperFrom"
        label="商品轮播图:"
        prop="swiperList"
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="swiperHandlePreview"
          :on-remove="swiperHandleRemove"
          :on-success="swiperHandleSuccess"
          :file-list="createFrom.swiperList"
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
      <el-form-item label="是否有商品视频:">
        <el-switch
          v-model="createFrom.isVideos"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
          @change="isVideosFun"
        />
        <p>注：该选项可以不填，默认为否。</p>
      </el-form-item>
      <el-form-item
        v-if="createFrom.isVideos"
        label="商品视频:"
      >
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="videoHandlePreview"
          :on-remove="videoHandleRemove"
          :file-list="createFrom.videoList"
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
      </el-form-item>
      <el-form-item label="该商品是否为热门商品:">
        <el-switch
          v-model="createFrom.isHot"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
          @change="isHotFun"
        />
        <p>注：该选项可以不填，默认为否。</p>
      </el-form-item>
      <el-form-item label="商品库存量:">
        <el-input
          v-model.number="createFrom.goodsStock"
          type="number"
          placeholder="请输入商品库存量"
        />
        <p>注：商品库存量可以不填，默认库存数量为99，当库存量为 0 时商品会显示已售罄。</p>
      </el-form-item>
      <el-form-item
        label="商品分类:"
        prop="goodsType"
      >
        <el-select
          v-model="createFrom.goodsType"
          filterable
          placeholder="请选择"
        >
          <el-option
            label="全部"
            value=""
          />
          <el-option
            v-for="(v, k, i) in Config.MEAT_TYPE.MEAT_TYPE_STATUS()"
            :key="i"
            :label="v"
            :value="k"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submit('createFrom')"
        >提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="40%"
    >
      <p>请检查商品信息，确认无误后点击确定即可发布商品！</p>
      <span>
        商品名称:{{ createFrom.goodsName }}
      </span>
      <span>
        商品价格:{{ createFrom.goodsPrice }}
      </span>
      <span>
        商品留言:{{ createFrom.goodsInfo }}
      </span>
      <span>
        商品单位:{{ createFrom.goodsUnit }}
      </span>
      <span>
        商品封面:{{ createFrom.coverList }}
      </span>
      <span>
        商品轮播图:{{ createFrom.swiperList }}
      </span>
      <span>
        是否有商品视频:{{ createFrom.isVideos===false ?'否':'是' }}
      </span>
      <span v-if="createFrom.isVideos">
        商品视频:{{ createFrom.videoList }}
      </span>
      <span>
        该商品是否为热门商品:{{ createFrom.isHot===false ?'否':'是' }}
      </span>
      <span>
        商品库存量:{{ createFrom.goodsStock }}
      </span>
      <span>
        商品分类:{{ changeGoodsType(createFrom.goodsType) }}
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createFrom: {
        goodsName: '',
        isVideos: false,
        isHot: false,
        coverList: [],
        swiperList: [],
        videoList: [],
        goodsStock: 99,
        goods_status: 1
      },
      centerDialogVisible: false,
      rules: {
        goodsName: [
          { required: true, message: '请填写商品名称!', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '商品价格不能为空！' },
          { type: 'number', message: '商品价格必须为数字值！' }
        ],
        goodsInfo: [
          { required: true, message: '请填写商品留言！', trigger: 'blur' }
        ],
        goodsUnit: [
          { required: true, message: '请填写商品单位！', trigger: 'blur' }
        ],
        coverList: [
          { required: true, message: '请上传商品封面！' }
        ],
        swiperList: [
          { required: true, message: '请上传商品轮播图！' }
        ],
        goodsType: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    if (this.$route.query.type === 'edit') {
      console.log(this.$route.query)
      this.createFrom = JSON.parse(this.$route.query.data)
    } if (this.$route.query.type === 'add') {
      console.log(this.createFrom)
      return this.createFrom
    }
  },
  methods: {
    coverHandlePreview(file, fileList) {
      console.log(file, fileList)
    },
    coverHandleRemove(file, fileList) {
      this.createFrom.coverList = fileList
    },
    coverHandleSuccess(response, file, fileList) {
      console.log(fileList)
      this.createFrom.coverList = fileList
      this.$refs.coverFrom.clearValidate()
    },
    swiperHandlePreview(file, fileList) {
      console.log(file, fileList)
    },
    swiperHandleRemove(file, fileList) {
      this.createFrom.swiperList = fileList
    },
    swiperHandleSuccess(response, file, fileList) {
      this.createFrom.swiperList = fileList
      this.$refs.swiperFrom.clearValidate()
    },
    videoHandlePreview(file, fileList) {
      console.log(file, fileList)
    },
    videoHandleRemove(file) {
      console.log(file)
    },
    // 是否有商品视频
    isVideosFun() {
    },
    // 是否为热门商品
    isHotFun() {
    },
    // 转换商品类型
    changeGoodsType(val) {
      return this.Config.MEAT_TYPE.MEAT_TYPE_STATUS(val)
    },
    // 提交
    submit(createFrom) {
      this.$refs[createFrom].validate((valid) => {
        if (this.createFrom.coverList.length > 0) {
          this.$refs.coverFrom.clearValidate()
        }
        if (this.createFrom.swiperList.length > 0) {
          this.$refs.swiperFrom.clearValidate()
        }
        if (valid) {
          this.centerDialogVisible = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (this.createFrom.goodsStock === 0 || this.createFrom.goodsStock === '') {
        this.createFrom.goods_status = 2
      } else {
        this.createFrom.goods_status = 1
      }
      console.log(typeof this.createFrom.goodsStock)
      console.log(this.createFrom.goodsStock)
    }

  }
}
</script>

<style lang="scss" >
.create-content {
  margin: 50px 0;
  padding: 40px;
  .create-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .create-content-from {
    width: 500px;
    .el-form-item {
      margin-bottom: 50px;
      p {
        white-space: nowrap;
        color: red;
      }
    }
  }
  .el-dialog__body {
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    p {
      color: red;
      padding: 10px 0;
      font-weight: 600;
      padding: 10px 0;
    }
    span {
      padding: 10px 0;
    }
  }
}
</style>
