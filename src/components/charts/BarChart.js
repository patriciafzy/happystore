import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of Dish",
                backgroundColor: ["#3e95cd", "#800080","#3cba9f","#FFA500","#FFB6C1"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each Dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                    }
                }]
            }
        }
    }
  },

  methods: {
    fetchItems: function() {
        var count = {} 
        database.collection('orders').get().then(snapshot => {
            snapshot.forEach(doc => {
                if (Object.keys(count).length == 0) {
                    count = doc.data()
                } else {
                    for (var key in count) {
                        count[key] += doc.data()[key];
                    }
                }
            })
            for (var k in count) {
                this.datacollection.labels.push(k)
                this.datacollection.datasets[0].data.push(count[k])
            }  
            this.renderChart(this.datacollection, this.options);
        });
    }

  },
  created () {
    this.fetchItems()
  }

}