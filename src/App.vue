<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>当前的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.state.counter }}</b>
    </p>
    <p>自定义的计数器值是: 
      <b style="font-size: 32px;">{{ this.$store.getters.mCounter }}</b>
    </p>
    <p>
      <button @click="$store.commit('changeCounter', 1)">同步修改计数器</button>
    </p>
    <p>
      <button @click="$store.dispatch('changeCounter', 2)">异步修改计数器</button>
    </p>
  </div>
</template>

<script>
export default { }
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
