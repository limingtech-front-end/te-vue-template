var ENV=require('./env')

var proApiHost='http://www.vfu365.com',
	testApiHost='http://carowl.cn',
	devApiHost=testApiHost
module.exports={
	host:ENV.isDevelopment ? '' : ENV.isTest ? testApiHost : proApiHost,
	devProxyHost:devApiHost
}
