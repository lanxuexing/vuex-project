import ApplyMixin from './mixin'
import { forEachValue } from './util'

export let Vue;

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

        // 响应式数据，即：new Vue({ data })

        const computed = {}

        // 2. 处理getters属性，默认具有缓存机制，computed带有缓存（即：多次取值的时候，如果值不变是不会重新取值的）
        this.getters = {}
        forEachValue(options.getters, (fn, key) => {
            // 将用户的getters定义在实例上边
            computed[key] = () => {
                return fn(this.state)
            }
            // 取值的时候执行计算属性的值
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]
            })
        })

        // 1. 添加状态逻辑：数据在哪使用，就在哪进行依赖收集
        this._vm = new Vue({
            // 会将$$state对应的对象，都通过Object.defindProperty()来进行属性劫持
            data: {
                // 属性如果是通过$开头的，Vue内部默认不会将这个属性挂载到vm上，源码会默认将这些$开头的属性挂载到_data属性上边
                $$state: state
            },
            computed
        })

        // 3. 实现mutations
        this.mutations = {}
        forEachValue(options.mutations, (fn, key) => {
            this.mutations[key] = (payload) => fn(this.state, payload)
        })

        // 3. 实现actions
        this.actions = {}
        forEachValue(options.actions, (fn, key) => {
            this.actions[key] = (payload) => fn(this, payload)
        })

        console.log('vm: ', this._vm)
    }

    // 属性访问器
    get state() {
        return this._vm._data.$$state
    }

    // 保证this指向，始终指向当前stote实例
    commit = (type, payload) => {
        // 调用commit，其实就是去找绑定好的mutations
        this.mutations[type](payload)
    }

    // 保证this指向，始终指向当前stote实例
    dispatch = (type, payload) => {
        this.actions[type](payload)
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