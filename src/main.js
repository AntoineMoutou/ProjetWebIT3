import Vue from 'vue'
import Vuex from 'vuex'
import Vue2Leaflet from "vue2-leaflet"

import Menuperso from './components/Menuperso'
import Mapperso from './components/Mapperso'
import Chartperso from './components/Chartperso'
import Timeperso from './components/Timeperso'


//init vuex
Vue.use(Vuex);

const VMap = Vue.component('v-map', Vue2Leaflet.Map);
const VTilelayer = Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
const Vmarker = Vue.component('v-marker', Vue2Leaflet.Marker);

//create a store
const store = new Vuex.Store({
	state:{

    dataJson : {"probes":[]},

    probesList : 
    {
      Probe1 : "http://172.31.58.20:3000/",
      Probe2 : "http://172.31.58.22:3000/",
      Probe3 : "http://path/to/probe/3/",
      Probe4 : "http://path/to/probe/4/",
      Probe5 : "http://path/to/probe/5/",
    },

    b:{
      probe:{
        ProbeAll : false,
        Probe1   : false,
        Probe2   : false,
        Probe3   : false,
        Probe4   : false,
        Probe5   : false
      },
      measure:{
        all          : true,
        location     : false,
        measurements : false,
        rainfall     : false
      },
      history:{
        HistoryWeek  : false, // try time var with computed value
        HistoryMonth : false,
        HistoryYear  : false
      }
    },
    
    measure : '',
    period : "last"
	},
	mutations:{

		changeProbe(state,probeName){
      state.b.probe[probeName] = !state.b.probe[probeName];
    },
    changeMeasure(state,measureName){
      state.b.measure.all          = false;
      state.b.measure.location     = false;
      state.b.measure.measurements = false;
      state.b.measure.rainfall     = false;

      state.b.measure[measureName] = !state.b.measure[measureName];

      console.log(state.b.measure.all,state.b.measure.location,state.b.measure.measurements,state.b.measure.rainfall);
    },
    changeHistory(state,historyName){
      state.b.measure.HistoryWeek  = false;
      state.b.measure.HistoryMonth = false;
      state.b.measure.HistoryYear  = false;

      state.b.history[historyName] = !state.b.probe.history[historyName];
    },
    setMeasure(state,AttribName){
      state.measure = AttribName;
    },
    setPeriod(state,thing){

    },
    addProbe(state,AttribName){
      var newJson = 
      {
        probeId:AttribName
      };

      var url = state.probesList[AttribName] + state.period + '/' + state.measure;

      console.log(url)

      fetch(url)
      .then(result => result.json())
      .then(function (result) {
        var obj = Object.assign(newJson,result);

        state.dataJson.probes.push(obj);
        
        console.log(state.dataJson.probes);
      })
    },
    removeProbe(state,AttribName){
      for (let i = state.dataJson.probes.length - 1; i >= 0; i--) {
        if(state.dataJson.probes[i].probeId == AttribName){
          state.dataJson.probes.splice(i,1);
          console.log(state.dataJson.probes);
        }
      }
    },
    addMeasure(state,AttribName){
      var len = state.dataJson.probes.length;
      for (let i = 0 ; i < len; i++) {
        console.log(state.dataJson.probes[i][AttribName]);
        if (state.dataJson.probes[i][AttribName] == undefined) {
          var url = state.probesList[state.dataJson.probes[i].probeId] + state.period + '/' + state.measure; //to check
        
          console.log(url);
          
          fetch(url)
          .then(result => result.json())
          .then(function (result) {
            Object.assign(state.dataJson.probes[i],result);
          })
        }

        
      }
      console.log(state.dataJson.probes);
    },
    removeMeasure(state,AttribName){
      for (let i = state.dataJson.probes.length - 1; i >= 0; i--) {
        if(state.dataJson.probes[i].probeId == AttribName){
          console.log("coooool");
          delete state.dataJson.probes[i][AttribName];
        }
      }
      console.log(state.dataJson.probes);
    },
    other(state){

    }
	}
})




const app = new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  components: { Menuperso, Mapperso, Chartperso, Timeperso},
  template: `
  <div>

  <menuperso></menuperso>
  <mapperso></mapperso>
  <chartperso></chartperso>
  <timeperso></timeperso>

  </div>
  `
})
