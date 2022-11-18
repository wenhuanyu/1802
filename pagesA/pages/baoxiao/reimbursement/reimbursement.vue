<template>
	<view class="background fix-padding">
		<view class="good container">
			<view class="group">
				<view class="title">单号</view><text class="title_color">：</text>
				<input class="input" v-model="order_num" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">林班类型</view><text class="title_color">：</text>
				<picker class="picker" @change="changeType" :value="tIndex" :range="typeList" :range-key="'name'">
				    <view v-if="tIndex == -1" class="uni-input">请选择</view>
				    <view v-else class="uni-input">{{typeList[tIndex].name}}</view>
				</picker>
			</view>
			<view class="group">
				<view class="title">林班名称</view><text class="title_color">：</text>
				<picker class="picker" @change="changeNum" :value="nIndex" :range="NumList" :range-key="'quartel_name'">
				    <view v-if="nIndex == -1" class="uni-input">请选择</view>
				    <view v-else class="uni-input">{{NumList[nIndex].quartel_name}}</view>
				</picker>
			</view>
			<view v-for="(item,index) in list" :key="index">
				<view class="add_title">第{{index+1}}笔</view>
				<view class="add_list">
					<view class="group">
						<view class="title">报销类别</view><text class="title_color">：</text>
						<view class="outModal" @click="openModal(index)">
							<input class="input" v-model="item.expense_name" placeholder="请选择" disabled></input>
						</view>
					</view>
					<view class="group">
						<view class="title">报销金额</view><text class="title_color">：</text>
						<input class="input" :value="item.money" placeholder="请输入" @input="money($event,index)"></input>
					</view>
					<view class="group border">
						<view class="title">备注</view><text class="title_color">：</text>
						<input class="input" v-model="item.remark" placeholder="请输入"></input>
					</view>
					<view v-if="index!==0" class="add_del" @click="del(index)">-删除</view>
				</view>
			</view>
			<button class="btn-submit add_button" @click="addList">
				<view>+增加一笔</view>
			</button>
			<view class="group">
				<view class="title">报销总额</view><text class="title_color">：</text>
				<input class="input" style="color:#4C9D57 ;" v-model="total_money" placeholder="请输入" disabled></input>
			</view>
			<view class="group_image">
				<view class="title">图片：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in remarkImage" :key='index'>
						<image class="image" :src="item" @click="previewImage(index)"></image>
						<image class="delete" :src="icon[24].icon" @click="deleteImage(index)"></image>
					</view>
					<view class="item" @click="uploadImage">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-show="showClient" class="modal">
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">分类管理</view>
			            <image class="close" :src="icon[30].icon" @click="closeModal('client')">
			            </image>
			        </view>
			        <view class="modal-box">
			            <view class="content">
			                <view class="left">
			                    <view class="left_item" v-for="(item,index) in classification" :key = 'index' @click="Firstclick(item.id)"
								:class="{btna:count == item.id}">
									{{item.name}}
								</view>
			                </view>
			                <view class="right">
			                    <view class="item_list" v-for="(item,index) in secList" :key="index" @click="selectGood(index)">
									<view class="icon_title">{{item.name}}</view>
									<image :src="icon[28].icon" class="image_jt"></image>
			                    </view>
			                </view>
			            </view>
			        </view>
			    </view>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						expense_name: "",
						expense_type:'',
						money: '',
						remark:''
					}
				],
				tIndex:-1,
				typeList:[
					{
						id:1,
						name:'造林'
					},
					{
						id:2,
						name:'砍伐'
					},
					
				],
				nIndex:-1,
				NumList:[],
				order_num:'',
				remarkImage: [],
				showClient: false,
				classification:[],
				count:'',
				secList:[],
				total_money:0,
				itemIndex:0,
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			// 获取单号
			this.http({
				url:this.api.Apply_order_num,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					type:3
				},
				success: res => {
					this.order_num = res.order_num
				}
			})
			this.http({
				url:this.api.Apply_expense_type,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
				},
				success: res => {
					this.classification = res.list
					this.count = this.classification[0].id
					this.secList = this.classification[0].son_data
				}
			})
		},
		methods: {
			// 商品数量  总价
			money(e, i) {
				let num = e.detail.value
			    if (num == "") {
			        num = 0
			    }
			    this.list[i].money = num
				this.total_money = 0
				this.list.map((item,index) =>{
					this.total_money = Number(this.total_money)+Number(item.money)
				})
			},
			// 一级分类点击
			Firstclick(eve,i) {
				this.count = eve
				this.classification.map((item,index)=>{
					if(this.count == item.id) {
						this.secList = item.son_data
					}
				})
			},
			// 二级选择点击
			selectGood(i) {
			    this.showClient = false
				this.list[this.itemIndex].expense_name = this.secList[i].name
				this.list[this.itemIndex].expense_type = this.secList[i].id
			},
			// 名称选择
			openModal(eve) {
				this.itemIndex = eve
				this.preventEvent = false
			    this.showClient = true
			},
			// 弹窗关闭按钮
			closeModal(name) {
				this.preventEvent = false
			    this.showClient = false
			},
			// 类型
			changeType(e) {
				this.tIndex = e.target.value
				this.nIndex = -1
				this.http({
					url:this.api.newQuartelList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:this.typeList[this.tIndex].id
					},
					success: res => {
						this.NumList = res.list
					}
				})
			},
			// 林班号
			changeNum(e) {
				this.nIndex = e.target.value
			},
			// 增加
			addList() {
			    let item = {
			        expense_name: "",
			        expense_type:'',
			        money: '',
			        remark:''
			    }
			    this.list.push(item)
			},
			// 商品删除按钮
			del(index) {
				if (this.list.length == 1) {
					uni.showToast({
						title:'最少增加一笔',
						icon:'none',
						duration: 2000
					})
				} else{
					this.list.splice(index, 1)
 				}
			},
			// 添加图片
			uploadImage() {
				uni.chooseImage({
					count: 1,
					success: res => {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
						    url: this.common.baseUrl + this.api.upload,
						    filePath: filePath,
						    name: "file",
						    success: res => {
						        let data = JSON.parse(res.data);
						        if (data.code == 1) {
						            this.remarkImage.push(data.data.scalar)
								} else {
									uni.showToast({
										title: "上传失败",
										icon: "none"
									})
								}
							},
							fail: res => {
								uni.showToast({
									title: "上传失败," + res,
									icon: "none"
								})
						    }
						})
					}
				})
			},
			// 图片放大
			previewImage(i) {
				wx.previewImage({
					current: this.remarkImage[i],
					urls: this.remarkImage
				})
			},
			// 删除图片
			deleteImage(i) {
				this.remarkImage.splice(i, 1)
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
			// 提交按钮
			add() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) {
							this.http({
								url:this.api.Apply_apply_cost,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									type:this.typeList[this.tIndex].id,
									order_num:this.order_num,
									quartel_id:this.NumList[this.nIndex].id,
									total_money:this.total_money,
									image:this.remarkImage,
									info:JSON.stringify(this.list)
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
.good {
	padding: 0 21.52rpx;
	.group {
		.title {
			color: $color-3;
		}
		.title-color {
			color: $color-3;
		}
	}
}
.picker {
    width: 500rpx;
    height: 80rpx;
    border-radius: 8rpx;
    text-align: left;
    box-sizing: border-box;
	font-size: 28rpx;
}
.add_title {
	width: 181.94rpx;
	height: 71.52rpx;
	line-height: 71.52rpx;
	margin-top: 47.22rpx;
	font-size: 37.5rpx;
	font-weight: 500;
	color: #4C9D57;
	text-align: center;
	box-shadow: 0px 0px 20.83rpx 0px rgba(76, 157, 87, 0.3);
	border-radius: 36.11rpx;
}
.add_list {
	margin-top: 24.3rpx;
	padding: 0 36.8rpx;
	background: #FFFFFF;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	border-radius: 6.94rpx;
	.group {
		.title {
			width: 130rpx;
		}
		.input {
			width: 430rpx;
		}
	}
	.border {
		border: none;
	}
	.add_del {
		padding: 31.25rpx 0;
		text-align: center;
		font-size: 29.16rpx;
		color: #4C9D57;
		border-top: 0.69rpx solid #CCCCCC;
	}
}
.add_button {
	background: $color-f!important;
	border-color: #4C9D57!important;
	color: #4C9D57;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-top: 41.66rpx;
}
.group_image {
	.title {
		padding: 25.69rpx 0 0 0;
	}
}
.remarkImage {
    .item_image {
		width: 433.33rpx;
		height: 274.3rpx;
		background: #F2F2F2;
		border-radius: 10.41rpx 10.41rpx 10.41rpx 10.41rpx;
        position: relative;
		display: flex;
		align-items: center;
		justify-content: space-around;
        .image {
            width: 79.86rpx;
            height: 79.86rpx;
            object-fit: cover;
        }
		.image_list {
			width: 433.33rpx;
			height: 274.3rpx;
		}
		.delete {
            position: absolute;
            width: 26.38rpx;
            height: 26.38rpx;
            padding: 10rpx;
            top: -22rpx;
            right: -22rpx;
        }
    }
}
</style>
