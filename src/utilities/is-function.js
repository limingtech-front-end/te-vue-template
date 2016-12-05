var isFunction=(value)=>{
	return Object.prototype.toString.call(value)==='[object Function]'
}

isFunction.validate=function(value){
	if(!isFunction(value)) throw new TypeError('@param value must be a function')
}

module.exports=isFunction