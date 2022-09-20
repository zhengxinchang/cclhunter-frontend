<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData">

        <v-btn :color="$store.state.mainColor" class="float-end mx-6" dark small style="text-transform: none"
               @click="$router.push('/task')">
          <v-icon size="10">mdi-arrow-left</v-icon>
          back
        </v-btn>
      </bread-crumb>

      <v-row v-show="$store.state.outputJson == null" class="pt-3">
        <v-col>
          <v-sheet class="py-16 my-16" rounded>
            <v-sheet class="text-h5 my-16 py-16">
              The output json not found, please upload your file and submit the task first!
            </v-sheet>
          </v-sheet>

        </v-col>
      </v-row>

      <v-row v-show="$store.state.outputJson != null" class="pt-3">
        <v-col>
          <v-sheet min-height="600" rounded>
            <v-row>
              <v-col cols="10" offset="1">

                <v-sheet v-show="$store.state.outputJson != null" class="my-4">

                  <div class="text-left text-h5 my-2">Introduction</div>

                  <v-sheet class="text-left text-body-1">
                    This page shows the identification results of cancer cell lines. The results are divided into the
                    following three parts:
                    <ol>
                      <li>aaa</li>
                      <li>bbb</li>
                      <li>ccc</li>
                    </ol>

                  </v-sheet>

                  <v-divider class="my-4"></v-divider>
                  <v-expansion-panels v-model="expandpanel" flat hover multiple>
                    <v-expansion-panel>
                      <v-expansion-panel-header class="text-h5"> Summary</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-sheet class="my-6 text-left">
                          <v-row>
                            <v-col cols="12">
                              This section summarized results of the following results.
                            </v-col>
                            <v-col cols="12">
                              <b>The cancer cell line initially be identified by SNP Barcodes:</b>
                              <v-chip class="mx-1" color="teal" label outlined>
                                {{ localOutJson.hits && localOutJson.hits.name_snp || "" }}
                              </v-chip>
                              <b>and further be identified by stable fluctuation unit:</b>
                              <v-chip class="mx-1" color="teal" label outlined>
                                {{ localOutJson && localOutJson.hits && localOutJson.hits.name_sfu || "" }}
                              </v-chip>
                            </v-col>

                          </v-row>
                        </v-sheet>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header class="text-h5">
                        SNP Barcodes Similarity
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-sheet class="my-6 text-left">
                          <v-row>
                            <v-col cols="4">
                              Cancer cell line hit:
                              <v-chip class="mx-1" color="teal" label outlined>
                                {{ localOutJson.hits && localOutJson.hits.name_snp || "" }}
                              </v-chip>
                            </v-col>
                            <v-col cols="4">
                              Identity:
                              <v-chip class="mx-1" color="blue" label outlined>{{
                                  localOutJson && localOutJson.hits && localOutJson.hits.identity.toFixed(4) || ""
                                }}
                              </v-chip>
                            </v-col>
                            <v-col cols="12">
                              <v-sheet class="text-left pa-3">
                                <div><strong>Color code:</strong></div>
                                <div>
                                  <v-chip :color="$commonfunc.snpStatusKey2Color('4')" class="ma-1" dark small>
                                    4
                                  </v-chip>
                                  : missing
                                </div>
                                <div>
                                  <v-chip :color="$commonfunc.snpStatusKey2Color('3')" class="ma-1" dark small>
                                    3
                                  </v-chip>
                                  : totally same
                                </div>
                                <div>
                                  <v-chip :color="$commonfunc.snpStatusKey2Color('2')" class="ma-1" dark small>
                                    2
                                  </v-chip>
                                  : one base same but another is transversion
                                </div>
                                <div>
                                  <v-chip :color="$commonfunc.snpStatusKey2Color('1')" class="ma-1" dark small>
                                    1
                                  </v-chip>
                                  : one base same and another is substitution
                                </div>
                                <div>
                                  <v-chip :color="$commonfunc.snpStatusKey2Color('0')" class="ma-1" dark small>
                                    0
                                  </v-chip>
                                  : totally different
                                </div>
                              </v-sheet>
                              <v-sheet class="pa-3 " color="grey lighten-4" rounded>
                                <v-sheet class="overflow-x-auto overflow-y-auto">
                                  <v-simple-table class="overflow-x-auto" fixed-header height="600">
                                    <thead>
                                    <tr>
                                      <th class="fix-column-width">Query</th>
                                      <th class="fix-column-width">similarity</th>
                                      <th v-for="(onesnp,idx) in localOutJson && localOutJson.similarity &&  localOutJson.similarity.barcodepos || [] "
                                          :key="idx"
                                          class="fix-column-width">
                                        <v-menu
                                            bottom
                                            offset-y
                                            open-on-hover
                                        >
                                          <template v-slot:activator="{ on, attrs }">
                                            <v-btn

                                                class="px-0"
                                                color="white"
                                                elevation="0"
                                                min-width="0"
                                                style="text-transform: none"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                              <v-icon color="teal" small
                                                      @click="$commonfunc.goOuterLinkDBSNP(onesnp.rsid)">mdi-adjust</v-icon>
                                            </v-btn>
                                          </template>
                                          <v-sheet class="pa-2 text-left" color="white" elevation="99" max-width="500" rounded>
                                            <div>
                                              <strong>Position</strong>
                                            </div>
                                            <div>
                                              hg19/GRCh37: {{ onesnp.poshg19 && onesnp.poshg19.chr || '' }} :
                                              {{ onesnp.poshg19 && onesnp.poshg19.pos || '' }}
                                            </div>
                                            <div>
                                              hg38/GRCh38: {{ onesnp.poshg38 && onesnp.poshg38.chr || '' }} :
                                              {{ onesnp.poshg38 && onesnp.poshg38.pos || '' }}
                                            </div>
                                          </v-sheet>

                                        </v-menu>

                                      </th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    <!--                                      query-->
                                    <tr>
                                      <td class="fix-column-width">Query</td>
                                      <td class="fix-column-width">-</td>
                                      <td v-for="(genotype,idx) in localOutJson && localOutJson.similarity &&  localOutJson.similarity.this_seqstr || [] "
                                          :key="idx"
                                          class="fix-column-width">
                                        <div class="text-center">
                                          {{ genotype }}
                                        </div>

                                      </td>
                                    </tr>

                                    <tr v-for="(simi,idex) in localOutJson && localOutJson.similarity && localOutJson.similarity.similar"
                                        :key="idex">
                                      <td class="fix-column-width">

                                        <v-chip color="teal" label outlined
                                                @click="$router.push( `/celllinelist/${simi.cvclid}` )">
                                          {{ simi.cvclid }}
                                        </v-chip>
                                      </td>
                                      <td class="fix-column-width">{{ simi.similarity.toFixed(4) }}</td>
                                      <td v-for="(geno,iddx) in simi.seqstr_related" :key="iddx"
                                          class="fix-column-width">
                                        <div
                                            :style="{backgroundColor:$commonfunc.snpStatusKey2Color(geno),color:'white',width:'20px',borderRadius:'5px',margin:'0 auto',textAlign:'center' }">
                                          {{ geno }}
                                        </div>
                                        <!--                                          {{geno}}-->
                                      </td>
                                    </tr>

                                    </tbody>
                                  </v-simple-table>
                                </v-sheet>


                              </v-sheet>


                            </v-col>
                          </v-row>
                        </v-sheet>

                      </v-expansion-panel-content>
                    </v-expansion-panel>


                    <v-expansion-panel>
                      <v-expansion-panel-header class="text-h5">
                        Stable Fluctuation Unit
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>

                        <v-row>
                          <v-col cols="12">
                            <v-sheet class="text-left">
                              <v-row>
                                <v-col cols="3">
                                  <span class="text-h6 font-weight-bold">  Cancer Cell Line Hit: </span>
                                  <v-chip class="mx-2" color="teal" label outlined
                                          @click="$router.push( `/celllinelist/${localOutJson.hits.name_sfu}` )">
                                    {{ localOutJson && localOutJson.hits && localOutJson.hits.name_sfu || "" }}
                                  </v-chip>

                                </v-col>
                                <v-col cols="3">
                                  <span class="text-h6 font-weight-bold">  Correlation: </span>


                                  {{
                                    localOutJson && localOutJson.hits && localOutJson.hits.correlation.toFixed(4) || ""
                                  }}

                                </v-col>
                                <v-col cols="3">
                                  <span class="text-h6 font-weight-bold">  P-value: </span>

                                  {{ localOutJson && localOutJson.hits && localOutJson.hits.pvalue || "" }}

                                </v-col>
                              </v-row>


                            </v-sheet>
                          </v-col>
                          <v-col cols="12">
                            <v-sheet class="text-left">
                              <v-sheet class="text-h6 font-weight-bold">
                                Cancer Cell Line topology:
                              </v-sheet>
                              <span>
                                <span v-for="(item,idx) in LKG" :key="idx" class="mr-4 text-center">

                                  <v-chip v-if="item == 'HumanCellLines'" class="mx-2" color="blue" label
                                          outlined
                                  >
                                    HumanCellLines
                                  </v-chip>
                                  <v-chip v-if="item != 'HumanCellLines'" class="mx-2" color="teal" label outlined
                                          @click="$router.push( `/celllinelist/${  item }` )">
                                     {{ item }}
                                  </v-chip>

                                  <span v-show="idx < (LKG.length-1)" class="text-center"> &nbsp;->&nbsp;</span> </span>
                              </span>
                            </v-sheet>

                          </v-col>
                          <v-col cols="12">
                            <v-sheet>
                              <v-row>
                                <v-col cols="12">
                                  <v-sheet class="text-h6 text-left font-weight-bold">
                                    Cancer Cell Line Stable Fluctuation Plot
                                  </v-sheet>
                                </v-col>
                                <v-col cols="4">
                                  <v-select
                                      v-model="selected_sfu_name"
                                      :items="SFUNameList || []"
                                      dense
                                      hide-details
                                      outlined
                                  >

                                  </v-select>
                                </v-col>
                              </v-row>
                            </v-sheet>
                            <v-sheet height="800">
                              <annotated-result-page-s-f-u-plot :options="chartOption" chartid="sfuid"
                                                                style="height:800px;width:100%;"></annotated-result-page-s-f-u-plot>
                            </v-sheet>
                          </v-col>
                        </v-row>


                      </v-expansion-panel-content>

                    </v-expansion-panel>


                  </v-expansion-panels>
                </v-sheet>

              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import BreadCrumb from "./sub/breadCrumb";
import Axios from "axios";
import AnnotatedResultPageSFUPlot from "./annotatedResultPageSFUPlot";

export default {
  name: "annotatedResultPage",
  components: {AnnotatedResultPageSFUPlot, BreadCrumb},
  data() {
    return {
      expandpanel: [0, 1, 2,],
      breadcrumbData: [
        {
          text: "CCLHunter",
          disabled: false,
          href: baseURL + '/home'
        },
        {
          text: "Task Submission",
          disabled: false,
          href: baseURL + '/task'
        },
        {
          text: "Results",
          disabled: true,
        },
      ],
      cellsnpbarcodes_pos: null,
      chartOption: null,
      selected_sfu_name: null,

    }
  },
  computed: {
    localOutJson() {
      if (this.$store.state.outputJson === null) {
        return {}
      } else {
        let outjson = this.$store.state.outputJson;

        outjson.similarity.this_seqstr = outjson.similarity.this_seqstr.split(/\|/) || [];
        outjson.similarity.similar.map(d => {
          d.seqstr_related = d.seqstr_related.split(/\|/);
          return d;
        });

        // Axios.post(baseURL + "/api/get_snpbarcodes_pos").then(res => {
        //
        //   this.cellsnpbarcodes_pos = res.data;
        //   outjson.similarity.barcodepos = this.cellsnpbarcodes_pos;
        //
        // })

        return outjson;
      }
    },
    LKG() {
      if (this.$store.state.outputJson === null) {
        console.log("lkg_topology is null")
        return []
      } else {
        let lkg_list = this.$store.state.outputJson.hits.lkg_topology;

        if (lkg_list.length > 0) {
          let lkg_dict = {}
          lkg_list.forEach(d => {
            lkg_dict[d.name] = d.children[0] || null;
          })
          let linage = []
          let current_name = "HumanCellLines";
          linage.push(current_name)
          for (let x = 0; x < 100; x++) {
            let next_name = lkg_dict[current_name]
            if (next_name != null) {
              linage.push(next_name)
              current_name = next_name
            } else {
              break
            }
          }
          return linage

        } else {
          console.log("lkg_topology is empty")
          return []
        }


      }
    },
    SFUNameList() {
      if (this.$store.state.outputJson === null) {
        console.log("lkg_topology is null")
        return []
      } else {
        return Object.keys(this.$store.state.outputJson.sfu_identity)
      }
    },
    SFUDataDict() {
      if (this.$store.state.outputJson === null) {
        console.log("lkg_topology is null")
        return []
      } else {
        let outlist = {}

        let sfusimilarity = this.$store.state.outputJson.sfu_identity;

        let sfunames = Object.keys(sfusimilarity);

        if (sfunames.length == 0) {
          return []
        } else {

          for (let sfu in sfusimilarity) {
            let outsuf = {}
            outsuf.name = sfu;
            outsuf.lm = sfusimilarity[sfu].lm;
            const colorArray = sfusimilarity[sfu].sfu.split(/\|/);
            outsuf.pos = sfusimilarity[sfu].rank.split(/\|/).map((d, i) => {
              return [
                parseInt(i),
                parseInt(d),
                parseInt(colorArray[i])

              ]
            });
            outsuf.correlation = sfusimilarity[sfu].correlation;
            outsuf.pvalue = sfusimilarity[sfu].pvalue

            outlist[sfu] = outsuf
          }

          return outlist;

        }


      }
    }
  },

  methods: {
    setChartOption(selected_sfu_name) {


      const selected_sfu = this.SFUDataDict[selected_sfu_name];

      const dataAll = selected_sfu.pos;


      let lmY = (dataAll.length - 1) * selected_sfu.lm[0] + selected_sfu.lm[1];
      let lmX = 0
      if (lmY > (dataAll.length - 1)) {

        lmX = Math.floor(((dataAll.length - 1) - selected_sfu.lm[1]) / selected_sfu.lm[0])
        lmY = lmX * selected_sfu.lm[0] + selected_sfu.lm[1];
      } else {
        lmX = (dataAll.length - 1)
      }


      const markLineOpt = {
        animation: false,
        label: {
          formatter: `y = ${selected_sfu.lm[0].toFixed(4)} * x +  ${selected_sfu.lm[1].toFixed(4)}`,
          align: 'right'
        },
        // lineStyle: {
        //   type: 'solid'
        // },
        tooltip: {
          formatter: `y = ${selected_sfu.lm[0].toFixed(4)} * x +  ${selected_sfu.lm[1].toFixed(4)}`,
        },
        lineStyle: [{
          type: ['solid', 'dot'],
          color: 'red'
        },

        ],
        data: [
          [
            {
              coord: [0, selected_sfu.lm[1]],
              symbol: 'none'
            },
            {
              // coord: [(dataAll.length-1), (dataAll.length -1)* selected_sfu.lm[0] + selected_sfu.lm[1] ],
              coord: [lmX, lmY],
              symbol: 'none'
            }
          ],
          // [
          //   {
          //     coord: [0, selected_sfu.lm[0]],
          //     symbol: 'none'
          //   },
          //   {
          //     // coord: [(dataAll.length-1), (dataAll.length -1)* selected_sfu.lm[0] + selected_sfu.lm[1] ],
          //     coord: [(dataAll.length-1), (dataAll.length-1) ],
          //     symbol: 'none'
          //   }
          // ],
        ]
      };

      const abLine = [
        [0, 0],
        [(dataAll.length - 1), (dataAll.length - 1)]
      ]

      // debugger;
      this.chartOption =
          {
            title: {
              text: selected_sfu.name,
              left: 'center',
              top: 0
            },
            grid: [
              {left: '5%', top: '5%', right: '5%', bottom: '5%'},
            ],
            tooltip: {
              formatter: 'Group {a}: ({c})'
            },
            xAxis: [
              {gridIndex: 0, min: 0, max: dataAll.length - 1},
            ],
            yAxis: [
              {gridIndex: 0, min: 0, max: dataAll.length - 1},
            ],

            series: [
              {
                name: selected_sfu.name,
                type: 'scatter',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: dataAll,
                markLine: markLineOpt,
                itemStyle: {
                  color: function (params) {
                    if (params.data[2] == 0) {
                      return '#FFAFCC'
                    } else {
                      return '#03AFCC'
                    }
                  }
                }
                // visualMap: [
                //   {
                //
                //     categories: [0, 1],
                //     dimensions: 3
                //   }
                // ],
              },
              {
                type: 'line',
                data: abLine
              }

            ]
          };

    }
  },

  created() {

  },
  mounted() {
    window.scroll(0, 0)
    this.selected_sfu_name = this.SFUNameList[0];
  },
  watch: {
    selected_sfu_name: {
      handler: function (newval) {
        if (newval != null) {
          this.setChartOption(newval);
        }
      }
    }


  },

  beforeDestroy() {
    //每次离开的时候清空outputJSON
    this.$store.commit('clearOutputJson');
  }
}
</script>

<style scoped>
.fix-column-width {
  width: 20px !important;
  margin: 0 auto !important;
  padding: 1px 3px 1px 3px !important;
}

</style>