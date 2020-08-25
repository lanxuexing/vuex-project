/**
 * 1. Vuex是一个对象，具有一个install方法
 * 2. Vuex中有一个Store类
 * 3. 混入到组件中，增加store属性
 */
import { Store, install } from './store'

export * from './store/helpers'
export default {
    Store,
    install
}