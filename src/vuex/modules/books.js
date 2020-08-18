import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
  tabIndex: 0,
  member_id: 1
	
}
	
const getters = {
	//get_choose_hall_id: state => state.choose_hall_id,

}
	
const actions = {
	//请求相关内容
	// requestCorrelation: ({commit,state}) => {
	// 	//commit('setCorrelation',result);
		
	// },
		
}
	
const mutations = {
	set_tabIndex: (state,index) => {
		state.tabIndex = index;
	},
	
	
	
}
	

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}



