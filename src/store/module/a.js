import c from './c'

export default {
    namespaced: true,
    state: {
        counter: 11
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        changeCounter(state, payload) {
            state.counter += payload
        }
    },
    modules: {
        c
    }
}