<template>
	<view class="background">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				option:{},
				url:''
			}
		},
		onLoad(option) {
			this.option = JSON.parse(decodeURIComponent(option.data))
			this.icon = this.common.get("icon")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.option.msg
			});
			this.listInterface()
		},
		methods: {
			listInterface() {
				// 消息接口
				this.http({
					url:this.api.index_detail,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						id:this.option.account_id
					},
					success: res => {
						this.url = res.url
						console.log('res',res)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.good {
	padding: 0 21.52rpx 39.58rpx 21.52rpx;
}
.title_color {
	color: $color-9;
}
.group_image {
	padding-bottom: 43.75rpx;
	border-bottom: 0.69rpx solid #E0E0E0;
	.title {
		width: 140rpx;
		font-weight: 400;
		text-align-last: justify;
		font-size: 29.16rpx;
		color: $color-9;
	}
	
}
.top_title {
	font-size: 37.5rpx;
	font-weight: 400;
	color: $color-3;
	.text {
		padding: 0 15.27rpx;
		border-left: 13.19rpx solid #4C9D57;
	}
}
</style>
