require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/summary/jiesuanDetailThree/jiesuanDetailThree"],{"5ce8":function(t,i,n){"use strict";n.d(i,"b",(function(){return e})),n.d(i,"c",(function(){return u})),n.d(i,"a",(function(){return o}));var o={uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,"9281"))},uniTable:function(){return n.e("uni_modules/uni-table/components/uni-table/uni-table").then(n.bind(null,"cfd4"))},uniTr:function(){return n.e("uni_modules/uni-table/components/uni-tr/uni-tr").then(n.bind(null,"a209"))},uniTh:function(){return n.e("uni_modules/uni-table/components/uni-th/uni-th").then(n.bind(null,"7441"))},uniTd:function(){return n.e("uni_modules/uni-table/components/uni-td/uni-td").then(n.bind(null,"3c9c"))}},e=function(){var t=this,i=t.$createElement;t._self._c},u=[]},9608:function(t,i,n){"use strict";n.r(i);var o=n("5ce8"),e=n("b050");for(var u in e)"default"!==u&&function(t){n.d(i,t,(function(){return e[t]}))}(u);n("bc68");var a,s=n("f0c5"),h=Object(s["a"])(e["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);i["default"]=h.exports},b050:function(t,i,n){"use strict";n.r(i);var o=n("d097"),e=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(i,t,(function(){return o[t]}))}(u);i["default"]=e.a},b4da:function(t,i,n){},bc68:function(t,i,n){"use strict";var o=n("b4da"),e=n.n(o);e.a},d097:function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{count:0,show:!1,list:[],zhong:{dayCountTonnage:0,dayCountNum:0,CountNum:0,CountTonnage:0},big:{remaining:0,complete:0,CountTarget:0,CountNum:0,CountTonnage:0,dayCountTonnage:0,dayCountNum:0},yuzhi:{CountNum:0,CountPrice:0,dayCountPrice:0,dayCountNum:0},weixiu:{total_price:0,total_num:0},bu:{total_price:0,total_num:0},kou:{total_price:0,total_num:0},icon:[],search_name:"",option:{}}},onLoad:function(i){this.option=JSON.parse(decodeURIComponent(i.data)),console.log("this.option",this.option),this.count=this.option.data_type,this.icon=this.common.get("icon"),this.page=1,t.setNavigationBarTitle({title:this.option.emplo_name+"-"+this.option.job_name}),this.listInterface()},onReachBottom:function(){var i=this;2==this.count?this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,yuzhi_id:this.option.yuzhi_id,type:3,page:this.page,quartel_id:this.option.quartel_id},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.yuzhi.CountNum=n.CountNum,i.yuzhi.CountPrice=n.CountPrice,i.yuzhi.dayCountPrice=n.dayCountPrice,i.yuzhi.dayCountNum=n.dayCountNum)}}):0==this.count?this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.option.quartel_id,relation_id:this.option.relation_id,show_all:1,pounds_sn:this.search_name},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.zhong.dayCountTonnage=n.dayCountTonnage,i.zhong.dayCountNum=n.dayCountNum,i.zhong.CountNum=n.CountNum,i.zhong.CountTonnage=n.CountTonnage)}}):1==this.count?this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.option.quartel_id,relation_id:this.option.relation_id,show_all:1,pounds_sn:this.search_name},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.big.remaining=n.remaining,i.big.complete=n.complete,i.big.CountTarget=n.CountTarget,i.big.CountNum=n.CountNum,i.big.CountTonnage=n.CountTonnage,i.big.dayCountTonnage=n.dayCountTonnage,i.big.dayCountNum=n.dayCountNum)}}):3==this.count?this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.option.quartel_id,wx_id:this.option.wx_id},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.weixiu.total_price=n.total_price,i.weixiu.total_num=n.total_num)}}):4==this.count?this.http({url:this.api.Quartel_subsidiesList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.option.quartel_id,bu_id:this.option.bu_id},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.bu.total_price=n.total_price,i.bu.total_num=n.total_num)}}):5==this.count&&this.http({url:this.api.Quartel_deductList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.option.quartel_id,kou_id:this.option.kou_id},success:function(n){i.page+=1,0==n.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):(i.list=i.list.concat(n.list),i.kou.total_price=n.total_price,i.kou.total_num=n.total_num)}})},methods:{search:function(t){this.page=1,this.search_name=t,this.listInterface()},listInterface:function(){var i=this;0==this.count?this.http({url:this.api.Quartel_cutDownList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.option.quartel_id,show_all:1,relation_id:this.option.relation_id,pounds_sn:this.search_name},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.zhong.dayCountTonnage=n.dayCountTonnage,i.zhong.dayCountNum=n.dayCountNum,i.zhong.CountNum=n.CountNum,i.zhong.CountTonnage=n.CountTonnage}}):1==this.count?this.http({url:this.api.Quartel_bigCartList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),page:this.page,quartel_id:this.option.quartel_id,relation_id:this.option.relation_id,show_all:1,pounds_sn:this.search_name},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.big.remaining=n.remaining,i.big.complete=n.complete,i.big.CountTarget=n.CountTarget,i.big.CountNum=n.CountNum,i.big.CountTonnage=n.CountTonnage,i.big.dayCountTonnage=n.dayCountTonnage,i.big.dayCountNum=n.dayCountNum}}):2==this.count?this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_name:this.search_name,type:3,page:this.page,quartel_id:this.option.quartel_id,yuzhi_id:this.option.yuzhi_id},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.yuzhi.CountNum=n.CountNum,i.yuzhi.CountPrice=n.CountPrice,i.yuzhi.dayCountPrice=n.dayCountPrice,i.yuzhi.dayCountNum=n.dayCountNum}}):3==this.count?this.http({url:this.api.Quartel_maintenanceList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,wx_id:this.option.wx_id,quartel_id:this.option.quartel_id},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.weixiu.total_price=n.total_price,i.weixiu.total_num=n.total_num}}):4==this.count?this.http({url:this.api.Quartel_subsidiesList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.option.quartel_id,bu_id:this.option.bu_id},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.bu.total_price=n.total_price,i.bu.total_num=n.total_num}}):5==this.count&&this.http({url:this.api.Quartel_deductList,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),pro_name:this.search_name,page:this.page,quartel_id:this.option.quartel_id,kou_id:this.option.kou_id},success:function(n){0==n.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),i.page+=1,i.list=n.list,i.kou.total_price=n.total_price,i.kou.total_num=n.total_num}})}}};i.default=n}).call(this,n("d5d0")["default"])},ed8c:function(t,i,n){"use strict";(function(t){n("a5e5");o(n("dc04"));var i=o(n("9608"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("97ff")["createPage"])}},[["ed8c","common/runtime","common/vendor"]]]);