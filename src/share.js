import Vue from 'vue'
import ShareScanCode from 'components/share-scan-code'

new Vue({
	el:'#app',
	components:{
		ShareScanCode
	},
	template:`<section><share-scan-code :contents="content" :img="img" :imgTitle="imgTitle"/><share-scan-code :contents="content2" :img="img" :imgTitle="imgTitle2"/></section>`,
	data(){
		return {
			content:[
				{title:'店名',text:'测试店铺名称'},
				{title:'地址',text:'测试店铺地址测试店铺地址测试店铺地址测试店铺地址测试店铺地址测试店铺地址'},
				{title:'电话',text:'0371-1111111'}
			],
			img:'https://ss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/cache/static/protocol/https/home/img/qrcode/zbios_x2_9d645d9.png',
			imgTitle:'扫码下载APP',
			content2:[
				{title:'公众号',text:'测试公众号'},
				{title:'ID号',text:'测试ID号'}
			],
			imgTitle2:'长按关注我'
		}
	}
})