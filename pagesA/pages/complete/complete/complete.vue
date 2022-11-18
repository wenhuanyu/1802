<template>
	<view class="background_contant" @click="hideShow">
		<head-nav
			navBackgroundColor="#FFFFFF"
			fontSize="15"
			isbackShow="true"
			istextShow ="true"
			:textTest="textTest"
			titleColor="666666"
			:backImageUrl='icon[40].icon'
			@textCount="textCountClick"
		>
		</head-nav>
		<view class="background fix-padding"  v-if="titlecount == 1" >
			<!-- tab栏 -->
			<view class="tab">
				<view class="tab_list" v-for="(item,index) in items_afforestation" :key="index" :class="{btna:count_afforestation == index}" @click="change(index)">
					<view>{{item}}</view>
				</view>
				<view class="tab_list">
					<view class="search_right" @click="shaixuan">
						筛选
						<image :src="icon[32].icon"></image>
					</view>
				</view>
			</view>
			<view class="container search">
			    <view class="flex search_box">
			        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="搜姓名"></uni-easyinput>
			    </view>
			</view>
			<view class="table" v-if="count_afforestation == 0">
				<uni-table border stripe emptyText="暂无更多数据" >
				    <!-- 表头行 -->
				    <uni-tr>
				        <!-- <uni-th align="center">序号</uni-th> -->
						<uni-th align="center"  width="80">姓名</uni-th>
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
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.per_amount}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.capital}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.is_transfer == 1">是</view>
							<view @click="getCurrentRow(item)" v-if="item.is_transfer == 0">否</view>
						</uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.zz_time !==''">{{item.zz_time}}</view>
							<view @click="getCurrentRow(item)" v-if="item.zz_time ==''">-</view>
						</uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.sign}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
						</uni-td>
				    </uni-tr>
				</uni-table>
			</view>
			<view class="table" v-if="count_afforestation == 1">
				<uni-table border stripe emptyText="暂无更多数据" >
				    <!-- 表头行 -->
				    <uni-tr>
				        <!-- <uni-th align="center">序号</uni-th> -->
				        <uni-th align="center" width="80">姓名</uni-th>
				        <uni-th align="center" width="80">工序</uni-th>
						<uni-th align="center" width="80">亩</uni-th>
						<uni-th align="center" width="80">单价</uni-th>
						<uni-th align="center" width="80">总价</uni-th>
						<uni-th align="center" width="100">林班号</uni-th>
						<uni-th align="center" width="120">时间</uni-th>
						<uni-th align="center" width="120">备注</uni-th>
				    </uni-tr>
				    <!-- 表格数据行 -->
				    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pro_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.number}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.unit_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.total_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
						</uni-td>
				    </uni-tr>
				</uni-table>
			</view>
			<view class="fix-bottom">
				<view class="flex item">
					<view class="flex text_w"><text class="title">当日预支</text>：<text class="text_color">{{form.dayCountPrice}}</text>（元）</view>
					<view class="flex text_w pl-60">当日：<text class="text_color">{{form.dayCountNum}}</text>（笔）</view>
				</view>
				<view class="flex item">
					<view class="flex text_w"><text class="title">合计</text>：<text class="text_color">{{form.CountPrice}}</text>（元）</view>
					<view class="flex text_w pl-60"><text>合计：</text><text class="text_color">{{form.CountNum}}</text>（笔）</view>
				</view>
			</view>
			<view v-show="show" class="modal_left" @click="closeModal('shaixuan')">
				<view class="modal-main" @click.stop @click="closeText">
					<view class="top container">
						<image :src="icon[35].icon"></image>
						时间范围
					</view>
					<view class="flex time-box" >
						<uni-datetime-picker class="date-picker" ref="formDate" :value="start_time" @change="changeDate($event,'start_time')" type="date" placeholder="开始时间"/>
						<uni-datetime-picker class="date-picker" ref="formDate" :value="end_time" @change="changeDate($event,'end_time')" type="date" placeholder="截至时间"/>
					</view>
					<view class="operate">
						<view>
							<view class="item_box">
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">林班：</view>
									</view>
									<view class="icon_text fs flex">
										<input
											class="input" 
											type="text" 
											placeholder="请选择林班"
											v-model="Contact_name" 
											@focus="search_site($event,'Contact_id')" 
											@input="search_site($event,'Contact_id')"
											@blur="search_blur($event,'Contact_id')"
										/>
										<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
										<view  class="group_down" v-if="ContactShow">
											<view v-for="item in ContactList" :key="item.id" class="group_down_list" :class="{group_down_index:quartel_id == item.id}">
												<view @click="toDetail(item,'Contact_id')" >{{item.quartel_name}}</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="operate"  style="height: 800rpx;overflow: hidden;overflow-y: scroll;" v-if="count_afforestation == 1">
						<view>
							<view class="item" style="padding: 33.33rpx 39.58rpx;">
								<view class="flex">
									<view class="icon_title fs">工序：</view>
								</view>
								<view class="icon_text fs">
									 <input
									 	class="input" 
									 	type="text" 
									 	placeholder="请选择工序"
									 	v-model="pro_name" 
									 	@focus="search_site($event,'pro_name')" 
									 	@input="search_site($event,'pro_name')"
									 	@blur="search_blur($event,'pro_name')"
									 />
									 <!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
									 <view  class="group_down" v-if="pro_nameShow">
									 	<view v-for="item in list_gongxu" :key="item.id" class="group_down_list" :class="{group_down_index:pro_id == item.id}">
									 		<view @click="toDetail(item,'pro_name')" >{{item.pro_name}}</view>
									 	</view>
									 </view>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom_button">
						<button class="left" @click="chongzhi">重置</button>
						<button class="right" @click="search_modal">确认</button>
					</view>
				</view>
			</view>
		</view>
		<view class="background "   v-if="titlecount == 2" :class="[count == 1 ? 'fix-padding-320' :'fix-padding']">
			<!-- tab栏 -->
			<view class="tab">
				<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
					<view>{{item}}</view>
				</view>
				<view class="tab_list">
					<view class="search_right" @click="shaixuan">
						筛选
						<image :src="icon[32].icon"></image>
					</view>
				</view>
			</view>
			<view class="container search">
			    <view class="flex search_box">
			        <uni-easyinput prefixIcon="search" class="input" v-model="search_name" @input="search($event)" placeholder="请输入"></uni-easyinput>
			    </view>
			</view>
			<view class="table" v-if="count == 0">
				<uni-table border stripe emptyText="暂无更多数据">
				    <!-- 表头行 -->
				    <uni-tr>
				        <uni-th align="center" width="90">磅单号</uni-th>
				        <uni-th align="center" width="110">车牌号</uni-th>
				        <uni-th align="center" width="70">毛重</uni-th>
						<uni-th align="center" width="70">皮重</uni-th>
						<uni-th align="center" width="70">净重</uni-th>
						<uni-th align="center" width="80">扣水份</uni-th>
						<uni-th align="center" width="60">单位</uni-th>
						<uni-th align="center" width="100">林班名称</uni-th>
						<uni-th align="center" width="120">时间</uni-th>
						<uni-th align="center" width="80">操作员</uni-th>
						<uni-th align="center" width="80">挖机</uni-th>
						<uni-th align="center" width="80">油锯手</uni-th>
						<uni-th align="center" width="80">品名</uni-th>
						<uni-th align="center" width="120">备注</uni-th>
				    </uni-tr>
				    <!-- 表格数据行 -->
				    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pounds_sn}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.zzc_name}}-{{item.car_number}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.gros_weight}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.cargo_weight}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.net_weight}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.k_moisture}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">吨</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.add_time}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.sb_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.wj_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.yjs_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pm_name}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
						<uni-th align="center" width="80">林班号</uni-th>
						<uni-th align="center" width="100">场地挖机</uni-th>
						<uni-th align="center" width="120">出车时间</uni-th>
						<uni-th align="center" width="100">是否收单</uni-th>
						<uni-th align="center" width="120">收单时间</uni-th>
						<uni-th align="center" width="80">扣款</uni-th>
						<uni-th align="center" width="80">操作员</uni-th>
						<uni-th align="center" width="120">备注</uni-th>
				    </uni-tr>
				    <!-- 表格数据行 -->
				    <uni-tr class="uni-tr" v-for="(item,index) in list" :key="index">
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pounds_sn}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.dc_name}}-{{item.car_number}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.net_weight}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">吨</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.site_users}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.start_time}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.closed_order_name}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.single_time !==''">{{item.single_time}}</view>
							<view @click="getCurrentRow(item)" v-if="item.single_time ==''">-</view>
						</uni-td>
						
						<uni-td align="center"><view @click="getCurrentRow()">{{item.penalty}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.name}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.emplo_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.job_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">￥{{item.per_amount}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.capital}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.pre_time}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)" v-if="item.is_transfer == 1">是</view>
						<view @click="getCurrentRow(item)" v-if="item.is_transfer == 0">
							否
						</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.zz_time !==''">{{item.zz_time}}</view>
							<view @click="getCurrentRow(item)" v-if="item.zz_time ==''">-</view>
						</uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.sign}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pro_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.job_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.project}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.unit}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.unit_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.total_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.add_time}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pro_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.job_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.number}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.unit_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.total_price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.add_time}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
				        <!-- <uni-td align="center"><view @click="getCurrentRow(item)">{{item.serial_number}}</view></uni-td> -->
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.pro_name}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.job_name}}</view></uni-td>
				        <uni-td align="center"><view @click="getCurrentRow(item)">{{item.quartel_account}}</view></uni-td>
						<!-- <uni-td align="center"><view @click="getCurrentRow()">{{item.mon}}</view></uni-td> -->
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.project}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.price}}</view></uni-td>
						<uni-td align="center"><view @click="getCurrentRow(item)">{{item.add_time}}</view></uni-td>
						<uni-td align="center">
							<view @click="getCurrentRow(item)" v-if="item.note !==''">{{item.note}}</view>
							<view @click="getCurrentRow(item)" v-if="item.note ==''">-</view>
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
			<view v-show="show" class="modal_left" @click="closeModal('shaixuan')">
				<view class="modal-main" @click.stop @click="closeText">
					<view class="top container" v-if="count == 0 || count == 1 || count == 2">
						<image :src="icon[35].icon"></image>
						时间范围
					</view>
					<view class="flex time-box" v-if="count == 0 || count == 1 || count == 2">
						<uni-datetime-picker class="date-picker" ref="formDate" :value="start_time" @change="changeDate($event,'start_time')" type="date" placeholder="开始时间"/>
						<uni-datetime-picker class="date-picker" ref="formDate" :value="end_time" @change="changeDate($event,'end_time')" type="date" placeholder="截至时间"/>
					</view>
					<view class="operate">
					    <view>
							<view class="item_box">
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">林班：</view>
									</view>
									<view class="icon_text fs flex">
										<input
											class="input" 
											type="text" 
											placeholder="请选择林班"
											v-model="Contact_name" 
											@focus="search_site($event,'Contact_id')" 
											@input="search_site($event,'Contact_id')"
											@blur="search_blur($event,'Contact_id')"
										/>
										<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
										<view  class="group_down" v-if="ContactShow">
											<view v-for="item in ContactList" :key="item.id" class="group_down_list" :class="{group_down_index:quartel_id == item.id}">
												<view @click="toDetail(item,'Contact_id')" >{{item.quartel_name}}</view>
											</view>
										</view>
									</view>
								</view>
								
							</view>
					    	<view class="item_box" v-if="count == 0">
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">人员：</view>
									</view>
									<view class="icon_text fs flex" @click="openModal('zhongzhuanche')">
										<view v-if="car_emplo == ''">请选择</view>
										<view v-else>{{car_emplo}}</view>
										<image :src="icon[28].icon" class="image_jt"></image>
									</view>
								</view>
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">车牌号：</view>
									</view>
									<view class="icon_text fs">
										 <input style="width: 250rpx;text-align: right;" class="input" v-model="car_number" placeholder="请输入车牌号"></input>
									</view>
								</view>
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">挖机：</view>
									</view>
									<view class="icon_text fs flex">
										<input
											class="input" 
											type="text" 
											placeholder="请选择挖机"
											v-model="wj_name" 
											@focus="search_site($event,'drivers_id')" 
											@input="search_site($event,'drivers_id')"
											@blur="search_blur($event,'drivers_id')"
										/>
										<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
										<view  class="group_down" v-if="driversShow">
											<view v-for="item in driversList" :key="item.id" class="group_down_list" :class="{group_down_index:drivers_id == item.id}">
												<view @click="toDetail(item,'drivers_id')" >{{item.user_name}}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">油锯手：</view>
									</view>
									<view class="icon_text fs flex">
										<input
											class="input" 
											type="text" 
											placeholder="请选择油锯手"
											v-model="yjs_name" 
											@focus="search_site($event,'chain_saw_id')" 
											@input="search_site($event,'chain_saw_id')"
											@blur="search_blur($event,'chain_saw_id')"
										/>
										<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
										<view  class="group_down" v-if="chain_sawShow">
											<view v-for="item in chain_sawList" :key="item.id" class="group_down_list" :class="{group_down_index:chain_saw_id == item.id}">
												<view @click="toDetail(item,'chain_saw_id')" >{{item.user_name}}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">品名：</view>
									</view>
									<view class="icon_text fs flex">
										<input
											class="input" 
											type="text" 
											placeholder="请选择品名"
											v-model="pm_name" 
											@focus="search_site($event,'product_name_id')" 
											@input="search_site($event,'product_name_id')"
											@blur="search_blur($event,'product_name_id')"
										/>
										<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
										<view  class="group_down" v-if="product_nameShow">
											<view v-for="item in product_nameList" :key="item.id" class="group_down_list" :class="{group_down_index:product_name_id == item.id}">
												<view @click="toDetail(item,'product_name_id')" >{{item.name}}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="item">
									<view class="flex">
										<view class="icon_title fs">备注：</view>
									</view>
									<view class="icon_text fs">
										 <input style="width: 250rpx;text-align: right;" class="input" v-model="note" placeholder="请输入备注"></input>
									</view>
								</view>
							</view>
					    </view>
						<view class="item_box" v-if="count == 1">
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">人员：</view>
								</view>
								<view class="icon_text fs flex" @click="openModal('zhongzhuanche')">
									<view v-if="car_emplo == ''">请选择</view>
									<view v-else>{{car_emplo}}</view>
									<image :src="icon[28].icon" class="image_jt"></image>
								</view>
							</view>
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">车牌号：</view>
								</view>
								<view class="icon_text fs">
									 <input style="width: 250rpx;text-align: right;" class="input" v-model="car_number" placeholder="请输入车牌号"></input>
								</view>
							</view>
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">场地挖机：</view>
								</view>
								<view class="icon_text fs flex">
									<input
										class="input" 
										type="text" 
										placeholder="请选择场地挖机"
										v-model="site_user_name" 
										@focus="search_site($event,'site_user')" 
										@input="search_site($event,'site_user')"
										@blur="search_blur($event,'site_user')"
									/>
									<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
									<view  class="group_down" v-if="site_userShow">
										<view v-for="item in site_userList" :key="item.id" class="group_down_list" :class="{group_down_index:site_user_ids == item.id}">
											<view @click="toDetail(item,'site_user')" >{{item.user_name}}</view>
										</view>
									</view>
								</view>
							</view>
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">是否收单：</view>
								</view>
								<view class="icon_text fs flex">
									<radio-group @change="checkedType" class="check_box" style="width: 150rpx; display: flex;">
										<view v-for="(item,index) in type_shoudan" :key="item.id" class="check" style="margin-left: 10rpx;">
											<radio class="checkClick round" :value="item.id" :checked="item.checked">{{item.name}}</radio>
										</view>
									</radio-group>
								</view>
							</view>
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">备注：</view>
								</view>
								<view class="icon_text fs">
									 <input style="width: 250rpx;text-align: right;" class="input" v-model="note" placeholder="请输入备注"></input>
								</view>
							</view>
						</view>
						<view class="item_box" v-if="count == 3 || count == 4 || count == 5 || count == 2">
							<view class="item">
								<view class="flex">
									<view class="icon_title fs">职业：</view>
								</view>
								<view class="icon_text fs flex">
									<picker class="picker" @change="changeName($event,'job')" :value="jobIndex" :range="job_list" :range-key="'job_name'">
									    <view v-if="jobIndex == -1" class="uni-input">请选择</view>
									    <view v-else class="uni-input">{{job_list[jobIndex].job_name}}</view>
									</picker>
									<image :src="icon[28].icon" class="image_jt"></image>
								</view>
							</view>
							<view class="item"  v-if="count == 3 || count == 4 || count == 5">
								<view class="flex">
									<view class="icon_title fs">林班号：</view>
								</view>
								<view class="icon_text fs">
									 <input style="width: 250rpx;text-align: right;" class="input" v-model="quartel_account" placeholder="请输入"></input>
								</view>
							</view>
							<view class="item" v-if="count == 3 || count == 5">
								<view class="flex">
									<view class="icon_title fs">项目：</view>
								</view>
								<view class="icon_text fs">
									 <input style="width: 250rpx;text-align: right;" class="input" v-model="project" placeholder="请输入"></input>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom_button">
						<button class="left" @click="chongzhi">重置</button>
						<button class="right" @click="search_modal">确认</button>
					</view>
				</view>
			</view>
			<view v-show="showZhong" class="modal">
			    <view class="modal-main">
			        <view class="modal-title">
			            <view class="text">人员</view>
			            <image class="close" :src="icon[30].icon" @click="closeModal('zhongzhuanche')">
			            </image>
			        </view>
			        <view class="modal-box">
						<view class="search flex">
						    <uni-easyinput class="input" v-model="textZhong" @input="searchtextZhong($event)" placeholder="请输入查询信息"></uni-easyinput>
						</view>
			            <view class="content">
			               <view class="left">
			                    <view class="left_item" v-for="(item,index) in mingongList" :key = 'index' @click="Firstclick(item.id)"
								:class="{btna:count_I == item.id}">
									{{item.user_name}}
								</view>
			                </view>
			            </view>
						<uni-pagination
						@change = "handlePage"
						showIcon="true"
						:total="data_count"
						pageSize=10
						:current="pageNum"
						:showIcon="true"
						>
							
						</uni-pagination>
			        </view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeadNav from '@/components/head-nav.vue'
	export default {
		components:{
			"head-nav":HeadNav
		},
		data() {
			return {
				titlecount:1,
				textTest:'造林汇总',
				items_afforestation:[
					"预支",
					"工程款计算"
				],
				count_afforestation:0,
				show: false,
				list:[],
				data:'',
				search_name:'',
				page:1,
				form:{
					CountNum:'',
					CountPrice:'',
					dayCountPrice:'',
					dayCountNum:'',
				},
				list_gongxu:[],
				start_time:'',
				end_time:'',
				pro_name:'',
				pro_id:'',
				icon:[],
				pro_nameShow:false,
				items:[
					"中转车",
					"大车",
					"预支",
					"维修",
					"补",
					"扣"
				],
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
				showZhong: false,
				textZhong:'',
				mingongList:[],
				count_I:'',
				car_emplo:'',
				car_emplo_id:'',
				car_number:'',
				left_name:[],
				count_B:'',
				
				product_nameList:[],
				product_name_id:'',
				pm_name:'',
				
				driversList:[],
				drivers_id:'',
				wj_name:'',
				
				chain_sawList:[],
				chain_saw_id:'',
				yjs_name:'',
				
				site_userList:[],
				site_user_ids:'',
				site_user_name:'',
				
				start_time:'',
				end_time:'',
				icon:[],
				type_shoudan:[
					{
						id:1,
						name:"是",
						checked:false,
					},
					{
						id:0,
						name:"否",
						checked:false,
					},
				],
				checkedShoudanType:'', //复选框选中的值，类型
				search_name:'',
				NameList:[],
				quartel_account:'',
				project:'',
				job_list:[],
				profession:'',
				jobIndex:-1,
				dachexiangqingList:[],
				note:'',
				product_nameShow:false,
				quartel_id:'',
				ContactList:[],
				ContactShow:false,
				Contact_name:'',
				pageNum:1,
				data_count:'',
				
				driversShow:false,
				chain_sawShow:false,
				site_userShow:false
				
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.page = 1
			// 职业列表
			this.http({
				url:this.api.jobData,
				method: "POST",
				data: {
					uid: this.common.get("uid"),
					token: this.common.get("token"),
				},
				success: res => {
					this.job_list = res.list
				}
			})
			// 全部民工
			this.http({
				url:this.api.Summary_employees,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
					token:this.common.get("token"),
					length:10,
					page:this.pageNum-1
				},
				success:res =>{
					this.mingongList = res.list
					this.data_count = res.total
				}
			})
		},
		onShow() {
			this.page = 1
			this.listInterface()
		},
		//上拉触底函数
		onReachBottom(){
			if(this.titlecount == 1) {
				if (this.count_afforestation == 0) {
					this.http({
					    url: this.api.Summary_queryLists,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        emplo_name:this.search_name,
					        type:1,
					        page:this.page,
							start_time:this.start_time,
							end_time:this.end_time,
					        quartel_id:this.quartel_id
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
								this.form.CountNum = res.CountNum
								this.form.CountPrice = res.CountPrice
								this.form.dayCountPrice = res.dayCountPrice
								this.form.dayCountNum = res.dayCountNum
							}
					    }, 
					})
				} else {
					this.http({
					    url: this.api.Summary_queryLists,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        emplo_name:this.search_name,
							start_time:this.start_time,
							end_time:this.end_time,
							pro_id:this.pro_id,
					        type:2,
					        page:this.page,
					        quartel_id:this.quartel_id
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
								this.form.CountNum = res.CountNum
								this.form.CountPrice = res.CountPrice
								this.form.dayCountPrice = res.dayCountPrice
								this.form.dayCountNum = res.dayCountNum
							}
					    }, 
					})
				}
			} else if(this.titlecount == 2) {
				if (this.count == 2) {
					this.http({
					    url: this.api.Summary_queryLists,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        emplo_name:this.search_name,
					        type:3,
					        page:this.page,
							start_time:this.start_time,
							end_time:this.end_time,
					        quartel_id:this.quartel_id,
							profession:this.profession
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
					    url: this.api.Summary_cutDownList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        page:this.page,
					        quartel_id:this.quartel_id,
					        start_time:this.start_time,
					        end_time:this.end_time,
							drivers_id:this.wj_name,
							 chain_saw_id:this.yjs_name,
					        product_name_id:this.product_name_id,
					        car_emplo_id:this.car_emplo,
					        car_number:this.car_number,
					        pounds_sn:this.search_name,
							note:this.note,
							profession:this.profession
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
					    url: this.api.Summary_bigCartList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        page:this.page,
					        quartel_id:this.quartel_id,
					        start_time:this.start_time,
					        end_time:this.end_time,
					        car_emplo_id:this.car_emplo,
					        closed_order:this.checkedShoudanType,
					        car_number:this.car_number,
					        pounds_sn:this.search_name,
							note:this.note,
							profession:this.profession,
							site_user_ids:this.site_user_name
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
					    url: this.api.Summary_maintenanceList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        pro_name:this.search_name,
					        page:this.page,
					        quartel_id:this.quartel_id,
							quartel_account:this.quartel_account,
							project:this.project,
							profession:this.profession
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
					    url: this.api.Summary_subsidiesList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        pro_name:this.search_name,
					        page:this.page,
					        quartel_id:this.quartel_id,
							quartel_account:this.quartel_account,
							profession:this.profession
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
					    url: this.api.Summary_deductList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
					        token: this.common.get("token"),
					        pro_name:this.search_name,
					        page:this.page,
					        quartel_id:this.quartel_id,
							quartel_account:this.quartel_account,
							project:this.project,
							profession:this.profession
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
				
			}
			
		},
		methods: {
			// 头部导航栏
			textCountClick(param) {
				console.log('param',param)
				this.titlecount = param
				if(this.titlecount == 1) {
					this.textTest = '造林汇总'
				} else if (this.titlecount == 2) {
					this.textTest = '砍伐汇总'
				}
				this.page = 1
				this.chongzhi()
				this.listInterface()
			},
			hideShow() {
				this.driversShow = false
				this.chain_sawShow = false
				this.product_nameShow = false
				this.pro_nameShow = false
				this.ContactShow = false
				this.site_userShow = false
			},
			closeText () {
				this.driversShow = false
				this.chain_sawShow = false
				this.product_nameShow = false
				this.pro_nameShow = false
				this.ContactShow = false
				this.site_userShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'product_name_id') {
						// this.product_nameShow = false
						if(this.product_name_id=='') {
							this.pm_name = ''
						} else {
							this.product_nameList.map((item,index) => {
								if(this.product_name_id == item.id) {
									this.pm_name = item.name
								}
							})
						}			
					} else if(text == 'pro_name') {
						// this.pro_nameShow = false
						if(this.pro_id=='') {
							this.pro_name = ''
						} else {
							this.list_gongxu.map((item,index) => {
								if(this.pro_id == item.id) {
									this.pro_name = item.pro_name
								}
							})
						}			
					} else if(text == 'Contact_id') {
						if(this.quartel_id=='') {
							this.Contact_name = ''
						} else {
							this.ContactList.map((item,index) => {
								if(this.quartel_id == item.id) {
									this.Contact_name = item.quartel_name
								}
							})
						}
					} else if(text == 'drivers_id') {
						// this.driversShow = false
						if(this.drivers_id=='') {
							this.wj_name = ''
						} else {
							this.driversList.map((item,index) => {
								if(this.drivers_id == item.id) {
									this.wj_name = item.user_name
								}
							})
						}			
					} else if(text == 'chain_saw_id') {
						// this.chain_sawShow = false
						if(this.chain_saw_id=='') {
							this.yjs_name = ''
						} else {
							this.chain_sawList.map((item,index) => {
								if(this.chain_saw_id == item.id) {
									this.yjs_name = item.user_name
								}
							})
						}			
					} else if(text == 'site_user'){
						// this.site_userShow = false
						if(this.site_user_ids=='') {
							this.site_user_name = ''
						} else {
							this.site_userList.map((item,index) => {
								if(this.site_user_ids == item.id) {
									this.site_user_name = item.user_name
								}
							})
						}
					}
				},200)
				
			},
			// 下拉框文字选择
			toDetail(event,text) {
				if(text == 'product_name_id'){
					this.product_name_id = event.id
					this.pm_name = event.name
					this.product_nameShow = false
				} else if(text == 'pro_name') {
					this.pro_id = event.id
					this.pro_name = event.pro_name
					this.pro_nameShow = false
				} else if(text == 'Contact_id') {
					this.Contact_name = event.quartel_name
					this.quartel_id = event.id
					this.ContactShow = false
				} else if(text == 'drivers_id') {
					this.drivers_id = event.id
					this.wj_name = event.user_name
					this.driversShow = false
				} else if(text == 'chain_saw_id') {
					this.chain_saw_id = event.id
					this.yjs_name = event.user_name
					this.chain_sawShow = false
				} else if(text == 'site_user'){
					this.site_user_ids = event.id
					this.site_user_name = event.user_name
					this.site_userShow = false
				}
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'product_name_id'){
					this.product_nameShow = true
					// 品名
					this.http({
					    url: this.api.Summary_product,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							name:search_name
					    },
					    success: res => {
					        this.product_nameList = res.list
					    }
					})
				} else if(text == 'pro_name') {
					this.pro_nameShow = true
					// 工序
					this.http({
					    url: this.api.Summary_working,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							name:search_name
					    },
					    success: res => {
					        this.list_gongxu = res.list
					    }
					})
				} else if(text == 'Contact_id') {
					this.ContactShow = true
					// 林班
					this.http({
						url:this.api.Contact_quartelList,
						method: "POST",
						data: {
							uid: this.common.get("uid"),
							token: this.common.get("token"),
							type:this.titlecount,
							quartel_name:search_name
						},
						success: res => {
							this.ContactList = res.list
						}
					})
				} else if(text == 'drivers_id') {
					this.driversShow = true
					// 挖机
					this.http({
						url:this.api.Summary_employeesNew,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							name:search_name,
						},
						success:res =>{
							this.driversList = res.list
						}
					})
				} else if(text == 'chain_saw_id'){
					this.chain_sawShow = true
					// 油锯手
					this.http({
						url:this.api.Summary_employeesNew,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							name:search_name,
						},
						success:res =>{
							this.chain_sawList = res.list
						}
					})
				} else if(text == 'site_user'){
					this.site_userShow = true
					// 场地挖机
					this.http({
						url:this.api.Summary_employeesNew,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							name:search_name,
						},
						success:res =>{
							this.site_userList = res.list
						}
					})
				}
			},
			
			// 是否收单
			checkedType(e) {
				this.checkedShoudanType = e.detail.value;
			},
			changeDate(eve,i) {
				if(i == 'start_time') {
					this.start_time = eve
				} else {
					this.end_time = eve
				}
			},
			search(e) {
				this.page = 1
				this.search_name = e
				this.listInterface()
			},
			// 弹框搜索
			search_modal() {
				this.page = 1
				this.listInterface()
				this.show = false
			},
			// 下拉框点击
			changeName(e,name) {
				if (name == 'job') {
					this.jobIndex = e.target.value
					this.profession =  this.job_list[this.jobIndex].job_name
				}
			},
			// 弹框搜索
			searchtextZhong(e) {
				this.textZhong = e
				this.pageNum = 1
				this.http({
					url:this.api.Summary_employees,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						name:this.textZhong,
						length:10,
						page:this.pageNum-1
					},
					success:res =>{
						this.data_count = res.total
						this.mingongList = res.list
						this.count_I = ''
					}
				})
			},
			//分页点击
			handlePage(params) {
				this.pageNum = params.current
				// 全部民工
				this.http({
					url:this.api.Summary_employees,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						length:10,
						page:this.pageNum-1,
						name:this.textZhong,
					},
					success:res =>{
						this.mingongList = res.list
						this.data_count = res.total
					}
				})
			},
			// 一级分类点击
			Firstclick(eve) {
				this.count_I = eve
				this.mingongList.map((item,index)=>{
					if(this.count_I == item.id) {
						this.car_emplo_id = item.id
						this.car_emplo = item.user_name
						this.showZhong = false
					}
				})
			},
			// 筛选点击
			shaixuan() {
				this.show = true
			},
			// 弹框
			openModal(name) {
				if(name=='zhongzhuanche') {
					 this.showZhong = true
				}
			},
			// 弹窗关闭按钮
			closeModal(name) {
				if(name == 'zhongzhuanche') {
					this.showZhong = false
				}else if (name == 'shaixuan') {
					this.show = false
				}
			    
			},
			
			// 列表接口
			listInterface() {
				if(this.titlecount == 1) {
					if (this.count_afforestation == 0) {
						this.http({
							url:this.api.Summary_queryLists,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								emplo_name:this.search_name,
								start_time:this.start_time,
								end_time:this.end_time,
								type:1,
								page:this.page,
								quartel_id:this.quartel_id
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
								this.form.CountNum = res.CountNum
								this.form.CountPrice = res.CountPrice
								this.form.dayCountPrice = res.dayCountPrice
								this.form.dayCountNum = res.dayCountNum
							}
						})
					} else {
						this.http({
							url:this.api.Summary_queryLists,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								emplo_name:this.search_name,
								start_time:this.start_time,
								end_time:this.end_time,
								pro_id:this.pro_id,
								type:2,
								page:this.page,
								quartel_id:this.quartel_id
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
								this.form.CountNum = res.CountNum
								this.form.CountPrice = res.CountPrice
								this.form.dayCountPrice = res.dayCountPrice
								this.form.dayCountNum = res.dayCountNum
							}
						})
					}
				} else if (this.titlecount == 2) {
					if (this.count == 0) {
						this.http({
							url:this.api.Summary_cutDownList,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								page:this.page,
								quartel_id:this.quartel_id,
								start_time:this.start_time,
								end_time:this.end_time,
								drivers_id:this.wj_name,
								chain_saw_id:this.yjs_name,
								product_name_id:this.product_name_id,
								car_emplo_id:this.car_emplo,
								car_number:this.car_number,
								pounds_sn:this.search_name,
								note:this.note,
								profession:this.profession
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
							url:this.api.Summary_bigCartList,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								page:this.page,
								quartel_id:this.quartel_id,
								start_time:this.start_time,
								end_time:this.end_time,
								car_emplo_id:this.car_emplo,
								closed_order:this.checkedShoudanType,
								car_number:this.car_number,
								pounds_sn:this.search_name,
								note:this.note,
								profession:this.profession,
								site_user_ids:this.site_user_name
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
							url:this.api.Summary_queryLists,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								emplo_name:this.search_name,
								start_time:this.start_time,
								end_time:this.end_time,
								type:3,
								page:this.page,
								quartel_id:this.quartel_id,
								profession:this.profession
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
							url:this.api.Summary_maintenanceList,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								pro_name:this.search_name,
								page:this.page,
								quartel_id:this.quartel_id,
								quartel_account:this.quartel_account,
								project:this.project,
								profession:this.profession
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
							url:this.api.Summary_subsidiesList,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								pro_name:this.search_name,
								page:this.page,
								quartel_id:this.quartel_id,
								quartel_account:this.quartel_account,
								profession:this.profession
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
							url:this.api.Summary_deductList,
							method: "POST",
							data: {
								uid: this.common.get("uid"),
								token: this.common.get("token"),
								pro_name:this.search_name,
								page:this.page,
								quartel_id:this.quartel_id,
								quartel_account:this.quartel_account,
								project:this.project,
								profession:this.profession
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
				}
			},
			//行点击
			getCurrentRow(row) {
				this.common.set('tiqu', '')
				if(this.titlecount == 1) {
					uni.navigateTo({
						url:'/pagesA/pages/afforestation/listDetail/listDetail?data='+encodeURIComponent(JSON.stringify(row))
						// url:'/pages/afforestation/listDetail/listDetail?data='+row
					})
				} else {
					uni.navigateTo({
						url:'/pagesA/pages/fell/listDetail/listDetail?data='+encodeURIComponent(JSON.stringify(row))
						// url:'/pages/afforestation/listDetail/listDetail?data='+row
					})
				}
				
				
			},
			// tab栏点击事件
			change(e) {
				console.log(e)
				this.page = 1
				if(this.titlecount == 1) {
					this.count_afforestation =  e
				} else {
					this.count = e
				}
				this.search_name = ''
				this.chongzhi()
				this.listInterface()
				
			},
			// 重置
			chongzhi() {
				this.quartel_id = ''
				this.Contact_name = ''
				this.jobIndex = -1
				this.profession = ''
				// this.pro_nameIndex = -1
				this.pm_name = ''
				this.product_name_id = ''
				this.car_number = ''
				this.car_emplo_id = ''
				this.car_emplo = ''
				this.textZhong = ''
				this.count_I = ''
				this.start_time = ''
				this.end_time = ''
				this.checkedShoudanType = ''
				this.quartel_account = ''
				this.project = ''
				this.note = ''
				this.type_shoudan = [
					{
						id:1,
						name:"是",
						checked:false,
					},
					{
						id:0,
						name:"否",
						checked:false,
					},
				]
				this.pro_name = ''
				this.pro_id = ''
				this.wj_name = ''
				this.drivers_id = ''
				this.yjs_name = ''
				this.chain_saw_id = ''
				this.site_user_ids = ''
				this.site_user_name = ''
			},
			// 弹窗选择点击
			xuanze() {
				uni.navigateTo({
					// url:'/pages/warehouse/add/add?data='+encodeURIComponent(JSON.stringify(eve))
					url:'/pagesA/pages/afforestation/choose/choose'
				})
			},
		}
	}
</script>

<style lang="scss">
.background_contant {
	padding-top: 18%;
	.background {
		.modal_left {
			.modal-main {
				padding-top: 18%;
				height: 90%;
			}
		}
		.modal {
			padding-top: 20%;
			.modal-main {
				height: 80%;
				top: 8%;
			}

		}
	}
	
}

.picker {
	width: 210rpx;
	.uni-input {
		width: 210rpx;
		text-align: right;
	}
}

.modal {
	z-index: 999;
	margin-left: 0!important;
	.modal-main {
		.modal-box {
			.search {
				height: 120rpx;
				margin: 0!important;
				.input {
					width: 600rpx;
					height: 80rpx;
					line-height: 80rpx;
				}
				.uni-easyinput__content {
					min-height: 80rpx!important;
				}
			}
			.content {
				height: calc(100% - 170rpx);
				.left {
					width: 100%;
					text-align: left;
					 background: #ffffff;
					.left_item {
						border-bottom: 0.69rpx solid #DCDFE6;
					}
					.btna {
						text-align: left;
						padding: 0!important;
						color: #4C9D57;
						background: #ffffff;
						border-bottom: 0!important;
					}
				}
			}
		}
	}
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
