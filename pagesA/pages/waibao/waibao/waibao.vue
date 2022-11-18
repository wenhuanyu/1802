<template>
	<view class="container background">
		<view class="operate_image">
		    <block v-for="(item,index) in list" :key="index">
		    	<view class="item" @click="jump(item.id)">
		    		<view class="flex">
						<image :src="item.icon" class="image"></image>
						<view class="icon_title">{{item.title}}</view>
					</view>
		    	</view>
			</block>
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
					url:this.api.Epiboly_index,
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
			// 跳转页面
			jump(item){
				console.log('item',item)
				// 造林
				if(item == 53) {
					uni.navigateTo({
					    url: "/pagesA/pages/waibao/zaolin/zaolin"
					})
				}
				// 砍伐
				if(item == 54) {
					uni.navigateTo({
					    url: "/pagesA/pages/waibao/kanfa/kanfa"
					})
				}
				// 工序
				if(item == 68) {
					uni.navigateTo({
					    url: "/pagesA/pages/waibao/gongxu/gongxu"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.background {
	background: #FFFFFF;
}
.operate_image {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.item {
		width: 338.19rpx;
		height: 168.05rpx;
		box-shadow: 0px 0px 15rpx 0px #E0E0E0;
		border-radius: 16.66rpx;
		opacity: 1;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 16.66rpx;
	}
	.image {
		width: 52.77rpx;
		height: 47.22rpx;
		margin-right: 26.38rpx;
	}
}
</style>
