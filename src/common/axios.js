import axios from 'axios'
import qs from 'qs'
import baseURL from './url'
import router from '../router'
import ElementUI from 'element-ui'

export default function(url='',data={},params={},headers,method='get'){
   
    let pa = {},
        da = {},
        token = localStorage._Mjb_token;
        
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
        timeout:60000,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        method:method,  
        withCredentials:true
    })

}

axios.interceptors.response.use(response => {
    let d = response.data;
    if(d.code == 300){
        router.push('/login');
    }else if(d.code == 1 && !d.response.qiNiuToken){
        ElementUI.Message({
            message: '请求异常',
            type: 'warning'
        })
    }
    return response
},error => {
    console.log(error)
    return Promise.reject(error)
})