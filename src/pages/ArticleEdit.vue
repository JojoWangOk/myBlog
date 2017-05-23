<template>
  <div class="edit-article-page">
    <div class="article-title">
      <input v-model="articleTitle" placeholder="请输入文章标题" />
    </div>
    <div class="article-tool">
      <el-popover ref="tag" placement="bottom" tigger="click" width="150">
        <ul class="tag-list">
          <li v-for="item in tagList" @click="selectTag(item)">{{item.tagName}}</li>
        </ul>
      </el-popover>
      <el-button v-popover:tag>文章标签</el-button>

      <el-tag
        v-for="tag in selectedTag"
        :key="tag.name"
        :closable="true"
        type="primary"
        :close-transition="false"
        @close="handleClose(tag)"
      >
        {{tag.tagName}}
      </el-tag>


      <div class="action-button">
        <el-button v-if="this.$route.query.id" type="danger" size="small" @click="deleteArticle">删除</el-button>
        <el-button size="small" @click="saveArticle('draft')">保存草稿</el-button>
        <el-button type="primary" size="small" @click="saveArticle('publish')">发布文章</el-button>
      </div>
    </div>
    <textarea id="editor"></textarea>
  </div>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import marked from 'marked';
  import highlight from 'highlight.js'
  import { Message } from 'element-ui';

  export default{
    data(){
      return{
        articleTitle: '',
        tagList: [],
        selectedTag: [],
        content: ''
      }
    },

    mounted: function () {
      let self = this;
      let smde = new SimpleMDE({
        element: document.getElementById('editor'),
        autofocus: true,
        autosave: true,
        previewRender: function(plainText) {
          return marked(plainText,{
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            }
          });
        },
      });
      smde.codemirror.on("change", function(){
        let value = smde.value();
        self.content = value
      });



      let id = this.$route.query.id;
      if (id){
        this.$http.get('/api/articleDetails/'+id)
          .then(
            res => {
              this.articleTitle = res.body.title;
              this.selectedTag.push({tagName: res.body.label});
              smde.value(res.body.content)
            },
            res => {
              console.log(response)
            }
          )
      }  else {

        smde.value("快来开始写博客吧");
      }

    },
    created (){
      this.getLabels();
    },
    methods: {

      selectTag: function (item) {
        this.selectedTag=[];
        this.selectedTag.push(item)
      },
      handleClose: function(tag) {
        this.selectedTag.splice(0, 1);
      },
      saveArticle: function (arstate) {

        let labelName = this.selectedTag.length ?  this.selectedTag[0].tagName : '未分类';
        let info = {
          title: this.articleTitle,
          content: this.content,
          date: new Date(),
          state: arstate,
          label: labelName
        };

        if (this.$route.query.id){
          info._id = this.$route.query.id;
          this.$http.post('/api/updateArticle', info)
            .then(
              res => {
                Message.success('文章发布成功');
                this.$emit('refreshArticle');
              },
              res => {
                Message.error('文章发布失败')
              }
            )
        } else {

          this.$http.post('/api/saveArticle', info)
            .then(
              res => {
                Message.success('文章发布成功');
                this.$emit('refreshArticle');
              },
              res => {
                Message.error('文章发布失败')
              }
            )
        }
      },
      deleteArticle: function () {
        this.$http.post('/api/deleteArticle', {_id: this.$route.query.id})
          .then(
            res => {
              Message.success('文章删除成功');
              this.$emit('refreshArticle');
              this.$router.push('/articleList');
            }
          )
      },
      getLabels: function () {
        this.$http.get('/api/getLabels')
          .then(
            res => {
              this.tagList = res.body;
            },
            res => {
              console.log(res)
            }
          )
      },
    }
  }
</script>

<style lang="less" scoped>
  @import '../styles/simplemde.css';
  .edit-article-page{
    .article-title{
      input{
        display: block;
        width: 100%;
        height: 50px;
        border: 0;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 15px;
        font-size: 16px;
        &:focus{
          outline: 0;
         }
      }
    }
    .article-tool{
      padding: 10px;
      .action-button{
        float: right;
      }
    }
  }
  .tag-list{
    li{
      line-height: 22px;
      cursor: pointer;
      &:hover{
         background: #f1f1f1;
       }
    }
  }
  .el-tag--primary{
    margin-right: 5px;
  }
</style>
