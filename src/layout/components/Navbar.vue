<template>
  <div class="navbar">
    <div class="navbar-content">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />

      <span class="title">清真伊民肉业</span>

      <div class="right-menu">
        欢迎您，{{ username }}

        <span
          class="show-pwd"
          @click="logout"
        >
          <svg-icon icon-class="signOut" />
          退出
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getCookie } from '@/utils/function'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {
    this.username = getCookie('userName')
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: calc(100% - 210px);
  position: fixed;
  top: 0;
  right: 0;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  text-align: center;
  line-height: 50px;
  z-index: 10;
  .navbar-content {
    width: 100%;
    position: relative;
    top: 0;
    right: 0;
    height: 100%;
    .hamburger-container {
      position: absolute;
      left: 0;
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }

    .breadcrumb-container {
      position: absolute;
      left: 50px;
    }

    .right-menu {
      height: 100%;
      line-height: 50px;
      position: absolute;
      right: 0;
      top: 0;

      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
      }
      span {
        font-size: 16px;
        padding-right: 10px;
        margin-left: 20px;
      }
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
