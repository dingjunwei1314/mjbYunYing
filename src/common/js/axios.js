import axios from 'axios'

export default function(url='',data={},params={},headers={},method='get'){
    console.log(localStorage.token);
    let token=localStorage.token,baseURL='';
    if(token==undefined||token==''){
        baseURL='http://easy-mock.com/mock/5988219ea1d30433d857e30a/yunke'
    }else{
        baseURL='http://easy-mock.com/mock/5988219ea1d30433d857e30a/yunke'
        data.user_token=token;
    }
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
