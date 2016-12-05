export default {
	success(success,fail){
		return (response)=>{
			var data=JSON.parse(response.data)
			if(data.errorInfo){
				fail && fail(data.errorInfo)
			}else{
				success && success(data)
			}			
		}
	},
	fail(fail){
		return (response)=>{
			fail && fail(response.errorInfo || '未知错误')			
		}
	}
}