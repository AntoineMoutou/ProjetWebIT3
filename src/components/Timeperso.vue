<template>
  <div id="timeperso">
    <p class="title">Time</p>
    <div class="content">
      <p>{{writeTime}}</p>
    </div>
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
    position: absolute;
    bottom: 10px;
    left: 15px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  	width: 400px;
  	height: 60px;
    padding: 5px;
  	background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 1px 2px 4px rgba(0,0,0,0.5);
    z-index: 999999;
  }

  #timeperso .title {
    margin: 0;
    padding: 4px 8px;
    font-size: 1.2em;
    color: #4CAF50;
  }

  #timeperso .content {
    flex-grow: 1;
  }

  #timeperso .content p{
    margin: 0;
    padding: 6px;
    text-align: center;
  }

</style>
