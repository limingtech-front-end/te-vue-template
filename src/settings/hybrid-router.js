import calcMethod from 'utilities/calc-method'
import iosRouter from 'native/ios/settings/router'
import androidRouter from 'native/android/settings/router'
import wechatRouter from 'threeparties/wechat/settings/router'




export default calcMethod({
	ios:iosRouter,
	android:androidRouter,
	wechat:wechatRouter
})
