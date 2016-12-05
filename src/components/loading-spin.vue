<template>
	<section class="loading-spin">
	 	<mu-circular-progress v-if="!loaded" :size="40"/>
		<!-- <mu-icon value="filter_tilt_shift" :size="48"/> -->
	</section>
</template>

<script>
	// import MuIcon from 'muse-components/icon'
	import MuCircularProgress from 'muse-components/circularProgress'
	export default{
		components:{
			MuCircularProgress
			// MuIcon
		}
	}
</script>

<style lang="scss">
@import "../settings/variables.scss";
	.loading-spin{
		position:absolute;
		width:48px;
		height:48px;
		left:0;
		right:0;
		top:0;
		bottom:0;
		margin:auto;
		color:$colorSecondary;
		.mu-circle-spinner{
			border-color:$colorSecondary;			
		}
		// .mu-icon{
		// 	display:block;
		// 	@include animationRotate;
		// }
	}
</style>