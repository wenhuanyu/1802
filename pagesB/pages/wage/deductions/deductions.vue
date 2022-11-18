<template>
	<view class="background">
		<view class="container">
			<view class="title_box flex">
				<view class="title_box_list">
					<view class="title-fs">{{total_money}}</view>
					<view>本月扣款</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view v-for="(item,index) in list" :key="index" class="deductions_box mb-20">
				<view class="deductions_box_top">
					<view>{{item.withhold_time}}</view>
					<view>扣款：<text>￥{{item.money}}</text></view>
				</view>
				<view class="deductions_box_center">扣款原因</view>
				<view class="deductions_box_bottom">{{item.cause}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				data:'',
				total_money:''
			}
		},
		onLoad(option) {
			if(option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.My_Data_withhold,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						id:this.data.id,
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
						this.total_money = res.total.total_money
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.deductions_box {
	background: #F2F2F2;
	border-radius: 10.41rpx;
	padding: 41.66rpx;
	font-size: 33.33rpx;
	font-weight: 400;
	color: $color-3;
	.deductions_box_top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		view:nth-child(1) {
			padding: 19.44rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 30.55rpx;
			font-size: 29.16rpx;
		}
		view:nth-child(2) {
			font-size: 25rpx;
			color: $color-9;
			display: flex;
			align-items: center;
			text {
				font-size: 37.5rpx;
				color: #4C9D57;
			}
		}
	}
	.deductions_box_center {
		margin-top: 44.44rpx;
		margin-bottom: 22.91rpx;
	}
	.deductions_box_bottom {
		color: $color-6;
	}
}
.icon_title {
	width: 180rpx;
	text-align-last: justify;
	color: $color-9;
}
.title_box {
	width: 100%;
	background: linear-gradient(90deg, #7BBC84, #4C9D57);
	border-radius: 16.66rpx;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 30rpx 0;
	.title_box_list {
		width: 49%;
		color: $color-f;
		text-align: center;
		font-size: 25rpx;
		font-weight: 400;
		border: none;
	}
	.title-fs {
		font-size: 37.5rpx;
		font-weight: bold;
		margin-bottom: 25.69rpx;
	}
}
</style>
