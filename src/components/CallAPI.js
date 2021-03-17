
import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false
            }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: '24h PSI Level'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var data = response.data
            for (let i = 0; i < data["items"].length; i++) {
                this.datacollection.labels.push(data["items"][i]["timestamp"])
            }
            var region = []
            for (var k in data["items"][0]["readings"]["psi_twenty_four_hourly"]) {
                region.push(k)
            }
            var color = ["#3e95cd", "#800080","#3cba9f","#FFA500","#FFB6C1"]
            for (var r = 0; r < region.length; r++) {
                var set = {data: [], label: "", borderColor: "", fill: false}
                for (let t = 0; t < data["items"].length; t++) {
                    set.data.push(data["items"][t]["readings"]["psi_twenty_four_hourly"][region[r]])
                }
                set.label = region[r]
                set.borderColor = color[r]
                this.datacollection.datasets.push(set)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}