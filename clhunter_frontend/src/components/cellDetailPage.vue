<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>

      <v-row class="pt-3">
        <v-col>
          <v-sheet min-height="600" rounded>
            <v-row>
              <v-col cols="10" offset="1">
                <v-sheet class="pa-8">

                  <v-row>
                    <v-col cols="10" offset="1">

                      <v-row>
                        <v-col cols="12">
                          <div class="text-h4 text-left">Basic information</div>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-h5 text-left py-3">Accession & Names</div>
                          <v-sheet class="pa-3" color="grey lighten-4" rounded>
                            <v-row>

                              <v-col class="text-left" cols="2"><strong>Accession: </strong>
                                <v-chip color="teal lighten-2" label outlined text-color="teal darken-3">
                                  {{ $route.params.cid }}
                                </v-chip> &nbsp;
                                <v-icon color="teal" small
                                        @click="$commonfunc.goOuterLinkCellsaurus($route.params.cid)">mdi-share
                                </v-icon>
                              </v-col>

                              <v-col class="text-left" cols="10"><strong>Name: </strong>
                                <v-chip color="teal lighten-2" label outlined text-color="teal darken-3">
                                  {{ celldata.meta && celldata.meta.Name }}
                                </v-chip>

                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col class="text-left" cols="2"><strong>Synonymous names:</strong></v-col>
                                  <v-col class="text-left" cols="10">


                                    <v-chip

                                        v-for="item in celldata.meta.Synon_name && celldata.meta.Synon_name.split(/; /) || []"
                                        :key="item" class="ma-1"
                                        color="blue lighten-2" label outlined
                                        style="word-break: normal" text-color="blue darken-3">
                                      {{ item }}
                                    </v-chip>


                                  </v-col>

                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col class="text-left" cols="2"><strong>Lineage:</strong></v-col>
                                  <v-col class="text-left" cols="10">


                                    <v-chip
                                        v-show="celldata.meta && (celldata.meta.lineage !='None') || false"
                                        class="ma-1"
                                        color="blue lighten-2" label outlined
                                        style="word-break: normal" text-color="blue darken-3">
                                      {{ celldata.meta && celldata.meta.lineage || '' }}
                                    </v-chip>

                                  </v-col>

                                </v-row>
                              </v-col>
                            </v-row>
                            <v-row>

                            </v-row>

                          </v-sheet>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-h5 text-left py-3">Original individual information</div>
                          <v-sheet class="pa-3" color="grey lighten-4" rounded>
                            <v-row>
                              <v-col class="text-left" cols="2"><strong>Sex: </strong>
                                <v-chip color="teal lighten-2" label outlined text-color="teal darken-3">
                                  {{ celldata.meta && celldata.meta.Sex }}
                                </v-chip>
                              </v-col>
                              <v-col class="text-left" cols="10"><strong>Age: </strong>
                                <v-chip color="teal lighten-2" label outlined text-color="teal darken-3">
                                  {{ celldata.meta && celldata.meta.Age }}
                                </v-chip>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col class="text-left" cols="2"><strong>Disease:</strong></v-col>
                                  <v-col class="text-left" cols="10">
                                    <v-chip
                                        v-for="item in celldata.meta.Disease && celldata.meta.Disease.split(/; /) || []"
                                        :key="item" class="ma-1"
                                        color="blue lighten-2" label outlined
                                        style="word-break: normal" text-color="blue darken-3">
                                      {{ item }}
                                    </v-chip>
                                  </v-col>

                                </v-row>
                              </v-col>
                              <v-col cols="12">
                                <v-row>
                                  <v-col class="text-left" cols="2"><strong>Genome Composition:</strong></v-col>
                                  <v-col class="text-left" cols="10">
                                    <v-chip
                                        v-for="item in celldata.meta.genome_composition && celldata.meta.genome_composition.replace(/\(PubMed.*$/,'').split(/; /) || []"
                                        :key="item" class="ma-1"
                                        color="blue lighten-2" label outlined
                                        style="word-break: normal" text-color="blue darken-3">
                                      {{ item }}
                                    </v-chip>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                            <v-row>

                            </v-row>

                          </v-sheet>
                        </v-col>

                        <v-col cols="12">
                          <div class="text-h4 text-left">SNP barcode</div>
                        </v-col>

                        <v-col cols="12">
                          <!--                          <div class="text-h5 text-left py-3"></div>-->


                          <v-sheet class="text-left pa-3">
                            <div><strong>Color code:</strong></div>

                            <div>
                              <v-chip :color="$commonfunc.snpStatusKey2Color('3')" dark small>
                                3
                              </v-chip>
                              : totally same
                            </div>
                            <div>
                              <v-chip :color="$commonfunc.snpStatusKey2Color('2')" dark small>
                                2
                              </v-chip>
                              : one base same but another is transversion
                            </div>
                            <div>
                              <v-chip :color="$commonfunc.snpStatusKey2Color('1')" dark small>
                                1
                              </v-chip>
                              : one base same and another is substitution
                            </div>
                            <div>
                              <v-chip :color="$commonfunc.snpStatusKey2Color('0')" dark small>
                                0
                              </v-chip>
                              : totally different
                            </div>
                          </v-sheet>

                          <v-sheet class="pa-3 " color="grey lighten-4" rounded>

                            <v-sheet >
                              <v-simple-table style="border-collapse: collapse"   fixed-header height="600">
                                <thead>
                                <tr>
                                  <th class="fix-column-width" >Cell Line</th>
                                  <th class="fix-column-width" >similarity</th>
                                  <th  class="fix-column-width"  v-for="(onesnp,idx) in celldata.similarTop10 && celldata.similarTop10.barcodepos || []"
                                      :key="onesnp.rsid"  >
                                    <v-menu
                                        bottom
                                        offset-y
                                        open-on-hover
                                    >
                                      <template v-slot:activator="{ on, attrs }">


                                        <v-btn

                                            min-width="0"
                                            class="px-0"
                                            color="white"
                                            elevation="0"
                                            style="text-transform: none"
                                            v-bind="attrs"
                                            v-on="on"
                                        >

<!--                                           <span >-->

<!--                                           </span>-->
                                          <span>
                                             <v-icon  color="teal" small
                                                     @click="$commonfunc.goOuterLinkDBSNP(onesnp.rsid)">mdi-adjust</v-icon>
                                           </span>


                                        </v-btn>

                                      </template>
                                      <v-sheet class="pa-2 text-left" color="white" elevation="99" max-width="500"
                                               rounded>
                                        <div>
                                          {{ onesnp.rsid }}
                                        </div>

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

                                <tr>
                                  <td class="fix-column-width">

                                    <v-chip color="red" label outlined
                                            @click="$router.push( `/celllinelist/${celldata.similarTop10.similar.this}` )">
                                      {{
                                        celldata.similarTop10 && celldata.similarTop10.similar && celldata.similarTop10.similar.this || ""
                                      }}
                                    </v-chip>
                                  </td>


                                  <td class="fix-column-width">-</td>
                                  <td class="fix-column-width" v-for="(genotype,idx) in celldata.similarTop10.similar && celldata.similarTop10.similar.this_seqstr || [] "
                                      :key="idx">{{ genotype }}
                                  </td>
                                </tr>

                                <tr v-for="(simi,idx) in  celldata.similarTop10.similar && celldata.similarTop10.similar.similar || [] "
                                    :key="idx" >
                                  <td class="fix-column-width">
                                    <v-chip color="teal" label outlined
                                            @click="$router.push( `/celllinelist/${simi.cvclid}` )">
                                      {{ simi.cvclid }}
                                    </v-chip>


                                  </td>
                                  <td class="fix-column-width">{{ simi.similarity }}</td>
                                  <td class="fix-column-width" v-for="(ggg,idx2) in simi.seqstr || []" :key="idx2" >


                                    <div
                                        :style="{backgroundColor:$commonfunc.snpStatusKey2Color(ggg),color:'white',width:'20px',borderRadius:'5px',margin:'0 auto',textAlign:'center' }"
                                        dark small>
                                      {{ ggg }}
                                    </div>
                                  </td>
                                </tr>

                                </tbody>

                              </v-simple-table>
                            </v-sheet>

                          </v-sheet>
                        </v-col>


                        <v-col cols="12">
                          <div class="text-h4 text-left">Related publications</div>
                        </v-col>
                        <v-col cols="12">
                          <!--                          <div class="text-h5 text-left py-3"></div>-->
                          <v-sheet class="pa-3" color="grey lighten-4" rounded>
                            <v-row>
                              <v-col cols="12">
                                <vxe-table
                                    :column-config="{resizable: true}"
                                    :data="celldata && celldata.publication || []"
                                    :export-config="{}"
                                    :print-config="{}"
                                    align="left"
                                    border
                                    empty-text="Empty"
                                    max-height="600"
                                    round
                                    show-overflow
                                    stripe
                                >

                                  <vxe-column title="" type="expand" width="50">
                                    <template #content="{ row }">
                                      <v-sheet class="pa-4">
                                        <v-row>
                                          <v-col class="text-left" cols="12"><strong>Authors</strong></v-col>
                                          <v-col cols="12">
                                            <v-sheet class="px-3 text-justify"
                                                     style="word-wrap: break-word !important; white-space: normal !important;"
                                                     width="100%">
                                              {{ row.Author }}
                                            </v-sheet>
                                          </v-col>
                                          <v-col class="text-left" cols="12"><strong>Abstract</strong></v-col>
                                          <v-col cols="12">
                                            <v-sheet class="text-justify"
                                                     style="word-wrap: break-word !important; white-space: normal !important;"
                                                     width="100%">
                                              {{ row.Abstract }}
                                            </v-sheet>
                                          </v-col>
                                        </v-row>
                                      </v-sheet>


                                    </template>

                                  </vxe-column>
                                  <vxe-column field="PMID" sortable title="PMID" width="100">
                                    <template #default="{row}">

                                      {{ row.PMID }}
                                      <v-icon color="teal" small @click="$commonfunc.goOuterLinkPubmed(row.PMID)">
                                        mdi-share
                                      </v-icon>
                                    </template>

                                  </vxe-column>
                                  <vxe-column field="Title" min-width="500" sortable title="Title"></vxe-column>
                                  <vxe-column field="Date" sortable title="Date" width="100"></vxe-column>
                                  <vxe-column field="Source" min-width="500" sortable
                                              title="Publish Information"></vxe-column>

                                </vxe-table>
                              </v-col>

                            </v-row>
                            <v-row>

                            </v-row>

                          </v-sheet>
                        </v-col>

                      </v-row>

                    </v-col>
                  </v-row>

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
import Axios from 'axios'
import BreadCrumb from "@/components/sub/breadCrumb";

export default {
  name: "cellDetailPage",
  components: {BreadCrumb},
  data() {
    return {
      breadcrumbData: [
        {
          text: "CCLHunter",
          disabled: false,
          href: baseURL + '/home'
        },
        {
          text: "Cell Line List",
          disabled: false,
          href: baseURL + '/celllinelist'
        },
        {
          text: this.$route.params.cid,
          disabled: true,
        },
      ],
      celldata: {
        meta: {
          Accn: null,
          Age: null,
          Alt_name: null,
          Disease: null,
          Name: null,
          Publications: null,
          Sex: null,
          Synon_name: null,
          genome_composition: null,
          lineage: null,

        },
        publication: [],
        similarTop10: {},
      }
    }
  },
  mounted() {
    console.log(this.$commonfunc)
    this.loadData();
  },

  methods: {
    loadData() {

      Axios.post(
          baseURL + '/api/get_onecellline_meta',
          {},
          {
            params: {
              cid: this.$route.params.cid,
            },
            timeout: 60000
          }
      ).then(res => {
        if (res.data != null) {

          this.celldata.meta = res.data;
        }
      }).catch(err => {

      })
      this.celldata.similarTop10 = {}
      Axios.post(
          baseURL + '/api/get_onecellline_similar',
          {},
          {
            params: {
              cid: this.$route.params.cid,
            },
            timeout: 60000
          }
      ).then(res => {
        if (res.data.similar != null) {
          this.celldata.similarTop10 = res.data;
        }
      }).catch(err => {

      })


      Axios.post(
          baseURL + '/api/get_onecellline_publication',
          {},
          {
            params: {
              cid: this.$route.params.cid,
            },
            timeout: 60000
          }
      ).then(res => {
        if (res.data != null) {

          this.celldata.publication = res.data;
        }
      }).catch(err => {

      })


    },
    // snpStatusKey2Color(k) {
    //   if (k == '0') {
    //     return '#D93945'
    //   } else if (k == '1') {
    //     return '#407796'
    //   } else if (k == '2') {
    //     return '#A4D4D6'
    //   } else if (k == '3') {
    //     return '#183455'
    //   }
    // }
  },
  watch: {
    '$route.params.cid': {
      handler: function () {
        this.loadData();
      },
      deep: true,
      immediate: true
    }
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