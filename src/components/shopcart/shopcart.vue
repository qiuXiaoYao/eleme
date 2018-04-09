<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<!--当totalCount>0的时候就会加上类hightLight-->
					<div class="logo" :class="{'hightLight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></i>
					</div>
					<!--v-show里面可以放表达式，当totalCount>0的时候，购物车显示数量的图标才会显示-->
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'hightLight':totalCount>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送配费用￥{{deliveryPrice}}元</div>
			</div>
			<!--@click.stop.prevent 阻止冒泡-->
			<div class="content-right" @click.stop.prevent="pay">
				<!--绑定计算属性中的payClass方法,在不同条件下添加不同的类，显示不同的样式-->
				<div class="pay" :class="payClass">
					<!--绑定计算属性中的payDesc方法-->
					{{payDesc}}
				</div>
			</div>
		</div>
		
		<div class="shopcart-list" v-show="listShow">
			<div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="list-content" ref="listContent">
				<ul>
					<li class="food" v-for="food in selectFoods">
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>￥{{food.price*food.count}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food="food"></cartcontrol>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="list-mask" v-show="listShow" @click="hide"></div>
	</div>
</template>
	
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol';
	// 暴露
	export default{
		//对父组件good传来的数据进行接收
		props:{
			selectFoods:{
				type:Array,  //type是Array或者Object，default就是一个函数
				default() {
					return [
						{
							price:18,
							count:0
						}
					];
				}
			},
			deliveryPrice:{	//接收属性的时候要指定类型（编程习惯）
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				fold:true
			}			
		},
		//计算属性
		computed: {
			//计算总价
			totalPrice() {
				let total=0;
				this.selectFoods.forEach((food) => {
					total += food.price*food.count;
				});
				return total;
			},
			//计算选中东西的数量
			totalCount() {
				let count=0;
				this.selectFoods.forEach((food) => {
					count+=food.count;
				});
				return count;
			},
			//当满足条件的时候去结算
			payDesc() {
				if(this.totalPrice===0){
					return `￥${this.minPrice}起送`;
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice-this.totalPrice;
					return `还差￥${diff}元起送`
				}else{
					return '去结算';
				}
			},
			//当钱足够的时候就显示去结算
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else if(this.totalPrice>=this.minPrice){
					return 'enough';
				}
			},
	//购物清单，在没有点击购物车时都是隐藏的状态。当有选中的商品时，点击购物车，能够显示或隐藏购物清单
			listShow(){
				//如果没有购买商品，totalCount=0的时候，fold=true即折叠状态
				if(!this.totalCount) {
					this.fold=true;
					return false;			
				}
				let show=!this.fold;
				
				//购物车清单当超出最大高度可以滚动
				if(show){
					this.$nextTick(() =>{
						if(!this.scroll){
							this.scroll=new BScroll(this.$refs.listContent,{
								click:true    //这样购物清单里面的按钮也可以点击了
							});		
						}else{
							this.scroll.refresh();
						}
						
					});
				}
				return show;			
			}
			
		},
		methods: {
			//当有选中的商品时，点击购物车，能够显示或隐藏购物清单
			toggleList() {
				if(!this.totalCount){
					return
				}
				this.fold=!this.fold;
			},
			hide (){
				this.fold=true
			},
			//清空购物车，遍历food,让每一个food的count都为0
			empty() {
				this.selectFoods.forEach((food)=>{
					food.count=0;
				})
			},
			//支付按钮
			pay() {
				if(this.totalPrice<this.minPrice){
					return;
				}
				window.alert(`支付${this.totalPrice}元`)
			}
		},
		//注册组件
		components: {
			cartcontrol
		}
	}
</script >
 
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.shopcart
		position:fixed
		left:0
		bottom:0
		z-index:50
		width:100%
		height:48px
		.content
			display:flex
			background:#141d27
			color:rgba(255,255,255,0.4)	
			font-size:0      	/*inline-block可能会产生缝隙，给父级加font-size:0*/
			.content-left
				flex:1
				.logo-wrapper
					display:inline-block
					vertical-align:top
					position:relative
					top:-10px
					margin:0 12px
					padding:6px
					width:56px
					height:56px
					box-sizing:border-box
					border-radius:50%
					background:#141d27
					.logo
						width:100%
						height:100%
						border-radius:50%
						text-align:center
						background:#2b343c
						&.hightLight
							background:rgb(0,160,220)
						.icon-shopping_cart
							line-height:44px
							font-size:24px
							color:#80858a
							&.hightLight
								color:#fff
					.num
						position:absolute
						top:0
						right:0
						width:24px
						height:16px
						line-height:16px
						text-align:center
						border-radius:16px
						font-size:9px
						font-weight:700
						color:#fff
						background:rgb(240,20,20)
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
				.price
					display:inline-block
					vertical-align:top
					margin-top:12px
					font-size:16px
					font-weight:700
					line-height:24px
					padding-right:12px
					box-sizing:border-box
					border-right:1px solid rgba(255,255,255,0.1)
					&.hightLight
						color:#fff
				.desc
					display:inline-block
					vertical-align:top		
					line-height:48px
					font-size:10px
					margin-left:4px
			.content-right
				flex:0 0 105px
				width:105px
				.pay
					height:48px
					line-height:48px
					text-align:center
					font-size:12px
					font-weight:700
					background:#2b333b
					&.not-enough
						background:#2b333b
					&.enough
						background:#00b43c
						color:#fff
		.shopcart-list
			position:absolute
			bottom:100%
			left:0
			z-index:-1
			width:100%
			.list-header
				height:40px
				line-height:40px
				padding:0 18px
				background:#f3f5f7
				border-bottom:1px solid rgba(7,17,27,0.1)
				.title
					float:left
					font-size:14px
					color:rgb(7,17,27)
				.empty
					float:right
					font-size:12px
					color:rgb(0,160,220)
			.list-content
				padding:0 18px
				max-height:217px
				overflow:hidden
				background:#fff
				.food
					position:relative
					padding:12px 0
					box-sizing:border-box
					border-1px(rgba(7,17,27,0.1))
					.name
						line-height:24px
						font-size:14px
						color:rgb(7,17,27)
					.price
						position:absolute
						right:90px
						bottom:12px
						font-size:14px
						line-height:24px
						font-weight:700
						color:rgb(240,20,20)
					.cartcontrol-wrapper
						position:absolute
						right:-7px
						bottom:-6px
	.list-mask
		position:fixed
		top:0
		left:0
		width:100%
		height:100%
		z-index:-2
		background:rgba(0,0,0,0.7)
		backdrop-filter:blur(10px)
				
		
</style>