<template>
  <div id="mapperso">
  	<div id="mapContainer">
	    <v-map :zoom=10 :center="[46.213220, 5.219482]">
	      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
	      <v-marker v-for="item in markers" :lat-lng="item.position" :visible="item.visible"></v-marker>
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
    getUpMks:function () {

      for (var i = 0; i < this.$store.state.dataJson.probes.length; i++) {

        this.markers[this.$store.state.dataJson.probes[i].probeId].visible = false;
      }

      if (this.$store.state.b.measure.location || this.$store.state.b.measure.all) {
        for (var i = 0; i < this.$store.state.dataJson.probes.length; i++) {
          this.markers[this.$store.state.dataJson.probes[i].probeId].visible = true;

          this.markers[this.$store.state.dataJson.probes[i].probeId].position.lat = this.$store.state.dataJson.probes[i].location.latitude;
          this.markers[this.$store.state.dataJson.probes[i].probeId].position.lng = this.$store.state.dataJson.probes[i].location.longitude;
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
  #mapperso {
    width: 100%;
    height: auto;
    flex-grow: 1;
    z-index: 5;
  }

  #mapContainer{
  	width: 100%;
  	height: 100%;
  }

  @import "../leaflet/leaflet.css";

</style>
