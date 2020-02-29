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
        />
        <el-table-column
          label="图片数量"
          width="200"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.imgs.length }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图集封面">
          <template slot-scope="scope">
            <img :src="scope.row.imgs[0]">
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
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

export default {
  name: 'Atlas',
  data() {
    return {
      atlasData: [
        { name: '店铺实拍',
          imgs:
            [
              'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3134936990,1473651008&fm=26&gp=0.jpg',
              'https://www.baidu.com/img/bd_logo1.png',
              'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GHWaAsaj1.TRUMMoIGhP4xqqhcZz2bs41kt9EolGWcCbdgBhttaxiPAUMc2DdNgHz59x59Y*kYic53AWiUN594s!/b&bo=rgGuAa4BrgERFyA!&rf=viewer_4&t=5',
              'http://m.qpic.cn/psc?/V12Mh4N601guT1/YWvjNfAyIVey1fwA2tD8GJMDrkW0t8nPeOwoDxmItcDK68DgRruvT56E2lQB5mbg5aQjPVpkGufHbpsfl3t1otcVsI3M2qV9LewaKGd2mgQ!/b&bo=VQhABlUIQAYRNwA!&rf=viewer_4&t=5'
            ],
          id: 0
        },
        { 'name': '店铺实拍2',
          'imgs':
            ['https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3134936990,1473651008&fm=26&gp=0.jpg',
              'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3134936990,1473651008&fm=26&gp=0.jpg'],
          'id': 1
        }
      ]
    }
  },
  mounted() {
    console.log(this.$store)
  },
  methods: {
    // 增加图集
    addAtlas() {
      this.$router.push('/addAtlas')
    },
    // 查看图集
    checkAtlas(scope) {
      let data = JSON.stringify(scope.row)
      this.$router.push(`/editAtlas?data=${encodeURIComponent(data)}`)
    }

  }
}
</script>

<style lang="scss" scoped>
.atlas-content {
  margin: 50px 0;
  padding: 40px;
  .atlas-content-header {
    h1 {
      font-size: 24px;
      padding-right: 30px;
    }
    display: flex;
    align-items: center;
    margin-bottom: 50px;
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
