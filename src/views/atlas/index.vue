<template>
  <div class="atlas-content">
    <div class="atlas-content-header">
      <h1>图集管理</h1>
      <el-button
        type="primary"
        @click="addAtlas"
      >新增图集</el-button>
    </div>
    <el-card>
      <div slot="header">
        <span>图集详情</span>
      </div>
      <el-table
        :data="atlasData"
        stripe
        class="el-table"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        />
        <el-table-column
          label="名称"
          prop="name"
          width="200"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.atlasName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="图片数量"
          width="200"
        >
          <template slot-scope="scope">
            <span>
              {{ changeAtlasList(scope) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图集封面">
          <template slot-scope="scope">
            <img
              v-if="scope.row.atlasImgs[0].url"
              :src="scope.row.atlasImgs[0].url"
            >
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="checkAtlas(scope)"
            >查看图集</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAtlas } from '@/api/atlas'
import { startLoading, closeLoading } from '@/utils/loading'
import querystring from 'querystring'

export default {
  name: 'Atlas',
  data() {
    return {
      atlasData: []
    }
  },
  mounted() {
    this.getSwiperFun()
  },
  methods: {
    // 获取全部图集
    getSwiperFun() {
      // let _this = this
      startLoading()
      getAtlas('atlas/getAtlas').then(res => {
        closeLoading()
        if (res.data.data) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].atlasImgs = res.data.data[i].atlasImgs.substr(1).substring(0, res.data.data[i].atlasImgs.length - 1)
            res.data.data[i].atlasImgs = res.data.data[i].atlasImgs.split(',')
            let atlasImgs = []
            for (let j = 0; j < res.data.data[i].atlasImgs.length; j++) {
              atlasImgs.push(querystring.parse(res.data.data[i].atlasImgs[j]))
            }
            res.data.data[i].atlasImgs = atlasImgs
            this.atlasData = res.data.data
          }
        }
      }).catch(() => { })
    },
    // 增加图集
    addAtlas() {
      this.$router.push('/addAtlas')
    },
    // 查看图集
    checkAtlas(scope) {
      this.$router.push(`/editAtlas?id=${this.Config.ENCODE(scope.row.id)}`)
    },
    // 转换图集内图片长度
    changeAtlasList(scope) {
      for (let i = 0; i < scope.row.atlasImgs.length; i++) {
        if (scope.row.atlasImgs[i].url === undefined) {
          return 0
        } else {
          return scope.row.atlasImgs.length
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.atlas-content {
  margin: 50px 0;
  padding: 20px 40px;
  .atlas-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .el-table {
    width: 100%;
    img {
      width: 170px;
      height: 85px;
    }
  }
}
</style>
