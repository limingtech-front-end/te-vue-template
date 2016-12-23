import isIos from 'utilities/is-ios'
import isAndroid from 'utilities/is-android'
import isWechatWebView from 'threeparties/wechat/utilities/is-wechat-web-view'

const renders={
	iosWebView:'iosWebView',
	androidWebView:'androidWebView',
	wechatWebView:'wechatWebView',
	browser:'browser'
}

function isIosWebView(){
	return isIos() && !!window.WebViewJavascriptBridge	
}

function isAndroidWebView(){
	return isAndroid() && !!window.WebViewJavascriptBridge	
}

function maybeBrowser(){
	return !isWechatWebView() && !isIosWebView() && !isAndroidWebView()
}

const render={
	isAndroidWebView:isAndroidWebView(),
	isIosWebView:isIosWebView(),
	isNativeWebView:isAndroidWebView() || isIosWebView(),
	isWechatWebView:isWechatWebView(),
	isAndroid:isAndroid(),
	isIos:isIos(),
	isBrowser:maybeBrowser()
}

console.log(render)
export default{
	renders:renders,
	render:render
}
