// // muse-ui already imported
// // require('normalize.css')
require('muse-components/styles/base.less')
require('settings/common-styles.scss')
require('settings/icons.scss')

import Vue from 'vue'
import router from 'settings/router'
import VueResource from 'vue-resource'

import clientInfo from 'settings/client-info'
import hybridBridge from 'settings/hybrid-bridge'

Vue.use(VueResource)

function activeApp() {
    new Vue({
        router: router
    }).$mount('#app')
}

if (clientInfo.render.isBrowser) {
    activeApp()
} else {
    hybridBridge().then((bridge) => {
        console.log(bridge)
        activeApp()
    }, (errorMessage) => {
        console.log('error: ', errorMessage)
    })
}
