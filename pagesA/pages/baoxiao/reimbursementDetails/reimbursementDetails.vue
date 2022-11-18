<template>
	<view class="background">
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
				<view class="title">林班号</view><text class="title_color">：</text>
				<input class="input" v-model="form.quartel_name" placeholder="请输入" disabled></input>
			</view>
			<view v-for="(item,index) in form.detail" :key="item.id">
				<view class="add_title">第{{index+1}}笔</view>
				<view class="add_list">
					<view class="group">
						<view class="title">报销类别</view><text class="title_color">：</text>
						<view class="outModal" @click="openModal(index)">
							<input class="input" v-model="item.expense_name" placeholder="请选择" disabled></input>
						</view>
					</view>
					<view class="group">
						<view class="title">报销金额</view><text class="title_color">：</text>
						<input class="input" :value="item.money" placeholder="请输入" @input="money($event,index)"></input>
					</view>
					<view class="group border">
						<view class="title">备注</view><text class="title_color">：</text>
						<input class="input" v-model="item.remark" placeholder="请输入"></input>
					</view>
				</view>
			</view>
			<view class="group">
				<view class="title">报销总额</view><text class="title_color">：</text>
				<input class="input" style="color:#4C9D57 ;" v-model="form.total_money" placeholder="请输入" disabled></input>
			</view>
			<view class="group_image">
				<view class="title">图片：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in form.image" :key='index'>
						<image class="image" :src="item" @click="previewImage(index)"></image>
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
				data:{},
				icon:[],
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
						action:3,
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
.good {
	padding: 0 21.52rpx;
	.group {
		.title {
			color: $color-3;
		}
		.title-color {
			color: $color-3;
		}
	}
}
.add_title {
	width: 181.94rpx;
	height: 71.52rpx;
	line-height: 71.52rpx;
	margin-top: 47.22rpx;
	font-size: 37.5rpx;
	font-weight: 500;
	color: #4C9D57;
	text-align: center;
	box-shadow: 0px 0px 20.83rpx 0px rgba(76, 157, 87, 0.3);
	border-radius: 36.11rpx;
}
.add_list {
	margin-top: 24.3rpx;
	padding: 0 36.8rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	border-radius: 6.94rpx;
	.group {
		.title {
			width: 130rpx;
		}
		.input {
			width: 430rpx;
		}
	}
	.border {
		border: none;
	}
}
.group_image {
	.title {
		padding: 25.69rpx 0 0 0;
	}
}
</style>
