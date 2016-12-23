import Vue from 'vue'
import VueRouter from 'vue-router'
import loginStatus from 'services/login-status'
import hybridRouter from 'settings/hybrid-router'
import clientInfo from 'settings/client-info'
import calcUriParams from 'utilities/calc-uri-params'

Vue.use(VueRouter)


let routes = [{
    path: '/',
    name: 'index',
    component: require('src/App'),
    meta:{
        title:'首页'
    },
    children: [{
        path:'test',
        name:'test',
        component:require('pages/test'),
        meta:{
            title:'test'
        }
    },{
        path: 'peccancy-query',
        name: 'peccancy-query',
        component: require('pages/peccancy-query'),
        meta:{
            title:'违章查询',
            auth:true
        }
    }, {
        path: 'peccancy-query-detail',
        name: 'peccancy-query-detail',
        component: require('pages/peccancy-query-detail'),
        meta:{
            title:'违章结果',
            auth:true
        }
    },{
      path:'car-map',
      name:'car-map',
      component:require('pages/car-map'),
      meta:{
        title:'爱车',
        auth:true
      }
    },{
        path: 'car-list',
        name: 'car-list',
        component: require('pages/car-list'),
        meta:{
          title:'车辆列表',
          auth:true
      }
    },{
        path: 'car-add',
        name: 'car-add',
        component: require('pages/car-add'),
        meta:{
          title:'添加车辆',
          auth:true
        }
    },{
        path: 'car-edit',
        name: 'car-edit',
        component: require('pages/car-edit'),
        meta:{
          title:'编辑车辆',
          auth:true
        }
    },{
        path: 'bind-device',
        name: 'bind-device',
        component: require('pages/bind-device'),
        meta:{
          title:'绑定设备',
          auth:true
        }
    },{
        path: 'car-edit-basic-info',
        name: 'car-edit-basic-info',
        component: require('pages/car-edit-basic-info'),
        meta:{
          title:'基本信息',
          auth:true
        }
    },{
        path: 'maintain-information',
        name: 'maintain-information',
        component: require('pages/maintain-information'),
        meta:{
          title:'保养信息',
          auth:true
        }
    },{
        path: 'insurance-information',
        name: 'insurance-information',
        component: require('pages/insurance-information'),
        meta:{
          title:'保险信息',
          auth:true
        }
    },{
        path: 'mot-information',
        name: 'mot-information',
        component: require('pages/mot-information'),
        meta:{
          title:'年检信息',
          auth:true
        }
    },{
        path: 'map',
        name: 'map',
        component: require('pages/map'),
        meta:{
          title:'ditu',
          auth:true
        }
    },{
      path: 'auto-forum',
      name: 'auto-forum',
      component: require('pages/auto-forum'),
      meta: {
        title: '爱车频道'
      }
    }, {
      path: 'article-show',
      name: 'article-show',
      component: require('pages/article-show'),
      meta: {
        title: '文章内容'
      }
    },{
        path: 'insurance-company',
        name: 'insurance-company',
        component: require('pages/insurance-company'),
        meta:{
          title:'保险公司',
          auth:true
        }        
    }]
}]

let router = new VueRouter({
    // mode:'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !loginStatus.isLogedin()){
    console.log('need login')
    if(clientInfo.render.isNativeWebView || clientInfo.render.isWechatWebView){
        hybridRouter.push({
            name:'login',
            query:to.query
        })
    }
    // next()
  }else{
    next()
  }
})

module.exports = router
