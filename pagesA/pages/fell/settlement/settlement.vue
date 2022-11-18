<template>
	<view class="background fix-padding" @click="hideIsShow">
		<view class="container search">
		    <view class="flex search_box">
				<view  @click.stop="edit_del_click()" class="xiala">
					<image :src="icon[26].icon"></image>
				</view>
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
				<view class="list_click_box" :class="[isShow  == true ?'show' :'hide']">
					<!-- <checkbox-group name="allCheck" @change="changeAll">
						<view class="list_click_text">
							<checkbox class="checkClick round" :value="allCheck.value" :checked="allCheck.checked"/>
							全部
						</view>
					</checkbox-group> -->
					<!-- <view @click.stop="job(item)" class="list_click_text">
						{{item.pro_name}}
					</view> -->
					<checkbox-group name="check" @change="changeCheck" class="check">
						<view v-for="(item,index) in job_list" :key="index" class="list_click_text">
							<checkbox class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))" style="line-height: 100rpx;">
								<view style="width: 600rpx">{{item.pro_name}}</view>
							</checkbox>
						</view>
					</checkbox-group>
					
				</view>
		    </view>
		</view>
		<view class="container">
			<view class="title_box">
				<view class="title_name">
					<view>当前林班：{{data.quartel_name}}</view>
					<view @click="yincan">
						<image :src="icon[42].icon" v-if="show == 1"></image>
						<image :src="icon[41].icon" v-if="show == 2"></image>
					</view>
				</view>
				<view class="flex" v-if="show == 1">
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
				<view class="line" v-if="show == 1"></view>
				<view class="flex" v-if="show == 1">
					<view class="title_box_list">
						<view class="title-fs">{{form.rate}}</view>
						<view>百分比</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.surplus_70}}</view>
						<view>70%剩余</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container check_list flex">
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
		<view class="table">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
					<uni-th align="center" width="60">序号</uni-th>
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
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.price}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.zctotalPrice}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.syPrice}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.rate}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_70}}</view></uni-td>
			    </uni-tr>
			</uni-table>
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
				form:{
					rate:'',
					surplus_70:'',
					syPrice:'',
					totalPrice:'',
					zctotalPrice:'',
				},
				icon:[],
				isShow:false,
				job_list:[],
				dun_checked:true,
				wx_checked:false,
				wx_status:2,
				bu_checked:false,
				bu_status:2,
				kou_checked:true,
				kou_status:1,
				show:1,
				allCheck : {
					name : '全部',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '结算-'+this.data.quartel_name
			});
			this.http({
				url:this.api.Quartel_job_list,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					quartel_id:this.data.id
				},
				success: res => {
					this.job_list = res.list
					for(let item of this.job_list){
						let itemVal=String(item.id);
						if(!this.checkedArr.includes(itemVal)){
							this.checkedArr.push(itemVal);
						}
					}
					setTimeout(()=>{
						this.listInterface()
					},200)
				}
			})
			
		},
		mounted() {	
		},
		methods: {
			// 多选复选框改变事件
			changeCheck(e){
			    this.checkedArr = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			  //   if(this.checkedArr.length>0 && this.checkedArr.length==this.job_list.length){
			  //       this.allCheck.checked=true;
					
			  //   }else{
			  //       this.allCheck.checked=false;
			  //   }
				this.isShow = false;
				this.listInterface()
			},
			// 全选事件
			// changeAll(e){
			//     let chooseItem = e.detail.value;
			//     // 全选
			//     if(chooseItem[0]=='all'){
			//         this.allCheck.checked=true;
			//         for(let item of this.job_list){
			//             let itemVal=String(item.id);
			//             if(!this.checkedArr.includes(itemVal)){
			//                 this.checkedArr.push(itemVal);
			// 			}
			//         }
			//     }else{
			//         // 取消全选
			//         this.allCheck.checked=false;
			//         this.checkedArr=[];
			//     }
			// 	this.isShow = false
			// 	this.listInterface()
			// },
			// 显示隐藏
			yincan() {
				if(this.show == 1) {
					this.show = 2
				} else {
					this.show = 1
				}
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
				that.listInterface()
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
			// 搜索
			search(e) {
				this.search_name = e
				this.listInterface()
			},
			listInterface() {
				this.http({
					url:this.api.Quartel_newsDownSettlement,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						emplo_name:this.search_name,
						job_id:this.checkedArr,
						quartel_id:this.data.id,
						wx_status:this.wx_status,
						bu_status:this.bu_status,
						kou_status:this.kou_status
					},
					success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'无数据',
								icon:'none',
								duration: 2000
							})
						}
						this.list = res.list
						this.form.rate = res.rate
						this.form.surplus_70 = res.surplus_70
						this.form.syPrice = res.syPrice
						this.form.totalPrice = res.totalPrice
						this.form.zctotalPrice = res.zctotalPrice
					}
				})
			},
			//行点击
			getCurrentRow(row) {
				uni.navigateTo({
					url:'/pagesA/pages/fell/jiesuanDetail/jiesuanDetail?data='+encodeURIComponent(JSON.stringify(row))
					// url:'/pages/afforestation/listDetail/listDetail?data='+row
				})
			},
		}
	}
</script>

<style lang="scss">
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

</style>
