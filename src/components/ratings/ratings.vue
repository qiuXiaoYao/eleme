<template>
	<div class='ratings' ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>	
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent"
			:desc="desc" :ratings="ratings" :fresh="fresh">
			</ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size='24' :score='rating.score'></star>
								<span class="delivery" v-show='rating.deliveryTime'>{{rating.
							deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend"v-show='!rating.recommend||!rating.recommend.length'>
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
								<span  v-for='item in rating.recommend' class="item">{{item}}</span>
							</div>	

							<div class="time">

								{{rating.rateTime}}

							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import star from '../../components/star/star';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';
	const ERR_OK=0;
	const POSITIVE=0; //好的评价
	const NEGATIVE=1;  //不好的评价
	const ALL=2;		  //所有评价
	// 暴露
	export default{
		props: {
			seller: {
				type:Object
			}
		},
		data() {
			return {
				ratings:[],
				selectType:{type:ALL},
				onlyContent:{content:false},
				fresh:{fre:true},
				desc: {
					all:'全部',
					positive:'满意',
					negative:'不满意'					
				}
			}	
		},
		methods :{
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
		created() {		
			//请求数据(ajax)
			this.$http.get('api/ratings').then((response=>{
				response=response.body;
				if(response.errno==ERR_OK){
					//放在ratings:[]中，然后将ratings传到ratingselect组件中
					this.ratings=response.data;
					
					//在数据更新结束，页面渲染好再调用
			this.$nextTick(() =>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.ratings,{
  			        click:true
  			});
				}else{
					this.scroll.refresh();
				}
            })


				}
			}))
			},
		watch:{
			//在页面数据更新之后，监测dom重新计算高度。只要fresh.fre一发生变化，就会执行该函数。
			//这样由于数据的更新页面高度不同，BScroll也能实时的监测到高度
		'fresh.fre':function(){
				this.$nextTick(() =>{
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.ratings,{
  			        click:true
  		})
				}else{
					this.scroll.refresh();
				}
            })    
        
		}
	},
		components: {
			star,
			split,
			ratingselect
		}
	}; 
</script >
 
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
	.ratings
		position:absolute
		top:174px
		bottom:0
		left:0
		width:100%
		overflow:hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 137px
				width:137px
				border-right:1 px solid rgba(7,17,27,0.1)
				text-align:center
				@media only screen and (max-width:320px)
					flex:0 0 115px
					width:115px		
				.score
					margin-bottom:6px
					line-height:28px
					font-size:24px
					color:rgb(255,153,0)
				.title
					margin-bottom:8px
					line-height:20px
					font-size:12px
					color:rgb(7,17,27)
				.rank
					line-height:20px
					font-size:10px
					color:rgb(147,153,159) 
					padding-bottom:6px
			.overview-right
				flex:1
				padding:6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left:6px
				.score-wrapper
					margin-bottom:8px
					line-height:18px
					font-size:0
					.title
						display:inline-block
						line-height:18px
						vertical-align:top
						font-size:12px
						color:rgb(7,17,27)
					.star 
						display:inline-block
						margin:0 12px
						vertical-align:top
					.score
						display:inline-block
						vertical-align:top
						line-height:18px
						font-size:12px
						color:rgb(255,153,0)
				.delivery-wrapper
					font-size:0
					.title
						line-height:18px
						font-size:12px
						color:rgb(7,17,27)
					.delivery
						margin-left:12px
						font-size:12px
						color:rgb(147,153,159)
		.rating-wrapper
			padding:0 18px
			.rating-item
				display:flex
				padding:18px 0
				border-1px(rgba(7,17,27,0.1))
				.avatar
					flex:0 0 28px
					width:28px
					margin-right:12px
					img
						border-radius:50%
				.content
					position:relative
					flex:1
					.name
						line-height:12px
						font-size:10px
						color:rgb(7,17,27)
						margin-bottom:4px
					.star-wrapper
						margin-bottom:6px
						font-size:0
						.star
							display:inline-block
							margin-right:6px
							vertical-align:top
						.delivery 
							display:inline-block
							vertical-align:top
							color:rgb(147,153,159)
					.text 
						margin-bottom:8px
						line-height:18px
						color:rgb(7,17,27)
						font-size:12px
					.recommend
						line-height:16px
						.icon-thumb_up,.item
							display:inline-block
							margin:0 8px 4px 0
							font-size:9px
							color:rgb(0,160,220)
						.icon-thumb_down
							color:rgb(0,160,220)
							font-size:9px
						.item
							padding:0 6px
							border:1px solid rgba(7,17,27,0.1)
							border-radius:1px
							color:rgb(147,153,159)
							background:#fff
					.time 
						position:absolute
						top:0
						right:0
						color:rgb(147,153,159)
						line-height:12px
						font-size:10px





					

						





</style>