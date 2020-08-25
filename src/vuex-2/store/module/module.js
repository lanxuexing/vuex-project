import { forEachValue } from '../util'

class Module {
    constructor(newModule) {
        this._raw = newModule // 原来的模块（用户自定义）
        this._children = {} // 模块的儿子
        this.state = newModule.state // 当前模块的状态
    }

    get namespanced() {
        return !!this._raw.namespanced
    }

    getChild(key) {
        return this._children[key]
    }

    addChild(key, module) {
        this._children[key] = module
    }

    // 扩展模块的方法
    forEachMutation(fn) {
        if (this._raw.mutations) {
            forEachValue(this._raw.mutations, fn)
        }
    }

    forEachAction(fn) {
        if (this._raw.actions) {
            forEachValue(this._raw.actions, fn)
        }
    }

    forEachGetter(fn) {
        if (this._raw.getters) {
            forEachValue(this._raw.getters, fn)
        }
    }

    forEachChild(fn) {
        forEachValue(this._children, fn)
    }
}

export default Module