<template>
	<view class="background fix-padding">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == item.id}" @click="change(item.id)">
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="table mt-20" v-if="count == 1">
			<radio-group @change="changeCheckType" class="check_box">
				<uni-table border stripe emptyText="暂无更多数据">
				    <!-- 表头行 -->
				    <uni-tr>
						<uni-th align="center" width="50"></uni-th>
						<uni-th align="center" width="60">序号</uni-th>
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
							<view>
								<radio class="checkClick round" :value="item.id" :checked="item.checked">{{item.name}}</radio>
							</view>
						</uni-td>
						<uni-td align="center"><view>{{index+1}}</view></uni-td>
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
			</radio-group>
		</view>
		<view class="table mt-20" v-if="count == 2">
			<uni-table border stripe emptyText="暂无更多数据">
			    <!-- 表头行 -->
			    <uni-tr>
					<uni-th align="center" width="60">序号</uni-th>
			        <uni-th align="center" width="100">挖机</uni-th>
			        <uni-th align="center" width="100">中转车</uni-th>
			        <uni-th align="center" width="100">油锯手</uni-th>
					<uni-th align="center" width="100">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
				<uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view>{{index+1}}</view></uni-td>
					<uni-td align="center"><view>{{item.wj_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.zzc_name}}-{{item.car_number}}</view></uni-td>
					<uni-td align="center"><view>{{item.yjs_name}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note.length>0">{{item.note}}</view>
						<view v-else>-</view>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="container fix-bottom" v-if="count == 1">
		    <button class="btn-submit" @click="add">选择</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				icon:[],
				quartel_id:'',
				checkedArrType:'', //复选框选中的值，工种
				items:[
					{
						id:1,
						name:"未提取",
					},
					{
						id:2,
						name:"已提取",
					}
				],
				count:1,
			}
		},
		onLoad(option) {
			this.quartel_id = JSON.parse(decodeURIComponent(option.data))
			this.icon = this.common.get("icon")
			this.listInterface()
			
		},
		methods: {
			// tab栏点击事件
			change(e) {
				this.count = e
				this.listInterface()
			},
			listInterface() {
				this.http({
					url:this.api.Quartel_extract,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						quartel_id:this.quartel_id,
						type:this.count
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
				var form = ''
				this.list.map((item,index) => {
					if(this.checkedArrType == item.id) {
						form = item
					}
				})
				if(form !=='') {
					this.common.set('tiqu', form)
					setTimeout(() => {
						this.previous()
					},200)
				} else {
					uni.showToast({
						title:'请先选择数据',
						icon:'none',
						duration: 2000
					})
				}
			},
			changeCheckType(e) {
				this.checkedArrType = e.detail.value;
			},
			
		}
	}
</script>

<style lang="scss">
.modal {
	z-index: 999;
	margin-left: 0!important;
	.modal-main {
		.modal-box {
			.content {
				height: calc(100% - 136rpx);
				.right {
					width: 100%;
					.item_list{
						justify-content: flex-start;
					}
				}
			}
		
		}
	}
}
.check_list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32rpx;
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
.group {
	border: none;
}
</style>
