<template>
	<view class="background"  @click="hideIsShow">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="container search" v-if="count == 0">
		    <view class="flex search_box">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
		    </view>
		</view>
		<view class="container search"  v-if="count == 1">
		    <view class="flex search_box">
		    	<view  @click.stop="edit_del_click()" class="xiala">
		    		<image :src="icon[26].icon"></image>
		    	</view>
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
		    	<view class="list_click_box" :class="[isShow  == true ?'show' :'hide']">
		    		<!-- <checkbox-group name="allCheckTab" @change="changeAllTab">
		    			<view class="list_click_text">
		    				<checkbox class="checkClick round" :value="allCheckTab.value" :checked="allCheckTab.checked"/>
		    				全部
		    			</view>
		    		</checkbox-group> -->
		    		<!-- <view @click.stop="job(item)" class="list_click_text">
		    			{{item.pro_name}}
		    		</view> -->
		    		<checkbox-group name="check" @change="changeCheckTab" class="check">
		    			<view v-for="(item,index) in job_list" :key="index" class="list_click_text">
		    				<checkbox class="checkClick round" :value="item.id" :checked="checkedArrTab.includes(String(item.id))" style="line-height: 100rpx;">
		    					<view style="width: 600rpx">{{item.job_name}}</view>
		    				</checkbox>
		    			</view>
		    		</checkbox-group>
		    		
		    	</view>
		    </view>
		</view>
		<view class="container">
			<view class="title_box">
				<view class="title_name">
					<view>{{nickname}}</view>
					<view @click="yincan">
						<image :src="icon[42].icon" v-if="show_hz == 1"></image>
						<image :src="icon[41].icon" v-if="show_hz == 2"></image>
					</view>
				</view>
				<view class="flex"  v-if="show_hz == 1">
					<view class="title_box_list">
						<view class="title-fs">￥{{form.quartelTotal}}</view>
						<view>总工程款</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">￥{{form.quartelAdvance}}</view>
						<view>预支工程款</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.remainingPrice}}</view>
						<view>剩余工程款</view>
					</view>
				</view>
				<view class="line"  v-if="show_hz == 1"></view>
				<view class="flex" v-if="show_hz == 1">
					<view class="title_box_list">
						<view class="title-fs">{{form.rat_total}}</view>
						<view>百分比</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.surplus_70_total}}</view>
						<view>70%剩余</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container search" style="padding-top: 0;">
			<view class="flex">
				<uni-datetime-picker class="date-picker" ref="formDate" :value="start_time" @change="changeDate($event,'start_time')" type="date" placeholder="开始时间"/>
				<view class="ml-10 mr-10">至</view>
				<uni-datetime-picker class="date-picker" ref="formDate"  :value="end_time" @change="changeDate($event,'end_time')" type="date" placeholder="结束时间"/>
				<button class="btn-search btn-color ml-20" @click="search_time">查询</button>
			</view>
		</view>
		<view class="container check_list flex" v-if="count == 1">
			<radio-group class="check_box">
				<view class="check">
					<radio class="checkClick round" :value="1" :checked="dun_checked">吨位</radio>
				</view>
			</radio-group>
			<radio-group class="check_box">
				<view class="check">
					<radio class="checkClick round" :value="wx_checked" :checked="wx_checked"  @tap="changeCheckType_wx">维修</radio>
				</view>
			</radio-group>
			<radio-group class="check_box">
				<view class="check">
					<radio class="checkClick round" :value="bu_checked" :checked="bu_checked"  @tap="changeCheckType_bu">补</radio>
				</view>
			</radio-group>
			<radio-group class="check_box">
				<view class="check">
					<radio class="checkClick round" :value="kou_checked" :checked="kou_checked"  @tap="changeCheckType_kou">扣</radio>
				</view>
			</radio-group>
		</view>
		<view class="table" v-if="count == 0">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
					<uni-th align="center" width="60">序号</uni-th>
					<uni-th align="center" width="110"><view @click="linbanSearch">林班</view></uni-th>
					<uni-th align="center" width="80">姓名</uni-th>
					<uni-th align="center" width="110">总工程款</uni-th>
					<uni-th align="center" width="110">预支工程款</uni-th>
					<uni-th align="center" width="110">剩余工程款</uni-th>
					<uni-th align="center" width="80">百分比</uni-th>
					<uni-th align="center" width="90">70%剩余</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view @click="getCurrentRow(item)">{{index+1}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.total}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.total_prepaid_money}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_money}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.rate}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_70}}</view></uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 1">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
					<uni-th align="center" width="60">序号</uni-th>
					<uni-th align="center" width="110"><view @click="linbanSearch">林班</view></uni-th>
					<uni-th align="center" width="80">姓名</uni-th>
					<uni-th align="center" width="110">总工程款</uni-th>
					<uni-th align="center" width="110">预支工程款</uni-th>
					<uni-th align="center" width="110">剩余工程款</uni-th>
					<uni-th align="center" width="80">百分比</uni-th>
					<uni-th align="center" width="90">70%剩余</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view @click="getCurrentRow(item)">{{index+1}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.price}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.zctotalPrice}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.syPrice}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.rate}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_70}}</view></uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view v-show="show" class="modal">
		    <view class="modal-main">
		        <view class="modal-title">
		            <view class="text">林班</view>
		            <image class="close" :src="icon[30].icon" @click="closeModal">
		            </image>
		        </view>
		        <view class="modal-box">
		            <view class="content">
		                <view class="right">
							<checkbox-group name="allCheck" @change="changeAll">
								<view class="item_list">
									<checkbox class="checkClick round mr-20" :value="allCheck.value" :checked="allCheck.checked"/>
									<view class="icon_title">{{allCheck.name}}</view>
								</view>
							</checkbox-group>
							<checkbox-group @change="changeCheck" class="check_box">
								<view class="item_list" v-for="(item,index) in linbanlist" :key="index">
									<checkbox class="checkClick round mr-20" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
									<view class="icon_title">{{item.quartel_name}}{{item.quartel_account}}</view>
								</view>
							</checkbox-group>
		                </view>
		            </view>
					<view class="container">
					    <button class="btn-submit" @click="search_linban">确定</button>
					</view>
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
				form:{
					quartelTotal:'',
					quartelAdvance:'',
					remainingPrice:'',
					rat_total:'',
					surplus_70_total:'',
				},
				items:[
					"造林",
					"砍伐"
				],
				search_name:'',
				profession:[
					{
						id:1,
						name:"吨位"
					},
					{
						id:2,
						name:"维修"
					},
					{
						id:3,
						name:"补"
					},
					{
						id:4,
						name:"扣"
					},
				],
				
				count:0,
				page:1,
				isShow:false,
				job_list:[],
				dun_checked:true,
				wx_checked:false,
				wx_status:2,
				bu_checked:false,
				bu_status:2,
				kou_checked:true,
				kou_status:1,
				icon:[],
				show: false,
				linbanlist:[],
				checkedArr:[], //复选框选中的值，工种
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				end_time:'',
				start_time:'',
				show_hz: 1,
				allCheckTab : {
					name : '全部',
					value : 'all',
					checked : false	
				},
				checkedArrTab:[],
				nickname:'',
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			this.listInterface()
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
			this.http({
				url:this.api.mydata_jobData,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token")
				},
				success: res => {
					this.job_list = res.list
					for(let item of this.job_list){
						let itemVal=String(item.id);
						if(!this.checkedArrTab.includes(itemVal)){
							this.checkedArrTab.push(itemVal);
						}
					}
				}
			})
		},
		//上拉触底函数
		onReachBottom(){
			if(this.count == 0) {
				this.http({
				    url: this.api.Quartel_collect_close,
				    method: "POST",
				    data: {
				       uid: this.common.get("uid"),
				       token: this.common.get("token"),
				       emplo_name:this.search_name,
					   quartel_id:this.checkedArr,
					   start_time:this.start_time,
					   end_time:this.end_time,
				       page:this.page,
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
							this.form.rat_total = res.data_info.rat_total
							this.form.surplus_70_total = res.data_info.surplus_70_total
							this.form.remainingPrice = res.data_info.remainingPrice
							this.form.quartelTotal = res.data_info.quartelTotal
							this.form.quartelAdvance = res.data_info.quartelAdvance
						}
				    }, 
				})
			} else {
				this.http({
				    url: this.api.Quartel_cut_close,
				    method: "POST",
				    data: {
				       uid: this.common.get("uid"),
				       token: this.common.get("token"),
				       emplo_name:this.search_name,
				       page:this.page,
				       wx_status:this.wx_status,
				       bu_status:this.bu_status,
				       kou_status:this.kou_status,
				       quartel_id:this.checkedArr,
					   start_time:this.start_time,
					   end_time:this.end_time,
				       job_id:this.checkedArrTab
				    },
				    success: res => {
						this.page+=1
						if(res.list.list.length == 0) {
							uni.showToast({
								title:'没有更多了',
								icon:'none',
								duration: 2000
							})
						} else {
							this.list = this.list.concat(res.list.list)
							this.form.rat_total = res.rate
							this.form.surplus_70_total = res.surplus_70
							this.form.remainingPrice = res.syPrice
							this.form.quartelTotal = res.totalPrice
							this.form.quartelAdvance = res.zctotalPrice
						}
				    }, 
				})
			}
			
			
		},
		methods: {
			// 多选复选框改变事件
			changeCheckTab(e){
			    this.checkedArrTab = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			  //   if(this.checkedArr.length>0 && this.checkedArr.length==this.job_list.length){
			  //       this.allCheckTab.checked=true;
					
			  //   }else{
			  //       this.allCheckTab.checked=false;
			  //   }
				this.isShow = false;
				this.listInterface()
			},
			// 全选事件
			// changeAllTab(e){
			//     let chooseItem = e.detail.value;
			//     // 全选
			//     if(chooseItem[0]=='all'){
			//         this.allCheckTab.checked=true;
			//         for(let item of this.job_list){
			//             let itemVal=String(item.id);
			//             if(!this.checkedArr.includes(itemVal)){
			//                 this.checkedArr.push(itemVal);
			// 			}
			//         }
			//     }else{
			//         // 取消全选
			//         this.allCheckTab.checked=false;
			//         this.checkedArr=[];
			//     }
			// 	this.isShow = false
			// 	this.listInterface()
			// },
			// 显示隐藏
			yincan() {
				if(this.show_hz == 1) {
					this.show_hz = 2
				} else {
					this.show_hz = 1
				}
			},
			changeDate(eve,i) {
				if(i == 'start_time') {
					this.start_time = eve
				} else {
					this.end_time = eve
				}
			},
			search_time() {
				this.listInterface()
			},
			// 多选复选框改变事件
			changeCheck(e){
			    this.checkedArr = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			    if(this.checkedArr.length>0 && this.checkedArr.length==this.linbanlist.length){
			        this.allCheck.checked=true;
			    }else{
			        this.allCheck.checked=false;
			    }
				console.log('this.checkedArr',this.checkedArr)
			},
			// 全选事件
			changeAll(e){
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.linbanlist){
			            let itemVal=String(item.id);
			            if(!this.checkedArr.includes(itemVal)){
			                this.checkedArr.push(itemVal);
						}
			        }
			    }else{
			        // 取消全选
			        this.allCheck.checked=false;
			        this.checkedArr=[];
			    }
				console.log('this.checkedArr',this.checkedArr)
			},
			
			linbanSearch() {
				if(this.count == 0) {
					this.http({
						url:this.api.newQuartelList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:1
						},
						success: res => {
							this.linbanlist = res.list
						}
					})
				} else {
					this.http({
						url:this.api.newQuartelList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:2
						},
						success: res => {
							this.linbanlist = res.list
						}
					})
				}
				this.show = true
			},
			// 弹窗关闭按钮
			closeModal(name) {
				this.show = false
			},
			search_linban() {
				this.page = 1
				this.listInterface()
				this.show = false
			},
			// 维修点击
			changeCheckType_wx(e) {
				let that = this;
				that.wx_checked = !that.wx_checked;
				if(that.wx_checked == true) {
					that.wx_status = 1
				} else {
					that.wx_status = 2
				}
				this.page = 1
				that.listInterface()
			},
			// 补点击
			changeCheckType_bu(e) {
				let that = this;
				that.bu_checked = !that.bu_checked;
				if(that.bu_checked == true) {
					that.bu_status = 1
				} else {
					that.bu_status = 2
				}
				this.page = 1
				that.listInterface()
			},
			// 扣点击
			changeCheckType_kou(e) {
				let that = this;
				that.kou_checked = !that.kou_checked;
				if(that.kou_checked == true) {
					that.kou_status = 1
				} else {
					that.kou_status = 2
				}
				this.page = 1
				that.listInterface()
			},
			// tab栏点击事件
			change(e) {
				this.page = 1
				console.log(e)
				this.count = e
				this.allCheck.checked=false;
				this.checkedArr=[];
				this.start_time = ''
				this.end_time = ''
				this.listInterface()
			},
			// 搜索
			search(e) {
				this.page = 1
				this.search_name = e
				this.listInterface()
			},
			
			// 按钮点击
			edit_del_click() {
				let that = this
				if(that.isShow) {
					that.isShow = false;
				} else {
					that.isShow = true;
				}
			},
			// 隐藏
			hideIsShow() {
				this.isShow = false;
			},
			listInterface() {
				if(this.count == 0) {
					this.http({
						url:this.api.Quartel_collect_close,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							emplo_name:this.search_name,
							quartel_id:this.checkedArr,
							start_time:this.start_time,
							end_time:this.end_time,
							page:this.page,
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
							this.form.rat_total = res.data_info.rat_total
							this.form.surplus_70_total = res.data_info.surplus_70_total
							this.form.remainingPrice = res.data_info.remainingPrice
							this.form.quartelTotal = res.data_info.quartelTotal
							this.form.quartelAdvance = res.data_info.quartelAdvance
						}
					})
				} else {
					this.http({
						url:this.api.Quartel_cut_close,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							emplo_name:this.search_name,
							page:this.page,
							wx_status:this.wx_status,
							bu_status:this.bu_status,
							kou_status:this.kou_status,
							quartel_id:this.checkedArr,
							start_time:this.start_time,
							end_time:this.end_time,
							job_id:this.checkedArrTab
						},
						success: res => {
							if(res.list.list.length == 0) {
								uni.showToast({
									title:'无数据',
									icon:'none',
									duration: 2000
								})
							}
							this.page+=1
							this.list = res.list.list
							this.form.rat_total = res.rate
							this.form.surplus_70_total = res.surplus_70
							this.form.remainingPrice = res.syPrice
							this.form.quartelTotal = res.totalPrice
							this.form.quartelAdvance = res.zctotalPrice
						}
					})
				}
			},
			//行点击
			getCurrentRow(row) {
				if(this.count == 0) {
					uni.navigateTo({
						url:'/pagesA/pages/summary/jiesuanone/jiesuanone?data='+encodeURIComponent(JSON.stringify(row))
					})
				} else {
					uni.navigateTo({
						url:'/pagesA/pages/summary/jiesuantwo/jiesuantwo?data='+encodeURIComponent(JSON.stringify(row))
					})
				}
				
			},
		}
	}
</script>

<style lang="scss">
.search .uni-date-editor--x .uni-date__icon-clear {
	top: -4rpx;
}
.uni-date-single {
	padding: 0!important;
	height: 80rpx;
}
.date-picker {
	width: 42%!important;
}
.uniui-calendar {
	display: none;
}
.modal {
	z-index: 999;
	margin-left: 0!important;
	.modal-main {
		.modal-box {
			.content {
				height: calc(100% - 136rpx);
				.right {
					width: 100%;
					.item_list{
						justify-content: flex-start;
					}
				}
			}
		
		}
	}
}
.check_list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32rpx;
}
.search_box {
	position: relative;
	.xiala {
		width: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		image {
			width: 25rpx;
			height: 18rpx;
		}
	}
	.show {
		display: block;
	}
	.hide {
		display: none;
	}
	.list_click_box {
		width: 710rpx;
		z-index: 100;
		position: absolute;
		top: 105rpx;
		left: 0;
		font-size: 28rpx;
		font-weight: 400;
		// padding: 10rpx;
		background: #FFFFFF;
		box-shadow: 0px 4rpx 8rpx 0px rgba(184, 184, 184, 0.5);
		.list_click_text {
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			padding-left: 40rpx;
			border-bottom: 0.69rpx solid #DCDCDC;
		}
		// .list_click_text_show {
		// 	height: 100rpx;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: space-around;
		// 	background: #E2F5D1;
		// }
	}
}
.tab {
	padding: 18.75rpx 0;
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
.group {
	border: none;
}

</style>
