import Vue  from 'vue';
import Vuex from 'vuex';
import estate from './modules/estate';
import processmonitoring from './modules/processmonitoring';

Vue.use(Vuex)

// 这里定义初始值
let state = {
    navStyle:{
        width:'220px',
        flex:' 0 0 220px'
    },
    roleName:'未定义',
    mainLoading:false,
    defaultIndex:''
};

const mutations = {
    changeNavStyle(state,n){
        state.navStyle=n
    },
    changeMainLoading(state,n){
        state.mainLoading=n
    },
    changedefaultIndex(state,n){
        state.defaultIndex=n
    },
    changeRole(state,n){
        state.roleName = n;
    }
};

//事件触发后的逻辑操作
const actions = {
    navStyleAction({commit},n){
        commit('changeNavStyle',n)
    },
    mainLoadingAction({commit},n){
        commit('changeMainLoading',n)
    },
    defaultIndexAction({commit},n){
        commit('changedefaultIndex',n)
    },
    roleAction({commit},n){
        commit('changeRole',n)
    }
};

const getters = {
    GetMainLoading(state){
        return state.mainLoading
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        estate,
        processmonitoring
    }
})
