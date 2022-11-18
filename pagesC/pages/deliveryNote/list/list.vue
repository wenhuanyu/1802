<template>
	<view class="background fix-padding">
		<view class="container search">
			<view class="flex">
				<uni-easyinput prefixIcon="search" class="input" @input="search($event)" v-model="search_name" placeholder="搜姓名"></uni-easyinput>
			</view>
			<view class="add" @click="changegoods">
				<image :src="icon[21].icon"></image>
			</view>
		</view>
		<view class="table">
			<checkbox-group name="check" @change="changeCheck" class="check">
				<uni-table border stripe emptyText="暂无更多数据" >
					<!-- 表头行 -->
					<uni-tr>
						<uni-th align="center" width="50"></uni-th>
						<uni-th align="center" width="60">序号</uni-th>
						<uni-th align="center" width="100">林班名</uni-th>
						<uni-th align="center" width="100">挖机</uni-th>
						<uni-th align="center" width="100">中转车</uni-th>
						<uni-th align="center" width="100">油锯手</uni-th>
						<!-- <uni-th align="center" width="100">皮重</uni-th>
						<uni-th align="center" width="100">毛重</uni-th> -->
						<uni-th align="center" width="100">备注</uni-th>
					</uni-tr>
					<!-- 表格数据行 -->
					<uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
						<uni-td>
							<view @click.stop>
								<checkbox class="checkClick round" :value="item.id" :checked="checkedArr.includes(String(item.id))"></checkbox>
							</view>
						</uni-td>
						<uni-td align="center"><view>{{index+1}}</view></uni-td>
						<uni-td align="center"><view>{{item.quartel_name}}</view></uni-td>
						<uni-td align="center"><view>{{item.wj_name}}</view></uni-td>
						<uni-td align="center"><view>{{item.zzc_name}}-{{item.car_number}}</view></uni-td>
						<uni-td align="center"><view>{{item.yjs_name}}</view></uni-td>
						<!-- <uni-td align="center"><view>{{item.gros_weight}}</view></uni-td>
						<uni-td align="center"><view>{{item.cargo_weight}}</view></uni-td> -->
						<uni-td align="center">
							<view v-if="item.note.length>0">{{item.note}}</view>
							<view v-else>-</view>
						</uni-td>
					</uni-tr>
				</uni-table>
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
				waibaoList:[],
				epiboly_quartel_id:'',
				icon:[],
				allCheck : {
					name : '全选',
					value : 'all',
					checked : false	
				},
				checkedArr:[], //复选框选中的值
			}
		},
		onLoad() {
		},
		onShow(option) {
			this.icon = this.common.get("icon")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '送货单'
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
			// 删除按钮
			del(){
				if(this.checkedArr.length == 0) {
					uni.showToast({
						title: '请选择要删除的数据',
						icon:'none',
						duration: 2000
					});
					return;
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除选择的数据吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
							    url: this.api.My_data_delivery_delete,
							    method: "POST",
							    data: {
							        uid: this.common.get("uid"),
							        token: this.common.get("token"),
							        id:this.checkedArr
							    },
							    success: res => {
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
				    url: this.api.My_data_delivery_list,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_name: this.search_name,
				    },
				    success: res => {
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
			changegoods() {
				uni.navigateTo({
					url:'/pagesC/pages/deliveryNote/deliveryNote'
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
