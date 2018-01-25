<template>
  <div id="chartperso">
    <p>Bonjour ici ce sera les graphiques !</p>
    <button @click=add>Test</button>
  </div>
</template>

<script>
export default {
  name: 'chartperso',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    add: function() {
      this.$store.commit("increment");
    }
  }
}
</script>

<style>
  #chartperso{
  	width: 400px;
  	height: 300px;
  	background-color: pink;
  }

  button{
    width:50px;
    height: 30px;
  }

</style>
