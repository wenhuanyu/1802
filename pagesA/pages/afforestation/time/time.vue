<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <view class="title">开工时间：</view>
				<view class="icon_text fs flex">
					<uni-datetime-picker disabled class="date-picker" ref="formDate" :value="form.quartel_time" @change="changeDate($event,'quartel_time')" type="date" placeholder="请选择"/>
					<image :src="icon[28].icon" class="image_jt"></image>
				</view>
			    
			</view>
			<view class="group">
			    <view class="title">完工时间：</view>
			    <view class="icon_text fs flex">
			    	<uni-datetime-picker class="date-picker" ref="formDate" :value="form.complete_time" @change="changeDate($event,'complete_time')" type="date" placeholder="请选择"/>
			    	<image :src="icon[28].icon" class="image_jt"></image>
			    </view>
			</view>
		</view>
		<view class="container  fix-bottom">
		    <button class="btn-submit" @click="add">保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					quartel_time:'',
					complete_time:'',
				},
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: this.data.quartel_name+this.data.quartel_account
			});
			this.http({
			    url: this.api.quartel_time,
			    method: "POST",
			    data: {
			       uid: this.common.get("uid"),
			       token:this.common.get("token"),
			       quartel_id:this.data.id,
			    },
			    success: res => {
			        this.form.quartel_time = res.quartel_time
			        this.form.complete_time = res.complete_time
			    }
			})
		},
		methods: {
			changeDate(eve,i) {
				if(i == 'quartel_time') {
					this.form.quartel_time = eve
				} else {
					this.form.complete_time = eve
				}
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
			// 添加/编辑按钮点击
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.quartel_savetime,
								method:"POST",
								data:{
									uid: this.common.get("uid"),
									token:this.common.get("token"),
									quartel_id:this.data.id,
									...this.form
								},
								success:res=>{
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
.good {
	padding: 0 21.52rpx;
	.group {
		justify-content: space-between;
		.title {
			width: 140rpx;
		}
		.date-picker {
			border: none!important;
		}
		.uni-date-x--border {
			width: 190.27rpx;
			border: none!important;
		}
		.uni-date__x-input {
			min-height: 92.36rpx;
			line-height: 92.36rpx;
			color: $color-3;
			text-align: right;
		}
		.image_jt {
			width: 11.8rpx;
			height: 25rpx;
			margin-left: 10rpx;
		}
	}
}

</style>
