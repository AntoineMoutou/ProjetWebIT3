<template>
  <div id="mapperso">
  	<div id="mapContainer" style="width:400px;height:300px;">
	    <v-map :zoom=13 :center="[47.413220, -1.219482]">
	      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
	      <v-marker :lat-lng="[47.413220, -1.219482]"></v-marker>
	    </v-map>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'mapperso',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    
  },
  methods:{
  	
  }
}
</script>

<style>
  #mapperso{
  	width: 400px;
  	height: 300px;
  }
  
</style>
