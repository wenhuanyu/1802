<template>
	<view class="background fix-padding">
		<view class="container">
			<view class="title_box">
				<view class="title_name">{{nickname}}</view>
				<view class="flex">
					<view class="title_box_list">
						<view class="title-fs">￥{{total.apply_total_money}}</view>
						<view class="title_value">申请金额(元)</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">￥{{total.check_total_money}}</view>
						<view class="title_value">审批金额(元)</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{total.ju_total_money}}</view>
						<view class="title_value">已付金额(元)</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="list_box container"> 
			<view class="item" v-for="(item,index) in list" :key="index" @click="details(item)">
				<view class="top">
					<view>{{item.order_num}}</view>
					<view>{{item.create_time}}</view>
				</view>
				<view class="bottom">
					<view>
						<view style="margin-bottom: 20rpx;">
							<view v-if="count == 0">类别：{{item.expense_name}}</view>
							<view v-else></view>
						</view>
						<view>
							<view v-if="count == 2">总申请金额：{{item.money}}元</view>
							<view v-else>申请金额：{{item.money}}元</view>
						</view>
					</view>
					<view>
						<image v-if="item.status == 0" :src="icon[12].icon"></image>
						<image v-if="item.status == 2" :src="icon[13].icon"></image>
						<image v-if="item.status == 1" :src="icon[14 ].icon"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<view @click="detailsClick">查看</view>
					<view @click="delClick">删除</view>
				</view>
			</view>
		</view>
		<view class="container  fix-bottom flex">
		    <button class="btn-submit" @click="transaction">事务申请</button>
			<button class="btn-submit" @click="standby">备用金申请</button>
			<button class="btn-submit" @click="tiaozhuan('feiyong')">费用报销</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					"事务申请",
					"备用金申请",
					"费用报销"
				],
				count:0,
				list:[
				],
				total:{
					apply_total_money:'',
					check_total_money:'',
					ju_total_money:'',
				},
				page:1,
				nickname:'',
				icon:[],
				show:false,
				id:'',
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			this.http({
				url: this.api.My_Data,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
				},
				success: res => {
					this.nickname = res.name
				}
			})
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			// 接口
			this.http({
				url:this.api.Apply_applyList,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					action:this.count+1,
					page:this.page
				},
				success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
					}
					this.total = res.total
				}
			})
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Apply_applyList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						action:this.count+1,
						page:this.page
					},
					success: res => {
						this.page+=1
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.list = res.list
						this.total = res.total
					}
				})
			},
			// tab栏点击事件
			change(e) {
				this.page = 1
				console.log(e)
				this.count = e
				this.listInterface()
			},
			// 跳转
			tiaozhuan(i) {
				console.log(i)
				if(i=='feiyong') {
					uni.navigateTo({
						// url:'/pages/warehouse/add/add?data='+encodeURIComponent(JSON.stringify(eve))
						url:'/pagesA/pages/baoxiao/reimbursement/reimbursement'
					})
				}
			},
			// 事务申请
			transaction() {
				uni.navigateTo({
					url:'/pagesA/pages/baoxiao/transaction/transaction'
				})
			},
			// 备用金申请申请
			standby() {
				uni.navigateTo({
					url:'/pagesA/pages/baoxiao/standby/standby'
				})
			},
			// 弹框
			details(eve) {
				this.show = true
				this.id = eve
			},
			// 关闭弹窗
			closeModal() {
				this.show = false
			},
			// 删除点击
			delClick() {
				this.show = false
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Apply_delete_apply,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									id:this.id.id,
									action:this.count+1
								},
								success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									this.page = 1
									this.listInterface()
								}
							})
						}		
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 详情点击
			detailsClick() {
				this.show = false
				if(this.count == 0) {
					uni.navigateTo({
						url:'/pagesA/pages/baoxiao/transactionDetails/transactionDetails?data='+encodeURIComponent(JSON.stringify(this.id))
					})
				} else if (this.count == 1) {
					uni.navigateTo({
						url:'/pagesA/pages/baoxiao/standbyDetails/standbyDetails?data='+encodeURIComponent(JSON.stringify(this.id))
					})
				} else {
					uni.navigateTo({
						url:'/pagesA/pages/baoxiao/reimbursementDetails/reimbursementDetails?data='+encodeURIComponent(JSON.stringify(this.id))
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.list_box {
	.item {
		margin-top: 34.02rpx;
		padding: 0 36.11rpx;
		font-weight: 400;
		background: $color-f;
		box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
		border-radius: 10.41rpx;
	}
	.top {
		font-size: 29.16rpx;
		color: $color-9;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 22.22rpx 0;
		border-bottom: 0.69rpx dashed #CCCCCC;
	}
	.bottom {
		font-size: 29.16rpx;
		color: $color-3;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 31.94rpx 0;
	}
	image {
		width: 102.77rpx;
		height: 76.38rpx;
	}
}

.tab {
	padding: 0 27.08rpx;
}
.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 4.86rpx solid #4C9D57;
}
.btn-submit {
	width: 32%;
	border-radius: 0;
	margin: 0;
	background: #4C9D57;
}
.fix-bottom {
	padding: 0;
	justify-content: space-between;
}
</style>
