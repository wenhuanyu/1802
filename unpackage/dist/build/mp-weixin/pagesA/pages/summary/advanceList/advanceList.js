require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/summary/advanceList/advanceList"],{"072ea":function(t,n,e){"use strict";e.r(n);var i=e("920d"),o=e("40cd");for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("dc63");var a,c=e("f0c5"),s=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=s.exports},"40cd":function(t,n,e){"use strict";e.r(n);var i=e("f27d"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},"84c1":function(t,n,e){"use strict";(function(t){e("a5e5");i(e("dc04"));var n=i(e("072ea"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("97ff")["createPage"])},"920d":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={uniTable:function(){return e.e("uni_modules/uni-table/components/uni-table/uni-table").then(e.bind(null,"cfd4"))},uniTr:function(){return e.e("uni_modules/uni-table/components/uni-tr/uni-tr").then(e.bind(null,"a209"))},uniTh:function(){return e.e("uni_modules/uni-table/components/uni-th/uni-th").then(e.bind(null,"7441"))},uniTd:function(){return e.e("uni_modules/uni-table/components/uni-td/uni-td").then(e.bind(null,"3c9c"))}},o=function(){var t=this,n=t.$createElement;t._self._c},u=[]},c3eb:function(t,n,e){},dc63:function(t,n,e){"use strict";var i=e("c3eb"),o=e.n(i);o.a},f27d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[],data:"",option:"",page:1}},onLoad:function(n){this.page=1,this.option=JSON.parse(decodeURIComponent(n.data)),t.setNavigationBarTitle({title:this.option.name+"-"+this.option.quartel_name}),this.listInterface()},onReachBottom:function(){var n=this;this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),type:2,page:this.page,emplo_id:this.option.emplo_id,quartel_id:this.option.quartel_id},success:function(e){n.page+=1,0==e.list.length?t.showToast({title:"没有更多了",icon:"none",duration:2e3}):n.list=n.list.concat(e.list)}})},methods:{listInterface:function(){var n=this;this.http({url:this.api.queryLists,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),type:2,page:this.page,emplo_id:this.option.emplo_id,quartel_id:this.option.quartel_id},success:function(e){0==e.list.length&&t.showToast({title:"无数据",icon:"none",duration:2e3}),n.page+=1,n.list=e.list}})}}};n.default=e}).call(this,e("d5d0")["default"])}},[["84c1","common/runtime","common/vendor"]]]);