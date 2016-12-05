import isString from 'utilities/is-string'
function setTitle(value){
	isString.validate(value)
	document.title=value
}
// export default {
// 	bind(el,binding){
// 		setTitle(binding.value)
// 	},
// 	unbind(el,binding){
// 		setTitle('')
// 	},
// 	execute:setTitle
// }

export default setTitle
