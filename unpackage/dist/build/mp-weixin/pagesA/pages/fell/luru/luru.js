require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/fell/luru/luru"],{"0e5d":function(t,i,e){"use strict";(function(t){e("a5e5");o(e("dc04"));var i=o(e("b14f"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("97ff")["createPage"])},"25d9":function(t,i,e){"use strict";(function(t){function e(t,i){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);i&&(o=o.filter((function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable}))),e.push.apply(e,o)}return e}function o(t){for(var i=1;i<arguments.length;i++){var o=null!=arguments[i]?arguments[i]:{};i%2?e(Object(o),!0).forEach((function(i){n(t,i,o[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(o,i))}))}return t}function n(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{forms:{quartel_account:"",bank:"",bank_card:"",per_amount:"",capital:"",rate:"",count_money:"",sign:"",uplode_img:"",pre_time:"",note:"",zz_time:"",job_id:"",emplo_id:"",emplo_name:""},data:"",type:[{id:1,name:"是"},{id:0,name:"否"}],type_shoudan:[{id:1,name:"是"},{id:0,name:"否"}],checkedShoudanType:0,checkedArrType:0,items:["中转车","大车","预支","维修","补","扣"],count:0,NameList:[],pIndex:-1,showZhong:!1,carList:[],mingongList:[],count_I:"",showBig:!1,big_car:[],left_name:[],count_B:"",car_da_name:"",car_da:"",car_zhong:"",car_zhong_name:"",form_zhong:{pounds_sn:"",car_number:"",car_emplo_id:"",car_imgs:[],cargo_weight:"",cargo_imgs:[],gros_weight:"",gros_imgs:[],k_moisture:"",add_time:"",operation_user_id:"",note:"",drivers_id:"",wj_name:"",chain_saw_id:"",yjs_name:"",product_name_id:"",pm_name:"",quartel_account:"",net_weight:"",extract_id:"",cargo_time:"",gros_time:""},unit:"T(吨)",textZhong:"",wucha:{average:0,errors:0},driversList:[],chain_sawList:[],product_nameList:[],form_kou:{pro_name:"",pro_id:"",quartel_account:"",project:"",price:"",add_time:"",imgs:"",note:"",job_id:""},form_da:{pounds_sn:"",car_number:"",car_emplo_id:"",net_weight:"",start_time:"",single_time:"",quartel_account:"",quartel_account_id:"",site_user_ids:"",site_user_name:"",penalty:"",add_img:"",note:""},site_userList:[],form_wei:{pro_name:"",pro_id:"",quartel_account:"",project:"",unit:"",unit_price:"",total_price:"",add_time:"",img:"",note:"",job_id:""},form_bu:{pro_name:"",pro_id:"",quartel_account:"",number:"",unit_price:"",total_price:"",add_time:"",imgs:"",note:"",job_id:""},icon:[],jobIndex1:-1,jobIndex2:-1,jobIndex3:-1,jobIndex4:-1,jobList1:[],jobList2:[],jobList3:[],jobList4:[],tiqu_form:{},quartel_account_list:[],zhong_che_show:!1,car_number:"",career_name:"",k_moisture:"",driversShow:!1,chain_sawShow:!1,product_nameShow:!1,quartel_accountShow:!1,site_userShow:!1,signature:"",formsEmplo_nameShow:!1,form_weipro_nameShow:!1,form_bupro_nameShow:!1,form_koupro_nameShow:!1}},onShow:function(){var t=this;this.tiqu_form=this.common.get("tiqu"),this.tiqu_form&&(this.form_zhong.chain_saw_id=this.tiqu_form.chain_saw_id,this.form_zhong.yjs_name=this.tiqu_form.yjs_name,this.form_zhong.drivers_id=this.tiqu_form.drivers_id,this.form_zhong.wj_name=this.tiqu_form.wj_name,this.form_zhong.car_emplo_id=this.tiqu_form.car_emplo_id,this.form_zhong.car_number=this.tiqu_form.car_number,this.car_zhong=this.tiqu_form.zzc_name+"-"+this.tiqu_form.car_number,this.form_zhong.cargo_imgs=this.tiqu_form.cargo_imgs,console.log("this.form_zhong.cargo_imgs",this.form_zhong.cargo_imgs),this.form_zhong.cargo_weight=this.tiqu_form.cargo_weight,this.form_zhong.cargo_time=this.tiqu_form.cargo_time,this.form_zhong.gros_imgs=this.tiqu_form.gros_imgs,console.log("this.form_zhong.gros_imgs",this.form_zhong.gros_imgs),this.form_zhong.gros_weight=this.tiqu_form.gros_weight,this.form_zhong.gros_time=this.tiqu_form.gros_time,this.form_zhong.k_moisture?this.form_zhong.net_weight=(this.form_zhong.gros_weight-this.form_zhong.cargo_weight-this.form_zhong.k_moisture).toFixed(2):this.form_zhong.net_weight=(this.form_zhong.gros_weight-this.form_zhong.cargo_weight).toFixed(2),this.form_zhong.extract_id=this.tiqu_form.id,this.http({url:this.api.Quartel_getTransitInfo,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,car_emplo_id:this.form_zhong.car_emplo_id,car_number:this.form_zhong.car_number,cargo_weight:this.form_zhong.cargo_weight},success:function(i){t.wucha.average=i.list.average,t.wucha.errors=i.list.errors}}))},onLoad:function(){var i=this;this.icon=this.common.get("icon"),this.data=this.common.get("kanfa"),console.log("this.data",this.data),this.forms.quartel_account=this.data.quartel_name,this.form_zhong.quartel_account=this.data.quartel_name,this.form_kou.quartel_account=this.data.quartel_name,this.form_wei.quartel_account=this.data.quartel_name,this.form_bu.quartel_account=this.data.quartel_name,t.setNavigationBarTitle({title:"砍伐-"+this.data.quartel_name}),this.http({url:this.api.My_Data,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token")},success:function(t){i.forms.sign=t.name,i.form_zhong.name=t.name,i.form_da.name=t.name,i.form_zhong.operation_user_id=i.common.get("uid")}}),this.zhongzhuanche(),this.dache(),this.http({url:this.api.Quartel_getPoundsn,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id},success:function(t){i.form_zhong.pounds_sn=t.list}});var e=(new Date).toISOString();this.form_zhong.add_time=this.dateFormat(e)},methods:{hideShow:function(){this.driversShow=!1,this.chain_sawShow=!1,this.product_nameShow=!1,this.quartel_accountShow=!1,this.site_userShow=!1,this.formsEmplo_nameShow=!1,this.form_weipro_nameShow=!1,this.form_bupro_nameShow=!1,this.form_koupro_nameShow=!1},search_blur:function(t,i){var e=this;setTimeout((function(){"drivers_id"==i?""==e.form_zhong.drivers_id?e.form_zhong.wj_name="":e.driversList.map((function(t,i){e.form_zhong.drivers_id==t.peasant_id&&(e.form_zhong.wj_name=t.nick_name)})):"chain_saw_id"==i?""==e.form_zhong.chain_saw_id?e.form_zhong.yjs_name="":e.chain_sawList.map((function(t,i){e.form_zhong.chain_saw_id==t.peasant_id&&(e.form_zhong.yjs_name=t.nick_name)})):"product_name_id"==i?""==e.form_zhong.product_name_id?e.form_zhong.pm_name="":e.product_nameList.map((function(t,i){e.form_zhong.product_name_id==t.id&&(e.form_zhong.pm_name=t.name)})):"quartel_account"==i?""==e.form_da.quartel_account_id?e.form_da.quartel_account="":e.quartel_account_list.map((function(t,i){e.form_da.quartel_account_id==t.id&&(e.form_da.quartel_account=t.quartel_account)})):"site_user"==i?""==e.form_da.site_user_ids?e.form_da.site_user_name="":e.site_userList.map((function(t,i){e.form_da.site_user_ids==t.peasant_id&&(e.form_da.site_user_name=t.nick_name)})):"formsEmplo_name"==i?""==e.forms.emplo_id?e.forms.emplo_name="":e.NameList.map((function(t,i){e.forms.emplo_id==t.peasant_id&&(e.forms.emplo_name=t.nick_name)})):"form_weipro_name"==i?""==e.form_wei.pro_id?e.form_wei.pro_name="":e.NameList.map((function(t,i){e.form_wei.pro_id==t.peasant_id&&(e.form_wei.pro_name=t.nick_name)})):"form_bupro_name"==i?""==e.form_bu.pro_id?e.form_bu.pro_name="":e.NameList.map((function(t,i){e.form_bu.pro_id==t.peasant_id&&(e.form_bu.pro_name=t.nick_name)})):"form_koupro_name"==i&&(""==e.form_kou.pro_id?e.form_kou.pro_name="":e.NameList.map((function(t,i){e.form_kou.pro_id==t.peasant_id&&(e.form_kou.pro_name=t.nick_name)})))}),200)},toDetail:function(t,i){var e=this;console.log("toDetailevent",t),console.log("toDetailtext",i),"drivers_id"==i?(this.form_zhong.drivers_id=t.peasant_id,this.form_zhong.wj_name=t.nick_name,this.driversShow=!1):"chain_saw_id"==i?(this.form_zhong.chain_saw_id=t.peasant_id,this.form_zhong.yjs_name=t.nick_name,this.chain_sawShow=!1):"product_name_id"==i?(this.form_zhong.product_name_id=t.id,this.form_zhong.pm_name=t.name,this.product_nameShow=!1):"quartel_account"==i?(this.form_da.quartel_account_id=t.id,this.form_da.quartel_account=t.quartel_account,this.quartel_accountShow=!1):"site_user"==i?(this.form_da.site_user_ids=t.peasant_id,this.form_da.site_user_name=t.nick_name,this.site_userShow=!1):"formsEmplo_name"==i?(this.forms.emplo_id=t.peasant_id,this.forms.emplo_name=t.nick_name,this.forms.bank=t.bank,this.forms.bank_card=t.bank_card,this.jobIndex1=-1,""!==this.forms.per_amount&&this.http({url:this.api.project_funds,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),type:2,emplo_id:this.forms.emplo_id,quartel_id:this.data.id,count_money:this.forms.per_amount},success:function(t){e.forms.capital=t.dx_count_money,e.forms.rate=t.rate,e.forms.count_money=t.count_money}}),this.http({url:this.api.Quartel_emplo_job_list,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,emplo_id:this.forms.emplo_id},success:function(t){e.jobList1=t.list}}),this.formsEmplo_nameShow=!1):"form_weipro_name"==i?(this.form_wei.pro_id=t.peasant_id,this.form_wei.pro_name=t.nick_name,this.jobIndex2=-1,this.http({url:this.api.Quartel_emplo_job_list,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,emplo_id:this.form_wei.pro_id},success:function(t){e.jobList2=t.list}}),this.form_weipro_nameShow=!1):"form_bupro_name"==i?(this.form_bu.pro_id=t.peasant_id,this.form_bu.pro_name=t.nick_name,this.jobIndex3=-1,this.http({url:this.api.Quartel_emplo_job_list,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,emplo_id:this.form_bu.pro_id},success:function(t){e.jobList3=t.list}}),this.form_bupro_nameShow=!1):"form_koupro_name"==i&&(this.form_kou.pro_id=t.peasant_id,this.form_kou.pro_name=t.nick_name,this.jobIndex4=-1,this.http({url:this.api.Quartel_emplo_job_list,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,emplo_id:this.form_kou.pro_id},success:function(t){e.jobList4=t.list}}),this.form_koupro_nameShow=!1)},search_site:function(t,i){var e=this,o=t.detail.value;"drivers_id"==i?(this.driversShow=!0,this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,search_name:o,type:3},success:function(t){e.driversList=t.list}})):"chain_saw_id"==i?(this.chain_sawShow=!0,this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,search_name:o,type:1},success:function(t){e.chain_sawList=t.list}})):"product_name_id"==i?(this.product_nameShow=!0,this.http({url:this.api.getPositionList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),contact_type:1,quartel_id:this.data.id,name:o},success:function(t){e.product_nameList=t.list}})):"quartel_account"==i?(this.quartel_accountShow=!0,this.http({url:this.api.Quartel_quartel_account,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,search_name:o},success:function(t){e.quartel_account_list=t.quartel_account}})):"site_user"==i?(this.site_userShow=!0,this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,type:4,search_name:o},success:function(t){e.site_userList=t.list}})):"formsEmplo_name"==i?(this.formsEmplo_nameShow=!0,this.http({url:this.api.Contact_profession,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,nick_name:o},success:function(t){e.NameList=t.list}})):"form_weipro_name"==i?(this.form_weipro_nameShow=!0,this.http({url:this.api.Contact_profession,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,nick_name:o},success:function(t){e.NameList=t.list}})):"form_bupro_name"==i?(this.form_bupro_nameShow=!0,this.http({url:this.api.Contact_profession,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,nick_name:o},success:function(t){e.NameList=t.list}})):"form_koupro_name"==i&&(this.form_koupro_nameShow=!0,this.http({url:this.api.Contact_profession,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,nick_name:o},success:function(t){e.NameList=t.list}}))},dache:function(){var t=this;this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,type:2},success:function(i){t.left_name=i.list}})},zhongzhuanche:function(){var t=this;this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,type:5},success:function(i){t.mingongList=i.list}})},add_chepai:function(){var t=this;0==this.count?this.http({url:this.api.Quartel_addCar,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_id:this.form_zhong.car_emplo_id,career_name:this.career_name,car_number:this.car_number},success:function(i){t.zhong_che_show=!1,t.zhongzhuanche(),setTimeout((function(){t.mingongList.map((function(i,e){t.count_I==i.id&&(t.carList=i.transfer_car,t.form_zhong.car_emplo_id=i.peasant_id,t.car_zhong_name=i.nick_name)}))}),300),t.career_name="",t.car_number=""}}):this.http({url:this.api.Quartel_addCar,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_id:this.form_da.car_emplo_id,career_name:this.career_name,car_number:this.car_number},success:function(i){t.zhong_che_show=!1,t.dache(),setTimeout((function(){t.left_name.map((function(i,e){t.count_B==i.id&&(t.big_car=i.cart,t.form_da.car_emplo_id=i.peasant_id,t.car_da_name=i.nick_name)}))}),300),t.career_name="",t.car_number=""}})},dateFormat:function(t){var i=new Date(t),e=i.getFullYear(),o=i.getMonth()+1<10?"0"+(i.getMonth()+1):i.getMonth()+1,n=i.getDate()<10?"0"+i.getDate():i.getDate(),a=i.getHours()<10?"0"+i.getHours():i.getHours(),r=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes(),s=i.getSeconds()<10?"0"+i.getSeconds():i.getSeconds();return e+"-"+o+"-"+n+" "+a+":"+r+":"+s},tiqu:function(){t.navigateTo({url:"/pagesA/pages/fell/extract/extract?data="+encodeURIComponent(JSON.stringify(this.data.id))})},print:function(){if(2==this.count){var i=this.forms;i.text="kanfayuzhi",i.labelNum=1,i.the_name=this.forms.emplo_name,1==this.checkedArrType?i.transfer_text="是":i.transfer_text="否",i.the_zhiye=this.jobList1[this.jobIndex1].pro_name,i.title="砍伐预支录入-"+this.data.quartel_name,t.navigateTo({url:"/pagesA/pages/print/print?data="+encodeURIComponent(JSON.stringify(i))})}else if(0==this.count){var e=this.form_zhong;e.text="luruzhongzhuanche",e.labelNum=1,e.title="砍伐中转车录入-"+this.data.quartel_name,e.car_zhong=this.car_zhong,e.wucha=this.wucha,e.quartel_account=this.data.quartel_name,e.form_zhong_name=this.form_zhong.name,t.navigateTo({url:"/pagesA/pages/print/print?data="+encodeURIComponent(JSON.stringify(e))})}else if(1==this.count){var o=this.form_da;o.text="lurudache",o.labelNum=1,o.title="砍伐大车录入-"+this.data.quartel_name,o.car_da=this.car_da,o.name=this.form_da.name,1==this.checkedShoudanType?o.shoudan_text="是":o.shoudan_text="否",t.navigateTo({url:"/pagesA/pages/print/print?data="+encodeURIComponent(JSON.stringify(o))})}else if(3==this.count){var n=this.form_wei;n.text="luruwei",n.labelNum=1,n.title="砍伐维修录入-"+this.data.quartel_name,n.the_name=this.form_wei.pro_name,n.quartel_account=this.data.quartel_name,n.the_zhiye=this.jobList2[this.jobIndex2].pro_name,t.navigateTo({url:"/pagesA/print/print?data="+encodeURIComponent(JSON.stringify(n))})}else if(4==this.count){var a=this.form_bu;a.text="lurubu",a.labelNum=1,a.title="砍伐补助-"+this.data.quartel_name,a.the_name=this.form_bu.pro_name,a.quartel_account=this.data.quartel_name,a.the_zhiye=this.jobList3[this.jobIndex3].pro_name,t.navigateTo({url:"/pagesA/pages/print/print?data="+encodeURIComponent(JSON.stringify(a))})}else if(5==this.count){var r=this.form_kou;r.text="lurukou",r.labelNum=1,r.title="砍伐扣款-"+this.data.quartel_name,r.the_name=this.form_kou.pro_name,r.quartel_account=this.data.quartel_name,r.the_zhiye=this.jobList4[this.jobIndex4].pro_name,t.navigateTo({url:"/pagesA/pages/print/print?data="+encodeURIComponent(JSON.stringify(r))})}},changeDate:function(t,i){"add_time"==i?this.form_zhong.add_time=t:"start_time"==i?this.form_da.start_time=t:"single_time"==i?this.form_da.single_time=t:"zz_time"==i?this.forms.zz_time=t:"pre_time"==i?this.forms.pre_time=t:"form_wei"==i?this.form_wei.add_time=t:"form_bu"==i?this.form_bu.add_time=t:"form_kou"==i&&(this.form_kou.add_time=t)},maozhong:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.$nextTick((function(){i.form_zhong.gros_weight=e.replace(o,""),i.form_zhong.net_weight=(i.form_zhong.gros_weight-i.form_zhong.cargo_weight-i.form_zhong.k_moisture).toFixed(2)}))},koushui:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.$nextTick((function(){i.form_zhong.k_moisture=e.replace(o,""),i.form_zhong.net_weight=(i.form_zhong.gros_weight-i.form_zhong.cargo_weight-i.form_zhong.k_moisture).toFixed(2)}))},weight:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.$nextTick((function(){i.form_zhong.cargo_weight=e.replace(o,""),""!==i.form_zhong.car_emplo_id&&i.http({url:i.api.Quartel_getTransitInfo,method:"POST",data:{uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id,car_emplo_id:i.form_zhong.car_emplo_id,car_number:i.form_zhong.car_number,cargo_weight:i.form_zhong.cargo_weight},success:function(t){i.wucha.average=t.list.average,i.wucha.errors=t.list.errors}}),i.form_zhong.net_weight=(i.form_zhong.gros_weight-i.form_zhong.cargo_weight-i.form_zhong.k_moisture).toFixed(2)}))},unit_num:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.form_wei.unit=e.replace(o,""),this.http({url:this.api.quartel_price,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),num:""==this.form_wei.unit?0:this.form_wei.unit,price:""==this.form_wei.unit_price?0:this.form_wei.unit_price},success:function(t){i.form_wei.total_price=t.scalar}})},unit_price_num:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.form_wei.unit_price=e.replace(o,""),this.http({url:this.api.quartel_price,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),num:""==this.form_wei.unit?0:this.form_wei.unit,price:""==this.form_wei.unit_price?0:this.form_wei.unit_price},success:function(t){i.form_wei.total_price=t.scalar}})},number_num:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.form_bu.number=e.replace(o,""),this.http({url:this.api.quartel_price,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),num:""==this.form_bu.number?0:this.form_bu.number,price:""==this.form_bu.unit_price?0:this.form_bu.unit_price},success:function(t){i.form_bu.total_price=t.scalar}})},number_unit_price_num:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.form_bu.unit_price=e.replace(o,""),this.http({url:this.api.quartel_price,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),num:""==this.form_bu.number?0:this.form_bu.number,price:""==this.form_bu.unit_price?0:this.form_bu.unit_price},success:function(t){i.form_bu.total_price=t.scalar}})},per_amount:function(t){var i=this,e=t.target.value,o=/[^\d.]/g;this.$nextTick((function(){""==i.forms.emplo_id?i.forms.per_amount=e.replace(o,""):(i.forms.per_amount=e.replace(o,""),i.http({url:i.api.project_funds,method:"POST",data:{uid:i.common.get("uid"),token:i.common.get("token"),type:2,emplo_id:i.forms.emplo_id,quartel_id:i.data.id,count_money:i.forms.per_amount},success:function(t){i.forms.capital=t.dx_count_money,i.forms.rate=t.rate,i.forms.count_money=t.count_money}}))}))},searchtextZhong:function(t){var i=this;this.textZhong=t,this.http({url:this.api.getTruckList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,type:5,nick_name:this.textZhong},success:function(t){i.mingongList=t.list,i.count_I="",i.carList=[]}})},Firstclick:function(t,i){var e=this;"zhongzhuanche"==i?(this.count_I=t,this.mingongList.map((function(t,i){e.count_I==t.id&&(e.carList=t.transfer_car,e.form_zhong.car_emplo_id=t.peasant_id,e.car_zhong_name=t.nick_name)}))):"dache"==i&&(this.count_B=t,this.left_name.map((function(t,i){e.count_B==t.id&&(e.big_car=t.cart,e.form_da.car_emplo_id=t.peasant_id,e.car_da_name=t.nick_name)})))},selectGood:function(t,i){var e=this;if("zhongzhuanche"==i)this.form_zhong.car_number=this.carList[t],this.car_zhong=this.car_zhong_name+"-"+this.form_zhong.car_number,this.showZhong=!1,this.form_zhong.extract_id="",this.http({url:this.api.Quartel_getInfo,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),car_emplo_id:this.form_zhong.car_emplo_id},success:function(t){""==t.list?(e.form_zhong.yjs_name="",e.form_zhong.chain_saw_id="",e.form_zhong.wj_name="",e.form_zhong.drivers_id="",e.form_zhong.cargo_time="",e.form_zhong.gros_time=""):(e.form_zhong.chain_saw_id=t.list.chain_saw_id,e.form_zhong.cargo_weight=t.list.cargo_weight,e.form_zhong.k_moisture=t.list.k_moisture,e.k_moisture=t.list.k_moisture,e.http({url:e.api.Quartel_getTransitInfo,method:"POST",data:{uid:e.common.get("uid"),token:e.common.get("token"),quartel_id:e.data.id,car_emplo_id:e.form_zhong.car_emplo_id,car_number:e.form_zhong.car_number,cargo_weight:e.form_zhong.cargo_weight},success:function(t){e.wucha.average=t.list.average,e.wucha.errors=t.list.errors}}),e.chain_sawList.map((function(i,o){t.list.chain_saw_id==i.peasant_id&&(e.chain_sawIndex=o)})),e.form_zhong.chain_saw_id=t.list.chain_saw_id,e.form_zhong.yjs_name=t.list.chain_saw_name,e.form_zhong.drivers_id=t.list.drivers_id,e.form_zhong.wj_name=t.list.drivers_name,e.form_zhong.cargo_time="",e.form_zhong.gros_time="")}});else if("dache"==i){this.form_da.car_number=this.big_car[t],this.car_da=this.car_da_name+"-"+this.form_da.car_number,this.showBig=!1;var o=(new Date).toISOString();this.form_da.start_time=this.dateFormat(o)}},openModal:function(i){this.preventEvent=!1,"zhongzhuanche"==i?this.showZhong=!0:"dache"==i?this.showBig=!0:"zhong_che"==i?this.form_zhong.car_emplo_id?(this.zhong_che_show=!0,this.career_name="中转车"):t.showToast({title:"请选择添加车辆的人员",icon:"none"}):"da_che"==i&&(this.form_da.car_emplo_id?(this.zhong_che_show=!0,this.career_name="大车"):t.showToast({title:"请选择添加车辆的人员",icon:"none"}))},closeModal:function(t){"zhongzhuanche"==t?this.showZhong=!1:"dache"==t?this.showBig=!1:("zhong_che"==t||"da_che"==t)&&(this.zhong_che_show=!1,this.career_name="",this.car_number=""),this.preventEvent=!1},changeCheckType:function(t){if(this.checkedArrType=t.detail.value,1==this.checkedArrType){var i=(new Date).toISOString();this.forms.zz_time=this.dateFormat(i)}else this.forms.zz_time=""},checkedType:function(t){if(this.checkedShoudanType=t.detail.value,1==this.checkedShoudanType){var i=(new Date).toISOString();this.form_da.single_time=this.dateFormat(i)}else this.form_da.single_time=""},changeName:function(t,i){"job1"==i?(this.jobIndex1=t.target.value,this.forms.job_id=this.jobList1[this.jobIndex1].id):"job2"==i?(this.jobIndex2=t.target.value,this.form_wei.job_id=this.jobList2[this.jobIndex2].id):"job3"==i?(this.jobIndex3=t.target.value,this.form_bu.job_id=this.jobList3[this.jobIndex3].id):"job4"==i&&(this.jobIndex4=t.target.value,this.form_kou.job_id=this.jobList4[this.jobIndex4].id)},qingkong:function(){var t=this,i=(new Date).toISOString();0==this.count?(this.car_zhong="",this.form_zhong={pounds_sn:"",name:this.form_zhong.name,car_number:"",car_emplo_id:"",car_imgs:[],cargo_weight:"",cargo_imgs:[],gros_weight:"",gros_imgs:[],k_moisture:"",add_time:"",operation_user_id:this.form_zhong.operation_user_id,note:"",drivers_id:"",wj_name:"",chain_saw_id:"",yjs_name:"",product_name_id:"",pm_name:"",quartel_account:"",net_weight:"",cargo_time:"",gros_time:""},this.count_I="",this.wucha={average:0,errors:0},this.form_zhong.quartel_account=this.data.quartel_name,this.http({url:this.api.Quartel_getPoundsn,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id},success:function(i){t.form_zhong.pounds_sn=i.list}}),this.form_zhong.add_time=this.dateFormat(i),this.form_zhong.extract_id=""):1==this.count?(this.form_da={pounds_sn:"",car_number:"",car_emplo_id:"",net_weight:"",start_time:"",single_time:"",quartel_account:"",quartel_account_id:"",site_user_ids:"",site_user_name:"",penalty:"",add_img:"",note:"",name:this.form_da.name},this.count_B="",this.car_da="",this.checkedShoudanType=0):2==this.count?(this.forms={quartel_account:"",bank:"",bank_card:"",per_amount:"",capital:"",rate:"",count_money:"",sign:this.forms.sign,uplode_img:"",pre_time:"",zz_time:"",emplo_id:"",emplo_name:""},this.checkedArrType=0,this.jobIndex1=-1,this.forms.quartel_account=this.data.quartel_name,this.forms.pre_time=this.dateFormat(i)):3==this.count?(this.form_wei={pro_name:"",pro_id:"",quartel_account:"",project:"",unit:"",unit_price:"",total_price:"",add_time:"",img:"",note:""},this.jobIndex2=-1,this.form_wei.quartel_account=this.data.quartel_name,this.form_wei.add_time=this.dateFormat(i)):4==this.count?(this.form_bu={pro_name:"",pro_id:"",quartel_account:"",number:"",unit_price:"",total_price:"",add_time:"",imgs:"",note:""},this.jobIndex3=-1,this.form_kou.quartel_account=this.data.quartel_name,this.form_bu.add_time=this.dateFormat(i)):5==this.count&&(this.form_kou={pro_name:"",pro_id:"",quartel_account:"",project:"",price:"",add_time:"",imgs:"",note:""},this.jobIndex4=-1,this.form_bu.quartel_account=this.data.quartel_name,this.form_kou.add_time=this.dateFormat(i))},change:function(t){this.count=t;var i=(new Date).toISOString();0==this.count?(this.form_zhong.add_time||(this.form_zhong.add_time=this.dateFormat(i)),this.career_name="中转车"):1==this.count?this.career_name="大车":2==this.count?this.forms.pre_time||(this.forms.pre_time=this.dateFormat(i)):3==this.count?this.form_wei.add_time||(this.form_wei.add_time=this.dateFormat(i)):4==this.count?this.form_bu.add_time||(this.form_bu.add_time=this.dateFormat(i)):5==this.count&&(this.form_kou.add_time||(this.form_kou.add_time=this.dateFormat(i)))},deleteImage:function(t,i){"car_imgs"==t?this.form_zhong.car_imgs.splice(i,1):"cargo_imgs"==t?this.form_zhong.cargo_imgs.splice(i,1):"gros_imgs"==t&&this.form_zhong.gros_imgs.splice(i,1)},uploadImage:function(i){var e=this;t.chooseImage({count:1,success:function(o){var n=o.tempFilePaths[0];t.uploadFile({url:e.common.baseUrl+e.api.upload,filePath:n,name:"file",success:function(o){var n=JSON.parse(o.data);1==n.code?"car_imgs"==i?e.form_zhong.car_imgs.push(n.data.scalar):"uplode_img"==i?e.forms.uplode_img=n.data.scalar:"cargo_imgs"==i?e.form_zhong.cargo_imgs.push(n.data.scalar):"gros_imgs"==i?e.form_zhong.gros_imgs.push(n.data.scalar):"imgs"==i?e.form_kou.imgs=n.data.scalar:"add_img"==i?e.form_da.add_img=n.data.scalar:"img"==i?e.form_wei.img=n.data.scalar:"bu_imgs"==i&&(e.form_bu.imgs=n.data.scalar):t.showToast({title:"上传失败",icon:"none"})},fail:function(i){t.showToast({title:"上传失败,"+i,icon:"none"})}})}})},previewImage:function(t,i){var e=[];"uplode_img"==t?(e[0]=this.forms.uplode_img,wx.previewImage({current:0,urls:e})):"car_imgs"==t?wx.previewImage({current:this.form_zhong.car_imgs[i],urls:this.form_zhong.car_imgs}):"cargo_imgs"==t?wx.previewImage({current:this.form_zhong.cargo_imgs[i],urls:this.form_zhong.cargo_imgs}):"gros_imgs"==t?wx.previewImage({current:this.form_zhong.gros_imgs[i],urls:this.form_zhong.gros_imgs}):"imgs"==t?(e[0]=this.form_kou.imgs,wx.previewImage({current:0,urls:e})):"add_img"==t?(e[0]=this.form_da.add_img,wx.previewImage({current:0,urls:e})):"img"==t?(e[0]=this.form_wei.img,wx.previewImage({current:0,urls:e})):"bu_imgs"==t&&(e[0]=this.form_bu.imgs,wx.previewImage({current:0,urls:e}))},previous:function(){var i=getCurrentPages(),e=i[i.length-2];t.navigateBack({success:function(){e.onLoad()}})},add:function(){var i=this;2==this.count?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.afforestationAdds,method:"POST",data:o({uid:i.common.get("uid"),token:i.common.get("token"),type:2,quartel_id:i.data.id,is_transfer:i.checkedArrType},i.forms),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}}):5==this.count?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.Quartel_punishment,method:"POST",data:o({uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id},i.form_kou),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}}):0==this.count?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.Quartel_cutDown,method:"POST",data:o(o({uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id},i.form_zhong),{},{errors:i.wucha.errors,average:i.wucha.average}),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}}):1==this.count?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.Quartel_carEntry,method:"POST",data:o({uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id,closed_order:i.checkedShoudanType},i.form_da),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}}):3==this.count?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.Quartel_buildRoads,method:"POST",data:o({uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id},i.form_wei),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}}):4==this.count&&t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&i.http({url:i.api.Quartel_subsidies,method:"POST",data:o({uid:i.common.get("uid"),token:i.common.get("token"),quartel_id:i.data.id},i.form_bu),success:function(i){t.showToast({title:"操作成功",icon:"none",duration:2e3})}})},fail:function(){},complete:function(){}})}}};i.default=a}).call(this,e("d5d0")["default"])},"42ba":function(t,i,e){"use strict";var o=e("f5af"),n=e.n(o);n.a},7395:function(t,i,e){"use strict";e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return o}));var o={uniDatetimePicker:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(e.bind(null,"6032"))},uniEasyinput:function(){return e.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(e.bind(null,"9281"))}},n=function(){var t=this,i=t.$createElement;t._self._c},a=[]},b14f:function(t,i,e){"use strict";e.r(i);var o=e("7395"),n=e("e547");for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);e("42ba");var r,s=e("f0c5"),_=Object(s["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);i["default"]=_.exports},e547:function(t,i,e){"use strict";e.r(i);var o=e("25d9"),n=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);i["default"]=n.a},f5af:function(t,i,e){}},[["0e5d","common/runtime","common/vendor"]]]);