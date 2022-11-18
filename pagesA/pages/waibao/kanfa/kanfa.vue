<template>
	<view class="background fix-padding">
		<view class="container search">
			<view class="flex">
				<uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
			</view>
			<view class="add" @click="add">
				<image :src="icon[21].icon"></image>
			</view>
		</view>
		<view class="table container">
			<uni-table border stripe emptyText="暂无更多数据" >
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center" width="33%">林班名称</uni-th>
					<uni-th align="center" width="33%">开工天数</uni-th>
					<uni-th align="center" width="33%">完工天数</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.name}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.start_date}}</view></uni-td>
					<uni-td align="center"><view @click="getCurrentRow(item)">{{item.end_date}}</view></uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view v-show="show" class="modal_bottom">
			<view class="modal-main" @click="closeModal">
				<view @click.stop>
					<view @click="detailsClick">查看</view>
					<view @click="editClick">编辑</view>
					<view @click="delClick">删除</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				page:1,
				search_name:'',
				show:false,
				id:'',
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			this.http({
			    url: this.api.Epiboly_quartel,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
			        token: this.common.get("token"),
			        name:this.search_name,
			        page:this.page,
					type:2,
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
			listInterface() {
				this.http({
					url:this.api.Epiboly_quartel,
					method: "POST",
					data: {
						uid: this.common.get("uid"),
						token: this.common.get("token"),
						name:this.search_name,
						page:this.page,
						type:2,
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
			},
			
			// 搜索
			search(e) {
				this.page = 1
				this.search_name = e
				this.listInterface()
			},
			add() {
				uni.navigateTo({
					url:'/pagesA/pages/waibao/kanfaAdd/kanfaAdd'
				})
			},
			// 删除
			delClick() {
				this.show = false 
				uni.showModal({
					title: '提示',
					content: '确定当前操作吗？',
					success: res => {
						if(res.confirm) { 
							this.http({
								url:this.api.Epiboly_delete,
								method: "POST",
								data: {
									uid: this.common.get("uid"),
									token: this.common.get("token"),
									id:this.id,
								},
								success: res => {
									this.page = 1
									this.listInterface()
								}
							})
						}
								
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 关闭弹窗
			closeModal() {
				this.show = false
			},
			// 编辑点击
			editClick() {
				this.show = false
				uni.navigateTo({
					url:'/pagesA/pages/waibao/kanfaAdd/kanfaAdd?data='+encodeURIComponent(JSON.stringify(this.edit))
				})
			},
			detailsClick() {
				this.show = false
				uni.navigateTo({
					url:'/pagesA/pages/waibao/dingdan/dingdan?data='+encodeURIComponent(JSON.stringify(this.edit))
				})
			},
			//行点击
			getCurrentRow(row) {
				this.show = true
				this.id = row.id
				this.edit = row
				// uni.navigateTo({
				// 	// url:'/pages/warehouse/add/add?data='+encodeURIComponent(JSON.stringify(eve))
				// 	url:'/pages/afforestation/jiesuanDetail/jiesuanDetail'
				// })
				
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
