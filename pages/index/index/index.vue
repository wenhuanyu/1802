<template>
	<view class="container">
		<view class="yiduclick" @click="yidu">
			<image :src="icon[39].icon"></image>全部已读
		</view>
		<view class="list_box">
			<view v-for="(item,index) in list" :key="index" class="item" @click="detail(item)">
				<view class="yuan" v-if="item.is_read == 0"></view>
				<view class="right_box">
					<view class="top_name">{{item.member_name}}</view>
					<view class="bottom_text">
						<view class="n1">{{item.msg}}</view>
						<view class="n2">{{item.create_time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				list:[],
				icon:[],
			}
		},
		onLoad() {
		},
		onShow() {
			this.icon = this.common.get("icon")
			// console.log('this.icon',this.icon)
			let uid = this.common.get("uid")
			if (uid != "") {
				this.listInterface()
			} else {
				uni.switchTab({
				     url: "/pages/user/user/user"
				})
			}
		},
		methods: {
			listInterface() {
				// 消息接口
				this.http({
					url:this.api.getLogList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token")
					},
					success: res => {
						if(res.code == 0) {
							uni.switchTab({
							     url: "/pages/user/user/user"
							})
						} else {
							if(res.list.length == 0) {
								uni.showToast({
									title:'无数据',
									icon:'none',
									duration: 2000
								})
							}
							this.list = res.list
						}
					}
				})
			},
			// 全部已读点击
			yidu() {
				this.http({
					url:this.api.setLogReaded,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token")
					},
					success: res => {
						this.listInterface()
					}
				})
			},
			// 详情
			detail(eve) {
				uni.navigateTo({
					url:'/pages/index/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
	.yiduclick {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 29.16rpx;
		font-weight: 400;
		color: #4C9D57;
		image {
			width: 27.77rpx;
			height: 22.22rpx;
			margin-right: 11.8rpx;
		}
	}
	.item {
		padding: 28.47rpx 0;
		border-bottom: 0.69rpx solid #E0E0E0;
		display: flex;
		justify-content: space-between;
		.yuan {
			width: 13.88rpx;
			height: 13.88rpx;
			border-radius: 50%;
			background: #E20000;
			margin-top: 16rpx;
			margin-right: 10rpx;
		}
		.right_box {
			width: 100%;
		}
		.top_name {
			font-size: 33.33rpx;
			font-weight: 400;
			color: $color-3;
		}
		.bottom_text {
			height: 27.08rpx;
			margin-top: 23.61rpx;
			display: flex;
			justify-content: space-between;
			line-height: 27.08rpx;
			.n1 {
				font-size: 29.16rpx;
				height: 27.08rpx;
				color: $color-6;
				font-weight: 400;
			}
			.n2 {
				font-size: 25rpx;
				color: $color-9;
				font-weight: 400;
			}
		}
	}
</style>