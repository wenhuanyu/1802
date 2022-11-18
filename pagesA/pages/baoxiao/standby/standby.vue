<template>
	<view class="fix-padding">
		<view class="good container">
			<view class="group">
				<view class="title">单号</view><text class="title_color">：</text>
				<input class="input" v-model="order_num" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">林班类型</view><text class="title_color">：</text>
				<picker class="picker" @change="changeType" :value="tIndex" :range="typeList" :range-key="'name'">
				    <view v-if="tIndex == -1" class="uni-input">请选择</view>
				    <view v-else class="uni-input">{{typeList[tIndex].name}}</view>
				</picker>
			</view>
			<view class="group">
				<view class="title">林班名称</view><text class="title_color">：</text>
				<picker class="picker" @change="changeNum" :value="nIndex" :range="NumList" :range-key="'quartel_name'">
				    <view v-if="nIndex == -1" class="uni-input">请选择</view>
				    <view v-else class="uni-input">{{NumList[nIndex].quartel_name}}</view>
				</picker>
			</view>
			<view class="group">
				<view class="title">申请金额</view><text class="title_color">：</text>
				<input class="input" v-model="money" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">备注</view><text class="title_color">：</text>
				<input class="input" v-model="remark" placeholder="请输入"></input>
			</view>
		</view>	
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				profession:[],
				remarkImage:[],
				tIndex:-1,
				typeList:[
					{
						id:1,
						name:'造林'
					},
					{
						id:2,
						name:'砍伐'
					},
					
				],
				nIndex:-1,
				NumList:[],
				order_num:'',
				remark:'',
				money:''
			}
		},
		onLoad() {
			// 获取单号
			this.http({
				url:this.api.Apply_order_num,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					type:2
				},
				success: res => {
					this.order_num = res.order_num
				}
			})
		},
		methods: {
			// 类型
			changeType(e) {
				this.tIndex = e.target.value
				this.nIndex = -1
				this.http({
					url:this.api.newQuartelList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:this.typeList[this.tIndex].id
					},
					success: res => {
						this.NumList = res.list
					}
				})
			},
			// 林班号
			changeNum(e) {
				this.nIndex = e.target.value
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
			// 提交按钮
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Apply_apply_standby,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									type:this.typeList[this.tIndex].id,
									order_num:this.order_num,
									quartel_id:this.NumList[this.nIndex].id,
									money:this.money,
									remark:this.remark,
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
        margin-top: 24rpx;
		margin-bottom: 50rpx;
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
