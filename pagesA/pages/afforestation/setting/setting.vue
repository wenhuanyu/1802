<template>
	<view>
		<view class="operate">
		    <block v-for="item in personal_list_my" :key="item.name">
		    	<view class="item_box">
					<view class="item" @click="jump(item.id)">
						<view class="flex">
							<image :src="item.image" class="image"></image>
							<view class="icon_title">{{item.name}}</view>
						</view>
						<view>
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
					</view>
				</view>
		    </block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personal_list_my:[
					// {
					// 	name:'品名管理',
					// 	image:'',
					// 	id:1
					// 	// url:'/pages/afforestation/management/management'
					// },
					{
						name:'民工管理',
						image:'',
						id:2
						// url:'/pages/afforestation/management/management'
					},
					{
						name:'工序管理',
						image:'',
						id:3
						// url:'/pages/afforestation/management/management'
					},
					{
						name:'林班编辑',
						image:'',
						id:4
						// url:'/pages/user/basic/basic'
					},
					{
						name:'审核人员管理',
						image:'',
						id:7
						// url:'/pages/user/basic/basic'
					},
				],
				icon:[],
				data:[],
			}
		},
		onLoad(option) {
			this.data =  this.common.get("zaolin")
			this.icon = this.common.get("icon")
			// this.personal_list_my[0].image = this.icon[3].icon
			this.personal_list_my[0].image = this.icon[2].icon
			this.personal_list_my[1].image = this.icon[0].icon
			this.personal_list_my[2].image = this.icon[1].icon
			this.personal_list_my[3].image = this.icon[2].icon
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '设置-'+this.data.quartel_name+this.data.quartel_account
			});
		},
		methods: {
			// 跳转页面
			jump(item){
				console.log('item',item)
				// 民工管理
				if(item == 2) {
					uni.navigateTo({
						url:'/pagesA/pages/afforestation/management/management?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 品名管理
				if(item == 1) {
					uni.navigateTo({
					    url:'/pagesA/pages/afforestation/pinming/pinming?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 工序管理
				if(item == 3) {
					uni.navigateTo({
					    url:'/pagesA/pages/afforestation/process/process?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 林班编辑
				if(item == 4) {
					uni.navigateTo({
					   url:'/pagesA/pages/afforestation/add/add?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
				// 审核人员管理
				if(item == 7) {
					uni.navigateTo({
					   url:'/pagesA/pages/afforestation/audit/audit?data='+encodeURIComponent(JSON.stringify(this.data))
					})
				}
			},
		}
	}
</script>

<style lang="scss">
</style>
