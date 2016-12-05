<template>
	<section id="peccancy-query-detail">
		<appbar :link="{name:'peccancy-query'}"/>
		<content-with-loading :loaded="loaded">
			<section v-if="peccancies && peccancies.length">
				<h3>
					{{carId}}
				</h3>
				<ul class="summary">
					<li>
						<p>违章（次）</p>
						<p>{{peccanciesCount}}</p>
					</li>
					<li>
						<p>扣分（分）</p>
						<p>{{peccanciesScoreAndMoney.scores}}</p>
					</li>
					<li>
						<p>罚款（元）</p>
						<p>{{peccanciesScoreAndMoney.money}}</p>
					</li>
				</ul>
				<ul class="detail">
					<li v-for="peccancy in peccancies">
						<p><span>违章时间：</span>{{peccancy.date}}</p>
						<p><span>违章地点：</span>{{peccancy.area}}</p>
						<p><span>违章行为：</span>{{peccancy.act}}</p>
						<p><span>违章处理：</span>{{peccancy.fen}}分+{{peccancy.money}}元</p>
					</li>
				</ul>
				<p>信息仅供参考，如有出入，请以交管部门为准。</p>

			</section>
			<section class="query-empty" v-else>
				<img src="../assets/img/peccancy-query-empty.png" alt="no peccancies">
				<p>恭喜您~没有违章记录，继续加油哦！</p>
			</section>
		</content-with-loading>
		 <mu-snackbar v-if="showError" :message="errorMessage" action="关闭" @actionClick="showError=false" @close="showError=false"/>
	</section>
</template>

<script>

	import MuSnackbar from 'muse-components/snackbar'
	import ContentWithLoading from 'components/content-with-loading'
	import Appbar from 'components/appbar'
	import peccancyQuery from 'services/peccancy-query'
	import validate from './peccancy-query-validate'
	import toInteger from '../utilities/to-integer'
	export default {
		components:{
			MuSnackbar,
			Appbar,
			ContentWithLoading
		},
		data(){
			return {
				loaded:false,
				carId:'',
				peccancies:[],
				errorMessage:'',
				showError:false
			}
		},
		computed:{
			peccanciesCount(){
				return this.peccancies.length
			},
			peccanciesScoreAndMoney(){
				var scores=0,money=0
				this.peccancies.map((peccancy)=>{
					scores+=toInteger(peccancy.fen)
					money+=toInteger(peccancy.money)
				})
				return {
					scores:scores,
					money:money
				}
			}
		},
		watch:{
			'$route':function(to,from){
				console.log(to)
				console.log(from)
				if(from.name==='peccancy-query'){
					this.loaded=false
					this.getData()					
				}
			}
		},
		created(){
			this.getData()
		},
		methods:{
			getData(){
				var carId=this.$route.query.carId,
					carCode=this.$route.query.carCode,
					carEngine=this.$route.query.carEngine,
					province=this.$route.query.province,
					city=this.$route.query.city,
					carCodeNeededLength=toInteger(this.$route.carCodeNeededLength),
					carEngineNeededLength=toInteger(this.$route.carEngineNeededLength)
				if(!validate.carIdInvalidMessage(carId) && 
					!validate.carCodeInvalidMessage(carCode,carCodeNeededLength) &&
					!validate.carEngineInvalidMessage(carEngine,carEngineNeededLength) &&
					!validate.addressInvalidMessage(province,city)){
					peccancyQuery.bind(this)({
						carId,
						carCode,
						carEngine,
						province,
						city
					},(peccancies)=>{
						console.log(this.peccancies)
						this.peccancies=peccancies
						this.carId=carId
						this.loaded=true
					},(errorMessage)=>{
						this.errorMessage=errorMessage
						this.showError=true
					})	
				}else{
					this.errorMessage='参数错误'
					this.showError=true
				}
			}
		}
	}
</script>

<style lang="scss">
@import "../settings/variables.scss";
	#peccancy-query-detail{

		.content-with-loading{
			padding:$spaceSmall;
		}
		h3{
			text-align:center;

		}
		.summary{
			border:solid 1px $colorSecondary;
			display:flex;
			justify-content:space-between;
			padding:$spaceSmall;
			border-radius:$borderRadiusMedium;
			li{
				flex:1;
				text-align:center;
				&:nth-of-type(2){
					border:solid 1px $colorLighten;
					border-top:none;
					border-bottom:none;
				}
				p:last-child{
					color:$colorSecondary;
				}
			}
		}
		.detail{
			line-height:$lineHeightMedium;
			li{
				padding:$spaceSmall 0;
				border-bottom:solid 1px $colorLighten;
				&:last-child{
					// border:none;
				}
			}
			p{
				margin:0.5rem 0;
				color:$colorDark;
				span{
					font-weight:bold;
				}
				&:last-child{
					color:$colorSecondary;
					span{
						color:$colorDark;
					}
				}
			}

		}
		.detail	+ p{
				text-align:center;
				font-size:$fontSmall;
				color:$colorSecondary;
				margin-top:$spaceMedium;
			}
		.query-empty{
			img{
				width:55%;
				display:block;
				margin:$spaceBig auto 0;
				position:relative;
				left:-1rem;
			}
			p{
				text-align:center;
				margin-top:-$spaceSmall;
			}
		}

	}

</style>