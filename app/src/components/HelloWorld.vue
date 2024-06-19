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
    <el-row style="margin-bottom: 10px;">
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
    <el-row style="margin-bottom: 10px;">
      发布：
      <el-button size="small" @click="publish">发布信息</el-button>
    </el-row>
  </div>
</template>

<script>
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
          console.log(message.toString())
          this.qmttMsg = message.toString();
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  destroyed(){
    //断开mqtt
    this.$mqtt.endMqtt();
  },
  methods:{
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
    },
    publish(){
      var topic = '/nodejs/dataConsumer'
      var message = {
        "deviceId": "ABC123",
        "timestamp": "2024-06-13T10:57:29Z",
        "sensors": [
          {
            "name": "temperature",
            "value": 25.5,
            "unit": "°C"
          },
          {
            "name": "humidity",
            "value": 60,
            "unit": "%"
          },
          {
            "name": "pressure",
            "value": 1013.25,
            "unit": "hPa"
          }
          // ... 其他传感器数据
        ],
        "status": "online"
      }
      
      // var qos = 2
      this.$mqtt.publish(topic, message, (error) => {
        if (error) {
          console.error(error)
        }
      }); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
