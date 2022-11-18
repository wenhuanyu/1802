<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <input class="input" type="password" v-model=" old_pass" placeholder="请输入原密码" ></input>
			</view>
			<view class="group">
			    <input class="input" type="password" v-model="new_pass" placeholder="请输入新密码"></input>
			</view>
			<view class="group">
			    <input class="input" type="password" v-model="new_pass_last" placeholder="请再次输入新密码"></input>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				old_pass:'',
				new_pass:'',
				new_pass_last:'',
			}
		},
		onLoad() {
			
		},
		methods: {
			// 添加/编辑按钮点击
			add() {                
				if(this.old_pass=='') {
					uni.showToast({
					    title: "请输入原密码",
					    icon: "none"
					})
					return;
				}
				if(this.new_pass=='') {
					uni.showToast({
					    title: "请输入新密码",
					    icon: "none"
					})
					return;
				}
				if(this.new_pass_last=='') {
					uni.showToast({
					    title: "请再次输入新密码",
					    icon: "none"
					})
					return;
				}
				if(this.new_pass !==this.new_pass_last) {
					uni.showToast({
					    title: "两次输入的新密码不同，请重新输入",
					    icon: "none"
					})
					return;
				}
				this.http({
					url: this.api.change_password,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						old_pass:this.old_pass,
						new_pass:this.new_pass
					},
					success: res => {
						this.common.set("uid", res.uid)
						uni.showToast({
						    title: "修改成功，请重新登录",
						    icon: "none"
						})
						setTimeout(() =>{
							// 跳转  关闭所有页面跳到指定页面
							uni.reLaunch({
								url: "/pagesB/pages/login/login"
							})
						},500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.good {
	padding: 0 22.22rpx;
}
.group{
	border-bottom: 0.69rpx solid #E0E0E0;
	.input{
		margin: 0;
		color: $color-9;
		font-size: 33.33rpx;
	}
}
</style>
