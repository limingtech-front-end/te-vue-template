import calcMethod from 'utilities/calc-method'
import iosBridge from 'native/ios/settings/bridge'
import androidBridge from 'native/android/settings/bridge'
import wechatBridge from 'threeparties/wechat/settings/bridge'



export default calcMethod({
	ios:iosBridge,
	android:androidBridge,
	wechat:wechatBridge
})