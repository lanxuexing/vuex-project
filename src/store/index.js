import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: { // --> 相当于data
        counter: 0
    },
    getters: { // --> 相当于计算属性couputed
        /**
         * getters具有的所有可选参数：
         * @param state: S
         * @param getters: any
         * @param rootState: R
         * @param rootGetters: any
         */
        mCounter(state) {
            return state.counter + 10
        }
    }, 
    mutations: { // --> 同步方法更改state
        /**
         * mutations具有的所有可选参数：
         * @param state: S
         * @param payload?: any
         */
        changeCounter(state, payload) {
            state.counter += payload
        }
    },
    actions: { // --> 异步方法提交给mutations
        /**
         * actions具有的所有可选参数：
         * @param this: Store<R> -->  {
         *                                state,      // 等同于 `store.state`，若在模块中则为局部状态
         *                                rootState,  // 等同于 `store.state`，只存在于模块中
         *                                commit,     // 等同于 `store.commit`
         *                                dispatch,   // 等同于 `store.dispatch`
         *                                getters,    // 等同于 `store.getters`
         *                                rootGetters // 等同于 `store.getters`，只存在于模块中
         *                            }
         * @param payload?: any
         */
        changeCounter({ commit }, payload) {
            setTimeout(() => {
                commit('changeCounter', payload)
            }, 1000);
        }
    }
})

export default store;