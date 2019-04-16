import axios from 'axios'
import {env} from './env'
import CacheUtils from '@souche-f2e/souche-util/lib/cache'

CacheUtils.setCookie('_security_token','1th3B_26cdf016-e610-11e7-918b-0050569301c0')

export default async (url = '', data = {}, type = 'GET', typeurl = '', method = 'fetch') => {
    data['token'] = CacheUtils.getCookie('_security_token')
    type = type.toUpperCase()
    if (env.SERVER_URL[typeurl]) {
        url = env.SERVER_URL[typeurl] + url
    }

    if (method == 'fetch') {
      const requestConfig = {
        method: type,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // token: CacheUtils.getCookie('_security_token') || '',
        },
        mode: 'cors',
        cache: 'no-cache',
      };
      if (type == 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach((key) => {
          dataStr += `${key}=${data[key]}&`;
        });
        if (dataStr !== '') {
          dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
          url = `${url}?${dataStr}`;
        }
        delete(data['token'])
      }
      if (type == 'POST') {
        Object.defineProperty(requestConfig, 'body', {
          value: delete(data['token']),
        });
        url = url+ `?token=` + `${CacheUtils.getCookie('_security_token')}`
       }
      try {
        const instance = axios.create({
          baseURL: '',
          timeout: 25000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // token: CacheUtils.getCookie('_security_token') || '',
          },
          mode: 'cors',
          cache: 'no-cache',
        });
        const response = await instance
          .request({
            method: type,
            url,
            data,
          })
          .catch((error) => {
            console.log(error);
          });
        const responsJson = await response.data;
        return responsJson;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
