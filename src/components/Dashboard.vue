

<template>
  <v-container>
    <v-row>
      <v-col class="mb-4">
        <v-banner
        elevation="9"
        outlined
        rounded
        class="indigo darken-4 white--text"
        >
        <v-icon class="white">mdi-view-dashboard</v-icon>
                  Dashboard Vecinos Satisfechos -Vecinos Muy Satisfechos
        </v-banner>                          
      </v-col>
      <v-col>
        <v-select
        label="Seleccione Alcaldía"
        >
        </v-select>
        <v-divider></v-divider>
        <v-select
        label="Seleccione Colonia"
        ></v-select>   
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
            class="mx-auto"
            max-width="344"
            elevation="13"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  <highcharts :options="chartSatisfechos" :callback="chartCallback"></highcharts>
                </div>
              </v-list-item-content>  
            </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card
            class="mx-auto"
            max-width="344"
            elevation="13"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  <highcharts :options="chartMuySatisfechos" :callback="chartCallback"></highcharts>
                </div>
              </v-list-item-content>  
            </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container> 
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import hcMore from "highcharts/highcharts-more";

hcMore(Highcharts);

export default {
  components: {
    highcharts: Chart
  },
  methods: {
    // chartCallback(chart) {
    //   if (!chart.renderer.forExport) {
    //     setInterval(function() {
    //       var point = chart.series[0].points[0],
    //         newVal,
    //         inc = Math.round((Math.random() - 0.5) * 20);

    //       newVal = point.y + inc;
    //       if (newVal < 0 || newVal > 200) {
    //         newVal = point.y - inc;
    //       }

    //       point.update(newVal);
    //     }, 3000);
    //   }
    // }
  },
  data() {
    return {
      chartSatisfechos: {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },

        title: {
          text: "Vecinos Satisfechos"
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#FFF"], [1, "#333"]]
              },
              borderWidth: 0,
              outerRadius: "109%"
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#333"], [1, "#FFF"]]
              },
              borderWidth: 1,
              outerRadius: "107%"
            },
            {
              // default background
            },
            {
              backgroundColor: "#DDD",
              borderWidth: 0,
              outerRadius: "105%",
              innerRadius: "103%"
            }
          ]
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 50,

          minorTickInterval: "auto",
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: "inside",
          minorTickColor: "#666",

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: "inside",
          tickLength: 10,
          tickColor: "#666",
          labels: {
            step: 2,
            rotation: "auto"
          },
          title: {
            text: "Satisfechos"
          },
          plotBands: [
            {
              from: 0,
              to: 15,
              color: "#DF5353" // red
            },
            {
              from: 15,
              to: 30,
              color: "#DDDF0D" // yellow
            },
            {
              from: 30,
              to: 50,
              color: "#55BF3B" // green
            }
          ]
        },

        series: [
          {
            name: "Satisfechos",
            data: [40],
            tooltip: {
              valueSuffix: "vecinos"
            }
          }
        ],
        credits: {
          enabled: false
        }
      },

      chartMuySatisfechos: {
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },

        title: {
          text: "Vecinos Muy Satisfechos"
        },

        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#FFF"], [1, "#333"]]
              },
              borderWidth: 0,
              outerRadius: "109%"
            },
            {
              backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [[0, "#333"], [1, "#FFF"]]
              },
              borderWidth: 1,
              outerRadius: "107%"
            },
            {
              // default background
            },
            {
              backgroundColor: "#DDD",
              borderWidth: 0,
              outerRadius: "105%",
              innerRadius: "103%"
            }
          ]
        },

        // the value axis
        yAxis: {
          min: 0,
          max: 50,

          minorTickInterval: "auto",
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: "inside",
          minorTickColor: "#666",

          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: "inside",
          tickLength: 10,
          tickColor: "#666",
          labels: {
            step: 2,
            rotation: "auto"
          },
          title: {
            text: "Muy Satisfechos"
          },
          plotBands: [
            {
              from: 0,
              to: 15,
              color: "#DF5353" // red
            },
            {
              from: 15,
              to: 30,
              color: "#DDDF0D" // yellow
            },
            {
              from: 30,
              to: 50,
              color: "#55BF3B" // green
            }
          ]
        },

        series: [
          {
            name: "Satisfechos",
            data: [25],
            tooltip: {
              valueSuffix: "vecinos"
            }
          }
        ],
        credits: {
          enabled: false
        }
      }
    };
  }
};
</script>
