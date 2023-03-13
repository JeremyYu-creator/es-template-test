<template>
  <div id="root">
    <es-router-view/>
  </div>
</template>

<script>
import {ESLog} from "@extscreen/es-log";
import {
  ESApplication,
  ESDevelopManager,
  ESDeviceManager,
  ESNetworkManager,
} from '@extscreen/es-core';
import {RuntimeDeviceManager} from "@extscreen/es-runtime";
import RequestManager from "@/request/RequestManager";
import BuildConfig from '@/build/BuildConfig'
import Vue from 'vue'
export default {
  name: 'ESApp',
  /**
   * 集成ESApplication
   */
  mixins: [ESApplication],
  data() {
    return {
      pageParams: {},
    };
  },
  methods: {
    /**
     * ESApplication 生命周期: onESCreate();
     */
    onESCreate(props) {
      // saveEsAppBrowseRecord(BuildConfig.packageName)
      // console.log('----storage1------',BuildConfig.packageName)
      this.initLog();
      Vue.Native.callNative('FocusModule', 'setDefaultFocusInnerBorderEnable',false);
        return Promise.resolve()
        .then(() => Promise.all([
          RuntimeDeviceManager.init(),
          EsModuleManager.init(),
          ESDevelopManager.init(),
          ESDeviceManager.init(),
          ESNetworkManager.init(),
        ]))
          .then(() => UserManager.init())
        .then(() => RequestManager.init())
    },
    /**
     * 初始化ESLog
     */
    initLog() {
      if (BuildConfig.DEBUG) {
        ESLog.setMinimumLoggingLevel(ESLog.VERBOSE);
      } else {
        ESLog.setMinimumLoggingLevel(ESLog.ERROR);
      }
    },
  },
};
</script>

<style scoped>
#root {
  width: 1920px;
  height: 1080px;
}
</style>
