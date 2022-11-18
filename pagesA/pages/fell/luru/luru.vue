<template>
	<view class="background fix-padding" @click="hideShow">
		<!-- tab栏 -->
		<view class="tab">
			<view class="tab_list" v-for="(item,index) in items" :key="index" :class="{btna:count == index}" @click="change(index)">
				<view>{{item}}</view>
			</view>
		</view>
		<view class="good" v-if="count == 0">
			<view class="group">
			    <view class="title">磅单号</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.pounds_sn" placeholder="请输入磅单号" disabled></input>
			</view>
			<view class="group">
				<view class="title">中转车</view><text class="title_color">：</text>
			    <view class="outModal" style="width: 400rpx;" @click="openModal('zhongzhuanche')">
			    	<input class="input"style="width: 400rpx;" v-model="car_zhong" placeholder="请选择" disabled></input>
			    </view>
				<view style="color:#4C9D57;width: 160rpx;text-align: right;" @click="tiqu">提取</view>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in form_zhong.gros_imgs" :key='index'>
						<image class="image" :src="item" @click="previewImage('gros_imgs',index)" mode="aspectFill"></image>
						<image class="delete" :src="icon[24].icon" @click="deleteImage('gros_imgs',index)"></image>
					</view>
					<!-- <view class="item" v-if="form_zhong.gros_imgs !== ''">
						<image class="image" :src="form_zhong.gros_imgs" @click="previewImage('gros_imgs')"></image>
					</view> -->
					<view class="item" @click="uploadImage('gros_imgs')" v-if="form_zhong.extract_id==''">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
				
			</view>
			<view class="group">
			    <view class="title">毛重</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.gros_weight" @input="maozhong($event)" placeholder="请输入毛重"></input>
			</view>
			<view class="group">
			    <view class="title">毛重时间</view><text class="title_color">：</text>
			   <uni-datetime-picker class="date-picker" ref="formDate":value=" form_zhong.gros_time" disabled placeholder="请选择日期"/>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="form_zhong.cargo_imgs.length>0" v-for="(item,index) in form_zhong.cargo_imgs" :key='index' >
						<image class="image" :src="item" @click="previewImage('cargo_imgs',index)" mode="aspectFill"></image>
						<image class="delete" :src="icon[24].icon" @click="deleteImage('cargo_imgs',index)"></image>
					</view>
					<!-- <view class="item" v-if="form_zhong.cargo_imgs !== ''">
						<image class="image" :src="form_zhong.cargo_imgs" @click="previewImage('cargo_imgs')"></image>
					</view> -->
					<view class="item" @click="uploadImage('cargo_imgs')" v-if="form_zhong.extract_id==''">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">皮重</view><text class="title_color">：</text>
			    <input class="input" style="width: 100rpx;"  v-model="form_zhong.cargo_weight" @input="weight($event)"   placeholder="请输入皮重"></input>
				<view  class="input" style="line-height:80rpx ;">(误差：{{wucha.errors}},平均误差：{{wucha.average}})</view>
			</view>
			<view class="group">
			    <view class="title">皮重时间</view><text class="title_color">：</text>
			   <uni-datetime-picker class="date-picker" ref="formDate":value=" form_zhong.cargo_time" disabled placeholder="请选择日期"/>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-for="(item,index) in form_zhong.car_imgs" :key='index'>
						<image class="image" :src="item" @click="previewImage('car_imgs',index)" mode="aspectFill"></image>
						<image class="delete" :src="icon[24].icon" @click="deleteImage('car_imgs',index)"></image>
					</view>
					<!-- <view class="item" v-if="form_zhong.car_imgs !== ''">
						<image class="image" :src="form_zhong.car_imgs" @click="previewImage('car_imgs')"></image>
					</view> -->
					<view class="item" @click="uploadImage('car_imgs')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">扣水份</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.k_moisture" @input="koushui($event)" placeholder="请输入扣水份"></input>
			</view>
			<view class="group">
			    <view class="title">净重</view><text class="title_color">：</text>
				<input class="input" v-model="form_zhong.net_weight" placeholder="请输入净重" disabled></input>
			</view>
			<view class="group">
			    <view class="title">日期</view><text class="title_color">：</text>
			   <uni-datetime-picker class="date-picker" ref="formDate":value=" form_zhong.add_time" @change="changeDate($event,'add_time')" placeholder="请选择日期"/>
			</view>
			
			<view class="group">
			    <view class="title">挖机</view><text class="title_color">：</text>
			    <input 
					class="input" 
					type="text" 
					placeholder="请选择挖机"
					v-model="form_zhong.wj_name" 
					@focus="search_site($event,'drivers_id')" 
					@input="search_site($event,'drivers_id')"
					@blur="search_blur($event,'drivers_id')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="driversShow">
					<view v-for="item in driversList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:form_zhong.drivers_id == item.peasant_id}">
						<view @click="toDetail(item,'drivers_id')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">油锯手</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择油锯手"
					v-model="form_zhong.yjs_name" 
					@focus="search_site($event,'chain_saw_id')" 
					@input="search_site($event,'chain_saw_id')"
					@blur="search_blur($event,'chain_saw_id')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="chain_sawShow">
					<view v-for="item in chain_sawList" :key="item.peasant_id" class="group_down_list" :class="{group_down_index:form_zhong.chain_saw_id == item.peasant_id}">
						<view @click="toDetail(item,'chain_saw_id')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">品名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择品名"
					v-model="form_zhong.pm_name" 
					@focus="search_site($event,'product_name_id')" 
					@input="search_site($event,'product_name_id')"
					@blur="search_blur($event,'product_name_id')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="product_nameShow">
					<view v-for="item in product_nameList" :key="item.id" class="group_down_list" :class="{group_down_index:form_zhong.product_name_id == item.id}">
						<view @click="toDetail(item,'product_name_id')" >{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">操作员</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.name" placeholder="请输入操作员" disabled></input>
			</view>
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.quartel_account" placeholder="请输入林班名称" disabled></input>
			</view>
			
			<view class="group">
			    <view class="title">单位</view><text class="title_color">：</text>
			    <input class="input" v-model="unit" placeholder="请输入单位" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form_zhong.note" placeholder="请输入备注"></input>
			</view>
		</view>
		<view class="good" v-if="count == 1">
			<view class="group">
			    <view class="title">磅单号</view><text class="title_color">：</text>
			    <input class="input" v-model="form_da.pounds_sn" placeholder="请输入磅单号"></input>
			</view>
			<view class="group">
				<view class="title">大车人员</view><text class="title_color">：</text>
			    <view class="outModal" @click="openModal('dache')">
			    	<input class="input" v-model="car_da" placeholder="请选择" disabled></input>
			    </view>
			</view>
			<view class="group">
			    <view class="title">净重</view><text class="title_color">：</text>
			    <input class="input" v-model="form_da.net_weight"placeholder="请输入净重"></input>
			</view>
			<view class="group">
			    <view class="title">出车时间</view><text class="title_color">：</text>
			   <uni-datetime-picker class="date-picker" ref="formDate":value=" form_da.start_time" @change="changeDate($event,'start_time')" placeholder="请选择出车时间"/>
			</view>
			<view class="group">
			    <view class="title">是否收单</view><text class="title_color">：</text>
			   <radio-group @change="checkedType" class="check_box" style="width: 556rpx; margin-left: 30rpx;">
			   	<view v-for="(item,index) in type_shoudan" :key="item.id" class="check">
			   		<radio class="checkClick round" :value="item.id" :checked="checkedShoudanType == item.id">{{item.name}}</radio>
			   	</view>
			   </radio-group>
			</view>
			<view class="group" v-if="checkedShoudanType == 1">
			    <view class="title">收单时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate":value=" form_da.single_time" @change="changeDate($event,'single_time')" placeholder="请选择收单时间"/>
			</view>
			<view class="group">
			    <view class="title">林班号</view><text class="title_color">：</text>
			    <input 
					class="input" 
					type="text" 
					placeholder="请选择林班号"
					v-model="form_da.quartel_account" 
					@focus="search_site($event,'quartel_account')" 
					@input="search_site($event,'quartel_account')"
					@blur="search_blur($event,'quartel_account')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="quartel_accountShow">
					<view v-for="item in quartel_account_list" :key="item.id" class="group_down_list" :class="{group_down_index:form_da.quartel_account_id == item.id}">
						<view @click="toDetail(item,'quartel_account')" >{{item.quartel_account}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">场地挖机</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择场地挖机"
					v-model="form_da.site_user_name" 
					@focus="search_site($event,'site_user')" 
					@input="search_site($event,'site_user')"
					@blur="search_blur($event,'site_user')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="site_userShow">
					<view v-for="item in site_userList" :key="item.id" class="group_down_list" :class="{group_down_index:form_da.site_user_ids == item.peasant_id}">
						<view @click="toDetail(item,'site_user')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group">
			    <view class="title">扣款</view><text class="title_color">：</text>
			    <input class="input" v-model="form_da.penalty" placeholder="请输入扣款"></input>
			</view>
			<view class="group">
			    <view class="title">操作员</view><text class="title_color">：</text>
			    <input class="input" v-model="form_da.name" placeholder="请输入操作员" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form_da.note" placeholder="请输入备注"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="form_da.add_img !== ''">
						<image class="image" :src="form_da.add_img" @click="previewImage('add_img')"></image>
					</view>
					<view class="item" @click="uploadImage('add_img')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="good" v-if="count == 2">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择人员姓名"
					v-model="forms.emplo_name" 
					@focus="search_site($event,'formsEmplo_name')" 
					@input="search_site($event,'formsEmplo_name')"
					@blur="search_blur($event,'formsEmplo_name')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="formsEmplo_nameShow">
					<view v-for="item in NameList" :key="item.id" class="group_down_list" :class="{group_down_index:forms.emplo_id == item.peasant_id}">
						<view @click="toDetail(item,'formsEmplo_name')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group" v-if="forms.emplo_id !== ''">
			    <view class="title">职业</view><text class="title_color">：</text>
				<picker class="picker" @change="changeName($event,'job1')" :value="jobIndex1" :range="jobList1" :range-key="'pro_name'">
				    <view v-if="jobIndex1 == -1" class="uni-input">请选择职业</view>
				    <view v-else class="uni-input">{{jobList1[jobIndex1].pro_name}}</view>
				    <!-- <image class="image" src="/static/image/picker.png"></image> -->
				</picker>
			</view>
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.quartel_account" placeholder="请选择林班名称" disabled></input>
			</view>
			<view class="group">
			    <view class="title">已预支额</view><text class="title_color">：</text>
				<view class="input" style="line-height: 80rpx;">
					{{forms.count_money}}(占总工程款{{forms.rate}}%)
				</view>
			</view>
			<view class="group">
			    <view class="title">预支金额</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.per_amount" @input="per_amount($event)" placeholder="请输入预支金额"></input>
			</view>
			<view class="group">
			    <view class="title">金额大写</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.capital" placeholder="大写金额" disabled></input>
			</view>
			<view class="group">
			    <view class="title">卡号</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.bank_card" placeholder="请输入卡号" disabled></input>
			</view>
			<view class="group">
			    <view class="title">开户行</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.bank" placeholder="请输入开户行" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate" :value=" forms.pre_time" @change="changeDate($event,'pre_time')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">是否转账</view><text class="title_color">：</text>
			   <radio-group @change="changeCheckType" class="check_box" style="width: 556rpx; margin-left: 30rpx;">
			   	<view v-for="(item,index) in type" :key="item.id" class="check">
			   		<radio class="checkClick round" :value="item.id" :checked="checkedArrType == item.id">{{item.name}}</radio>
			   	</view>
			   </radio-group>
			</view>
			<view class="group" v-if="checkedArrType == 1">
			    <view class="title">转账时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate":value=" forms.zz_time" @change="changeDate($event,'zz_time')" placeholder="请选择转账时间"/>
			</view>
			<view class="group">
			    <view class="title">操作员</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.sign" placeholder="请输入操作员" disabled></input>
			</view>
			<view class="group">
			    <view class="title">签名</view><text class="title_color">：</text>
			    <input class="input" v-model="signature" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="forms.note" placeholder="请输入备注"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="forms.uplode_img !== ''">
						<image class="image" :src="forms.uplode_img" @click="previewImage('uplode_img')"></image>
					</view>
					<view class="item" @click="uploadImage('uplode_img')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="good" v-if="count == 3">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择人员姓名"
					v-model="form_wei.pro_name" 
					@focus="search_site($event,'form_weipro_name')" 
					@input="search_site($event,'form_weipro_name')"
					@blur="search_blur($event,'form_weipro_name')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="form_weipro_nameShow">
					<view v-for="item in NameList" :key="item.id" class="group_down_list" :class="{group_down_index:form_wei.pro_id == item.peasant_id}">
						<view @click="toDetail(item,'form_weipro_name')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group" v-if="form_wei.pro_id !==''">
			    <view class="title">职业</view><text class="title_color">：</text>
				<picker class="picker" @change="changeName($event,'job2')" :value="jobIndex2" :range="jobList2" :range-key="'pro_name'">
				    <view v-if="jobIndex2 == -1" class="uni-input">请选择职业</view>
				    <view v-else class="uni-input">{{jobList2[jobIndex2].pro_name}}</view>
				    <!-- <image class="image" src="/static/image/picker.png"></image> -->
				</picker>
			</view>
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.quartel_account" placeholder="请选择林班名称" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate":value=" form_wei.add_time" @change="changeDate($event,'form_wei')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">项目</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.project" placeholder="请输入项目"></input>
			</view>
			<view class="group">
			    <view class="title">数量</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.unit" @input="unit_num($event)" placeholder="请输入数量"></input>
			</view>
			<view class="group">
			    <view class="title">单价</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.unit_price" @input="unit_price_num($event)"  placeholder="请输入单价"></input>
			</view>
			<view class="group">
			    <view class="title">总工程款</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.total_price" placeholder="请输入总工程款" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form_wei.note" placeholder="请输入备注"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="form_wei.img !== ''">
						<image class="image" :src="form_wei.img" @click="previewImage('img')"></image>
					</view>
					<view class="item" @click="uploadImage('img')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="good" v-if="count == 4">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择人员姓名"
					v-model="form_bu.pro_name" 
					@focus="search_site($event,'form_bupro_name')" 
					@input="search_site($event,'form_bupro_name')"
					@blur="search_blur($event,'form_bupro_name')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="form_bupro_nameShow">
					<view v-for="item in NameList" :key="item.id" class="group_down_list" :class="{group_down_index:form_bu.pro_id == item.peasant_id}">
						<view @click="toDetail(item,'form_bupro_name')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group" v-if="form_bu.pro_id !==''">
			    <view class="title">职业</view><text class="title_color">：</text>
				<picker class="picker" @change="changeName($event,'job3')" :value="jobIndex3" :range="jobList3" :range-key="'pro_name'">
				    <view v-if="jobIndex3 == -1" class="uni-input">请选择职业</view>
				    <view v-else class="uni-input">{{jobList3[jobIndex3].pro_name}}</view>
				    <!-- <image class="image" src="/static/image/picker.png"></image> -->
				</picker>
			</view>
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
			    <input class="input" v-model="form_bu.quartel_account" placeholder="请选择林班名称" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate":value=" form_bu.add_time" @change="changeDate($event,'form_bu')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">数量</view><text class="title_color">：</text>
			    <input class="input" v-model="form_bu.number" @input="number_num($event)" placeholder="请输入数量"></input>
			</view>
			<view class="group">
			    <view class="title">单价</view><text class="title_color">：</text>
			    <input class="input" v-model="form_bu.unit_price" @input="number_unit_price_num($event)"  placeholder="请输入单价"></input>
			</view>
			<view class="group">
			    <view class="title">合计</view><text class="title_color">：</text>
			    <input class="input" v-model="form_bu.total_price" placeholder="请输入合计" disabled></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form_bu.note" placeholder="请输入备注"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="form_bu.imgs !== ''">
						<image class="image" :src="form_bu.imgs" @click="previewImage('bu_imgs')"></image>
					</view>
					<view class="item" @click="uploadImage('bu_imgs')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="good" v-if="count == 5">
			<view class="group">
			    <view class="title">姓名</view><text class="title_color">：</text>
				<input
					class="input" 
					type="text" 
					placeholder="请选择人员姓名"
					v-model="form_kou.pro_name" 
					@focus="search_site($event,'form_koupro_name')" 
					@input="search_site($event,'form_koupro_name')"
					@blur="search_blur($event,'form_koupro_name')"
				/>
				<!--遍历数组，然后点击输入框，编号就会展示出来，也可进行搜索编号-->
				<view  class="group_down" v-if="form_koupro_nameShow">
					<view v-for="item in NameList" :key="item.id" class="group_down_list" :class="{group_down_index:form_kou.pro_id == item.peasant_id}">
						<view @click="toDetail(item,'form_koupro_name')" >{{item.nick_name}}</view>
					</view>
				</view>
			</view>
			<view class="group" v-if="form_kou.pro_id !==''">
			    <view class="title">职业</view><text class="title_color">：</text>
				<picker class="picker" @change="changeName($event,'job4')" :value="jobIndex4" :range="jobList4" :range-key="'pro_name'">
				    <view v-if="jobIndex4 == -1" class="uni-input">请选择职业</view>
				    <view v-else class="uni-input">{{jobList4[jobIndex4].pro_name}}</view>
				    <!-- <image class="image" src="/static/image/picker.png"></image> -->
				</picker>
			</view>
			<view class="group">
			    <view class="title">林班名称</view><text class="title_color">：</text>
			    <input class="input" v-model="form_kou.quartel_account" placeholder="请选择林班名称" disabled></input>
			</view>
			<view class="group">
			    <view class="title">时间</view><text class="title_color">：</text>
			    <uni-datetime-picker class="date-picker" ref="formDate":value=" form_kou.add_time" @change="changeDate($event,'form_kou')" placeholder="请选择时间"/>
			</view>
			<view class="group">
			    <view class="title">项目</view><text class="title_color">：</text>
			    <input class="input" v-model="form_kou.project" placeholder="请输入项目"></input>
			</view>
			<view class="group">
			    <view class="title">金额</view><text class="title_color">：</text>
			    <input class="input" v-model="form_kou.price" placeholder="请输入金额"></input>
			</view>
			<view class="group">
			    <view class="title">备注</view><text class="title_color">：</text>
			    <input class="input" v-model="form_kou.note" placeholder="请输入备注"></input>
			</view>
			<view class="group_image">
				<view class="title">上传：</view>
				<view class="remarkImage flex">
					<view class="item" v-if="form_kou.imgs !== ''">
						<image class="image" :src="form_kou.imgs" @click="previewImage('imgs')"></image>
					</view>
					<view class="item" @click="uploadImage('imgs')">
						<view class="item_image">
							<image class="image" :src="icon[25].icon"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="showZhong" class="modal" >
		    <view class="modal-main">
		        <view class="modal-title">
		            <view class="text">中转车</view>
		            <image class="close" :src="icon[30].icon" @click="closeModal('zhongzhuanche')">
		            </image>
		        </view>
		        <view class="modal-box">
					<view class="search flex">
					    <uni-easyinput class="input" v-model="textZhong" @input="searchtextZhong($event)" placeholder="请输入查询信息"></uni-easyinput>
						<view @click="openModal('zhong_che')" class="jia">+</view>
					</view>
		            <view class="content">
		               <view class="left">
		                    <view class="left_item" v-for="(item,index) in mingongList" :key = 'index' @click="Firstclick(item.id,'zhongzhuanche')"
							:class="{btna:count_I == item.id}">
								{{item.nick_name}}
							</view>
		                </view>
		                <view class="right">
		                    <view class="item_list" v-for="(item,index) in carList" :key="index" @click="selectGood(index,'zhongzhuanche')">
								<view class="icon_title">{{item}}</view>
								<image :src="icon[28].icon" class="image_jt"></image>
		                    </view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		<view v-show="showBig" class="modal">
		    <view class="modal-main">
		        <view class="modal-title">
		            <view class="text">大车</view>
		            <image class="close" :src="icon[30].icon" @click="closeModal('dache')">
		            </image>
		        </view>
		        <view class="modal-box">
					<view class="search flex">
					    <uni-easyinput class="input" v-model="textZhong" @input="searchtextZhong($event)" placeholder="请输入查询信息"></uni-easyinput>
						<view @click="openModal('da_che')" class="jia">+</view>
					</view>
		            <view class="content">
		               <view class="left">
		                    <view class="left_item" v-for="(item,index) in left_name" :key = 'index' @click="Firstclick(item.id,'dache')"
							:class="{btna:count_B == item.id}">
								{{item.nick_name}}
							</view>
		                </view>
		                <view class="right">
		                    <view class="item_list" v-for="(item,index) in big_car" :key="index" @click="selectGood(index,'dache')">
								<view class="icon_title">{{item}}</view>
								<image :src="icon[28].icon" class="image_jt"></image>
		                    </view>
		                </view>
		            </view>
		        </view>
		    </view>
		</view>
		<view v-show="zhong_che_show" class="modal_center">
			<view class="modal-main" style="height: 440rpx;" @click.stop>
				<view class="modal-title mb-20">
				    <view class="text">添加车牌号</view>
				    <image class="close" :src="icon[30].icon" @click="closeModal('zhong_che')">
				    </image>
				</view>
				<view class="good" style="margin-bottom: 50rpx;">
					<view class="group">
					    <view class="title">车辆</view><text class="title_color">：</text>
						 <input class="input" v-model="career_name" placeholder="请输入车辆类型" disabled></input>
					</view>
					<view class="group">
					    <view class="title">车牌号</view><text class="title_color">：</text>
					    <input class="input" v-model="car_number" placeholder="请输入车牌号"></input>
					</view>
				</view>
				<view class="container">
				    <button class="btn-submit" style="width: 100%;" @click="add_chepai">保存</button>
				</view>
			</view>
		</view>
		<view class="container fix-bottom flex">
			<button class="btn-submit mr-20 btn-col" @click="print">打印</button>
		    <button class="btn-submit" @click="add">保存</button>
		</view>
		<view class="making flex" @click="qingkong">
			<image :src="icon[23].icon"></image>
		    <view class="text">清空</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				forms:{
					quartel_account:'',//林班号
					bank:'',//银行
					bank_card:'',//卡号
					per_amount:'',//预支金额
					capital:'',//大写金额
					rate:'',//备注
					count_money:'',//已预支额
					sign:'',//操作员
					uplode_img:'',//图片
					pre_time:'',
					note:'',//备注
					zz_time:'',
					job_id:'',
					emplo_id:'',
					emplo_name:'',
				},
				data:'',
				type:[
					{
						id:1,
						name:"是",
					},
					{
						id:0,
						name:"否",
					},
				],
				type_shoudan:[
					{
						id:1,
						name:"是",
					},
					{
						id:0,
						name:"否",
					},
				],
				checkedShoudanType:0, //复选框选中的值，类型
				checkedArrType:0, //复选框选中的值，类型
				items:[
					"中转车",
					"大车",
					"预支",
					"维修",
					"补",
					"扣"
				],
				count:0,
				NameList:[],
				pIndex:-1,
				showZhong: false,
				carList:[],
				mingongList:[],
				count_I:'',
				
				showBig:false,
				big_car:[],
				left_name:[],
				count_B:'',
				car_da_name:'',
				car_da:'',
				
				car_zhong:'',
				car_zhong_name:'',
				form_zhong:{
					pounds_sn:'',
					car_number:'',
					car_emplo_id:'',
					car_imgs:[],
					cargo_weight:'',
					cargo_imgs:[],
					gros_weight:'',
					gros_imgs:[],
					k_moisture:'',
					add_time:'',
					operation_user_id:'',
					note:'',
					drivers_id:'',
					wj_name:'',
					chain_saw_id:'',
					yjs_name:'',
					product_name_id:'',
					pm_name:'',
					quartel_account:'',
					net_weight:'',
					extract_id:'',
					cargo_time:'',
					gros_time:''
				},
				unit:'T(吨)',
				textZhong:'',
				wucha:{
					average:0,
					errors:0
				},
				
				driversList:[],
				chain_sawList:[],
				product_nameList:[],
				
				
				form_kou:{
					pro_name:'',
					pro_id:'',
					quartel_account:'',
					project:'',
					price:'',
					add_time:'',
					imgs:'',
					note:'',
					job_id:'',
				},//扣款
				
				form_da:{
					pounds_sn:'',
					car_number:'',
					car_emplo_id:'',
					net_weight:'',
					start_time:'',
					single_time:'',
					quartel_account:'',
					quartel_account_id:'',
					site_user_ids:'',
					site_user_name:'',
					penalty:'',
					add_img:'',
					note:'',
					
				},
				site_userList:[],
				
				form_wei:{
					pro_name:'',
					pro_id:'',
					quartel_account:'',
					project:'',
					unit:'',
					unit_price:'',
					total_price:'',
					add_time:'',
					img:'',
					note:'',
					job_id:'',
				},
				
				form_bu:{
					pro_name:'',
					pro_id:'',
					quartel_account:'',
					number:'',
					unit_price:'',
					total_price:'',
					add_time:'',
					imgs:'',
					note:'',
					job_id:'',
				},
				icon:[],
				jobIndex1:-1,
				jobIndex2:-1,
				jobIndex3:-1,
				jobIndex4:-1,
				jobList1:[],
				jobList2:[],
				jobList3:[],
				jobList4:[],
				tiqu_form:{},
				quartel_account_list:[],
				zhong_che_show:false,
				car_number:'',
				career_name:'',
				k_moisture:'',
				driversShow:false,
				chain_sawShow:false,
				product_nameShow:false,
				quartel_accountShow:false,
				site_userShow:false,
				signature:'',
				formsEmplo_nameShow:false,
				form_weipro_nameShow:false,
				form_bupro_nameShow:false,
				form_koupro_nameShow:false
			}
		},
		onShow() {
			this.tiqu_form = this.common.get("tiqu")
			if(this.tiqu_form){
				// 油据手id
				this.form_zhong.chain_saw_id = this.tiqu_form.chain_saw_id
				this.form_zhong.yjs_name = this.tiqu_form.yjs_name
				// 挖机id
				this.form_zhong.drivers_id = this.tiqu_form.drivers_id
				this.form_zhong.wj_name = this.tiqu_form.wj_name
				// 中转车id
				this.form_zhong.car_emplo_id = this.tiqu_form.car_emplo_id
				// 中转车车牌
				this.form_zhong.car_number = this.tiqu_form.car_number
				// 中转车 车牌
				this.car_zhong = this.tiqu_form.zzc_name + '-' +this.tiqu_form.car_number
				// 皮重图片
				this.form_zhong.cargo_imgs = this.tiqu_form.cargo_imgs
				console.log('this.form_zhong.cargo_imgs',this.form_zhong.cargo_imgs)
				// 皮重
				this.form_zhong.cargo_weight = this.tiqu_form.cargo_weight
				// 皮重时间
				this.form_zhong.cargo_time = this.tiqu_form.cargo_time
				// 毛重图片
				this.form_zhong.gros_imgs = this.tiqu_form.gros_imgs
				console.log('this.form_zhong.gros_imgs',this.form_zhong.gros_imgs)
				// 毛重
				this.form_zhong.gros_weight = this.tiqu_form.gros_weight
				// 毛重时间
				this.form_zhong.gros_time = this.tiqu_form.gros_time
				// 计算净重
				if(this.form_zhong.k_moisture) {
					this.form_zhong.net_weight =(this.form_zhong.gros_weight - this.form_zhong.cargo_weight - this.form_zhong.k_moisture).toFixed(2)
				} else {
					this.form_zhong.net_weight =(this.form_zhong.gros_weight - this.form_zhong.cargo_weight).toFixed(2)
				}
				
				// 提取id
				this.form_zhong.extract_id = this.tiqu_form.id
				this.http({
				    url: this.api.Quartel_getTransitInfo,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
						car_emplo_id:this.form_zhong.car_emplo_id,
						car_number:this.form_zhong.car_number,
						cargo_weight:this.form_zhong.cargo_weight
				    },
				    success: res => {
						this.wucha.average= res.list.average
						this.wucha.errors = res.list.errors
				    }
				})
				
			}
		},
		onLoad() {
			this.icon = this.common.get("icon")
			this.data = this.common.get("kanfa")
			console.log('this.data',this.data)
			this.forms.quartel_account = this.data.quartel_name
			
			this.form_zhong.quartel_account = this.data.quartel_name
			
			this.form_kou.quartel_account = this.data.quartel_name
			
			
			this.form_wei.quartel_account = this.data.quartel_name
			
			this.form_bu.quartel_account = this.data.quartel_name
			
			// 顶部导航文字
			uni.setNavigationBarTitle({
				title: '砍伐-'+this.data.quartel_name
			});
			
			// 操作员
			this.http({
				url:this.api.My_Data,
				method:"POST",
				data:{
					uid: this.common.get("uid"),
					token:this.common.get("token"),
				},
				success:res =>{
					this.forms.sign = res.name
					this.form_zhong.name = res.name
					this.form_da.name = res.name
					this.form_zhong.operation_user_id = this.common.get("uid")
				}
			})
			this.zhongzhuanche()
			this.dache()
			
			// 获取中转车磅单号
			this.http({
			    url: this.api.Quartel_getPoundsn,
			    method: "POST",
			    data: {
			        uid: this.common.get("uid"),
					token:this.common.get("token"),
					quartel_id:this.data.id,
			    },
			    success: res => {
			        this.form_zhong.pounds_sn= res.list
			    }
			})
			let date = new Date().toISOString()
			this.form_zhong.add_time = this.dateFormat(date)
		},
		methods: {
			hideShow() {
				this.driversShow = false
				this.chain_sawShow = false
				this.product_nameShow = false
				this.quartel_accountShow = false
				this.site_userShow = false
				this.formsEmplo_nameShow = false
				this.form_weipro_nameShow = false
				this.form_bupro_nameShow = false
				this.form_koupro_nameShow = false
			},
			// 失去焦点
			search_blur(event,text) {
				setTimeout(() => {
					if(text == 'drivers_id') {
						// this.driversShow = false
						if(this.form_zhong.drivers_id=='') {
							this.form_zhong.wj_name = ''
						} else {
							this.driversList.map((item,index) => {
								if(this.form_zhong.drivers_id == item.peasant_id) {
									this.form_zhong.wj_name = item.nick_name
								}
							})
						}			
					} else if(text == 'chain_saw_id') {
						// this.chain_sawShow = false
						if(this.form_zhong.chain_saw_id=='') {
							this.form_zhong.yjs_name = ''
						} else {
							this.chain_sawList.map((item,index) => {
								if(this.form_zhong.chain_saw_id == item.peasant_id) {
									this.form_zhong.yjs_name = item.nick_name
								}
							})
						}			
					} else if(text == 'product_name_id') {
						// this.product_nameShow = false
						if(this.form_zhong.product_name_id=='') {
							this.form_zhong.pm_name = ''
						} else {
							this.product_nameList.map((item,index) => {
								if(this.form_zhong.product_name_id == item.id) {
									this.form_zhong.pm_name = item.name
								}
							})
						}			
					} else if(text == 'quartel_account'){
						// this.quartel_accountShow = false
						if(this.form_da.quartel_account_id=='') {
							this.form_da.quartel_account = ''
						} else {
							this.quartel_account_list.map((item,index) => {
								if(this.form_da.quartel_account_id == item.id) {
									this.form_da.quartel_account = item.quartel_account
								}
							})
						}
					} else if(text == 'site_user'){
						// this.site_userShow = false
						if(this.form_da.site_user_ids=='') {
							this.form_da.site_user_name = ''
						} else {
							this.site_userList.map((item,index) => {
								if(this.form_da.site_user_ids == item.peasant_id) {
									this.form_da.site_user_name = item.nick_name
								}
							})
						}
					} else if(text == 'formsEmplo_name'){
						// this.formsEmplo_nameShow = false
						if(this.forms.emplo_id=='') {
							this.forms.emplo_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.forms.emplo_id == item.peasant_id) {
									this.forms.emplo_name = item.nick_name
								}
							})
						}
					} else if(text == 'form_weipro_name'){
						// this.form_weipro_nameShow = false
						if(this.form_wei.pro_id=='') {
							this.form_wei.pro_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.form_wei.pro_id == item.peasant_id) {
									this.form_wei.pro_name = item.nick_name
								}
							})
						}
					} else if(text == 'form_bupro_name'){
						// this.form_bupro_nameShow = false
						if(this.form_bu.pro_id=='') {
							this.form_bu.pro_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.form_bu.pro_id == item.peasant_id) {
									this.form_bu.pro_name = item.nick_name
								}
							})
						}
					} else if(text == 'form_koupro_name'){
						// this.form_koupro_nameShow = false
						if(this.form_kou.pro_id=='') {
							this.form_kou.pro_name = ''
						} else {
							this.NameList.map((item,index) => {
								if(this.form_kou.pro_id == item.peasant_id) {
									this.form_kou.pro_name = item.nick_name
								}
							})
						}
					}
				},200)
				
			},
			// 下拉框文字选择
			toDetail(event,text) {
				console.log('toDetailevent',event)
				console.log('toDetailtext',text)
				if(text == 'drivers_id') {
					this.form_zhong.drivers_id = event.peasant_id
					this.form_zhong.wj_name = event.nick_name
					this.driversShow = false
				} else if(text == 'chain_saw_id') {
					this.form_zhong.chain_saw_id = event.peasant_id
					this.form_zhong.yjs_name = event.nick_name
					this.chain_sawShow = false
				} else if(text == 'product_name_id'){
					this.form_zhong.product_name_id = event.id
					this.form_zhong.pm_name = event.name
					this.product_nameShow = false
				} else if(text == 'quartel_account'){
					this.form_da.quartel_account_id = event.id
					this.form_da.quartel_account = event.quartel_account
					this.quartel_accountShow = false
				} else if(text == 'site_user'){
					this.form_da.site_user_ids = event.peasant_id
					this.form_da.site_user_name = event.nick_name
					this.site_userShow = false
				} else if(text == 'formsEmplo_name'){
					this.forms.emplo_id = event.peasant_id
					this.forms.emplo_name = event.nick_name
					this.forms.bank = event.bank
					this.forms.bank_card = event.bank_card
					this.jobIndex1 = -1
					if(this.forms.per_amount !=='') {
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:2,
								emplo_id:this.forms.emplo_id,
								quartel_id:this.data.id,
								count_money:this.forms.per_amount
						    },
						    success: res => {
						        this.forms.capital = res.dx_count_money
								this.forms.rate = res.rate
								this.forms.count_money = res.count_money
						    }
						})
					}
					this.http({
					    url: this.api.Quartel_emplo_job_list,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							emplo_id:this.forms.emplo_id,
					    },
					    success: res => {
					        this.jobList1 = res.list
					    }
					})
					this.formsEmplo_nameShow = false
				} else if(text == 'form_weipro_name'){
					this.form_wei.pro_id = event.peasant_id
					this.form_wei.pro_name = event.nick_name
					this.jobIndex2 = -1
					this.http({
					    url: this.api.Quartel_emplo_job_list,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							emplo_id:this.form_wei.pro_id,
					    },
					    success: res => {
					        this.jobList2 = res.list
					    }
					})
					this.form_weipro_nameShow = false
				} else if(text == 'form_bupro_name'){
					this.form_bu.pro_id = event.peasant_id
					this.form_bu.pro_name = event.nick_name
					this.jobIndex3 = -1
					this.http({
					    url: this.api.Quartel_emplo_job_list,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							emplo_id:this.form_bu.pro_id,
					    },
					    success: res => {
					        this.jobList3 = res.list
					    }
					})
					this.form_bupro_nameShow = false
				} else if(text == 'form_koupro_name'){
					this.form_kou.pro_id = event.peasant_id
					this.form_kou.pro_name = event.nick_name
					this.jobIndex4 = -1
					this.http({
					    url: this.api.Quartel_emplo_job_list,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							emplo_id:this.form_kou.pro_id,
					    },
					    success: res => {
					        this.jobList4 = res.list
					    }
					})
					this.form_koupro_nameShow = false
				}
				
			},
			//模糊查询
			search_site(event,text){
				let search_name = event.detail.value
				if(text == 'drivers_id') {
					this.driversShow = true
					// 挖机
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							search_name:search_name,
							type:3
						},
						success:res =>{
							this.driversList = res.list
						}
					})
				} else if(text == 'chain_saw_id'){
					this.chain_sawShow = true
					// 油锯手
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							search_name:search_name,
							type:1
						},
						success:res =>{
							this.chain_sawList = res.list
						}
					})
				} else if(text == 'product_name_id'){
					this.product_nameShow = true
					// 品名
					this.http({
					    url: this.api.getPositionList,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							contact_type:1,
							quartel_id:this.data.id,
							name:search_name
					    },
					    success: res => {
					        this.product_nameList = res.list
					    }
					})
				} else if(text == 'quartel_account'){
					this.quartel_accountShow = true
					// 大车林班号
					this.http({
					    url: this.api.Quartel_quartel_account,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							search_name:search_name
					    },
					    success: res => {
					        this.quartel_account_list = res.quartel_account
					    }
					})
				} else if(text == 'site_user'){
					this.site_userShow = true
					// 场地挖机
					this.http({
						url:this.api.getTruckList,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
							type:4,
							search_name:search_name,
						},
						success:res =>{
							this.site_userList = res.list
						}
					})
				} else if(text == 'formsEmplo_name'){
					this.formsEmplo_nameShow = true
					// 民工
					this.http({
					    url: this.api.Contact_profession,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				} else if(text == 'form_weipro_name'){
					this.form_weipro_nameShow = true
					// 民工
					this.http({
					    url: this.api.Contact_profession,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				} else if(text == 'form_bupro_name'){
					this.form_bupro_nameShow = true
					// 民工
					this.http({
					    url: this.api.Contact_profession,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				} else if(text == 'form_koupro_name'){
					this.form_koupro_nameShow = true
					// 民工
					this.http({
					    url: this.api.Contact_profession,
					    method: "POST",
					    data: {
					       uid: this.common.get("uid"),
					       token:this.common.get("token"),
					       quartel_id:this.data.id,
						   nick_name:search_name
					    },
					    success: res => {
					        this.NameList = res.list
					    }
					})
				}
			},
			// 大车车牌
			dache() {
				// 大车
				this.http({
					url:this.api.getTruckList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
						type:2
					},
					success:res =>{
						this.left_name = res.list
					}
				})
			},
			// 中转车车牌
			zhongzhuanche() {
				// 中转车
				this.http({
					url:this.api.getTruckList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
						type:5
					},
					success:res =>{
						this.mingongList = res.list
					}
				})
			},
			// 添加车牌
			add_chepai() {
				if(this.count == 0) {
					this.http({
					    url: this.api.Quartel_addCar,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							emplo_id:this.form_zhong.car_emplo_id,
							career_name:this.career_name,
							car_number:this.car_number
					    },
					    success: res => {
							this.zhong_che_show = false
							this.zhongzhuanche()
							setTimeout(() => {
								this.mingongList.map((item,index)=>{
									if(this.count_I == item.id) {
										this.carList = item.transfer_car
										this.form_zhong.car_emplo_id = item.peasant_id
										this.car_zhong_name = item.nick_name
									}
								})
							},300)
							this.career_name = ''
							this.car_number = ''
					    }
					})
				} else {
					this.http({
					    url: this.api.Quartel_addCar,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							emplo_id:this.form_da.car_emplo_id,
							career_name:this.career_name,
							car_number:this.car_number
					    },
					    success: res => {
							this.zhong_che_show = false
							this.dache()
							setTimeout(() => {
								this.left_name.map((item,index) => {
									if(this.count_B == item.id) {
										this.big_car = item.cart
										this.form_da.car_emplo_id = item.peasant_id
										this.car_da_name = item.nick_name
									}
								})
							},300)
							this.career_name = ''
							this.car_number = ''
					    }
					})
				}
				
			},
			dateFormat(time) {
			    let date = new Date(time);
			    let year = date.getFullYear();
			    // 在日期格式中，月份是从0开始的，因此要加0，使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
			    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
			    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
			    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			    // 拼接
			    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			    // return year + "-" + month + "-" + day;
			},
			// 提取
			tiqu() {
				uni.navigateTo({
					url:'/pagesA/pages/fell/extract/extract?data='+encodeURIComponent(JSON.stringify(this.data.id))
				})
			},
			// 打印点击
			print() {
				if(this.count == 2) {
					let forms = this.forms
					forms.text = 'kanfayuzhi'
					forms.labelNum = 1
					forms.the_name = this.forms.emplo_name
					if (this.checkedArrType == 1) {
						forms.transfer_text = '是'
					} else {
						forms.transfer_text = '否'
					}
					forms.the_zhiye = this.jobList1[this.jobIndex1].pro_name
					forms.title = '砍伐预支录入-'+this.data.quartel_name
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(forms))
					})
				} else if(this.count == 0) {
					let form_zhong = this.form_zhong
					form_zhong.text = 'luruzhongzhuanche'
					form_zhong.labelNum = 1
					form_zhong.title = '砍伐中转车录入-'+this.data.quartel_name
					form_zhong.car_zhong = this.car_zhong
					form_zhong.wucha = this.wucha
					form_zhong.quartel_account = this.data.quartel_name
					form_zhong.form_zhong_name = this.form_zhong.name
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form_zhong))
					})
				} else if (this.count == 1) {
					let form_da = this.form_da
					form_da.text = 'lurudache'
					form_da.labelNum = 1
					form_da.title = '砍伐大车录入-'+this.data.quartel_name
					form_da.car_da = this.car_da
					form_da.name = this.form_da.name
					if (this.checkedShoudanType == 1) {
						form_da.shoudan_text = '是'
					} else {
						form_da.shoudan_text = '否'
					}
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form_da))
					})
				} else if (this.count == 3) {
					let form_wei = this.form_wei
					form_wei.text = 'luruwei'
					form_wei.labelNum = 1
					form_wei.title = '砍伐维修录入-'+this.data.quartel_name
					form_wei.the_name = this.form_wei.pro_name
					form_wei.quartel_account = this.data.quartel_name
					form_wei.the_zhiye = this.jobList2[this.jobIndex2].pro_name
					uni.navigateTo({
						url:'/pagesA/print/print?data='+encodeURIComponent(JSON.stringify(form_wei))
					})
				} else if (this.count == 4) {
					let form_bu = this.form_bu
					form_bu.text = 'lurubu'
					form_bu.labelNum = 1
					form_bu.title = '砍伐补助-'+this.data.quartel_name
					form_bu.the_name = this.form_bu.pro_name
					form_bu.quartel_account = this.data.quartel_name
					form_bu.the_zhiye = this.jobList3[this.jobIndex3].pro_name
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form_bu))
					})
				} else if (this.count == 5) {
					let form_kou = this.form_kou
					form_kou.text = 'lurukou'
					form_kou.labelNum = 1
					form_kou.title = '砍伐扣款-'+this.data.quartel_name
					form_kou.the_name =  this.form_kou.pro_name
					form_kou.quartel_account = this.data.quartel_name
					form_kou.the_zhiye = this.jobList4[this.jobIndex4].pro_name
					uni.navigateTo({
						url:'/pagesA/pages/print/print?data='+encodeURIComponent(JSON.stringify(form_kou))
					})
				}
			},
			changeDate(eve,i) {
				if(i == 'add_time') {
					this.form_zhong.add_time = eve
				} else if(i =='start_time') {
					this.form_da.start_time = eve
				} else if(i == 'single_time') {
					this.form_da.single_time = eve
				} else if (i == 'zz_time') {
					this.forms.zz_time = eve
				} else if (i == 'pre_time') {
					this.forms.pre_time = eve
				} else if (i == 'form_wei') {
					this.form_wei.add_time = eve
				} else if (i =='form_bu') {
					this.form_bu.add_time = eve
				} else if (i == 'form_kou') {
					this.form_kou.add_time = eve 
				}
			},
			// 净重
			maozhong(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					this.form_zhong.gros_weight = a.replace(inputRule,'')
					this.form_zhong.net_weight =(this.form_zhong.gros_weight - this.form_zhong.cargo_weight - this.form_zhong.k_moisture).toFixed(2)
				})
			},
			// 扣水份
			koushui(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					this.form_zhong.k_moisture = a.replace(inputRule,'')
					this.form_zhong.net_weight = (this.form_zhong.gros_weight - this.form_zhong.cargo_weight - this.form_zhong.k_moisture).toFixed(2)
				})
			},
			// 皮重误差
			weight(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					this.form_zhong.cargo_weight = a.replace(inputRule,'')
					if(this.form_zhong.car_emplo_id !=='') {
						this.http({
						    url: this.api.Quartel_getTransitInfo,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								quartel_id:this.data.id,
								car_emplo_id:this.form_zhong.car_emplo_id,
								car_number:this.form_zhong.car_number,
								cargo_weight:this.form_zhong.cargo_weight
						    },
						    success: res => {
								this.wucha.average= res.list.average
								this.wucha.errors = res.list.errors
						    }
						})
					}
					this.form_zhong.net_weight = (this.form_zhong.gros_weight - this.form_zhong.cargo_weight - this.form_zhong.k_moisture).toFixed(2)
					
				})
				
			},
			// 维修数量
			unit_num(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.form_wei.unit = a.replace(inputRule,'')
				this.http({
				    url: this.api.quartel_price,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						num:this.form_wei.unit == ''?0:this.form_wei.unit,
						price:this.form_wei.unit_price==''?0:this.form_wei.unit_price
				    },
				    success: res => {
				        this.form_wei.total_price = res.scalar
				    }
				})
			},
			// 维修单价
			unit_price_num(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.form_wei.unit_price = a.replace(inputRule,'')
				this.http({
				    url: this.api.quartel_price,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						num:this.form_wei.unit == ''?0:this.form_wei.unit,
						price:this.form_wei.unit_price==''?0:this.form_wei.unit_price
				    },
				    success: res => {
				        this.form_wei.total_price = res.scalar
				    }
				})
			},
			// 补助数量
			number_num(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.form_bu.number = a.replace(inputRule,'')
				this.http({
				    url: this.api.quartel_price,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						num:this.form_bu.number == ''?0:this.form_bu.number,
						price:this.form_bu.unit_price==''?0:this.form_bu.unit_price
				    },
				    success: res => {
				        this.form_bu.total_price = res.scalar
				    }
				})
			},
			// 补助单价
			number_unit_price_num(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.form_bu.unit_price = a.replace(inputRule,'')
				this.http({
				    url: this.api.quartel_price,
				    method: "POST",
				    data: {
				        uid: this.common.get("uid"),
						token:this.common.get("token"),
						num:this.form_bu.number == ''?0:this.form_bu.number,
						price:this.form_bu.unit_price==''?0:this.form_bu.unit_price
				    },
				    success: res => {
				        this.form_bu.total_price = res.scalar
				    }
				})
			},
			// 预支金额输入
			per_amount(e) {
				const a = e.target.value
				const inputRule = /[^\d.]/g
				this.$nextTick(() =>{
					if(this.forms.emplo_id == '') {
						this.forms.per_amount = a.replace(inputRule,'')
					} else {
						this.forms.per_amount = a.replace(inputRule,'')
						this.http({
						    url: this.api.project_funds,
						    method: "POST",
						    data: {
						        uid: this.common.get("uid"),
								token:this.common.get("token"),
								type:2,
								emplo_id:this.forms.emplo_id,
								quartel_id:this.data.id,
								count_money:this.forms.per_amount
						    },
						    success: res => {
						        this.forms.capital = res.dx_count_money
								this.forms.rate = res.rate
								this.forms.count_money = res.count_money
						    }
						})
					}
					
				})
			},
			// 弹框搜索
			searchtextZhong(e) {
				this.textZhong = e
				this.http({
					url:this.api.getTruckList,
					method:"POST",
					data:{
						uid: this.common.get("uid"),
						token:this.common.get("token"),
						quartel_id:this.data.id,
						type:5,
						nick_name:this.textZhong,
					},
					success:res =>{
						this.mingongList = res.list
						this.count_I = ''
						this.carList =[]
					}
				})
			},
			// 一级分类点击
			Firstclick(eve,name) {
				if(name == 'zhongzhuanche') {
					this.count_I = eve
					this.mingongList.map((item,index)=>{
						if(this.count_I == item.id) {
							this.carList = item.transfer_car
							this.form_zhong.car_emplo_id = item.peasant_id
							this.car_zhong_name = item.nick_name
						}
					})
					
				} else if (name == 'dache') {
					this.count_B = eve
					this.left_name.map((item,index) => {
						if(this.count_B == item.id) {
							this.big_car = item.cart
							this.form_da.car_emplo_id = item.peasant_id
							this.car_da_name = item.nick_name
						}
					})
				}
			},
			// 二级选择点击
			selectGood(i,name) {
				if(name == 'zhongzhuanche') {
					this.form_zhong.car_number = this.carList[i]
					this.car_zhong = this.car_zhong_name + '-' +this.form_zhong.car_number
					this.showZhong = false
					this.form_zhong.extract_id = ''
					// 获取皮重  扣水份 挖机  油锯手
					this.http({
						url:this.api.Quartel_getInfo,
						method:"POST",
						data:{
							uid: this.common.get("uid"),
							token:this.common.get("token"),
							car_emplo_id:this.form_zhong.car_emplo_id,
						},
						success:res =>{
							if(res.list == '') {
								this.form_zhong.yjs_name = ''
								this.form_zhong.chain_saw_id = ''
								this.form_zhong.wj_name = ''
								this.form_zhong.drivers_id = ''
								this.form_zhong.cargo_time = ''
								this.form_zhong.gros_time = ''
							} else {
								this.form_zhong.chain_saw_id = res.list.chain_saw_id
								this.form_zhong.cargo_weight = res.list.cargo_weight
								this.form_zhong.k_moisture = res.list.k_moisture
								this.k_moisture = res.list.k_moisture
								this.http({
								    url: this.api.Quartel_getTransitInfo,
								    method: "POST",
								    data: {
								        uid: this.common.get("uid"),
										token:this.common.get("token"),
										quartel_id:this.data.id,
										car_emplo_id:this.form_zhong.car_emplo_id,
										car_number:this.form_zhong.car_number,
										cargo_weight:this.form_zhong.cargo_weight
								    },
								    success: res => {
										this.wucha.average= res.list.average
										this.wucha.errors = res.list.errors
										
								    }
								})
								this.chain_sawList.map((item,index) => {
									if(res.list.chain_saw_id == item.peasant_id) {
										this.chain_sawIndex = index
									}
								})
								this.form_zhong.chain_saw_id = res.list.chain_saw_id
								this.form_zhong.yjs_name = res.list.chain_saw_name
								this.form_zhong.drivers_id = res.list.drivers_id
								this.form_zhong.wj_name = res.list.drivers_name
								this.form_zhong.cargo_time = ''
								this.form_zhong.gros_time = ''
							}
						}
					})
				}else if(name == 'dache') {
					this.form_da.car_number = this.big_car[i]
					this.car_da = this.car_da_name + '-' +this.form_da.car_number
					this.showBig = false
					let date = new Date().toISOString()
					this.form_da.start_time = this.dateFormat(date)
				}
			},
			// 弹框
			openModal(name) {
				this.preventEvent = false
				if(name=='zhongzhuanche') {
					 this.showZhong = true
				} else if (name =='dache') {
					this.showBig = true
				} else if (name == 'zhong_che') {
					if(this.form_zhong.car_emplo_id) {
						this.zhong_che_show = true
						this.career_name = '中转车'
					} else {
						uni.showToast({
						    title: "请选择添加车辆的人员",
						    icon: "none"
						})
					}
				} else if(name == 'da_che') {
					if(this.form_da.car_emplo_id) {
						this.zhong_che_show = true
						this.career_name = '大车'
					} else {
						uni.showToast({
						    title: "请选择添加车辆的人员",
						    icon: "none"
						})
					}
				}
			},
			// 弹窗关闭按钮
			closeModal(name) {
				if(name == 'zhongzhuanche') {
					this.showZhong = false
				} else if (name =='dache') {
					this.showBig = false
				} else if (name == 'zhong_che') {
					this.zhong_che_show = false
					this.career_name = ''
					this.car_number = ''
				} else if(name == 'da_che') {
					this.zhong_che_show = false
					this.career_name = ''
					this.car_number = ''
				}
				this.preventEvent = false
			    
			},
			// 是否转账点击
			changeCheckType(e) {
				this.checkedArrType = e.detail.value;
				if(this.checkedArrType == 1) {
					let date = new Date().toISOString()
					this.forms.zz_time = this.dateFormat(date)
				} else {
					this.forms.zz_time = ''
				}
			},
			// 是否收单
			checkedType(e) {
				this.checkedShoudanType = e.detail.value;
				if(this.checkedShoudanType == 1) {
					let date = new Date().toISOString()
					this.form_da.single_time = this.dateFormat(date)
				} else {
					this.form_da.single_time = ''
				}
			},
			// 姓名点击
			changeName(e,name) {
				if (name == 'job1') {
					this.jobIndex1 = e.target.value
					this.forms.job_id =  this.jobList1[this.jobIndex1].id
				} else if (name == 'job2') {
					this.jobIndex2 = e.target.value
					this.form_wei.job_id = this.jobList2[this.jobIndex2].id
				} else if (name == 'job3') {
					this.jobIndex3 = e.target.value
					this.form_bu.job_id = this.jobList3[this.jobIndex3].id
				} else if (name == 'job4') {
					this.jobIndex4 = e.target.value
					this.form_kou.job_id = this.jobList4[this.jobIndex4].id
				}
			},
			
			qingkong() {
				let date = new Date().toISOString()
				if(this.count == 0) {
					this.car_zhong = ''
					this.form_zhong = {
						pounds_sn:'',
						name:this.form_zhong.name,
						car_number:'',
						car_emplo_id:'',
						car_imgs:[],
						cargo_weight:'',
						cargo_imgs:[],
						gros_weight:'',
						gros_imgs:[],
						k_moisture:'',
						add_time:'',
						operation_user_id:this.form_zhong.operation_user_id,
						note:'',
						drivers_id:'',
						wj_name:'',
						chain_saw_id:'',
						yjs_name:'',
						product_name_id:'',
						pm_name:'',
						quartel_account:'',
						net_weight:'',
						cargo_time:'',
						gros_time:''
					},
					this.count_I = ''
					this.carList =[]
					this.wucha = {
						average:0,
						errors:0
					}
					this.form_zhong.quartel_account = this.data.quartel_name
					// 获取中转车磅单号
					this.http({
					    url: this.api.Quartel_getPoundsn,
					    method: "POST",
					    data: {
					        uid: this.common.get("uid"),
							token:this.common.get("token"),
							quartel_id:this.data.id,
					    },
					    success: res => {
					        this.form_zhong.pounds_sn= res.list
					    }
					})
					
					this.form_zhong.add_time = this.dateFormat(date)
					this.form_zhong.extract_id = ''
				} else if(this.count == 1) {
					this.form_da = {
						pounds_sn:'',
						car_number:'',
						car_emplo_id:'',
						net_weight:'',
						start_time:'',
						single_time:'',
						quartel_account:'',
						quartel_account_id:'',
						site_user_ids:'',
						site_user_name:'',
						penalty:'',
						add_img:'',
						note:'',
						name:this.form_da.name
					},
					this.count_B = ''
					this.car_da = '',
					this.big_car = []
					
					this.checkedShoudanType = 0
					// this.form_da.quartel_account = this.data.quartel_account
					
				} else if(this.count == 2) {
					this.forms = {
						quartel_account:'',//林班号
						bank:'',//银行
						bank_card:'',//卡号
						per_amount:'',//预支金额
						capital:'',//大写金额
						rate:'',//备注
						count_money:'',//已预支额
						sign:this.forms.sign,//操作员
						uplode_img:'',//图片
						pre_time:'',
						zz_time:'',
						emplo_id:'',
						emplo_name:''
					}
					this.checkedArrType = 0
					this.jobIndex1 = -1
					this.forms.quartel_account = this.data.quartel_name
					this.forms.pre_time = this.dateFormat(date)
				} else if(this.count == 3) {
					this.form_wei = {
						pro_name:'',
						pro_id:'',
						quartel_account:'',
						project:'',
						unit:'',
						unit_price:'',
						total_price:'',
						add_time:'',
						img:'',
						note:'',
					},
					this.jobIndex2 = -1
					this.form_wei.quartel_account = this.data.quartel_name
					this.form_wei.add_time = this.dateFormat(date)
				} else if (this.count == 4) {
					this.form_bu = {
						pro_name:'',
						pro_id:'',
						quartel_account:'',
						number:'',
						unit_price:'',
						total_price:'',
						add_time:'',
						imgs:'',
						note:'',
					}
					this.jobIndex3 = -1
					this.form_kou.quartel_account = this.data.quartel_name
					this.form_bu.add_time = this.dateFormat(date)
				} else if (this.count == 5) {
					this.form_kou = {
						pro_name:'',
						pro_id:'',
						quartel_account:'',
						project:'',
						price:'',
						add_time:'',
						imgs:'',
						note:''
					},
					this.jobIndex4 = -1
					this.form_bu.quartel_account = this.data.quartel_name
					this.form_kou.add_time = this.dateFormat(date)
				}
			},
			// tab栏点击事件
			change(e) {
				this.count = e
				let date = new Date().toISOString()
				if(this.count == 0) {
					if(!this.form_zhong.add_time) {
						this.form_zhong.add_time = this.dateFormat(date)
					}
					this.career_name = '中转车'
				}else if (this.count == 1) {
					this.career_name = '大车'
				}else if(this.count == 2) {
					if(!this.forms.pre_time) {
						this.forms.pre_time = this.dateFormat(date)
					}
				} else if(this.count == 3) {
					if(!this.form_wei.add_time) {
						this.form_wei.add_time = this.dateFormat(date)
					}
				} else if(this.count == 4) {
					if(!this.form_bu.add_time) {
						this.form_bu.add_time = this.dateFormat(date)
					}
				} else if(this.count == 5) {
					if(!this.form_kou.add_time) {
						this.form_kou.add_time = this.dateFormat(date)
					}
				}
			},
			// 删除图片
			deleteImage(name,i) {
				if(name =='car_imgs') {
					this.form_zhong.car_imgs.splice(i, 1)
				} else if (name == 'cargo_imgs') {
					this.form_zhong.cargo_imgs.splice(i,1)
				} else if(name == 'gros_imgs') {
					this.form_zhong.gros_imgs.splice(i,1)
				}
			},
			// 添加图片
			uploadImage(name) {
				uni.chooseImage({
					count: 1,
					success: res => {
						let filePath = res.tempFilePaths[0];
						uni.uploadFile({
						    url: this.common.baseUrl + this.api.upload,
						    filePath: filePath,
						    name: "file",
						    success: res => {
						        let data = JSON.parse(res.data);
						        if (data.code == 1) {
									if(name =='car_imgs') {
										this.form_zhong.car_imgs.push(data.data.scalar)
									} else if(name =='uplode_img') {
										this.forms.uplode_img = data.data.scalar
									} else if (name =='cargo_imgs') {
										this.form_zhong.cargo_imgs.push(data.data.scalar)
									} else if (name =='gros_imgs') {
										this.form_zhong.gros_imgs.push(data.data.scalar)
									} else if (name =='imgs') {
										this.form_kou.imgs = data.data.scalar
									} else if (name =='add_img') {
										this.form_da.add_img = data.data.scalar
									} else if (name =='img') {
										this.form_wei.img = data.data.scalar
									} else if (name =='bu_imgs') {
										this.form_bu.imgs = data.data.scalar
									}
						            
								} else {
						            uni.showToast({
						                title: "上传失败",
						                icon: "none"
						            })
						        }
						    },
						    fail: res => {
						        uni.showToast({
						            title: "上传失败," + res,
						            icon: "none"
						        })
						    }
						})
					}
				})
			},
			// 图片放大
			previewImage(name,i) {
				let imgsArray = [];
				if(name == 'uplode_img') {
					imgsArray[0] = this.forms.uplode_img;
					wx.previewImage({
						current: 0,
						urls: imgsArray,
					})
				} else if(name == 'car_imgs') {
					wx.previewImage({
						current: this.form_zhong.car_imgs[i],
						urls: this.form_zhong.car_imgs
					})
				} else if (name =='cargo_imgs') {
					wx.previewImage({
						current: this.form_zhong.cargo_imgs[i],
						urls: this.form_zhong.cargo_imgs
					})
				} else if (name =='gros_imgs') {
					wx.previewImage({
						current: this.form_zhong.gros_imgs[i],
						urls: this.form_zhong.gros_imgs
					})
				} else if (name =='imgs') {
					imgsArray[0] = this.form_kou.imgs;
					wx.previewImage({
						current: 0,
						urls: imgsArray,
					})
				} else if (name =='add_img') {
					imgsArray[0] = this.form_da.add_img;
					wx.previewImage({
						current: 0,
						urls: imgsArray,
					})
				} else if (name =='img') {
					imgsArray[0] = this.form_wei.img
					wx.previewImage({
						current: 0,
						urls: imgsArray,
					})
				} else if (name =='bu_imgs') {
					imgsArray[0] = this.form_bu.imgs
					wx.previewImage({
						current: 0,
						urls: imgsArray,
					})
				}				
				
			},
			// 返回上一页
			previous() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.onLoad(); // 执行上一页的onLoad方法
				    }
				});
			},
			// 添加/编辑按钮点击
			add() {
				if (this.count == 2) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.afforestationAdds,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										type:2,
										quartel_id:this.data.id,
										is_transfer:this.checkedArrType,
										...this.forms
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else if(this.count == 5) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Quartel_punishment,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										...this.form_kou
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else if(this.count == 0) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Quartel_cutDown,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										...this.form_zhong,
										errors:this.wucha.errors,
										average:this.wucha.average
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else if(this.count == 1) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Quartel_carEntry,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										closed_order:this.checkedShoudanType,
										...this.form_da
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else if(this.count == 3) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Quartel_buildRoads,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										...this.form_wei
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				} else if(this.count == 4) {
					uni.showModal({
						title: '提示',
						content: '确定当前操作吗？',
						success: res => {
							if(res.confirm) { 
								this.http({
									url:this.api.Quartel_subsidies,
									method: "POST",
									data: {
										uid: this.common.get("uid"),
										token: this.common.get("token"),
										quartel_id:this.data.id,
										...this.form_bu
									},
									success: res => {
										uni.showToast({
											title:'操作成功',
											icon:'none',
											duration: 2000
										})
										// setTimeout(() =>{
										// 	this.previous()
										// },500) 
									}
								})
							}		
						},
						fail: () => {},
						complete: () => {}
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.making {
	position: fixed;
	top: 70%;
	right: 0;
	width: 120rpx;
	height: 60rpx;
	background: $color-f;
	border: 3rpx solid #4C9D57;
	border-radius: 200rpx 0px 0px 200rpx;
	z-index: 20;
	font-size: 24rpx;
	color: #4C9D57;
	image {
		width: 22rpx;
		height: 24rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
	}
}
.modal {
	margin-left: 0!important;
	.modal-main {
		.modal-box {
			.search {
				margin: 0!important;
				.input {
					width: 550rpx;
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
					.btna {
						text-align: center;
						padding: 0!important;
						color: #000000;
						border-bottom: 0!important;
					}
				}
			}
		}
	}
}
.uni-date-editor--x .uni-date__icon-clear {
	display: none;
}
.uni-date-x--border {
	border: none!important;
}
.uni-icons {
	display: none;
}
.uni-date {
	height: 80rpx;
}
	.tab {
		padding: 18.75rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
		font-size: 29.16rpx;
		color: $color-3;
		// box-shadow: 0px 0px 20.83rpx 0px rgba(0, 0, 0, 0.12);
		.tab_list {
			// width: 218.05rpx;
		}
	}
	.btna {
		padding: 18.75rpx 0;
		color: #4C9D57;
		border-bottom: 0.69rpx solid #4C9D57;
	}
.good {
	padding: 0 21.52rpx;
	.group {
		position: relative;
		.input {
			width: 556rpx;
			margin-left: 42rpx;
			min-height: 80rpx!important;
			color: #333333;
		}
		
		.date-picker {
			min-height: 80rpx!important;
		}
	}
}

.allcheck {
	width: 30%;
	margin-top: 36rpx;
}
.check_box {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	margin-bottom: 36.11rpx;
	.check {
		width: 30%;
		margin-top: 36rpx;
		margin-right: 6.94rpx;
		font-size: 29.16rpx;
		font-weight: 400;
		color: $color-6;
	}
}
.picker {
    width: 556rpx;
    height: 80rpx;
    border-radius: 8rpx;
    // border: 2rpx solid #E5E5E5;
    text-align: left;
    margin-left: 20rpx;
    padding: 0 20rpx;
    box-sizing: border-box;
	font-size: 28rpx;
}
.con {
	width: 516rpx;
	margin-left: 20rpx;
	border: 2rpx solid #E7E7E7;
	border-radius: 8rpx;
	padding: 20rpx;
}
.content {
	flex-direction: column;
	align-items : flex-start;
	.title {
		width: 180rpx;
		margin-top: 35.41rpx;
	}
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
