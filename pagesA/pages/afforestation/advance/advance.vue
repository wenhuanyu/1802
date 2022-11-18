<template>
	<view>
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index" >
		    	<view class="item_box">
					<view class="item" style="font-size: 30rpx;">
						<view class="flex">
							<view class="icon_title">预支金额：￥{{item.per_amount}}</view>
						</view>
						<view>
							<view>{{item.pre_time}}</view>
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
				list:[],
				data:{},
				option:""
			}
		},
		onLoad(option) {
			this.option = JSON.parse(decodeURIComponent(option.data))
			console.log('this.option',this.option)
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.option.name+'-'+this.data.quartel_name+this.data.quartel_account
			});
			this.listInterface()
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Quartel_SettlementDetail,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						quartel_id:this.data.id,
						emplo_id:this.option.emplo_id
					},
					success: res => {
						this.list = res.list
					}
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
