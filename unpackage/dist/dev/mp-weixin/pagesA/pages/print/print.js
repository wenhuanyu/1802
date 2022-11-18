require('../../common/vendor.js');(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pagesA/pages/print/print"],{

/***/ 698:
/*!*****************************************************************************!*\
  !*** F:/文环宇/项目/1802/1802/main.js?{"page":"pagesA%2Fpages%2Fprint%2Fprint"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 1);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _print = _interopRequireDefault(__webpack_require__(/*! ./pagesA/pages/print/print.vue */ 699));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_print.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js */ 6)["createPage"]))

/***/ }),

/***/ 699:
/*!********************************************************!*\
  !*** F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./print.vue?vue&type=template&id=58340cfc& */ 700);
/* harmony import */ var _print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print.vue?vue&type=script&lang=js& */ 702);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./print.vue?vue&type=style&index=0&lang=scss& */ 712);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 12);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pagesA/pages/print/print.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 700:
/*!***************************************************************************************!*\
  !*** F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=template&id=58340cfc& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./print.vue?vue&type=template&id=58340cfc& */ 701);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_template_id_58340cfc___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 701:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=template&id=58340cfc& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 702:
/*!*********************************************************************************!*\
  !*** F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./print.vue?vue&type=script&lang=js& */ 703);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 703:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 704));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var app = getApp();
var tsc = __webpack_require__(/*! ../../../gprint/tsc.js */ 707);
var esc = __webpack_require__(/*! ../../../gprint/esc.js */ 710);
var util = __webpack_require__(/*! ../../../gprint/hash.js */ 711);var _default =

{
  data: function data() {
    return {
      show_id: '',
      devicesList: [],
      services: [],
      serviceId: 0,
      writeCharacter: false,
      readCharacter: false,
      notifyCharacter: false,
      isScanning: false,

      looptime: 0,
      currentTime: 1,
      lastData: 0,
      oneTimeData: 20, //发送数据大小，测试正常，不能太多
      returnResult: 'returnResult',
      canvasWidth: 80,
      canvasHeight: 80,
      printNum: 1,
      currentPrint: 1,
      isReceiptSend: false,
      isLabelSend: false,
      printInfo: {},
      option: {},
      // boxNum: '',
      labelNum: '' };

  },
  methods: {
    /**
              * 蓝牙搜索
              */
    searchBluetooth: function searchBluetooth() {
      var that = this;
      //判断蓝牙是否打开
      wx.openBluetoothAdapter({
        success: function success(res) {
          console.log(res);
          wx.getBluetoothAdapterState({
            success: function success(res) {
              console.log(res);
              if (res.available) {
                if (res.discovering) {
                  wx.stopBluetoothDevicesDiscovery({
                    success: function success(res) {
                      console.log(res);
                    } });

                }
                that.checkPemission();
              } else {
                wx.showModal({
                  title: '提示',
                  content: '请开启手机蓝牙后再试' });

              }
            } });

        },
        fail: function fail(res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '蓝牙初始化失败，请打开蓝牙' });

        } });

    },
    /**
        * android 6.0以上需授权地理位置权限
        */
    checkPemission: function checkPemission() {
      var that = this;
      var systemInfo = wx.getSystemInfoSync();
      var platform = systemInfo.platform;
      if (platform == 'ios') {
        that.getBluetoothDevices();
      } else if (platform == 'android') {
        var system = systemInfo.system;
        var system_no = system.replace('android', '');
        system_no = system.replace('Android', '');
        if (parseInt(system_no) > 5) {
          console.log(123);
          wx.getSetting({
            success: function success(res) {
              console.log(res);
              if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  complete: function complete(res) {
                    console.log(res);
                    that.getBluetoothDevices();
                  } });

              } else {
                that.getBluetoothDevices();
              }
            } });

        }
      }
    },
    /**
        * 获取蓝牙设备信息
        */
    getBluetoothDevices: function getBluetoothDevices() {
      var that = this;
      console.log('start search');
      wx.showLoading({
        title: '正在加载' });

      that.isScanning = true;
      wx.startBluetoothDevicesDiscovery({
        success: function success(res) {
          console.log(res);
          setTimeout(function () {
            wx.getBluetoothDevices({
              success: function success(res) {
                var devices = [];
                var num = 0;
                for (var i = 0; i < res.devices.length; ++i) {
                  if (res.devices[i].name != '未知设备') {
                    devices[num] = res.devices[i];
                    num++;
                  }
                }
                that.devicesList = devices;
                that.isScanning = false;

                wx.hideLoading();
                wx.stopPullDownRefresh();
              } });

          }, 3000);
        } });

    },
    /**
        * 开始连接蓝牙设置
        */
    connectBluetoothSettings: function connectBluetoothSettings(e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var deviceId = that.devicesList[index].deviceId;
      console.log(index);
      wx.stopBluetoothDevicesDiscovery({
        success: function success(res) {
          console.log(res);
        } });

      that.serviceId = 0;
      that.writeCharacter = false;
      that.readCharacter = false;
      that.notifyCharacter = false;
      console.log(deviceId);
      wx.showLoading({ title: '请稍等' });
      title: '正在连接',
      wx.createBLEConnection({
        deviceId: deviceId,
        success: function success(res) {
          console.log(res);
          app.globalData.bluetoothDeviceId = deviceId;
          that.show_id = deviceId;
          that.getBLEDeviceServices();
        },
        fail: function fail(e) {
          wx.showModal({
            title: '提示',
            content: '连接失败' });

          console.log(e);
          wx.hideLoading();
        },
        complete: function complete(e) {
          console.log(e);
        } });

    },
    /**
        * 获取蓝牙设备所有服务
        */
    getBLEDeviceServices: function getBLEDeviceServices() {
      var that = this;
      console.log(app.globalData.bluetoothDeviceId);
      wx.getBLEDeviceServices({
        deviceId: app.globalData.bluetoothDeviceId,
        success: function success(res) {
          console.log(res);
          that.services = res.services;
          that.getBLEDeviceCharacteristics();
        },
        fail: function fail(e) {
          console.log(e);
        },
        complete: function complete(e) {
          console.log(e);
        } });

    },
    /**
        * 获取蓝牙设备某个服务中所有特征值
        */
    getBLEDeviceCharacteristics: function getBLEDeviceCharacteristics() {
      var that = this;
      var list = that.services;
      var num = that.serviceId;
      var write = that.writeCharacter;
      var read = that.readCharacter;
      var notify = that.notifyCharacter;
      wx.getBLEDeviceCharacteristics({
        deviceId: app.globalData.bluetoothDeviceId,
        serviceId: list[num].uuid,
        success: function success(res) {
          console.log(res);
          for (var i = 0; i < res.characteristics.length; ++i) {
            var properties = res.characteristics[i].properties;
            var item = res.characteristics[i].uuid;
            if (!notify) {
              if (properties.notify) {
                app.globalData.notifyCharaterId = item;
                app.globalData.notifyServiceId = list[num].uuid;
                notify = true;
              }
            }
            if (!write) {
              if (properties.write) {
                app.globalData.writeCharaterId = item;
                app.globalData.writeServiceId = list[num].uuid;
                write = true;
              }
            }
            if (!read) {
              if (properties.read) {
                app.globalData.readCharaterId = item;
                app.globalData.readServiceId = list[num].uuid;
                read = true;
              }
            }
          }
          if (!write || !notify || !read) {
            num++;
            that.writeCharacter = write;
            that.readCharacter = read;
            that.notifyCharacter = notify;
            that.serviceId = num;
            if (num == list.length) {
              wx.showModal({
                title: '提示',
                content: '找不到该读写的特征值' });

            } else {
              that.getBLEDeviceCharacteristics();
            }
          } else {
            that.notifyBLECharacteristicValueChange();
          }
        },
        fail: function fail(e) {
          console.log(e);
        },
        complete: function complete(e) {
          console.log('write:' + app.globalData.writeCharaterId);
          console.log('read:' + app.globalData.readCharaterId);
          console.log('notify:' + app.globalData.notifyCharaterId);
        } });

    },
    /**
        * 启用低功耗蓝牙设备特征值变化时的 notify 功能
        */
    notifyBLECharacteristicValueChange: function notifyBLECharacteristicValueChange() {
      console.log('deviceId:' + app.globalData.bluetoothDeviceId);
      console.log('serviceId:' + app.globalData.notifyServiceId);
      console.log('notifyCharaterId:' + app.globalData.notifyCharaterId);
      wx.hideLoading();
      wx.notifyBLECharacteristicValueChange({
        deviceId: app.globalData.bluetoothDeviceId,
        serviceId: app.globalData.notifyServiceId,
        characteristicId: app.globalData.notifyCharaterId,
        state: true,
        success: function success(res) {
          wx.onBLECharacteristicValueChange(function (r) {
            // console.log(`characteristic ${r.characteristicId} has changed, now is ${r}`)
            console.log('onBLECharacteristicValueChange=', r);
          });
        },
        fail: function fail(e) {
          console.log('fail', e);
        },
        complete: function complete(e) {
          console.log('complete', e);
        } });

    },
    /**
        * 账单模式
        */
    sendData: function sendData() {
      var data = '好好学习，天天向上\n';
      var that = this;
      var command = tsc.jpPrinter.createNew();
      command.setGap(0);
      command.setCls();
      command.setText(40, 60, 'TSS24.BF2', 1, 1, data);
      command.setPagePrint();
      that.prepareSend(command.getData());
    },
    /**
        * 标签模式
        */
    labelTest: function labelTest() {
      var that = this;
      var printInfo = that.printInfo;
      console.log('printInfo', printInfo);
      var canvasWidth = that.canvasWidth;
      var canvasHeight = that.canvasHeight;
      var command = tsc.jpPrinter.createNew();

      //    command.setSize(80, 40);
      //    command.setGap(0);
      // command.setLimitfeed(10)
      command.setCls(); //需要设置这个，不然内容和上一次重复
      // command.setText(210, 0, 'TSS24.BF2', 2, 2, printInfo.bar_code);
      // command.setText(185, 0, 'TSS24.BF2', 2, 2, '1101-00252');
      // command.setBar(180, 60, 128, 80, 0, 2, 2, printInfo.bar_code);
      // command.setQR(240, 60, 'L', 7, 'A', 0, 'M2', 'S3', JSON.stringify({bar_code:printInfo.bar_code,number:that.number}));
      // command.setQR(240, 60, 'L', 6, 'A', 0, 'M2', 'S3', printInfo.bar_code + ',' + that.boxNum + ',' + that.getMoment());

      // command.setText(100, 220, 'TSS24.BF2', 1, 1, `${printInfo.name}，${printInfo.specification}`);
      // command.setText(100, 250, 'TSS24.BF2', 1, 1, `${printInfo.serial_num}/${printInfo.attribute}/标准`);
      // command.setText(100, 280, 'TSS24.BF2', 1, 1, 'MADE IN CHINA');

      var line = '------------------------------------------------';
      command.setText(40, 60, 'TSS24.BF2', 1, 1, "".concat(printInfo.title));
      command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      if (printInfo.text == 'luruyuzhi') {
        command.setText(60, 90, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5DF2\u9884\u652F\u989D\uFF1A".concat(printInfo.count_money, "/\uFF08\u5360\u603B\u5DE5\u7A0B\u6B3E").concat(printInfo.rate, "%)"));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u9884\u652F\u91D1\u989D\uFF1A".concat(printInfo.per_amount));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u91D1\u989D\u5927\u5199\uFF1A".concat(printInfo.capital));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5361\u53F7\uFF1A".concat(printInfo.bank_card));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5F00\u6237\u884C\uFF1A".concat(printInfo.bank));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.pre_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u662F\u5426\u8F6C\u8D26\uFF1A".concat(printInfo.transfer_text));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        if (printInfo.transfer_text == '是') {
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u8F6C\u8D26\u65F6\u95F4\uFF1A".concat(printInfo.zz_time));
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        }
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u64CD\u4F5C\u5458\uFF1A".concat(printInfo.sign));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u7B7E\u540D\uFF1A".concat(printInfo.sign));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'lurujisuan') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5DE5\u5E8F\uFF1A".concat(printInfo.the_gongxu));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u4EA9\uFF1A".concat(printInfo.number));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5355\u4EF7\uFF1A".concat(printInfo.unit_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.pre_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u603B\u4EF7\uFF1A".concat(printInfo.total_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'luruzhongzhuanche') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u78C5\u5355\u53F7\uFF1A".concat(printInfo.pounds_sn));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u4E2D\u8F6C\u8F66\uFF1A".concat(printInfo.car_zhong));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6BDB\u91CD\uFF1A".concat(printInfo.cargo_weight));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6BDB\u91CD\u65F6\u95F4\uFF1A".concat(printInfo.cargo_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u76AE\u91CD\uFF1A".concat(printInfo.gros_weight, "/\uFF08\u8BEF\u5DEE").concat(printInfo.wucha.errors, ",\u5E73\u5747\u8BEF\u5DEE").concat(printInfo.wucha.average, ")"));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u76AE\u91CD\u65F6\u95F4\uFF1A".concat(printInfo.gros_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6263\u6C34\u4EFD\uFF1A".concat(printInfo.k_moisture));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u51C0\u91CD\uFF1A".concat(printInfo.net_weight));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65E5\u671F\uFF1A".concat(printInfo.add_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u64CD\u4F5C\u5458\uFF1A".concat(printInfo.form_zhong_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6316\u673A\uFF1A".concat(printInfo.wj_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6CB9\u952F\u624B\uFF1A".concat(printInfo.yjs_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u54C1\u540D\uFF1A".concat(printInfo.pm_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5355\u4F4D\uFF1AT\uFF08\u5428\uFF09");
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'lurudache') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u78C5\u5355\u53F7\uFF1A".concat(printInfo.pounds_sn));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5927\u8F66\uFF1A".concat(printInfo.car_da));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u51C0\u91CD\uFF1A".concat(printInfo.net_weight));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u51FA\u8F66\u65F6\u95F4\uFF1A".concat(printInfo.start_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u662F\u5426\u6536\u5355\uFF1A".concat(printInfo.shoudan_text));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        if (printInfo.shoudan_text == '是') {
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6536\u5355\u65F6\u95F4\uFF1A".concat(printInfo.single_time));
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        }
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u573A\u5730\u6316\u673A\uFF1A".concat(printInfo.site_user_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6263\u6B3E\uFF1A".concat(printInfo.penalty));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u64CD\u4F5C\u5458\uFF1A".concat(printInfo.name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'kanfayuzhi') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u804C\u4E1A\uFF1A".concat(printInfo.the_zhiye));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5DF2\u9884\u652F\u989D\uFF1A".concat(printInfo.count_money, "/\uFF08\u5360\u603B\u5DE5\u7A0B\u6B3E").concat(printInfo.rate, "%)"));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u9884\u652F\u91D1\u989D\uFF1A".concat(printInfo.per_amount));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u91D1\u989D\u5927\u5199\uFF1A".concat(printInfo.capital));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5361\u53F7\uFF1A".concat(printInfo.bank_card));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5F00\u6237\u884C\uFF1A".concat(printInfo.bank));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.pre_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u662F\u5426\u8F6C\u8D26\uFF1A".concat(printInfo.transfer_text));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        if (printInfo.transfer_text == '是') {
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u8F6C\u8D26\u65F6\u95F4\uFF1A".concat(printInfo.zz_time));
          command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        }
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u64CD\u4F5C\u5458\uFF1A".concat(printInfo.sign));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u7B7E\u540D\uFF1A".concat(printInfo.sign));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'luruwei') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u804C\u4E1A\uFF1A".concat(printInfo.the_zhiye));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.add_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u9879\u76EE\uFF1A".concat(printInfo.project));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6570\u91CF\uFF1A".concat(printInfo.unit));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5355\u4EF7\uFF1A".concat(printInfo.unit_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u603B\u5DE5\u7A0B\u6B3E\uFF1A".concat(printInfo.total_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'lurubu') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u804C\u4E1A\uFF1A".concat(printInfo.the_zhiye));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.add_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6570\u91CF\uFF1A".concat(printInfo.number));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5355\u4EF7\uFF1A".concat(printInfo.unit_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5408\u8BA1\uFF1A".concat(printInfo.total_price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      } else if (printInfo.text == 'lurukou') {
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u59D3\u540D\uFF1A".concat(printInfo.the_name));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u804C\u4E1A\uFF1A".concat(printInfo.the_zhiye));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u6797\u73ED\u53F7\uFF1A".concat(printInfo.quartel_account));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u65F6\u95F4\uFF1A".concat(printInfo.add_time));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u9879\u76EE\uFF1A".concat(printInfo.project));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u91D1\u989D\uFF1A".concat(printInfo.price));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "\u5907\u6CE8\uFF1A".concat(printInfo.note));
        command.setText(330, 250, 'TSS24.BF2', 1, 1, "".concat(line));
      }


      // command.setText(330, 280, 'TSS24.BF2', 1, 1, `日期（Date）：${that.getMoment()}`);
      // command.setPagePrint(that.labelNum);
      that.isLabelSend = true;
      that.prepareSend(command.getData());
    },
    /**
        * 准备发送数据
        */
    prepareSend: function prepareSend(buff) {
      console.log('buff', buff);
      var that = this;
      var time = that.oneTimeData;
      var looptime = parseInt(buff.length / time);
      var lastData = parseInt(buff.length % time);
      console.log(looptime + '---' + lastData);
      that.looptime = looptime + 1;
      that.lastData = lastData;
      that.currentTime = 1;
      that.Send(buff);
    },
    /**
        * 查询打印机状态
        */
    queryPrinterStatus: function queryPrinterStatus() {
      var command = esc.jpPrinter.Query();
      command.getRealtimeStatusTransmission(1);
      this.returnResult = '查询成功';
    },
    /**
        * 分包发送
        */
    Send: function Send(buff) {
      var that = this;
      var currentTime = that.currentTime;
      var loopTime = that.looptime;
      var lastData = that.lastData;
      var onTimeData = that.oneTimeData;
      var printNum = that.printNum; //打印多少份
      var currentPrint = that.currentPrint;
      var buf;
      var dataView;
      if (currentTime < loopTime) {
        buf = new ArrayBuffer(onTimeData);
        dataView = new DataView(buf);
        for (var i = 0; i < onTimeData; ++i) {
          dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i]);
        }
      } else {
        buf = new ArrayBuffer(lastData);
        dataView = new DataView(buf);
        for (var i = 0; i < lastData; ++i) {
          dataView.setUint8(i, buff[(currentTime - 1) * onTimeData + i]);
        }
      }
      console.log('第' + currentTime + '次发送数据大小为：' + buf.byteLength);
      console.log('deviceId:' + app.globalData.bluetoothDeviceId);
      console.log('serviceId:' + app.globalData.writeServiceId);
      console.log('characteristicId:' + app.globalData.writeCharaterId);

      wx.writeBLECharacteristicValue({
        deviceId: app.globalData.bluetoothDeviceId,
        serviceId: app.globalData.writeServiceId,
        characteristicId: app.globalData.writeCharaterId,
        value: buf,
        success: function success(res) {
          console.log('写入成功', res);
        },
        fail: function fail(e) {
          console.error('写入失败', e);
        },
        complete: function complete() {
          currentTime++;
          if (currentTime <= loopTime) {
            that.currentTime = currentTime;
            console.log('buff', buff);
            that.Send(buff);
          } else {
            wx.showToast({
              title: '打印成功！' });

            if (currentPrint == printNum) {
              that.looptime = 0;
              that.lastData = 0;
              that.currentTime = 1;
              that.isReceiptSend = false;
              that.isLabelSend = false;
              that.currentPrint = 1;
            } else {
              currentPrint++;
              that.currentPrint = currentPrint;
              that.currentTime = 1;
              console.log('开始打印');
              that.Send(buff);
            }
          }
        } });

    },
    /** 格式 YYYY/yyyy/YY/yy 表示年份
        * MM/M 月份
        * W/w 星期
        * dd/DD/d/D 日期
        * hh/HH/h/H 时间
        * mm/m 分钟
        * ss/SS/s/S 秒
        **/
    //---------------------------------------------------
    getMoment: function getMoment() {
      var formatTime = function formatTime(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return "".concat([year, month, day].map(formatNumber).join('-'));
      };

      var getNowDate = function getNowDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        return [year, month].map(formatNumber).join('-');
      };

      var formatNumber = function formatNumber(n) {
        n = n.toString();
        return n[1] ? n : "0".concat(n);
      };
      return formatTime(new Date());
    } },

  onLoad: function () {var _onLoad = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(options) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              this.option = JSON.parse(decodeURIComponent(options.data));
              console.log('option', this.option);
              // this.boxNum = options.boxNum;
              this.labelNum = this.option.labelNum;
              this.printInfo = this.option;
              console.log(this.getMoment());case 5:case "end":return _context.stop();}}}, _callee, this);}));function onLoad(_x) {return _onLoad.apply(this, arguments);}return onLoad;}(),

  onUnload: function onUnload() {
    // wx.closeBLEConnection({
    // 	deviceId: app.globalData.bluetoothDeviceId,
    // 	success(res) {
    // 		app.globalData.bluetoothDeviceId = '';
    // 	}
    // });
  } };exports.default = _default;

/***/ }),

/***/ 712:
/*!******************************************************************************************!*\
  !*** F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../软件/HBuilderX.3.2.16.20211122/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./print.vue?vue&type=style&index=0&lang=scss& */ 713);
/* harmony import */ var _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_2_16_20211122_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_print_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 713:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/文环宇/项目/1802/1802/pagesA/pages/print/print.vue?vue&type=style&index=0&lang=scss& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[698,"common/runtime","common/vendor","pagesA/common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pagesA/pages/print/print.js.map