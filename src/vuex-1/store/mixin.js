export default function ApplyMixin(Vue) {
    // 内部会把每一个生命周期方法拍平成一个数组
    Vue.mixin({
        beforeCreate: vuexInit,
    })
}

/**
 * 组件渲染顺序：父 --> 子
 */
function vuexInit() {
    console.log('beforeCreate...', this.$options.name)
    // 获取用户的所有选项
    const options = this.$options

    // 给所有的组件增加$store属性，并指向我们创建的store实例
    if (options.store) { // 根组件
        this.$store = options.store
    } else if (options.parent && options.parent.$store) { // 非根组件，即：儿子，孙子...
        this.$store = options.parent.$store
    }
}