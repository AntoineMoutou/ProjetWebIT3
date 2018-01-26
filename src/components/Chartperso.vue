<template>
  <div id="chartperso" :class="divClass ">
    <div class="popup_button" @click=toggleHideDiv></div>
    <p class="title">Graph</p>
    <div class="content">
      <form class="measure_list">
        <input type="checkbox" name="measure_checkbox" value="temperature" id="temperature_checkbox">
        <label for="temperature_checkbox">Temperature</label>
        <input type="checkbox" name="measure_checkbox" value="pression" id="pression_checkbox">
        <label for="pression_checkbox">Pression</label>
        <input type="checkbox" name="measure_checkbox" value="humidity" id="humidity_checkbox">
        <label for="humidity_checkbox">Humidity</label>
        <input type="checkbox" name="measure_checkbox" value="luminosity" id="luminosity_checkbox">
        <label for="luminosity_checkbox">Luminosity</label>
        <input type="checkbox" name="measure_checkbox" value="wind" id="wind_checkbox">
        <label for="wind_checkbox">Wind</label>
      </form>
    </div>
  </div>
</template>

<script>

// CommitChart.js
import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'


export default {
  name: 'chartperso',
  //extends:Line,
  mounted(){
    this.renderChart(data,options)
  },
  data(){
    return {
      labels : [],
      datasets : [
        {
          label:"Probe1",
          data : []
        },
        {
          label:"Probe2",
          data : []
        },
        {
          label:"Probe3",
          data : []
        },
        {
          label:"Probe4",
          data : []
        },
        {
          label:"Probe5",
          data : []
        }
<<<<<<< HEAD
      ]
    }
  },
  computed:{
    upData:function () {

      if (this.$store.state.period == "interval") {

        for (var i = 0; i < this.$store.state.dataJson.probes.length; i++) {
        
          var probeNumber = this.$store.state.dataJson.probes[i].charAT(this.$store.state.dataJson.probes[i].length -1);
          var selectedMeasure = "";

          this.datasets[probeNumber].data =  this.$store.state.dataJson[i][selectedMeasure];
          
        }

      } else {

        for (var i = 0; i < this.datasets.length; i++) {
          this.datasets[i].data = [];
        }

      } 
    }
  },
  methods: {
    toggleHideDiv: function() {
      this.divClass = (this.divClass == "" ? "hidden" : "");
      console.log(this.divClass);

    }
  }
}
</script>

<style>
  #chartperso{
    position: absolute;
    top: calc(100% - 10px);
    right: 15px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    /* min-width: 400px; */
    width: 40%;
  	height: 400px;
    padding: 5px;
  	background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 1px 2px 4px rgba(0,0,0,0.5);
    transform: translateY(-100%);
    z-index: 999999;
  }

  #chartperso.hidden {
    /* bottom: -377px; */
    top: calc(100% - 35px);
    transform: none;
  }


  #chartperso .title {
    margin: 0;
    padding: 4px 8px;
    font-size: 1.2em;
    color: #009688;
  }

  #chartperso .content {
    flex-grow: 1;
    width: 100%;
  }

  #chartperso .content p{
    margin: 0;
    padding: 6px;
    text-align: center;
  }

  .measure_list {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
  }

  .measure_list label {
    margin: 0 4px;
    padding: 4px 6px;
    color: #000;
    cursor: pointer;
    box-shadow: inset 0 0 0 transparent;
  }

  .measure_list input:checked + label {
    color: #fafafa;
    box-shadow: inset 0 -25px 0 #607D8B;
  }

</style>
