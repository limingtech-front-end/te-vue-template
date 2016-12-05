import isIos from 'utilities/is-ios'
import isAndroid from 'utilities/is-android'
import isWechatWebview from 'utilities/is-wechat-webview'

const renders={
	iosWebview:'iosWebview',
	androidWebview:'androidWebview',
	wechatWebview:'wechatWebview',
	browser:'browser'
}

function isIosWebview(){
	return isIos() && !!window.Native	
}

function isAndroidWebview(){
	return isAndroid() && !!window.Native	
}

function maybeBrowser(){
	return !isWechatWebview() && !isIosWebview() && !isAndroidWebview()
}

const render={
	isAndroidWebview:isAndroidWebview(),
	isIosWebview:isIosWebview(),
	isWechatWebview:isWechatWebview(),
	isBrowser:maybeBrowser()
}

console.log(render)
export default{
	renders:renders,
	render:render
}
