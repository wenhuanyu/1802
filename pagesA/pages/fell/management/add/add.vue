<template>
	<view class="fix-padding">
		<view class="container search flex">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入关键字"></uni-easyinput>
		    </view>
		</view>
		<view class="operate">
			<checkbox-group @change="changeCheck" class="check_box">
				<view v-for="(item,index) in list" :key="index">
					<view class="item_box">
						<view class="item">
							<view class="flex">
								<checkbox class="checkClick round mr-20" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
								<view class="icon_title">{{item.nick_name}}</view>
							</view>
							<view class="icon_text flex" style="font-size: 30rpx;">
								<view v-if="count==2">{{item.job_name}}</view>
								<image :src="icon[28].icon" class="image_jt"></image>
							</view>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view class="container fix-bottom flex" style="justify-content: space-between;">
			<checkbox-group name="allCheck" @change="changeAll">
				<checkbox class="checkClick round" :value="allCheck.value" :checked="allCheck.checked"/>
				<text class="cl fs28">{{allCheck.name}}</text>
				<text class="cl fs28 ml-20">共{{checkedArr.length}}条</text>
			</checkbox-group>
		    <button class="btn-search" style="width: 180rpx;" @click="add">确定添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
				show:false,
				id:'',
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值，工种
				data:'',
				icon:[],
				search_name:'',
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			// this.page = 1
			this.listInterface()
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '添加民工-'+this.data.quartel_name
			});
		},
		// //上拉触底函数
		// onReachBottom(){
		// 	// 接口
		// 	this.http({
		// 		url:this.api.peasantList,
		// 		method: "POST",
		// 		data: {
		// 			uid: this.common.get("uid"),
		// 			token: this.common.get("token"),
		// 			type:2,
		// 			// page:this.page,
		// 			nick_name:this.search_name,
		// 		},
		// 		success: res => {
		// 			// this.page+=1
		// 			if(res.list.length == 0) {
		// 				uni.showToast({
		// 					title:'没有更多了',
		// 					icon:'none',
		// 					duration: 2000
		// 				})
		// 			} else {
		// 				this.list = this.list.concat(res.list)
		// 			}
		// 		}
		// 	})
		// },
		methods: {
			// 全选事件
			changeAll(e){
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.list){
			            let itemVal=String(item.id);
			            if(!this.checkedArr.includes(itemVal)){
			                this.checkedArr.push(itemVal);
						}
			        }
			    }else{
			        // 取消全选
			        this.allCheck.checked=false;
			        this.checkedArr=[];
			    }
			},
			// 多选复选框改变事件
			changeCheck(e){
				this.checkedArr = e.detail.value;
				console.log('this.checkedArr',this.checkedArr)
				// 如果选择的数组中有值，并且长度等于列表的长度，就是全选
				if(this.checkedArr.length>0 && this.checkedArr.length==this.list.length){
				    this.allCheck.checked=true;
				}else{
				    this.allCheck.checked=false;
				}
			},
			// 搜索
			search(e) {
				this.search_name = e
				// this.page = 1
				// this.listInterface()
				this.http({
					url:this.api.peasantList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:2,
						// page:this.page,
						nick_name:this.search_name,
					},
					success: res => {
						// this.page+=1
						if(this.search_name == '') {
							this.list = res.list
						} else {
							let list = this.list
							this.list = res.list
							for(let item of this.checkedArr) {
								for (let item1 of list) {
									if(item == item1.id) {
										this.list.push(item1)
									}
									
								}
							}
							var i,j,len = this.list.length
							for(i = 0;i<len;i++) {
								for(j=i+1;j<len;j++) {
									if(this.list[i].id == this.list[j].id) {
										this.list.splice(j,1);
										len--;
										j--;
									}
								}
							}
						}
					}
				})
			},
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.peasantList,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:2,
						// page:this.page,
						nick_name:this.search_name,
					},
					success: res => {
						// this.page+=1
						this.list = res.list
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
				this.http({
					url:this.api.addContact,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						quartel_id:this.data.id,
						contact_type:3,
						peasant_id:this.checkedArr
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
</script>

<style lang="scss">
.search {
	.input {
		width: 708rpx;
	}
}
.tab {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	text-align: center;
	font-size: 29rpx;
	box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
	color: $color-3;
}
.btna {
	height: 73.61rpx;
	line-height: 73.61rpx;
	text-align: center;
	border-bottom: 1.38rpx solid #4C9D57;
	color: #4C9D57;
}
</style>
