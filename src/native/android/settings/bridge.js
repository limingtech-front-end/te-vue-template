let androidBridge = null

function initAndroidWebView() {
    function connectWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function() {
                    callback(WebViewJavascriptBridge)
                },
                false
            )
        }
    }
    return new Promise((resolve, reject) => {
        window.onerror = function(err) {
            reject && reject(err)
        }
        connectWebViewJavascriptBridge(function(bridge) {
        	alert('connected')
            androidBridge = bridge
            console.log('android bridge inited')
            resolve && resolve(androidBridge)
        })
    })

}


export default function() {
    if (androidBridge) {
        console.log('android bridge cached')
        return Promise.resolve(androidBridge)
    } else {
        return initAndroidWebView()
    }
}
