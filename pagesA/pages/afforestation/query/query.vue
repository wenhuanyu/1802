<template>
	<view class="background fix-padding" @click="hideShow">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
			<view class="tab_list">
				<view class="search_right" @click="shaixuan">
					筛选
					<image :src="icon[32].icon"></image>
				</view>
			</view>
		</view>
		<view class="container search">
		    <view class="flex search_box">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
		    </view>
		</view>
		<view class="table" v-if="count == 0">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
					<uni-th align="center"  width="80">姓名</uni-th>
					<uni-th align="center" width="100">林班名称</uni-th>
					<uni-th align="center" width="100">预支金额</uni-th>
					<uni-th align="center" width="100">大写金额</uni-th>
					<uni-th align="center" width="120">时间</uni-th>
					<uni-th align="center" width="100">是否转账</uni-th>
					<uni-th align="center" width="120">转账时间</uni-th>
					<uni-th align="center" width="100">操作员</uni-th>
					<uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.per_amount}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.capital}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
					<uni-td align="center">
						<view @click="getCurrentRow(item)" v-if="item.is_transfer == 1">是</view>
						<view @click="getCurrentRow(item)" v-if="item.is_transfer == 0">否</view>
					</uni-td>
					<uni-td align="center">
						<view @click="getCurrentRow(item)" v-if="item.zz_time !==''">{{item.zz_time}}</view>
						<view @click="getCurrentRow(item)" v-if="item.zz_time ==''">-</view>
					</uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.sign}}</view></uni-td>
					<uni-td align="center">
						<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
						<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 1">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
			        <uni-th align="center" width="80">姓名</uni-th>
			        <uni-th align="center" width="80">工序</uni-th>
					<uni-th align="center" width="80">亩</uni-th>
					<uni-th align="center" width="80">单价</uni-th>
					<uni-th align="center" width="80">总价</uni-th>
					<uni-th align="center" width="100">林班号</uni-th>
					<uni-th align="center" width="120">时间</uni-th>
					<uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pro_name}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.number}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.unit_price}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.total_price}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
					<uni-td align="center">
						<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
						<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="fix-bottom">
			<view class="flex item">
				<view class="flex text_w"><text class="title">当日预支</text>：<text class="text_color">{{form.dayCountPrice}}</text>（元）</view>
				<view class="flex text_w pl-60">当日：<text class="text_color">{{form.dayCountNum}}</text>（笔）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">合计</text>：<text class="text_color">{{form.CountPrice}}</text>（元）</view>
				<view class="flex text_w pl-60"><text>合计：</text><text class="text_color">{{form.CountNum}}</text>（笔）</view>
			</view>
		</view>
		<view v-show="show" class="modal_left" @click="closeModal">
			<view class="modal-main" @click.stop @click="closeText">
				<view class="top container">
					<image :src="icon[35].icon"></image>
					时间范围
				</view>
				<view class="flex time-box" >
					<uni-datetime-picker class="date-picker" ref="formDate" :value="start_time" @change="changeDate($event,'start_time')" type="date" placeholder="开始时间"/>
					<uni-datetime-picker class="date-picker" ref="formDate" :value="end_time" @change="changeDate($event,'end_time')" type="date" placeholder="截至时间"/>
				</view>
				<view class="operate"  style="height: 800rpx;overflow: hidden;overflow-y: scroll;" v-if="count == 1">
					<view>
						<view class="item" style="padding: 33.33rpx 39.58rpx;">
							<view class="flex">
								<view class="icon_title fs">工序：</view>
							</view>
							<view class="icon_text fs">
								 <input
								 	class="input" 
								 	type="text" 
								 	placeholder="请选择工序"
								 	v-model="pro_name" 
								 	@focus="search_site($event,'pro_name')" 
								 	@input="search_site($event,'pro_name')"
								 	@blur="search_blur($event,'pro_name')"
								 />
								 <!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
								 <view  class="group_down" v-if="pro_nameShow">
								 	<view v-for="item in list_gongxu" :key="item.id" class="group_down_list" :class="{group_down_index:pro_id == item.id}">
								 		<view @click="toDetail(item,'pro_name')" >{{item.pro_name}}</view>
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
					"预支",
					"工程款计算"
				],
				count:0,
				show: false,
				list:[],
				data:'',
				search_name:'',
				page:1,
				form:{
					CountNum:'',
					CountPrice:'',
					dayCountPrice:'',
					dayCountNum:'',
				},
				list_gongxu:[],
				start_time:'',
				end_time:'',
				pro_name:'',
				pro_id:'',
				icon:[],
				pro_nameShow:false
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '查询-'+this.data.quartel_name+this.data.quartel_account
			});
		},
		onShow() {
			this.page = 1
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			if (this.count == 0) { 
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        emplo_name:this.search_name,
				        type:1,
				        page:this.page,
						start_time:this.start_time,
						end_time:this.end_time,
				        quartel_id:this.data.id
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
							this.form.CountNum = res.CountNum
							this.form.CountPrice = res.CountPrice
							this.form.dayCountPrice = res.dayCountPrice
							this.form.dayCountNum = res.dayCountNum
						}
				    }, 
				})
			} else {
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        emplo_name:this.search_name,
						start_time:this.start_time,
						end_time:this.end_time,
						pro_id:this.pro_id,
				        type:2,
				        page:this.page,
				        quartel_id:this.data.id
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
							this.form.CountNum = res.CountNum
							this.form.CountPrice = res.CountPrice
							this.form.dayCountPrice = res.dayCountPrice
							this.form.dayCountNum = res.dayCountNum
						}
				    }, 
				})
			}
			
		},
		methods: {
			hideShow() {
				this.pro_nameShow = false
			},
			closeText() {
				this.pro_nameShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'pro_name') {
						// this.pro_nameShow = false
						if(this.pro_id=='') {
							this.pro_name = ''
						} else {
							this.list_gongxu.map((item,index) => {
								if(this.pro_id == item.id) {
									this.pro_name = item.pro_name
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
					this.pro_id = event.id
					this.pro_name = event.pro_name
					this.pro_nameShow = false
				}
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'pro_name') {
					this.pro_nameShow = true
					// 工序
					this.http({
					    url: this.api.getPositionList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							contact_type:7,
							quartel_id:this.data.id,
							name:search_name
					    },
					    success: res => {
					        this.list_gongxu = res.list
					    }
					})
				}
			},
			// 选择日期
			changeDate(eve,i) {
				if(i == 'start_time') {
					this.start_time = eve
				} else {
					this.end_time = eve
				}
			},
			// 列表接口
			listInterface() {
				if (this.count == 0) {
					this.http({
						url:this.api.queryLists,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							emplo_name:this.search_name,
							start_time:this.start_time,
							end_time:this.end_time,
							type:1,
							page:this.page,
							quartel_id:this.data.id
						},
						success: res => {
							if(res.list.length == 0) {
								uni.showToast({
									title:'无数据',
									icon:'none',
									duration: 2000
								})
							}
							this.page+=1
							this.list = res.list
							this.form.CountNum = res.CountNum
							this.form.CountPrice = res.CountPrice
							this.form.dayCountPrice = res.dayCountPrice
							this.form.dayCountNum = res.dayCountNum
						}
					})
				} else {
					this.http({
						url:this.api.queryLists,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							emplo_name:this.search_name,
							start_time:this.start_time,
							end_time:this.end_time,
							pro_id:this.pro_id,
							type:2,
							page:this.page,
							quartel_id:this.data.id
						},
						success: res => {
							if(res.list.length == 0) {
								uni.showToast({
									title:'无数据',
									icon:'none',
									duration: 2000
								})
							}
							this.page+=1
							this.list = res.list
							this.form.CountNum = res.CountNum
							this.form.CountPrice = res.CountPrice
							this.form.dayCountPrice = res.dayCountPrice
							this.form.dayCountNum = res.dayCountNum
						}
					})
				}
			},
			// 搜索
			search(e) {
				this.page = 1
				this.search_name = e
				this.listInterface()
			},
			// 弹框搜索
			search_modal() {
				this.page = 1
				this.listInterface()
				this.show = false
			},
			//行点击
			getCurrentRow(row) {
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/listDetail/listDetail?data='+encodeURIComponent(JSON.stringify(row))
					// url:'/pages/afforestation/listDetail/listDetail?data='+row
				})
				
			},
			// tab栏点击事件
			change(e) {
				console.log(e)
				this.count = e
				this.page = 1
				this.listInterface()
				this.chongzhi()
			},
			// 重置
			chongzhi() {
				this.start_time = ''
				this.end_time = ''
				this.pro_name = ''
				this.pro_id = ''
			},
			// 筛选点击
			shaixuan() {
				this.show = true
			},
			// 弹窗关闭
			closeModal() {
				this.show = false
			},
			// 弹窗选择点击
			xuanze() {
				uni.navigateTo({
					// url:'/pages/warehouse/add/add?data='+encodeURIComponent(JSON.stringify(eve))
					url:'/pagesA/pages/afforestation/choose/choose'
				})
			},
		}
	}
</script>

<style lang="scss">
.top_click {
	width: 180rpx;
	background: $color-f;
	padding: 20rpx;
	border-radius: 6rpx;
	text-align: center;
}
.fix-bottom {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	.item{
		width: 100%;
		color: $color-3;
		padding: 25.69rpx 0;
		border-bottom: 0.69rpx solid #CCCCCC;
		.title {
			width: 122.22rpx;
			text-align-last: justify;
		}
		.text_color {
			color: #4C9D57;
		}
		.text_w {
			width: 50%;
			font-size: 25rpx;
			font-weight: 400;
		}
	}
	
}

.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 0.69rpx solid #4C9D57;
}
.btn-submit{
	width: 346.52rpx;
}
.btn-col {
	border: 2.08rpx solid #4C9D57;
	border-radius: 10.41rpx;
	background: $color-f;
	color: #4C9D57;
}
</style>
