import ApplyMixin from './mixin'
// import { forEachValue } from './util'
import ModuleCollection from './module/module-collection'

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
        // const state = options.state // 数据变化要更新视图，Vue的核心逻辑是依赖收集

        // 数据格式化，Tree
        this._modules = new ModuleCollection(options)
        console.log(this._modules)
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