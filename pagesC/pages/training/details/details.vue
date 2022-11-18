<template>
	<view class="container">
		<view class="training_box">
			<view class="video">
				<video
					:src="form.video"
					controls
					object-fit="fill"
				>
				</video>
			</view>
		</view>
		<view>{{form.title}}</view>
		<view>{{form.create_time}}</view>
		<view></view>
		<view>培训说明</view>
		<view v-html="form.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				safety_id:'',
				form:'',
			}
		},
		onLoad(option) {
			if(option.data) {
				this.safety_id = JSON.parse(decodeURIComponent(option.data))
				this.listInterface()
			}
		},
		// 这里myvideo 是你上面命名的id    
		onReady() {
			this.videoContext = uni.createVideoContext("myvideo", this);    // this这个是实例对象  必传
			this.videoContext.requestFullScreen({ direction: 90 }); 
		},
		methods: {
			// 接口列表
			listInterface() {
				this.http({
				    url: this.api.safetyDetails,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
						safety_id:this.safety_id
				    },
				    success: res => {
				        this.form = res
				    }
				})
			},
		}	
	}
</script>

<style lang="scss">
.training_box {
	width: 100%;
	position: relative;
	margin-bottom: 35.41rpx;
	.video{
		position: relative;
		width: 100%;
		height: 334.02rpx;
		video {
			display: block;
			width: 100%;
			height: 334.02rpx;
			border-radius: 10.41rpx;
			background: #cccccc;
		}
	}
}
.container {
	font-size: 33.33rpx;
	font-weight: 400;
	view:nth-child(2) {
		color: #000000;
	}
	view:nth-child(3) {
		font-size: 25rpx;
		color: $color-9;
		margin-top: 19.44rpx;
		margin-bottom: 26.38rpx;
	}
	view:nth-child(4) {
		height: 5.55rpx;
		background: #EBEBEB;
		margin-bottom: 34.72rpx;
	}
	view:nth-child(5) {
		padding-left: 15.27rpx;
		border-left: 13.19rpx solid #4C9D57;
		margin-bottom: 34.72rpx;
	}
	view:nth-child(6) {
		font-size: 29.16rpx;
		line-height: 51.38rpx;
		color: $color-6;
	}
}
</style>
