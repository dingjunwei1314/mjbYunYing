import axios from 'axios'

export default function(url='',data={},params={},headers={},method='get'){
    return axios({
        url:url,
        baseURL:'http://localhost:8080/static/api',
        responseType:'json',
        data:data,
        params:params,
        headers: headers,
        method:method,  
        withCredentials:true
    })
}