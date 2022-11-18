<template>
	<view class="container background">
		<view class="operate_image">
		    <block v-for="(item,index) in list" :key="index">
		    	<view class="item" @click="jump(item.id)">
					<view class="num" v-if="item.check_num>0">{{item.check_num}}</view>
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
			}
		},
		onShow() {
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
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.indexAuth,
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
							this.list = res
						}
					}
				})
			},
			// 跳转页面
			jump(item){
				console.log('item',item)
				/*员工账号*/
				// 工程款
				if(item == 50) {
					uni.navigateTo({
					    url: "/pagesC/pages/payment/payment"
					})
				}
				// 安全培训
				if(item == 51) {
					uni.navigateTo({
					    url: "/pagesC/pages/training/training/training"
					})
				}
				// 预支申请
				if(item == 52) {
					uni.navigateTo({
					    url: "/pagesC/pages/apply/apply/apply"
					})
				}
				// 送货单
				if(item == 109) {
					uni.navigateTo({
					    url: "/pagesC/pages/deliveryNote/list/list"
					})
				}
				/*管理员*/
				// 造林
				if(item == 53) {
					uni.navigateTo({
					    url: "/pagesA/pages/afforestation/afforestation/afforestation"
					})
				}
				// 砍伐
				if(item == 54) {
					uni.navigateTo({
					    url: "/pagesA/pages/fell/fell/fell"
					})
				}
				// 结算汇总
				if(item == 55) {
					uni.navigateTo({
					    url: "/pagesA/pages/summary/summary/summary"
					})
				}
				// 报销
				if(item == 57) {
					uni.navigateTo({
					    url: "/pagesA/pages/baoxiao/baoxiao/baoxiao"
					})
				}
				// 预支审核
				if(item == 59) {
					uni.navigateTo({
					    url: "/pagesA/pages/audit/audit_details/audit_details"
					})
				}
				// 外包订单
				if(item == 58) {
					uni.navigateTo({
					    url: "/pagesA/pages/waibao/waibao/waibao"
					})
				}
				// 民工管理
				if(item == 60) {
					uni.navigateTo({
					    url: "/pagesA/pages/workers/workers/workers"
					})
				}
				// 送货单
				if(item == 111) {
					uni.navigateTo({
					    url: "/pagesC/pages/mainDeliveryNote/list/list"
					})
				}
				// 汇总
				if(item == 112) {
					uni.navigateTo({
					    url: "/pagesA/pages/complete/complete/complete"
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
</style>
