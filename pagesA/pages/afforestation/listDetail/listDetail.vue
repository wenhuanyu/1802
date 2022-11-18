<template>
	<view class="background fix-padding" @click="hideShow">
		<view class="good" v-if="count == 1">
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
					:disabled="disabledShow"
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
			<view class="group" >
			    <view class="title">已预支额</view><text class="title_color">：</text>
			    <!-- <input class="input" v-model="form.serial_num" placeholder="请输入身份证号"></input> -->
				<view class="input" style="line-height: 80rpx;">
					{{forms.count_money}}(占总工程款{{forms.rate}}%)
				</view>
			</view>
			<view class="group" >
			    <view class="title">预支金额</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.per_amount" @input="per_amount($event)" placeholder="请输入预支金额" :disabled="disabledShow"></input>
			</view>
			<view class="group">
			    <view class="title">金额大写</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.capital" placeholder="大写金额" disabled></input>
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
			    <uni-datetime-picker :disabled="disabledShow" type="datetime" class="date-picker" ref="formDate" :value="forms.pre_time" @change="changeDate($event,'pre_time')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">是否转账</view><text class="title_color">：</text>
			   <radio-group @change="changeCheckType" class="check_box" style="width: 556rpx; margin-left: 30rpx;">
			   	<view v-for="(item,index) in type" :key="item.id" class="check">
			   		<radio :disabled="disabledShow" class="checkClick round" :value="item.id" :checked="checkedArrType == item.id">{{item.name}}</radio>
			   	</view>
			   </radio-group>
			</view>
			<view class="group" v-if="checkedArrType == 1">
			    <view class="title">转账时间</view><text class="title_color">：</text>
			    <uni-datetime-picker :disabled="disabledShow" class="date-picker" ref="formDate" :value="forms.zz_time" @change="changeDate($event,'zz_time')" placeholder="请选择转账时间"/>
			</view>
			<view class="group">
			    <view class="title">操作员</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.sign" placeholder="请输入操作员" disabled></input>
			</view>
			<view class="group">
			    <view class="title">签名</view><text class="title_color">：</text>
			    <view style="height: 120rpx;" v-if="forms.sign_name !==''">
			    					<image class="signimage an" :src="forms.sign_name" @click="signImage" mode="aspectFill"></image>
			    				</view>
			    <input class="input" v-model="signature" disabled v-else></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.note" placeholder="请输入备注" :disabled="disabledShow"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="forms.uplode_img !== ''">
						<image class="image" :src="forms.uplode_img" @click="previewImage"></image>
					</view>
					<view class="item" @click="uploadImage" v-if="disabledShow == false">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="good" v-if="count == 2">
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
					:disabled="disabledShow"
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
					:disabled="disabledShow"
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
			    <input class="input" v-model="form.number" @input="number($event)" placeholder="请输入面积" :disabled="disabledShow"></input>
			</view>
			<view class="group">
			    <view class="title">单价</view><text class="title_color">：</text>
			    <input class="input" v-model="form.unit_price" placeholder="请输入单价" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
				<uni-datetime-picker :disabled="disabledShow" class="date-picker" ref="formDate"  :value="form.pre_time" @change="changeDate($event,'formpre_time')" placeholder="请选择时间"/>
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
			    <input class="input" v-model="form.note" placeholder="请输入备注" :disabled="disabledShow"></input>
			</view>
		</view>
		<view class="fix-bottom flex">
			<view class="flex left_button">
				<view class="left_button_cli" @click="edit"><image :src="icon[22].icon">修改</image></view>
				<view  @click="del" class="left_button_cli"><image :src="icon[33].icon">删除</image></view>
				<view class="left_button_cli" @click="print"><image :src="icon[23].icon">打印</image></view>
			</view>
		    <button class="btn-submit" @click="add">保存</button>
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
					emplo_name:'',//姓名
					emplo_id:'',
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
					note:'',//备注
					rate:'',//率
					count_money:'',//已预支额
					sign:'',//操作员
					uplode_img:'',//图片
					emplo_name:'',//姓名
					emplo_id:'',
					sign_name:''
				},
				data:'',
				option:'',
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
				checkedArrType:1, //复选框选中的值，类型
				count:'',
				NameList:[],
				ProcessList:[],
				icon:[],
				zz_time:'',
				yuzhiShow:false,
				gongShow:false,
				gongxuShow:false,
				signature:'',
				disabledShow:true
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.option = JSON.parse(decodeURIComponent(option.data))
			this.count = this.option.data_type
			this.data = this.common.get("zaolin")
			this.form.quartel_account = this.data.quartel_account
			this.form.quartel_id = this.data.id
			this.forms.quartel_account = this.data.quartel_account
			this.forms.quartel_id = this.data.id
			if(this.count == 1) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '林班预支-'+this.data.quartel_name+this.data.quartel_account
				});
			} else {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '林班工程款计算-'+this.data.quartel_name+this.data.quartel_account
				});
			}
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
				}
			})
			if(this.count == 1) {
				this.http({
					url:this.api.afforestationDetails,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						id:this.option.id
					},
					success:res =>{
						this.forms.per_amount = res.per_amount
						this.forms.bank = res.bank
						this.forms.bank_card = res.bank_card
						this.forms.capital = res.capital
						this.forms.note = res.note
						this.forms.rate = res.rate
						this.forms.sign = res.sign
						this.forms.uplode_img = res.uplode_img
						this.forms.count_money = res.count_money
						this.forms.pre_time = res.pre_time
						this.forms.zz_time = res.zz_time
						this.zz_time = res.zz_time
						this.checkedArrType = res.is_transfer
						this.forms.emplo_id = res.emplo_id
						this.forms.emplo_name = res.emplo_name
						this.form.sign_name = res.sign_name
					}
				})
			} else {
				this.http({
					url:this.api.calculateDetails,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						id:this.option.id
					},
					success:res =>{
						this.form.number = res.number
						this.form.total_price = res.total_price
						this.form.unit_price = res.unit_price
						this.form.note = res.note
						this.form.pre_time = res.pre_time
						this.form.emplo_id = res.emplo_id
						this.form.emplo_name = res.emplo_name
						this.form.jobs_id = res.jobs_id
						this.form.pro_name = res.pro_name
					}
				})
			}
		},
		methods: {
			// 编辑按钮点击
			edit() {
				this.disabledShow = false
			},
			signImage() {
				let imgsArray = [];
				imgsArray[0] = this.forms.sign_name;
				wx.previewImage({
					current: 0,
					urls: imgsArray,
				})
			},
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
								type:2,
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
				if(this.count == 1) {
					let forms = this.forms
					forms.text = 'luruyuzhi'
					forms.labelNum = 1
					forms.the_name = this.forms.emplo_name
					if (this.checkedArrType == 1) {
						forms.transfer_text = '是'
					} else {
						forms.transfer_text = '否'
					}
					forms.title = '造林预支-'+this.data.quartel_name+this.data.quartel_account
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(forms))
					})
					
				} else {
					let form = this.form
					form.text = 'lurujisuan'
					form.labelNum = 1
					form.the_name = this.form.emplo_name
					form.the_gongxu = this.form.pro_name
					form.title = '造林工程款计算-'+this.data.quartel_name+this.data.quartel_account
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form))
					})
				}
			},
			// 时间点击
			changeDate(eve,i) {
				if(i == 'pre_time') {
					this.forms.pre_time = eve
				} else if (i == 'zz_time') {
					this.forms.zz_time = eve
				} else {
					this.form.pre_time = eve
				}
			},
			// 是否转账点击
			changeCheckType(e) {
				this.checkedArrType = e.detail.value;
				if(this.checkedArrType == 1) {
					if(this.zz_time) {
						this.forms.zz_time = this.zz_time
					} else {
						let date = new Date().toISOString()
						this.forms.zz_time = this.dateFormat(date)
					}
				} else {
					this.forms.zz_time = ''
				}
				console.log(this.checkedArrType)
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
					if(this.forms.emplo_id == '' ) {
						this.forms.per_amount = a.replace(inputRule,'')
					} else {
						this.forms.per_amount = a.replace(inputRule,'')
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:2,
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
			// 删除点击
			del() {
				if (this.count == 2) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.calculateDels,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										id:this.option.id
									},
									success: res => {
										uni.showToast({
											title:'删除成功',
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
				} else {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.afforestationDels,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										id:this.option.id
									},
									success: res => {
										uni.showToast({
											title:'删除成功',
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
				}
			},
			// 添加/编辑按钮点击
			add() {
				if (this.count == 2) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.calculateEdit,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										id:this.option.id,
										quartel_id:this.data.id,
										...this.form
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
				} else {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.afforestationEdit,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										id:this.option.id,
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
				}
			}
		}
	}
</script>

<style lang="scss">
.btn-submit{
	width: 40%;
	border-radius: 0;
}
.fix-bottom {
	width: 100%;
	justify-content: space-between;
	.left_button {
		width: 100%;
		font-size: 29.16rpx;
		color: $color-6;
		font-weight: 400;
		justify-content: space-around;
		align-items: center;
		.left_button_cli {
			// margin-left: 80rpx;
			// width: 100rpx;
			display: flex;
			align-items: center;
		}
	}
	image {
		display: block;
		width: 27.77rpx;
		height: 28.47rpx;
		margin-right: 9.72rpx;
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
.good {
	padding: 0 21.52rpx;
}

.group_box {
	color: $color-3;
}
.group {
	.title {
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
		min-height: 80rpx!important;
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
.btn-col {
	border: 2.08rpx solid #4C9D57;
	border-radius: 10.41rpx;
	background: $color-f;
	color: #4C9D57;
}
</style>