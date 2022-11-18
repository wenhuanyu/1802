<template>
	<view class="background">
		<view class="container">
			<view class="title_box">
				<view class="flex">
					<view class="title_box_list">
						<view class="title-fs">{{form.total_money}}</view>
						<view>总金额</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">{{form.advance_money}}</view>
						<view>已预支</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">{{form.withhold_money}}</view>
						<view>剩余金额</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container flex">
			<picker class="date-picker mr-20" mode="date" fields="year" :value="time"
				@change="DateChange($event)">
				<view class="date_text">
					<view v-if="time==''">全部</view>
					<view v-else>{{time}}</view>
					<image class="image ml-10" :src="icon[26].icon"></image>
				</view>
			</picker>
			<picker class="date-picker ml-20" @change="changeName" :value="gIndex" :range="monthList" :range-key="'name'">
				<view class="date_text">
					<view v-if="gIndex == -1" class="uni-input">全部</view>
					<view v-else class="uni-input">{{monthList[gIndex].name}}</view>
					<image class="image ml-10" :src="icon[26].icon"></image>
				</view>
			</picker>
		</view>
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index" @click="detail(item.start_time)">
		    	<view class="item_box">
					<view class="item">
						<view class="flex">
							<view class="icon_title">{{item.start_time}}</view>
						</view>
						<view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
				</view>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:'',
				list:[],
				form:{
					total_money:'',
					advance_money:'',
					withhold_money:''
				},
				monthList:[
					{
						id:1,
						name:'1月'
					},
					{
						id:2,
						name:'2月'
					},
					{
						id:3,
						name:'3月'
					},
					{
						id:4,
						name:'4月'
					},
					{
						id:5,
						name:'5月'
					},
					{
						id:6,
						name:'6月'
					},
					{
						id:7,
						name:'7月'
					},
					
					{
						id:8,
						name:'8月'
					},
					{
						id:9,
						name:'9月'
					},
					{
						id:10,
						name:'10月'
					},
					{
						id:11,
						name:'11月'
					},
					{
						id:12,
						name:'12月'
					},
				],
				gIndex:-1,
				month:'',
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.listInterface()
		},
		methods: {
			// 选择日期
			DateChange(eve) {
				this.time =  eve.detail.value
				this.listInterface()
			},
			// 选择月份
			changeName(e) {
				this.gIndex = e.target.value
				this.month = this.monthList[this.gIndex].name
				this.listInterface()
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.My_Data_wage,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						date:this.time,
						month:this.month
					},
					success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.list = res.list
						this.form = res.total
					}
				})
			},
			// 详情点击
			detail(eve) {
				uni.navigateTo({
					url:'/pagesB/pages/wage/detail/detail?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
.date_text {
	width: 250rpx;
	border: 0.69rpx solid #CCCCCC;
	border-radius: 6.94rpx;
	height: 88.88rpx;
	padding: 0 34.72rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	image {
		width: 29.16rpx;
		height: 18.05rpx;
	}
}
.title_box {
	width: 100%;
	background: linear-gradient(90deg, #7BBC84, #4C9D57);
	border-radius: 16.66rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30rpx 0;
	.bord-none {
		border: none!important;
	}
	.title_box_list {
		width: 234rpx;
		color: $color-f;
		text-align: center;
		font-size: 25rpx;
		font-weight: 400;
		border-right: 0.69rpx dashed $color-f;
	}
	.title-fs {
		font-size: 37.5rpx;
		font-weight: bold;
		margin-bottom: 25.69rpx;
	}
}
</style>
