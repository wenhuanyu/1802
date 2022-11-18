<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <input class="input" v-model="quartel_name" placeholder="请输入林班名称" ></input>
			</view>
			<view v-for="(item,index) in add_list" :key="index" class="add_box">
				<view class="add_list">
					<view class="group">
						<input class="input" v-model="item.quartel_account" placeholder="请输入林班号"></input>
					</view>
					<view class="line"></view>
					<view class="group">
						<input class="input" v-model="item.quartel_number" placeholder="请输入林班吨数"></input>
					</view>
				</view>
				<view class="delbox" @click="del(index)">
					-
				</view>
			</view>
			<view class="btn-submit add_button add_list_button" @click="addhao">
				<view>+继续添加林班号</view>
			</view>
			<view class="group">
			    <uni-datetime-picker class="date-picker" ref="formDate" :value="quartel_time" @change="changeDate($event,'quartel_time')" type="date" placeholder="请选择开工时间"/>
				<image :src="icon[26].icon"></image>
			</view>
			<view class="group">
				<picker
					class="top_click"
					mode = region
					@change="selCity"
					:value="cityList"
					:range="cityList"
				>
					<view class="flex">
						<view class="date_text"  style="color: #666666;" v-if="!addressNode.province">请选择省市区</view>
						<view  class="date_text" v-else>
							{{addressNode.province}}{{addressNode.city}}{{addressNode.prefecture}}
						</view>
						<image :src="icon[26].icon"></image>
					</view>
					
				</picker>
				
			</view>
		</view>
		<view class="container fix-bottom">
		    <button class="btn-submit" @click="add">{{button}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				add_list: [
					{
						quartel_number: '',
						quartel_account: '',
					}
				],
				button:'添加',
				quartel_name:'',
				quartel_time:'',
				form:'',
				icon:[],
				cityList:[],
				addressNode:{
					province:'',
					city:'',
					prefecture:''
				},
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.data = this.common.get("kanfa")
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '编辑砍伐林班-'+this.data.quartel_name
				});
				this.button = '编辑'
				this.form = JSON.parse(decodeURIComponent(option.data))
				this.addressNode.prefecture = this.form.prefecture
				this.addressNode.province = this.form.province
				this.addressNode.city = this.form.city
				this.cityList[0] = this.form.province
				this.cityList[1] = this.form.city
				this.cityList[2] = this.form.prefecture
				this.add_list= this.form.quartel_account
				this.quartel_name =  this.form.quartel_name
				this.quartel_time =  this.form.quartel_time
				// console.log('this.add_list',this.add_list)
			} else  {
				
			}
			
		},
		methods: {
			// 选择省市
			// 获取地址信息
			selCity(e) {
				console.log('e',e)
				const that = this;
				let val = e.target.value
				this.cityList = val
				that.addressNode = {
					province: this.cityList[0],
					city: this.cityList[1],
					prefecture:this.cityList[2],
				}
			},
			changeDate(eve,i) {
				this.quartel_time = eve
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
			// 增加
			addhao() {
			    let item = {
			        quartel_number: '',
			        quartel_account: '',
			    }
			    this.add_list.push(item)
			},
			// 商品删除按钮
			del(index) {
				if (this.add_list.length == 1) {
					uni.showToast({
						title:'至少添加一个林班号',
						icon:'none',
						duration: 2000
					})
				} else{
					if(this.form.id) {
						uni.showToast({
							title:'当前为编辑状态，不能删除',
							icon:'none',
							duration: 2000
						})
					} else {
						this.add_list.splice(index, 1)
					}
					
				}
			},
			// 添加/编辑按钮点击
			add() {
				if(this.form.id) {
					this.http({
						url:this.api.afforestationEdits,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:2,
							id:this.form.id,
							data:JSON.stringify(this.add_list),
							quartel_name:this.quartel_name,
							quartel_time:this.quartel_time,
							...this.addressNode
						},
						success: res => {
							uni.showToast({
								title:'编辑成功',
								icon:'none',
								duration: 2000
							})
							this.http({
								url:this.api.Quartel_quartelDetails,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									quartel_id:this.form.id
								},
								success: res => {
									this.common.set('kanfa', res)
								}
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				} else {
					this.http({
						url:this.api.addQuartel,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:2,
							data:JSON.stringify(this.add_list),
							quartel_time:this.quartel_time,
							quartel_name:this.quartel_name,
							...this.addressNode
						},
						success: res => {
							uni.showToast({
								title:'添加成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.top_click {
		display: flex;
		justify-content: space-between;
		.date_text {
			width: 683rpx;
		}
	}
.good {
	padding: 0 22.22rpx;
	.group{
		justify-content: space-between;
		.input{
			margin: 0;
		}
		.date-picker {
			width: 700rpx;
			height: 73.61rpx;
			background: #FFFFFF;
			border-radius: 6.94rpx;
			border: none!important;
			margin-left: 0!important;
		}
	}
}

.add_box {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.delbox {
	width: 50rpx;
	height: 50rpx;
	text-align: center;
	line-height: 50rpx;
	background: #4C9D57;
	color: $color-f;
	border-radius: 10rpx;
	margin-left: 10rpx;
}
.add_list {
	width: 630rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 0.69rpx solid #e2e4e8;
	.line {
		width: 75rpx;
		height: 2rpx;
		background: #666666;
	}
	.group {
		border: none;
		.input{
			width: 230rpx;
		}
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
</style>
