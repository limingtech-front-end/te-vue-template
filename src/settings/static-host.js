var ENV=require('./env')

var 
	proStaticHost='http://www.vfu365.com',
	testStaticHost='http://carowl.cn',
	devStaticHost=testStaticHost

	
module.exports={
	host:ENV.isDevelopment ? '' : ENV.isTest ? testStaticHost : proStaticHost,
	devStaticHost:devStaticHost
}
