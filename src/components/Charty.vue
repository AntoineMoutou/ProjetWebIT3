<script>
export default {
  extends: VueChartJs.Line,
  name: 'charty',
  props: ['dataarray'],
  methods: {
    render: function() {
      let datasets = {
              label: "graph",
              data: this.dataarray
            };
      let options = {
          labels: "",
          datasets: this.dataarray
        };

      this.renderChart(options,{responsive: true, maintainAspectRatio: true})
    }
  },
  watch: {
    'dataarray': {
      handler: function () {
        this.render();
      },
      deep: true
    },
  },
  mounted: function() {
    this.render();
  }
}
</script>