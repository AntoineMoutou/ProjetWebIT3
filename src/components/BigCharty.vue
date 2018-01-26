<template>
   
    <charty :datesarray="dates_array" :property="property" :dataarray="data_array"></charty>
  
</template>

<script>
// Importing the chart component
import Charty from './Charty';

export default {
  name: 'bigCharty',
  components: { Charty },
  data () {
    return {
      property: 'temperature',
      dates_array: [],
      data_array: [
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
      ]
    }
  },
  methods: {
    
    upData: function(){
      
      if (this.$store.state.period == "interval") {

        for (var i = 0; i < this.$store.state.dataJson.probes.length; i++) {
        
          var probeNumber = this.$store.state.dataJson.probes[i].charAT(this.$store.state.dataJson.probes[i].length -1);
          var selectedMeasure = "";

          this.data_array[probeNumber].data =  this.$store.state.dataJson[i][selectedMeasure]; // choose how to add and fill data_array
          
        }

      } else {

        for (var i = 0; i < this.data_array.length; i++) {
          this.data_array[i].data = [];
        }

      }
    }
  },

  mounted: function() {
    
    this.upData();
  }
}
</script>