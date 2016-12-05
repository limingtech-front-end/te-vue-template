

	var Vue = require('vue'),
	    VueRouter = require('vue-router'),
	    VueResource=require('vue-resource'),
	    routes = require('settings/routes')

	// // muse-ui already imported
	// // require('normalize.css')
	require('muse-components/styles/base.less')
	require('settings/common-styles.scss')
	require('settings/icons.scss')

	Vue.use(VueResource)
	Vue.use(VueRouter)
	new Vue({
	    router: new VueRouter({
	    	routes:routes
	    })
	}).$mount('#app')

