<template>
  <div id="menuperso">
    <div id="probe" class="menubox">
      <input type="checkbox" id="cbprobe">
      <label for="cbprobe">Probe</label>
      <ul id="probelist" class="menulist">
        <li @click=handleProbeClick value="ProbeAll">All</li>
        <li @click=handleProbeClick value="Probe1">Probe 01</li>
        <li @click=handleProbeClick value="Probe2">Probe 02</li>
        <li @click=handleProbeClick value="Probe3">Probe 03</li>
        <li @click=handleProbeClick value="Probe4">Probe 04</li>
        <li @click=handleProbeClick value="Probe5">Probe 05</li>
      </ul>
    </div>
    <div id="measure" class="menubox">
      <input type="checkbox" id="cbmeasure">
      <label for="cbmeasure">Measure</label>
      <ul id="measurelist" class="menulist">
        <li @click=handleMeasureClick value="">All</li>
        <li @click=handleMeasureClick value="location">Location</li>
        <li @click=handleMeasureClick value="measurements">Measurements</li>
        <li @click=handleMeasureClick value="rainfall">Rainfall</li>
      </ul>
    </div>
    <div id="history" class="menubox">
      <input type="checkbox" id="cbhistory">
      <label for="cbhistory">History</label>
      <ul id="historylist" class="menulist">
        <li @click=handleHistoryClick value="HistoryLast">Last prompt</li>
        <li @click=handleHistoryClick value="HistoryWeek">Last week</li>
        <li @click=handleHistoryClick value="HistoryMonth">Last month</li>
        <li @click=handleHistoryClick value="HistoryYear">Last year</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuperso',
  methods:{
    handleProbeClick: function(e){
      //changeProbe
      var val = e.target.attributes[0].value;
      this.$store.commit("changeProbe",val);

      //add or remove data + update style
      if (this.$store.state.b.probe[val]) {
        this.$store.commit("addProbe",val);
        e.target.style.backgroundColor = "#999999";
      }
      else{
        this.$store.commit("removeProbe",val);
        e.target.style.backgroundColor = "#DDDDDD";
      }
    },

    handleMeasureClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;

      if (val != this.$store.state.measure) {
        this.$store.commit("changeMeasure",val);
        this.$store.commit("setMeasure",val);

        this.$store.commit("removeMeasure")
        this.$store.commit("addMeasure");
        e.target.style.backgroundColor = "#999999";
      }
    },

    handleHistoryClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;

      var period;
      var param;

      if (val == 'HistoryLast') {
        period = "last";
        param = '';
      }
      else if (val == "HistoryWeek") {
        var stop = new Date();
        var stopIso = stop.toISOString();

        var time = stop.getTime() - 7 * 24 * 3600 * 1000;
        var start = new Date(time);
        var startIso = start.toISOString();

        period = "interval";
        param = "?start=" + startIso + '&stop=' + stopIso;

      }
      else if (val == "HistoryMonth") {
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

        period = "interval";
        param = "?start=" + startIso + '&stop=' + stopIso;
      }
      else if (val == "HistoryYear") {
        var stop = new Date();
        var stopIso = stop.toISOString();

        var year = stop.getYear();
        var start = new Date(stopIso);

        start.setYear(year - 1 + 1900);

        var startIso = start.toISOString();

        period = "interval";
        param = "?start=" + startIso + '&stop=' + stopIso;
      }

      if (param != this.$store.state.param) {
        this.$store.commit("changeHistory",val);
        this.$store.commit('setPeriod', period);
        this.$store.commit('setParam', param);

        this.$store.commit("removeHistory")
        this.$store.commit("addHistory");


      }


    }
  }
}
</script>

<style>

  #menuperso{
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0;
    padding: 0;
    background: #4CAF50;
    color: #EEE;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.2);
    z-index: 99999999999;
  }

  .menubox{
    position: relative;
    height: auto;
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 99999999999;
  }

  .menubox label {
    width: 100%;
    height: 40px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
  }
  .menubox label:hover {
    background: #43A047;
    box-shadow: inset 2px 0 0 rgba(0,0,0,0.05), inset -2px 0 0 rgba(255,255,255,0.1);
  }

  .menulist {
    position: absolute;
    top: 100%;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #4CAF50;
    display: none;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  input[type="checkbox"]:checked + label {
    background-color: #388E3C;
    box-shadow: inset 2px 0 0 rgba(0,0,0,0.05), inset -2px 0 0 rgba(255,255,255,0.1);
  }

  input[type="checkbox"]:checked ~ .menulist {
    display: flex;
  }

  li{
    margin: 0;
    padding: 5px 0;
    background: #4CAF50;
    list-style: none;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  li:hover{
    background-color: #388E3C;
  }

</style>
