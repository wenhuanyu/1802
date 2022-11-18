<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
			   <input class="input" v-model="form.emplo_name" placeholder="请选择林班号" disabled></input>
			</view>
			<view class="group" v-if="form.job_name !==''">
			    <view class="title">职业</view><text class="title_color">：</text>
			   <input class="input" v-model="form.job_name" placeholder="请选择职业" disabled></input>
			</view>
			<view class="group">
			    <view class="title">林班号</view><text class="title_color">：</text>
			    <input class="input" v-model="form.quartel_account" placeholder="请选择林班号" disabled></input>
			</view>
			<view class="group">
			    <view class="title">已预支额</view><text class="title_color">：</text>
				<view class="input" style="line-height: 92rpx;">
					{{form.count_money}}(占总工程款{{form.rate}}%)
				</view>
			</view>
			<view class="group">
			    <view class="title">预支金额</view><text class="title_color">：</text>
			    <input class="input" v-model="form.per_amount" placeholder="请输入预支金额" disabled></input>
			</view>
			<view class="group">
			    <view class="title">金额大写</view><text class="title_color">：</text>
			    <input class="input" v-model="form.capital" placeholder="大写金额" disabled></input>
			</view>
			<view class="group">
			    <view class="title">卡号</view><text class="title_color">：</text>
			    <input class="input" v-model="form.bank_card" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">开户行</view><text class="title_color">：</text>
			    <input class="input" v-model="form.bank" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
				 <input class="input" v-model="form.pre_time" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			     <input class="input" v-model="form.note" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group" v-if="form.sign_name !==''">
			    <view class="title">签名</view><text class="title_color">：</text>
				<view style="height: 120rpx;">
					<image class="signimage an" :src="form.sign_name" @click="signImage" mode="aspectFill"></image>
				</view>
			</view>
			<view class="group_image"  v-if="form.uplode_img !== ''">
				<view class="flex"><view class="title">上传</view><text class="title_color">：</text></view>
				<view class="remarkImage flex">
					<view class="item">
						<image class="image" :src="form.uplode_img" @click="previewImage"></image>
					</view>
				</view>
			</view>
			<view class="process">
				<view class="process_bottom">
					<view class="process_bottom_left">
						<image :src="form.fq_avatar" v-if="form.fq_avatar.length>0"></image>
						<image :src="icon[18].icon" v-if="form.fq_avatar.length<=0"></image>
						
						<view  v-if="form.one_check_name.length !==0" class="line"></view>
						<image v-if="form.one_check_name.length !==0 && form.one_check_avatar.length > 0" :src="form.one_check_avatar"></image>
						<image :src="icon[18].icon" v-if="form.one_check_avatar.length<=0 && form.one_check_name.length !==0"></image>
						
						<view  v-if="form.two_check_name.length !==0" class="line"></view>
						<image v-if="form.two_check_name.length !==0 && form.two_check_avatar.length > 0" :src="form.two_check_avatar"></image>
						<image :src="icon[18].icon" v-if="form.two_check_avatar.length<=0 && form.two_check_name.length !==0"></image>
						
						<view  v-if="form.three_check_name.length !==0" class="line"></view>
						<image v-if="form.three_check_name.length !==0 && form.three_check_avatar.length > 0" :src="form.three_check_avatar"></image>
						<image :src="icon[18].icon" v-if="form.three_check_avatar.length<=0 && form.three_check_name.length !==0"></image>
						
						<view  v-if="form.four_check_name.length !==0" class="line"></view>
						<image v-if="form.four_check_name.length !==0 && form.four_check_avatar.length > 0" :src="form.four_check_avatar"></image>
						<image :src="icon[18].icon" v-if="form.four_check_avatar.length<=0 && form.four_check_name.length !==0"></image>
					</view>
					<view class="list_box">
						<view class="item">
							<view class="right_box">
								<view class="bottom_text">
									<view class="top_name">{{form.fq_name}}发起的申请</view>
									<view class="n2">{{form.fq_date}}</view>
								</view>
								<!-- <view class="n1">审核意见：</view> -->
							</view>
						</view>
						<view class="item" v-if="form.one_check_name.length !==0">
							<view class="right_box">
								<view class="bottom_text">
									<view class="top_name">{{form.one_check_name}}({{form.one_check_status}})</view>
									<view class="n2">{{form.one_check_date}}</view>
								</view>
								<view class="n1" v-if="form.one_check_stat == 1 || form.one_check_stat == 2">审核意见：
									<text class="text_color" @click="chakan('one')">查看</text>
								</view>
							</view>
						</view>
						<view class="item bn"  v-if="form.two_check_name.length !==0">
							<view class="right_box">
								<view class="bottom_text">
									<view class="top_name">{{form.two_check_name}}({{form.two_check_status}})</view>
									<view class="n2">{{form.two_check_date}}</view>
								</view>
								<view class="n1" v-if="form.two_check_stat == 1 || form.two_check_stat == 2">审核意见：
									<text class="text_color" @click="chakan('two')">查看</text>
								</view>
							</view>
						</view>
						<view class="item bn" v-if="form.three_check_name.length !==0">
							<view class="right_box">
								<view class="bottom_text">
									<view class="top_name">{{form.three_check_name}}({{form.three_check_status}})</view>
									<view class="n2">{{form.three_check_date}}</view>
								</view>
								<view class="n1" v-if="form.three_check_stat == 1 || form.three_check_stat == 2">审核意见：
									<text class="text_color" @click="chakan('three')">查看</text>
								</view>
							</view>
						</view>
						<view class="item bn" v-if="form.four_check_name.length !==0">
							<view class="right_box">
								<view class="bottom_text">
									<view class="top_name">{{form.four_check_name}}({{form.four_check_status}})</view>
									<view class="n2">{{form.four_check_date}}</view>
								</view>
								<view class="n1" v-if="form.four_check_stat == 1 || form.four_check_stat == 2">审核意见：
									<text class="text_color" @click="chakan('four')">查看</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text_box" v-if="form.check_status == 1">
			    <textarea v-model="message" placeholder="请输入审批意见"></textarea>
			</view>
		</view>
		<view v-show="show" class="modal_center" @click="closeModal">
			<view class="modal-main" @click.stop>
				{{text}}
			</view>
		</view>
		<view class="container fix-bottom flex"  v-if="form.check_status == 1">
			<button class="btn-submit" style="width: 480rpx;border: 2rpx solid #4C9D57; color: #4C9D57; background: none;" @click="noadd">不同意</button>
		    <button class="btn-submit" style="width: 480rpx;margin-left: 20rpx;" @click="add">同意</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{},
				icon:[],
				option:'',
				show:false,
				text:'',
				message:'',
			}
		},
		onLoad(option) {
			this.option = JSON.parse(decodeURIComponent(option.data))
			console.log('this.option',this.option)
			this.icon = this.common.get("icon")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.option.status_name
			});
			this.listInterface()
		},
		methods: {
			// 查看点击
			chakan(i) {
				if(i == 'one') {
					this.text = this.form.one_check_message
				} else if (i == 'two') {
					this.text = this.form.two_check_message
				} else if (i == 'three') {
					this.text = this.form.three_check_message
				} else if (i == 'four') {
					this.text = this.form.four_check_message
				}
				
				this.show = true
			},
			// 关闭弹窗
			closeModal() {
				this.show = false
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Quartel_prepaidDetails,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						id:this.option.id,
						
					},
					success: res => {
						this.form = res
					}
				})
			},
			// 图片放大
			previewImage() {
				let imgsArray = [];
				imgsArray[0] = this.form.uplode_img;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			signImage() {
				let imgsArray = [];
				imgsArray[0] = this.form.sign_name;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			// 添同意
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Quartel_checkPrepaid,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									message:this.message,
									id:this.option.id,
									status:1
								},
								success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			// 不同意
			noadd() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Quartel_checkPrepaid,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									message:this.message,
									id:this.option.id,
									status:2
								},
								success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.previous()
									},500) 
								}
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	
.text_box {
	margin-left: 60rpx;
	margin-top: 20rpx;
	width: 640rpx;
	height: 340rpx;
	border: 2rpx solid #cccccc;
	border-radius: 20rpx;
	textarea {
		width: 600rpx;
		height: 300rpx;
		padding: 20rpx;
	}
}
.good {
	padding: 0 21.52rpx 39.58rpx 21.52rpx;
	.group {
		.title {
			color: #000000;
		}
		
	}
	.title_color {
		color: #000000;
	}
}


.group_image {
	padding-bottom: 43.75rpx;
	border-bottom: 0.69rpx solid #E0E0E0;
	margin-right: 28.47rpx;
	.title {
		width: 125rpx;
		font-weight: 400;
		text-align-last: justify;
		font-size: 29.16rpx;
		color: #000000;
	}
	
}
.process {
	.title {
		font-size: 37.5rpx;
		color: $color-3;
		padding: 42.36rpx 0;
	}
	.process_bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.item {
			width: 600rpx;
			height: 161.8rpx;
			border-bottom: 0.69rpx solid #E0E0E0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.right_box {
				width: 100%;
			}
			.top_name {
				font-size: 33.33rpx;
				font-weight: 400;
				color: $color-3;
			}
			.bottom_text {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.n1 {
				font-size: 29.16rpx;
				color: $color-9;
				font-weight: 400;
				margin-top: 15.91rpx;
			}
			.n2 {
				font-size: 25rpx;
				color: $color-9;
				font-weight: 400;
			}
			.text_color {
				color: #4C9D57;
			}
		}
		.bn {
			border: none!important;
		}
	}
	.process_bottom_left {
		width: 77.77rpx;
		// height: 396.8rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-around;
		image {
			width: 77.77rpx;
			height: 77.77rpx;
		}
		.line {
			width: 5.55rpx;
			height: 85rpx;
			background: #CCCCCC;
			border-radius: 2.77rpx;
		}
	}
}
</style>
