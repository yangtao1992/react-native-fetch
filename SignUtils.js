import React, {Component} from 'react'
import CryptoJS from 'crypto-js';


let PUSH_SECRET_KEY = '和后台对应的加密key';

//自定义签名工具类
export default class SignUtils extends React.Component {

    //获取sign签名，obj为json对象
    static getSign(obj){
        let paramsArray = [];
        for (let k of Object.keys(obj)) {
            paramsArray.push(k + '=' + obj[k]);
        }
        paramsArray.push('secret_key='+PUSH_SECRET_KEY);
        let params = paramsArray.join('&');
        return CryptoJS.MD5(params);
    }

    //获取url拼接地址，参数传json对象
    static getSplicingUrl(url,obj){
        let paramsArray = [];
        for (let k of Object.keys(obj)) {
            paramsArray.push(k + '=' + obj[k]);
        }
        if(url.search(/\? /)=== -1){
            url += '?' + paramsArray.join('&')
        } else {
            url += '&' + paramsArray.join('&')
        }
        return url;
    }
}
