<template>
	<view class="fix-padding">
		<view class="good container ">
			<view class="group">
				<view class="title">单号</view><text class="title_color">：</text>
				<input class="input" v-model="form.order_num" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">林班类型</view><text class="title_color">：</text>
				<input class="input" v-model="form.type" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">林班名称</view><text class="title_color">：</text>
				<input class="input" v-model="form.quartel_name" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">申请金额</view><text class="title_color">：</text>
				<input class="input" v-model="form.money" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">备注</view><text class="title_color">：</text>
				<input class="input" v-model="form.remark" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">提交时间</view><text class="title_color">：</text>
				<input class="input" v-model="form.create_time" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">审核状态</view><text class="title_color">：</text>
				<view class="input" style="display: flex;align-items: center;color: #FFAE00;" v-if="form.status == 0">{{form.status_name}}</view>
				<view class="input" style="display: flex;align-items: center;color: #4C9D57;" v-if="form.status == 1">{{form.status_name}}</view>
				<view class="input" style="display: flex;align-items: center;color: #CA0000;" v-if="form.status == 2">{{form.status_name}}</view>
			</view>
			<view class="group" v-if="form.status == 1 || form.status == 2">
				<view class="title">审核时间</view><text class="title_color">：</text>
				<input class="input" v-model="form.check_time" placeholder="请输入" disabled></input>
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
				data:{},
				show:false,
				text:'',
				message:'',
			}
		},
		onLoad(option) {
			if(option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
			}
			this.listInterface()
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.data.status_name
			});
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
					url:this.api.Apply_checkDetails,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						action:2,
						id:this.data.id
					},
					success: res => {
						this.form = res
					}
				})
			},
			// 图片放大
			previewImage(i) {
				wx.previewImage({
					current: this.form.image[i],
					urls: this.form.image
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
								url:this.api.Apply_checkApply,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									message:this.message,
									action:2,
									id:this.data.id,
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
								url:this.api.Apply_checkApply,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									message:this.message,
									id:this.data.id,
									action:2,
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
