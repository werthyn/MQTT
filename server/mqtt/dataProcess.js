//定义dataPoint
class DataPoint {  
    constructor(data) {  
        this.deviceId = data.deviceId??null;  
        this.timestamp = data.timestamp??null; 
        this.sensors = data.sensors??null;  
        this.status = data.status??null;  
    }  
} 
// DataFormatterA类  
class DataFormatterA {  
    format(rawData) {  
        // 假设rawData已经是正确的格式，直接返回DataPoint对象  
        return new DataPoint(rawData);  
    }  
}  
//假定需要修改格式
class DataFormatterB {  
    format(rawData) {  
        // 假设rawData需要一些转换才能成为DataPoint对象  
        rawData.id =  "id" + rawData.id;
        // ... 其他转换逻辑 ...  
        return new DataPoint(rawData);   
    }  
}  
// DataFormatter工厂函数  
function DataFormatterFactory(className, config) {  
    let FormatterClass;  
    switch (className) {  
        case 'DataFormatterA':  
            FormatterClass = DataFormatterA;  
            break;  
        case 'DataFormatterB':  
            FormatterClass = DataFormatterB;  
            break;  
        default:  
            throw new Error(`Unknown formatter class: ${className}`);  
    }  
    return new FormatterClass();  
}
// DataPipeline类  
class DataPipeline {  
    constructor(handlers) {  
        this.handlers = handlers;  
    }  
    
    process(dataPoint) {  
        // 假设handlers是一个数组，每个handler是一个函数，它对dataPoint进行处理并返回  
        for (const handler of this.handlers) {  
            dataPoint = handler(dataPoint); // 假设handler返回一个更新后的DataPoint或者相同的DataPoint  
        }  
        // 处理完成，返回最终的DataPoint  
        return dataPoint;  
    }  
} 
// DataProcess类  
class DataProcess {  
    constructor() {  
        this.formatters = [];  
        this.pipeline = null;  
    }  
    
    init(config) {  
        this.createFormatters(config.formatters);  
        this.pipeline = new DataPipeline(config.pipeline.handlers); // 假设pipeline.handlers是处理函数数组  
    }  
    
    createFormatters(formatterConfigs) {  
        for (const formatterConfig of formatterConfigs) {  
            const formatter = DataFormatterFactory(formatterConfig.className, formatterConfig.config);  
            this.formatters.push(formatter);  
        }  
    }  
    
    consumeData(rawData) {  
        // 假设rawData是从数据源获取到的原始数据  
        let dataPoint = null;  
        for (const formatter of this.formatters) {  
            dataPoint = formatter.format(rawData); // 尝试使用不同的formatter来格式化数据  
            if (dataPoint) break; // 假设一旦有formatter能格式化数据就停止循环  
        }  
        if (dataPoint) {  
            // 如果有数据点被格式化，就交给pipeline处理  
            dataPoint = this.pipeline.process(dataPoint);  
            // 在这里可以对处理后的dataPoint进行进一步的操作或存储  
        }  
    }  
} 
// 示例用法  
const config = {  
    formatters: [  
      { className: 'DataFormatterA', config: {} },  
      // 如果有需要，可以添加更多formatter配置  
    ],  
    pipeline: {  
      handlers: [  
        (dataPoint) => {  
          // 示例处理函数：简单地记录数据点  
          console.log('Processing data point:', dataPoint);  
          // 假设处理逻辑不涉及数据点的修改，直接返回  
          return dataPoint;  
        },  
        // 可以添加更多处理函数  
      ],  
    },  
  };  
    
  // 假设这是从数据源获取的原始数据  
  const rawData = {  
    "deviceId": "ABC123",  
    "timestamp": "2024-06-13T10:57:29Z",  
    "sensors": [  
      {  
        "name": "temperature",  
        "value": 25.5  
      },  
      {  
        "name": "humidity",  
        "value": 60  
      }  
    ],  
    "status": "ok"  
  };  
    
  // 创建DataConsumer实例  
  const consumer = new DataConsumer();  
    
  // 初始化DataConsumer  
  consumer.init(config);  
    
  // 消费数据  
  consumer.consumeData(rawData);  
    
  // 输出结果将类似于：  
  // Processing data point: DataPoint { deviceId: 'ABC123', timestamp: '2024-06-13T10:57:29Z', sensors: [ [Object], [Object] ], status: 'ok' }

  
  class DataPoint {  
    // ... 省略之前的构造函数 ...  
    
    toString() {  
      return `DataPoint { deviceId: ${this.deviceId}, timestamp: ${this.timestamp}, sensors: ${JSON.stringify(this.sensors)}, status: ${this.status} }`;  
    }  
  }