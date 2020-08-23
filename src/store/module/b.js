export default {
    namespaced: true,
    state: {
        counter: 22
    },
    getters: {

    },
    actions: {

    },
    mutations: {
        changeCounter(state, payload) {
            state.counter += payload
        }
    }
}