<template>
	<view class="container">
		<view v-for="(item,index) in list" :key="index" class="training_box" @click="details(item.id)">
			<image :src="item.banner"></image>
			<view class="training_box_item">
				<view class="ml-20">{{item.title}}</view>
				<view class="training_box_item_fs">{{item.create_time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.safetyList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token")
					},
					success: res => {
						this.list = res
					}
				})
			},
			// 详情
			details(eve) {
				uni.navigateTo({
				    url:'/pagesC/pages/training/details/details?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
		}
	}
</script>

<style lang="scss">
.training_box {
	width: 100%;
	position: relative;
	margin-bottom: 35.41rpx;
	image {
		display: block;
		width: 100%;
		height: 334rpx;
		border-radius: 10.41rpx;
		background: #cccccc;
	}
	.training_box_item {
		width: 100%;
		padding: 22.22rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #000000;
		opacity: 0.7;
		border-radius: 10.41rpx;
		font-size: 33.33rpx;
		color: $color-f;
		font-weight: 400;
		position: absolute;
		bottom: 0;
	}
	.training_box_item_fs {
		font-size: 25rpx;
		color: $color-9;
		margin-right: 20rpx;
	}
}
</style>
