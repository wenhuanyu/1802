<template>
	<view class="background fix-padding">
		<view class="good">
			<view class="group">
				<view class="title">职业</view><text class="title_color">：</text>
				<picker v-if="form.id" disabled class="picker" :value="professionalIndex" :range="professionalList" :range-key="'job_name'">
					<view v-if="professionalIndex == -1" class="uni-input">请选择职业</view>
					<view v-else class="uni-input">{{professionalList[professionalIndex].job_name}}</view>
					<image class="image ml-10" :src="icon[26].icon"></image>
				</picker>
				<picker v-else class="picker" @change="changeName" :value="professionalIndex" :range="professionalList" :range-key="'job_name'">
					<view v-if="professionalIndex == -1" class="uni-input">请选择职业</view>
					<view v-else class="uni-input">{{professionalList[professionalIndex].job_name}}</view>
					<image class="image ml-10" :src="icon[26].icon"></image>
				</picker>
			</view>
			<view class="group">
				<view class="title">单价</view><text class="title_color">：</text>
				<input class="input" v-model="wage" placeholder="请输入单价" ></input>
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
				button:'添加',
				data:'',
				edit:'',
				professionalList:[],
				professionalIndex:-1,
				wage:'',
				pro_name:'',
				form:{},
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.http({
				url:this.api.jobData,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
				},
				success: res => {
					this.professionalList = res.list
				}
			})
			this.data = this.common.get("kanfa")
			
			if (option.data) {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '单价编辑-'+this.data.quartel_name
				});
				this.button = '编辑'
				this.form = JSON.parse(decodeURIComponent(option.data))
				console.log('this.form',this.form)
				this.wage = this.form.wage
				this.pro_name = this.form.pro_name
				setTimeout(() => {
					this.professionalList.map((item,index) => {
						if(this.form.pro_name == item.job_name) {
							this.professionalIndex = index
						}
					})
				},500)
			} else  {
				// 顶部导航文字
				uni.setNavigationBarTitle({
					title: '单价添加-'+this.data.quartel_name
				});
			}
			
		},
		methods: {
			changeName(e) {
				this.professionalIndex = e.target.value
				this.pro_name = this.professionalList[this.professionalIndex].job_name
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
						url:this.api.contact_edit,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.data.id,
							id:this.form.id,
							contact_type:6,
							wage:this.wage,
							pro_name:this.pro_name
						},
						success: res => {
							uni.showToast({
								title:'编辑成功',
								icon:'none',
								duration: 2000
							})
							setTimeout(() =>{
								this.previous()
							},500) 
						}
					})
				} else {
					console.log('this.data.id',this.data.id)
					this.http({
						url:this.api.addContact,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							quartel_id:this.data.id,
							contact_type:6,
							wage:this.wage,
							pro_name:this.pro_name
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
.picker {
	width: 580rpx;
	text-align: left;
	height: 92.36rpx;
	line-height:92.36rpx ;
	.uni-input {
		width: 550rpx;
	}
}
.good {
	padding: 0 22.22rpx;
}
.group{
	border-bottom: 0.69rpx solid #E0E0E0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.input{
		margin: 0;
		color: $color-9;
		font-size: 33.33rpx;
		line-height:92.36rpx ;
	}
}
</style>
