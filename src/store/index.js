import Vue from 'vue'
// import Vuex from 'vuex'

function persists() {
    return function (store) { // store是默认传递的
        // 加载时，反显状态
        let data = localStorage.getItem('VUEX:STATE')
        if (data) {
            store.replaceState(JSON.parse(data))
        }
        // 订阅函数，原生支持
        store.subscribe((mutation, state) => {
            localStorage.setItem('VUEX:STATE', JSON.stringify(state))
        })
    }
}

// 1. 简易版本（不包含module）
// import Vuex from '@/vuex-1'

// 2. 完整版本（含module）
import Vuex from '@/vuex-2'
import a from './module/a'
import b from './module/b'

/**
 * 1. Vuex是一个对象，具有一个install方法
 * 2. Vuex中有一个Store类
 * 3. 混入到组件中，增加store属性
 */ 
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
    },
    modules: {
        a,
        b
    },
    plugins: [
        persists()
    ]
})

export default store;