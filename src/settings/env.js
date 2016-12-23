const ENV={
	isDevelopment:process.env.NODE_ENV==='development',
	isProduction:process.env.NODE_ENV==='production' && !process.env.IS_BUILT_FOR_TEST,
	isTest:process.env.NODE_ENV==='production' && process.env.IS_BUILT_FOR_TEST
}
module.exports=ENV
