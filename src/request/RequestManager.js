import Vue from 'vue';
import BuildConfig from '@/build/BuildConfig';
import {
  ESDevelopManager,
  ESDeviceManager, ESManager,
} from '@extscreen/es-core';
import {RuntimeDeviceManager} from "@extscreen/es-runtime";
import {ESLog} from "@extscreen/es-log";
const TAG = 'REQUESTMANAGER'
class RequestManager {
  _requestBaseParams = {};
  init() {
    return new Promise((resolve, reject) => {
      try {
        this.initRequestBaseParams();
      } catch (e) {
      }
      resolve();
    });
  }
  initUserInfo(){
    return new Promise((resolve, reject) => {
      try {
        this.initUserRequestBaseParams();
        Vue.prototype.requestBody = {...Vue.prototype.requestBody,...this._requestBaseParams}
      } catch (e) {
        ESLog.e(TAG, `----INITIALIZE---initUserInfo---Error----requestBody will NULL >>>>>${e.errorMsg}`);
      }
      ESLog.d(TAG, `----INITIALIZE---initUserInfo---SUCCESS----requestBody >>>>>${JSON.stringify(Vue.prototype.requestBody)}`);
      resolve();
    });
  }
  initRequestBaseParams() {
    this.initDeveloperRequestBaseParams();
    this.initDeviceRequestBaseParams();
    this.initParamsRequestBaseParams();
    this.initUserRequestBaseParams();
    this.initRuntimeData()
    //
    Vue.prototype.requestBody = this._requestBaseParams;
  }
  initDeveloperRequestBaseParams(){
    this._requestBaseParams.developer = {
      apikey: ESDevelopManager.getAppKey(),
      secretkey: ESDevelopManager.getAppSecretKey(),
      packagename: BuildConfig.packageName,
      vercode: ESDevelopManager.getVersionCode(),
      vername: ESDevelopManager.getVersionName(),
      dynamicCode: BuildConfig.ES_APP_VERSION,
    };

  }
  initDeviceRequestBaseParams(){
    let mac = ESDeviceManager.getDeviceEthMac();
    if (mac === '') {
      mac = ESDeviceManager.getDeviceWifiMac();
    }
    //替换mac中的:并转成小写
    mac = mac.replace(/:/g, '')
      .toLowerCase();
    this._requestBaseParams.device = {
      brand: ESDeviceManager.getBuildBrand(),
      clientType: RuntimeDeviceManager.getDeviceType(),
      dnum: RuntimeDeviceManager.getDeviceId(),
      mac: mac,
      manufacturer: ESDeviceManager.getBuildManufacturer(),
      model: ESDeviceManager.getBuildModel()
    };

    //
    Vue.prototype.dnum = RuntimeDeviceManager.getDeviceId();
    Vue.prototype.mac = mac;
  }
  initParamsRequestBaseParams(){
    let channel = ESDevelopManager.getChannel().toUpperCase();
     if (channel === 'CH' || channel === 'DEV') {//DEV 默认给长虹渠道
       channel = 'CHANGHONG';
     }
     this._requestBaseParams.param = {
       channelCode: channel,
       versionCode: ESDevelopManager.getVersionCode(),
     };
     Vue.prototype.versionCode = ESDevelopManager.getVersionCode();
  }
  initUserRequestBaseParams() {
    // default
    this._requestBaseParams.user = {
      userId: '',
      userToken: '',
      nickname: '',
    };
  }
  initRuntimeData(){
    this._requestBaseParams.runtime = {
      sdkVersion: ESManager.getESSDKVersionName(),
      sdkCID: ESManager.getESSDKCid(),
      runtimeID: '',
      hostPackageName: ESDevelopManager.getPackageName(),
      hostVersion: ESDevelopManager.getVersionName(),
      hostChannel: ESDevelopManager.getChannel(),
      snCode: ''
    }
  }
}

export default new RequestManager();
