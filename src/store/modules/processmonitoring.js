import Vue from 'vue'
// 这里定义初始值
let _this = Vue.prototype;
let state = {
    detailActiveName:'',
    panoramaActiveName:''
};

const mutations = {
    changeDetailActiveName:function(state,name){
        state.detailActiveName = name
    },
    changePanoramaActiveName:function(state,name){
        state.panoramaActiveName = name
    },
};

//事件触发后的逻辑操作
const actions = {
    detailActiveNameAction:function({state,commit,rootState},name){
        commit('changeDetailActiveName',name)
    },
    panoramaActiveNameAction:function({state,commit,rootState},name){
        commit('changePanoramaActiveName',name)
    },
};

const getters = {
    GetDetailActiveName:function(state,getters,rootState){
        return state.detailActiveName
    },
    GetPanoramaActiveName:function(state,getters,rootState){
        return state.panoramaActiveName
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}