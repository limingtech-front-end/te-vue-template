import bridge from './bridge'

bridge().then((bridge)=>{
	alert('start calling native method: testObjcCallback')
	bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {
		alert('data getted from ios: '+(typeof response=='object' ? JSON.stringify(response) : response))
	})
	bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
		alert('data gettef from ios: '+(typeof data=='object' ? JSON.stringify(data) : data))
		var responseData = { 'Javascript Says':'Right back atcha!' }
		responseCallback(responseData)
	})
},(err)=>{

})