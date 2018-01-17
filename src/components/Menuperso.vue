<template>
  <div id="menuperso">
    <div id="probe" class="menubox">
      <label for="cbprobe">Probe</label>
      <input type="checkbox" id="cbprobe">
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
      <label for="cbmeasure">Measure</label>
      <input type="checkbox" id="cbmeasure">
      <ul id="measurelist" class="menulist">
        <li @click=handleMeasureClick value="">All</li>
        <li @click=handleMeasureClick value="location">Location</li>
        <li @click=handleMeasureClick value="measurements">Measurements</li>
        <li @click=handleMeasureClick value="rainfall">Rainfall</li>
      </ul>
    </div>
    <div id="history" class="menubox">
      <label for="cbhistory">History</label>
      <input type="checkbox" id="cbhistory">
      <ul id="historylist" class="menulist">
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
    styleProbe: function() {
      return "cool";
    },












    handleMeasureClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;

      this.$store.commit("changeMeasure",val);
      this.$store.commit("setMeasure",val);

      //add or remove data + update style
      if (this.$store.state.b.measure[val]) {
        this.$store.commit("addMeasure",val);
        e.target.style.backgroundColor = "#999999";
      }
      else{
        this.$store.commit("removeMeasure",val);
        e.target.style.backgroundColor = "#DDDDDD";
      }
    },













    handleHistoryClick: function(e){
      //changeB
      var val = e.target.attributes[0].value;
      this.$store.commit("changeHistory",val);
    }
  }
}
</script>

<style>

  #menuperso,#menubox,ul,li{
    margin:0px;
    padding: 0px;
  }

  input{
    display:none;
  }

  #menuperso{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    background-color: #DDDDDD;
  }

  .menubox{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-right: 10px;
    margin-left: 10px;

    width: 150px;

  }

  .menulist{
    display: none;
  }

  #cbprobe:checked + .menulist, #cbmeasure:checked + .menulist, #cbhistory:checked + .menulist{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

  }

  li{
    list-style: none;
    width: 100%;
  }

  li:hover{
    background-color: #BBBBBB;
  }

</style>