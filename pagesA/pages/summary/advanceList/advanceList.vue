<template>
	<view class="background fix-padding">
		<view class="table">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <uni-th align="center">序号</uni-th>
			        <uni-th align="center">姓名</uni-th>
			        <uni-th align="center">工序</uni-th>
					<uni-th align="center">亩</uni-th>
					<uni-th align="center">单价</uni-th>
					<uni-th align="center">总价</uni-th>
					<uni-th align="center">林班号</uni-th>
					<uni-th align="center">时间</uni-th>
					<uni-th align="center">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <uni-td align="center"><view>{{item.id}}</view></uni-td>
			        <uni-td align="center"><view>{{item.emplo_name}}</view></uni-td>
			        <uni-td align="center"><view>{{item.pro_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.number}}</view></uni-td>
					<uni-td align="center"><view>{{item.unit_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.total_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.pre_time}}</view></uni-td>
					<uni-td align="center"><view>
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</view></uni-td>
			    </uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				data:'',
				option:'',
				page:1,
			}
		},
		onLoad(option) {
			this.page = 1
			this.option = JSON.parse(decodeURIComponent(option.data))
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title:this.option.name+'-'+this.option.quartel_name
			});
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			this.http({
			    url: this.api.queryLists,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        token: this.common.get("token"),
			        type:2,
			        page:this.page,
			        emplo_id:this.option.emplo_id,
			        quartel_id:this.option.quartel_id
			    },
			    success: res => {
					this.page+=1
					if(res.list.length == 0) {
						uni.showToast({
							title:'没有更多了',
							icon:'none',
							duration: 2000
						})
					} else {
						this.list = this.list.concat(res.list)
					}
			    }, 
			})
			
		},
		methods: {
			// 列表接口
			listInterface() {
				this.http({
					url:this.api.queryLists,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						type:2,
						page:this.page,
						emplo_id:this.option.emplo_id,
						quartel_id:this.option.quartel_id
					},
					success: res => {
						if(res.list.length == 0) {
							uni.showToast({
								title:'无数据',
								icon:'none',
								duration: 2000
							})
						}
						this.page+=1
						this.list = res.list
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.top_click {
	width: 180rpx;
	background: $color-f;
	padding: 20rpx;
	border-radius: 6rpx;
	text-align: center;
}
.fix-bottom {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	.item{
		width: 100%;
		color: $color-3;
		padding: 25.69rpx 0;
		border-bottom: 0.69rpx solid #CCCCCC;
		.title {
			width: 122.22rpx;
			text-align-last: justify;
		}
		.text_color {
			color: #4C9D57;
		}
		.text_w {
			width: 50%;
			font-size: 25rpx;
			font-weight: 400;
		}
	}
	
}
.tab {
	padding: 18.75rpx 27.08rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	font-size: 29.16rpx;
	color: $color-3;
	.search_right {
		width: 90rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 29.16rpx;
		font-weight: 400;
		color: $color-3;
		image {
			width: 23.61rpx;
			height: 23.61rpx;
			margin-left: 4.86rpx;
		}
	}
}
.btna {
	padding: 18.75rpx 0;
	color: #4C9D57;
	border-bottom: 0.69rpx solid #4C9D57;
}
.btn-submit{
	width: 346.52rpx;
}
.btn-col {
	border: 2.08rpx solid #4C9D57;
	border-radius: 10.41rpx;
	background: $color-f;
	color: #4C9D57;
}
</style>
