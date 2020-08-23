export default {
    state: {
        counter: 33
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