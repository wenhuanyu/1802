<template>
	<view class="background">
		<view class="container">
			<view class="title_box flex">
				<view class="title_box_list">
					<view class="title-fs">{{form.salary}}</view>
					<view>本月应发工资</view>
				</view>
				<view class="title_box_list bord-none">
					<view class="title-fs">{{form.total_withhold}}</view>
					<view>本月扣款</view>
				</view>
			</view>
		</view>
		<view class="operate">
		    <view>
		    	<view class="item_box">
					<view class="item">
						<view class="icon_title">基本工资</view>
						<view class="flex">
							<view>+{{form.wage_money}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">全勤奖</view>
						<view class="flex">
							<view>+{{form.present_money}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">生活补助</view>
						<view class="flex">
							<view>+{{form.live}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">绩效工资</view>
						<view class="flex">
							<view>+{{form.merit_pay}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">应发合计</view>
						<view class="flex">
							<view>{{form.salary}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">个人所得税</view>
						<view class="flex">
							<view>-{{form.tax}}</view>
							<image class="image_jt"></image>
						</view>
					</view>
					<view class="item" @click="detail()">
						<view class="icon_title">扣款</view>
						<view class="flex">
							<view>-{{form.withhold}}</view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
					<view class="item">
						<view class="icon_title">实发合计</view>
						<view class="flex">
							<view>{{form.reality_money}}</view>
							<image class="image_jt"></image>
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
				form:{
					salary:'',
					total_withhold:'',
					wage_money:'',
					present_money:'',
					live:'',
					merit_pay:'',
					tax:'',
					withhold:'',
					reality_money:'',
				},
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			if(option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.My_Data_wageDetail,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						date:this.data
					},
					success: res => {
						if(res.list) {
							this.form = res.list
						}
					}
				})
			},
			// 详情点击
			detail() {
				uni.navigateTo({
					url:'/pagesB/pages/wage/deductions/deductions?data='+encodeURIComponent(JSON.stringify(this.form))
				})
			},
		}
	}
</script>

<style lang="scss">
.icon_title {
	width: 180rpx;
	text-align-last: justify;
	color: $color-9;
}
.title_box {
	width: 100%;
	background: linear-gradient(90deg, #7BBC84, #4C9D57);
	border-radius: 16.66rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	padding: 30rpx 0;
	.bord-none {
		border: none!important;
	}
	.title_box_list {
		width: 49%;
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
