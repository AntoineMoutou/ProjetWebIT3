<template>
  <div id="mapperso">
  	<div id="mapContainer">
	    <v-map :zoom=10 :center="[43.9627, 5.773712]">
	      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
	      <v-marker v-for="item in getUpMks" :lat-lng="item.position" :visible="item.visible"></v-marker>
	    </v-map>
	  </div>
	</div>
</template>

<script>

export default {
  name: 'mapperso',
  data(){
    return{
      markers:{
        Probe1:{
          position : { lng:5.3, lat: 46.2},
          visible : false
        },
        Probe2:{
          position : { lng:5.3, lat: 46.2},
          visible : false
        },
        Probe3:{
          position : { lng:5.3, lat: 46.2},
          visible : false
        },
        Probe4:{
          position : { lng:5.3, lat: 46.2},
          visible : false
        },
        Probe5:{
          position : { lng:5.3, lat: 46.2},
          visible : false
        },
         
      }
    }
  },
  computed:{
    getUpMks:function () { //move it into main.js and create action that updates a global var for markers

      console.log("cool",this.$store.state.selMeasure);

      this.markers["Probe1"].visible = false;
      this.markers["Probe2"].visible = false;
      this.markers["Probe3"].visible = false;
      this.markers["Probe4"].visible = false;
      this.markers["Probe5"].visible = false;
      

      if (this.$store.state.selMeasure.includes("location")) {
        for (var i = 0; i < this.$store.state.dataJson.probes.length; i++) {
          this.markers[this.$store.state.dataJson.probes[i].probeId].visible = true;




          this.markers[this.$store.state.dataJson.probes[i].probeId].position.lat = this.$store.state.dataJson.probes[i].location[0].latitude;
          this.markers[this.$store.state.dataJson.probes[i].probeId].position.lng = this.$store.state.dataJson.probes[i].location[0].longitude;
        }
      }
      console.log(this.markers)
      return this.markers;
    }
  },
  methods:{
  	
  }
}
</script>

<style>
  #mapperso, #mapContainer{
  	width: 400px;
  	height: 300px;
  }

  @import "../leaflet/leaflet.css";
  
</style>
