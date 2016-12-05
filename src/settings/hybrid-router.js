import clientInfo from 'settings/client-info'
import isFunction from 'utilities/is-function'


const renders=clientInfo.renders
const render=clientInfo.render
const hybridRoutes={}

hybridRoutes[renders.androidWebview]={
	root:'root'
}

hybridRoutes[renders.iosWebview]={
	root:'root'
}

hybridRoutes[renders.wechatWebview]={
	root:'/'
}



export default {
    go: (options) => {
    	if(render.isWechatWebview){
    		history.go(-1)
    	}else if(render.isIosWebview || render.isAndroidWebview){
    		window.Native.view.back()
    	}else{
    		console.log('maybe in browser')
    	}
    }
}
