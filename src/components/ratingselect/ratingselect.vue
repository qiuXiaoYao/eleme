<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType.type===2}">{{desc.all}}
			<span class="count">{{ratings.length}}</span></span>

			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType.type===0}">{{desc.positive}}
			<span class="count">{{positives.length}}</span></span>

			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType.type===1}">{{desc.negative}}
			<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="switch">
			<span class="icon-check_circle" :class="{'on':onlyContent.content}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	//import Vue from 'vue'
	//var refresh = new Vue();
	const POSITIVE=0; //好的评价
	const NEGATIVE=1;  //不好的评价
	const ALL=2;		  //所有评价
	// 暴露
	export default{
	//因为子组件不能修改父组件的属性，所以可以将东西放在一个对象中传入子组件，然后修改对象中的属性即可
		props:{
			ratings:{
				type:Array,
				default() {
					return [];
				}
			},
			selectType: {
				type:Object,
			},
			onlyContent: {
				type:Object,
			},
			desc: {
				type:Object,
				//默认值
				default() {
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
						}
					}
				},
			fresh:{
				type:Object
				}
			},
		//计算属性
		computed:{
		//计算出积极和消极评论
	 		positives(){
	 		//filter对数组进行过滤
	 			return this.ratings.filter((rating)=>{
	 				return rating.rateType===POSITIVE
            	}) 
	 		},
	 		negatives(){
	 			return this.ratings.filter((rating)=>{
	 				return rating.rateType===NEGATIVE
	 			});
	 		}
 		},
		methods: {
		select(type,event){
 			if(!event._constructed){
 				return;
 			}
 	//selectType传来的是一个对象，修改其中的属性，父组件也知道。（子组件告诉父组件它的变化，相互通信）
 /*但是如果传来的是一个数据（不是对象），修改了数据的值，父组件不知道，要通过$dispatch方法告诉父组件，
 		你修改了什么值。但是$dispatch已经被2.0废弃*/

 			this.selectType.type=type;

 			//在页面渲染之后调用该方法
			this.$nextTick(() =>{
				this.fresh.fre=!this.fresh.fre
            }) 
 			 
 		},
 		toggleContent(event){
 			if(!event._constructed){
 				return;
 			}
 			this.onlyContent.content=!this.onlyContent.content;
 			this.$nextTick(() =>{
			this.fresh.fre=!this.fresh.fre
            })   

 		},
		}
	}; 
</script >

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.ratingselect
		.rating-type
			padding:18px 0
			margin:0 18px
			border-1px(rgba(7,17,27,0.1))
			font-size:0px
			.block
				display:inline-block;
				padding:8px 12px
				line-height:16px
				margin-right:8px
				border-radius:1px
				color:rgb(77,85,93);
				font-size:8px
				&.active
					color:#fff
				.count
					margin-left:2px
					font-size:8px
				&.positive
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
		.switch
			line-height:24px
			padding:12px 18px
			border-bottom:1px solid rgba(7,17,27,0.1)
			color:rgb(147,153,159)	
			font-size:0px
			.icon-check_circle
				display:inline-block
				vertical-align:top
				margin-right:4px
				font-size:24px
				&.on
					color:#00a0dc;
			.text
				font-size:12px
				vertical-align:top

</style>


