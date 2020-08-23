import { forEachValue } from "../util"

/**
 * 目标是格式成以下的数据格式：
 * this.root = {
 *      _raw: '根模块',
 *      _children: {
 *          a: {
 *              _raw: 'a模块',
 *              _children: {
 *                  c: {
 *                      _raw: 'c模块',
 *                      _children: {},
 *                      state: 'c的状态'
 *                  },
 *              },
 *              state: 'a的状态'
 *          },
 *          b: {
 *              _raw: 'b模块',
 *              _children: {},
 *              state: 'b的状态'
 *          }
 *      },
 *      state: '根模块的状态'
 * }
 */
class ModuleCollection {
    constructor(options) {
        // 注册模块，使用stack结构[队列]
        this.register([], options)
    }

    register(path, rootModule) {
        let newModule = {
            _raw: rootModule, // 原来的模块（用户自定义）
            _children: {}, // 模块的儿子
            state: rootModule.state // 当前模块的状态
        }

        if (path.length == 0) { // 根模块
            this.root = newModule
        } else {
            // [a]
            // [a, c]
            // [a, b, c, d]
            let parent = path.slice(0, -1).reduce((memo, current) => {
                return memo._children[current]
            }, this.root)
            parent._children[path[path.length - 1]] = newModule

            // 错误代码，都跑到根上了
            // this.root._children[path[path.length - 1]] = newModule
        }

        if (rootModule.modules) {
            forEachValue(rootModule.modules, (module, moduleName) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}

export default ModuleCollection