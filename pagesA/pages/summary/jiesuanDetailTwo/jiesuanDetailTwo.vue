<template>
	<view>
		<view class="operate">
		    <view>
		    	<view class="item_box">
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">吨位</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="tiaozhuan">
							{{form.net_weight}}吨
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">单价</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs">
							￥{{form.wage}}
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">维修</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="weixiu">
							￥{{form.wx_totalPrice}}
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">补</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="bu">
							￥{{form.bu_totalPrice}}
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="flex">
							<view class="icon_title fs">扣</view><text class="title_color">：</text>
						</view>
						<view class="icon_text fs" @click="kou">
							￥{{form.kou_totalPrice}}
							<image :src="icon[28].icon" class="image_jt"></image>
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
				option:'',
				form:{
					net_weight:'',
					wage:'',
					totalPrice:'',
					zctotalPrice:'',
					syPrice:'',
					bu_totalPrice:'',
					kou_totalPrice:'',
					wx_totalPrice:'',
				},
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.option = JSON.parse(decodeURIComponent(option.data))
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.option.emplo_name+'-'+this.option.job_name
			});
			this.listInterface()
		},
		methods: {
			listInterface() {
				this.http({
					url:this.api.Quartel_settlementTwo,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.option.quartel_id,
						emplo_id:this.option.emplo_id,
						job_id:this.option.job_id,
					},
					success:res =>{
						this.form = res.list
					}
				})
			},
			// 
			tiaozhuan() {
				if(this.option.job_name == '中转车' || this.option.job_name == '油锯手' || this.option.job_name == '挖机') {
					this.option.data_type = 0
				} else {
					this.option.data_type = 1
				}
				this.option.relation_id = this.form.relation_id
				uni.navigateTo({
					url:'/pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			},
			// 维修
			weixiu() {
				this.option.data_type = 3
				this.option.wx_id = this.form.wx_id
				uni.navigateTo({
					url:'/pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			},
			// 预支
			yuzhi() {
				this.option.data_type = 2
				this.option.yuzhi_id = this.form.yuzhi_id
				uni.navigateTo({
					url:'/pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			},
			// 补
			bu() {
				this.option.data_type = 4
				this.option.bu_id = this.form.bu_id
				uni.navigateTo({
					url:'/pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree?data='+encodeURIComponent(JSON.stringify(this.option))
				})
			},
			// 补
			kou() {
				this.option.data_type = 5
				this.option.kou_id = this.form.kou_id
				uni.navigateTo({
					url:'/pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree?data='+encodeURIComponent(JSON.stringify(this.option))
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
