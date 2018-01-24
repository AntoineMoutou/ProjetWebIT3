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

    PROBELIST   : ["Probe1","Probe2","Probe3","Probe4","Probe5"],
    MEASURELIST : ["location","measurements","rainfall"],
    HISTORYLIST : ["HistoryLast","HistoryWeek","HistoryMonth","HistoryYear"],

    //the main data object
    dataJson : {"probes":[]},

    //probe adress list 
    probesAdressList : 
    {
      Probe1 : "http://172.31.58.20:3000/",
      Probe2 : "http://172.31.58.22:3000/",
      Probe3 : "http://path/to/probe/3/",
      Probe4 : "http://path/to/probe/4/",
      Probe5 : "http://path/to/probe/5/",
    },

    //selected elements list (with default config)
    selProbe   : [],
    selMeasure : ["MeasureAll"],
    selHistory : "HistoryLast",
    
    //url values (with default config)
    url : {
      period  : "last",
      param   : ""
    }
	},
	actions:{

		updateSelProbe({commit,state},probeName){

      //ProbeAll specific case
      if (probeName == "ProbeAll") {
        if (state.selProbe.includes(probeName)) {
          //delete all probes
          state.selProbe = [];
        } 
        else{
          //add all probes
          state.selProbe = ["ProbeAll", "Probe1", "Probe2", "Probe3", "Probe4", "Probe5"];
        }
      }
      //general case
      else{
        if (state.selProbe.includes(probeName)) {
          //delete the chosen probe
          var idel = state.selProbe.indexOf(probeName);
          state.selProbe.splice(idel,1);
          
          //delete "ProbeAll" if it's in the list
          if (state.selProbe.includes("ProbeAll")) {
            idel = state.selProbe.indexOf("ProbeAll");
            state.selProbe.splice(idel,1);
          }
        } 
        else{
          //add the chosen probe
          state.selProbe.push(probeName);
        }
      }

      console.log("---------- changeProbe done ----------");
    },
    updateSelMeasure({commit,state},measureName){

      //MeasureAll specific case
      if (measureName == "MeasureAll") {
        if (state.selMeasure.includes(measureName)) {
          //delete all measures
          state.selMeasure = [];
        } 
        else{
          //add all measures
          state.selMeasure = ["MeasureAll", "location", "measurements", "rainfall"];
        }
      }
      //general case
      else{
        if (state.selMeasure.includes(measureName)) {
          //delete the chosen measure
          var idel = state.selMeasure.indexOf(measureName);
          state.selMeasure.splice(idel,1);

          //delete "MeasureAll" if it's in the list
          if (state.selMeasure.includes("MeasureAll")) {
            idel = state.selMeasure.indexOf("MeasureAll");
            state.selMeasure.splice(idel,1);
          }
        } 
        else{
          //add the chosen measure
          state.selMeasure.push(measureName);
        }
      }

      console.log("---------- changeMeasure done----------");    
    },
    updateSelHistory({commit,state},historyName){

      //general and only case
      state.selHistory = historyName;

      console.log("---------- changeHistory done ----------");
    },

    setUrlMeasure({commit,state},measureName){

      if (measureName == "MesureAll") {
        state.url.measure = "";
      }
      else{
        state.url.measure = measureName;
      }

      console.log("---------- setUrlMeasure done ----------");
    },
    setUrlPeriod({commit,state},historyName){

      if (historyName == "HistoryLast") {
        state.url.period = "last";
      }
      else{
        state.url.period = "interval";
      }

      console.log("---------- setUrlPeriod done ----------");
    },
    setUrlParam({commit,state},historyName){
      if (historyName == "HistoryLast") {
        state.url.param = "";
      }
      else if (historyName == "HistoryWeek") {
        var stop = new Date();
        var stopIso = stop.toISOString();

        var time = stop.getTime() - 7 * 24 * 3600 * 1000;
        var start = new Date(time);
        var startIso = start.toISOString();

        state.url.param = "?start=" + startIso + '&stop=' + stopIso;

      }
      else if (historyName == "HistoryMonth") {
        var stop = new Date();
        var stopIso = stop.toISOString();

        var month = stop.getMonth();
        var year = stop.getYear();
        var start = new Date(stopIso);

        if (month==0) {
          start.setMonth(11);
          start.setYear(year - 1 + 1900);
        }
        else{
          start.setMonth(month -1);
        }

        var startIso = start.toISOString();

        state.url.param = "?start=" + startIso + '&stop=' + stopIso;
      }
      else if (historyName == "HistoryYear") {
        var stop = new Date();
        var stopIso = stop.toISOString();

        var year = stop.getYear();
        var start = new Date(stopIso);

        start.setYear(year - 1 + 1900);
    
        var startIso = start.toISOString();

        state.url.param = "?start=" + startIso + '&stop=' + stopIso;
      }

      console.log("---------- setUrlParam done ----------");
    },

    //for add ProbeAll use this fonction many times
    addProbe({commit,state},probeName){

      if (probeName == "ProbeAll") {
        state.PROBELIST.forEach(function (el) {
            if (!(selProbe.includes(el))) {
              dispatch("addProbe", el);
            }
          })
      }
      else{
        //init new probe object
        var newJson = 
        {
          probeId:probeName
        };

        for (var i = 0; i < state.selMeasure.length; i++) {
          var tmpMeasure = state.selMeasure[i];

          if (tmpMeasure != "MeasureAll") {
            //init the url for the fetch
            var url = state.probesAdressList[probeName] + state.url.period + '/' + tmpMeasure + state.url.param;

            console.log("---------- URL : " + url + " ----------");

            fetch(url)
            .then(result => result.json())
            .then(function (result) {
              var obj = Object.assign(newJson,result);

              state.dataJson.probes.push(obj);
              
              console.log(state.dataJson.probes);

              console.log("---------- addProbe done ----------");
            })
          }

          
        }

        
      }
    },
    removeProbe({commit,state},probeName){

      //ProbeAll specific case
      if (probeName == "ProbeAll"){
        state.dataJson = {"probes":[]};
      }
      // general case
      else{
        for (let i = 0; i < state.dataJson.probes.length; i++) {
          if (state.dataJson.probes[i].probeId == probeName) {
            state.dataJson.probes.splice(i,1);
          }
        }
      }

      console.log("---------- removeProbe done ----------");
    },
    //for add MesureAll use this fonction many times
    addMeasure({commit,state},measureName){
      
      if (measureName == "MeasureAll") {
        state.MEASURELIST.forEach(function (el) {
            if (!(selProbe.includes(el))) {
              dispatch("addMeasure", el);
            }
          })
      }

      for (let i = 0 ; i < state.dataJson.probes.length; i++) {

        var url = state.probesAdressList[state.dataJson.probes[i].probeId] + state.url.period + '/' + measureName + state.url.param; //to check
      
        console.log("---------- URL : " + url + " ----------");
        
        fetch(url)
        .then(result => result.json())
        .then(function (result) {
          Object.assign(state.dataJson.probes[i],result);

          console.log(state.dataJson.probes);

          console.log("---------- addMeasure done ----------");
        })
      } 
    },
    removeMeasure({commit,state},measureName){

      for (let i = 0; i < state.dataJson.probes.length; i++) {
        
        //MeasureAll specific case
        if (probeName == "MeasureAll"){
          state.dataJson.probes[i] = {"probes":[{probeId:state.dataJson.probes[i].probeId}]};
        }
        //general case
        else{
          delete state.dataJson.probes[i][measureName];
        }
      }

      console.log("---------- removeMeasure done ----------");
    },
    //the same as addMeasure
    addHistory({commit,state}){ 

      state.MEASURELIST.forEach(function (el) {
        if (!(selProbe.includes(el))) {
          dispatch("addMeasure", el);
        }
      })

      console.log("---------- addHistory done ----------");
    },
    removeHistory({commit,state}){ 
      for (let i = state.dataJson.probes.length - 1; i >= 0; i--) {
        state.dataJson.probes[i] = {"probes":[{probeId:state.dataJson.probes[i].probeId}]};
      }

      console.log("---------- removeHistory done ----------");
    },

    otherMutation({commit,state}){

    },
    updateProbe(context,{commit,state},probeName){
      if (selProbe.includes(probeName)) {
        dispatch("removeProbe", probeName);
      }
      else{
        dispatch("addProbe", probeName);
      }
      dispatch("updateSelProbe", probeName);
    },
    updateMeasure(context,{commit,state},measureName){
      
      dispatch("setUrlMeasure",measureName);

      if (selMeasure.includes(measureName)) {
        dispatch("removeMeasure", measureName);
      }
      else {
        dispatch("addMeasure",measureName);
      }
      dispatch("updateSelMeasure",measureName);

    },
    updateHistory(context,{commit,state},historyName){

      if (historyName != selHistory) {
        dispatch("setUrlPeriod",historyName);
        dispatch("setUrlParam",historyName);

        dispatch("removeHistory");
        
        dispatch("addHistory");
        
        dispatch("updateSelHistory",historyName);
      }
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
