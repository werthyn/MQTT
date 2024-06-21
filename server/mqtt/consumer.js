const config = require('./config');  
const DataFormatterFactory = require('./format');  
const DataHandlerFactory = require('./handler');  

// DataConsumer类  
class DataConsumer {  
    constructor() {  
        this.formatters = [];  
        this.handlers = [];  
    }  
    
    init(config) {  
        this.createFormatters(config.formatters);  
        this.createHandlers(config.pipeline.handlers);  
    }  
    
    createFormatters(formatterConfigs) {  
        for (const formatterConfig of formatterConfigs) {  
            const formatter = DataFormatterFactory(formatterConfig.className, formatterConfig.config);  
            this.formatters.push(formatter);  
        }  
    }  

    createHandlers(handlerConfigs) {  
        for (const handlerConfig of handlerConfigs) {  
            const handler = DataHandlerFactory(handlerConfig);  
            this.handlers.push(handler);  
        }  
    }  
    
    consumeData(data) {  
        this.format(data)
            .then(formattedData =>{
                return this.process(formattedData);
            })
            .then(processedData => {  
                this.saveToDatabase(processedData); 
            }) 
            .catch(error => {  
                console.error('Error:', error);  
            }); 
    }  

    format(rawData) {  
        return new Promise((resolve, reject) => {
            for (const formatter of this.formatters) {  
                rawData = formatter.format(rawData); // 尝试使用不同的formatter来格式化数据  
                // if (dataPoint) break; // 假设一旦有formatter能格式化数据就停止循环  
            }  
            resolve(rawData)
        })
    }  

    process(rawData) {
        return new Promise((resolve, reject) => {
            for (const handler of this.handlers) {  
                rawData = handler(rawData); 
            }  
            // 处理完成，返回最终的DataPoint  
            resolve(rawData)
        })
    }

    saveToDatabase(rawData){
        console.log("数据库处理的数据:"+JSON.stringify(rawData))
    }
} 
    
// 创建DataConsumer实例  
const consumer = new DataConsumer();  
    
// 初始化DataConsumer  
consumer.init(config);  

module.exports = consumer;
