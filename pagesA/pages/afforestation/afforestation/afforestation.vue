<template>
	<view>
		<view class="container search flex">
			<!-- <view class="search_right" @click="shaixuan">
				筛选
				<image :src="icon[32].icon"></image>
			</view> -->
			<view>
				<image src="../../../../static/image/common/time1.png" style="width: 40rpx;height: 50rpx;" v-if="sort == 1" @click="soreOne"></image>
				<image src="../../../../static/image/common/time.png" style="width: 40rpx;height: 50rpx;" v-if="sort == 2" @click="soreTwo"></image>
			</view>
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view>
		</view>
		<view class="operate">
		    <view v-for="(item,index) in list" :key="index" >
		    	<view class="item_box">
					<view class="item" @click="detail(item)">
						<view class="flex">
							<view class="icon_title">{{item.quartel_name}}</view>
						</view>
						<view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
				</view>
		    </view>
		</view>
		<!-- <view v-show="show" class="modal_left" @click="closeModal">
			<view class="modal-main" @click.stop>
				<view class="top container">
					<image :src="icon[35].icon"></image>
					创建时间
				</view> -->
				<!-- tab栏 -->
				<!-- <view class="tab">
					<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == item.id}" @click="change(item.id)">
						<view>{{item.name}}</view>
					</view>
				</view> -->
				<!-- <view class="operate"  style="height: 1100rpx;overflow: hidden;overflow-y: scroll;">
				    <view v-for="(item,index) in list_date" :key="index">
				    	<view class="item_box">
							<view class="item" @click="dateClick(item.quartel_time)">
								<view class="flex">
									<view class="icon_title fs">{{item.quartel_time}}</view>
								</view>
								<view>
									<image :src="icon[28].icon" class="image_jt"></image>
								</view>
							</view>
						</view>
				    </view>
				</view> -->
				<!-- <view class="bottom_button">
					<button class="left">重置</button>
					<button class="right">确认</button>
			<!-- 	</view> -->
			<!-- </view> -->
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				search_name:'',
				list_date:[],
				// items:[
				// 	{
				// 		id:1,
				// 		name:"最新创建",
				// 	},
				// 	{
				// 		id:2,
				// 		name:"最晚创建",
				// 	}
				// ],
				count:1,
				show: false,
				time:'',
				icon:[],
				page:0,
				sort:1,
			}
		},
		onShow() {
			this.page = 0
			this.icon = this.common.get("icon")
			this.listInterface()
			this.listDate()
		},
		//上拉触底函数
		onReachBottom(){
			// 出库记录接口
			this.http({
				url: this.api.QuartelIndex,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					type:1,
					keyword:this.search_name,
					time:this.time,
					page:this.page,
					sort:this.sort
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
				}, 
			})
		},
		methods: {
			soreOne() {
				this.sort = 2
				this.page = 0
				this.listInterface()
			},
			soreTwo() {
				this.sort = 1
				this.page = 0
				this.listInterface()
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.QuartelIndex,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:1,
						keyword:this.search_name,
						time:this.time,
						page:this.page,
						sort:this.sort
					},
					success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
						this.page+=1
						this.list = res.list
					}
				})
			},
			listDate() {
				this.http({
					url:this.api.addQuarset_time,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:1,
						timestamp:this.count
					},
					success: res => {
						this.list_date = res
					}
				})
			},
			// 搜索
			search(e) {
				this.search_name = e
				this.page = 0
				this.listInterface()
			},
			dateClick(e) {
				this.time = e
				this.show = false
				this.page = 0
				this.listInterface()
			},
			// 筛选点击
			shaixuan() {
				this.show = true
			},
			// 关闭弹窗
			closeModal() {
				this.show = false
			},
			// tab栏点击事件
			change(e) {
				this.count = e
				this.listDate()
			},
			// 详情点击
			detail(eve) {
				this.common.set('zaolin', eve)
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/detail/detail?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
			// 添加
			add() {
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/add/add'
				})
			}
		}
	}
</script>

<style lang="scss">
.search {
	.input {
		width: 560rpx;
	}
}

</style>
