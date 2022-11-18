<template>
	<view class="background fix-padding" @click="hideShow">
		<view class="good">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.nick_name" placeholder="请输入" disabled></input>
			</view>
			<view class="group_box">
				<view class="group_title">类型</view><text class="title_color">：</text>
			</view>
			<view class="group ">
				<radio-group @change="changeCheckType" class="check_box">
					<view v-for="(item,index) in type" :key="item.id" class="check">
						<radio class="checkClick round" :value="item.id" :checked="item.checked">{{item.name}}</radio>
					</view>
				</radio-group>
			</view>	
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
			<view class="group" v-if="checkedArrType==2 && forms.quartel_id !==''">
			    <view class="title">职业</view><text class="title_color">：</text>
				<picker class="picker" @change="changeName" :value="jobIndex" :range="jobList" :range-key="'pro_name'">
				    <view v-if="jobIndex == -1" class="uni-input">请选择职业</view>
				    <view v-else class="uni-input">{{jobList[jobIndex].pro_name}}</view>
				    <!-- <image class="image" src="/static/image/picker.png"></image> -->
				</picker>
			</view>
			<view class="group">
			    <view class="title">已预支额</view><text class="title_color">：</text>
				<view class="input" style="line-height: 80rpx;">
					{{forms.count_money}}(占总工程款{{forms.rate}}%)
				</view>
			</view>
			<view class="group">
			    <view class="title">预支金额</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.per_amount" @input="per_amount($event)" placeholder="请输入预支金额"></input>
			</view>
			<view class="group">
			    <view class="title">金额大写</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.capital" placeholder="大写金额"></input>
			</view>
			<view class="group">
			    <view class="title">卡号</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.bank_card" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">开户行</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.bank" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" type="datetime" ref="formDate" :value="forms.pre_time" @change="changeDate($event,'pre_time')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.note" placeholder="请输入备注"></input>
			</view>
			<view class="group">
			    <view class="title">签名</view><text class="title_color">：</text>
				<view style="height: 120rpx; width: 400rpx;">
					<image class="signimage an" :src="forms.sign_name" @click="signImage" mode="aspectFill"></image>
				</view>
				<view style="color:#4C9D57;width: 160rpx;text-align: right;height: 120rpx;line-height: 120rpx;" @click="signature">点击签名</view>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="forms.uplode_img !== ''">
						<image class="image" :src="forms.uplode_img" @click="previewImage"></image>
					</view>
					<view class="item" @click="uploadImage">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				forms:{
					nick_name:'',
					quartel_account:'',//林班号
					quartel_id:'',//林班id
					bank:'',//银行
					bank_card:'',//卡号
					per_amount:'',//预支金额
					pre_time:'',
					capital:'',//大写金额
					rate:'',
					count_money:'',//已预支额
					sign_name:'',//签名
					uplode_img:'',//图片
					note:'',//备注
					job_id:''
				},
				icon:[],
				type:[
					{
						id:1,
						name:"造林",
						checked:false,
					},
					{
						id:2,
						name:"砍伐",
						checked:true,
					},
				],
				checkedArrType:2,
				ProcessList:[],
				quartel_accountShow:false,
				id:'',
				emplo_id:'',
				jobIndex:-1,
				jobList:[]
			}
		},
		onShow() {
			let sign_name = this.common.get("signature")
			if(sign_name) {
				this.forms.sign_name = sign_name
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			// 基本信息接口
			this.http({
				url:this.api.userInfo,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token")
				},
				success: res => {
					this.forms.nick_name = res.nick_name
					this.forms.bank = res.bank
					this.forms.bank_card = res.bank_card
					this.id= res.id
				}
			})
			
			let date = new Date().toISOString()
			this.forms.pre_time = this.dateFormat(date)
		},
		methods: {
			signImage() {
				let imgsArray = [];
				imgsArray[0] = this.forms.sign_name;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			signature() {
				uni.navigateTo({
					url:'/pagesA/pages/signature/signature'
				})
			},
			changeName(e) {
				this.jobIndex = e.target.value
				this.forms.job_id =  this.jobList[this.jobIndex].id
			},
			hideShow() {
				this.quartel_accountShow = false
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
					}
				},200)
				
			},
			// 下拉框文字选择
			toDetail(event,text) {
				if(text == 'quartel_account') {
					console.log('event',event)
					this.forms.quartel_id = event.id
					this.forms.quartel_account = event.quartel_name
					this.emplo_id = event.employ_id
					this.emplo_name = event.employ_name
					this.quartel_accountShow = false
					if(this.forms.per_amount !=='') { 
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:this.checkedArrType,
								emplo_id:this.emplo_id,
								quartel_id:this.forms.quartel_id,
								count_money:this.forms.per_amount
						    },
						    success: res => {
						        this.forms.capital = res.dx_count_money
								this.forms.rate = res.rate
								this.forms.count_money = res.count_money
						    }
						})
					}
					if(this.checkedArrType == 2) {
						this.http({
						    url: this.api.my_data_emplo_id,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								quartel_id:this.forms.quartel_id,
								emplo_id:this.id
						    },
						    success: res => {
								this.http({
								    url: this.api.Quartel_emplo_job_list,
								    method: "POST",
								    data: {
								        uid: this.common.get("uid"),
										token:this.common.get("token"),
										quartel_id:this.forms.quartel_id,
										emplo_id:res.scalar,
								    },
								    success: res => {
								        this.jobList = res.list
								    }
								})
						    }
						})
					}
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
							type:this.checkedArrType,
							quartel_name:search_name
						},
						success: res => {
							this.ProcessList = res.list
						}
					})
				}
			},
			dateFormat(time) {
			    let date = new Date(time);
			    let year = date.getFullYear();
			    // 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			    // 拼接
			    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			    // return year + "-" + month + "-" + day;
			},
			
			changeCheckType(e) {
				console.log(e)
				this.checkedArrType = e.detail.value;
				this.forms.quartel_id = ''
				this.forms.quartel_account = ''
				this.forms.capital = ''
				this.forms.rate = ''
				this.forms.count_money = ''
				this.forms.per_amount = ''
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
						            this.forms.uplode_img = data.data.scalar
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
			previewImage() {
				let imgsArray = [];
				imgsArray[0] = this.forms.uplode_img;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
			changeDate(eve,i) {
				if(i == 'pre_time') {
					this.forms.pre_time = eve
				}
			},
			// 预支金额输入
			per_amount(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					if(this.forms.quartel_id == '' ) {
						this.forms.per_amount = a.replace(inputRule,'')
					} else {
						this.forms.per_amount = a.replace(inputRule,'')
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:this.checkedArrType,
								emplo_id:this.emplo_id,
								quartel_id:this.forms.quartel_id,
								count_money:this.forms.per_amount
						    },
						    success: res => {
						        this.forms.capital = res.dx_count_money
								this.forms.rate = res.rate
								this.forms.count_money = res.count_money
						    }
						})
					}
					
				})
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
								url:this.api.Quartel_prepaid,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									emplo_name:this.emplo_name,
									emplo_id:this.emplo_id,
									type:this.checkedArrType,
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
										that.common.set('signature','')
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
	.group_title {
		color: #000000;
	}
	
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
			color: #000000;
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
