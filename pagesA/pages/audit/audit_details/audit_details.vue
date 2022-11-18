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
				data:'',
			}
		},
		onLoad(option) {
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: "审核"
			});
		},
		onShow() {
			this.listInterface()
		},
		methods: {
			listInterface() {
				this.http({
					url:this.api.Quartel_expense_icon,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
					},
					success: res => {
						this.list = res.list
					}
				})
			},
			// 跳转页面
			jump(item){
				// 预支审核
				if(item == 59) {
					uni.navigateTo({
						url:'/pagesA/pages/audit/audit/audit'
					})
				}
				// 报销审核
				if(item == 57) {
					uni.navigateTo({
						url:'/pagesA/pages/audit/account/account'
					})
				}
			},
		}
	}
</script>

<style lang="scss">
</style>
