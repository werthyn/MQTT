// MQTT配置  
const config = {  
    formatters: [  
      { className: 'DataFormatterA', config: {} },  
      // 如果有需要，可以添加更多formatter配置  
    ],  
    pipeline: {  
        handlers: [  
            (dataPoint) => {  
                // 示例处理函数：简单地记录数据点  
                dataPoint.id =  "id" + dataPoint.id;
                // 假设处理逻辑不涉及数据点的修改，直接返回  
                return dataPoint;  
            },  
            // 可以添加更多处理函数  
        ],  
    },  
}; 
module.exports = config;