<template>
	<view>
		<view class="container search">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input" @input="search($event)" v-model="search_name" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view>
		</view>
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index">
		    	<view class="item_box">
					<view class="item" @click="detail(item)">
						<view class="flex">
							<view class="icon_title">{{item.pro_name}}</view>
						</view>
						<view class="flex">
							<view class="icon_title">￥{{item.wage}}</view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
				</view> 
		    </view>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<!-- <view @click="detailsClick">查看</view> -->
					<view @click="editClick">编辑</view>
					<view @click="delClick">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				search_name:'',
				data:'',
				show:false,
				id:'',
				edit:'',
				icon:[],
			}
		},
		onShow(option) {
			this.icon = this.common.get("icon")
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '单价管理-'+this.data.quartel_name
			});
			this.listInterface()
		},
		methods: {
			// 弹框
			detail(eve) {
				this.show = true
				this.id = eve.id
				this.edit = eve 
			},
			// 关闭弹窗
			closeModal() {
				this.show = false
			},
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.getPositionList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						contact_type:6,
				        name: this.search_name,
						quartel_id:this.data.id,
				    },
				    success: res => {
				        this.list = res.list
				    }
				})
			},
			// 搜索
			search(e) {
				this.search_name = e
				this.listInterface()
			},
			// 删除
			delClick() {
				this.show = false 
				uni.showModal({
					title: '提示',
					content: '确定要删除当前单价吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.contact_dels,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									contact_type:6,
									id:this.id,
								},
								success: res => {
									this.listInterface()
								}
							})
						}
								
					},
					fail: () => {},
					complete: () => {}
				});
			},
			add() {
				uni.navigateTo({
					url: "/pagesA/pages/fell/price/add/add"
				})
			},
			// 编辑点击
			editClick() {
				this.show = false
				uni.navigateTo({
					url:'/pagesA/pages/fell/price/add/add?data='+encodeURIComponent(JSON.stringify(this.edit))
				})
			}
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
