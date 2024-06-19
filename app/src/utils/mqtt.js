import mqtt from "mqtt";
import moment from'moment';
let client = {};
export default {
  // 通过mqtt建立连接，执行一次即可，如：在created里面创建连接startMqtt，然后在destroyed中断开连接endMqtt.
  startMqtt() {
    return new Promise((resove, reject) => {
      // client = mqtt.connect("ws://192.168.1.119:8083/mqtt", {
      client = mqtt.connect("ws://localhost:8083/mqtt", {
        clientId: "mqttjs_" + moment().format('x'),
        username: "admin", 
        password: "1234qwer", 
        // port: 9001
      });
      client.on("connect", function(e) {
        console.log("mqtt连接成功!", e);
        resove(true);
      });
      client.on("error", function(e) {
        console.log("mqtt连接错误!", e);
        reject('mqtt连接失败');
      });
    });
  },
  // 断开连接
  endMqtt() {
    console.log("mqtt断开连接!");
    client.end();
  },
  // 监听传递数据 callback是一个回调函数
  mqttMessage(callback) {
    client.on("message", (topic, message) => {
      callback(topic, message);
    });
  },
  // 订阅主题-主题的路径由后台给，订阅了主题后就可以在mqttMessage中接受到传递的信息
  subscribe(topic) {
    console.log("mqtt订阅了(" + topic + ")主题");
    client.subscribe(topic);
  },
  // 广播内容，广播是将需要传递的消息通知到后台。
  publish(topic, message) {
    console.log(
      "mqtt给(" + topic + ")主题，广播了" + JSON.stringify(message) + "信息"
    );
    client.publish(topic, JSON.stringify(message));
  }
};
