<template>
	<view class="background fix-padding" @click="hideShow">
		<view class="good">
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择林班名称"
					v-model="forms.quartel_account" 
					@focus="search_site($event,'quartel_account')" 
					@input="search_site($event,'quartel_account')"
					@blur="search_blur($event,'quartel_account')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="quartel_accountShow">
					<view v-for="item in ProcessList" :key="item.id" class="group_down_list" :class="{group_down_index:forms.quartel_id == item.id}">
						<view @click="toDetail(item,'quartel_account')" >{{item.quartel_name}}</view>
					</view>
				</view>
			</view>
			<view class="group" v-if="forms.quartel_id !== ''">
			    <view class="title">挖机</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择挖机"
					v-model="forms.wj_name" 
					@focus="search_site($event,'drivers_id')" 
					@input="search_site($event,'drivers_id')"
					@blur="search_blur($event,'drivers_id')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="driversShow">
					<view v-for="item in driversList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:forms.drivers_id == item.peasant_id}">
						<view @click="toDetail(item,'drivers_id')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group"  v-if="forms.quartel_id !== ''">
				<view class="title">中转车</view><text class="title_color">：</text>
				<view class="outModal" @click="openModal('zhongzhuanche')">
					<input class="input" v-model="car_zhong" placeholder="请选择" disabled style="margin-left: 30rpx;"></input>
				</view>
			</view>
			<view class="group"  v-if="forms.quartel_id !== ''">
			    <view class="title">油锯手</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择油锯手"
					v-model="forms.yjs_name" 
					@focus="search_site($event,'chain_saw_id')" 
					@input="search_site($event,'chain_saw_id')"
					@blur="search_blur($event,'chain_saw_id')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="chain_sawShow">
					<view v-for="item in chain_sawList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:forms.chain_saw_id == item.peasant_id}">
						<view @click="toDetail(item,'chain_saw_id')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.note" placeholder="请输入备注"></input>
			</view>
			<view v-show="showZhong" class="modal" >
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">中转车</view>
			            <image class="close" :src="icon[30].icon" @click="closeModal('zhongzhuanche')">
			            </image>
			        </view>
			        <view class="modal-box">
						<view class="search flex">
						    <uni-easyinput class="input" v-model="textZhong" @input="searchtextZhong($event)" placeholder="请输入查询信息"></uni-easyinput>
						</view>
			            <view class="content">
			               <view class="left">
			                    <view class="left_item" v-for="(item,index) in mingongList" :key = 'index' @click="Firstclick(item.id,'zhongzhuanche')"
								:class="{btna:count_I == item.id}">
									{{item.nick_name}}
								</view>
			                </view>
			                <view class="right">
			                    <view class="item_list" v-for="(item,index) in carList" :key="index" @click="selectGood(index,'zhongzhuanche')">
									<view class="icon_title">{{item}}</view>
									<image :src="icon[28].icon" class="image_jt"></image>
			                    </view>
			                </view>
			            </view>
			        </view>
			    </view>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">录入</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				icon:[],
				ProcessList:[],
				zhongzhuanList:[],
				driversList:[],
				chain_sawList:[],
				forms:{
					quartel_id:'',
					car_emplo_id:'',
					drivers_id:'',
					chain_saw_id:'',
					car_number:'',
					note:'',
				},
				quartel_accountShow:false,
				driversShow:false,
				car_zhong:'',
				car_zhong_name:'',
				showZhong: false,
				mingongList:[],
				carList:[],
				count_I:'',
				chain_sawShow:false,
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			
		},
		methods: {
			// 弹框搜索
			searchtextZhong(e) {
				let search =e
				this.http({
					url:this.api.getTruckList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.forms.quartel_id,
						type:5,
						nick_name:search,
					},
					success:res =>{
						this.mingongList = res.list
						this.count_I = ''
						this.carList =[]
					}
				})
			},
			// 一级分类点击
			Firstclick(eve,name) {
				if(name == 'zhongzhuanche') {
					this.count_I = eve
					this.mingongList.map((item,index)=>{
						if(this.count_I == item.id) {
							this.carList = item.transfer_car
							this.forms.car_emplo_id = item.peasant_id
							this.car_zhong_name = item.nick_name
						}
					})
					
				}
			},
			// 二级选择点击
			selectGood(i,name) {
				if(name == 'zhongzhuanche') {
					this.forms.car_number = this.carList[i]
					this.car_zhong = this.car_zhong_name + '-' +this.forms.car_number
					this.showZhong = false
				}
			},
			// 弹框
			openModal(name) {
				if(name=='zhongzhuanche') {
					// 中转车
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.forms.quartel_id,
							type:5
						},
						success:res =>{
							this.mingongList = res.list
						}
					})
					 this.showZhong = true
				}
			},
			// 弹窗关闭按钮
			closeModal(name) {
				if(name == 'zhongzhuanche') {
					this.showZhong = false
				}
			},
			hideShow() {
				this.quartel_accountShow = false
				this.driversShow = false
				this.chain_sawShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'quartel_account') {
						// this.quartel_accountShow = false
						if(this.forms.quartel_id=='') {
							this.forms.quartel_account = ''
						} else {
							this.ProcessList.map((item,index) => {
								if(this.forms.quartel_id == item.id) {
									this.forms.quartel_account = item.quartel_name
								}
							})
						}			
					} else if(text == 'drivers_id') {
						// this.driversShow = false
						if(this.forms.drivers_id=='') {
							this.forms.wj_name = ''
						} else {
							this.driversList.map((item,index) => {
								if(this.forms.drivers_id == item.peasant_id) {
									this.forms.wj_name = item.nick_name
								}
							})
						}			
					} else if(text == 'chain_saw_id') {
						// this.chain_sawShow = false
						if(this.forms.chain_saw_id=='') {
							this.forms.yjs_name = ''
						} else {
							this.chain_sawList.map((item,index) => {
								if(this.forms.chain_saw_id == item.peasant_id) {
									this.forms.yjs_name = item.nick_name
								}
							})
						}			
					}
				},200)
				
			},
			// 下拉框文字选择
			toDetail(event,text) {
				if(text == 'quartel_account') {
					console.log('event',event)
					this.forms.quartel_id = event.id
					this.forms.quartel_account = event.quartel_name
					this.forms.drivers_id = ''
					this.forms.wj_name = ''
					this.forms.yjs_name = ''
					this.forms.chain_saw_id = ''
					this.carList = []
					this.forms.car_emplo_id = ''
					this.car_zhong_name = ''
					this.forms.car_number = ''
					this.car_zhong = ''
					this.quartel_accountShow = false
				}else if(text == 'drivers_id') {
					this.forms.drivers_id = event.peasant_id
					this.forms.wj_name = event.nick_name
					this.driversShow = false
				} else if(text == 'chain_saw_id') {
					this.forms.chain_saw_id = event.peasant_id
					this.forms.yjs_name = event.nick_name
					this.chain_sawShow = false
				}
				
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'quartel_account') {
					this.quartel_accountShow = true
					// 林班
					this.http({
						url:this.api.my_data_quartelList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:2,
							quartel_name:search_name
						},
						success: res => {
							this.ProcessList = res.list
						}
					})
				} else if(text == 'drivers_id') {
					this.driversShow = true
					// 挖机
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.forms.quartel_id,
							search_name:search_name,
							type:3
						},
						success:res =>{
							this.driversList = res.list
						}
					})
				} else if(text == 'chain_saw_id'){
					this.chain_sawShow = true
					// 油锯手
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.forms.quartel_id,
							search_name:search_name,
							type:1
						},
						success:res =>{
							this.chain_sawList = res.list
						}
					})
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
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.delivery_bill,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									...this.forms
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
		}
	}
</script>

<style lang="scss">
.modal {
	margin-left: 0!important;
	.modal-main {
		.modal-box {
			.search {
				margin: 0!important;
				.input {
					width: 550rpx;
					height: 80rpx;
					line-height: 80rpx;
				}
				.uni-easyinput__content {
					min-height: 80rpx!important;
				}
			}
			.content {
				height: calc(100% - 170rpx);
				.left {
					.btna {
						text-align: center;
						padding: 0!important;
						color: #000000;
						border-bottom: 0!important;
					}
				}
			}
		}
	}
}
.picker {
    width: 556rpx;
    height: 80rpx;
    border-radius: 8rpx;
    // border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
	font-size: 28rpx;
}
.group_box {
	margin-top: 20rpx;
	align-items: flex-start;
	flex-wrap: wrap;
}
.check_box {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-bottom: 36rpx;
	.check {
		width: 30%;
		margin-top: 36rpx;
		margin-right: 7rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: $color-6;
	}
}
.good {
	padding: 0 21.52rpx;
	.group {
		.title {
			width: 150rpx;
			color: $color-3;
		}
		.title_color {
			color: $color-3;
		}
		.input {
			width: 556rpx;
			margin-left: 42rpx;
			min-height: 80rpx!important;
		}
		.date-picker {
			min-height: 80rpx;
			margin-left: 42rpx;
		}
		.uni-date__x-input {
			padding: 0;
			text-align: start;
			color: $color-9;
			font-size: 29.16rpx;
		}
	}
}

</style>
