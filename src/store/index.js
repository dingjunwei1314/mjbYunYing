import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

// 这里定义初始值
let state = {
    navStyle:{
        width:'160px',
        flex:' 0 0 160px'
    },
    mainLoading:false,
    defaultIndex:'',
    provinceValue:"全国",
    cityValue:"全国"
};

const mutations = {
    changeNavStyle:function(state,n){
        state.navStyle=n
    },
    changeMainLoading:function(state,n){
        state.mainLoading=n
    },
    changedefaultIndex:function(state,n){
        state.defaultIndex=n
    },
    SETPROVINCEVAlUE(state) {
      state.provinceValue = 1;
      state.cityValue = "东城区"
    }
};

//事件触发后的逻辑操作
const actions = {
    navStyleAction:function({commit},n){
        commit('changeNavStyle',n)
    },
    mainLoadingAction:function({commit},n){
        commit('changeMainLoading',n)
    },
    defaultIndexAction:function({commit},n){
        commit('changedefaultIndex',n)
    },
    setProvinceValue:function({commit}) {
    commit('SETPROVINCEVAlUE')
  }
};


const getters = {
    GetNavStyle:function(state){
        return state.navStyle
    },
    GetMainLoading:function(state){
        return state.mainLoading
    },
    GetDefaultIndex:function(){
        return state.defaultIndex
    },
    getProvinceValue : function() {
      return state.provinceValue
    },
    getCityValue : function() {
      return state.cityValue
    }
};


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
