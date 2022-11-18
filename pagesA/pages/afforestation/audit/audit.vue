<template>
	<view>
		<!-- <view class="container search">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input"  @input="search($event)" v-model="search_name" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view>
		</view> -->
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index">
		    	<view class="item_box">
					<view class="item" >
						<view class="flex">
							<view class="icon_title">{{item.emplo_name}}</view>
						</view>
						<view class="flex">
							<view>{{item.type_name}}</view>
							<!-- <image :src="icon[28].icon" class="image_jt"></image> -->
						</view>
					</view>
				</view> 
		    </view>
		</view>
		<!-- <view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<view @click="detailsClick">查看</view>
					<!-- <view @click="editClick">编辑</view> -->
					<!-- <view @click="delClick">删除</view> -->
				<!-- </view> -->
			<!-- </view> -->
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				// search_name:'',
				data:'',
				// show:false,
				id:'',
				peasant_id:'',
				icon:[],
			}
		},
		onShow(option) {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '审核人员管理-'+this.data.quartel_name+this.data.quartel_account
			});
			this.listInterface()
		},
		methods: {
			// 弹框
			// detail(eve) {
			// 	this.show = true
			// 	this.id = eve.id
			// 	this.peasant_id = eve.peasant_id
			// },
			// 关闭弹窗
			// closeModal() {
			// 	this.show = false
			// },
			// 删除
			// delClick() {
			// 	this.show = false 
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '确定要删除当前民工吗？',
			// 		success: res => {
			// 			if(res.confirm) { 
			// 				this.http({
			// 					url:this.api.contact_dels,
			// 					method: "POST",
			// 					data: {
			// 						uid: this.common.get("uid"),
			// 						token: this.common.get("token"),
			// 						contact_type:3,
			// 						id:this.peasant_id,
			// 					},
			// 					success: res => {
			// 						this.page = 1
			// 						this.listInterface()
			// 					}
			// 				})
			// 			}
								
			// 		},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
				
			// },
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.contact_check_personnel,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
				    },
				    success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
				        this.list = res.list
				    }
				})
			},
			// 搜索
			// search(e) {
			// 	this.search_name = e
			// 	this.listInterface()
			// },
			// 添加
			// add() {
			// 	uni.navigateTo({
			// 		url:'/pages/fell/management/add/add'
			// 	})
			// },
			// 详情
			// detailsClick() {
			// 	this.show = false
			// 	uni.navigateTo({
			// 		url:'/pages/fell/management/details/details?data='+encodeURIComponent(JSON.stringify(this.id))
			// 	})
			// },
		}
	}
</script>

<style lang="scss">
.search {
	.input {
		width: 640rpx;
	}
}

</style>
