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
				list:[],
				data:'',
			}
		},
		onShow() {
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.data.quartel_name
			});
			
		},
		onLoad(option) {
			this.listInterface()
		},
		methods: {
			listInterface() {
				this.http({
					url:this.api.blockAuth,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
					},
					success: res => {
						this.list = res
					}
				})
			},
			// 跳转页面
			jump(item){
				console.log('item',item)
				// 设置
				if(item == 65) {
					uni.navigateTo({
						url:'/pagesA/pages/fell/setting/setting?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 外包订单
				if(item == 67) {
					uni.navigateTo({
						url:'/pagesA/pages/fell/outsourcing/outsourcing?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 时间
				if(item == 66) {
					uni.navigateTo({
						url:'/pagesA/pages/fell/time/time?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 录入
				if(item == 62) {
					this.common.set('tiqu', '')
					uni.navigateTo({
					    url: "/pagesA/pages/fell/luru/luru"
					})
				}
				// 查询
				if(item == 63) {
					uni.navigateTo({
					    url: "/pagesA/pages/fell/query/query"
					})
				}
				// 结算
				if(item == 64) {
					uni.navigateTo({
					    url: "/pagesA/pages/fell/settlement/settlement"
					})
				}
			},
		}
	}
</script>

<style lang="scss">
// .operate_image {
// 	display: flex;
// 	justify-content: space-between;
// 	flex-wrap: wrap;
// 	.item {
// 		width: 338.19rpx;
// 		height: 168.05rpx;
// 		box-shadow: 0px 0px 15rpx 0px #E0E0E0;
// 		border-radius: 16.66rpx;
// 		opacity: 1;
// 		display: flex;
// 		align-items: center;
// 		justify-content: space-around;
// 		margin-bottom: 16.66rpx;
// 	}
// 	.image {
// 		width: 52.77rpx;
// 		height: 47.22rpx;
// 		margin-right: 26.38rpx;
// 	}
// }
</style>
