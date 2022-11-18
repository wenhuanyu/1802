<template>
	<view>
		<view class="container search">
		    <view class="flex">
		        <uni-easyinput prefixIcon="search" class="input"  @input="search($event)" v-model="search_name" placeholder="请输入关键字"></uni-easyinput>
		    </view>
			<view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view>
		</view>
		<view class="operate">
			<checkbox-group name="check" @change="changeCheck" class="check">
				<view v-for="(item,index) in list" :key="index">
					<view class="item_box">
						<view class="item" @click="detailsClick(item)">
							<view class="flex">
								<view style="margin-right: 5rpx;margin-bottom: 4rpx;" @click.stop>
									<checkbox class="checkClick round" :value="item.peasant_id" :checked="checkedArr.includes(String(item.peasant_id))"></checkbox>
								</view>
								<view class="icon_title">{{index+1}}.{{item.nick_name}}</view>
							</view>
							<view>
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
		    <button class="btn-search" @click="del">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				search_name:'',
				data:'',
				icon:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
			}
		},
		onShow(option) {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '民工管理-'+this.data.quartel_name+this.data.quartel_account
			});
			this.listInterface()
		},
		methods: {
			// 多选复选框改变事件
			changeCheck(e){
			    this.checkedArr = e.detail.value;
			     // 如果选择的数组中有值，并且长度等于列表的长度，就是全选
			    if(this.checkedArr.length>0 && this.checkedArr.length==this.list.length){
			        this.allCheck.checked=true;
			    }else{
			        this.allCheck.checked=false;
			    }
			},
			// 全选事件
			changeAll(e){
			    let chooseItem = e.detail.value;
			    // 全选
			    if(chooseItem[0]=='all'){
			        this.allCheck.checked=true;
			        for(let item of this.list){
			            let itemVal=String(item.peasant_id);
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
			// 删除按钮
			del(){
				if(this.checkedArr.length == 0) {
					uni.showToast({
						title: '请选择要删除的民工',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除选择的民工吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.contact_dels,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        token: this.common.get("token"),
							        contact_type:3,
							        id:this.checkedArr
							    },
							    success: res => {
							        this.page = 1
							        this.listInterface()
									this.checkedArr=[];
									this.allCheck.checked=false;
							    }
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			
			
			// 列表接口
			listInterface() {
				this.http({
				    url: this.api.pounds_employees,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
				        nick_name: this.search_name,
						quartel_id:this.data.id,
				    },
				    success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'没有数据',
								icon:'none',
								duration: 2000
							})
						}
				        this.list = res.list
				    }
				})
			},
			// 搜索
			search(e) {
				this.search_name = e
				this.listInterface()
			},
			// 添加
			add() {
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/management/add/add'
				})
			},
			
			// 详情
			detailsClick(eve) {
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/management/details/details?data='+encodeURIComponent(JSON.stringify(eve.id))
				})
			},
		}
	}
</script>

<style lang="scss">
.search {
	.input {
		width: 640rpx;
	}
}

</style>
