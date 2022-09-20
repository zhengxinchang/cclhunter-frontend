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

                  <div class="text-left text-h5">Introduction</div>
                  <div class="text-justify text-body-1 mt-8">

                    <div :class="thisClass.lineHight"><strong>CCLHunter</strong> uses
                      {{ $store.state.cellbarcode && $store.state.cellbarcode.length }} SNPs as barcodes to distinguish
                      cell lines. These SNPs were evenly distributed in each chromosome of the human genome (ChrX and
                      ChrY are excluded) and were screened by the following criteria:
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-1-box</v-icon>
                      The locus is located in the CDs region of the recognized coding gene
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-2-box</v-icon>
                      The allele frequency of this locus in dbSNP ranged from 0.4 to 0.6
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-3-box</v-icon>
                      The allele frequencies of this locus in our curated CCLs ranged from 0.4 to 0.6
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-4-box</v-icon>
                      The locus is not in the tandem repeat region identified by tandem repeat finder
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-5-box</v-icon>
                      The region is not in the linkage disequilibrium region
                    </div>
                    <div color="teal" :class="thisClass.lineHight">
                      <v-icon>mdi-numeric-6-box</v-icon>
                      The SNP is present both in COSMIC and CCLE datasets and both have hg19/hg38 coordinates
                    </div>

                  </div>
                </v-sheet>

                <v-sheet class="px-8 py-4">
                  <div class="text-left text-h5">SNP Barcodes</div>


                  <v-sheet>
                    <v-btn-toggle v-model="selected_refver" dense>
                      <v-btn small color="teal lighten-3">
                        hg19/GRCh37
                      </v-btn>
                      <v-btn small color="teal lighten-3">
                        hg38/GRCh38
                      </v-btn>
                    </v-btn-toggle>


                  </v-sheet>
                  <v-sheet class="mx-auto" width="1200px">
                    <v-sheet class="text-left">
                      The grey and black bands in each chromosome represent heterochromatin. The pink region is the area
                      around the centromere, and the blue represents variable regions.
                    </v-sheet>
                    <barcode-sub-ideogram :dat="ideogramData2Show" :refver="ideogramRefver2Show"></barcode-sub-ideogram>
                  </v-sheet>


                  <vxe-toolbar export print custom></vxe-toolbar>

                  <vxe-table
                      stripe
                      align="left"
                      :column-config="{resizable: true}"
                      :data="$store.state.cellbarcode"
                      :loading="tableLoading"
                      :export-config="{}"
                      :print-config="{}"
                      border
                      empty-text="Empty"
                      round
                      show-overflow
                      height="600"
                  >
                    <vxe-column sortable type="seq" field="" title="#"></vxe-column>
                    <vxe-column sortable field="rsid" title="RSID"></vxe-column>
                    <vxe-column sortable field="symbol" title="Symbol"></vxe-column>
                    <vxe-column sortable field="hg19chr" title="Chromosome (hg19/GRCh37)"></vxe-column>
                    <vxe-column sortable field="hg19pos" title="Position (hg19/GRCh37)"></vxe-column>
                    <vxe-column sortable field="hg38chr" title="Chromosome (hg38/GRCh38)"></vxe-column>
                    <vxe-column sortable field="hg38pos" title="Position (hg38/GRCh38)"></vxe-column>
                  </vxe-table>
                  <!--              <vxe-pager-->
                  <!--                  :current-page="tablePage.currentPage"-->
                  <!--                  :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"-->
                  <!--                  :loading="tableLoading"-->
                  <!--                  :page-size="tablePage.pageSize"-->
                  <!--                  :total="tablePage.totalPage"-->
                  <!--                  @page-change="handlePageChange">-->
                  <!--              </vxe-pager>-->
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
import BreadCrumb from "@/components/sub/breadCrumb";
import Axios from 'axios'
import BarcodeSubIdeogram from "@/components/barcodeSubIdeogram";
import Helpmsg from "@/components/sub/helpmsg";

export default {
  name: "barcodes",
  components: {Helpmsg, BarcodeSubIdeogram, BreadCrumb},
  data() {
    return {
      breadcrumbData: [
        {
          text: "CCLHunter",
          disabled: false,
          href: baseURL + '/home'
        },
        // {
        //   text: "Home",
        //   disabled: false,
        //   href: baseURL + "/#/home"
        // },
        {
          text: "Barcodes",
          disabled: true,
        },
      ],
      thisClass: {
        lineHight: [
          "mt-2"
        ]
      },
      selected_refver: 0,
      // tableData:[],
      tableLoading: false,
      tmpideogram: {
        hg19: [],
        hg38: []
      },
      ideogramData2Show: [],
      ideogramRefver2Show: 'GRCh37'

    }
  },
  watch: {
    'selected_refver': function (newval) {
      if (newval == 0) {
        this.ideogramRefver2Show = 'GRCh37'
        this.ideogramData2Show = this.tmpideogram.hg19
      } else {
        this.ideogramRefver2Show = 'GRCh38'
        this.ideogramData2Show = this.tmpideogram.hg38
      }
    },
    '$store.state.cellbarcode':{
      handler:function (newval){
        if(newval !=null){
          this.loadData();
        }
      },
      deep:true,
      immediate:true
    }
  },
  // beforeMount() {
  //   this.loadData()
  // },
  methods: {
    loadData() {

      // if (this.$store.state.cellbarcode == null) {
      //   alert("bbb")
        this.tableLoading = true;


        // new Promise((resolve, reject)=>{

          this.$store.state.cellbarcode.forEach(res => {

            this.tmpideogram.hg19.push(
                {
                  name: 'rsid: ' + res['rsid'] + ' | gene: ' + res['symbol'],
                  chr: res['hg19chr'],
                  start: parseInt(res['hg19pos']),
                  stop: parseInt(res['hg19pos']),
                  // shape:"circle",
                  color: 'teal'
                }
            )

            this.tmpideogram.hg38.push(
                {
                  name: 'rsid: ' + res['rsid'] + ' | gene: ' + res['symbol'],
                  chr: res['hg38chr'],
                  start: parseInt(res['hg38pos']),
                  stop: parseInt(res['hg38pos']),
                  // shape:"circle",
                  color: 'teal'
                }
            )
          });
            this.ideogramData2Show = this.tmpideogram.hg19
            this.ideogramRefver2Show = 'GRCh37'
      this.tableLoading = false;

        //   }).then((res)=>{
        //     this.tableLoading = false;
        // }).catch(err => {
        //     this.tableLoading = false;
        //   }) ;
        //

        //
        // Axios.post(
        //     baseURL + '/api/get_snpbarcodes',
        //     {},
        //     {
        //       timeout: 60000
        //     }
        // ).then(res => {
        //
        //   this.$store.state.cellbarcode = res.data;
        //
        //
        //   res.data.forEach(res => {
        //
        //     this.tmpideogram.hg19.push(
        //         {
        //           name: 'rsid: ' + res['rsid'] + ' | gene: ' + res['symbol'],
        //           chr: res['hg19chr'],
        //           start: parseInt(res['hg19pos']),
        //           stop: parseInt(res['hg19pos']),
        //           // shape:"circle",
        //           color: 'teal'
        //         }
        //     )
        //
        //     this.tmpideogram.hg38.push(
        //         {
        //           name: 'rsid: ' + res['rsid'] + ' | gene: ' + res['symbol'],
        //           chr: res['hg38chr'],
        //           start: parseInt(res['hg38pos']),
        //           stop: parseInt(res['hg38pos']),
        //           // shape:"circle",
        //           color: 'teal'
        //         }
        //     )
        //
        //     this.ideogramData2Show = this.tmpideogram.hg19
        //     this.ideogramRefver2Show = 'GRCh37'
        //
        //   });
        //
        //   // this.tableData = res.data;
        //   this.tableLoading = false;
        //   // this.tablePage.totalPage = this.$store.state.cellbarcode && this.$store.state.cellbarcode.length;
        // }).catch(err => {
        //   this.tableLoading = false;
        // })


    },

  },

}
</script>

<style scoped>


</style>