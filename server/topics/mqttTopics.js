let settings = [
    {
        topic : '/nodejs/dataConsumer',
        dataFormat: function(message){
            // 返回一个Promise，该Promise在解析JSON时resolve，或在解析失败时reject  
            return new Promise((resolve, reject) => {  
                try {  
                    const parsedMessage = JSON.parse(message.toString());
                    // 解析成功，resolve Promise  
                    resolve(parsedMessage);  
                } catch (error) {  
                    // 解析失败，reject Promise  
                    reject(error);  
                }  
            });  
        },
        pipeline: {
            //handlers: [ "test","getName" ]
            handlers: [  
                // 处理data，将 deviceId 添加 "id" 的前缀
                (data) => {  
                    let result; 
                    data.deviceId = "id" + data.deviceId
                    result = {  
                        data: data,
                        status: `success` 
                    };  
                    return result;  
                },  
                // sensors内添加id项
                (data) => {  
                    let result; 
                    if(data.sensors&&data.sensors.length>0){
                        data.sensors.forEach((v,index)=>{
                            v.id = index + 1;
                        })
                        result = {  
                            data: data,
                            status: 'success' 
                        };  
                    }else{
                        result = {  
                            data: data,
                            status: `${sensors}被pass` 
                        };  
                    }

                    return result;  
                },  
            ], 
            saveToDatabase(data){
                console.log(data)
            }
        }
    },
]

module.exports = settings;