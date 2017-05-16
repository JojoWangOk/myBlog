<template>
  <div class="person-page">
    <h2>My Blog</h2>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="博客名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="博客说明">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data (){
      return {
        form: {
          name: '',
          description: '',
          introduction: ''
        }
      }
    },
    methods: {
      onSubmit: function () {
        this.$http.post('/api/save/blogInformation', {
          form: this.form
        }).then(
          respone => this.$message('保存成功'),
          respone => this.$message.error('保存失败，请刷新页面重试')
        )
      },
      getInfo: function () {
        this.$http.get('/api/blogInformation', {form: this.form}).then(
          (res) => {
            console.log(res)
            if(res.body.length>0){

              this.form = res.body[0]
            }
          },
          (res) => {
            console.log(res)
          }
        )
      }
    },
    created: function () {
      this.getInfo()
    }
  }
</script>

<style lang="less" scoped>
  .person-page{
    width: 500px;
    margin: 50px auto;
    h2{
      color: #20A0FF;
      text-align: center;
      padding: 20px 0;
      font-size: 30px;
    }
  }
</style>
