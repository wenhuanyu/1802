<template>
	<view>
		<view class="operate">
		    <view>
		    	<view class="item_box">
					<view class="item" v-for="(item,index) in list" :key="index">
						<view class="flex">
							<view class="icon_title fs">{{item.name}}</view>
						</view>
						<view class="icon_text fs" @click="xuanze">
							{{item.money}}
							<image :src="icon[28].icon" class="image_jt"></image>
						</view>
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
				list:[
					{
						name:'1.工序',
						money:'￥100.00'
					},
					{
						name:'1.工序',
						money:'￥100.00'
					},
					
				],
				icon:[],
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
</style>
