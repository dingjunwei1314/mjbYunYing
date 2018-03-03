import Vue from 'vue'
// 这里定义初始值
let _this = Vue.prototype;
let state = {
    buildingId:'',
    reportId:'',
};

const mutations = {
    changeBuildingId:function(state,id){
        state.buildingId = id
    },
    changeReportId(state,id){
        state.reportId = id
    }
};

//事件触发后的逻辑操作
const actions = {
    buildingIdAction:function({state,commit,rootState},id){
        commit('changeBuildingId',id)
    },
    reportIdAction({state,commit,rootState},id){
        commit('changeReportId',id)
    }
};

const getters = {
    GetBuildingId:function(state,getters,rootState){
        return state.buildingId
    },
    GetReportId:function(state,getters,rootState){
        return state.reportId
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}