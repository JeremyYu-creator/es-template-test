<template>
  <div id="root">
    <es-router-view/>
  </div>
</template>

<script>
import {ESLog} from "@extscreen/es-log";
import {
  ESApplication,
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
      this.initLog();
      // Vue.Native.callNative('FocusModule', 'setDefaultFocusInnerBorderEnable',false);
      return Promise.resolve()
        .then(() => this.initLog())
        .then(() => Promise.all([
          RuntimeDeviceManager.init(),
        ]))
        .then(() => RequestManager.init())
        .then(() => RequestManager.initUserInfo())
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
