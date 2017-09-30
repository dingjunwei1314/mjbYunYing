import axios from 'axios'

export default function(url='',data={},params,headers,method='get'){
    let token=localStorage.token,baseURL=''
    if(token==undefined||token==''){
        data.token=''
        baseURL='http://easy-mock.com/mock/59b0d677e0dc663341a070d2/example_1504761463460'
        // baseURL='http://192.168.2.200:8080'
    }else{
        baseURL='http://easy-mock.com/mock/59b0d677e0dc663341a070d2/example_1504761463460'
        // baseURL='http://192.168.2.200:8080'
        data.token=token;
    }
    data.platform="3";
    data.requestTime=new Date().getTime();
    data.uniqueId="";
    data.versionName="";
    data.systemVerion="";
    return axios({
        url:url,
        baseURL:baseURL,
        responseType:'json',
        data:data,
        params:params,
        headers: headers,
        method:method,  
        withCredentials:false
    })
}