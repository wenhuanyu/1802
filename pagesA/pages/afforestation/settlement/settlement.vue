<template>
	<view class="background fix-padding">
		<view class="container search">
		    <view class="flex search_box">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
		    </view>
		</view>
		<view class="container">
			<view class="title_box">
				<view class="title_name">
					<view>当前林班：{{data.quartel_name}}</view>
					<view @click="yincan">
						<image :src="icon[42].icon" v-if="show == 1"></image>
						<image :src="icon[41].icon" v-if="show == 2"></image>
					</view>
				</view>
				<view class="flex" v-if="show == 1">
					<view class="title_box_list">
						<view class="title-fs">￥{{form.quartelTotal}}</view>
						<view>总工程款</view>
					</view>
					<view class="title_box_list">
						<view class="title-fs">￥{{form.quartelAdvance}}</view>
						<view>预支工程款</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.remainingPrice}}</view>
						<view>剩余工程款</view>
					</view>
				</view>
				<view class="line" v-if="show == 1"></view>
				<view class="flex" v-if="show == 1">
					<view class="title_box_list">
						<view class="title-fs">{{form.rat_total}}</view>
						<view>百分比</view>
					</view>
					<view class="title_box_list bord-none">
						<view class="title-fs">￥{{form.surplus_70_total}}</view>
						<view>70%剩余</view>
					</view>
				</view>
			</view>
		</view>
		<view class="table">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
					<uni-th align="center" width="60">序号</uni-th>
			        <uni-th align="center" width="80">姓名</uni-th>
			        <uni-th align="center" width="110">总工程款</uni-th>
			        <uni-th align="center" width="110">预支工程款</uni-th>
					<uni-th align="center" width="110">剩余工程款</uni-th>
					<uni-th align="center" width="80">百分比</uni-th>
					<uni-th align="center" width="90">70%剩余</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view @click="getCurrentRow(item)">{{index+1}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.name}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.total}}</view></uni-td>
			        <uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.total_prepaid_money}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_money}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.rate}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.surplus_70}}</view></uni-td>
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
				search_name:'',
				data:'',
				form:{
					quartelTotal:'',
					quartelAdvance:'',
					remainingPrice:'',
					rat_total:'',
					surplus_70_total:'',
				},
				show:1,
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.data = this.common.get("zaolin")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '结算-'+this.data.quartel_name+this.data.quartel_account
			});
			this.listInterface()
		},
		mounted() {	
		},
		methods: {
			// 显示隐藏
			yincan() {
				if(this.show == 1) {
					this.show = 2
				} else {
					this.show = 1
				}
			},
			// 搜索
			search(e) {
				this.search_name = e
				this.listInterface()
			},
			listInterface() {
				this.http({
					url:this.api.Settlement,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						emplo_name:this.search_name,
						quartel_id:this.data.id
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
						this.form = res.data_info
					}
				})
			},
			//行点击
			getCurrentRow(row) {
				uni.navigateTo({
					url:'/pagesA/pages/afforestation/jiesuanDetail/jiesuanDetail?data='+encodeURIComponent(JSON.stringify(row))
					// url:'/pages/afforestation/listDetail/listDetail?data='+row
				})
			},
		}
	}
</script>

<style lang="scss">
</style>
