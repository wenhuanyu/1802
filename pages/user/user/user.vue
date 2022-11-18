<template>
	<view class="background">
		<block v-if="isLogin">
			<view class="login_top">
				<image class="avatar" :src="avatar"></image>
				<view class="info">
					<view class="nickname">
						{{nickname}}
					</view>
				</view>
			</view>
			<view class="operate">
				<block v-for="item in personal_list_my" :key="item.name" v-if="item.grade">
					<view class="item_box">
						<navigator class="item" :url="item.url">
							<view class="flex">
								<image :src="item.image" class="image"></image>
								<view class="icon_title">{{item.name}}</view>
							</view>
							<view>
								<image :src="icon[28].icon" class="image_jt"></image>
							</view>
						</navigator>
					</view>
				</block>
			</view>
			<view style="position: fixed; bottom: 10%; right: 4%; width: 92%;" v-if="isLogin">
				<view class="container">
					<button class="btn-submit" @click="quitLogin">退出登录</button>
				</view>
				<!-- <view class="bottom_text" @click="tiaozhuan">
					技术支持：森发林业
				</view> -->
				<view class="bottom_text">
					技术支持：森发林业
				</view>
			</view>
			
		</block>
		<block v-else>
			<view class="login_top" >
				<image class="avatar" @click="login" src="/static/image/common/user-default.png"></image>
				<view class="info">
					<view class="login" @click="login">点击登录</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				isLogin: false,
				nickname: "",
				avatar: "",
				personal_list_my:[
					{
						name:'修改密码',
						image:'',
						url:'/pages/user/set/set',
					},
					{
						name:'基本信息',
						image:'',
						url:'/pages/user/basic/basic',
					},
					{
						name:'我的工资',
						image:'',
						url:'/pagesB/pages/wage/wage/wage',
					},
				],
				grade:'',
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			let startToken = uni.getStorageSync('token')
			if (!startToken) {
				this.isLogin = false
				// uni.reLaunch({
				// 	url: "/pages/login/login"
				// })
			} else{
				this.isLogin = true
			}
			
			// let state = this.common.get("state")
			let uid = this.common.get("uid")
			let token = this.common.get("token")
			
			if (uid != "") {
				this.isLogin = true
				let icon = this.common.get("icon")
				this.personal_list_my[0].image = icon[9].icon
				this.personal_list_my[1].image = icon[10].icon
				this.personal_list_my[2].image = icon[11].icon
				this.http({
					url: this.api.My_Data,
					method: "POST",
					data: {
						uid: uid,
						token:token
					},
					success: res => {
						if(res.code == 0) {
							this.isLogin = false
						} else {
							this.nickname = res.name
							this.avatar = res.avatar
							this.grade = res.grade
							if (this.grade == 1) {
								this.personal_list_my[0].grade = 1
								this.personal_list_my[1].grade = 1
							} else {
								this.personal_list_my[0].grade = 2
								this.personal_list_my[2].grade = 2
							}
						}
						
					}
				})
			}
		},
		methods: {
			// 文字点击跳转
			tiaozhuan(){
				uni.navigateToMiniProgram({
					appId: 'wxa59d080ba74b049a',
					success(res) {}
				})
			},
			// 微信小程序登录
			login() {
				this.http({
					url: this.api.Contact_icon,
					method: "POST",
					data: {
					},
					success: res => {
						this.common.set("icon", res.list)
					}
				})
				let startToken = uni.getStorageSync('token')
				console.log('startToken', startToken)
				if (startToken!=='') {
					uni.reLaunch({
						url: "/pages/workbench/workbench/workbench"
					})
				} else{
					uni.reLaunch({
						url: "/pagesB/pages/login/login"
					})
				}
				// let uid = this.common.get("uid")
				// let token = this.common.get("token")
				
				
				// uni.reLaunch({
				// 	url: "/pagesB/pages/login/login"
				// })
				// 1.获取用户信息
				// uni.getUserProfile({
				// 	desc: "weixin",
				// 	success: res => {
				// 		let encryptedData = res.encryptedData
				// 		let iv = res.iv
				// 		let userInfo = res.userInfo

				// 		// 2.获取code
				// 		uni.login({
				// 			provider: "weixin",
				// 			success: res => {
				// 				let code = res.code

				// 				// 3.登录获取session_key
				// 				this.http({
				// 					url: this.api.login,
				// 					method: "POST",
				// 					data: {
				// 						code: code,
				// 					},
				// 					success: res => {
				// 						if (!res.session_key) {
				// 							this.store(res)
				// 							return
				// 						}
				// 						let session_key = res.session_key

				// 						// 4.绑定用户信息
				// 						this.http({
				// 							url: this.api.login,
				// 							method: "POST",
				// 							data: {
				// 								avatar: userInfo.avatarUrl,
				// 								nick_name: userInfo.nickname,
				// 								sex: 0,
				// 								session_key: session_key,
				// 								iv: iv,
				// 								encryptedData: encryptedData
				// 							},
				// 							success: res => {
				// 								this.store(res)
				// 							}
				// 						})
				// 					}
				// 				})
				// 			}
				// 		})
				// 	}
				// })
			},
			// store(res) {
			// 	this.common.set("uid", res.uid)
			// 	this.common.set("state", res.binding_state)
				
			// 	if (res.binding_state == 1) {
			// 		uni.reLaunch({
			// 			url: "/pagesB/pages/login/login"
			// 		})
			// 	} else if (res.binding_state == 2) {
			// 		this.common.set('token',res.token)
			// 		uni.reLaunch({
			// 			url: "/pages/workbench/workbench/workbench"
			// 		})
			// 	}
			// },
			// 退出登录点击
			quitLogin() {
				uni.showModal({
					title: '提示',
					content: '确定要退出当前账号吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url: this.api.log_out,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token")
								},
							    success: res => {
									this.common.set("uid", res.uid)
									// 跳转  关闭所有页面跳到指定页面
									uni.reLaunch({
										url: "/pagesB/pages/login/login"
									})
									uni.removeStorage({
										key: 'token'
									})
								}	
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang="scss">
.login_top {
	height: 350rpx;
	background: #4C9D57;
	border-radius: 0rpx 0rpx 30rpx 30rpx;
	overflow: hidden;
	.nickname {
		font-size: 33.33rpx;
		color: $color-f;
		text-align: center;
	}
	.avatar {
		margin: 34rpx auto;
	}
	.login {
		font-size: 33.33rpx;
		color: $color-f;
		text-align: center;
	}
}
	.operate {
		margin: -70rpx auto;
		// padding: 33.33rpx;
		width: 708.33rpx;
		height: 508.33rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 15rpx 0px #999999;
		border-radius: 6.94rpx;
		opacity: 1;
		.item_box {
			padding: 0 39.58rpx;
		}
		.item {
			padding: 39.58rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 0.69rpx solid #E0E0E0;
			.image {
				width: 37rpx;
				height: 37rpx;
				margin-right: 23.61rpx;
			}
		}
		.image_jt {
			width: 11.8rpx;
			height: 25rpx;
		}
	}
	.btn-submit {
		// margin-top: 146rpx;
	}
	.bottom_text {
		text-align: center;
		font-size: 25rpx;
		font-weight: 400;
		color: $color-9;
	}
</style>