import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    nodes: [],
};

const mutations = {
    createItem(aState, obj) {
        aState.nodes.push(obj);
    },
    updateItem(aState, obj) {
        const index = aState.nodes.findIndex(elems => elems.id === obj.id);
        if(index !== -1) {
            Vue.set(aState.nodes, index, obj);
        } else {
            // Woah, was a node created on the server without updating?
            throw new Error("AHHH");
        }
    },
}

const actions = {
    addNode: ({ commit }, obj) => commit('createItem', obj),
    updateNode: ({ commit }, obj) => commit('updateItem', obj),
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
});
