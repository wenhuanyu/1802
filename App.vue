<script>
    export default {
        onLaunch: function() {

        },
        onShow: function() {

        },
        onHide: function() {

        }
    }
</script>

<style lang="scss">
    @import '@/common/frame.scss';
	//设置
	radio.round .wx-radio-input,
	radio.round .uni-radio-input,
	checkbox.round .wx-checkbox-input,
	checkbox.round .uni-checkbox-input {
		width: 31.94rpx;
		height: 31.94rpx;
	}
		
	//设置背景色
	radio.checkClick[checked] .wx-radio-input,
	radio.checkClick.checked .uni-radio-input,
	checkbox.checkClick[checked] .wx-checkbox-input,
	checkbox.checkClick.checked .uni-checkbox-input{
		border-color: #4C9D57 !important;
		color: #4C9D57 !important;
	}
</style>