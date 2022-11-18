<template>
	<view class="background fix-padding">
		<view class="container search">
		    <view class="flex search_box">
		        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入"></uni-easyinput>
		    </view>
		</view>
		<view class="table" v-if="count == 0">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <uni-th align="center" width="90">磅单号</uni-th>
			        <uni-th align="center" width="110">车牌号</uni-th>
			        <uni-th align="center" width="70">毛重</uni-th>
			        <uni-th align="center" width="70">皮重</uni-th>
			        <uni-th align="center" width="70">净重</uni-th>
			        <uni-th align="center" width="80">扣水份</uni-th>
			        <uni-th align="center" width="60">单位</uni-th>
			        <uni-th align="center" width="90">林班名称</uni-th>
			        <uni-th align="center" width="120">时间</uni-th>
			        <uni-th align="center" width="80">操作员</uni-th>
			        <uni-th align="center" width="80">挖机</uni-th>
			        <uni-th align="center" width="80">油锯手</uni-th>
			        <uni-th align="center" width="80">品名</uni-th>
			        <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <uni-td align="center"><view>{{item.pounds_sn}}</view></uni-td>
			        <uni-td align="center"><view>{{item.zzc_name}}-{{item.car_number}}</view></uni-td>
			        <uni-td align="center"><view>{{item.gros_weight}}</view></uni-td>
					<uni-td align="center"><view>{{item.cargo_weight}}</view></uni-td>
					<uni-td align="center"><view>{{item.net_weight}}</view></uni-td>
					<uni-td align="center"><view>{{item.k_moisture}}</view></uni-td>
					<uni-td align="center"><view>吨</view></uni-td>
					<uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.add_time}}</view></uni-td>
					<uni-td align="center"><view>{{item.sb_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.wj_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.yjs_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.pm_name}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 1">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			       <uni-th align="center" width="90">磅单号</uni-th>
			       <uni-th align="center" width="100">大车人员</uni-th>
			       <uni-th align="center" width="70">净重</uni-th>
			       <uni-th align="center" width="70">单位</uni-th>
			       <uni-th align="center" width="70">林班号</uni-th>
			       <uni-th align="center" width="80">场地挖机</uni-th>
			       <uni-th align="center" width="120">出车时间</uni-th>
			       <uni-th align="center" width="80">是否收单</uni-th>
			       <uni-th align="center" width="120">收单时间</uni-th>
			       <uni-th align="center" width="80">扣款</uni-th>
			       <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <uni-td align="center"><view>{{item.pounds_sn}}</view></uni-td>
			        <uni-td align="center"><view>{{item.dc_name}}-{{item.car_number}}</view></uni-td>
			        <uni-td align="center"><view>{{item.net_weight}}</view></uni-td>
					<uni-td align="center"><view>吨</view></uni-td>
					<uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.site_users}}</view></uni-td>
					<uni-td align="center"><view>{{item.start_time}}</view></uni-td>
					<uni-td align="center"><view>{{item.closed_order_name}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.single_time !==''">{{item.single_time}}</view>
						<view v-if="item.single_time ==''">-</view>
					</uni-td>
					<uni-td align="center"><view>{{item.penalty}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 2">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
			        <uni-th align="center"  width="80">姓名</uni-th>
			        <uni-th align="center"  width="80">职业</uni-th>
			        <uni-th align="center" width="100">林班名称</uni-th>
			        <uni-th align="center" width="100">预支金额</uni-th>
			        <uni-th align="center" width="100">大写金额</uni-th>
			        <uni-th align="center" width="120">时间</uni-th>
			        <uni-th align="center" width="100">是否转账</uni-th>
			        <uni-th align="center" width="120">转账时间</uni-th>
			        <uni-th align="center" width="100">操作员</uni-th>
			        <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <!-- <uni-td align="center"><view>{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view>{{item.emplo_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.job_name}}</view></uni-td>
			        <uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>￥{{item.per_amount}}</view></uni-td>
					<uni-td align="center"><view>{{item.capital}}</view></uni-td>
					<uni-td align="center"><view>{{item.pre_time}}</view></uni-td>
					<uni-td align="center"><view v-if="item.is_transfer == 1">是</view>
					<view v-if="item.is_transfer == 0">
						否
					</view></uni-td>
					<uni-td align="center">
						<view v-if="item.zz_time !==''">{{item.zz_time}}</view>
						<view v-if="item.zz_time ==''">-</view>
					</uni-td>
					<uni-td align="center"><view>{{item.sign}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 3">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
			       <uni-th align="center"  width="80">姓名</uni-th>
			       <uni-th align="center"  width="80">职业</uni-th>
			       <uni-th align="center" width="100">林班名称</uni-th>
			       <uni-th align="center" width="100">项目</uni-th>
			       <uni-th align="center" width="100">数量</uni-th>
			       <uni-th align="center" width="100">单价</uni-th>
			       <uni-th align="center" width="100">总工程款</uni-th>
			       <uni-th align="center" width="120">时间</uni-th>
			       <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <!-- <uni-td align="center"><view>{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view>{{item.pro_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.job_name}}</view></uni-td>
			        <uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.project}}</view></uni-td>
					<uni-td align="center"><view>{{item.unit}}</view></uni-td>
					<uni-td align="center"><view>{{item.unit_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.total_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.add_time}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 4">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
			       <uni-th align="center"  width="80">姓名</uni-th>
			       <uni-th align="center"  width="80">职业</uni-th>
			       <uni-th align="center" width="100">林班名称</uni-th>
			       <uni-th align="center" width="100">数量</uni-th>
			       <uni-th align="center" width="100">单价</uni-th>
			       <uni-th align="center" width="100">合计</uni-th>
			       <uni-th align="center" width="120">时间</uni-th>
			       <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			        <!-- <uni-td align="center"><view>{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view>{{item.pro_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.job_name}}</view></uni-td>
			        <uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.number}}</view></uni-td>
					<uni-td align="center"><view>{{item.unit_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.total_price}}</view></uni-td>
					<uni-td align="center"><view>{{item.add_time}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="table" v-if="count == 5">
			<uni-table border stripe emptyText="暂无更多数据" >
			    <!-- 表头行 -->
			    <uni-tr>
			        <!-- <uni-th align="center">序号</uni-th> -->
			       <uni-th align="center" width="80">姓名</uni-th>
			       <uni-th align="center" width="80">职业</uni-th>
			       <uni-th align="center" width="100">林班名称</uni-th>
			       <!-- <uni-th align="center">职业</uni-th> -->
			       <uni-th align="center" width="100">项目</uni-th>
			       <uni-th align="center" width="100">金额</uni-th>
			       <uni-th align="center" width="120">时间</uni-th>
			       <uni-th align="center" width="120">备注</uni-th>
			    </uni-tr>
			    <!-- 表格数据行 -->
			    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
			       <!-- <uni-td align="center"><view>{{item.serial_number}}</view></uni-td> -->
			        <uni-td align="center"><view>{{item.pro_name}}</view></uni-td>
					<uni-td align="center"><view>{{item.job_name}}</view></uni-td>
			        <uni-td align="center"><view>{{item.quartel_account}}</view></uni-td>
					<uni-td align="center"><view>{{item.project}}</view></uni-td>
					<uni-td align="center"><view>{{item.price}}</view></uni-td>
					<uni-td align="center"><view>{{item.add_time}}</view></uni-td>
					<uni-td align="center">
						<view v-if="item.note !==''">{{item.note}}</view>
						<view v-if="item.note ==''">-</view>
					</uni-td>
			    </uni-tr>
			</uni-table>
		</view>
		<view class="fix-bottom" v-if="count== 0">
			<view class="flex item">
				<view class="flex text_w"><text class="title">当日共计</text>：<text class="text_color">{{zhong.dayCountTonnage}}</text>（吨）</view>
				<view class="flex text_w pl-60"><text class="title">当日车数</text>：<text class="text_color">{{zhong.dayCountNum}}</text>（车）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">共计</text>：<text class="text_color">{{zhong.CountTonnage}}</text>（吨）</view>
				<view class="flex text_w pl-60"><text class="title">共计车数</text>：<text class="text_color">{{zhong.CountNum}}</text>（车）</view>
			</view>
		</view>
		<view class="fix-bottom" v-if="count== 1">
			<view class="flex item">
				<view class="flex text_w"><text class="title">目标</text>：<text class="text_color">{{big.CountTarget}}</text>（吨）</view>
				<view class="flex text_w pl-60"><text class="title">完成率</text>：<text class="text_color">{{big.complete}}</text>（车）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">当日共计</text>：<text class="text_color">{{big.dayCountTonnage}}</text>（吨）</view>
				<view class="flex text_w pl-60"><text class="title">当日车数</text>：<text class="text_color">{{big.dayCountNum}}</text>（车）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">共计</text>：<text class="text_color">{{big.CountTonnage}}</text>（吨）</view>
				<view class="flex text_w pl-60"><text class="title">共计车数</text>：<text class="text_color">{{big.CountNum}}</text>（车）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">剩余未完成</text>：<text class="text_color">{{big.remaining}}</text>（吨）</view>
			</view>
		</view>
		<view class="fix-bottom" v-if="count== 2">
			<view class="flex item">
				<view class="flex text_w"><text class="title">当日预支</text>：<text class="text_color">{{yuzhi.dayCountPrice}}</text>（元）</view>
				<view class="flex text_w pl-60">当日：<text class="text_color">{{yuzhi.dayCountNum}}</text>（笔）</view>
			</view>
			<view class="flex item">
				<view class="flex text_w"><text class="title">合计</text>：<text class="text_color">{{yuzhi.CountPrice}}</text>（元）</view>
				<view class="flex text_w pl-60"><text>合计：</text><text class="text_color">{{yuzhi.CountNum}}</text>（笔）</view>
			</view>
		</view>
		<view class="fix-bottom" v-if="count== 3">
			<view class="flex item">
				<view class="flex text_w"><text class="title">总金额</text>：<text class="text_color">{{weixiu.total_price}}</text>（元）</view>
				<view class="flex text_w pl-60"><text class="title">总数量</text>：<text class="text_color">{{weixiu.total_num}}</text></view>
			</view>
		</view>
		<view class="fix-bottom" v-if="count== 4">
			<view class="flex item">
				<view class="flex text_w"><text class="title">总金额</text>：<text class="text_color">{{bu.total_price}}</text>（元）</view>
				<view class="flex text_w pl-60"><text class="title">总数量</text>：<text class="text_color">{{bu.total_num}}</text></view>
			</view>
		</view>
		<view class="fix-bottom" v-if="count== 5">
			<view class="flex item">
				<view class="flex text_w"><text class="title">总金额</text>：<text class="text_color">{{kou.total_price}}</text>（元）</view>
				<view class="flex text_w pl-60"><text class="title">总数量</text>：<text class="text_color">{{kou.total_num}}</text></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0,
				show: false,
				list:[],
				zhong:{
					dayCountTonnage:0,
					dayCountNum:0,
					CountNum:0,
					CountTonnage:0,
				},
				big:{
					remaining:0,
					complete:0,
					CountTarget:0,
					CountNum:0,
					CountTonnage:0,
					dayCountTonnage:0,
					dayCountNum:0
				},
				yuzhi:{
					CountNum:0,
					CountPrice:0,
					dayCountPrice:0,
					dayCountNum:0,
				},
				weixiu:{
					total_price:0,
					total_num:0
				},
				bu:{
					total_price:0,
					total_num:0
				},
				kou:{
					total_price:0,
					total_num:0
				},
				icon:[],
				search_name:'',
				option:{}
			}
		},
		onLoad(option) {
			this.option = JSON.parse(decodeURIComponent(option.data))
			console.log('this.option',this.option)
			this.count = this.option.data_type
			this.icon = this.common.get("icon")
			this.page = 1
			this.data = this.common.get("kanfa")
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '查询-'+this.data.quartel_name
			});
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			if (this.count == 2) { 
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        emplo_name:this.search_name,
						yuzhi_id:this.option.yuzhi_id,
				        type:3,
				        page:this.page,
				        quartel_id:this.data.id,
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
							this.yuzhi.CountNum = res.CountNum
							this.yuzhi.CountPrice = res.CountPrice
							this.yuzhi.dayCountPrice = res.dayCountPrice
							this.yuzhi.dayCountNum = res.dayCountNum
						}
				    }, 
				})
			} else if (this.count == 0) {
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        page:this.page,
				        quartel_id:this.data.id,
						relation_id:this.option.relation_id,
				        show_all:1,
				        pounds_sn:this.search_name
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
							this.zhong.dayCountTonnage = res.dayCountTonnage
							this.zhong.dayCountNum = res.dayCountNum
							this.zhong.CountNum = res.CountNum
							this.zhong.CountTonnage = res.CountTonnage
						}
				    }, 
				})
			} else if (this.count == 1) {
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        page:this.page,
				        quartel_id:this.data.id,
						relation_id:this.option.relation_id,
				        show_all:1,
				        pounds_sn:this.search_name
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
							this.big.remaining = res.remaining
							this.big.complete = res.complete
							this.big.CountTarget = res.CountTarget
							this.big.CountNum = res.CountNum
							this.big.CountTonnage = res.CountTonnage
							this.big.dayCountTonnage = res.dayCountTonnage
							this.big.dayCountNum = res.dayCountNum
						}
				    }, 
				})
			} else if (this.count == 3) {
				this.http({
				    url: this.api.queryLists,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        pro_name:this.search_name,
				        page:this.page,
				        quartel_id:this.data.id,
						wx_id:this.option.wx_id,
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
							this.weixiu.total_price = res.total_price
							this.weixiu.total_num = res.total_num
						}
				    }, 
				})
			} else if (this.count == 4) {
				this.http({
				    url: this.api.Quartel_subsidiesList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        pro_name:this.search_name,
				        page:this.page,
				        quartel_id:this.data.id,
						bu_id:this.option.bu_id
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
							this.bu.total_price = res.total_price
							this.bu.total_num = res.total_num
						}
				    }, 
				})
			} else if (this.count == 5) {
				this.http({
				    url: this.api.Quartel_deductList,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
				        token: this.common.get("token"),
				        pro_name:this.search_name,
				        page:this.page,
				        quartel_id:this.data.id,
						kou_id:this.option.kou_id
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
							this.kou.total_price = res.total_price
							this.kou.total_num = res.total_num
						}
				    }, 
				})
			}
			
		},
		methods: {
			search(e) {
				this.page = 1
				this.search_name = e
				this.listInterface()
			},
			// 列表接口
			listInterface() {
				if (this.count == 0) {
					this.http({
						url:this.api.Quartel_cutDownList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							page:this.page,
							quartel_id:this.data.id,
							show_all:1,
							relation_id:this.option.relation_id,
							pounds_sn:this.search_name
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
							this.zhong.dayCountTonnage = res.dayCountTonnage
							this.zhong.dayCountNum = res.dayCountNum
							this.zhong.CountNum = res.CountNum
							this.zhong.CountTonnage = res.CountTonnage
						},
					})
				} else if(this.count == 1) {
					this.http({
						url:this.api.Quartel_bigCartList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							page:this.page,
							quartel_id:this.data.id,
							relation_id:this.option.relation_id,
							show_all:1,
							pounds_sn:this.search_name
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
							this.big.remaining = res.remaining
							this.big.complete = res.complete
							this.big.CountTarget = res.CountTarget
							this.big.CountNum = res.CountNum
							this.big.CountTonnage = res.CountTonnage
							this.big.dayCountTonnage = res.dayCountTonnage
							this.big.dayCountNum = res.dayCountNum
						}
					})
				} else if (this.count == 2) {
					this.http({
						url:this.api.queryLists,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							emplo_name:this.search_name,
							type:3,
							page:this.page,
							quartel_id:this.data.id,
							yuzhi_id:this.option.yuzhi_id,
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
							this.yuzhi.CountNum = res.CountNum
							this.yuzhi.CountPrice = res.CountPrice
							this.yuzhi.dayCountPrice = res.dayCountPrice
							this.yuzhi.dayCountNum = res.dayCountNum
						}
					})
				} else if (this.count == 3) {
					this.http({
						url:this.api.Quartel_maintenanceList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							pro_name:this.search_name,
							page:this.page,
							wx_id:this.option.wx_id,
							quartel_id:this.data.id,
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
							this.weixiu.total_price = res.total_price
							this.weixiu.total_num = res.total_num
						}
					})
				} else if (this.count == 4) {
					this.http({
						url:this.api.Quartel_subsidiesList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							pro_name:this.search_name,
							page:this.page,
							quartel_id:this.data.id,
							bu_id:this.option.bu_id
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
							this.bu.total_price = res.total_price
							this.bu.total_num = res.total_num
						}
					})
				} else if (this.count == 5) {
					this.http({
						url:this.api.Quartel_deductList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							pro_name:this.search_name,
							page:this.page,
							quartel_id:this.data.id,
							kou_id:this.option.kou_id
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
							this.kou.total_price = res.total_price
							this.kou.total_num = res.total_num
						}
					})
				}
			},
		}
	}
</script>

<style lang="scss">
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
</style>
