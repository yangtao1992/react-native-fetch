import SignUtils from "../util/SignUtils";
let instance = null;
let token = null;

export default class HttpUtil{

    static getInstance(){
		
        if(!instance){
			//可以在这做token值获取工作
			token = "123";
            instance = new HttpUtil();
        }
        return instance;
    }

    
    //GET请求
    get(url,params){
        if(params){
			//url地址参数拼接
            url = SignUtils.getSplicingUrl(url,params);
        }
        return new Promise(function(resolve, reject){
            fetch(url, {
                method: 'GET',
            })
                .then((response)=>{
                    if(response.ok){
                        return response.json();
                    } else {
                        reject(response.json())
                    }
                })
                .then((response)=>{
                    resolve(response);
                })
                .catch((err)=>{
                    reject({status:-1});
                })
        })
    }


    //POST请求
    post(url,bodyData){
        return new Promise(function(resolve, reject){
            fetch(url, {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                    'userToken': token
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:JSON.stringify(bodyData),
            })
        .then((response)=>{
                if(response.ok){
                    return response.json();
                } else {
                    reject(response.json())
                }
            })
        .then((response)=>{
                resolve(response);
            })
        .catch((err)=>{
                reject({status:-1});
            })
        })
    }
}