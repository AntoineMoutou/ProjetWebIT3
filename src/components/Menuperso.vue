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
        <li @click=handleMeasureClick value="MeasureAll">All</li>
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
      //the value of the clicked box
      var val = e.target.attributes[0].value;
      e.target.className = (e.target.className == "selected" ? "" : "selected");

      this.$store.dispatch("updateProbe",val);
    },

    handleMeasureClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;
      e.target.className = (e.target.className == "selected" ? "" : "selected");

      this.$store.dispatch("updateMeasure",val);
    },

    handleHistoryClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;

      this.$store.dispatch("updateHistory",val);

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
    background: #009688;
    color: #fafafa;
    box-shadow: inset 0 -3px 0 rgba(0,0,0,0.2);
    z-index: 999999999;
  }

  .menubox{
    position: relative;
    height: auto;
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 999999999;
  }

  .menubox label {
    width: 100%;
    height: 40px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    background: inherit;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .menubox label:hover {
    background: #00897B;
    box-shadow: inset 2px 0 0 rgba(0,0,0,0.05), inset -2px 0 0 rgba(255,255,255,0.1);
  }

  #menuperso input[type="checkbox"]:checked + label {
    background: #00897B;
    box-shadow: inset 2px 0 0 rgba(0,0,0,0.05), inset -2px 0 0 rgba(255,255,255,0.1);
  }

  .menulist {
    position: absolute;
    top: 100%;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #009688;
    display: none;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  #menuperso input[type="checkbox"]:checked ~ .menulist {
    display: flex;
  }

  .menulist li{
    position: relative;
    margin: 0;
    padding: 5px 0;
    background: #009688;
    list-style: none;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
  }

  .menulist li:hover {
    background: #00897B;
  }

  .menulist li.selected {
    background-color: #00796B;
    box-shadow: inset 8px 0 0 rgba(0,0,0,0.3);
  }


</style>
