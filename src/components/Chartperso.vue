<template>
  <div id="chartperso">
    <p class="title">Graph</p>
    <div class="content">
    </div>
  </div>
</template>

<script>

// CommitChart.js
// import VueCharts from 'vue-chartjs'
// import { Bar, Line } from 'vue-chartjs'


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
          label:"Temperature Probe1",
          data : []
        },
        {
          label:"Temperature Probe2",
          data : []
        },
        {
          label:"Temperature Probe3",
          data : []
        },
        {
          label:"Temperature Probe4",
          data : []
        },
        {
          label:"Temperature Probe5",
          data : []
        },

        {
          label:"Temperature Probe1",
          data : []
        },
        {
          label:"Temperature Probe2",
          data : []
        },
        {
          label:"Temperature Probe3",
          data : []
        },
        {
          label:"Temperature Probe4",
          data : []
        },
        {
          label:"Temperature Probe5",
          data : []
        }


      ]
    }
  },
  computed:{
    getdata:function () {
      
    }
  }
}
</script>

<style>
  #chartperso{
    position: absolute;
    bottom: 10px;
    right: 15px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    min-width: 400px;
  	min-height: 100px;
    padding: 5px;
  	background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 1px 2px 4px rgba(0,0,0,0.5);
    z-index: 999999;
  }


  #chartperso .title {
    margin: 0;
    padding: 4px 8px;
    font-size: 1.2em;
    color: #4CAF50;
  }

  #chartperso .content {
    flex-grow: 1;
  }

  #chartperso .content p{
    margin: 0;
    padding: 6px;
    text-align: center;
  }

  button{
    width:50px;
    height: 30px;
  }

</style>
