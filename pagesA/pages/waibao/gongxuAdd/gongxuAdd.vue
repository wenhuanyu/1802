<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <input class="input" v-model="name" placeholder="请输入工序" ></input>
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
				name:'',
				id:'',
				button:'添加',
			}
		},
		onLoad(option) {
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '编辑工序'
				});
				this.button = '编辑'
				this.id = JSON.parse(decodeURIComponent(option.data)).id
				this.name = JSON.parse(decodeURIComponent(option.data)).name
			} else  {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '添加工序'
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
				if(this.id) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_edit_process,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										name:this.name,
										id:this.id
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
							}				
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_add_process,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										name:this.name
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
						},
						fail: () => {},
						complete: () => {}
					});
				}
				
			}
		}
	}
</script>

<style lang="scss">
.good {
	padding: 0 22.22rpx;
	.group{
		justify-content: space-between;
	}
}
</style>
