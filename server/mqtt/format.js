// DecodeJsonMessage类  
class DecodeJsonMessage {  
    constructor(config) {  
        // 将 config 存储为实例属性  
        this.config = config;  
    }  
    format(message) {  
        //将message转化为对象，并筛选需要的属性
        try {  
            const rawData = JSON.parse(message.toString());
            // 假设rawData已经是正确的格式，直接返回DataPoint对象  
            const DataPointClass = this.config.dataPointClass;

            return new DataPointClass(rawData);  
        } catch (error) {  
            // 解析失败 
            console.log(error)
            return;
        }  
    }  
}  

//假定需要修改格式
class DataFormatterB {  
    format(rawData) {  
        // 假设rawData需要一些转换才能成为DataPoint对象  
        // 比如rawData.id转为number等
        return rawData;   
    }  
}  

// DataFormatter工厂函数  
function DataFormatterFactory(className, config) {  
    let FormatterClass;  
    switch (className) {  
        case 'DecodeJsonMessage':  
            FormatterClass = DecodeJsonMessage;  
            break;  
        case 'DataFormatterB':  
            FormatterClass = DataFormatterB;  
            break;  
        default:  
            throw new Error(`Unknown formatter class: ${className}`);  
    }  
    return new FormatterClass(config);  
}

module.exports = DataFormatterFactory;