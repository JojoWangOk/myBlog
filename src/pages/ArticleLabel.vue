<template>
  <div class="left-list">
    <el-row :gutter="0">
      <el-col :xs="6" :sm="6" :md="6" :lg="6" class="left-list">
        <h3 class="list-title">标签管理<i class="el-icon-plus" @click="addLabel"></i></h3>
        <ul class="list-box">
          <li v-for="(item,index) in labelList">{{item.tagName}}
            <span>（{{item.tagNumber}}）</span>
            <i class="el-icon-circle-cross" @click="removeLabel(index,item._id)"></i>
          </li>
          <li class="tagName-input" >
            <el-input v-model.trim="tagName" v-show="showInput" placeholder="请输入标签名添加">
            <el-button slot="append" icon="check" @click="saveLabel"></el-button>
           </el-input>
          </li>
        </ul>

      </el-col>
    </el-row>


  </div>
</template>

<script>
  import { Message } from 'element-ui';

  export default{
    data(){
      return {
        tagName: '',
        showInput: false,
        labelList: []
      }
    },
    created (){
      this.getLabels()
    },
    methods: {
      addLabel: function () {
        this.showInput = true;
      },
      getLabels: function () {
        this.$http.get('/api/getLabels')
          .then(
            res => {
              this.labelList = res.body;
            },
            res => {
              console.log(res)
            }
          )
      },
      saveLabel: function () {
        let data = {
          tagName: this.tagName,
          tagNumber: 0
        };
        if (this.tagName) {
          this.$http.post('/api/saveLabels', data)
            .then(
              res => {
                if(res.body.error){
                  Message.error(res.body.msg);
                  return;
                }
                Message.success('标签保存成功');
                this.labelList.push(data);
                this.tagName = ''
              },
              res => Message.error('标签保存失败')
            )
        }
      },
      removeLabel: function (index,id) {
        this.$http.post('/api/deleteLabel', {_id: id})
          .then(
            res => {
              this.labelList.splice(index, 1)
              Message.success('删除标签成功');
            }
          )
      }
    }
  }
</script>
<style lang="less" scoped>
  .left-list {
    height: 100vh;
    border-right: 1px solid #f1f1f1;
    overflow-y: auto;

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
    .list-box{
      padding: 0 10px 50px 10px;
      position: relative;
      li{
        line-height: 50px;
        border-bottom: 1px solid #f1f1f1;
        cursor: pointer;
        color: #20a0ff;
        font-size: 16px;
        padding-left: 5px;

        span{
          color: #cccccc;
          margin-left: 5px;
          font-size: 14px;
        }
        .el-icon-circle-cross{
          float: right;
          margin-top: 18px;
          color: #ccc;
        }
      }
    }
    .tagName-input{
      position: absolute;
      bottom: 0;
      border-bottom: 0;
    }
  }

</style>
