<template>
	<view>
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == item.id}" @click="change(item.id)">
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="container search flex">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<!-- <view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view> -->
		</view>
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index">
				<view class="item_box">
					<view class="item" @click="detail(item)">
						<view class="flex">
							<view class="icon_title">{{index+1}}.{{item.nick_name}}</view>
						</view>
						<view class="icon_text flex" style="font-size: 30rpx;">
							<view v-if="count==2">{{item.job_name}}</view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<view @click="detailsClick">查看</view>
					<view @click="editClick">编辑</view>
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
				items:[
					{
						id:1,
						name:"造林",
					},
					{
						id:2,
						name:"砍伐",
					}
				],
				count:1,
				// page:1,
				show:false,
				id:'',
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			// this.page = 1
			this.listInterface()
		},
		//上拉触底函数
		// onReachBottom(){
		// 	// 接口
		// 	this.http({
		// 		url:this.api.peasantList,
		// 		method: "POST",
		// 		data: {
		// 			uid: this.common.get("uid"),
		// 			token: this.common.get("token"),
		// 			nick_name:this.search_name,
		// 			type:this.count,
		// 			// page:this.page
		// 		},
		// 		success: res => {
		// 			this.page+=1
		// 			if(res.list.length == 0) {
		// 				uni.showToast({
		// 					title:'没有更多了',
		// 					icon:'none',
		// 					duration: 2000
		// 				})
		// 			} else {
		// 				this.list = this.list.concat(res.list)
		// 			}
		// 		}
		// 	})
		// },
		methods: {
			// 关闭弹窗
			closeModal() {
				console.log(1111)
				this.show = false
			},
			// tab栏点击事件
			change(e) {
				this.count = e
				// this.page = 1
				this.listInterface()
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.peasantList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						nick_name:this.search_name,
						type:this.count,
						// page:this.page
					},
					success: res => {
						// this.page+=1
						this.list = res.list
					}
				})
			},
			// 搜索
			search(e) {
				this.search_name = e
				// this.page = 1
				this.listInterface()
			},
			// 弹框
			detail(eve) {
				this.show = true
				this.id = eve.id
			},
			// 详情点击
			detailsClick() {
				this.show = false
				uni.navigateTo({
					url:'/pagesA/pages/workers/details/details?data='+encodeURIComponent(JSON.stringify(this.id))
				})
			},
			// 编辑
			editClick() {
				this.show = false
				uni.navigateTo({
					url:'/pagesA/pages/workers/edit/edit?data='+encodeURIComponent(JSON.stringify(this.id))
				})
			}
			// 添加
			// add() {
			// 	uni.navigateTo({
			// 		url:'/pages/afforestation/add/add'
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
.search {
	.input {
		width: 708rpx;
	}
}
.tab {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	font-size: 29rpx;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	color: $color-3;
}
.btna {
	height: 73.61rpx;
	line-height: 73.61rpx;
	text-align: center;
	border-bottom: 1.38rpx solid #4C9D57;
	color: #4C9D57;
}
</style>
