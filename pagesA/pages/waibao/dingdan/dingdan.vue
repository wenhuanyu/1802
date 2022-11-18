<template>
	<view class="fix-padding">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="linban_bigbox">
			<view class="linban_box">
				<view v-if="list.length == 0"  class="item" style="width: 600rpx;">
					<view>请先添加林班</view>
				</view>
				<view v-else v-for="(item,index) in list" :key="index" class="item" :class="{itemColor:itemCount == index}" @click="xuanze(item,index)" >
					<view>{{item.name}}</view>
				</view>
			</view>
			<view class="image" @click="addlinban">
				<image :src="icon[34].icon"></image>
			</view>
		</view>
		<view class="good" v-if="count == 0">
			<view class="group">
				<view class="title">外包单号</view><text class="title_color">：</text>
				<input class="input" v-model="form.order_num" placeholder="请输入" ></input>
			</view>
			<view class="group">
				<view class="title">发包面积</view><text class="title_color">：</text>
				<input class="input" v-model="form.bidding" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">小班名称</view><text class="title_color">：</text>
				<input class="input" v-model="form.name" placeholder="请输入" disabled></input>
			</view>
			<view class="group">
				<view class="title">包商代号</view><text class="title_color">：</text>
				<input class="input" v-model="form.code" placeholder="请输入"></input>
			</view>
			<view class="group">
				<view class="title">营林合同号</view><text class="title_color">：</text>
				<input class="input" v-model="form.contract" placeholder="请输入"></input>
			</view>
		</view>
		<view class="container"  v-if="count == 0">
			<view class="box_title">工序</view>
		</view>
		<view class="table"  v-if="count == 0">
			<uni-table border stripe emptyText="暂无更多数据" >
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" >序号</uni-th>
					<uni-th align="center" >工序名称</uni-th>
					<uni-th align="center" >单价</uni-th>
					<uni-th align="center" >数量</uni-th>
					<uni-th align="center" >金额</uni-th>
					<uni-th align="center" >开工日期</uni-th>
					<uni-th align="center" >完工日期</uni-th>
					<uni-th align="center" >实际开工</uni-th>
					<uni-th align="center" >实际完工</uni-th>
					<uni-th align="center" >操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr class="uni-tr"  v-for="(item,index) in gongXulist" :key="index">
					<uni-td align="center"><view>{{index+1}}</view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" @change="changeWarehouse($event,index)" :value="item.wIndex" :range="warehouse"
						    :range-key="'name'">
						    <view v-if="item.wIndex == -1" class="uni-input">请选择</view>
						    <view v-else class="uni-input">{{warehouse[item.wIndex].name}}</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view><input class="input" v-model="item.price" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" v-model="item.num" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" v-model="item.money" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" mode="date" :value="item.start_date" @change="changeDate($event,'start_date',index)">
							<view class="date_text" v-if="item.start_date!==''">
								{{item.start_date}}
							</view>
							<view class="date_text" v-else>
								请选择
							</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" mode="date" :value="item.end_date" @change="changeDate($event,'end_date',index)">
							<view class="date_text" v-if="item.end_date!==''">
								{{item.end_date}}
							</view>
							<view class="date_text" v-else>
								请选择
							</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" mode="date" :value="item.practical_start_date" @change="changeDate($event,'practical_start_date',index)">
							<view class="date_text" v-if="item.practical_start_date!==''">
								{{item.practical_start_date}}
							</view>
							<view class="date_text" v-else>
								请选择
							</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" mode="date" :value="item.practical_end_date" @change="changeDate($event,'practical_end_date',index)">
							<view class="date_text" v-if="item.practical_end_date!==''">
								{{item.practical_end_date}}
							</view>
							<view class="date_text" v-else>
								请选择
							</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view @click="delGongxu(index)"><view style="color: #4C9D57;">删除</view></view></uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="btn-submit add_button" @click="addGongxu"  v-if="count == 0">
			<view>+增加一条</view>
		</view>
		<view class="table"  v-if="count == 2">
			<uni-table border stripe emptyText="暂无更多数据" >
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" >序号</uni-th>
					<uni-th align="center" >吨/亩</uni-th>
					<uni-th align="center" >申请金额</uni-th>
					<uni-th align="center" >扣款</uni-th>
					<uni-th align="center" >转归保证金</uni-th>
					<uni-th align="center" >实际金额</uni-th>
					<uni-th align="center" >开票日期</uni-th>
					<uni-th align="center" >备注</uni-th>
					<uni-th align="center" >操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr class="uni-tr"  v-for="(item,index) in fapiaoList" :key="index">
					<uni-td align="center"><view>{{index+1}}</view></uni-td>
					<uni-td align="center"><view><input class="input" :value="item.ton" @input="Ton($event,index)" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" :value="item.money"  @input="Money($event,index)"  placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" :value="item.deduct_money" @input="DeductMoney($event,index)"  placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" :value="item.earnest_money" @input="EarnestMoney($event,index)" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view><input class="input" :value="item.reality_money" @input="RealityMoney($event,index)" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view>
						<picker class="top_click" mode="date" :value="item.make_date" @change="changeDate($event,'make_date',index)">
							<view class="date_text" v-if="item.make_date!==''">
								{{item.make_date}}
							</view>
							<view class="date_text" v-else>
								请选择
							</view>
						</picker>
					</view></uni-td>
					<uni-td align="center"><view><input class="input" v-model="item.remark" placeholder="请输入"></input></view></uni-td>
					<uni-td align="center"><view @click="delGongxu(index)"><view style="color: #4C9D57;">删除</view></view></uni-td>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr class="uni-tr">
					<uni-td align="center"><view>合计</view></uni-td>
					<uni-td align="center"><view v-if="dunHeji == ''">-</view><view v-else>{{dunHeji}}</view></uni-td>
					<uni-td align="center"><view v-if="moneyHeji == ''">-</view><view v-else>{{moneyHeji}}</view></uni-td>
					<uni-td align="center"><view v-if="DeductMoneyHeji == ''">-</view><view v-else>{{DeductMoneyHeji}}</view></uni-td>
					<uni-td align="center"><view v-if="EarnestMoneyHeji == ''">-</view><view v-else>{{EarnestMoneyHeji}}</view></uni-td>
					<uni-td align="center"><view v-if="RealityMoneyHeji == ''">-</view><view v-else>{{RealityMoneyHeji}}</view></uni-td>
					<uni-td align="center"><view>-</view></uni-td>
					<uni-td align="center"><view>-</view></uni-td>
					<uni-td align="center"><view>-</view></uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="btn-submit add_button" @click="addGongxu"  v-if="count == 2">
			<view>+增加一条</view>
		</view>
		<view class="container">
			<view class="box_title">图片上传</view>
		</view>
		<view v-for="(item,index) in add_list" :key="index" class="add_box mb-20">
			<view class="add_list">
				<view class="group flex">
					<view class="add_title">{{index+1}}.</view>
					<input class="input" v-model="item.text" placeholder="请输入"></input>
				</view>
				<view class="group_image">
					<view class="remarkImage flex">
						<view class="item" @click="uploadImage(index)">
							<view class="item_image">
								<image class="image" :src="icon[25].icon"></image>
							</view>
						</view>
						<view class="item" v-if="item.image !==''">
							<image class="image" :src="item.image" @click="previewImage(index)"></image>
						</view>
					</view>
				</view>
			</view>
			<view v-if="index!==0" class="add_del" @click="del(index)">
				<image :src="icon[33].icon"></image>
			</view>
		</view>
		<view class="btn-submit add_button add_list_button" @click="add">
			<view>+继续添加</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="submit">保存</button>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main">
				<view style="display: flex;justify-content: center;flex-wrap: wrap;">
					<input class="input" style="border: 1px solid #CCCCCC;width: 660rpx; height: 90rpx;margin-top: 30rpx;padding: 0 20rpx;" v-model="name" placeholder="请输入林班名称"></input>
					<view class="flex" style="margin: 50rpx;border: 0!important;">
						<button class="btn_waibao" style="background: #ffffff;color:#4C9D57 ;" @click="quxiao">取消</button>
						<button class="btn_waibao" @click="queding">确定</button>
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
				items:[
					"外包订单",
					"验收报告",
					"发票",
					"延期报告"
				],
				count:0,
				itemCount:-1,
				list:[],
				add_list: [
					{
						text: "",
						image:'',
					}
				],
				gongXulist:[
					{
						jobs_name:'',
						job_id:'',
						price:'',
						num:'',
						money:'',
						start_date:'',
						end_date:'',
						practical_start_date:'',
						practical_end_date:'',
						wIndex:-1,
					}
				],
				fapiaoList:[
					{
						ton:'',
						money:'',
						deduct_money:'',
						earnest_money:'',
						reality_money:'',
						make_date:'',
						remark:''
					}
				],
				warehouse:[],
				id:'',
				show:false,
				name:'',
				form:{
					order_num:'',
					contract:'',
					bidding:'',
					name:'',
					code:'',
					quartel_id:''
				},
				quartel_id:'',
				dunHeji:'',
				moneyHeji:'',
				DeductMoneyHeji:'',
				EarnestMoneyHeji:'',
				RealityMoneyHeji:'',
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			if (option.data) {
				this.id = JSON.parse(decodeURIComponent(option.data)).id
			}
			this.linban()
			// 工序接口
			this.http({
			    url: this.api.Epiboly_new_processList,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        token: this.common.get("token"),
			    },
			    success: res => {
			        this.warehouse = res.list
			    }
			})
		},
		methods: {
			// 吨合计
			Ton(e,i) {
				this.fapiaoList[i].ton = e.detail.value
				this.dunHeji = 0
				this.fapiaoList.map((item,index) =>{
					this.dunHeji = Number(this.dunHeji)+Number(item.ton)
				})
			},
			// 申请金额合计
			Money(e,i) {
				this.fapiaoList[i].money = e.detail.value
				this.moneyHeji = 0
				this.fapiaoList.map((item,index) =>{
					this.moneyHeji = Number(this.moneyHeji)+Number(item.money)
				})
			},
			// 扣款合计
			DeductMoney(e,i) {
				this.fapiaoList[i].deduct_money = e.detail.value
				this.DeductMoneyHeji = 0
				this.fapiaoList.map((item,index) =>{
					this.DeductMoneyHeji = Number(this.DeductMoneyHeji)+Number(item.deduct_money)
				})
			},
			// 保证金合计
			EarnestMoney(e,i) {
				this.fapiaoList[i].earnest_money = e.detail.value
				this.EarnestMoneyHeji = 0
				this.fapiaoList.map((item,index) =>{
					this.EarnestMoneyHeji = Number(this.EarnestMoneyHeji)+Number(item.earnest_money)
				})
			},
			// 实际金额
			RealityMoney(e,i) {
				this.fapiaoList[i].reality_money = e.detail.value
				this.RealityMoneyHeji = 0
				this.fapiaoList.map((item,index) =>{
					this.RealityMoneyHeji = Number(this.RealityMoneyHeji)+Number(item.reality_money)
				})
			},
			// 选择小林班
			xuanze(item,index) {
				this.itemCount = index
				this.form.name = item.name
				this.form.quartel_id = item.id
				this.quartel_id = item.id
				if(this.count == 0) {
					// 基本信息接口
					this.http({
						url:this.api.Epiboly_epiboly_data_show,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.form.quartel_id,
						},
						success: res => {
							if(res.quartel_id) {
								this.form.quartel_id = res.quartel_id
								this.form.name = res.name
							} else {
								this.form.name = item.name
								this.form.quartel_id = item.id
							}
							
							this.form.order_num = res.order_num
							this.form.contract = res.contract
							this.form.bidding = res.bidding
							this.form.code = res.code
							this.gongXulist = res.job_data
							if (this.gongXulist.length == 0) {
								let item = {
									job_id:'',
								    jobs_name:'',
								    price:'',
								    num:'',
								    money:'',
								    start_date:'',
								    end_date:'',
								    practical_start_date:'',
								    practical_end_date:'',
									wIndex:-1
								}
								this.gongXulist.push(item)
							}
							this.add_list = res.image_data
							if(this.add_list.length == 0) {
								let item = {
								    text: "",
								    image:'',
								}
								this.add_list.push(item)
							}
						}
					})
				} else if (this.count == 1) {
					// 基本信息接口
					this.http({
						url:this.api.Epiboly_show_check_report,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.quartel_id,
						},
						success: res => {
							if(res.quartel_id) {
								this.quartel_id = res.quartel_id
							} else {
								this.quartel_id = item.id
							}
							this.add_list = res.list
							if(this.add_list.length == 0) {
								let item = {
								    text: "",
								    image:'',
								}
								this.add_list.push(item)
							}
							
						}
					})
				} else if (this.count == 3) {
					// 基本信息接口
					this.http({
						url:this.api.Epiboly_show_postpone_report,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.quartel_id,
						},
						success: res => {
							if(res.quartel_id) {
								this.quartel_id = res.quartel_id
							} else {
								this.quartel_id = item.id
							}
							this.add_list = res.list
							if(this.add_list.length == 0) {
								let item = {
								    text: "",
								    image:'',
								}
								this.add_list.push(item)
							}
							
						}
					})
				} else if (this.count == 2) {
					// 基本信息接口
					this.http({
						url:this.api.Epiboly_show_invoice,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.quartel_id,
						},
						success: res => {
							if(res.quartel_id) {
								this.quartel_id = res.quartel_id
							} else {
								this.quartel_id = item.id
							}
							this.add_list = res.image_data
							if(this.add_list.length == 0) {
								let item = {
								    text: "",
								    image:'',
								}
								this.add_list.push(item)
							}
							this.fapiaoList = res.invoice_data
							this.dunHeji = 0
							this.moneyHeji = 0
							this.DeductMoneyHeji = 0
							this.EarnestMoneyHeji = 0
							this.RealityMoneyHeji = 0
							this.fapiaoList.map((item,index) =>{
								this.dunHeji = Number(this.dunHeji)+Number(item.ton)
								this.moneyHeji = Number(this.moneyHeji)+Number(item.money)
								this.DeductMoneyHeji = Number(this.DeductMoneyHeji)+Number(item.deduct_money)
								this.EarnestMoneyHeji = Number(this.EarnestMoneyHeji)+Number(item.earnest_money)
								this.RealityMoneyHeji = Number(this.RealityMoneyHeji)+Number(item.reality_money)
							})
							if(this.fapiaoList.length == 0) {
								let item = {
									ton:'',
									money:'',
									deduct_money:'',
									earnest_money:'',
									reality_money:'',
									make_date:'',
									remark:''
								}
								this.fapiaoList.push(item)
							}
						}
					})
				}
			},
			// 添加图片
			uploadImage(i) {
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
						            this.add_list[i].image=data.data.scalar
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
			// 弹框图像预览
			previewImage(i) {
			    wx.previewImage({
			        current: this.add_list[i].image,
			        urls: [this.add_list[i].image]
			    })
			},
			// 选择工序
			changeWarehouse(e,index) {
				this.gongXulist[index].wIndex = e.target.value
				this.gongXulist[index].jobs_name = this.warehouse[e.target.value].name
				this.gongXulist[index].job_id = this.warehouse[e.target.value].id
			},
			changeDate(eve,i,index) {
				if(i == 'practical_end_date') {
					this.gongXulist[index].practical_end_date = eve.detail.value
				} else if(i == 'practical_start_date') {
					this.gongXulist[index].practical_start_date = eve.detail.value
				} else if(i == 'end_date') {
					this.gongXulist[index].end_date = eve.detail.value
				} else if(i == 'start_date') {
					this.gongXulist[index].start_date = eve.detail.value
				} else if(i == 'make_date') {
					this.fapiaoList[index].make_date = eve.detail.value
				}
			},
			linban() {
				this.http({
					url:this.api.Epiboly_small_quartel,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						quartel_id:this.id,
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
					}
				})
			},
			// 添加小林班
			addlinban() {
				this.show = true
			},
			quxiao() {
				this.show = false
			},
			
			// 添加小林班确定按钮点击
			queding() {
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Epiboly_add_small_quartel,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									quartel_id:this.id,
									name:this.name
								},
								success: res => {
									uni.showToast({
										title:'添加成功',
										icon:'none',
										duration: 2000
									})
									this.show = false
									setTimeout(() => {
										this.linban()
									},100)
								}
							})
						}			
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 增加
			add() {
			    let item = {
			        text: "",
			        image:'',
			    }
			    this.add_list.push(item)
			},
			// 增加工序
			addGongxu() {
				if(this.count == 0) {
					let item = {
						job_id:'',
					    jobs_name:'',
					    price:'',
					    num:'',
					    money:'',
					    start_date:'',
					    end_date:'',
					    practical_start_date:'',
					    practical_end_date:'',
						wIndex:-1
					}
					this.gongXulist.push(item)
				} else if(this.count == 2) {
					let item1 = {
						ton:'',
						money:'',
						deduct_money:'',
						earnest_money:'',
						reality_money:'',
						make_date:'',
						remark:''
					}
					this.fapiaoList.push(item1)
				}
			},
			// 删除工序
			delGongxu(index) {
				if(this.count == 0) {
					if (this.gongXulist.length == 1) {
						uni.showToast({
							title:'最少增加一条工序',
							icon:'none',
							duration: 2000
						})
					} else{
						this.gongXulist.splice(index, 1)
					}
				} else if (this.count == 2) {
					if (this.fapiaoList.length == 1) {
						uni.showToast({
							title:'最少增加一条',
							icon:'none',
							duration: 2000
						})
					} else{
						this.fapiaoList.splice(index, 1)
						this.dunHeji = 0
						this.moneyHeji = 0
						this.DeductMoneyHeji = 0
						this.EarnestMoneyHeji = 0
						this.RealityMoneyHeji = 0
						this.fapiaoList.map((item,index) =>{
							this.dunHeji = Number(this.dunHeji)+Number(item.ton)
							this.moneyHeji = Number(this.moneyHeji)+Number(item.money)
							this.DeductMoneyHeji = Number(this.DeductMoneyHeji)+Number(item.deduct_money)
							this.EarnestMoneyHeji = Number(this.EarnestMoneyHeji)+Number(item.earnest_money)
							this.RealityMoneyHeji = Number(this.RealityMoneyHeji)+Number(item.reality_money)
						})
					}
				}
				
			},
			// 图片删除按钮
			del(index) {
				this.add_list.splice(index, 1)
			},
			// tab栏点击事件
			change(e) {
				console.log(e)
				this.count = e
				this.itemCount = -1
				this.form = {}
				this.gongXulist = [
					{
						job_id:'',
						jobs_name:'',
						price:'',
						num:'',
						money:'',
						start_date:'',
						end_date:'',
						practical_start_date:'',
						practical_end_date:'',
						wIndex:-1
					}
				]
				this.add_list = [
					{
						text: "",
						image:'',
					}
				]
				this.fapiaoList = [
					{
						ton:'',
						money:'',
						deduct_money:'',
						earnest_money:'',
						reality_money:'',
						make_date:'',
						remark:''
					}
				]
			},
			// 详情点击
			details() {
				uni.navigateTo({
					// url:'/pages/warehouse/add/add?data='+encodeURIComponent(JSON.stringify(eve))
					url:'/pagesC/pages/apply/details/details'
				})
			},
			// 保存
			submit() {
				if(this.count == 0) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_epiboly_data,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										image_data:JSON.stringify(this.add_list),
										job_data:JSON.stringify(this.gongXulist),
										...this.form
									},
									success: res => {
										uni.showToast({
											title:'添加成功',
											icon:'none',
											duration: 2000
										})
									}
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else if (this.count == 1) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_add_heck_report,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										image_data:JSON.stringify(this.add_list),
										quartel_id:this.quartel_id
									},
									success: res => {
										uni.showToast({
											title:'添加成功',
											icon:'none',
											duration: 2000
										})
									}
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else if (this.count == 3) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_add_postpone_report,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										image_data:JSON.stringify(this.add_list),
										quartel_id:this.quartel_id
									},
									success: res => {
										uni.showToast({
											title:'添加成功',
											icon:'none',
											duration: 2000
										})
									}
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else if (this.count == 2) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Epiboly_add_invoice,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										image_data:JSON.stringify(this.add_list),
										invoice_data:JSON.stringify(this.fapiaoList),
										quartel_id:this.quartel_id
									},
									success: res => {
										uni.showToast({
											title:'添加成功',
											icon:'none',
											duration: 2000
										})
									}
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
		}
	}
</script>

<style lang="scss">
.uni-tr {
	.input {
		width: 200rpx;
	}
}
.top_click {
	// width: 700rpx;
	// min-height: 92.36rpx;
	border: none!important;
	display: flex;
	align-items: center;
	.date_text {
		font-size: 29.16rpx;
		color: $color-3;
	}
}
.table .uni-table-th {
	width: 250rpx;
}

.modal_bottom {
	background: rgba(0, 0, 0, 0.5);
	.btn_waibao {
		width: 300rpx;
		border: 2rpx solid #4C9D57;
		background: #4C9D57;
		border-radius: 10rpx;
		color: #FFFFFF;
		font-size: 33.33rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
}
.add_box {
	padding: 0 36.8rpx;
	display: flex;
	align-items: center;
}
.add_list {
	width: 100%;
	margin-bottom: 24.3rpx;
	.border {
		border: none;
	}
}
.add_del {
	width: 105.55rpx;
	height: 294.44rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background: #E2F5D1;
	border-radius: 6.94rpx;
	image {
		width: 31.25rpx;
		height: 34.02rpx;
	}
}
.add_list_button {
	border: none!important;
	margin-left: 0!important;
}
.add_button {
	background: $color-f!important;
	border: 0.69rpx solid #e2e4e8;
	border-radius: 0;
	border-top: none!important;
	color: #4C9D57;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-left: 21.52rpx;
}
.table {
	min-height: 10vh;
	padding: 0 0 0 21.52rpx;
	.uni-table-loading {
		height: 10vh!important;
		
	}
	.uni-table-scroll {
		min-height: 10vh;
	}
}
.box_title {
	padding-left: 13.88rpx;
	border-left: 9.72rpx solid #4C9D57;
	font-size: 29.16rpx;
	font-weight: 400;
	color: $color-3;
}
.good {
	padding: 0 21.52rpx;
	margin-top: -20rpx;
	.group {
		.title {
			width: 150rpx;
			color: $color-3;
		}
		.title_color {
			color: $color-3;
		}
	}
}
.group_box {
	color: $color-3;
}

.linban_bigbox {
	display: flex;
	.linban_box {
		padding: 21.52rpx 0;
		width: 708.33rpx;
		display: flex;
		align-items: center;
		overflow-x: auto;
		white-space:nowrap;
		&::-webkit-scrollbar{// 滚动条整体
			background:none;
		}
		
		.item {
			margin-left: 15.97rpx;
			padding: 0 17.36rpx;
			height: 61.11rpx;
			line-height: 61.11rpx;
			box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
			border-radius: 6.94rpx;
			font-size: 29.16rpx;
			font-weight: 400;
			color: $color-6;
			text-align: center;
		}
		.itemColor {
			color: #4C9D57;
			box-shadow: 0px 0px 20.83rpx 0px rgba(76, 157, 87, 0.5);
		}
	}
	.image {
		margin-top: 15rpx;
		image {
			width: 75rpx;
			height: 75rpx;
		}
	}
}
.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 4.86rpx solid #4C9D57;
}
</style>
