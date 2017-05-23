<template>
  <el-menu mode="vertical" default-active="3" theme="dark">
    <el-menu-item-group title="">
      <el-menu-item index="1">
        <router-link :to="{ path: '/articleList' }" class="link-item"><i class="el-icon-document"></i>列表</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ path: '/labels' }" class="link-item"><i class="el-icon-star-on"></i>标签</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link :to="{ path: '/home' }" class="link-item"><i class="el-icon-information"></i>信息</router-link>
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<style lang="less" scoped>
  .el-menu {
    height: 100vh;
    .el-menu-item{
      padding-left: 10px !important;
    }
    .is-active{
      color: #ffffff;
      background: #44556f;
    }
    a{
      color: #bfcbd9;
      width: 100%;
      height: 100%;
      display: inline-block;
    }
    .router-link-active {
      color: #ffffff;
    }
  }

</style>
<script>
  export default{}
</script>
