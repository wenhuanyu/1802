<template>
	<view class="background fix-padding" @click="hideShow">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="good" v-if="count == 0">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择姓名"
					v-model="forms.emplo_name" 
					@focus="search_site($event,'yuzhi')" 
					@input="search_site($event,'yuzhi')"
					@blur="search_blur($event,'yuzhi')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="yuzhiShow">
					<view v-for="item in NameList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:forms.emplo_id == item.peasant_id}">
						<view @click="toDetail(item,'yuzhi')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">林班号</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.quartel_account" placeholder="请选择林班号" disabled></input>
			</view>
			<view class="group">
			    <view class="title">已预支额</view><text class="title_color">：</text>
			    <!-- <input class="input" v-model="form.serial_num" placeholder="请输入身份证号"></input> -->
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
			    <input class="input" v-model="forms.bank_card" placeholder="请输入卡号" disabled></input>
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
			    <view class="title">是否转账</view><text class="title_color">：</text>
			   <radio-group @change="changeCheckType" class="check_box" style="width: 556rpx; margin-left: 30rpx;">
					<view v-for="(item,index) in type" :key="index" class="check">
						<radio class="checkClick round" :value="item.id" :checked="checkedArrType == item.id">{{item.name}}</radio>
					</view>
			   </radio-group>
			</view>
			<view class="group" v-if="checkedArrType == 1">
			    <view class="title">转账时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate" :value="forms.zz_time" @change="changeDate($event,'zz_time')" placeholder="请选择转账时间"/>
			</view>
			<view class="group">
			    <view class="title">操作员</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.sign" placeholder="请输入操作员" disabled></input>
			</view>
			<view class="group">
			    <view class="title">签名</view><text class="title_color">：</text>
			    <input class="input" v-model="signature" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.note" placeholder="请输入备注"></input>
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
		<view class="good" v-if="count == 1">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择姓名"
					v-model="form.emplo_name" 
					@focus="search_site($event,'gong')" 
					@input="search_site($event,'gong')"
					@blur="search_blur($event,'gong')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="gongShow">
					<view v-for="item in NameList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:form.emplo_id == item.peasant_id}">
						<view @click="toDetail(item,'gong')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">工序</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择工序"
					v-model="form.pro_name" 
					@focus="search_site($event,'gongxu')" 
					@input="search_site($event,'gongxu')"
					@blur="search_blur($event,'gongxu')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="gongxuShow">
					<view v-for="item in ProcessList" :key="item.id" class="group_down_list" :class="{group_down_index:form.jobs_id == item.id}">
						<view @click="toDetail(item,'gongxu')" >{{item.pro_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">亩</view><text class="title_color">：</text>
			    <input class="input" v-model="form.number" @input="number($event)" placeholder="请输入面积"></input>
			</view>
			<view class="group">
			    <view class="title">单价</view><text class="title_color">：</text>
			    <input class="input" v-model="form.unit_price" placeholder="请输入单价" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
				<uni-datetime-picker class="date-picker" ref="formDate" :value="form.pre_time" @change="changeDate($event,'pre_time_form')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">林班号</view><text class="title_color">：</text>
			    <input class="input" v-model="form.quartel_account" placeholder="请输入林班号" disabled></input>
			</view>
			<view class="group">
			    <view class="title">总价</view><text class="title_color">：</text>
			    <input class="input" v-model="form.total_price" placeholder="请输入总价" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form.note" placeholder="请输入备注"></input>
			</view>
		</view>
		<view class="container fix-bottom flex">
			<button class="btn-submit mr-20 btn-col"  @click="print">打印</button>
			<!-- <navigator url="../../print/print"></navigator> -->
		    <button class="btn-submit" @click="add">保存</button>
		</view>
		<view class="making flex" @click="qingkong">
			<image :src="icon[23].icon"></image>
		    <view class="text">清空</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					number:'',//亩
					unit_price:'',//单价
					quartel_account:'',//林班号
					quartel_id:'',//林班id
					pre_time:'',//时间
					note:'',//备注
					jobs_id:'',//工序id
					pro_name:'',//工序
				},
				forms:{
					quartel_account:'',//林班号
					bank:'',//银行
					bank_card:'',//卡号
					per_amount:'',//预支金额
					pre_time:'',
					capital:'',//大写金额
					rate:'',
					count_money:'',//已预支额
					sign:'',//操作员
					uplode_img:'',//图片
					note:'',//备注
					emplo_name:'',//姓名
					emplo_id:'',
					
				},
				data:'',
				type:[
					{
						id:1,
						name:"是",
					},
					{
						id:0,
						name:"否",
					},
				],
				checkedArrType:0, //复选框选中的值，类型
				items:[
					"预支",
					"工程款计算"
				],
				count:0,
				NameList:[],
				ProcessList:[],
				sign:'',
				icon:[],
				// print_id:'',
				yuzhiShow:false,
				gongShow:false,
				gongxuShow:false,
				signature:''
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			this.form.quartel_account = this.data.quartel_account
			this.form.quartel_id = this.data.id
			this.forms.quartel_account = this.data.quartel_account
			this.forms.quartel_id = this.data.id
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '录入-'+this.data.quartel_name+this.data.quartel_account
			});
			// 操作员
			this.http({
				url:this.api.My_Data,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
					token:this.common.get("token"),
				},
				success:res =>{
					this.forms.sign = res.name
					this.sign = res.name
				}
			})
			let date = new Date().toISOString()
			this.forms.pre_time = this.dateFormat(date)
		},
		methods: {
			hideShow() {
				this.yuzhiShow = false
				this.gongShow = false
				this.gongxuShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'yuzhi') {
						// this.yuzhiShow = false
						if(this.forms.emplo_id=='') {
							this.forms.emplo_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.forms.emplo_id == item.peasant_id) {
									this.forms.emplo_name = item.nick_name
								}
							})
						}			
					} else if(text == 'gong') {
						// this.gongShow = false
						if(this.form.emplo_id=='') {
							this.form.emplo_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.form.emplo_id == item.peasant_id) {
									this.form.emplo_name = item.nick_name
								}
							})
						}
					} else if(text == 'gongxu') {
						// this.gongxuShow = false
						if(this.form.jobs_id=='') {
							this.form.pro_name = ''
						} else {
							this.ProcessList.map((item,index) => {
								if(this.form.jobs_id == item.id) {
									this.form.pro_name = item.pro_name
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
				if(text == 'yuzhi') {
					this.forms.emplo_id = event.peasant_id
					this.forms.emplo_name = event.nick_name
					if(this.forms.per_amount !=='') {
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:1,
								emplo_id:this.forms.emplo_id,
								quartel_id:this.data.id,
								count_money:this.forms.per_amount
						    },
						    success: res => {
						        this.forms.capital = res.dx_count_money
								this.forms.rate = res.rate
								this.forms.count_money = res.count_money
						    }
						})
					}
					this.forms.bank = event.bank
					this.forms.bank_card = event.bank_card
					this.yuzhiShow = false
				} else if(text == 'gong') {
					this.gongShow = false
					this.form.emplo_id = event.peasant_id
					this.form.emplo_name = event.nick_name
				} else if(text == 'gongxu') {
					this.gongxuShow = false
					this.form.jobs_id = event.id
					this.form.pro_name = event.pro_name
					this.form.unit_price = event.wage
					this.form.total_price = Number(this.form.unit_price)*Number(this.form.number)
				}
				
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'yuzhi') {
					this.yuzhiShow = true
					// 民工
					this.http({
					    url: this.api.pounds_employees,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				} else if(text == 'gong') {
					this.gongShow = true
					// 民工
					this.http({
					    url: this.api.pounds_employees,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				} else if(text == 'gongxu') {
					this.gongxuShow = true
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
			// 打印点击
			print() {
				if(this.count == 0) {
					let forms = this.forms
					forms.text = 'luruyuzhi'
					forms.labelNum = 1
					forms.the_name = this.forms.emplo_name
					if (this.checkedArrType == 1) {
						forms.transfer_text = '是'
					} else {
						forms.transfer_text = '否'
					}
					forms.title = '造林预支录入-'+this.data.quartel_name+this.data.quartel_account
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(forms))
					})
				} else{
					let form = this.form
					form.text = 'lurujisuan'
					form.labelNum = 1
					form.the_name = this.form.emplo_name
					form.the_gongxu = this.form.pro_name
					form.title = '造林工程款计算录入-'+this.data.quartel_name+this.data.quartel_account
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form))
					})
				}
				
			},
			changeDate(eve,i) {
				if(i == 'pre_time') {
					this.forms.pre_time = eve
				} else if (i == 'zz_time') {
					this.forms.zz_time = eve
				} else if (i =='pre_time_form') {
					this.form.pre_time = eve
				}
			},
			// 是否转账点击
			changeCheckType(e) {
				this.checkedArrType = e.detail.value;
				if(this.checkedArrType == 1) {
					let date = new Date().toISOString()
					this.forms.zz_time = this.dateFormat(date)
				} else {
					this.forms.zz_time = ''
				}
			},
			// 亩数
			number(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					this.form.number = a.replace(inputRule,'')
					this.form.total_price = Number(this.form.unit_price)*Number(this.form.number).toFixed(2)
				})
			},
			// 预支金额输入
			per_amount(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					if(this.forms.emplo_id =='') {
						this.forms.per_amount = a.replace(inputRule,'')
					} else {
						this.forms.per_amount = a.replace(inputRule,'')
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:1,
								emplo_id:this.forms.emplo_id,
								quartel_id:this.data.id,
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
			qingkong() {
				if(this.count == 0) {
					this.forms = {
						quartel_account:'',//林班号
						bank:'',//银行
						bank_card:'',//卡号
						per_amount:'',//预支金额
						capital:'',//大写金额
						rate:'',//备注
						count_money:'',//已预支额
						sign:'',//操作员
						uplode_img:'',//图片
						pre_time:'',
						zz_time:'',
						emplo_id:'',
						emplo_name:''
					}
					this.forms.quartel_account = this.data.quartel_account
					this.forms.quartel_id = this.data.id
					this.forms.sign = this.sign
					this.checkedArrType = 0
					// console.log('this.type',this.type)
					let date = new Date().toISOString()
					this.forms.pre_time = this.dateFormat(date)
				} else {
					this.form = {
						number:'',//亩
						unit_price:'',//单价
						quartel_account:'',//林班号
						quartel_id:'',//林班id
						pre_time:'',//时间
						note:'',//备注
						emplo_id:'',
						emplo_name:'',
						pro_name:'',
						jobs_id:'',
					}
					this.form.quartel_account = this.data.quartel_account
					this.form.quartel_id = this.data.id
					let date = new Date().toISOString()
					this.form.pre_time = this.dateFormat(date)
				}
			},
			// tab栏点击事件
			change(e) {
				this.count = e
				let date = new Date().toISOString()
				if(this.count == 0) {
					if(!this.forms.pre_time) {
						this.forms.pre_time = this.dateFormat(date)
					}
				} else {
					if(!this.form.pre_time) {
						this.form.pre_time = this.dateFormat(date)
					}
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
			// 添加/编辑按钮点击
			add() {
				if (this.count == 1) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.calculateAdds,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										...this.form
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// this.print_id = res.scalar
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.afforestationAdds,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										type:1,
										quartel_id:this.data.id,
										is_transfer:this.checkedArrType,
										...this.forms
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.making {
	position: fixed;
	top: 70%;
	right: 0;
	width: 120rpx;
	height: 60rpx;
	background: $color-f;
	border: 3rpx solid #4C9D57;
	border-radius: 200rpx 0px 0px 200rpx;
	z-index: 20;
	font-size: 24rpx;
	color: #4C9D57;
	image {
		width: 22rpx;
		height: 24rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
	}
}
.uni-date-editor--x .uni-date__icon-clear {
	display: none;
}
.uni-date-x--border {
	border: none!important;
}
.uni-icons {
	display: none;
}
.uni-date {
	height: 80rpx;
}
	.tab {
		padding: 18.75rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		font-size: 29.16rpx;
		color: $color-3;
		// box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
		.tab_list {
			// width: 218.05rpx;
		}
	}
	.btna {
		padding: 18.75rpx 0;
		color: #4C9D57;
		border-bottom: 0.69rpx solid #4C9D57;
	}
.good {
	padding: 0 21.52rpx;
	.group {
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
			color: $color-3;
			font-size: 29.16rpx;
		}
	}
}
.allcheck {
	width: 30%;
	margin-top: 36rpx;
}
.check_box {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-bottom: 36.11rpx;
	.check {
		width: 30%;
		margin-top: 36rpx;
		margin-right: 6.94rpx;
		font-size: 29.16rpx;
		font-weight: 400;
		color: $color-6;
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
.top_click {
	margin-left: 20rpx;
	 padding: 0 20rpx;
	height: 80rpx;
	background: #FFFFFF;
	border: none!important;
	display: flex;
	align-items: center;
	color: $color-6;
	}
.con {
	width: 516rpx;
	margin-left: 20rpx;
	border: 2rpx solid #E7E7E7;
	border-radius: 8rpx;
	padding: 20rpx;
}
.content {
	flex-direction: column;
	align-items : flex-start;
	.title {
		width: 180rpx;
		margin-top: 35.41rpx;
	}
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
