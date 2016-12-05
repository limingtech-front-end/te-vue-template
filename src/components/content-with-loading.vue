<template>
	<section class="content-with-loading">
		<loading-spin v-if="!loaded"></loading-spin>			
		<transition name="fade">
			<section v-if="loaded" class="content-wrapper">
				<slot>no content</slot>				
			</section>
		</transition>
	</section>
</template>

<script>
	import LoadingSpin from 'components/loading-spin'
	export default {
		components:{
			LoadingSpin
		},
		props:{
			loaded:{
				type:Boolean,
				required:false
			}
		}
	}
</script>