<template>
	<view @click="hideShow">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="container search flex">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<view class="search_right" @click="shaixuan">
				筛选
				<image :src="icon[32].icon"></image>
			</view>
		</view>
		<view>
			<view v-for="(item,index) in list" :key="index" class="list_box" @click="details(item)">
				<view class="flex item">
					<view class="mr-10 color">申请人：</view>
					<view>{{item.emplo_name}}-{{item.quartel_name}}</view>
				</view>
				<view class="flex item">
					<view class="mr-10 color">申请金额：</view>
					<view>{{item.per_amount}}元</view>
				</view>
				<view class="flex item">
					<view class="mr-10 color">申请时间：</view>
					<view>{{item.pre_time}}</view>
				</view>
				<view class="flex item mb">
					<view class="mr-10 color">申请状态：</view>
					<view v-if="item.status == 0" style="color: #FFAE00;">{{item.status_name}}</view>
					<view v-if="item.status == 1" style="color: #4C9D57;">{{item.status_name}}</view>
					<view v-if="item.status == 2" style="color: #CA0000;">{{item.status_name}}</view>
				</view>
			</view>
		</view>
		<view v-show="show" class="modal_left" @click="closeModal" >
			<view class="modal-main" @click.stop>
				<view class="top container">
					<image :src="icon[35].icon"></image>
					时间范围
				</view>
				<view class="flex time-box">
					<uni-datetime-picker class="date-picker" ref="formDate" :value="start_time" @change="changeDate($event,'start_time')" type="date" placeholder="开始时间"/>
					<uni-datetime-picker class="date-picker" ref="formDate" :value="end_time" @change="changeDate($event,'end_time')" type="date" placeholder="截至时间"/>
				</view>
				<!-- <view class="top container" >
					林班：{{pro_name}}
				</view> -->
				<view class="operate" style="height: 800rpx;overflow: hidden;overflow-y: scroll;">
					<view>
						<view class="item" style="padding: 33.33rpx 39.58rpx;">
							<view class="flex">
								<view class="icon_title fs">林班：</view>
							</view>
							<view class="icon_text fs">
								 <input
								 	class="input" 
								 	type="text" 
								 	placeholder="请选择林班"
								 	v-model="pro_name" 
								 	@focus="search_site($event,'pro_name')" 
								 	@input="search_site($event,'pro_name')"
								 	@blur="search_blur($event,'pro_name')"
								 />
								 <!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
								 <view  class="group_down" v-if="pro_nameShow">
								 	<view v-for="item in linbanList" :key="item.id" class="group_down_list" :class="{group_down_index:quartel_id == item.id}">
								 		<view @click="toDetail(item,'pro_name')" >{{item.quartel_name}}</view>
								 	</view>
								 </view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom_button">
					<button class="left" @click="chongzhi">重置</button>
					<button class="right" @click="search_modal">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					"待审核",
					"已审核"
				],
				count:0,
				list:[],
				icon:[],
				start_time:'',
				end_time:'',
				show:false,
				linbanList:[],
				linbanIndex:-1,
				quartel_id:'',
				pro_name:'',
				search_name:'',
				page:1,
				pro_nameShow:false
			}
		},
		onLoad() {
			this.page = 1
			this.icon = this.common.get("icon")
			
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			this.http({
				url: this.api.Quartel_prepaidList,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					quartel_id:this.quartel_id,
					emplo_name:this.search_name,
					start_time:this.start_time,
					end_time:this.end_time,
					status:this.count,
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
				}
			})
		},
		methods: {
			hideShow() {
				this.pro_nameShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'pro_name') {
						// this.pro_nameShow = false
						if(this.quartel_id=='') {
							this.pro_name = ''
						} else {
							this.linbanList.map((item,index) => {
								if(this.quartel_id == item.id) {
									this.pro_name = item.quartel_name
								}
							})
						}			
					}
				},200)
			},
			// 下拉框文字选择
			toDetail(event,text) {
				console.log('toDetailevent',event)
				console.log('toDetailtext',text)
				if(text == 'pro_name') {
					this.quartel_id = event.id
					this.pro_name = event.quartel_name
					this.pro_nameShow = false
				}
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'pro_name') {
					this.pro_nameShow = true
					// 林班列表
					this.http({
						url:this.api.Quartel_quartelList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							name:search_name
						},
						success: res => {
							this.linbanList = res.list
						}
					})
				}
			},
			// 重置
			chongzhi() {
				this.quartel_id = ''
				this.start_time = ''
				this.end_time = ''
				this.pro_name = ''
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.Quartel_prepaidList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						quartel_id:this.quartel_id,
						emplo_name:this.search_name,
						start_time:this.start_time,
						end_time:this.end_time,
						status:this.count,
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
					}
				})
			},
			// 搜索
			search(e) {
				this.search_name = e
				this.page = 1
				this.listInterface()
			},
			// 选择日期
			changeDate(eve,i) {
				if(i == 'start_time') {
					this.start_time = eve
				} else {
					this.end_time = eve
				}
				
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
				console.log(e)
				this.count = e
				this.page = 1
				this.chongzhi()
				this.listInterface()
			},
			search_modal() {
				this.page = 1
				this.listInterface()
				this.show = false
			},
			// 详情点击
			details(eve) {
				uni.navigateTo({
					url:'/pagesA/pages/audit/audit_xiangqing/audit_xiangqing?data='+encodeURIComponent(JSON.stringify(eve))
				})
			},
		}
	}
</script>

<style lang="scss">
.picker {
	width: 320rpx;
	.uni-input {
		text-align: right;
		width: 300rpx;
	}
}
.top_click {
	width: 180rpx;
	background: $color-f;
	padding: 20rpx;
	border-radius: 6rpx;
	text-align: center;
}
.search {
	.input {
		width: 610rpx;
	}
}
.tab {
	padding: 18.75rpx 27.08rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	font-size: 29.16rpx;
	color: $color-3;
}
.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 0.69rpx solid #4C9D57;
}
.list_box {
	font-size: 29.16rpx 31.25rpx;
	font-weight: 400;
	color: $color-3;
	padding: 36.8rpx;
	background: $color-f;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	border-radius: 6.94rpx;
	margin-bottom: 20.13rpx;
	.item {
		display: flex;
		margin-bottom: 24.3rpx;
		padding-bottom: 24.3rpx;
		border-bottom: 0.69rpx solid #E0E0E0;
	}
	.mb {
		margin-bottom: 0;
		padding-bottom: 0;
		border: none;
	}
	.color {
		color: $color-9;
	}
}
</style>
