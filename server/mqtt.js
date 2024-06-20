const mqtt = require('mqtt')
const consumer = require('./mqtt/consumer');  
//mqtt端口号：
// 1883	   MQTT 协议端口
// 8883	   MQTT/SSL 端口
// 8083    MQTT/WebSocket 端口
// 8080    HTTP API 端口
// 18083   Dashboard 管理控制台端口
// 连接选项
const options = {
  clean: true, // true: 清除会话, false: 保留会话
  connectTimeout: 4000, // 超时时间
  // 认证信息
  clientId: 'emqx_test',
  username: 'admin',
  password: '1234qwer'
}
const connectUrl = 'ws://localhost:8083/mqtt'
const client = mqtt.connect(connectUrl, options) //建立连接
const subscribeTopic = '/nodejs/#'
 
client.once('connect', () => {
    console.log('连接成功')
    client.subscribe(subscribeTopic, {qos: 2}, (err) => {
        if (!err) {
            console.log(`已订阅 ${subscribeTopic}`);
        }else{
            console.log(`${subscribeTopic}未能成功订阅`);
        }
    });
})

client.on('reconnect', (error) => {
    console.log('正在重连:', error)
})

client.on('error', (error) => {
    console.log('连接失败:', error)
})

client.on("message", (topic, message) => {
    // // 找到匹配的topic
    // const matchingTopic = mqttTopics.find(v => v.topic === topic);
    // // 检查是否找到了匹配的 topic
    // if (matchingTopic) {
    //     // 调用找到的 topic 的 dataFormat 函数，并传入 message, 转化为对象格式
    //     matchingTopic.dataFormat(message)
    //     //处理数据
    //     .then(data =>{
    //         for (const handler of matchingTopic.pipeline.handlers) {  
    //             data = handler(data).data;
    //             //handler(data).status是是否跳过，查看状态使用
    //         }  
    //         //存入数据库
    //         matchingTopic.pipeline.saveToDatabase(data);
    //     });
    // } else {
    //     // 如果没有找到匹配的 topic，可以打印一条消息或执行其他逻辑
    //     console.log(`没有找到匹配的topic: ${topic}`);
    // }
    try {  
        const rawData = JSON.parse(message.toString());
        consumer.consumeData(rawData); 
    } catch (error) {  
        // 解析失败 
        console.log(error)
    }  
});

module.exports = client