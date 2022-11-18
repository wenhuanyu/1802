<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
				<view class="title">设备名称</view><text class="title_color">：</text>
				<input class="input" v-model="form.name" placeholder="请输入设备名称" ></input>
			</view>
			<view class="group">
				<view class="title">设备序列号</view><text class="title_color">：</text>
				<input class="input" v-model="form.serial_number" placeholder="请输入设备序列号" ></input>
			</view>
			<view class="group">
				<view class="title">默认通道号</view><text class="title_color">：</text>
				<input class="input" v-model="form.channel_number" placeholder="请输入默认通道号" ></input>
			</view>
			<view class="group">
				<view class="title">设备ip地址</view><text class="title_color">：</text>
				<input class="input" v-model="form.ip_address" placeholder="请输入设备ip地址" ></input>
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
				button:'添加',
				data:'',
				edit:'',
				form:{},
			}
		},
		onLoad(option) {
			this.data = this.common.get("kanfa")
			
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '摄像头编辑-'+this.data.quartel_name
				});
				this.button = '编辑'
				this.form = JSON.parse(decodeURIComponent(option.data))
			} else  {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '摄像头添加-'+this.data.quartel_name
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
							id:this.form.id,
							contact_type:8,
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
					console.log('this.data.id',this.data.id)
					this.http({
						url:this.api.addContact,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.data.id,
							contact_type:8,
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
.picker {
	width: 580rpx;
	text-align: left;
	height: 92.36rpx;
	line-height:92.36rpx ;
	.uni-input {
		width: 550rpx;
	}
}
.good {
	padding: 0 22.22rpx;
	.group{
		border-bottom: 0.69rpx solid #E0E0E0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			width: 145rpx;
		}
		.input{
			margin: 0;
			color: $color-9;
		}
	}
}

</style>
