var routes = [{
    path: '/',
    name: 'index',
    component: require('src/App'),
    meta:{
        title:'首页'
    },
    children: [{
        path: 'peccancy-query',
        name: 'peccancy-query',
        component: require('pages/peccancy-query'),
        meta:{
            title:'违章查询'
        }
    }, {
        path: 'peccancy-query-detail',
        name: 'peccancy-query-detail',
        component: require('pages/peccancy-query-detail'),
        meta:{
            title:'违章结果'
        }
    },{
        path: 'car-information',
        name: 'car-information',
        component: require('pages/car-information'),
        meta:{
          title:'添加车辆'
        }
      }]
}]

module.exports = routes
