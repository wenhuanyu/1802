require('../../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/afforestation/outsourcing/add/add"],{"0f75":function(t,e,n){"use strict";n.r(e);var r=n("c470"),i=n("1e6a");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("8516");var o,c=n("f0c5"),u=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},"1e6a":function(t,e,n){"use strict";n.r(e);var r=n("b724"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},2594:function(t,e,n){},8516:function(t,e,n){"use strict";var r=n("2594"),i=n.n(r);i.a},b724:function(t,e,n){"use strict";(function(t){function n(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=r(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var i=0,a=function(){};return{s:a,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,o=t},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw o}}}}function r(t,e){if(t){if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{list:[],show:!1,id:"",allCheck:{name:"全选",value:"all",checked:!1},checkedArr:[],data:"",icon:[]}},onLoad:function(){this.icon=this.common.get("icon"),this.page=1,this.listInterface(),this.data=this.common.get("zaolin"),t.setNavigationBarTitle({title:"添加外包订单-"+this.data.quartel_name+this.data.quartel_account})},methods:{changeAll:function(t){var e=t.detail.value;if("all"==e[0]){this.allCheck.checked=!0;var r,i=n(this.list);try{for(i.s();!(r=i.n()).done;){var a=r.value,o=String(a.id);this.checkedArr.includes(o)||this.checkedArr.push(o)}}catch(c){i.e(c)}finally{i.f()}}else this.allCheck.checked=!1,this.checkedArr=[]},changeCheck:function(t){this.checkedArr=t.detail.value,console.log("this.checkedArr",this.checkedArr),this.checkedArr.length>0&&this.checkedArr.length==this.list.length?this.allCheck.checked=!0:this.allCheck.checked=!1},listInterface:function(){var t=this;this.http({url:this.api.Epiboly_quartel_list,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),type:1},success:function(e){t.list=e.list}})},previous:function(){var e=getCurrentPages(),n=e[e.length-2];t.navigateBack({success:function(){n.onLoad()}})},add:function(){var e=this;this.http({url:this.api.Epiboly_add_epiboly,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),quartel_id:this.data.id,epiboly_quartel_id:this.checkedArr},success:function(n){t.showToast({title:"关联成功",icon:"none",duration:2e3}),setTimeout((function(){e.previous()}),500)}})}}};e.default=a}).call(this,n("d5d0")["default"])},c470:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.list,(function(e,n){var r=t.__get_orig(e),i=t.checkedArr.includes(String(e.id));return{$orig:r,g0:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[]},ee63:function(t,e,n){"use strict";(function(t){n("a5e5");r(n("dc04"));var e=r(n("0f75"));function r(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("97ff")["createPage"])}},[["ee63","common/runtime","common/vendor"]]]);