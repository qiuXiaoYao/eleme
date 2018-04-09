<template>
	<div>
		<v-header v-bind:seller="seller"></v-header>
		<div class="tab border-1px">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>

		</div>

		    <router-view :seller="seller"></router-view> 
	</div>
</template>

<script type="text/ecmascript-6">
	// 引入header.vue
	import header from './components/header/header.vue';

	
	const ERR_OK=0;
	// 注册header
	export default{
		data() {
			return {
				seller: {}
			};
		},
		//请求数据
		created() {
			this.$http.get('/api/seller').then((response) => {
				response=response.body;
				//console.log(response);
				if(response.errno==ERR_OK){
					this.seller=response.data;
					console.log(this.seller);
					//获得数据，在控制台输出.将seller对象传给header组件（）
				}
			});
		},
		components: {
			'v-header':header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "./common/stylus/mixin.styl"
	/*弹性布局*/ 
	.tab
		display: flex
		width: 100%
		height: 40px
		line-height: 40px
		.tab-item
			flex: 1
			text-align: center
			border-1px(rgba(7,17,27,0.1))
			& > a
				display:block
				font-size:14px
				color:rgb(77,85,93)
				&.active
					color:red

</style>
