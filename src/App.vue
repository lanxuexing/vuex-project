<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- 不使用辅助函数 -->
    <p>当前的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.state.counter }}</b>
    </p>
    <p>自定义的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.getters.mCounter }}</b>
    </p>
    <p>A模块的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.state.a.counter }}</b>
    </p>
    <p>B模块的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.state.b.counter }}</b>
    </p>
    <!-- 使用辅助函数 -->
    <p>辅助函数-当前的计数器值是: 
      <b style="font-size: 32px;">{{ counter }}</b>
    </p>
    <p>辅助函数-自定义的计数器值是: 
      <b style="font-size: 32px;">{{ mCounter }}</b>
    </p>
    <p>
      <button @click="$store.commit('changeCounter', 1)">同步修改计数器</button>
    </p>
    <p>
      <button @click="$store.dispatch('changeCounter', 2)">异步修改计数器</button>
    </p>
    <p>
      <button @click="$store.commit('a/changeCounter', 1)">同步修改A模块计数器</button>
    </p>
    <p>
      <button @click="$store.state.counter = parseInt((Math.random() * 100) + 1)">测试自定义Vuex</button>
    </p>
  </div>
</template>

<script>
// 引入自己的辅助函数
import { mapState, mapGetters } from '@/vuex-2'

export default {
  name: 'App',
  computed: {
    ...mapState(['counter']),
    // mapState等价于
    counter() {
      return this.$store.state.counter
    },
    ...mapGetters(['mCounter']),
    // mapGetters等价于
    mCounter() {
      return this.$store.getters.mCounter
    }
  },
  mounted() {
    console.log('测试一下我自己的Vuex: ', this.$store)
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  border: 1px solid #3eaf7c;
    border-radius: 4px;
    padding: 4px 8px;
    background: #3eaf7c;
    color: #FFF;
    outline: none;
    cursor: pointer;
}
button:hover {
  font-weight: bold;
}
</style>
