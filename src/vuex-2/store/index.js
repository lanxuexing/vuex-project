import ApplyMixin from './mixin'
// import { forEachValue } from './util'
import ModuleCollection from './module/module-collection'
import { forEachValue } from './util';

export let Vue;

// 对当前模块进行操作，即：遍历所有actions、mutations、getters... 把他们都定义到收集器上边
const installModule = (store, rootState, path, module) => {
    // 将所有的子模块的状态安装到父模块的状态上边
    if (path.length > 0) { // vuex可以动态的添加模块
        let parent = path.slice(0, -1).reduce((memo, current) => {
            return memo[current]
        }, rootState)
        // 如果这个对象本身不是响应式的，那么Vue.set()相当于：obj[属性] = 值
        Vue.set(parent, path[path.length - 1], module.state)
    }

    module.forEachMutation((mutation, key) => {
        store._mutations[key] = (store._mutations[key] || [])
        store._mutations[key].push((payload) => {
            mutation.call(store, module.state, payload)
        })
    })

    module.forEachAction((action, key) => {
        store._actions[key] = (store._actions[key] || [])
        store._actions[key].push((payload) => {
            action.call(store, store, payload)
        })
    })

    module.forEachGetter((getter, key) => {
        // 模块中getter的名字重复会覆盖
        store._wrappedGetters[key] = function () {
            return getter(module.state)
        }
    })

    module.forEachChild((child, key) => {
        // 递归加载模块
        installModule(store, rootState, path.concat(key), child)
    })
}


function resetStoreVM(store, state) {
    const computed = {} // 定义计算属性
    store.getters = {} // 定义store中的getters

    forEachValue(store._wrappedGetters, (fn, key) => {
        computed[key] = () => {
            return fn()
        }
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    })

    store._vm = new Vue({
        data: {
            $$state: state // 把根状态直接变成响应式的
        },
        computed
    })
}

// 容器的初始化
export class Store {
    /**
     * options就是new Vuex.Store传进来的选项：
     * @param state?: S | (() => S);
     * @param getters?: GetterTree<S, S>
     * @param actions?: ActionTree<S, S>
     * @param mutations?: MutationTree<S>
     * @param modules?: ModuleTree<S>
     * @param plugins?: Plugin<S>[]
     * @param strict?: boolean
     * @param devtools?: boolean
     */
    constructor(options) {
        const state = options.state // 数据变化要更新视图，Vue的核心逻辑是依赖收集
        this._actions = {}
        this._mutations = {}
        this._wrappedGetters = {}

        // 1. 数据格式化，Tree（PS：模块收集）
        this._modules = new ModuleCollection(options)

        // 2. 安装，根模块的状态要将子模块通过模块名定义在根上边
        installModule(this, state, [], this._modules.root)

        // 3. 创建实例，将状态和getters都定义到当前的vm上
        resetStoreVM(this, state)

        console.log(this._actions, this._mutations, this._wrappedGetters)
        console.log(this._modules)
    }

    // 属性访问器
    get state() {
        return this._vm._data.$$state
    }

    // 保证this指向，始终指向当前stote实例
    commit = (type, payload) => {
        // 调用commit，其实就是去找绑定好的mutations
        console.log('用户commit: ', this._mutations)
        this._mutations[type].forEach(mutation => mutation.call(this, payload))
    }

    // 保证this指向，始终指向当前stote实例
    dispatch = (type, payload) => {
        console.log('用户dispatch: ', this._actions)
        this._actions[type].forEach(actions => actions.call(this, payload))
    }
}


/**
 * 插件的安装，Vue.use()方法会默认调用插件的install方法，此方法中的参数就是Vue的构造函数
 * 即：Vue.use = function (plugin) {
 *        plugin.install(this)
 *    }
 */
export const install = (_Vue) => {
    // _Vue是Vue的构造函数，谁使用了插件谁就会把Vue的实例传进来
    Vue = _Vue; // 暴露到全局

    // 将根组件中注入store分配给每一个组件（包含子组件），通过Vue.mixin()
    ApplyMixin(Vue)
}