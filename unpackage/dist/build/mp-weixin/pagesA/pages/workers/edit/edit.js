require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/pages/workers/edit/edit"],{"29d3":function(e,t,r){"use strict";var n=r("9ee5"),a=r.n(n);a.a},"3a45":function(e,t,r){"use strict";var n;r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return i})),r.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.profession,(function(t,r){var n=e.__get_orig(t),a=e.checkedArr.includes(String(t.id));return{$orig:n,g0:a}}))),n=e.checkedArr.includes(String(5)),a=e.checkedArr.includes(String(2)),i=e.checkedArr.includes(String(2)),c=e.checkedArr.includes(String(5));e.$mp.data=Object.assign({},{$root:{l0:r,g1:n,g2:a,g3:i,g4:c}})},i=[]},"40e3":function(e,t,r){"use strict";(function(e){function r(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function n(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=c(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,u=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){u=!0,i=e},f:function(){try{o||null==r.return||r.return()}finally{if(u)throw i}}}}function c(e,t){if(e){if("string"===typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u={data:function(){return{form:{nick_name:"",phone:"",car_id:"",bank_card:"",bank:""},cart:[],transfer_car:[],data:"",edit:"",cate_name:"",unit_name:"",profession:[],checkedArr:[],type:[{id:3,name:"全部",checked:!1},{id:1,name:"造林",checked:!1},{id:2,name:"砍伐",checked:!1}],checkedArrType:"",id:"",icon:[]}},onLoad:function(e){var t=this;this.icon=this.common.get("icon"),this.http({url:this.api.jobData,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token")},success:function(e){t.profession=e.list}}),e.data&&(this.id=JSON.parse(decodeURIComponent(e.data))),this.http({url:this.api.userInfo,method:"POST",data:{uid:this.common.get("uid"),token:this.common.get("token"),emplo_id:this.id},success:function(e){t.form.nick_name=e.nick_name,t.form.bank=e.bank,t.form.phone=e.phone,t.form.car_id=e.car_id,t.form.bank_card=e.bank_card,t.form.bank_image=e.bank_image,t.form.car_image=e.car_image,t.checkedArrType=e.type,t.type.map((function(t,r){t.id==e.type&&(t.checked=!0)}));var r,n=i(e.job_id);try{for(n.s();!(r=n.n()).done;){var a=r.value,c=String(a);t.checkedArr.includes(c)||t.checkedArr.push(c)}}catch(s){n.e(s)}finally{n.f()}if(0==e.cart.length){var o={cartid:""};t.cart.push(o)}if(0==e.transfer_car.length){var u={transfer_carid:""};t.transfer_car.push(u)}e.cart.map((function(e,r){var n={cartid:e};t.cart.push(n)})),e.transfer_car.map((function(e,r){var n={transfer_carid:e};t.transfer_car.push(n)}))}})},methods:{addbig:function(e){if("cart"==e){var t={cartid:""};this.cart.push(t)}else{var r={transfer_carid:""};this.transfer_car.push(r)}},del:function(e,t){"cart"==t?this.cart.splice(e,1):this.transfer_car.splice(e,1)},add:function(){var t=this,r=this.cart.map((function(e){return e["cartid"]})),a=this.transfer_car.map((function(e){return e["transfer_carid"]}));this.http({url:this.api.addUserInfo,method:"POST",data:n({uid:this.common.get("uid"),token:this.common.get("token"),emplo_id:this.id,type:this.checkedArrType,job_id:this.checkedArr,cart:r,transfer_car:a},this.form),success:function(r){e.showToast({title:"编辑成功",icon:"none",duration:2e3}),setTimeout((function(){t.previous()}),500)}})},changeCheck:function(e){this.checkedArr=e.detail.value},changeCheckType:function(e){this.checkedArrType=e.detail.value},deleteImage:function(e,t){"card"==e?this.form.car_image.splice(t,1):this.form.bank_image.splice(t,1)},previewImage:function(e,t){"card"==e?wx.previewImage({current:this.form.car_image[t],urls:this.form.car_image}):wx.previewImage({current:this.form.bank_image[t],urls:this.form.bank_image})},uploadImage:function(t){var r=this;e.chooseImage({count:1,success:function(n){var a=n.tempFilePaths[0];e.uploadFile({url:r.common.baseUrl+r.api.upload,filePath:a,name:"file",success:function(n){var a=JSON.parse(n.data);1==a.code?"card"==t?r.form.car_image.push(a.data.scalar):r.form.bank_image.push(a.data.scalar):e.showToast({title:"上传失败",icon:"none"})},fail:function(t){e.showToast({title:"上传失败,"+t,icon:"none"})}})}})},previous:function(){var t=getCurrentPages(),r=t[t.length-2];e.navigateBack({success:function(){r.onLoad()}})}}};t.default=u}).call(this,r("d5d0")["default"])},"97df":function(e,t,r){"use strict";r.r(t);var n=r("3a45"),a=r("d9e9");for(var i in a)"default"!==i&&function(e){r.d(t,e,(function(){return a[e]}))}(i);r("29d3");var c,o=r("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);t["default"]=u.exports},"9ee5":function(e,t,r){},d9e9:function(e,t,r){"use strict";r.r(t);var n=r("40e3"),a=r.n(n);for(var i in n)"default"!==i&&function(e){r.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},f5ec:function(e,t,r){"use strict";(function(e){r("a5e5");n(r("dc04"));var t=n(r("97df"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=r,e(t.default)}).call(this,r("97ff")["createPage"])}},[["f5ec","common/runtime","common/vendor"]]]);