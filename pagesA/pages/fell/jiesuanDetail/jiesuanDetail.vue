<template>
	<view class="background">
		<view class="container">
			<view class="title_box">
				<view class="flex">
					<view class="title_box_list">
						<view class="title-fs">￥{{option.price}}</view>
						<view>总工程款</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">￥{{option.zctotalPrice}}</view>
						<view>预支工程款</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{option.syPrice}}</view>
						<view>剩余工程款</view>
					</view>
				</view>
				<view class="line"></view>
				<view class="flex">
					<view class="title_box_list">
						<view class="title-fs">{{option.rate}}</view>
						<view>百分比</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{option.surplus_70}}</view>
						<view>70%剩余</view>
					</view>
				</view>
			</view>
			<view class="operate">
			    <view v-for="(item,index) in list" :key="index" @click="tiaozhuan(item)">
			    	<view class="item_box">
						<view class="item" style="font-size: 30rpx;">
							<view class="flex">
								<view class="icon_title">{{item.job_name}}</view>
							</view>
							<view class="flex">
								<view>￥{{item.price}}</view>
								<image :src="icon[28].icon" class="image_jt"></image>
							</view>
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
				option:'',
				data:'',
				form:{
					rate:'',
					surplus_70:'',
					syPrice:'',
					totalPrice:'',
					zctotalPrice:'',
				},
				icon:[],
			}
		},
		onLoad(option) {
			this.option = JSON.parse(decodeURIComponent(option.data))
			this.icon = this.common.get("icon")
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title:this.option.emplo_name+'-'+this.data.quartel_name
			});
			this.listInterface()
		},
		mounted() {	
		},
		methods: {
			listInterface() {
				this.http({
					url:this.api.Quartel_settlementOne,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
						emplo_id:this.option.emplo_id,
						bu_status:this.option.bu_status,
						wx_status:this.option.wx_status,
						kou_status:this.option.kou_status,
						id:this.option.id
					},
					success:res =>{
						this.list = res.list
					}
				})
			},
			tiaozhuan(eve) {
				uni.navigateTo({
					url:'/pagesA/pages/fell/jiesuanDetailTwo/jiesuanDetailTwo?data='+encodeURIComponent(JSON.stringify(eve))
				})
			}
		}
	}
</script>

<style lang="scss">
.title_box {
	width: 100%;
	background: linear-gradient(90deg, #7BBC84, #4C9D57);
	border-radius: 16.66rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30rpx 0;
	.line {
		width: 640rpx;
		height: 13.19rpx;
		background: #4C9D57;
		border-radius: 6.94rpx;
		margin: 40.27rpx auto;
	}
	.bord-none {
		border: none!important;
	}
	.title_box_list {
		width: 234rpx;
		color: $color-f;
		text-align: center;
		font-size: 25rpx;
		font-weight: 400;
		border-right: 0.69rpx dashed $color-f;
	}
	.title-fs {
		font-size: 37.5rpx;
		font-weight: bold;
		margin-bottom: 25.69rpx;
	}
}
</style>
