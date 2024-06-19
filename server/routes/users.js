var express = require('express');
var router = express.Router();
const client = require('../mqtt')

const topic = '/nodejs/mqtt'
// const payload = 'nodejs mqtt test'
const qos = 2

/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/testMQTT', function(req, res, next) {
    // 每隔2秒发送一条消息  
    let count = 0;
    const intervalId = setInterval(() => {  
      count++;
      const message = `${count}`; // 将计数器转换为字符串并发送  
      client.publish(topic, message, { qos }, (error) => {
        if (error) {
          console.error(error)
        }
      });  
      console.log(`Published message: ${message}`);  
      // 如果你想要在某个时间点停止发送消息，你可以调用 clearInterval  
      // 例如，发送 10 条消息后停止  
      if (count == 10) {  
        clearInterval(intervalId);  
        console.log('Stopped sending messages');  
        res.end('msg has send');
      } 
    }, 1000); // 2000 毫秒 = 2 秒  
});

module.exports = router;
