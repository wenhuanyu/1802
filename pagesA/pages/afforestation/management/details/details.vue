<template>
	<view class="background">
		<view class="good">
			<view class="group">
				<view class="title">姓名</view><text class="title_color">：</text>
				<input class="input" v-model="form.nick_name" placeholder="请输入姓名" disabled></input>
			</view>
			<view class="group">
				<view class="title">手机号</view><text class="title_color">：</text>
				<input class="input" v-model="form.phone" placeholder="请输入手机号" disabled></input>
			</view>
			<view class="group">
				<view class="title">身份证号</view><text class="title_color">：</text>
				<input class="input" v-model="form.car_id" placeholder="请输入身份证号" disabled></input>
			</view>
			<view class="group">
				<view class="title">银行卡号</view><text class="title_color">：</text>
				<input class="input" v-model="form.bank_card" placeholder="请输入银行卡号" disabled></input>
			</view>
			<view class="group">
				<view class="title">开户行</view><text class="title_color">：</text>
				<input class="input" v-model="form.bank" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group_box">
				<view class="group_title">类型</view><text class="title_color">：</text>
			</view>
			<view class="group ">
				<radio-group @change="changeCheckType" class="check_box">
					<view v-for="(item,index) in type" :key="item.id" class="check">
						<radio class="checkClick round" :value="item.id" :checked="item.checked" disabled>{{item.name}}</radio>
					</view>
				</radio-group>
			</view>	
			<view class="group_box">
				<view class="group_title">工种</view><text class="title_color">：</text>
			</view>
			<view class="group">
				<checkbox-group @change="changeCheck" class="check_box">
					<view v-for="(item,index) in profession" :key="item.id" class="check">
						<checkbox disabled class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))">{{item.job_name}}</checkbox>
					</view>
				</checkbox-group>
			</view>
			<view class="group_box" v-if="checkedArr.includes(String(5)) || checkedArr.includes(String(2))">
				<view class="group_title">车牌号</view><text class="title_color">：</text>
			</view>
			<view class="group_box" v-if="checkedArr.includes(String(2))">
				<view v-for="(item,index) in cart" :key='index' class="group_item">
					<view class="group_title" v-if="index==0">大车</view>
					<view class="group_title" v-if="index!==0"></view>
					<input class="input" v-model="item.cartid" placeholder="请输入车牌号" disabled></input>
				<!-- 	<view class="addbtn" @click="addbig('cart')" v-if="index==0">+</view>
					<view class="addbtn" @click="del(index,'cart')" v-if="index!==0">-</view> -->
				</view>
			</view>
			<view class="group_box" v-if="checkedArr.includes(String(5))">
				<view v-for="(item,index) in transfer_car" :key='index' class="group_item">
					<view class="group_title" v-if="index==0">中转车</view>
					<view class="group_title" v-if="index!==0"></view>
					<input class="input" v-model="item.transfer_carid" placeholder="请输入车牌号" disabled></input>
				<!-- 	<view class="addbtn" @click="addbig('tra')" v-if="index==0">+</view>
					<view class="addbtn" @click="del(index,'tra')" v-if="index!==0">-</view> -->
				</view>
			</view>
			<view class="group content"  v-if="form.car_image.length>0">
				<view class="title">身份证人面像</view>
				<view class="remarkImage">
					<view class="item_image" v-for="(item,index) in form.car_image" :key='index'>
						<image class="image_list" :src="item" @click="previewImage('card',index)" mode="aspectFill"></image>
					</view>
				</view>
			</view>	
			<view class="group content"  v-if="form.bank_image.length>0">
				<view class="title" style="width: 100rpx;">银行卡</view>
				<view class="remarkImage">
					<view class="item_image" v-for="(item,index) in form.bank_image" :key='index'>
						<image class="image_list" :src="item" @click="previewImage('bank',index)" mode="aspectFill"></image>
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
				form:{
					nick_name:'',//名称
					phone:'',//手机号
					car_id:'',//身份证号
					bank_card:'',//卡号
					bank:'',//开户行
				},
				cart:[],
				transfer_car:[],
				data:'',
				edit:'',
				cate_name:'',
				unit_name:'',
				profession:[],
				checkedArr:[], //复选框选中的值，工种
				type:[
					{
						id:3,
						name:"全部",
						checked:false,
					},
					{
						id:1,
						name:"造林",
						checked:false,
					},
					{
						id:2,
						name:"砍伐",
						checked:false,
					},
				],
				checkedArrType:'', //复选框选中的值，类型
				id:'',
				icon:[],
			}
		},
		onLoad(option) {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '民工详情-'+this.data.quartel_name+this.data.quartel_account
			});
			if(option.data) {
				this.id = JSON.parse(decodeURIComponent(option.data))
			}
			// 职业列表接口
			this.http({
				url:this.api.jobData,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
				},
				success: res => {
					this.profession = res.list
				}
			})
			// 基本信息接口
			this.http({
				url:this.api.userInfo,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
					emplo_id:this.id,
				},
				success: res => {
					this.form.nick_name = res.nick_name
					this.form.bank = res.bank
					this.form.phone = res.phone
					this.form.car_id = res.car_id
					this.form.bank_card = res.bank_card
					this.form.bank_image = res.bank_image
					this.form.car_image = res.car_image
					this.type.map((item,index)=>{
						if(item.id == res.type) {
							item.checked = true
						}
					})
					for(let item of res.job_id){
						let itemVal=String(item)
						if(!this.checkedArr.includes(itemVal)){
						    this.checkedArr.push(itemVal);
						}
					}
					if(res.cart.length == 0) {
						let item = {
							cartid:''
						}
						this.cart.push(item)
					}
					if(res.transfer_car.length == 0) {
						let item = {
							transfer_carid:''
						}
						this.transfer_car.push(item)
					}
					res.cart.map((item,index) => {
						let i = {
							cartid:item
						}
						this.cart.push(i)
					})
					res.transfer_car.map((item,index) => {
						let i = {
							transfer_carid:item
						}
						this.transfer_car.push(i)
					})
				}
			})
		},
		methods: {
			// 图片放大
			previewImage(name,i) {
				if(name == 'card') {
					wx.previewImage({
						current: this.form.car_image[i],
						urls: this.form.car_image
					})
				} else{
					wx.previewImage({
						current: this.form.bank_image[i],
						urls: this.form.bank_image
					})
				}
			},
		}
	}
</script>

<style lang="scss">
.group_box {
	margin-top: 20rpx;
	align-items: flex-start;
	flex-wrap: wrap;
	.addbtn {
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		background: #4C9D57;
		color: $color-f;
		border-radius: 10rpx;
		margin-left: 10rpx;
	}
	.chepaibox {
		width: 500rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.input {
		width: 470rpx;
	}
	.group_item {
		display: flex;
		align-items: center;
	}
}

.good {
	padding: 0 22rpx;
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
.picker {
    width: 556rpx;
    height: 80rpx;
    border-radius: 8rpx;
    border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
	font-size: 28rpx;
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
	align-items : flex-start!important;
	.title {
		width: 180rpx!important;
		margin-top: 36rpx;
	}
}
.remarkImage {
    .item_image {
		width: 434rpx;
		height: 274rpx;
		background: #F2F2F2;
		border-radius: 10rpx 10rpx 10rpx 10rpx;
        position: relative;
        margin-top: 24rpx;
		margin-bottom: 20rpx;
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
