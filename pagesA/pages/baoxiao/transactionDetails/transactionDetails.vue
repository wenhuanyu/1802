<template>
	<view>
		<view class="good container">
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
				<view class="title">报销类别</view><text class="title_color">：</text>
				<input class="input" v-model="form.expense_name" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">姓名</view><text class="title_color">：</text>
				<input class="input" v-model="form.nickname" placeholder="请输入"disabled></input>
			</view>
			<view class="group">
				<view class="title">卡号</view><text class="title_color">：</text>
				<input class="input" v-model="form.card" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">开户行及网点</view><text class="title_color">：</text>
				<input class="input" v-model="form.bank" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">申请金额</view><text class="title_color">：</text>
				<input class="input" v-model="form.money" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">备注</view><text class="title_color">：</text>
				<input class="input" v-model="form.remark" placeholder="请输入" disabled></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in form.image" :key='index'>
						<image class="image" :src="item" @click="previewImage(index)" mode="aspectFill"></image>
					</view>
					<view class="item" v-if="form.image.length == 0">
						<image class="image" :src="icon[15].icon"></image>
					</view>
				</view>
			</view>
			<view class="group">
				<view class="title">提交时间</view><text class="title_color">：</text>
				<input class="input" v-model="form.create_time" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">审核状态</view><text class="title_color">：</text>
				<view class="input" style="display: flex;align-items: center;color: #FFAE00;" v-if="form.status == 0">审批中</view>
				<view class="input" style="display: flex;align-items: center;color: #4C9D57;" v-if="form.status == 1">已支付</view>
				<view class="input" style="display: flex;align-items: center;color: #CA0000;" v-if="form.status == 2">未通过</view>
			</view>
			<view class="group" v-if="form.status == 1 || form.status == 2">
				<view class="title">审核时间</view><text class="title_color">：</text>
				<input class="input" v-model="form.check_time" placeholder="请输入" disabled></input>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{},
				data:{}
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			if(option.data) {
				this.data = JSON.parse(decodeURIComponent(option.data))
			}
			this.listInterface()
			setTimeout(() =>{
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: this.form.status_name
				});
			},500)
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Apply_applyDetail,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						action:1,
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
		}
	}
</script>

<style lang="scss">
.picker {
    width: 500rpx;
    height: 80rpx;
    border-radius: 8rpx;
    // border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
	font-size: 28rpx;
}
.remarkImage {
    .item_image {
		width: 434rpx;
		height: 274rpx;
		background: #F2F2F2;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
        position: relative;
		// margin-bottom: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
        .image {
            width: 80rpx;
            height: 80rpx;
            object-fit: cover;
        }
		.image_list {
			width: 434rpx;
			height: 274rpx;
		}
    }
}
</style>
