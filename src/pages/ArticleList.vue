
<template>
  <div class="article-list-page">
    <el-row :gutter="0">
      <el-col :xs="5" :sm="5" :md="5" :lg="5" class="left-list">
        <h3 class="list-title">文章列表<i class="el-icon-plus" @click="addArticle"></i></h3>
        <ul class="article-list">
          <li v-for="item in articleList" @click="goPreview(item._id)">
            <p class="title" :class="{'draft-title': item.state == 'draft'}">{{item.title}}</p>
            <p class="date">{{item.date | formatTime}}
              <span>{{item.label}}</span>
            </p>
          </li>
        </ul>
      </el-col>


      <el-col :xs="19" :sm="19" :md="19" :lg="19">
        <router-view @refreshArticle="getArticleList"></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    data (){
      return {
        articleList: []
      }
    },
    methods: {
      getArticleList: function () {
        this.$http.get('/api/admin/articleList')
          .then(
            (res) => {
              this.articleList = res.body;
            }
          )
      },

      addArticle: function(){
        this.$router.push('/articleList/articleEdit')
      },
      goPreview: function (id) {
        this.$router.push('/articleList/articlePreview/'+id)
      }
    },
    created (){
      this.getArticleList();
    }
  }
</script>
<style lang="less" scoped>
  .left-list {
    height: 100vh;
    border-right: 1px solid #f1f1f1;
    .list-title {
      color: #333333;
      text-align: center;
      font-weight: normal;
      font-size: 18px;
      padding: 15px 0;
      border-bottom: 1px solid #f1f1f1;
      .el-icon-plus {
        color: #3f3f3f;
        float: right;
        margin: 4px 10px 0 0;
        cursor: pointer;
      }
    }
    .article-list{
      li{
        padding: 10px;
        border-bottom: 1px solid #f1f1f1;
        cursor: pointer;
        .title{
          color: #20a0ff;
          line-height: 20px;
          font-size: 16px;
        }
        .draft-title{
          color: #ff2222;
        }
        .date{
          font-size: 12px;
          color: #b0b0b0;
          span{
            border: 1px #ccc solid;
            border-radius: 5px;
            padding: 2px 4px;
          }
        }
      }
    }

  }
</style>
