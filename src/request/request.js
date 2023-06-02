
import Vue from 'vue';
import BuildConfig from "@/build/BuildConfig";
import {isJSON} from '@/utils/util'
import {ESLog} from "@extscreen/es-log";
const baseUrl = BuildConfig.TEST_ENV ? "" : "" // 这里设置你所需要的请求域名，满足测试环境还是生产环境

export default {

  /**+
   * post
   * @param domain 域名
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  postUrl(domain ,url, data) {
    return this.basePost("POST", domain, url, data);
  },
  put(url, data) {
    return this.basePost("PUT", baseUrl + "/v1", url, data);
  },

  delete(url, data) {
    return this.basePost("DELETE", baseUrl, url, data);
  },

  get(url) {
    return this.get(baseUrl, url);
  },

  /**
   * params:
   *  domain: 域名
   *  url: 接口地址
   *  params：get所需的参数，不需要可以不传
   *  normalCode：正确返回的接口响应码，例如某接口200为正常，则填200；0为正常则填0
   * **/

  get(domain, url, params, normalCode) {
    return new Promise((resolve, reject) => {
      const requestUrl = domain + url + params
      fetch(requestUrl, {
        method: "GET",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.status === 200) {
            let body = JSON.parse(response.body);
            /**
             * 注意这里的code值是否符合当前接口的正常返回值
             * 有一个接口没code......只能拿'success'字段作为判断请求
             * **/
            if (body.code&&body.code === normalCode) {
              resolve(body.data)
            } else if (body.success) {
              if(body.weatherType){
                resolve(body.weatherType)
              }else if(body.provinces||body.tbxzq||body.zxs){
                resolve([...body.provinces,...body.tbxzq,...body.zxs])
              }
            }
            else {
              reject({
                code: body.code,
                message: body.message
              })
            }
          } else {
            reject({
              code: response.status,
              message: '服务器忙，请稍后重试！'
            })
          }
        })
        .catch(err => {
          console.log('--URL的ERR----',err)
          reject({
            code: '-1',
            message: '发生错误，请稍后重试！'
          })
        })
    })
  },


  basePost(method, baseUrl, url, data, resultNeedObject) {
    return new Promise((resolve, reject) => {
      const requestUrl = baseUrl + url
      const baseParams = Vue.prototype.requestBody
      let requestData = {...baseParams, ...data}
      fetch(requestUrl, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })
        .then(response => {
          if (ESLog.isLoggable(ESLog.DEBUG)) {
            console.log(requestUrl,JSON.parse(response.body),requestData,'响应数据', response.status, JSON.stringify(requestData));
          }
          if (response.status === 200) {
            if (!isJSON(response.body)) {
              reject({
                code: response.status,
                message: response.body
              })
              return
            }
            let body = JSON.parse(response.body);
            if (body.code === 0) {
              if (resultNeedObject) {
                resolve({
                  data: body.data,
                  message: body.message
                })
              } else {
                resolve(body.data)
              }
            } else {
              reject({
                code: body.code,
                message: body.message
              })
            }
          }
          else {
            reject({
              code: response.status,
              message: '服务器忙，请稍后重试！'
            })
          }
        })
        .catch(err => {
          reject({
            code: '-1',
            message: '发生错误，请稍后重试！'
          })
        })
    })
  },
}
