require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/complete/complete/complete"],{6177:function(t,i,e){"use strict";e.r(i);var n=e("be00"),o=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=o.a},"6f95":function(t,i,e){"use strict";var n=e("ad99"),o=e.n(n);o.a},ad99:function(t,i,e){},b01d:function(t,i,e){"use strict";(function(t){e("a5e5");n(e("dc04"));var i=n(e("e742"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("97ff")["createPage"])},be00:function(t,i,e){"use strict";(function(t){function n(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/head-nav")]).then(function(){return resolve(e("5c6a"))}.bind(null,e)).catch(e.oe)},s={components:{"head-nav":o},data:function(){var t;return t={titlecount:1,textTest:"造林汇总",items_afforestation:["预支","工程款计算"],count_afforestation:0,show:!1,list:[],data:"",search_name:"",page:1,form:{CountNum:"",CountPrice:"",dayCountPrice:"",dayCountNum:""},list_gongxu:[],start_time:"",end_time:"",pro_name:"",pro_id:"",icon:[],pro_nameShow:!1,items:["中转车","大车","预支","维修","补","扣"],count:0},n(t,"show",!1),n(t,"list",[]),n(t,"zhong",{dayCountTonnage:0,dayCountNum:0,CountNum:0,CountTonnage:0}),n(t,"big",{remaining:0,complete:0,CountTarget:0,CountNum:0,CountTonnage:0,dayCountTonnage:0,dayCountNum:0}),n(t,"yuzhi",{CountNum:0,CountPrice:0,dayCountPrice:0,dayCountNum:0}),n(t,"weixiu",{total_price:0,total_num:0}),n(t,"bu",{total_price:0,total_num:0}),n(t,"kou",{total_price:0,total_num:0}),n(t,"showZhong",!1),n(t,"textZhong",""),n(t,"mingongList",[]),n(t,"count_I",""),n(t,"car_emplo",""),n(t,"car_emplo_id",""),n(t,"car_number",""),n(t,"left_name",[]),n(t,"count_B",""),n(t,"product_nameList",[]),n(t,"product_name_id",""),n(t,"pm_name",""),n(t,"driversList",[]),n(t,"drivers_id",""),n(t,"wj_name",""),n(t,"chain_sawList",[]),n(t,"chain_saw_id",""),n(t,"yjs_name",""),n(t,"site_userList",[]),n(t,"site_user_ids",""),n(t,"site_user_name",""),n(t,"start_time",""),n(t,"end_time",""),n(t,"icon",[]),n(t,"type_shoudan",[{id:1,name:"是",checked:!1},{id:0,name:"否",checked:!1}]),n(t,"checkedShoudanType",""),n(t,"search_name",""),n(t,"NameList",[]),n(t,"quartel_account",""),n(t,"project",""),n(t,"job_list",[]),n(t,"profession",""),n(t,"jobIndex",-1),n(t,"dachexiangqingList",[]),n(t,"note",""),n(t,"product_nameShow",!1),n(t,"quartel_id",""),n(t,"ContactList",[]),n(t,"ContactShow",!1),n(t,"Contact_name",""),n(t,"pageNum",1),n(t,"data_count",""),n(t,"driversShow",!1),n(t,"chain_sawShow",!1),n(t,"site_userShow",!1),t},onLoad:function(){var t=this;this.icon=this.common.get("icon"),this.page=1,this.http({url:this.api.jobData,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token")},success:function(i){t.job_list=i.list}}),this.http({url:this.api.Summary_employees,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),length:10,page:this.pageNum-1},success:function(i){t.mingongList=i.list,t.data_count=i.total}})},onShow:function(){this.page=1,this.listInterface()},onReachBottom:function(){var i=this;1==this.titlecount?0==this.count_afforestation?this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,type:1,page:this.page,start_time:this.start_time,end_time:this.end_time,quartel_id:this.quartel_id},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.form.CountNum=e.CountNum,i.form.CountPrice=e.CountPrice,i.form.dayCountPrice=e.dayCountPrice,i.form.dayCountNum=e.dayCountNum)}}):this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,start_time:this.start_time,end_time:this.end_time,pro_id:this.pro_id,type:2,page:this.page,quartel_id:this.quartel_id},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.form.CountNum=e.CountNum,i.form.CountPrice=e.CountPrice,i.form.dayCountPrice=e.dayCountPrice,i.form.dayCountNum=e.dayCountNum)}}):2==this.titlecount&&(2==this.count?this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,type:3,page:this.page,start_time:this.start_time,end_time:this.end_time,quartel_id:this.quartel_id,profession:this.profession},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.yuzhi.CountNum=e.CountNum,i.yuzhi.CountPrice=e.CountPrice,i.yuzhi.dayCountPrice=e.dayCountPrice,i.yuzhi.dayCountNum=e.dayCountNum)}}):0==this.count?this.http({url:this.api.Summary_cutDownList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.quartel_id,start_time:this.start_time,end_time:this.end_time,drivers_id:this.wj_name,chain_saw_id:this.yjs_name,product_name_id:this.product_name_id,car_emplo_id:this.car_emplo,car_number:this.car_number,pounds_sn:this.search_name,note:this.note,profession:this.profession},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.zhong.dayCountTonnage=e.dayCountTonnage,i.zhong.dayCountNum=e.dayCountNum,i.zhong.CountNum=e.CountNum,i.zhong.CountTonnage=e.CountTonnage)}}):1==this.count?this.http({url:this.api.Summary_bigCartList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.quartel_id,start_time:this.start_time,end_time:this.end_time,car_emplo_id:this.car_emplo,closed_order:this.checkedShoudanType,car_number:this.car_number,pounds_sn:this.search_name,note:this.note,profession:this.profession,site_user_ids:this.site_user_name},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.big.remaining=e.remaining,i.big.complete=e.complete,i.big.CountTarget=e.CountTarget,i.big.CountNum=e.CountNum,i.big.CountTonnage=e.CountTonnage,i.big.dayCountTonnage=e.dayCountTonnage,i.big.dayCountNum=e.dayCountNum)}}):3==this.count?this.http({url:this.api.Summary_maintenanceList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,project:this.project,profession:this.profession},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.weixiu.total_price=e.total_price,i.weixiu.total_num=e.total_num)}}):4==this.count?this.http({url:this.api.Summary_subsidiesList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,profession:this.profession},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.bu.total_price=e.total_price,i.bu.total_num=e.total_num)}}):5==this.count&&this.http({url:this.api.Summary_deductList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,project:this.project,profession:this.profession},success:function(e){i.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(e.list),i.kou.total_price=e.total_price,i.kou.total_num=e.total_num)}}))},methods:{textCountClick:function(t){console.log("param",t),this.titlecount=t,1==this.titlecount?this.textTest="造林汇总":2==this.titlecount&&(this.textTest="砍伐汇总"),this.page=1,this.chongzhi(),this.listInterface()},hideShow:function(){this.driversShow=!1,this.chain_sawShow=!1,this.product_nameShow=!1,this.pro_nameShow=!1,this.ContactShow=!1,this.site_userShow=!1},closeText:function(){this.driversShow=!1,this.chain_sawShow=!1,this.product_nameShow=!1,this.pro_nameShow=!1,this.ContactShow=!1,this.site_userShow=!1},search_blur:function(t,i){var e=this;setTimeout((function(){"product_name_id"==i?""==e.product_name_id?e.pm_name="":e.product_nameList.map((function(t,i){e.product_name_id==t.id&&(e.pm_name=t.name)})):"pro_name"==i?""==e.pro_id?e.pro_name="":e.list_gongxu.map((function(t,i){e.pro_id==t.id&&(e.pro_name=t.pro_name)})):"Contact_id"==i?""==e.quartel_id?e.Contact_name="":e.ContactList.map((function(t,i){e.quartel_id==t.id&&(e.Contact_name=t.quartel_name)})):"drivers_id"==i?""==e.drivers_id?e.wj_name="":e.driversList.map((function(t,i){e.drivers_id==t.id&&(e.wj_name=t.user_name)})):"chain_saw_id"==i?""==e.chain_saw_id?e.yjs_name="":e.chain_sawList.map((function(t,i){e.chain_saw_id==t.id&&(e.yjs_name=t.user_name)})):"site_user"==i&&(""==e.site_user_ids?e.site_user_name="":e.site_userList.map((function(t,i){e.site_user_ids==t.id&&(e.site_user_name=t.user_name)})))}),200)},toDetail:function(t,i){"product_name_id"==i?(this.product_name_id=t.id,this.pm_name=t.name,this.product_nameShow=!1):"pro_name"==i?(this.pro_id=t.id,this.pro_name=t.pro_name,this.pro_nameShow=!1):"Contact_id"==i?(this.Contact_name=t.quartel_name,this.quartel_id=t.id,this.ContactShow=!1):"drivers_id"==i?(this.drivers_id=t.id,this.wj_name=t.user_name,this.driversShow=!1):"chain_saw_id"==i?(this.chain_saw_id=t.id,this.yjs_name=t.user_name,this.chain_sawShow=!1):"site_user"==i&&(this.site_user_ids=t.id,this.site_user_name=t.user_name,this.site_userShow=!1)},search_site:function(t,i){var e=this,n=t.detail.value;"product_name_id"==i?(this.product_nameShow=!0,this.http({url:this.api.Summary_product,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:n},success:function(t){e.product_nameList=t.list}})):"pro_name"==i?(this.pro_nameShow=!0,this.http({url:this.api.Summary_working,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:n},success:function(t){e.list_gongxu=t.list}})):"Contact_id"==i?(this.ContactShow=!0,this.http({url:this.api.Contact_quartelList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),type:this.titlecount,quartel_name:n},success:function(t){e.ContactList=t.list}})):"drivers_id"==i?(this.driversShow=!0,this.http({url:this.api.Summary_employeesNew,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:n},success:function(t){e.driversList=t.list}})):"chain_saw_id"==i?(this.chain_sawShow=!0,this.http({url:this.api.Summary_employeesNew,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:n},success:function(t){e.chain_sawList=t.list}})):"site_user"==i&&(this.site_userShow=!0,this.http({url:this.api.Summary_employeesNew,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:n},success:function(t){e.site_userList=t.list}}))},checkedType:function(t){this.checkedShoudanType=t.detail.value},changeDate:function(t,i){"start_time"==i?this.start_time=t:this.end_time=t},search:function(t){this.page=1,this.search_name=t,this.listInterface()},search_modal:function(){this.page=1,this.listInterface(),this.show=!1},changeName:function(t,i){"job"==i&&(this.jobIndex=t.target.value,this.profession=this.job_list[this.jobIndex].job_name)},searchtextZhong:function(t){var i=this;this.textZhong=t,this.pageNum=1,this.http({url:this.api.Summary_employees,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),name:this.textZhong,length:10,page:this.pageNum-1},success:function(t){i.data_count=t.total,i.mingongList=t.list,i.count_I=""}})},handlePage:function(t){var i=this;this.pageNum=t.current,this.http({url:this.api.Summary_employees,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),length:10,page:this.pageNum-1,name:this.textZhong},success:function(t){i.mingongList=t.list,i.data_count=t.total}})},Firstclick:function(t){var i=this;this.count_I=t,this.mingongList.map((function(t,e){i.count_I==t.id&&(i.car_emplo_id=t.id,i.car_emplo=t.user_name,i.showZhong=!1)}))},shaixuan:function(){this.show=!0},openModal:function(t){"zhongzhuanche"==t&&(this.showZhong=!0)},closeModal:function(t){"zhongzhuanche"==t?this.showZhong=!1:"shaixuan"==t&&(this.show=!1)},listInterface:function(){var i=this;1==this.titlecount?0==this.count_afforestation?this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,start_time:this.start_time,end_time:this.end_time,type:1,page:this.page,quartel_id:this.quartel_id},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.form.CountNum=e.CountNum,i.form.CountPrice=e.CountPrice,i.form.dayCountPrice=e.dayCountPrice,i.form.dayCountNum=e.dayCountNum}}):this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,start_time:this.start_time,end_time:this.end_time,pro_id:this.pro_id,type:2,page:this.page,quartel_id:this.quartel_id},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.form.CountNum=e.CountNum,i.form.CountPrice=e.CountPrice,i.form.dayCountPrice=e.dayCountPrice,i.form.dayCountNum=e.dayCountNum}}):2==this.titlecount&&(0==this.count?this.http({url:this.api.Summary_cutDownList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.quartel_id,start_time:this.start_time,end_time:this.end_time,drivers_id:this.wj_name,chain_saw_id:this.yjs_name,product_name_id:this.product_name_id,car_emplo_id:this.car_emplo,car_number:this.car_number,pounds_sn:this.search_name,note:this.note,profession:this.profession},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.zhong.dayCountTonnage=e.dayCountTonnage,i.zhong.dayCountNum=e.dayCountNum,i.zhong.CountNum=e.CountNum,i.zhong.CountTonnage=e.CountTonnage}}):1==this.count?this.http({url:this.api.Summary_bigCartList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.quartel_id,start_time:this.start_time,end_time:this.end_time,car_emplo_id:this.car_emplo,closed_order:this.checkedShoudanType,car_number:this.car_number,pounds_sn:this.search_name,note:this.note,profession:this.profession,site_user_ids:this.site_user_name},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.big.remaining=e.remaining,i.big.complete=e.complete,i.big.CountTarget=e.CountTarget,i.big.CountNum=e.CountNum,i.big.CountTonnage=e.CountTonnage,i.big.dayCountTonnage=e.dayCountTonnage,i.big.dayCountNum=e.dayCountNum}}):2==this.count?this.http({url:this.api.Summary_queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,start_time:this.start_time,end_time:this.end_time,type:3,page:this.page,quartel_id:this.quartel_id,profession:this.profession},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.yuzhi.CountNum=e.CountNum,i.yuzhi.CountPrice=e.CountPrice,i.yuzhi.dayCountPrice=e.dayCountPrice,i.yuzhi.dayCountNum=e.dayCountNum}}):3==this.count?this.http({url:this.api.Summary_maintenanceList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,project:this.project,profession:this.profession},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.weixiu.total_price=e.total_price,i.weixiu.total_num=e.total_num}}):4==this.count?this.http({url:this.api.Summary_subsidiesList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,profession:this.profession},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.bu.total_price=e.total_price,i.bu.total_num=e.total_num}}):5==this.count&&this.http({url:this.api.Summary_deductList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.quartel_id,quartel_account:this.quartel_account,project:this.project,profession:this.profession},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=e.list,i.kou.total_price=e.total_price,i.kou.total_num=e.total_num}}))},getCurrentRow:function(i){this.common.set("tiqu",""),1==this.titlecount?t.navigateTo({url:"/pagesA/pages/afforestation/listDetail/listDetail?data="+encodeURIComponent(JSON.stringify(i))}):t.navigateTo({url:"/pagesA/pages/fell/listDetail/listDetail?data="+encodeURIComponent(JSON.stringify(i))})},change:function(t){console.log(t),this.page=1,1==this.titlecount?this.count_afforestation=t:this.count=t,this.search_name="",this.chongzhi(),this.listInterface()},chongzhi:function(){this.quartel_id="",this.Contact_name="",this.jobIndex=-1,this.profession="",this.pm_name="",this.product_name_id="",this.car_number="",this.car_emplo_id="",this.car_emplo="",this.textZhong="",this.count_I="",this.start_time="",this.end_time="",this.checkedShoudanType="",this.quartel_account="",this.project="",this.note="",this.type_shoudan=[{id:1,name:"是",checked:!1},{id:0,name:"否",checked:!1}],this.pro_name="",this.pro_id="",this.wj_name="",this.drivers_id="",this.yjs_name="",this.chain_saw_id="",this.site_user_ids="",this.site_user_name=""},xuanze:function(){t.navigateTo({url:"/pagesA/pages/afforestation/choose/choose"})}}};i.default=s}).call(this,e("d5d0")["default"])},e742:function(t,i,e){"use strict";e.r(i);var n=e("f108"),o=e("6177");for(var s in o)"default"!==s&&function(t){e.d(i,t,(function(){return o[t]}))}(s);e("6f95");var a,u=e("f0c5"),h=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);i["default"]=h.exports},f108:function(t,i,e){"use strict";e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var n={uniEasyinput:function(){return e.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(e.bind(null,"9281"))},uniTable:function(){return e.e("uni_modules/uni-table/components/uni-table/uni-table").then(e.bind(null,"cfd4"))},uniTr:function(){return e.e("uni_modules/uni-table/components/uni-tr/uni-tr").then(e.bind(null,"a209"))},uniTh:function(){return e.e("uni_modules/uni-table/components/uni-th/uni-th").then(e.bind(null,"7441"))},uniTd:function(){return e.e("uni_modules/uni-table/components/uni-td/uni-td").then(e.bind(null,"3c9c"))},uniDatetimePicker:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker")]).then(e.bind(null,"6032"))},uniPagination:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-pagination/components/uni-pagination/uni-pagination")]).then(e.bind(null,"a3cf"))}},o=function(){var t=this,i=t.$createElement;t._self._c},s=[]}},[["b01d","common/runtime","common/vendor"]]]);