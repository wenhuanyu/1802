/**
 * 公共方法
 */

// 存储内容
function set(key, value) {
    uni.setStorageSync(key, value)
}

// 读取内容
function get(key) {
    return uni.getStorageSync(key)
}

export default {
    // baseUrl: "https://1802.sxmzth.com/pounds/",
	// baseUrl: "https://1802.sxmzth.com/pounds/",
	baseUrl: "https://www.senfalinye.com/pounds/",
    set: set,
    get: get,
}
