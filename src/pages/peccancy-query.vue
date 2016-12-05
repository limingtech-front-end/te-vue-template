<template>
	<section id="peccancy-query">
		<!-- <appbar :link="{name:'index'}"> -->
		<appbar/>
		<content-with-loading :loaded="loaded">
			<section class="input-wrapper">
				<mu-text-field :class="[hasFocus ? 'focus-state' : '','false-input']" label="城市" hintText="请选择车牌号" :errorText="selectedAddressError" :value="selectedAddress" @focus="activeAddressPicker($event)" @blur="addressIsInvalid" labelFloat fullWidth/>
				<mu-text-field label="车牌号" hintText="请输入车牌号（如：吉AUN110）" :errorText="carIdError" v-model="carId" @focus="carIdError=''" @blur="carIdIsInvalid" labelFloat fullWidth/>
				<mu-text-field :label="carCodeLabel" :hintText="carCodeHintText" :errorText="carCodeError" v-model="carCode" @focus="carCodeError=''" @blur="carCodeIsInvalid" labelFloat fullWidth/>
				<mu-text-field :label="carEngineLabel" :hintText="carEngineHintText" :errorText="carEngineError" v-model="carEngine" @focus="carEngineError=''" @blur="carEngineIsInvalid" labelFloat fullWidth/>			
			</section>
			<mu-popup position="bottom" class="popup-bottom" popupClass="popup-bottom" :open="popupOpened" @close="closePicker">
			    <mu-appbar title="选择城市">
			      <mu-flat-button slot="right" label="关闭" color="white" @click="closePicker"/>
			    </mu-appbar>
				<section class="picker-container">
					 <mu-picker v-if="addressSlots.length" :slots="addressSlots" :visible-item-count="5" @change="addressChange" :values="[selectedProvince,selectedCity]"/>
				</section>
			 </mu-popup>
			<mu-raised-button label="立即查询" class="submit" @click="submit" secondary fullWidth/>			
		</content-with-loading>
		 <mu-snackbar v-if="showError" :message="errorMessage" action="关闭" @actionClick="showError=false" @close="showError=false"/>

	</section>
</template>

<script>
	import MuSnackbar from 'muse-components/snackbar'
	import MuAppbar from 'muse-components/appbar'
	import MuFlatButton from 'muse-components/flatButton'
	import MuPopup from 'muse-components/popup'
	import MuRaisedButton from 'muse-components/raisedButton'
	import MuTextField from 'muse-components/textField'
	import MuPicker from 'muse-components/picker'

	import Appbar from 'components/appbar'
	import ContentWithLoading from 'components/content-with-loading'
	import queryAddress from 'services/peccancy-query-cities'
	import validate from './peccancy-query-validate'

	export default {
	    components: { 
	    	Appbar,
	    	ContentWithLoading,
	    	MuSnackbar,
	    	MuAppbar,
	    	MuFlatButton,
	    	MuPopup,
	    	MuRaisedButton,
	    	MuTextField,
	    	MuPicker 
	    },
	    data() {
	       return {
	       		loaded:false,
	       		initProvince:'',
	       		initCity:'',
	       		selectedProvince: '',
	            selectedCity: '',
	       		selectedAddressError:'',
	            carId:'',
	            carCode:'',
	            carEngine:'',
	            carIdError:'',
	            carCodeError:'',
	            carEngineError:'',  
	            address: [],         
	            addressSlots: [],
	            popupOpened:false,
	            showError:false,
	            errorMessage:'',
	            hasFocus:false
	        }
	    },
	    computed:{
	    	selectedProvinceCode(){
	    		return this.address[this.selectedProvince].code
	    	},
	    	selectedCityCode(){
	    		return this.address[this.selectedProvince].cities[this.selectedCity].code
	    	},
	    	selectedAddress(){
	    		if(this.selectedProvince && this.selectedCity){
	    			return this.selectedProvince+' '+this.selectedCity
	    		}else{
	    			return ''
	    		}
	    	},
	    	carCodeNeededLength(){
	    		if(this.selectedProvince && this.selectedCity){
	    			return this.address[this.selectedProvince].cities[this.selectedCity].carCodeNeededLength	    			
	    		}
	    	},
	    	carEngineNeededLength(){
	    		if(this.selectedProvince && this.selectedCity){
	    			return this.address[this.selectedProvince].cities[this.selectedCity].carEngineNeededLength	    			
	    		}
	    	},
	    	carCodeLabel(){
	    		return '车架号'+ (!this.carCodeNeededLength ? '（选填）': '')
	    	},
	    	carCodeHintText(){
	    		if(!!this.carCodeNeededLength && this.carCodeNeededLength!==Infinity){
	    			return '请输入车架号后'+this.carCodeNeededLength+'位'
	    		}else{
	    			return '请输入车架号'
	    		}
	    		// return validate.carCodeInvalidMessage('',Infinity)
	    	},
	    	carEngineLabel(){
				return '发动机号'+ (!this.carEngineNeededLength ? '（选填）': '')
	    	},
	    	carEngineHintText(){
	    		if(!!this.carEngineNeededLength && this.carEngineNeededLength!==Infinity){
	    			return '请输入发动机号后'+this.carEngineNeededLength+'位'
	    		}else{
	    			return '请输入发动机号'
	    		}
	    		// return validate.carEngineInvalidMessage('',Infinity)
	    	}
	    },
	    created(){
	    	queryAddress.bind(this)((address)=>{
		    	var initProvinces=Object.keys(address),
		    		initCities=Object.keys(address[Object.keys(address)[0]].cities)
		    	this.initProvince=initProvinces[0]
		    	this.initCity=initCities[0]
		    	this.address=address
				this.addressSlots=[{
	                width: '100%',
	                textAlign: 'right',
	                values: initProvinces
	            }, {
	                width: '100%',
	                textAlign: 'left',
	                values: initCities
	            }]
	            this.loaded=true
	            // this.selectedProvince=initProvince
	            // this.selectedCity=initCity

	    	},(errorMessage)=>{
	    		this.errorMessage=errorMessage
	    		this.showError=true
	    	})
	    },
	    methods: {
	    	addressIsInvalid(){
	    		return this.selectedAddressError=validate.addressInvalidMessage(this.selectedProvince,this.selectedCity)
	    	},
	    	carIdIsInvalid(){
	    		return this.carIdError=validate.carIdInvalidMessage(this.carId)
	    	},
	    	carCodeIsInvalid(){
	    		return this.carCodeError=validate.carCodeInvalidMessage(this.carCode,this.carCodeNeededLength)
	    	},
	    	carEngineIsInvalid(){
	    		return this.carEngineError=validate.carEngineInvalidMessage(this.carEngine,this.carEngineNeededLength)
	    	},
	    	submit(){
	    		if(!this.addressIsInvalid() && !this.carIdIsInvalid() && !this.carCodeIsInvalid() && !this.carEngineIsInvalid()){
	    			this.$router.push({name:'peccancy-query-detail',query:{
	    				carId:this.carId,
	    				carCode:this.carCode,
	    				carEngine:this.carEngine,
	    				province:this.selectedProvinceCode,
	    				city:this.selectedCityCode,
	    				carCodeNeededLength:this.carCodeNeededLength,
	    				carEngineNeededLength:this.carEngineNeededLength
	    			}})
	    		}else{
	    			console.log('invalid input value')
	    		}
	    	},
	    	activeAddressPicker(event){
	    		event.target.blur()
	    		this.hasFocus=true
	    		this.selectedAddressError=''
	    		this.selectedProvince=this.selectedProvince || this.initProvince
	    		this.selectedCity=this.selectedCity || this.initCity
	    		this.popupOpened=true
	    	},
	    	closePicker(){
	    		this.popupOpened=false
	    		this.hasFocus=false
	    	},
	        addressChange(value, index) {
	            switch (index) {
	                case 0:
	                    this.selectedProvince = value
	                    const arr = Object.keys(this.address[value].cities)
	                    this.addressSlots[1].values = arr
	                    this.selectedCity = arr[0]
	                    break
	                case 1:
	                    this.selectedCity = value
	                    break
	            }
	            if(this.carCodeError || this.carEngineError){
	            	this.carCodeIsInvalid()
	            	this.carEngineIsInvalid()
	            }
	        }
	    }
	}
</script>

<style lang="scss">
@import "../settings/variables.scss";
	#peccancy-query{
		.input-wrapper{
			padding-top:$spaceMedium;
			.mu-text-field{
				padding:0 $spaceSmall;
				&.has-label .mu-text-field-label.float{
					color:$colorDark;
				}
				&.focus-state{
					color:$colorSecondary;
				}
				.mu-text-field-help{
					padding:0 $spaceSmall;
				}
				.mu-text-field-focus-line{
					background-color:$colorSecondary;
				}
				
			}
			.mu-text-field.false-input.focus-state .mu-text-field-focus-line{
					transform:scaleX(1);
			}
		}

		.submit{
			display:block;
			max-width:$fullSize;
			margin:0 auto;
			margin-top:$spaceBig;
			&.mu-raised-button-secondary{
				background-color:$colorSecondary;
			}
		}

	}
</style>

