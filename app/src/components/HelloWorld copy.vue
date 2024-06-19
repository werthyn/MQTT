<template>
  <div class="hello">
    <el-row style="margin-bottom: 10px;">
      <el-input
        v-model="msg"
        placeholder="点击获取后端内容"
        clearable
        size="small"
        readonly
        style="width: 194px;margin-right: 20px;"
      />
      <el-button size="small" @click="getMsg" style="margin-right: 2px;">获取信息</el-button>
      <el-button size="small" @click="clear">清除</el-button>
    </el-row>
    <el-row>
      <el-input
        v-model="qmttMsg"
        placeholder="qmtt的消息"
        clearable
        size="small"
        readonly
        style="width: 194px;margin-right: 20px;"
      />
      <el-input
        v-model="qmttStatus"
        placeholder="qmtt的状态"
        clearable
        size="small"
        readonly
        style="width: 194px;margin-right: 20px;"
      />
      <el-button size="small" @click="getQmtt" style="margin-right: 2px;">发布信息</el-button>
      <el-button size="small" @click="clearQmtt">清除信息</el-button>
    </el-row>
  </div>
</template>

<script>
// import * as mqtt from 'mqtt'
import mqtt from 'mqtt'; // 修改导入方式
import { test, testMQTT } from "@/api/test";
export default {
  name: 'HelloWorld',
  data(){
    return {
      client: null,
      msg: "",
      qmttMsg: "",
      qmttStatus: ""
    }
  },
  mounted(){
    this.$mqtt.startMqtt().then(res=>{
      if(res){
        //订阅频道
        this.$mqtt.subscribe('/nodejs/mqtt')
        //监听消息
        this.$mqtt.mqttMessage((topic, message) => {
          console.log("消息主题",topic)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods:{
    // 链接mqtt
    init() {
      console.log('启动了');
      // 连接配置选项
      let options = {
        connectTimeout: 4000, // 超时时间
        // 认证信息
        clientId: "111", //不填默认随机生成一个ID
        username: "admin", //用户名
        password: "1234qwer", //密码
      };
      this.client = mqtt.connect("ws://localhost:8083/mqtt", options); //调用连接的api
      //连接成功
      this.client.on("connect", (e) => {
        console.log("连接成功", e);
        this.subscribe();
      });
      //重连提醒
      this.client.on("reconnect", (error) => {
        console.log("正在重连", error);
      });
      //连接失败提醒
      this.client.on("error", (error) => {
        console.log("连接失败", error);
      });
    },
    end(){
      this.client.end()
      this.client = null
      console.log('已断开连接');
    },
    //订阅一个信息
    subscribe() {
      const topic = '/nodejs/mqtt'
      this.client.subscribe(topic, { qos: 2 }, (err) => {
        if (!err) {
          console.log(`主题为：“${topic}” 的消息订阅成功`)
          this.receive(); // 订阅成功后开始接收消息
        } else {
          console.log('消息订阅失败')
        }
      })
    },
    //接收消息
    receive() {
      this.client.on('message', (topic, message) => {
        console.log(`收到来自：${topic} 的消息：${message}`)
        //报错Invalid prop: type check failed for prop "value". Expected String, Number, got Uint8Array 
        //这个错误是由于 Vue 的属性类型检查导致的。qmttMsg 的类型被推断为 Uint8Array，而 el-input 组件期望的类型是 String 或 Number。
        //为了解决这个问题，您可以在接收到 MQTT 消息时，将 message 转换为字符串类型，然后再赋值给 qmttMsg。可以使用 toString() 方法将 Uint8Array 转换为字符串。
        this.qmttMsg = message.toString();
      })
    },
    getMsg(){
      var params = {
        name:"abc"
      }
      test(params).then(response=>{
          this.msg = response.data
      })
    },
    clear(){
      this.msg = ''
    },
    getQmtt(){
      testMQTT().then(response=>{
          this.qmttStatus = response.data
          return response.data;
      })
    },
    clearQmtt(){
      this.qmttMsg = ''
      this.qmttStatus = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
