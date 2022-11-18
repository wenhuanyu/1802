<template>
    <view class="container">
		<view class="logo_box">
			<image class="image" :src="icon[6].icon"></image>
		</view>
        <view class="clear"></view>
		<view class="input" style="margin-bottom: 45.13rpx;">
			<image class="image":src="icon[8].icon"></image>
			<input type="text" v-model="username" placeholder="请输入手机号" />
		</view>
        <view class="input">
			<image class="image":src="icon[7].icon"></image>
			<input type="password" v-model="password" placeholder="请输入密码" />
		</view>
        <button class="btn-submit" @click="bind">登录</button>
    </view>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                username: "",
                password: "",
                current: 0,
				icon:[],
            }
        },
        onLoad() {
			this.icon = this.common.get("icon")
        },
        methods: {
            change(e) {
                this.current = e.detail.current
            },
            bind() {
                this.http({
                    url: this.api.Login_newLogin,
                    method: "POST",
                    data: {
                        username: this.username,
                        password: this.password,
                        uid: this.common.get("uid")
                    },
                    success: res => {
                        this.common.set('uid', res.uid)
						this.common.set('token',res.token)
						var token  = res.token
						uni.setStorage({
							key:'token',
							data:token
						})
						// wx.setStorage({
						// ​	key:'token',
						// 	data:token
						// ​})
                        // this.common.set('state', res.binding_state)
                        uni.reLaunch({
                            url: "/pages/workbench/workbench/workbench"
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .container {
        padding: 0 60.41rpx;
		.logo_box {
			width: 100%;
			image{
				display: block;
				width: 372.22rpx;
				height: 197.22rpx;
				margin: 108.33rpx auto;
			}
		}
        .clear {
            margin-bottom: 50rpx;
        }

        .input {
            height: 100rpx;
			border-radius: 10.41rpx 10.41rpx 10.41rpx 10.41rpx;
			opacity: 1;
			border: 0.69rpx solid #CCCCCC;
			display: flex;
			align-items: center;
			font-size: 37.5rpx;
			font-weight: 400;
			color: $color-9;
			image {
				width: 33.33rpx;
				height: 44.44rpx;
				margin-right: 21.52rpx;
				margin-left: 43.75rpx;
			}
        }
        .btn-submit {
			height: 100rpx;
            margin-top: 56.25rpx;
            background: #FFFFFF linear-gradient(90deg, #64B36E 0%, #64B36E 0%, #4C9D57 100%, #4C9D57 100%);
			border-radius: 10.41rpx 10.41rpx 10.41rpx 10.41rpx;
        }
    }
</style>
