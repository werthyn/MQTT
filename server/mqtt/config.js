// MQTT配置  

//定义dataPoint属性
class DataPoint {  
    constructor(data) {  
        this.deviceId = data.deviceId??null;  
        this.timestamp = data.timestamp??null; 
        this.value = data.value??null;  
        this.unit = data.unit??null;  
    }
} 

const config = {  
    formatters: [  
        { 
            className: 'DecodeJsonMessage', 
            config: {
                dataPointClass: DataPoint,
            } 
        },  
      // 如果有需要，可以添加更多formatter配置  
    ],  
    pipeline: {  
        handlers: [ "handlerA", ],  
    },  
}; 
module.exports = config;