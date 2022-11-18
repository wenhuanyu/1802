<template>
	<view>
		<view class="operate">
		    <view>
		    	<view class="item_box">
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">亩</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="xuanze">
							{{form.allWork_Num}}亩
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">单价</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs">
							￥{{form.jobUnitPrice}}
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">总工程款</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs">
							￥{{form.totalPrice}}
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">预支工程款</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="yuzhi">
							￥{{form.zctotalPrice}}
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">剩余工程款</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs">
							￥{{form.syPrice}}
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
				data:'',
				option:'',
				form:{
					allWork_Num:'',
					jobUnitPrice:'',
					totalPrice:'',
					zctotalPrice:'',
					syPrice:''
				},
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.option = JSON.parse(decodeURIComponent(option.data))
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.option.name+'-'+this.option.quartel_name
			});
			this.listInterface()
		},
		methods: {
			listInterface() {
				this.http({
					url:this.api.afforestationSettlement,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						emplo_id:this.option.emplo_id,
						quartel_id:this.option.quartel_id
					},
					success:res =>{
						this.form = res
					}
				})
			},
			// 预支
			yuzhi() {
				uni.navigateTo({
					url:'/pagesA/pages/summary/advance/advance?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			},
			// 亩
			xuanze() {
				uni.navigateTo({
					url:'/pagesA/pages/summary/advanceList/advanceList?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			}
		}
	}
</script>

<style lang="scss">
.operate {
	.icon_text {
		color: $color-3;
	}
	.icon_title {
		width: 185.41rpx;
		font-weight: 400;
		text-align-last: justify;
		color: $color-9;
	}
}
</style>
