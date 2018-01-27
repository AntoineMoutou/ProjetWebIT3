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
      data_array: []
    }
  },
  methods: {
    
    upData: function(){
      
      if (this.$store.state.period == "interval") {

        this.data_array = [];

        for (let i = 0; i < this.$store.state.dataJson.probes.length; i++) {
        
          var probeNumber = this.$store.state.dataJson.probes[i].charAT(this.$store.state.dataJson.probes[i].length -1);
          var tmpLabel = this.$store.state.dataJson.probes[i].probeId;

          var selGraph = this.$store.state.selGraph; 

          for (let j = 0; j < selGraph.length; j++) {
            
            var tmpData = this.$store.state.dataJson.probes[i].measurements[selGraph[j]];
            var tmpObj = {label: tmpLabel, data: tmpData};

            this.data_array.push(tmpObj);
          }          
        }

        console.log("bonjour", this.data_array);

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