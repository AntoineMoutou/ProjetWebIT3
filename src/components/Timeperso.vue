<template>
  <div id="timeperso">
    <p>Time</p>
    <p>{{writeTime}}</p>
  </div>
</template>

<script>
export default {
  name: 'timeperso',
  computed:{
    writeTime: function() {
      if (this.$store.state.url.period == "last") {
        var tmp = new Date();
        return tmp.toString();
      } 
      else {
        var start = new Date( this.$store.state.url.param.split("=")[1].split('&')[0]);
        var stop  = new Date( this.$store.state.url.param.split("=")[2]);

        return "From " + start + "\n" + " to " + stop;
      }
    },
  }
}
</script>

<style>
  #timeperso{
  	width: 400px;
  	height: 100px;
  	background-color: lightblue;
  }
  
</style>
