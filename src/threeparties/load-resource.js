import isString from 'utilities/is-string'
export default {
	js:(url)=>{
		isString.validate(url)
		
	},
	css:(url)=>{
		isString.validate(url)
	}
}