<template>
	<transition :name="transitionName">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</transition>
</template>

<script>
import setTitle from 'directives/set-document-title'
	export default {
		data(){
			return {
				histories:[],
				transitionName:''
			}
		},
		watch:{
			$route:{
				immediate:true,
				handler:function(to,from){
					if(this.histories.length>1 && to.name===this.histories[this.histories.length-2]){
						console.log('back to old page')
						this.transitionName='slide-right'
						this.histories.pop()
					}else{
						console.log('to new page')
						this.transitionName='slide-left'
						this.histories.push(to.name)
					}
					console.log(this.histories)
					setTitle(to.meta.title)
				}
			}
		}
	}
</script>