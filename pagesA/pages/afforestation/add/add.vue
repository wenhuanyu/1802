<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
			    <input class="input" v-model="form.quartel_name" placeholder="请输入林班名称" ></input>
			</view>
			<view class="group">
			    <input class="input" v-model="form.quartel_account" placeholder="请输入林班号"></input>
			</view>
			<view class="group">
				<picker class="top_click" mode="date" :value="form.quartel_time" @change="DateChange($event)">
					<view class="flex">
						<view class="date_text" v-if="form.quartel_time!==''">
							{{form.quartel_time}}
						</view>
						<view class="date_text" style="color: #666666;" v-else>
							请选择开工时间
						</view>
						<image :src="icon[26].icon"></image>
					</view>
				</picker>
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
				form:{
					quartel_name:'',
					quartel_time:'',
					quartel_account:''
				},
				button:'添加',
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
			this.data = this.common.get("zaolin")
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '编辑造林林班-'+this.data.quartel_name+this.data.quartel_account
				});
				this.button = '编辑'
				this.form = JSON.parse(decodeURIComponent(option.data))
				this.addressNode.prefecture = this.form.prefecture
				this.addressNode.province = this.form.province
				this.addressNode.city = this.form.city
				this.cityList[0] = this.form.province
				this.cityList[1] = this.form.city
				this.cityList[2] = this.form.prefecture
				console.log('this.form',this.form)
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
			// 选择日期
			DateChange(eve) {
				this.form.quartel_time = eve.detail.value
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
				if(this.form.id) {
					this.http({
						url:this.api.afforestationEdits,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:1,
							...this.form
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
									this.common.set('zaolin', res)
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
							type:1,
							...this.form,
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
.good {
	padding: 0 22.22rpx;
	.group{
		justify-content: space-between;
	}
}
.top_click {
	display: flex;
	justify-content: space-between;
	.date_text {
		width: 670rpx;
	}
}

</style>
