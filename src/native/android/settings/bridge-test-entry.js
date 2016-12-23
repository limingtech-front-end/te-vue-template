import bridge from './bridge'

bridge().then((bridge)=>{
    alert('start calling native method:submitFromWeb')
    bridge.callHandler('submitFromWeb', { 'param': '中文测试' },
        function(responseData) {
            alert('data getted from android: '+(typeof responseData=='object' ? JSON.stringify(responseData) : responseData))
        }
    )
    // bridge.registerHandler("functionInJs", function(data, responseCallback) {
    //     alert('data getted from android: '+(typeof data=='object' ? JSON.stringify(data) : data))
    //     var responseData = "Javascript Says Right back aka!"
    //     responseCallback(responseData);
    // })    
},(err)=>{
    alert(err)
})
