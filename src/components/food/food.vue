<template>
	<div v-show='showFlag' class='food'id='food' >
		<div class="food-content" >
			<div class="image-header">
				<img :src="food.image">
				<div class="back"@click='hide'>
					<i class="icon-arrow_lift"></i>
				</div>				
			</div>
			<div class="content">
			<div class="cartcontrol-wrapper">
				<cartcontrol :food='food'></cartcontrol>
				<div class="buy" v-show='!food.count||food.count===0'@click='addFirst'>加入购物车</div>
			</div>
				<h1 class="title">{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show='food.oldprice'>
						￥{{food.oldPrice}}
					</span>
				</div>				
			</div>
			<split v-show='food.info'></split>
			<div class="info"v-show='food.info'>
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<div class="title">商品评价</div>
				<ratingselect :select-type="selectType" :only-content="onlyContent"
				 :desc="desc" :ratings="food.ratings" :fresh="fresh">
				</ratingselect>
				<!-- 评价-->
				<div class="rating-wrapper">
					<ul v-show="food.ratings&&food.ratings.length">
						<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,
								'icon-thumb_down':rating.rateType===1}">{{rating.text}}</span>
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings||!food.ratings.length">
						暂无评价
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';
	import Vue from 'vue'

	const POSITIVE=0; //好的评价
	const NEGATIVE=1;  //不好的评价
	const ALL=2;		  //所有评价
	// 暴露
	export default{
	//接受good组件中传入的food
		props: {
			food: {
				type:Object
			}
		},
		data() {
			return {
				//以对象的形式传入子组件
				fresh:{fre:true},
				showFlag:false,
				selectType:{type:ALL},
				onlyContent:{content:false},
				desc: {
					all:'全部',
					positive:'推荐',
					negative:'吐槽'					
				}
			}	
		},
		methods: {
			show(){
			this.showFlag=true;
			//初始化数据
			this.selectType.type=ALL;
			this.onlyContent.content=false;
			//滚动
			this.$nextTick(() =>{
				if(!this.scroll){
					this.scroll=new BScroll(document.getElementById('food'),{
  			        click:true
  			});
				}else{
					this.scroll.refresh();
				}
            })       
		},
			//返回
			hide() {
				this.showFlag=false;
			},
			addFirst(event) {
				//防止PC多次点击
				if(event._contructed){
					return;
				}
				/*通过Vue.set添加一个给count属性，这样变化就能被观测到。能检测到dom的变化*/
				Vue.set(this.food,'count',1);
			},
			//需要显示的评论
			needShow(type,text) {
				if(this.onlyContent.content&&!text){
					return false;
				}
				if(this.selectType.type===ALL){
					return true;
				}else{
					return type===this.selectType.type;
				}
			}
		},
		watch:{
			//在页面数据更新之后，监测dom重新计算高度。只要fresh.fre一发生变化，就会执行该函数。
			//这样由于数据的更新页面高度不同，BScroll也能实时的监测到高度
		'fresh.fre':function(){
				this.$nextTick(() =>{
				if(!this.scroll){
					this.scroll=new BScroll(document.getElementById('food'),{
  			        click:true
  		})
				}else{
					this.scroll.refresh();
				}
            })    
        
		}
	},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	}; 
</script >
 
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.food
		position:fixed
		left:0
		top:0
		bottom:48px
		z-index:30
		width:100%
		background:#fff
		.image-header
			position:relative
			width:100%
			height:0
			padding-top:100%
			img
				position:absolute
				top:0
				left:0
				width:100%
				height:100%
			.back
				position:absolute
				top:10px
				left:0
			.icon-arrow_lift
				display:block
				padding:10px
				font-size:20px
				color:#fff
		.content
			position:relative
			padding:18px
			.title
				line-height:14px
				margin-bottom:8px
				font-size:14px
				font-weight:700
				color:rgb(7,17,27)
			.detail
				margin-bottom:18px
				line-height:10px
				height:10px
				font-size:0
				.sell-count,.rating
					color:rgb(147,153,159)
					font-size:10px
				.sell-count
					margin-right:12px
			.price
				font-weight:400
				line-height:24px
				.now
					margin-right:8px
					font-size:14px
					color:rgb(240,20,20)
				.old
					text-decoration:line-through
					font-size:10px
					color:rgb(147,153,159)
		.cartcontrol-wrapper
			position:absolute
			right:12px
			bottom:12px
			width:104px
		.cartcontrol
			position:absolute
			right:12px
			bottom:12px
		.buy
			box-sizing:border-box
			position:absolute
			right:18px
			bottom:18px
			z-index:10
			height:24px
			line-height:24px
			padding:0 12px
			font-size:10px
			border-radius:12px
			color:#fff
			background:rgb(0,160,220)
		.info
			padding:10px
			.title
				line-height:14px
				margin-bottom:6px
				font-size:14px
				color:rgb(7,17,27)
			.text
				line-height:24px
				padding:0 8px
				font-size:12px
				color:rgb(77,85,93)
		.rating
			padding-top:18px
			margin-left:18px
			font-size:14px
			color:rgb(7,17,27)
			.rating-wrapper
				padding:0 18px
				.rating-item
					position:relative
					padding:16px 0
					border-1px(rgba(7,17,27,0.1))
					.user
						position:absolute
						right:0
						top:16px
						line-height:12px
						font-size:0
						.name
							display:inline-block
							vertical-align:top
							font-size:10px
							color:rgb(147,153,159)
							margin-right:6px
						.avater
							border-radius:50%
					.time
						margin-right:6px
						line-height:12px
						font-size:10px
						color:rgb(147,153,159)
					.text
						line-height:16px
						font-size:12px
						color:rgb(7,17,27)
						.icon-thumb_up,.icon-thumb_down
							margin-right:4px
							line-height:16px
							font-size:12px
						.icon-thumb_up
							color:rgb(0,160,220)
						.icon-thumb_down
							color:rgb(147,153,159)
				.no-rating
					padding:16px 0
					font-size:12px
					color:rgb(147,153,159)
							
			
	
</style>