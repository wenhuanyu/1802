<template>
  <view>
    <view class="pages">
      <!-- <view class="baozhuang_name">物料名称：{{ printInfo.name }}</view> -->
      <button style="background:#4B8EFF" class="printbtn" type="primary" @click="searchBluetooth" :loading="isScanning">
        1.开始搜索
      </button>

      <view class="device_list">
        <view v-for="(item, index) in devicesList" @click="connectBluetoothSettings" :data-index="index"
              class="device_item">
          <view class="deviceId">
            <view>deviceId:{{ item.deviceId }}</view>
            <text v-if="show_id == item.deviceId">已连接</text>
          </view>
          <div class="name">name:{{ item.name }}</div>
        </view>
      </view>

      <button style="background:#4B8EFF" class="printbtn" type="primary" @click="labelTest" :loading="isLabelSend"
              :disabled="isLabelSend">2.标签打印
      </button>

      <canvas canvas-id="edit_area_canvas"></canvas>
    </view>
  </view>
</template>

<script>
const app = getApp();
let tsc = require('../../../gprint/tsc.js');
let esc = require('../../../gprint/esc.js');
let util = require('../../../gprint/hash.js');

export default {
  data() {
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
	  option:{},
      // boxNum: '',
      labelNum: '',
    };
  },
  methods: {
    /**
     * 蓝牙搜索
     */
    searchBluetooth: function () {
      var that = this;
      //判断蓝牙是否打开
      wx.openBluetoothAdapter({
        success: function (res) {
          console.log(res);
          wx.getBluetoothAdapterState({
            success: function (res) {
              console.log(res);
              if (res.available) {
                if (res.discovering) {
                  wx.stopBluetoothDevicesDiscovery({
                    success: function (res) {
                      console.log(res);
                    }
                  });
                }
                that.checkPemission();
              } else {
                wx.showModal({
                  title: '提示',
                  content: '请开启手机蓝牙后再试'
                });
              }
            }
          });
        },
        fail: function (res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '蓝牙初始化失败，请打开蓝牙'
          });
        }
      });
    },
    /**
     * android 6.0以上需授权地理位置权限
     */
    checkPemission: function () {
      var that = this;
      var systemInfo = wx.getSystemInfoSync();
      var platform = systemInfo.platform;
      if (platform == 'ios') {
        that.getBluetoothDevices();
      } else if (platform == 'android') {
        let system = systemInfo.system;
        let system_no = system.replace('android', '');
        system_no = system.replace('Android', '');
        if (parseInt(system_no) > 5) {
          console.log(123);
          wx.getSetting({
            success: function (res) {
              console.log(res);
              if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                  scope: 'scope.userLocation',
                  complete: function (res) {
                    console.log(res);
                    that.getBluetoothDevices();
                  }
                });
              } else {
                that.getBluetoothDevices();
              }
            }
          });
        }
      }
    },
    /**
     * 获取蓝牙设备信息
     */
    getBluetoothDevices: function () {
      var that = this;
      console.log('start search');
      wx.showLoading({
        title: '正在加载'
      });
      that.isScanning = true;
      wx.startBluetoothDevicesDiscovery({
        success: function (res) {
          console.log(res);
          setTimeout(function () {
            wx.getBluetoothDevices({
              success: function (res) {
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
              }
            });
          }, 3000);
        }
      });
    },
    /**
     * 开始连接蓝牙设置
     */
    connectBluetoothSettings: function (e) {
      var that = this;
      let index = e.currentTarget.dataset.index;
      let deviceId = that.devicesList[index].deviceId;
      console.log(index);
      wx.stopBluetoothDevicesDiscovery({
        success: function (res) {
          console.log(res);
        }
      });
      that.serviceId = 0;
      that.writeCharacter = false;
      that.readCharacter = false;
      that.notifyCharacter = false;
      console.log(deviceId);
      wx.showLoading({title: '请稍等'});
      title: '正在连接',
          wx.createBLEConnection({
            deviceId: deviceId,
            success: function (res) {
              console.log(res);
              app.globalData.bluetoothDeviceId = deviceId;
              that.show_id = deviceId;
              that.getBLEDeviceServices();
            },
            fail: function (e) {
              wx.showModal({
                title: '提示',
                content: '连接失败'
              });
              console.log(e);
              wx.hideLoading();
            },
            complete: function (e) {
              console.log(e);
            }
          });
    },
    /**
     * 获取蓝牙设备所有服务
     */
    getBLEDeviceServices: function () {
      var that = this;
      console.log(app.globalData.bluetoothDeviceId);
      wx.getBLEDeviceServices({
        deviceId: app.globalData.bluetoothDeviceId,
        success: function (res) {
          console.log(res);
          that.services = res.services;
          that.getBLEDeviceCharacteristics();
        },
        fail: function (e) {
          console.log(e);
        },
        complete: function (e) {
          console.log(e);
        }
      });
    },
    /**
     * 获取蓝牙设备某个服务中所有特征值
     */
    getBLEDeviceCharacteristics: function () {
      var that = this;
      var list = that.services;
      var num = that.serviceId;
      var write = that.writeCharacter;
      var read = that.readCharacter;
      var notify = that.notifyCharacter;
      wx.getBLEDeviceCharacteristics({
        deviceId: app.globalData.bluetoothDeviceId,
        serviceId: list[num].uuid,
        success: function (res) {
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
                content: '找不到该读写的特征值'
              });
            } else {
              that.getBLEDeviceCharacteristics();
            }
          } else {
            that.notifyBLECharacteristicValueChange();
          }
        },
        fail: function (e) {
          console.log(e);
        },
        complete: function (e) {
          console.log('write:' + app.globalData.writeCharaterId);
          console.log('read:' + app.globalData.readCharaterId);
          console.log('notify:' + app.globalData.notifyCharaterId);
        }
      });
    },
    /**
     * 启用低功耗蓝牙设备特征值变化时的 notify 功能
     */
    notifyBLECharacteristicValueChange: function () {
      console.log('deviceId:' + app.globalData.bluetoothDeviceId);
      console.log('serviceId:' + app.globalData.notifyServiceId);
      console.log('notifyCharaterId:' + app.globalData.notifyCharaterId);
      wx.hideLoading();
      wx.notifyBLECharacteristicValueChange({
        deviceId: app.globalData.bluetoothDeviceId,
        serviceId: app.globalData.notifyServiceId,
        characteristicId: app.globalData.notifyCharaterId,
        state: true,
        success: function (res) {
          wx.onBLECharacteristicValueChange(function (r) {
            // console.log(`characteristic ${r.characteristicId} has changed, now is ${r}`)
            console.log('onBLECharacteristicValueChange=', r);
          });
        },
        fail: function (e) {
          console.log('fail', e);
        },
        complete: function (e) {
          console.log('complete', e);
        }
      });
    },
    /**
     * 账单模式
     */
    sendData: function () {
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
    labelTest: function () {
      var that = this;
      let printInfo = that.printInfo;
	  console.log('printInfo',printInfo)
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
	  command.setText(40, 60, 'TSS24.BF2', 1, 1, `${printInfo.title}`);
	  command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  if(printInfo.text == 'luruyuzhi') {
		   command.setText(60, 90, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `已预支额：${printInfo.count_money}/（占总工程款${printInfo.rate}%)`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `预支金额：${printInfo.per_amount}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `金额大写：${printInfo.capital}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `卡号：${printInfo.bank_card}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `开户行：${printInfo.bank}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.pre_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `是否转账：${printInfo.transfer_text}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   if(printInfo.transfer_text == '是') {
		 	command.setText(330, 250, 'TSS24.BF2', 1, 1, `转账时间：${printInfo.zz_time}`);
		 	command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   }
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `操作员：${printInfo.sign}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `签名：${printInfo.sign}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  } else if(printInfo.text == 'lurujisuan') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `工序：${printInfo.the_gongxu}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `亩：${printInfo.number}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `单价：${printInfo.unit_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.pre_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `总价：${printInfo.total_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  }  else if(printInfo.text == 'luruzhongzhuanche') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `磅单号：${printInfo.pounds_sn}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `中转车：${printInfo.car_zhong}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `毛重：${printInfo.cargo_weight}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `毛重时间：${printInfo.cargo_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `皮重：${printInfo.gros_weight}/（误差${printInfo.wucha.errors},平均误差${printInfo.wucha.average})`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `皮重时间：${printInfo.gros_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `扣水份：${printInfo.k_moisture}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `净重：${printInfo.net_weight}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `日期：${printInfo.add_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `操作员：${printInfo.form_zhong_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `挖机：${printInfo.wj_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `油锯手：${printInfo.yjs_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `品名：${printInfo.pm_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `单位：T（吨）`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  }   else if(printInfo.text == 'lurudache') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `磅单号：${printInfo.pounds_sn}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `大车：${printInfo.car_da}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `净重：${printInfo.net_weight}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `出车时间：${printInfo.start_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `是否收单：${printInfo.shoudan_text}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		  if(printInfo.shoudan_text == '是') {
			   command.setText(330, 250, 'TSS24.BF2', 1, 1, `收单时间：${printInfo.single_time}`);
			    command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		  }
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `场地挖机：${printInfo.site_user_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `扣款：${printInfo.penalty}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `操作员：${printInfo.name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  } else if(printInfo.text == 'kanfayuzhi') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `职业：${printInfo.the_zhiye}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `已预支额：${printInfo.count_money}/（占总工程款${printInfo.rate}%)`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `预支金额：${printInfo.per_amount}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `金额大写：${printInfo.capital}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `卡号：${printInfo.bank_card}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `开户行：${printInfo.bank}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.pre_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `是否转账：${printInfo.transfer_text}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		  if(printInfo.transfer_text == '是') {
			command.setText(330, 250, 'TSS24.BF2', 1, 1, `转账时间：${printInfo.zz_time}`);
			 command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		  }
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `操作员：${printInfo.sign}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `签名：${printInfo.sign}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  } else if(printInfo.text == 'luruwei') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `职业：${printInfo.the_zhiye}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.add_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `项目：${printInfo.project}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `数量：${printInfo.unit}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `单价：${printInfo.unit_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `总工程款：${printInfo.total_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  } else if(printInfo.text == 'lurubu') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `职业：${printInfo.the_zhiye}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.add_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `数量：${printInfo.number}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `单价：${printInfo.unit_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `合计：${printInfo.total_price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  } else if(printInfo.text == 'lurukou') {
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `姓名：${printInfo.the_name}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `职业：${printInfo.the_zhiye}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `林班号：${printInfo.quartel_account}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `时间：${printInfo.add_time}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `项目：${printInfo.project}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `金额：${printInfo.price}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `备注：${printInfo.note}`);
		   command.setText(330, 250, 'TSS24.BF2', 1, 1, `${line}`);
	  }
	  
     
	  // command.setText(330, 280, 'TSS24.BF2', 1, 1, `日期（Date）：${that.getMoment()}`);
      // command.setPagePrint(that.labelNum);
      that.isLabelSend = true;
      that.prepareSend(command.getData());
    },
    /**
     * 准备发送数据
     */
    prepareSend: function (buff) {
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
    queryPrinterStatus: function () {
      var command = esc.jpPrinter.Query();
      command.getRealtimeStatusTransmission(1);
      this.returnResult = '查询成功';
    },
    /**
     * 分包发送
     */
    Send: function (buff) {
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
        success: function (res) {
          console.log('写入成功', res);
        },
        fail: function (e) {
          console.error('写入失败', e);
        },
        complete: function () {
          currentTime++;
          if (currentTime <= loopTime) {
            that.currentTime = currentTime;
			console.log('buff',buff)
            that.Send(buff);
          } else {
            wx.showToast({
              title: '打印成功！'
            });
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
        }
      });
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
    getMoment() {
      const formatTime = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        return `${[year, month, day].map(formatNumber).join('-')}`
      }

      const getNowDate = date => {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        return [year, month].map(formatNumber).join('-')
      }

      const formatNumber = n => {
        n = n.toString()
        return n[1] ? n : `0${n}`
      }
      return formatTime(new Date())
    }
  },
  onLoad: async function (options) {
	  this.option = JSON.parse(decodeURIComponent(options.data))
	  console.log('option',this.option)
    // this.boxNum = options.boxNum;
    this.labelNum = this.option.labelNum;
    this.printInfo = this.option;
    console.log(this.getMoment())
  },
  onUnload: function () {
    // wx.closeBLEConnection({
    // 	deviceId: app.globalData.bluetoothDeviceId,
    // 	success(res) {
    // 		app.globalData.bluetoothDeviceId = '';
    // 	}
    // });
  }
};
</script>

<style lang="scss">
page {
  background-color: #edf0f5;
}

.pages {
  margin: 20px;
}

.printbtn {
  margin-top: 20px;
  width: 100%;
  height: 80rpx;
  border-radius: 66rpx;
  background-color: #42c1ac;
  color: white;
  text-align: center;
  line-height: 80rpx;
}

.text {
  margin-top: 20px;
}

.input {
  background-color: #fff;
  height: 80rpx;
  margin-top: 20px;
  padding: 10px;
}

.device_list {
  margin: 20px 5px;
  border-radius: 5px;
  width: auto;
}

.device_item {
  border: 1px solid #aaa;
  padding: 10px;
  color: #666;
}

.device_item div {
  display: block;
}

.deviceId {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.deviceId text {
  color: #4b8eff;
  font-size: 24rpx;
  white-space: nowrap;
  margin-left: 20rpx;
}

.baozhuang_name {
  text-align: center;
}
</style>
