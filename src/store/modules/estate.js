import Vue from 'vue'
// 这里定义初始值
let _this = Vue.prototype;
let state = {
    buildingId:''
};

const mutations = {
    changeBuildingId:function(state,id){
        state.buildingId = id
    },
};

//事件触发后的逻辑操作
const actions = {
    buildingIdAction:function({state,commit,rootState},id){
        commit('changeBuildingId',id)
    },
};

const getters = {
    GetBuildingId:function(state,getters,rootState){
        return state.buildingId
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}