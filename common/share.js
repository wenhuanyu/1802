/**
 * 分享朋友圈
 */
export default {
    onShow() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },
    onShareAppMessage() {
        return {
            title: "",
            imageUrl: "",
            path: "",
            success: res => {},
            fail: err => {}
        }
    },
    onShareTimeline() {
        return {
            title: "",
            imageUrl: "",
            path: "",
            success: res => {},
            fail: err => {}
        }
    }
}
