import SignUtils from "../util/SignUtils";
let instance = null;
let requestGet = {
    method: 'GET',
};
let requestPost = {
    method: 'POST',
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'userToken': ''
    },
    body:'',
};
let timeout;

export default class HttpUtil{

    static getInstance(){
        if(!instance){
            instance = new HttpUtil();
        }
        return instance;
    }

    // GET请求
    get(url,params){
        url = params ? SignUtils.getSplicingUrl(url,params) : url;
        console.log("url ========请求地址==================>"+url);
        return this.connect(url,requestGet);
    }

    //POST请求
    post(url,bodyData,token){
        console.log("url ====>"+url+"，body ====>"+JSON.stringify(bodyData)+"，token ====>"+token);
        requestPost['headers']['userToken'] = token;
        requestPost.body = JSON.stringify(bodyData);
        return this.connect(url,requestPost);
    }

    requestData(url,requestWay){
        return new Promise(function(resolve,reject){
            fetch(url,requestWay).then((response)=>{
                resolve(response);
            }).catch((err)=>{
                reject(err);
            })
        });
    }

    timeOut(){
        return new Promise(function(resolve,reject){
            timeout = setTimeout(function(){
                reject('请求超时');
            }, 30000);
        });
    }

    connect(url,requestWay){
        return new Promise(function(resolve,reject){
            Promise
                .race([instance.requestData(url,requestWay),instance.timeOut()])
                .then(function(response){
                    if(timeout)clearTimeout(timeout);
                    if(response.ok){
                        resolve(response.json());
                    }else{
                        console.log("========请求失败==================>"+JSON.stringify(response.json));
                        reject(response.json())
                    }
                })
                .catch(function(err){
                    console.log("========请求异常==================>"+err);
                    if(timeout)clearTimeout(timeout);
                    reject(err);
                });
        });
    }
}