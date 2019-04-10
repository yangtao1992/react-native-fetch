
	
	参数params为json对象，如果里面某个字段需要通过MD5加密来获得SIGN值，如SIGN = md5(appTag=test&uid=1&secret_key=SECRET_KEY)，使用如下：
	let params = {'appTag':'mms','uid':'1'};
    params.sign = SignUtils.getSign(params);
	
	md5加密采用的是crypto-js第三方库，安装命令：npm install crypto-js，详细用法请参考https://www.npmjs.com/package/crypto-js
	
	getSplicingUrl为拼接地址方法，如：https://www.yangt.com/data?appTag=mms&uid=1&sign=123

	//GET请求
    get(url,params){
        if(params){
			//url地址参数拼接
            url = SignUtils.getSplicingUrl(url,params);
        }
        .......
    }