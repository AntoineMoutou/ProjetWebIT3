<template>
  <div id="chartperso" :class="divClass ">
    <div class="popup_button" @click=toggleHideDiv></div>
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


      ],
      divClass: ''
    }
  },
  computed:{
    getdata:function () {

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
    bottom: 10px;
    right: 15px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    min-width: 400px;
  	height: 400px;
    padding: 5px;
  	background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 1px 2px 4px rgba(0,0,0,0.5);
    z-index: 999999;
  }

  #chartperso.hidden {
    bottom: -377px;
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
