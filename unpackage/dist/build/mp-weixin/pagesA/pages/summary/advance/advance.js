require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/summary/advance/advance"],{3122:function(t,e,n){"use strict";n.r(e);var a=n("4f56"),i=n("79bd");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var u,r=n("f0c5"),c=Object(r["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=c.exports},"4f56":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"79bd":function(t,e,n){"use strict";n.r(e);var a=n("d6a0"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},d6a0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{list:[],data:{},option:""}},onLoad:function(e){this.option=JSON.parse(decodeURIComponent(e.data)),t.setNavigationBarTitle({title:this.option.name+"-"+this.option.quartel_name}),this.listInterface()},methods:{listInterface:function(){var t=this;this.http({url:this.api.Quartel_SettlementDetail,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.option.quartel_id,emplo_id:this.option.emplo_id},success:function(e){t.list=e.list}})}}};e.default=n}).call(this,n("d5d0")["default"])},d8d2:function(t,e,n){"use strict";(function(t){n("a5e5");a(n("dc04"));var e=a(n("3122"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])}},[["d8d2","common/runtime","common/vendor"]]]);