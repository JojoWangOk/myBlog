<template>
  <div class="preview-page">
    <transition name="fade" mode="out-in">
      <div v-for="item in content" v-if="content.length>0">
        <div class="article-title">{{item.title}}</div>
        <div style="color:#34495e" v-compiledMarkdown>{{item.content}}</div>
        <div class="edit-box">
          <el-button type="primary" icon="edit" @click="goEdit(item._id)">不满意，点此修改</el-button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import marked from 'marked';
  import highlight from 'highlight.js'

  export default{
    data (){
      return{
        content: []
      }
    },
    created (){
      this.getArticle();
    },
    mounted: function(){
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });
    },
    methods: {
      getArticle: function () {
        let id = this.$route.params.id;
        this.content = [];
        this.$http.get('/api/articleDetails/'+id)
          .then(
            res => {
              this.content.push(res.body)
            },
            res => {
              console.log(response)
            }
          )
      },
      goEdit: function (id) {
        this.$router.push({path: '/articleList/articleEdit', query: {id: id}})
      }
    },
    directives: {
      compiledMarkdown: {
        bind: function(el){
          el.innerHTML = marked(el.innerText)
        }
      }
    },
    watch: {
      '$route': 'getArticle'
    },
  }
</script>
<style scoped>
  @import '../styles/simplemde.css';

  .preview-page{
    padding: 20px;
  }
  .article-title{
    font-size: 20px;
    border-left: 3px #a0a0a1 solid;
    padding-left: 10px;
    color: #2c3e50;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .edit-box{
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
</style>
