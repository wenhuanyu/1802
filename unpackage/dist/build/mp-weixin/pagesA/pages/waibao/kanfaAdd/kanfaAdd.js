require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/waibao/kanfaAdd/kanfaAdd"],{"2fff":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{name:"",id:"",button:"添加"}},onLoad:function(n){n.data?(t.setNavigationBarTitle({title:"编辑林班"}),this.button="编辑",this.id=JSON.parse(decodeURIComponent(n.data)).id,this.name=JSON.parse(decodeURIComponent(n.data)).name):t.setNavigationBarTitle({title:"添加林班"})},methods:{previous:function(){var n=getCurrentPages(),e=n[n.length-2];t.navigateBack({success:function(){e.onLoad()}})},add:function(){var n=this;this.id?t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&n.http({url:n.api.Epiboly_edits,method:"POST",data:{uid:n.common.get("uid"),token:n.common.get("token"),type:2,name:n.name,id:n.id},success:function(e){t.showToast({title:"编辑成功",icon:"none",duration:2e3}),setTimeout((function(){n.previous()}),500)}})},fail:function(){},complete:function(){}}):t.showModal({title:"提示",content:"确定当前操作吗？",success:function(e){e.confirm&&n.http({url:n.api.Epiboly_add,method:"POST",data:{uid:n.common.get("uid"),token:n.common.get("token"),type:2,name:n.name},success:function(e){t.showToast({title:"添加成功",icon:"none",duration:2e3}),setTimeout((function(){n.previous()}),500)}})},fail:function(){},complete:function(){}})}}};n.default=e}).call(this,e("d5d0")["default"])},4214:function(t,n,e){"use strict";e.r(n);var o=e("a5c7"),a=e("dba2");for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e("ebfa");var u,c=e("f0c5"),f=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=f.exports},6260:function(t,n,e){"use strict";(function(t){e("a5e5");o(e("dc04"));var n=o(e("4214"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("97ff")["createPage"])},a5c7:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=[]},dba2:function(t,n,e){"use strict";e.r(n);var o=e("2fff"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},ebfa:function(t,n,e){"use strict";var o=e("ec45"),a=e.n(o);a.a},ec45:function(t,n,e){}},[["6260","common/runtime","common/vendor"]]]);