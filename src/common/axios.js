import axios from 'axios'
import qs from 'qs'

export default function(url='',data={},params={},headers,method='get'){
   
    // let baseURL='http://192.168.1.193:8088/',
    // let baseURL='http://192.168.1.64:8088/',
    // let baseURL='http://192.168.1.240:8088',
    let baseURL='http://192.168.1.243:8088/',
    // let baseURL='http://47.93.185.205:8081/maijiabangbackstate-1.0-SNAPSHOT',
    // let baseURL='http://47.95.233.255:8081/maijiabangbackstate-1.0-SNAPSHOT',
    // let baseURL='http://47.95.233.255:8082/maijiabangReport-1.0-SNAPSHOT',
        pa = {},
        da = {},
        token = localStorage.token;
    
    if(method == 'post'){
        data.platform = 3
        data.requestTime = new Date().getTime()
        data.uniqueId = ''
        data.versionName = ''
        data.systemVerion = ''
        data.phoneBand = ''
        data.token = token
        da = qs.stringify({d:JSON.stringify(data)})
    }

    if(method == 'get'){
        params.platform = 3
        params.requestTime = new Date().getTime()
        params.uniqueId = ''
        params.versionName = ''
        params.systemVerion = ''
        params.phoneBand = ''
        params.token = token
        pa = {d:params}
    }
    
    return axios({
        url:url,
        baseURL:baseURL,
        responseType:'json',
        data:da,
        params:pa,
        timeout:15000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method:method,  
        withCredentials:true
    })

}