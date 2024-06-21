function handlerA(rawData) {
    if(rawData.value){
        rawData.value =  rawData.value;
    } else{
        rawData.value = 0
    }
    return rawData; 
}  

function handlerB(rawData) {
    console.log("需要完善")
    // 假设rawData已经是正确的格式，直接返回DataPoint对象  
    return rawData; 
}  

// DataHandlerFactory工厂函数  
function DataHandlerFactory(handlerName) {  
    let handlerFunction;  
    switch (handlerName) { 
        case 'handlerA':  
            handlerFunction = handlerA;  
            break;  
        case 'handlerB':  
            handlerFunction = handlerB;  
            break;  
        default:  
            throw new Error(`Unknown formatter class: ${handlerName}`);  
    }  
    return handlerFunction;  
}

module.exports = DataHandlerFactory;