<template>
  <div class="login-page">
    <h2>登录</h2>
    <div>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data (){
      return{
        form: {
          name: '',
          pwd: ''
        }
      }
    },
    methods: {
      onSubmit: function () {
        this.$http.post('/api/login', this.form).then(
          (respone) => {
            if(respone.body.code ==0 ){
              this.$message('登录成功');
              this.$router.push({ path: '/home'})
            } else {
              this.$message.error('登录失败');
            }

          },
          (respone) => this.$message.error('保存失败，请刷新页面重试')
        )
      }
    }
  }
</script>

<style lang="less" scoped>

  .login-page{
    width: 400px;
    margin: 50px auto;
    background: #f1f1f1;
    padding: 20px;
    h2{
      text-align: center;
      color: #20A0FF;
      padding: 20px 0;
      font-size: 30px;
    }
  }
</style>
