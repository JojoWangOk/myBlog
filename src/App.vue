<script src="../../n4/jojo/routes/users.js"></script>
<template>
  <div id="app">
    <el-row :gutter="0">
      <el-col :xs="2" :sm="2" :md="2" :lg="2" v-show="isLogin">
        <SideBar></SideBar>
      </el-col>
      <el-col :xs="22" :sm="22" :md="22" :lg="22">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SideBar from '@/components/SideBar.vue'
  export default {
    name: 'app',
    components: {
      SideBar
    },
    data () {
      return {
        isLogin: false
      }
    },
    created: function () {
      this.$http.get('/api/accessuser').then(
        res => {
          if (res.body.name){
            this.isLogin = res.body.name;
            this.$router.push({ path: '/home'})
          } else {
            this.$router.push({ path: '/'})
          }
        },
        res => {
          console.log(res)
        }
      )
    },


    directives: {},
    methods: {},
    watch: {
      '$router': function () {
        this.$http.get('/api/accessuser').then(
          res => {
            if (res.body.name){
              this.isLogin = res.body.name;
            }
          },
          res => {
            console.log(res)
          }
        )
      }
    }
  }
</script>

<style>
  @import './styles/common.css';
</style>
