<template>
	<view class="fix-padding">
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
			<view class="group">
				<view class="title">报销类别</view><text class="title_color">：</text>
				<view class="outModal" @click="openModal">
					<input class="input" v-model="expense_name" placeholder="请选择" disabled></input>
				</view>
			</view>
			<view class="group">
				<view class="title">姓名</view><text class="title_color">：</text>
				<input class="input" v-model="nickname" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">卡号</view><text class="title_color">：</text>
				<input class="input" v-model="card" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">开户行及网点</view><text class="title_color">：</text>
				<input class="input" v-model="bank" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">申请金额</view><text class="title_color">：</text>
				<input class="input" v-model="money" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">备注</view><text class="title_color">：</text>
				<input class="input" v-model="remark" placeholder="请输入"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in remarkImage" :key='index'>
						<image class="image" :src="item" @click="previewImage(index)" mode="aspectFill"></image>
						<image class="delete" :src="icon[24].icon" @click="deleteImage"></image>
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
				remarkImage:[],
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
				showClient: false,
				classification:[],
				count:'',
				secList:[],
				expense_type:'',
				expense_name:'',
				nickname:'',
				card:'',
				bank:'',
				money:'',
				remark:'',
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
					type:1
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
				this.expense_name = this.secList[i].name
				this.expense_type = this.secList[i].id
			},
			// 名称选择
			openModal(name) {
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
								url:this.api.Apply_apply_affair,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									type:this.typeList[this.tIndex].id,
									order_num:this.order_num,
									quartel_id:this.NumList[this.nIndex].id,
									expense_type:this.expense_type,
									nickname:this.nickname,
									card:this.card,
									bank:this.bank,
									money:this.money,
									remark:this.remark,
									image:this.remarkImage
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
			// 添加图片
			uploadImage(eve) {
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
		}
	}
</script>

<style lang="scss">
.picker {
    width: 500rpx;
    height: 80rpx;
    border-radius: 8rpx;
    text-align: left;
    box-sizing: border-box;
	font-size: 28rpx;
}
.remarkImage {
    .item_image {
		width: 434rpx;
		height: 274rpx;
		background: #F2F2F2;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
        position: relative;
        // margin-top: 20rpx;
		// margin-bottom: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
        .image {
            width: 80rpx;
            height: 80rpx;
            object-fit: cover;
        }
		.image_list {
			width: 434rpx;
			height: 274rpx;
		}
    }
}
</style>
