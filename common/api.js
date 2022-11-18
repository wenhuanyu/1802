/**
 * API接口统一管理
 */
export default {
    /* 基础 */
    banner: "Warehouse/get_rotation",
    // login: "Login/indexs",//登录接口
	Login_newLogin:'Login/newLogin',//登录
    // bind: "Login/bind",//绑定账号
	log_out:'index/log_out',//退出登录
	indexAuth:'index/indexAuth',//授权接口
	jobData:'My_data/jobData',//职业列表（工种）
    userData: "Users/userData",
    merchant: "Index/merchant_info",
    editMerchant: "Index/eidt_merchant",
    upload: "api.Plugs/upload",//上传图片视频
    iAccess: "Index/index",
	Contact_icon:'Contact/icon',//图标
	Quartel_city:'Quartel/city',//省市区获取
	
	/* 我的 */
	My_Data:"My_Data/infoData",//首页个人资料
	change_password:"My_Data/changePassword",//修改密码
	userInfo:'My_data/userInfo',//基本信息
	addUserInfo:'My_data/addUserInfo',//编辑基本信息
	Quartel_addCar:'Quartel/addCar',//添加车牌
	
	
	/*消息*/
	getLogList:"index/getLogList",//消息列表
	setLogReaded:'index/setLogReaded',//全部已读接口
	index_detail:'index/details',//消息详情
	
	
	
	/*工作台*/
	safetyList:"index/safetyList",//安全培训列表
	safetyDetails:'index/safetyDetails',//安全培训详情
	
	
	// 造林
	Epiboly_delete_epiboly:'Epiboly/delete_epiboly',//删除外包订单
	QuartelIndex:'Quartel/index',//造林列表
	addQuartel:'Quartel/addQuartel',//添加造林
	afforestationEdits:'Quartel/afforestationEdits',//编辑造林
	addQuarset_time:'Quartel/set_time',//时间
	blockAuth:'index/blockAuth',//造林详情
	calculateAdds:'Quartel/calculateAdds',//工程款录入
	afforestationAdds:'Quartel/afforestationAdds',//造林预支录入
	project_funds:'Quartel/project_funds',//获取工程款
	queryLists:'Quartel/queryLists',//查询列表
	quartel_time:'Quartel/quartel_time',//开完工时间
	quartel_savetime:'Quartel/quartel_savetime',//设置完工时间
	afforestationDetails:'Quartel/afforestationDetails',//林班预支详情
	afforestationEdit:'Quartel/afforestationEdit',//林班预支编辑
	afforestationDels:'Quartel/afforestationDels',//林班预支删除
	calculateDetails:'Quartel/calculateDetails',//工程款详情
	calculateDels:'/Quartel/calculateDels',//工程款删除
	calculateEdit:'Quartel/calculateEdit',//工程款编辑
	Settlement:'Quartel/Settlement',//结算列表
	afforestationSettlement:'Quartel/afforestationSettlement',//结算总统计详情
	Quartel_SettlementDetail:'Quartel/SettlementDetail',//结算详情预支
	quartel_epiboly:'Epiboly/quartel_epiboly',//造林砍伐外包订单
	Epiboly_quartel_list:'Epiboly/quartel_list',//造林砍伐外包大林班选择列表
	Epiboly_add_epiboly:'Epiboly/add_epiboly',//关联外包订单林班
	
	
	// 砍伐
	Quartel_quartelDetails:'Quartel/quartelDetails',//林班详情
	Quartel_quartel_account:'Quartel/quartel_account',//砍伐林班号
	contact_edit:'contact/edit',//修改设备
	getTruckList:'Contact/getTruckList',//获取中转车/大车/油锯手/挖机/场地挖机
	Quartel_punishment:'Quartel/punishment',//砍伐扣款录入
	Quartel_punishmentEdit:'Quartel/punishmentEdit',//扣款编辑
	Quartel_punishmentDels:'Quartel/punishmentDels',//扣款删除
	Contact_profession:'Contact/profession',//获取职业人员
	Quartel_getPoundsn:'Quartel/getPoundsn',//获取中转车磅单号
	Quartel_cutDown:'Quartel/cutDown',//砍伐中转车录入
	Quartel_cutDownEdit:'Quartel/cutDownEdit',//编辑中转车
	Quartel_cutDels:'Quartel/cutDels',//删除中转车
	Quartel_getCarPoundsn:'Quartel/getCarPoundsn',//获取大车磅单号
	Quartel_carEntry:'Quartel/carEntry',//砍伐林班大车录入
	Quartel_carEdit:'Quartel/carEdit',//编辑大车
	Quartel_carDels:'Quartel/carDels',//删除大车
	Quartel_buildRoads:'Quartel/buildRoads',//砍伐维修录入
	Quartel_buildEdit:'Quartel/buildEdit',//维修编辑
	Quartel_buildDels:'Quartel/buildDels',//维修删除
	Quartel_subsidies:'Quartel/subsidies',//砍伐林班补助录入
	Quartel_subsidiesEdit:'Quartel/subsidiesEdit',//补助编辑
	Quartel_subsidiesDels:'Quartel/subsidiesDels',//补助删除
	Quartel_getInfo:'Quartel/getInfo',//获取上次中转车的油锯手和挖机
	Quartel_getTransitInfo:'Quartel/getTransitInfo',//获取皮重误差
	Quartel_cutDownList:'Quartel/cutDownList',//砍伐林班中转车查询
	Quartel_bigCartList:'Quartel/bigCartList',//砍伐林班大车查询
	Quartel_maintenanceList:'Quartel/maintenanceList',//获取林班维修查询
	Quartel_subsidiesList:'Quartel/subsidiesList',//获取林班补助查询
	Quartel_deductList:'Quartel/deductList',//获取林班扣款查询
	Quartel_newsDownSettlement:'Quartel/newsDownSettlement',//砍伐结算列表
	Quartel_job_list:'Quartel/job_list',//砍伐的职业列表
	Quartel_emplo_job_list:'Quartel/emplo_job_list',//砍伐林班人员的职业列表
	Quartel_settlementOne:'Quartel/settlementOne',//砍伐结算详情
	Quartel_settlementTwo:'Quartel/settlementTwo',//砍伐结算的第二步
	contact_check_personnel:'contact/check_personnel',//审核人员接口
	Quartel_expense_icon:'Quartel/expense_icon',//审核图片列表
	Quartel_come_car:'Quartel/come_car',//大车弹窗页面
	quartel_price:'quartel/price',//计算相乘
	
	
	// 报销
	Quartel_quartelList:'Quartel/quartelList',//报销林班
	Quartel_prepaidList:'Quartel/prepaidList',//预支审核
	Quartel_prepaidDetails:'Quartel/prepaidDetails',//预支审核详情
	Quartel_checkPrepaid:'Quartel/checkPrepaid',//预支审核点击
	Apply_checkList:'Apply/checkList',//报销审核
	Apply_checkDetails:'Apply/checkDetails',//报销审核详情
	Apply_checkApply:'Apply/checkApply',//报销审核点击
	Apply_delete_apply:'Apply/delete_apply',//报销删除
	
	
	// 结算汇总
	Quartel_collect_close:'Quartel/collect_close',//结算汇总列表 造林
	Quartel_cut_close:'Quartel/cut_close',//砍伐汇总
	mydata_jobData:'My_data/newJobData',//职业列表
	newQuartelList:'Quartel/newQuartelList',//无分页林班
	
	
	// 民工管理
	peasantList:'Contact/peasantList',//造林
	pounds_employees:'contact/pounds_employees',//民工列表
	

	// 品名管理
	getPositionList:'contact/getPositionList',//品名管理列表
	addContact:'contact/addContact',//添加
	contact_dels:'contact/dels',//删除
	contact_edit:'contact/edit',//编辑
	
	
	// 报销
	Apply_applyList:'Apply/applyList',//报销列表
	Apply_order_num:'Apply/order_num',//报销获取单号
	Apply_expense_type:'Apply/expense_type',//分类
	Apply_apply_affair:'Apply/apply_affair',//事务申请
	Apply_apply_standby:'Apply/apply_standby',//备用金申请
	Apply_apply_cost:'Apply/apply_cost',//费用报销申请
	Apply_applyDetail:'Apply/applyDetail',//报销详情
	
	// 工资
	My_Data_wage:'My_Data/wage',//我的工资列表
	My_Data_wageDetail:'My_Data/wageDetail',//工资详情
	My_Data_withhold:'My_Data/withhold',//扣款详情
	
	// 外包订单
	Epiboly_index:'Epiboly/index',//外包订单图标
	Epiboly_quartel:'Epiboly/quartel',//大林班列表
	Epiboly_add:'Epiboly/add',//添加大林班
	Epiboly_edits:'Epiboly/edits',//编辑大林班
	Epiboly_delete:'Epiboly/delete',//删除大林班
	Epiboly_processList:'Epiboly/processList',//外包工序列表
	Epiboly_add_process:'Epiboly/add_process',//添加工序
	Epiboly_edit_process:'Epiboly/edit_process',//编辑工序
	Epiboly_delete_process:'Epiboly/delete_process',//删除工序
	Epiboly_small_quartel:'Epiboly/small_quartel',//大林班列表
	Epiboly_add_small_quartel:'Epiboly/add_small_quartel',//小林班添加
	Epiboly_new_processList:'Epiboly/new_processList',//工序列表  无分页
	Epiboly_epiboly_data:'Epiboly/epiboly_data',//添加外包订单
	Epiboly_epiboly_data_show:'Epiboly/epiboly_data_show',//显示外包订单
	Epiboly_add_heck_report:'Epiboly/add_heck_report',//添加验收报告
	Epiboly_show_check_report:'Epiboly/show_check_report',//显示验收报告
	Epiboly_add_postpone_report:'Epiboly/add_postpone_report',//添加延期报告
	Epiboly_show_postpone_report:'Epiboly/show_postpone_report',//显示延期报告
	Epiboly_show_invoice:'Epiboly/show_invoice',//显示发票
	Epiboly_add_invoice:'Epiboly/add_invoice',//添加发票
	
	
	// 预支申请
	Quartel_prepaid:'Quartel/prepaid',//预支申请
	my_data_quartelList:'my_data/quartelList',//民工的林班
	Quartel_prepaidMingList:'Quartel/prepaidMingList',//预支申请列表
	my_data_emplo_id:'my_data/emplo_id',//获取民工id
	
	// 工程款
	peasants_project_funds:'quartel/peasants_project_funds',//工程款 造林
	peasants_project_funds_fell:'quartel/peasants_project_funds_fell',//工程款 砍伐
	quartel_submit:'quartel/submit',//操作
	
	
	// 发货单
	delivery_bill:'My_Data/delivery_bill',//发货单
	My_data_delivery_list:'My_data/delivery_list',//发货单列表
	My_data_delivery_delete:'My_data/delivery_delete',//删除送货单
	Quartel_extract:'Quartel/extract',//提取列表
	
	
	// 林班
	Contact_quartelList:'Contact/quartelList',//管理员林班接口
	
	
	// 汇总
	Summary_cutDownList:'Summary/cutDownList',//中转车
	Summary_bigCartList:'Summary/bigCartList',//大车
	Summary_maintenanceList:'Summary/maintenanceList',//维修
	Summary_subsidiesList:'Summary/subsidiesList',//补
	Summary_deductList:'Summary/deductList',//扣
	Summary_queryLists:'Summary/queryLists',//预支  结算
	Summary_product:'Summary/product',//全部品名
	Summary_working:'Summary/working',//全部工序
	Summary_employees:'Summary/employees',//全部民工
	Summary_employeesNew:'Summary/employeesNew',//全部民工  油锯手  挖机
}
