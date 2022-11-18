<template>
	<view class="fix-padding">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="container">
			<view class="title_box_box">
				<view class="title_box_list bord-none">
					<view class="flex"><view>合计金额：</view><view class="title-fs">￥{{total_money}}</view></view>
					
				</view>
			</view>
		</view>
		<view class="container">
			<view v-for="(item,index) in list" :key="index" class="list_box" @click="details(item)">
				<view class="flex item">
					<image :src="icon[4].icon"></image>
					<view class="mr-10">申请金额：</view>
					<view>{{item.per_amount}}元</view>
				</view>
				<view class="flex item">
					<image :src="icon[17].icon"></image>
					<view class="mr-10">申请时间：</view>
					<view>{{item.pre_time}}</view>
				</view>
				<view class="flex item">
					<image :src="icon[16].icon"></image>
					<view class="mr-10">申请状态：</view>
					<view>{{item.status_name}}</view>
				</view>
				<view class="flex item mb" v-if="item.status == 1 || item.status == 2">
					<image :src="icon[5].icon"></image>
					<view class="mr-10">审核结果：</view>
					<view>{{item.check_status_name}}</view>
				</view>
			</view>
		</view>
		<view class="container fix-bottom">
			<button class="btn-submit " @click="add">立即申请</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					// "全部",
					"审核中",
					"已审核"
				],
				count:0,
				list:[],
				icon:[],
				page:1,
				total_money:'',
			}
		},
		onLoad() {
			this.page  = 1
			this.icon = this.common.get("icon")
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			this.http({
				url: this.api.Quartel_prepaidMingList,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					status:this.count,
					page:this.page
				},
				success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
						this.total_money = res.total_money
					}
				}
			})
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Quartel_prepaidMingList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						status:this.count+1,
						page:this.page
					},
					success: res => {
						this.page+=1
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.list = res.list
						this.total_money = res.total_money
					}
				})
			},
			// tab栏点击事件
			change(e) {
				console.log(e)
				this.count = e
				this.page = 1
				this.listInterface()
			},
			add() {
				uni.navigateTo({
					url:'/pagesC/pages/apply/add/add'
				})
			},
			// 详情点击
			details(eve) {
				uni.navigateTo({
					url:'/pagesC/pages/apply/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
	.title_box_box {
		width: 100%;
		// background: linear-gradient(90deg, #7BBC84, #4C9D57);
		border-radius: 16.66rpx;
		display: flex;
		// justify-content: space-around;
		justify-content: flex-start;
		flex-wrap: wrap;
		// padding: 30rpx 0;
		.bord-none {
			border: none!important;
		}
		.title_box_list {
			// color: $color-f;
			color: #000000;
			text-align: center;
			font-size: 25rpx;
			font-weight: 400;
			border-right: 0.69rpx dashed $color-f;
		}
		.title-fs {
			font-size: 37.5rpx;
			font-weight: bold;
		}
	}
.tab {
	padding: 18.75rpx 27.08rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	font-size: 29.16rpx;
	color: $color-3;
}
.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 0.69rpx solid #4C9D57;
}
.list_box {
	font-size: 29.16rpx 31.25rpx;
	font-weight: 400;
	color: $color-3;
	padding: 36.8rpx;
	background: $color-f;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	border-radius: 6.94rpx;
	margin-bottom: 20.13rpx;
	.item {
		display: flex;
		margin-bottom: 24.3rpx;
		image {
			width: 25.69rpx;
			height: 25rpx;
			margin-right: 11.8rpx;
		}
	}
	.mb {
		margin-bottom: 0;
	}
}
</style>
