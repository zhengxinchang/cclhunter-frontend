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

                  <v-sheet outlined rounded class="mt-8 pa-2">
                    <div class="text-justify text-body-1 mt-4">
                      CCLHunter provides 2 ways for users to identify their cancer cell lines:
                      <ol>
                        <li class="mt-2">
                          If you have downloaded the command line program of CCLHunter, please provide the output result
                          of the CCLHunter command line program. We will further annotate and visualize the results.
                        </li>
                        <li class="mt-2">
                          If you have not downloaded the command line program of CCLHunter, please run the following
                          command to extract the key information in your BAM file and upload the output. We will run the
                          authentication program of CCLHunter for you in our task queue.
                          <div>

                            <v-sheet rounded outlined class="my-2 pa-2">
                              <v-row>
                                <v-col cols="3">
                                  <v-select
                                      outlined
                                      dense
                                      v-model="cmdUserRun.refver"
                                      :items="['hg19/GRCh37','hg38/GRCh38']"
                                      label="Reference version"
                                      hide-details
                                  ></v-select>
                                </v-col>
                                <v-col cols="3">
                                  <v-select
                                      outlined
                                      dense
                                      hide-details
                                      v-model="cmdUserRun.hasPrefix"
                                      :items="['Yes','No']"
                                      label="Does reference have the 'chr' prefix?"
                                  ></v-select>
                                </v-col>
                                <v-col cols="3">
                                  <v-btn
                                  color="teal darken-3"
                                  @click="copy2clipboard"
                                  dark
                                  style="text-transform: none;"
                                  >
                                    <v-icon>mdi-content-copy</v-icon> Copy
                                  </v-btn>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols=12>
                                  <v-sheet color="grey lighten-3" outlined elevation="2" style="position: relative;"  min-height="40" class="py-4 px-2 "  rounded>

                                    <v-sheet style="text-wrap: normal" color="grey lighten-3"  class="mr-8 px-2 py-2 overflow-x-auto  text-no-wrap" >
                                        {{cmdForUserToRun}}
                                    </v-sheet>
                                    <span  style="position:absolute;  right:8px;top:22px"  >
                                    <v-icon size="20" color="teal darken-3" @click="copy2clipboard" >mdi-content-copy</v-icon>
                                  </span>

                                  </v-sheet>
                                </v-col>
                              </v-row>
                            </v-sheet>

                          </div>
                        </li>
                      </ol>

                    </div>
                  </v-sheet>


                  <v-sheet class="text-left text-h6 mt-10">
                    Submit Your Task
                  </v-sheet>
                  <v-sheet class="mt-6 pa-2" rounded outlined>
                    <v-tabs
                        v-model="tab"
                        centered
                        grow

                        :color="$store.state.mainColor"
                    >
                      <v-tab
                          style="text-transform: none"
                      >
                        1. Upload the output from CCLHunter command line program
                      </v-tab>
                      <v-tab
                          style="text-transform: none"
                      >
                        2. Upload the key information from BAM file
                      </v-tab>
                    </v-tabs>

                    <v-tabs-items

                        v-model="tab"
                    >
                      <v-tab-item>
                        <v-sheet class="mx-4 my-8">
                          <v-row align="center" class="my-8">
                            <v-col cols="10">
                              <v-file-input
                                  hide-details
                                  v-model="cmdOutput"
                                  dense
                                  outlined
                                  prepend-icon=""
                                  prepend-inner-icon="$file"
                                  label="Output from CCLHunter command line program"
                              ></v-file-input>

                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                  :color="$store.state.mainColor"
                                  dark
                                  @click="loadCmdOutput"
                                  style="text-transform: none"
                              >
                                <v-icon size="20">mdi-magnify</v-icon>
                                Check
                              </v-btn>
                            </v-col>
                          </v-row>



                          <v-sheet class="overflow-auto">

                            <v-sheet ref="errormessage" class="text-left my-2 px-2 py-4" color="grey lighten-3" v-show="cmdOutputJsonValidateMessage.length >0" >
                              <v-sheet color="grey lighten-3" class="text-h6 font-weight-bold my-2">Uploaded json file is invalid, please check error messages bellow:</v-sheet>
                              <v-sheet color="grey lighten-3 my-1"  v-for="(item,idx) in cmdOutputJsonValidateMessage" :key="idx" >
                                {{idx+1}}: <b>Field:</b> {{item.dataPath}} , <b>Error Message:</b> {{item.message}}
                              </v-sheet>
                            </v-sheet>

                            <v-sheet ref="errormessage" class="text-left my-2 px-2 py-4" color="grey lighten-3" v-show="cmdOutputGeneralMessage.show" >
                              <v-sheet color="grey lighten-3" class="text-h6 font-weight-bold my-2">{{ cmdOutputGeneralMessage.message }}
                                <router-link to="/task/results">
                                  <v-btn color="teal darken-3" small dark style="text-transform: none">Show Results  <v-icon class="px-2" size="14">mdi-eye</v-icon> </v-btn>
                                </router-link>

                              </v-sheet>
                            </v-sheet>


                          </v-sheet>

                        </v-sheet>
                      </v-tab-item>
                      <v-tab-item>
                        ddd
                      </v-tab-item>
                    </v-tabs-items>
                  </v-sheet>
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
import Ajv from 'ajv'
import schema from "../../public/cclhunter_output_schema.json";
import Axios from "axios";
export default {
  name: "taskPanel",
  components: {BreadCrumb},
  data() {
    return {
      tab: 0,
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
          text: "Task Submission",
          disabled: true,
        },
      ],

      cmdOutput:null,
      // cmdOutputJson:null,
      cmdOutputJsonValidateMessage:[],
      cmdOutputGeneralMessage:{
        show:false,
        message:""
      },
      cmdForUserToRun: null,
      cmdUserRun:{
        refver:'hg19/GRCh37',
        hasPrefix:"No",
      }
    }
  },

  methods:{
    copy2clipboard(){

      this.$copyText(this.cmdForUserToRun).then(function (e) {
            alert('Copied')
          }, function (e) {
            alert('Can not copy')
          }
      )
    },

    loadCmdOutput(){

      this.cmdOutputJsonValidateMessage = [];
      this.cmdOutputGeneralMessage.show = false;
      this.$store.commit('clearOutputJson');

      if (this.cmdOutput && this.cmdOutput.text  ){
        this.cmdOutput.text().then(res=>{

          try {
            const tmpcmdOutputJson = JSON.parse(res)
            this.$store.commit('setOutputJson',tmpcmdOutputJson);


            Axios.post(baseURL + "/api/get_snpbarcodes_pos").then(res => {

              // this.cellsnpbarcodes_pos =
              this.$store.state.outputJson.similarity.barcodepos = res.data;

            })

          }
          catch (e){
            this.cmdOutputGeneralMessage.message = "Failed to parse the uploaded file in JSON format, please check your file format."
            this.cmdOutputGeneralMessage.show = true
            return
          }

          // console.log(this.$store.state.outputJson);

          // validate output
          const ajv = new Ajv();

          const schema = require("../../public/cclhunter_output_schema.json");
          // console.log(schema)
          const validate = ajv.compile(schema)

          const valid = validate(this.$store.state.outputJson);
          if (!valid){

            validate.errors.forEach(t=>{
              this.cmdOutputJsonValidateMessage.push({
                dataPath:t.dataPath,
                message:t.message,
              })
            })
          }else{
            this.cmdOutputGeneralMessage.message = "The file has been parsed successfully and passed the verification. You will jump to the result page..."
            this.cmdOutputGeneralMessage.show = true;
          }

        })
      }


    },
    genCmdForUserToRun(){
      let tempCmd = [ "echo "];
      if(this.cmdUserRun.refver == 'hg19/GRCh37'){
        this.$store.state.cellbarcode.forEach(d=>{

          let onePos = ""
          if(this.cmdUserRun.hasPrefix == 'Yes') onePos += 'chr'
          onePos += `${d['hg19chr']}:${d['hg19pos']}-${d['hg19pos']}`
          tempCmd.push(
              onePos
          )
        })
      }else{
        this.$store.state.cellbarcode.forEach(d=>{

          let onePos = ""
          if(this.cmdUserRun.hasPrefix == 'Yes') onePos += 'chr'
          onePos += `${d['hg38chr']}:${d['hg38pos']}-${d['hg38pos']}`
          tempCmd.push(
              onePos
          )
        })

      }
      tempCmd.push("| samtools view -@ 4 -hb -o [output.bam] [input.bam] -")
      this.cmdForUserToRun = tempCmd.join(" ");
    },
    runVisualization(){
      // 做展示
      // console.log( typeof this.cmdOutput)
      // console.log(this.cmdOutput)

      // const reader = new FileReader();
      // reader.readAsText(this.cmdOutput);
      // console.log(reader.result)

    }
  },
  watch:{
    cmdUserRun:{
      handler:function (newval){
            this.genCmdForUserToRun();
      },
      immediate:true,
      deep:true
    },
    '$store.state.cellbarcode':{
      handler:function (newval){
        this.genCmdForUserToRun();
      },
      immediate:true,
      deep:true
    }
  },

}
</script>

<style scoped>

</style>