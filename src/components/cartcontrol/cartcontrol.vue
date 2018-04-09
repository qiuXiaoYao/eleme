<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"
			@click.stop.prevent="decreaseCart"></div>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue'
	// 暴露
	export default{
		props: {
			food: {
				type:Object
			}
		},
		methods: {
			//添加商品
			addCart(event) {
				if(!event._constructed){
					return        //这样避免点击一下增加两个
				}
				if(!this.food.count){
					/*通过Vue.set添加一个给count属性，这样变化就能被观测到。能检测到dom的变化*/
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
			},
			//减少商品（移除）
			decreaseCart(event) {
				if(!event._constructed){
					return        //这样避免点击一下增加两个
				}
				if(this.food.count){
					this.food.count--;
				}
			},
		}
	}; 
</script >
 
<style lang="stylus" rel="stylesheet/stylus">

	.cartcontrol
		font-size:0    /*由于inline-block会产生间隙*/
		.cart-decrease,.cart-add
			display:inline-block
			padding:6px   /*增加用户的点击区域却不影响样式，增强用户体验*/
			line-height:24px
			font-size:24px
			color:rgb(0,160,220)
		.cart-count
			display:inline-block
			vertical-align:top
			width:12px
			padding-top:6px
			line-height:24px
			text-align:center
			font-size:10px
			color:rgb(147,153,159)
		.cart-add
			display:inline-block

</style>