<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
				<input class="input" v-model="form.name" placeholder="请输入品名" ></input>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">{{button}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					name:''
				},
				button:'添加',
				data:'',
				edit:'',
			}
		},
		onLoad(option) {
			this.data = this.common.get("kanfa")
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '品名编辑-'+this.data.quartel_name
				});
				this.button = '编辑'
				this.form = JSON.parse(decodeURIComponent(option.data))
			} else  {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '品名添加-'+this.data.quartel_name
				});
			}
			
		},
		methods: {
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
			// 添加/编辑按钮点击
			add() {
				if(this.form.id) {
					this.http({
						url:this.api.contact_edit,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.data.id,
							contact_type:1,
							...this.form
						},
						success: res => {
							uni.showToast({
								title:'编辑成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				} else {
					this.http({
						url:this.api.addContact,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.data.id,
							contact_type:1,
							...this.form
						},
						success: res => {
							uni.showToast({
								title:'添加成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				}
				
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
	display: flex;
	justify-content: space-between;
	align-items: center;
	.input{
		margin: 0;
		color: $color-9;
		font-size: 33.33rpx;
	}
}
</style>
