<template>
  <div id="chartperso" :class="divClass ">
    <div class="popup_button" @click=toggleHideDiv></div>
    <p class="title">Graph</p>
    <div class="content">
      <form class="measure_list">
        <input type="checkbox" name="measure_checkbox" value="temperature" id="temperature_checkbox" @click=upSelGraph>
        <label for="temperature_checkbox" >Temperature</label>
        <input type="checkbox" name="measure_checkbox" value="pression" id="pression_checkbox" @click=upSelGraph>
        <label for="pression_checkbox">Pression</label>
        <input type="checkbox" name="measure_checkbox" value="humidity" id="humidity_checkbox" @click=upSelGraph>
        <label for="humidity_checkbox">Humidity</label>
        <input type="checkbox" name="measure_checkbox" value="luminosity" id="luminosity_checkbox" @click=upSelGraph>
        <label for="luminosity_checkbox">Luminosity</label>
        <input type="checkbox" name="measure_checkbox" value="wind_speed_avg" id="wind_checkbox" @click=upSelGraph>
        <label for="wind_checkbox">Wind</label>
      </form>

      <bigCharty></bigCharty>

    </div>
  </div>
</template>

<script>

// CommitChart.js
//import VueCharts from 'vue-chartjs'
//import { Bar, Line } from 'vue-chartjs'

import BigCharty  from './BigCharty'


export default {
  name: 'chartperso',

  components: { BigCharty },
  //extends:Line,
  /*mounted(){
    this.renderChart(data,options)
  },*/
  methods: {
    toggleHideDiv: function() {
      this.divClass = (this.divClass == "" ? "hidden" : "");
      console.log(this.divClass);

    },
    upSelGraph: function (e) {
      console.log(e.target.value);
      console.log(e.target.checked);

      if (e.target.checked) {
        this.$store.state.selGraph.push(e.target.value);
      }
      else{
        this.$store.state.selGraph.splice(this.$store.state.selGraph.indexOf(e.target.value),1);
      }

      console.log(this.$store.state.selGraph);

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
