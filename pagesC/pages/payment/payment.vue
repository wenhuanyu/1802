<template>
	<view class="background fix-padding" >
		<view class="container">
			<view class="title_box">
				<view class="flex">
					<view class="title_box_list">
						<view class="title-fs">￥{{form.totalPrice}}</view>
						<view>总工程款</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">￥{{form.zctotalPrice}}</view>
						<view>预支工程款</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.syPrice}}</view>
						<view>剩余工程款</view>
					</view>
				</view>
			</view>
		</view>
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		
		
		<view class="table" v-if="count == 0">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <uni-th align="center">姓名</uni-th>
					<uni-th align="center"><view @click="linbanSearch">林班号</view></uni-th>
			        <uni-th align="center">亩</uni-th>
			        <!-- <uni-th align="center">单价</uni-th> -->
					<uni-th align="center">总价</uni-th>
					<!-- <uni-th align="center">工序</uni-th> -->
					<uni-th align="center">时间</uni-th>
					<!-- <uni-th align="center">备注</uni-th> -->
					<!-- <uni-th align="center">状态</uni-th> -->
					<!-- <uni-th align="center">操作</uni-th> -->
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view  @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
					<uni-td align="center"><view  @click="getCurrentRow(item)">{{item.quartel_name}}</view></uni-td>
			        <uni-td align="center"><view  @click="getCurrentRow(item)">{{item.number}}</view></uni-td>
			        <!-- <uni-td align="center"><view>￥{{item.unit_price}}</view></uni-td> -->
			        <uni-td align="center"><view  @click="getCurrentRow(item)">￥{{item.total_price}}</view></uni-td>
			        <!-- <uni-td align="center"><view>{{item.jobs_name}}</view></uni-td> -->
			        <uni-td align="center"><view  @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
					<!-- <uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td> -->
					<!-- <uni-td align="center">
						<view style="color: #FF9600;" v-if="item.submit_status==0">
							未提交
						</view>
						<view v-if="item.submit_status==1">
							已提交
						</view>
					</uni-td> -->
					<!-- <uni-td align="center">
						<view v-if="item.submit_status==0" style="color: #4C9D57;" @click="tijiao(item)">提交</view>
						<view v-if="item.submit_status==1">-</view>
					</uni-td> -->
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 1">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <uni-th align="center">姓名</uni-th>
					<uni-th align="center"><view @click="linbanSearch">林班号</view></uni-th>
			        <uni-th align="center">吨位</uni-th>
			        <!-- <uni-th align="center">单价</uni-th> -->
					<uni-th align="center">总价</uni-th>
					<uni-th align="center">时间</uni-th>
					<!-- <uni-th align="center">备注</uni-th> -->
					<!-- <uni-th align="center">状态</uni-th>
					<uni-th align="center">操作</uni-th> -->
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view <view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
					<uni-td align="center"><view <view @click="getCurrentRow(item)">{{item.quartel_name}}</view></uni-td>
			        <uni-td align="center"><view <view @click="getCurrentRow(item)">{{item.number}}</view></uni-td>
					<!-- <uni-td align="center"><view>￥{{item.price}}</view></uni-td> -->
			        <uni-td align="center"><view <view @click="getCurrentRow(item)">￥{{item.total_price}}</view></uni-td>
			        <uni-td align="center"><view <view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
					<!-- <uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td> -->
					<!-- <uni-td align="center">
						<view style="color: #FF9600;" v-if="item.submit_status==0">
							未提交
						</view>
						<view v-if="item.submit_status==1">
							已提交
						</view>
					</uni-td> -->
					<!-- <uni-td align="center">
						<view v-if="item.submit_status==0" style="color: #4C9D57;" @click="tijiao(item)">提交</view>
						<view v-if="item.submit_status==1">-</view>
					</uni-td> -->
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
					totalPrice:'',
					zctotalPrice:'',
					syPrice:'',
				},
				items:[
					"造林",
					"砍伐"
				],
				
				count:0,
				page:1,
				icon:[],
				show: false,
				linbanlist:[],
				checkedArr:[], //复选框选中的值，工种
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			if(this.count == 0) {
				this.http({
				    url: this.api.peasants_project_funds,
				    method: "POST",
				    data: {
				       uid: this.common.get("uid"),
				       token: this.common.get("token"),
					   quartel_id:this.checkedArr,
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
							this.form = res.data_info
						}
				    }, 
				})
			} else {
				this.http({
				    url: this.api.peasants_project_funds_fell,
				    method: "POST",
				    data: {
				       uid: this.common.get("uid"),
				       token: this.common.get("token"),
				       page:this.page,
				       quartel_id:this.checkedArr,
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
							this.list = this.list.concat(res.list.list)
							this.form = res.data_info
						}
				    }, 
				})
			}
			
			
		},
		methods: {
			// 详情
			getCurrentRow(eve) {
				if(this.count == 0) {
					uni.navigateTo({
						url:'/pagesA/pages/summary/jiesuanone/jiesuanone?data='+encodeURIComponent(JSON.stringify(eve))
					})
				} else {
					uni.navigateTo({
						url:'/pagesA/pages/summary/jiesuantwo/jiesuantwo?data='+encodeURIComponent(JSON.stringify(eve))
					})
				}
			},
			tijiao(item) {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.quartel_submit,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									id:item.id,
									type:this.count+1,
								},
								success: res => {
									uni.showToast({
										title:'操作成功',
										icon:'none',
										duration: 2000
									})
									setTimeout(() =>{
										this.page = 1
										this.listInterface()
									},500) 
								}
							})
						}		
					},
					fail: () => {},
					complete: () => {}
				});
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
						url:this.api.my_data_quartelList,
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
						url:this.api.my_data_quartelList,
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
			
			// tab栏点击事件
			change(e) {
				this.page = 1
				console.log(e)
				this.count = e
				this.allCheck.checked=false;
				this.checkedArr=[];
				this.listInterface()
			},
			
			listInterface() {
				if(this.count == 0) {
					this.http({
						url:this.api.peasants_project_funds,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.checkedArr,
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
							this.form = res.data_info
						}
					})
				} else {
					this.http({
						url:this.api.peasants_project_funds_fell,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							page:this.page,
							quartel_id:this.checkedArr,
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
							this.form = res.data_info
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
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

.tab {
	padding: 18.75rpx 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	font-size: 29.16rpx;
	color: $color-3;
	.tab_list {
		// width: 218.05rpx;
	}
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
