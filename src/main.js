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
    selMeasure : ["MeasureAll","location","measurements","rainfall"],
    selHistory : "HistoryLast",
    
    //url values (with default config)
    url : {
      measure : "",
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

    addProbe({commit,state},probeName){

      return new Promise((resolve,reject) =>{

        // do it for all probes
        if (probeName == "ProbeAll") {
          state.PROBELIST.forEach(function (el) {
              if (!(state.selProbe.includes(el))) {
                store.dispatch("addProbe", el);
              }
            })
        }
        // use measure all request
        else if (state.url.measure == ""){
          var newJson = 
          {
            probeId:probeName
          };

          var url = state.probesAdressList[probeName] + state.url.period + '/' + state.url.measure + state.url.param;

          console.log("---------- URL : " + url + " ----------");

          fetch(url)
          .then(result => result.json())
          .then(function (result) {
            var obj  = Object.assign(newJson,result);

            state.dataJson.probes.push(obj);
            
            console.log(state.dataJson.probes);

            console.log("---------- addProbe done ----------");
          })
        }
        else{
          //use different measure request
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
                 newJson = Object.assign(newJson,result);

                
                
                console.log(state.dataJson.probes);

                console.log("---------- addProbe done ----------");
              })
            }  
          }

          state.dataJson.probes.push(newJson);

        }
        resolve(probeName);
      });
    },
    removeProbe({commit,state},probeName){

      return new Promise((resolve,reject) =>{

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

        resolve(probeName);
      });
    },
    addMeasure({commit,state},measureName){ 
      
      return new Promise((resolve,reject) =>{

        if (measureName == "MeasureAll") {
          state.MEASURELIST.forEach(function (el) {
              if (!(state.selProbe.includes(el))) {
                store.dispatch("addMeasure", el);
              }
            })
        }
        else{
          for (let i = 0 ; i < state.dataJson.probes.length; i++) {

            console.log(state.dataJson.probes[i]);

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
        }

        resolve(measureName);

      });  
    },
    removeMeasure({commit,state},measureName){

      return new Promise((resolve,reject) =>{

        for (let i = 0; i < state.dataJson.probes.length; i++) {
        
          //MeasureAll specific case
          if (measureName == "MeasureAll"){
            state.dataJson.probes[i] = {probeId:state.dataJson.probes[i].probeId};
          }
          //general case
          else{
            delete state.dataJson.probes[i][measureName];
          }
        }

        console.log("---------- removeMeasure done ----------");

        resolve(measureName);
      });
    },
    addHistory({commit,state}){ //to do check promises

      return new Promise((resolve,reject) =>{

        state.MEASURELIST.forEach(function (el) {
          if (!(state.selProbe.includes(el))) {
            store.dispatch("addMeasure", el);
          }
        })

        console.log("---------- addHistory done ----------");

      }); 
    },
    removeHistory({commit,state}){ //to do check promises

      return new Promise((resolve,reject) =>{

        for (let i = state.dataJson.probes.length - 1; i >= 0; i--) {
          state.dataJson.probes[i] = {probeId:state.dataJson.probes[i].probeId};
        }

        console.log("---------- removeHistory done ----------");

      });

      for (let i = state.dataJson.probes.length - 1; i >= 0; i--) {
        state.dataJson.probes[i] = {probeId:state.dataJson.probes[i].probeId};
      }

      console.log("---------- removeHistory done ----------");
    },

    updateProbe({commit,state},probeName){

      if (state.selProbe.includes(probeName)) {
        store.dispatch("removeProbe", probeName)
        .then(probeName => store.dispatch("updateSelProbe", probeName))
        .then(console.log("---------- updateProbe done ----------"));
      }
      else{
        store.dispatch("addProbe", probeName)
        .then(probeName => store.dispatch("updateSelProbe", probeName))
        .then(console.log("---------- updateProbe done ----------"));
      }

      
    },
    updateMeasure({commit,state},measureName){
      console.log("coooooooooooooooool");
      store.dispatch("setUrlMeasure",measureName);

      if (state.selMeasure.includes(measureName)) {
        store.dispatch("removeMeasure", measureName)
        .then(measureName => store.dispatch("updateSelMeasure",measureName));
      }
      else {
        store.dispatch("addMeasure",measureName)
        .then(measureName => store.dispatch("updateSelMeasure",measureName));
      }

      console.log("---------- updateMeasure done ----------");
    },
    updateHistory({commit,state},historyName){

      if (historyName != state.selHistory) {
        store.dispatch("setUrlPeriod",historyName);
        store.dispatch("setUrlParam",historyName);

        store.dispatch("removeHistory");
        
        store.dispatch("addHistory");
        
        store.dispatch("updateSelHistory",historyName);

        console.log("---------- updateHistory done ----------");
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
