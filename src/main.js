import Vue from 'vue'
import Vuex from 'vuex'
import Vue2Leaflet from "vue2-leaflet"


import Menuperso  from './components/Menuperso'
import Mapperso   from './components/Mapperso'
import Chartperso from './components/Chartperso'
import Timeperso  from './components/Timeperso'

require("./style.css");


//init vuex
Vue.use(Vuex);

const VMap = Vue.component('v-map', Vue2Leaflet.Map);
const VTilelayer = Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
const Vmarker = Vue.component('v-marker', Vue2Leaflet.Marker);


//create a store
const store = new Vuex.Store({
	state:{

    //CONSTANT TABS
    PROBELIST   : ["Probe1","Probe2","Probe3","Probe4","Probe5"],
    MEASURELIST : ["location","measurements","rainfall"],
    HISTORYLIST : ["HistoryLast","HistoryWeek","HistoryMonth","HistoryYear"],
    PROBESADRESSLIST :{
      Probe1 : "http://172.31.58.20:3000/",
      Probe2 : "http://172.31.58.22:3000/",
      Probe3 : "http://path/to/probe/3/",
      Probe4 : "http://path/to/probe/4/",
      Probe5 : "http://path/to/probe/5/",
    },

    //the main data object
    dataJson : {"probes":[]},

    //the markers list
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
        }         
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
	},mutations:{
    SET_DATAJSON(state, newData){ //a revoir
      state.dataJson = newData;
    },
    SET_MARKERS(state, newData){
      state.markers = newData;
    },
    SET_SELPROBE(state,newList){
      state.selProbe = newList;
    },
    SET_SELMEASURE(state,newList){
      state.selMeasure = newList;
    },
    SET_SELHISTORY(state,newHistory){
      state.selHistory = newHistory;
    },
    SET_URL_MEASURE(state,newMeasure){
      state.url.measure = newMeasure;
    },
    SET_URL_PERIOD(state,newPeriod){
      state.url.period = newPeriod;
    },
    SET_URL_PARAM(state,newParam){
      state.url.param = newParam;
    },
  },
	actions:{

		updateSelProbe({commit,state},probeName){
      //init new selProbe
      var newList = state.selProbe;

      //ProbeAll specific case
      if (probeName == "ProbeAll") {
        if (newList.includes(probeName)) {
          //delete all probes
          newList = [];
        } 
        else{
          //add all probes
          newList = ["ProbeAll", "Probe1", "Probe2", "Probe3", "Probe4", "Probe5"];
        }
      }
      //general case
      else{
        if (newList.includes(probeName)) {
          //delete the chosen probe
          var idel = newList.indexOf(probeName);
          newList.splice(idel,1);
          
          //delete "ProbeAll" if it's in the list
          if (newList.includes("ProbeAll")) {
            idel = newList.indexOf("ProbeAll");
            newList.splice(idel,1);
          }
        } 
        else{
          //add the chosen probe
          newList.push(probeName);
        }
      }

      store.commit("SET_SELPROBE",newList);

      console.log("---------- updateSelProbe done ----------");
    },
    updateSelMeasure({commit,state},measureName){
      //init new selMeasure
      var newList = state.selMeasure;

      //MeasureAll specific case
      if (measureName == "MeasureAll") {
        if (newList.includes(measureName)) {
          //delete all measures
          newList = [];
        } 
        else{
          //add all measures
          newList = ["MeasureAll", "location", "measurements", "rainfall"];
        }
      }
      //general case
      else{
        if (newList.includes(measureName)) {
          //delete the chosen measure
          var idel = newList.indexOf(measureName);
          newList.splice(idel,1);

          //delete "MeasureAll" if it's in the list
          if (newList.includes("MeasureAll")) {
            idel = newList.indexOf("MeasureAll");
            newList.splice(idel,1);
          }
        } 
        else{
          //add the chosen measure
          newList.push(measureName);
        }
      }

      store.commit("SET_SELMEASURE",newList);

      console.log("---------- updateSelMeasure done----------");    
    },
    updateSelHistory({commit,state},historyName){

      //general and only case
      var newHistory = historyName;

      store.commit("SET_SELHISTORY",newHistory);

      console.log("---------- updateSelHistory done ----------");
    },

    setUrlMeasure({commit,state},measureName){

      return new Promise((resolve,reject) =>{

        if (measureName == "MesureAll") {
          store.commit("SET_URL_MEASURE", "");
        }
        else{
          store.commit("SET_URL_MEASURE", measureName);
        }

        console.log("---------- setUrlMeasure done ----------");

        resolve(measureName);

      })
    },
    setUrlPeriod({commit,state},historyName){

      return new Promise((resolve,reject) =>{

        if (historyName == "HistoryLast") {
          store.commit("SET_URL_PERIOD", "last");
        }
        else{
          store.commit("SET_URL_PERIOD", "interval");
        }

        console.log("---------- setUrlPeriod done ----------");

        resolve(historyName);

      })
    },
    setUrlParam({commit,state},historyName){

      return new Promise((resolve,reject) =>{

        var newParam = "";

        if (historyName == "HistoryLast") {
          newParam = "";
        }
        else if (historyName == "HistoryWeek") {
          var stop = new Date();
          var stopIso = stop.toISOString();

          var time = stop.getTime() - 7 * 24 * 3600 * 1000;
          var start = new Date(time);
          var startIso = start.toISOString();

          newParam = "?start=" + startIso + '&stop=' + stopIso;

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

          newParam = "?start=" + startIso + '&stop=' + stopIso;
        }
        else if (historyName == "HistoryYear") {
          var stop = new Date();
          var stopIso = stop.toISOString();

          var year = stop.getYear();
          var start = new Date(stopIso);

          start.setYear(year - 1 + 1900);
      
          var startIso = start.toISOString();

          newParam = "?start=" + startIso + '&stop=' + stopIso;
        }

        store.commit("SET_URL_PARAM",newParam);

        console.log("---------- setUrlParam done ----------");

        resolve(historyName);

      })
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

          var newProbe = {probeId:probeName,location:[],measurements:[],rainfall:[]};

          var newDataJson = state.dataJson;

          var url = state.PROBESADRESSLIST[probeName] + state.url.period + '/' + state.url.measure + state.url.param;
          
          console.log("---------- URL : " + url + " ----------");
          
          fetch(url)
          .then(result => result.json())
          .then(function (result) {

            for (var i = 0; i < result.location.length; i++) {
              newProbe.location.push(result.location[i]);
            }

            for (var i = 0; i < result.measurements.length; i++) {
              newProbe.measurements.push(result.measurements[i]);
            }

            for (var i = 0; i < result.rainfall.length; i++) {
              newProbe.rainfall.push(result.rainfall[i]);
            }

            // newProbe.location = newProbe.location.concat(result.location);
            // newProbe.location = newProbe.measurements.concat(result.measurements);
            // newProbe.location = newProbe.rainfall.concat(result.rainfall);

            state.dataJson.probes.push(newProbe);
            
            //store.commit("SET_DATAJSON",newDataJson);

            // console.log(state.dataJson.probes);

            console.log("---------- addProbe done ----------");
          })
        }
        //use different measure request
        else{  

          var newProbe = {probeId:probeName,location:[],measurements:[],rainfall:[]};

          var newDataJson = state.dataJson;

          for (let i = 0; i < state.selMeasure.length; i++) {
            var tmpMeasure = state.selMeasure[i];

            if (tmpMeasure != "MeasureAll") {
              //init the url for the fetch
              var url = state.PROBESADRESSLIST[probeName] + state.url.period + '/' + tmpMeasure + state.url.param;

              console.log("---------- URL : " + url + " ----------");

              fetch(url)
              .then(result => result.json())
              .then(function (result) {
                
                // console.log(result);

                // newProbe = Object.assign(newProbe,result);

                // var len = state.dataJson.probes.length;

                // state.dataJson.probes[len-1] = Object.assign({},state.dataJson.probes[-1],result);

                for (var j = 0; j < result[tmpMeasure].length; j++) {
                  newProbe[tmpMeasure].push(result[tmpMeasure][j]);
                }
                
                // newProbe[tmpMeasure].concat(result[tmpMeasure]);

              })
            }  
          }

          state.dataJson.probes.push(newProbe);

          // newDataJson.push(newProbe);

          // var newData = JSON.parse(JSON.stringify(newDataJson));

          // store.commit("SET_DATAJSON",newData);

          // console.log(state.dataJson.probes);

          console.log("---------- addProbe done ----------");
        }
        resolve(probeName);
      });
    },
    removeProbe({commit,state},probeName){


      return new Promise((resolve,reject) =>{

        var newDataJson = state.dataJson;

        //ProbeAll specific case
        if (probeName == "ProbeAll"){
          state.dataJson = {"probes":[]};

        }
        // general case
        else{
          for (let i = 0; i < newDataJson.probes.length; i++) {
            if (newDataJson.probes[i].probeId == probeName) {
              state.dataJson.probes.splice(i,1);
            }
          }
        }
        
        // var newData = JSON.parse(JSON.stringify(newDataJson));

        // store.commit("SET_DATAJSON",newData);

        // console.log(state.dataJson.probes);

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

          var newDataJson = state.dataJson;

          for (let i = 0 ; i < newDataJson.probes.length; i++) {

            var url = state.PROBESADRESSLIST[newDataJson.probes[i].probeId] + state.url.period + '/' + measureName + state.url.param; //to check
          
            console.log("---------- URL : " + url + " ----------");
            
            fetch(url)
            .then(result => result.json())
            .then(function (result) {

              // console.log(result);

              for (var j = 0; j < result[measureName].length; j++) {
                  state.dataJson.probes[i][measureName].push(result[measureName][j]);
                }

              // state.dataJson.probes[i][measureName].concat(result[measureName]);
            })
          }

          // var newData = JSON.parse(JSON.stringify(newDataJson));

          // store.commit("SET_DATAJSON",newData);

          // console.log(state.dataJson.probes);

          console.log("---------- addMeasure done ----------");
        }

        resolve(measureName);

      });  
    },

    removeMeasure({commit,state},measureName){

      return new Promise((resolve,reject) =>{

        var newDataJson = state.dataJson;

        for (let i = 0; i < newDataJson.probes.length; i++) {
        
          //MeasureAll specific case
          if (measureName == "MeasureAll"){
            // newDataJson.probes[i] = {probeId : newDataJson.probes[i].probeId};
            var sameProbe = {probeId:newDataJson.probes[i].probeId,location:[],measurements:[],rainfall:[]};
            state.dataJson.probes.splice(i,1);
            state.dataJson.probes.push(sameProbe);

          }
          //general case
          else{
            // delete newDataJson.probes[i][measureName];
            while (state.dataJson.probes[i][measureName]>0)
              {state.dataJson.probes[i][measureName].pop()}
          }
        }

        // var newData = JSON.parse(JSON.stringify(newDataJson));

        // store.commit("SET_DATAJSON",newData);

        // console.log(state.dataJson.probes);

        console.log("---------- removeMeasure done ----------");

        resolve(measureName);
      });
    },

    addHistory({commit,state},historyName){ //to do check promises

      return new Promise((resolve,reject) =>{

        state.MEASURELIST.forEach(function (el) {
          if (!(state.selProbe.includes(el))) {
            store.dispatch("addMeasure", el);
          }
        })

        // console.log(state.dataJson.probes);

        console.log("---------- addHistory done ----------");

        resolve(historyName);
      }); 
    },
    removeHistory({commit,state},historyName){ //to do check promises

      return new Promise((resolve,reject) =>{

        var newDataJson = state.dataJson;

        

        for (let i = newDataJson.probes.length - 1; i >= 0; i--) {

          var sameProbe = {probeId:newDataJson.probes[i].probeId,location:[],measurements:[],rainfall:[]};
            state.dataJson.probes.splice(i,1);
            state.dataJson.probes.push(sameProbe);
        }

        // var newData = JSON.parse(JSON.stringify(newDataJson));

        // store.commit("SET_DATAJSON",newData);

        // console.log(state.dataJson.probes);

        console.log("---------- removeHistory done ----------");

        resolve(historyName);
      });
    },

    updateMarkers({commit,state}){

      return new Promise((resolve,reject) =>{

        // var newMarkers = state.markers;

        // state.markers.Probe1.visible = false;
        // state.markers.Probe2.visible = false;
        // state.markers.Probe3.visible = false;
        // state.markers.Probe4.visible = false;
        // state.markers.Probe5.visible = false;
        

        // if (state.selMeasure.includes("location")) {
        //   for (let i = 0; i < state.dataJson.probes.length; i++) {

        //     console.log("i",i);
        //     var id = state.dataJson.probes[i].probeId;
        //     console.log("id",id);
        //     console.log(state.dataJson.probes);
        //     var lastLocation = state.dataJson.probes[i].location;

        //     console.log("lastLocation",lastLocation);
        //     console.log(state.dataJson.probes);

        //     //console.log(state.markers,id);

        //     state.markers[id].visible = true;

            

        //     state.markers[id].position.lat = lastLocation["0"].latitude;
        // //     state.markers[id].position.lng = lastLocation[0].longitude;
        //   }
        // }

        // store.commit("SET_MARKERS",newMarkers);

        // console.log("Markers",state.markers);

        console.log("---------- updateMarkers done ----------");

      });
    },

    updateProbe({dispatch,commit,state},probeName){

      if (state.selProbe.includes(probeName)) {
        store.dispatch("removeProbe", probeName)
        .then(probeName => store.dispatch("updateSelProbe", probeName))
        .then(console.log("---------- updateProbe done ----------"))
        .then(()=>store.dispatch("updateMarkers"));
      }
      else{
        store.dispatch("addProbe", probeName)
        .then(probeName => store.dispatch("updateSelProbe", probeName))
        .then(console.log("---------- updateProbe done ----------"))
        .then(()=>store.dispatch("updateMarkers"));
      }   
    },
    updateMeasure({dispatch,commit,state},measureName){

      store.dispatch("setUrlMeasure",measureName)
      .then(measureName => {
        if (state.selMeasure.includes(measureName)) {
          return store.dispatch("removeMeasure", measureName);
        }
        else{
          return store.dispatch("addMeasure",measureName);
        }
      })
      .then(measureName=>store.dispatch("updateSelMeasure", measureName))
      .then(console.log("---------- updateMeasure done ----------"))
      .then(()=>store.dispatch("updateMarkers"));
    },
    updateHistory({dispatch,commit,state},historyName){

      if (historyName != state.selHistory) {
        store.dispatch("setUrlPeriod",historyName)
        .then(historyName => store.dispatch("setUrlParam",historyName))
        .then(historyName => store.dispatch("removeHistory",historyName))
        .then(historyName => store.dispatch("addHistory",historyName))
        .then(historyName => store.dispatch("updateSelHistory",historyName))
        .then(console.log("---------- updateHistory done ----------"))
        .then(()=>store.dispatch("updateMarkers"));
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
