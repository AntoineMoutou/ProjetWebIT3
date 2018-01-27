<script>
export default {
  extends: VueChartJs.Line,
  name: 'charty',
  props: ['datesarray','property','dataarray'],
  methods: {
    render: function() {
      let dataset = {
              label: this.property,
              data: this.dataarray,
            }

      let options = {
          labels: this.datesarray,
          datasets: [dataset]
        }

      this.renderChart(options, {responsive: true, maintainAspectRatio: false})
    }
  },
  watch: {
    'property': {
      handler: function () {
        this.render();
      },
      deep: true
    },
    'datesarray': {
      handler: function () {
        this.render();
      },
      deep: true
    },
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