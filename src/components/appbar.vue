<template>
	<header :class="['appbar',hide ? 'hide' : '']">
		<mu-appbar v-if="!hide" :title="$route.meta.title">
			<mu-icon-button icon="navigate_before" slot="left" @click="activeLink">
				<router-link :to="link" v-if="link">
					<i aria-hidden="true" class="mu-icon material-icons navigate_before" style="font-size: 24px; width: 24px; height: 24px;">navigate_before</i>
				</router-link>
			</mu-icon-button>				
		</mu-appbar>			
	</header>
</template>

<script>
	import MuIconButton from 'muse-components/iconButton'
	import MuAppbar from 'muse-components/appbar'
	import hybridRouter from 'settings/hybrid-router'
	import clientInfo from 'settings/client-info'
	export default {
		components:{
			MuAppbar,
			MuIconButton
		},
		props:{
			// title:{
			// 	type:String,
			// 	required:true
			// },
			link:{
				required:false
			}
		},
		data(){
			return {
				hide:false
			}
		},
		created(){
			if(clientInfo.render.isWechatWebview){
				this.hide=true
			}
			// console.log(this)
		},
		methods:{
			activeLink(){
				if(!this.link){
					hybridRouter.go()
				}else{
					console.log('go to link')
				}
			}
		}
	}
</script>

<style lang="scss">
@import "../settings/variables.scss";
.appbar{
	&.hide{
		display:none;
	}
	&:not(.hide){
		position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    z-index: 10;
		+ *:not(.loading-spin){
			margin-top:56px;
		}
		.mu-appbar{
			  .mu-flat-button{
				  color:$colorDark!important;
			  }
			  .mu-appbar-title{
			      text-align: center;
			      text-indent: -48px;
			  }
		}
		a{
			line-height:56px;
			height: 100%;
		    width: 100%;
		    position: absolute;
		    top: 0;
		    left: 0;
		    overflow: hidden;
		}
	}
}

</style>