<template>
  <div class="create-content">
    <div class="create-content-header">
      <h1>增加商品</h1>
    </div>
    <el-form
      ref="createFrom"
      label-width="160px"
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
        <cover-upload
          :coverlist="createFrom.coverList"
          @coverFile="coverList"
          @coverFileDel="coverListDel"
        />
        <p>注：建议把商品封面当做轮播图的第一张图，所以需要在商品轮播图处重新上传一次商品封面图片。</p>
      </el-form-item>
      <el-form-item
        ref="swiperFrom"
        label="商品轮播图:"
        prop="swiperList"
      >
        <swiper-upload
          :swiperlist="createFrom.swiperList"
          @swiperFile="swiperList"
        />
        <p>注：轮播图按顺序上传，第一张上传的图片即为第一张轮播图，以此类推。</p>
      </el-form-item>
      <el-form-item label="是否有商品视频:">
        <el-switch
          v-model="createFrom.isVideos"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
        />
        <p>注：该选项可以不填，默认为否。</p>
      </el-form-item>
      <el-form-item
        v-show="createFrom.isVideos"
        label="商品视频:"
      >
        <video-upload
          :videolist="createFrom.videoList"
          @videoFile="videoList"
        />
      </el-form-item>
      <el-form-item label="该商品是否为热门商品:">
        <el-switch
          v-model="createFrom.isHot"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
        />
        <p>注：该选项可以不填，默认为否。</p>
      </el-form-item>
      <el-form-item label="该商品是否为特价商品:">
        <el-switch
          v-model="createFrom.isSpecial"
          active-color="#13ce66"
          active-text="是"
          inactive-text="否"
        />
        <p>注：该选项可以不填，默认为否。</p>
      </el-form-item>
      <el-form-item
        v-if="createFrom.isSpecial"
        label="商品原价:"
      >
        <el-input
          v-model.number="createFrom.beforeGoodsPrice"
          type="number"
          min="0"
          placeholder="请输入商品原价"
        />
        <p>注：请输入商品原价，最上面的商品价格为优惠后的价格。</p>
      </el-form-item>
      <el-form-item label="商品库存量:">
        <el-input
          v-model.number="createFrom.goodsStock"
          type="number"
          min="0"
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
      width="400"
      :before-close="handleClose"
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
        商品封面:
        <br>
        <div class="upload-img">
          <img
            v-for="(item,index) in createFrom.coverList"
            :key="index"
            :src="item.url"
          >
        </div>
      </span>
      <span>
        商品轮播图:
        <br>
        <div class="upload-img">
          <img
            v-for="(item,index) in createFrom.swiperList"
            :key="index"
            :src="item.url"
          >
        </div>
      </span>
      <span>
        是否有商品视频:{{ createFrom.isVideos===false ?'否':'是' }}
      </span>
      <span v-if="createFrom.isVideos">
        商品视频:
        <br>
        <div class="goods-video">
          <div
            v-for="(item,index) in createFrom.videoList"
            :key="index"
            class="goods-video-box"
          >
            <span class="svg-container">
              <svg-icon icon-class="video" />
            </span>
            <h3>{{ item.name }}</h3>
          </div>
        </div>
      </span>
      <span>
        该商品是否为热门商品:{{ createFrom.isHot===false ?'否':'是' }}
      </span>
      <span>
        该商品是否为特价商品:{{ createFrom.isSpecial===false ?'否':'是' }}
      </span>
      <span v-if="createFrom.isSpecial">
        商品原价:{{ createFrom.beforeGoodsPrice }}
      </span>
      <span>
        商品库存量:{{ createFrom.goodsStock }}
      </span>
      <span>
        商品分类:{{ changeGoodsType(createFrom.goodsType) }}
      </span>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="createGoods"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsDetail, newGoods, upGoodsData } from '@/api/goods'
import { startLoading, closeLoading, message } from '@/utils/loading'
import coverUpload from '@/components/upload/coverUpload.vue'
import swiperUpload from '@/components/upload/swiperUpload.vue'
import videoUpload from '@/components/upload/videoUpload.vue'
import querystring from 'querystring'
import { changeQuerystringDetail } from '@/utils/function'

export default {
  components: {
    coverUpload,
    swiperUpload,
    videoUpload
  },
  data() {
    return {
      createFrom: {
        goodsName: '',
        isVideos: false,
        isHot: false,
        isSpecial: false,
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
      },
      swiperListChange: [],
      videoListChange: [],
      createFromChange: {},
      pageType: ''
    }
  },
  mounted() {
    if (this.$route.query.type === 'edit') {
      let id = this.Config.UNENCODE(this.$route.query.id)
      this.getGoodsFun({ id })
      this.pageType = 'edit'
    } if (this.$route.query.type === 'add') {
      this.pageType = 'add'
    }
  },
  methods: {
    // 获取全部商品接口
    getGoodsFun({ id }) {
      let _this = this
      startLoading()
      getGoodsDetail('goods/getGoodsDetail', { id }).then(res => {
        closeLoading()
        if (res.data.data) {
          if (res.data.data.isHot === 0) {
            res.data.data.isHot = false
          } else {
            res.data.data.isHot = true
          }
          if (res.data.data.isSpecial === 0) {
            res.data.data.isSpecial = false
          } else {
            res.data.data.isSpecial = true
          }
          if (res.data.data.isVideos === 0) {
            res.data.data.isVideos = false
          } else {
            res.data.data.isVideos = true
          }
          _this.createFrom = changeQuerystringDetail(res.data.data)
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 接受从子组件传过来的cover值
    coverList(req) {
      this.createFrom.coverList = req
      this.$refs.coverFrom.clearValidate()
    },
    coverListDel(req) {
      this.createFrom.coverList = req
    },
    swiperList(req) {
      this.createFrom.swiperList = req
      this.$refs.swiperFrom.clearValidate()
    },
    videoList(req) {
      this.createFrom.videoList = req
    },
    // 转换商品类型
    changeGoodsType(val) {
      return this.Config.MEAT_TYPE.MEAT_TYPE_STATUS(val)
    },
    // 创建商品接口
    newGoodsFun(data) {
      startLoading()
      newGoods('goods/newGoods', data).then(res => {
        closeLoading()
        if (res.data.data) {
          this.$alert('商品创建成功!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/goods')
            }
          })
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 编辑商品接口
    upGoodsDataFun(data) {
      startLoading()
      upGoodsData('goods/upGoodsData', data).then(res => {
        closeLoading()
        if (res.data.data) {
          this.$alert('商品编辑成功!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push('/goods')
            }
          })
        }
      }).catch(() => {
        message('error', '网络出现问题，请稍后重试！')
      })
    },
    // 提交表单
    submit(createFrom) {
      this.$refs[createFrom].validate((valid) => {
        if (this.createFrom.coverList.length > 0) {
          this.$refs.coverFrom.clearValidate()
        }
        if (this.createFrom.swiperList.length > 0) {
          this.$refs.swiperFrom.clearValidate()
        }
        if (this.createFrom.goodsStock < 0) {
          return this.$message({
            message: '商品库存量不能为负数 !',
            type: 'warning'
          })
        }
        if (this.createFrom.beforeGoodsPrice <= this.createFrom.goodsPrice) {
          return this.$message({
            message: '商品原价不能小于或等于商品优惠后的价格 !',
            type: 'warning'
          })
        }
        if (valid) {
          this.centerDialogVisible = true
        } else {
          return false
        }
        if (this.createFrom.goodsStock === 0) {
          this.createFrom.goodsStatus = 2
        } else if (this.createFrom.goodsStock > 0 && this.createFrom.goodsStatus === 3) {
          this.createFrom.goodsStatus = 3
        } else if (this.createFrom.goodsStock > 0) {
          this.createFrom.goodsStatus = 1
        }
        if (this.createFrom.videoList.length === 0) {
          this.createFrom.isVideos = false
        }
      })
    },
    // 创建商品
    createGoods() {
      // 进行转换，因为涉及到换值
      this.createFromChange = Object.assign({}, this.createFrom)
      if (this.createFromChange.isHot === false) {
        this.createFromChange.isHot = 0
      } else {
        this.createFromChange.isHot = 1
      }
      if (this.createFromChange.isSpecial === false) {
        this.createFromChange.isSpecial = 0
      } else {
        this.createFromChange.isSpecial = 1
      }
      if (this.createFromChange.isVideos === false) {
        this.createFromChange.isVideos = 0
      } else {
        this.createFromChange.isVideos = 1
      }
      this.createFromChange.coverList = querystring.stringify(this.createFromChange.coverList[0])
      let swiperList = []
      for (let i = 0; i < this.createFromChange.swiperList.length; i++) {
        swiperList.push(querystring.stringify(this.createFromChange.swiperList[i]))
      }
      this.createFromChange.swiperList = "'" + swiperList + "'"

      if (this.createFromChange.videoList.length === 0) {
        this.createFromChange.videoList = ''
      } else {
        this.createFromChange.videoList = querystring.stringify(this.createFromChange.videoList[0])
      }

      if (this.pageType === 'edit') {
        this.upGoodsDataFun(this.createFromChange)
      } else {
        this.newGoodsFun(this.createFromChange)
      }
    },

    // esc关闭dialog
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // done()
          this.centerDialogVisible = false
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss" >
.create-content {
  margin: 50px 0;
  padding: 20px 40px;
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
      margin-bottom: 20px;
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
  .upload-img {
    width: 100%;
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    img {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
  }
  .goods-video {
    width: 100%;
    display: flex;
    flex-direction: column;
    .goods-video-box {
      display: flex;
      align-items: center;
      h3 {
        margin: 15px 0 15px 10px;
        font-weight: 100;
      }
    }
  }
}
</style>
