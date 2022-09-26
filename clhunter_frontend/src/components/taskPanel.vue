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
                  <v-sheet class=" pa-2" rounded>
                    <div class="text-justify text-body-1 mt-4">
                      CCLHunter provides 2 ways for users to identify their cancer cell lines:
                      <!--                      <ol>-->
                      <!--                        <li class="mt-2">-->
                      <!--                          If you have downloaded the command line program of CCLHunter, please provide the output result-->
                      <!--                          of the CCLHunter command line program. We will further annotate and visualize the results.-->
                      <!--                        </li>-->
                      <!--                        <li class="mt-2">-->
                      <!--                          If you have not downloaded the command line program of CCLHunter, please run the following-->
                      <!--                          command to extract the key information in your BAM file and upload the output. We will run the-->
                      <!--                          authentication program of CCLHunter for you in our task queue.-->
                      <!--                          <div>-->
                      <!--                            <v-sheet rounded outlined class="my-2 pa-2">-->
                      <!--                              <v-row>-->
                      <!--                                <v-col cols="3">-->
                      <!--                                  <v-select-->
                      <!--                                      outlined-->
                      <!--                                      dense-->
                      <!--                                      v-model="cmdUserRun.refver"-->
                      <!--                                      :items="['hg19/GRCh37','hg38/GRCh38']"-->
                      <!--                                      label="Reference version"-->
                      <!--                                      hide-details-->
                      <!--                                  ></v-select>-->
                      <!--                                </v-col>-->
                      <!--                                <v-col cols="3">-->
                      <!--                                  <v-select-->
                      <!--                                      outlined-->
                      <!--                                      dense-->
                      <!--                                      hide-details-->
                      <!--                                      v-model="cmdUserRun.hasPrefix"-->
                      <!--                                      :items="['Yes','No']"-->
                      <!--                                      label="Does reference have the 'chr' prefix?"-->
                      <!--                                  ></v-select>-->
                      <!--                                </v-col>-->
                      <!--                                <v-col cols="3">-->
                      <!--                                  <v-btn-->
                      <!--                                  color="teal darken-3"-->
                      <!--                                  @click="copy2clipboard"-->
                      <!--                                  dark-->
                      <!--                                  style="text-transform: none;"-->
                      <!--                                  >-->
                      <!--                                    <v-icon>mdi-content-copy</v-icon> Copy-->
                      <!--                                  </v-btn>-->
                      <!--                                </v-col>-->
                      <!--                              </v-row>-->
                      <!--                              <v-row>-->
                      <!--                                <v-col cols=12>-->
                      <!--                                  <v-sheet color="grey lighten-3" outlined elevation="2" style="position: relative;"  min-height="40" class="py-4 px-2 "  rounded>-->
                      <!--                                    <v-sheet style="text-wrap: normal" color="grey lighten-3"  class="mr-8 px-2 py-2 overflow-x-auto  text-no-wrap" >-->
                      <!--                                        {{cmdForUserToRun}}-->
                      <!--                                    </v-sheet>-->
                      <!--                                    <span  style="position:absolute;  right:8px;top:22px"  >-->
                      <!--                                    <v-icon size="20" color="teal darken-3" @click="copy2clipboard" >mdi-content-copy</v-icon>-->
                      <!--                                  </span>-->
                      <!--                                  </v-sheet>-->
                      <!--                                </v-col>-->
                      <!--                              </v-row>-->
                      <!--                            </v-sheet>-->
                      <!--                          </div>-->
                      <!--                        </li>-->
                      <!--                      </ol>-->
                    </div>
                  </v-sheet>
                  <!--                  <v-sheet class="text-left text-h6 mt-10">-->
                  <!--                    Submit Your Task-->
                  <!--                  </v-sheet>-->
                  <v-sheet class="mt-6 py-2 px-4" outlined rounded>
                    <v-tabs
                        v-model="tab"
                        :color="$store.state.mainColor"
                        centered
                        grow
                    >
                      <v-tab
                          style="text-transform: none"
                      >
                        1. Annotate and visualize the output from CCLHunter command line program
                      </v-tab>
                      <v-tab
                          style="text-transform: none"

                      >
                        2. Run authentication by using task queue in CCLHunter web server
                      </v-tab>
                    </v-tabs>
                    <v-tabs-items
                        v-model="tab"
                    >
                      <v-tab-item>
                        <v-sheet class="mx-4 my-8">
                          <v-row align="center" class="my-8">
                            <v-col cols="12">
                              <v-sheet class="text-left">
                                If you have downloaded the command line program of CCLHunter, please provide the output
                                result
                                of the CCLHunter command line program. We will further annotate and visualize the
                                results.
                              </v-sheet>
                            </v-col>
                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">Step 1</v-sheet>
                                <v-sheet>Download the command line program of CCLHunter at here, and run it in your
                                  local machine.
                                </v-sheet>
                              </v-sheet>
                            </v-col>
                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">Step 2</v-sheet>
                                <v-sheet>Upload output json file and run the annotation</v-sheet>
                              </v-sheet>
                            </v-col>
                            <v-col cols="10">
                              <v-file-input
                                  v-model="cmdOutput"
                                  dense
                                  hide-details
                                  label="Output from CCLHunter command line program"
                                  outlined
                                  prepend-icon=""
                                  prepend-inner-icon="$file"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                  :color="$store.state.mainColor"
                                  dark
                                  style="text-transform: none"
                                  @click="loadCmdOutput"
                              >
                                <v-icon class="px-2" size="20">mdi-magnify</v-icon>
                                Run!
                              </v-btn>
                            </v-col>
                          </v-row>
                          <v-sheet class="overflow-auto">
                            <v-sheet v-show="cmdOutputJsonValidateMessage.length >0" ref="errormessage"
                                     class="text-left my-2 px-2 py-4"
                                     color="grey lighten-3">
                              <v-sheet class="text-h6 font-weight-bold my-2" color="grey lighten-3">Uploaded json file
                                is invalid, please check error messages bellow:
                              </v-sheet>
                              <v-sheet v-for="(item,idx) in cmdOutputJsonValidateMessage" :key="idx"
                                       color="grey lighten-3 my-1">
                                {{ idx + 1 }}: <b>Field:</b> {{ item.dataPath }} , <b>Error Message:</b>
                                {{ item.message }}
                              </v-sheet>
                            </v-sheet>
                            <v-sheet v-show="cmdOutputGeneralMessage.show" ref="errormessage"
                                     class="text-left my-2 px-2 py-4"
                                     color="grey lighten-3">
                              <v-sheet class="text-h6 font-weight-bold my-2" color="grey lighten-3">
                                {{ cmdOutputGeneralMessage.message }}
                                <router-link to="/task/results">
                                  <v-btn color="teal darken-3" dark small style="text-transform: none">Show Results
                                    <v-icon class="px-2" size="14">mdi-eye</v-icon>
                                  </v-btn>
                                </router-link>
                              </v-sheet>
                            </v-sheet>
                          </v-sheet>
                        </v-sheet>
                      </v-tab-item>
                      <v-tab-item>
                        <v-sheet class="mx-4 my-8">
                          <v-row align="center" class="my-8">
                            <v-col cols="12">
                              <v-sheet class="text-left">
                                If you have not downloaded the command line program of CCLHunter, please run the
                                following
                                command to extract the key information in your BAM file and upload the output. We will
                                run the
                                authentication program of CCLHunter for you in our task queue.
                              </v-sheet>

                              <div>

                              </div>
                            </v-col>
                            <v-col cols="12">
                              <v-sheet class="text-left">

                                <v-sheet class="font-weight-bold text-body-1">Step 1</v-sheet>

                                <v-sheet class="my-2 pa-2" outlined rounded>

                                  <v-sheet class="text-left my-2"> Select the reference version and the prefix option.
                                  </v-sheet>

                                  <v-row>
                                    <v-col cols="3">
                                      <v-select
                                          v-model="cmdUserRun.refver"
                                          :items="['hg19/GRCh37','hg38/GRCh38']"
                                          dense
                                          hide-details
                                          label="Reference version"
                                          outlined
                                      ></v-select>
                                    </v-col>
                                    <v-col cols="3">
                                      <v-select
                                          v-model="cmdUserRun.hasPrefix"
                                          :items="['Yes','No']"
                                          dense
                                          hide-details
                                          label="Does reference have the 'chr' prefix?"
                                          outlined
                                      ></v-select>
                                    </v-col>

                                  </v-row>
                                </v-sheet>


                                <v-sheet class="font-weight-bold text-body-1">Step 2</v-sheet>

                                <v-sheet class="my-2 pa-2" outlined rounded>
                                  <v-sheet class="text-left mt-2 mb-4">
                                    <ol>
                                      <li>
                                        <v-btn
                                            color="teal darken-3"
                                            dark
                                            style="text-transform: none;"
                                            x-small
                                            @click="copy2clipboard"
                                        >
                                          <v-icon size="10">mdi-content-copy</v-icon>
                                          Copy
                                        </v-btn>
                                        the command line below and paste it to your command line.
                                      </li>
                                      <li> Change the input and output name and run the command.</li>
                                    </ol>
                                  </v-sheet>


                                  <v-row>
                                    <v-col cols=12>
                                      <v-sheet class="py-4 px-2 " color="grey lighten-3" elevation="2" min-height="40"
                                               outlined rounded style="position: relative;">
                                        <v-sheet class="mr-8 px-2 py-2 overflow-x-auto  text-no-wrap"
                                                 color="grey lighten-3"
                                                 style="text-wrap: normal">
                                          {{ cmdForUserToRun }}
                                        </v-sheet>
                                        <span style="position:absolute;  right:8px;top:22px">
                                    <v-icon color="teal darken-3" size="20"
                                            @click="copy2clipboard">mdi-content-copy</v-icon>
                                  </span>
                                      </v-sheet>
                                    </v-col>
                                  </v-row>
                                </v-sheet>
                              </v-sheet>
                            </v-col>


                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">Step 3</v-sheet>

                                <v-sheet class="my-2 pa-2" outlined rounded>
                                  <v-sheet class="text-left mt-2 mb-4">
                                    Upload the output bam
                                  </v-sheet>
                                  <v-row>
                                    <!--                                    <v-col cols="3">-->
                                    <!--                                      <v-select-->
                                    <!--                                          hide-details-->
                                    <!--                                          dense-->
                                    <!--                                          v-model="cmdUserRun.refver"-->
                                    <!--                                          :items="['hg19/GRCh37','hg38/GRCh38']"-->
                                    <!--                                          label="Reference version"-->
                                    <!--                                          outlined-->
                                    <!--                                      ></v-select>-->
                                    <!--                                    </v-col>-->
                                    <!--                                    <v-col cols="3">-->
                                    <!--                                      <v-select-->
                                    <!--                                          hide-details-->
                                    <!--                                          v-model="cmdUserRun.hasPrefix"-->
                                    <!--                                          dense-->
                                    <!--                                          outlined-->
                                    <!--                                          :items="['Yes','No']"-->
                                    <!--                                          label="Chromosomes have 'chr' prefix?"-->
                                    <!--                                      ></v-select>-->
                                    <!--                                    </v-col>-->
                                    <v-col cols="10">
                                      <v-file-input
                                          v-model="taskBam"
                                          clearable
                                          dense
                                          hide-details
                                          label="Please select the bam that was produced by command above"
                                          outlined
                                          prepend-icon=""
                                          prepend-inner-icon="$file"
                                      ></v-file-input>
                                    </v-col>

                                    <v-col cols="2">
                                      <v-btn

                                          :color="$store.state.mainColor"
                                          :disabled="taskBam== null || taskBam==''"
                                          class="float-right"
                                          style="text-transform: none;color: white"
                                          @click="submitBam"

                                      >
                                        <v-icon class="px-2">mdi-rocket</v-icon>
                                        Run!
                                      </v-btn>
                                    </v-col>
                                  </v-row>
                                </v-sheet>
                              </v-sheet>
                            </v-col>


                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">Step 4</v-sheet>

                                <v-sheet class="my-2 pa-2" outlined rounded>

                                  <v-sheet class="text-left my-2">
                                    Check the task status
                                  </v-sheet>

                                  <v-row>
                                    <v-col cols="10">
                                      <v-text-field
                                          v-model="taskid"
                                          clearable
                                          dense
                                          hide-details
                                          label="Task ID"
                                          outlined
                                          prepend-inner-icon="mdi-chevron-right"
                                      >


                                      </v-text-field>
                                    </v-col>
                                    <v-col cols="2">
                                      <v-btn
                                          :color="$store.state.mainColor"
                                          :disabled="taskid== null || taskid=='' "
                                          :loading="taskCheckLoading"

                                          class="float-right"
                                          style="text-transform: none;color: white"
                                          @click="checkTask"
                                      >
                                        <v-icon>mdi-magnify</v-icon>
                                        Check
                                      </v-btn>
                                    </v-col>
                                  </v-row>


                                </v-sheet>
                              </v-sheet>

                            </v-col>


                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">Messages</v-sheet>

                                <v-sheet class="my-auto pa-2" color="grey lighten-3" min-height="50" outlined rounded>
                                  <v-icon v-show="taskStatus=='running'">mdi-timer-sand-complete mdi-spin</v-icon>
                                  {{ this.taskMessage }}
                                  <router-link v-show="taskStatus=='ok'" to="/task/results">
                                    <v-btn color="teal darken-3" dark small style="text-transform: none">Show Results
                                      <v-icon class="px-2" size="14">mdi-eye</v-icon>
                                    </v-btn>
                                  </router-link>
                                </v-sheet>
                              </v-sheet>
                            </v-col>

                            <v-col cols="12">
                              <v-sheet class="text-left">
                                <v-sheet class="font-weight-bold text-body-1">
                                  <v-btn
                                      :color="$store.state.mainColor"
                                      class="float-right"


                                      style="text-transform: none;color: white"
                                      @click="reset"
                                  >
                                    <v-icon>mdi-reset</v-icon>
                                    Reset
                                  </v-btn>
                                </v-sheet>
                              </v-sheet>
                            </v-col>


                          </v-row>
                        </v-sheet>
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

      cmdOutput: null,
      // cmdOutputJson:null,
      cmdOutputJsonValidateMessage: [],
      cmdOutputGeneralMessage: {
        show: false,
        message: ""
      },
      cmdForUserToRun: null,
      cmdUserRun: {
        refver: 'hg19/GRCh37',
        hasPrefix: "No",
      },
      taskid: null,
      taskOut: null,
      taskStatus: null,
      taskMessage: "",
      taskIsChecking: false,
      taskCheckLoading: false,
      taskBam: null,

    }
  },

  methods: {
    copy2clipboard() {

      this.$copyText(this.cmdForUserToRun).then(function (e) {
            alert('Copied')
          }, function (e) {
            alert('Can not copy')
          }
      )
    },

    reset() {
      this.taskStatus = null;
      this.taskIsChecking = false;
      this.taskid = null;
      this.taskOut = null;
      this.taskMessage = "";
      this.taskIsChecking = false;
      this.taskBam = null;
      this.taskCheckLoading = false;
      this.cmdUserRun.refver = 'hg19/GRCh37';
      this.cmdUserRun.hasPrefix = "No";
    },

    submitBam() {

      let bamFileFormData = new FormData();
      bamFileFormData.append("bam", this.taskBam);

      Axios.post(
          baseURL + '/api/identification_run_task',
          bamFileFormData,
          {
            params: {
              refver: this.cmdUserRun.refver == "hg19/GRCh37" ? 'hg19' : 'hg38'
            }
          }
      ).then(res => {
        if (res.data.status == true) {
          this.taskid = res.data.taskid;

        }else{
          this.taskMessage = "Task has errors!"
        }
      }).then(()=>{
        this.checkTask();
      });




    },

    checkTask() {
      this.taskCheckLoading = true
      new Promise((resolve2, reject2) => {

        let currentInterval = 0
        this.taskIsChecking = false
        let timer = setInterval(() => {

          if (!this.taskIsChecking) {
            currentInterval += 1;
            this.taskIsChecking = true; // 如果没有check 则设置为checking = true, 则在response返回前都不会进行diercicheck


            Axios.get(
                baseURL + '/api/identification_check_task',
                {
                  params: {
                    taskid: this.taskid
                  }
                }
            ).then(res => {
              this.taskIsChecking = false;
              this.taskStatus = res.data.status;
              if (res.data.status == "ok") {
                // 如果成功，则读取数据

                this.taskMessage = `Your task ${this.taskid} is finished, loading results... `
                window.clearInterval(timer);
                resolve2();


              } else if (res.data.status == "running") {
                this.taskMessage = `Your task ${this.taskid} is running...`
                // window.clearInterval(timer);
                // window.clearInterval(timer);
                // reject2();
              } else if (res.data.status == "error") {
                this.taskMessage = `Your task ${this.taskid} has errors...`
                // window.clearInterval(timer);
                window.clearInterval(timer);
                reject2();
              } else if (res.data.status == "no_exists") {

                this.taskMessage = `Your task ${this.taskid} not found...`
                window.clearInterval(timer);
                reject2();
              }

            }).catch(e=>{
              if(e.response.status == 422){
                window.clearInterval(timer);
                reject2();
              }
            }).finally(() => {
              this.taskIsChecking = false;
            })
          }

          if (currentInterval >= 100) {
            window.clearInterval(timer);
            reject2();
          }
        }, 1000)

      }).then( () => {

        // alert("asdfad")

        Axios.get(
            baseURL + '/api/identification_get_res_json',
            {
              params: {
                taskid: this.taskid
              }
            }
        ).then(res => {

          // alert("asdf")

          this.$store.commit('clearOutputJson');
          this.$store.commit('setOutputJson', res.data);
          Axios.post(baseURL + "/api/get_snpbarcodes_pos").then(res2 => {
            this.$store.state.outputJson.similarity.barcodepos = res2.data;
            this.taskMessage = `Your task ${this.taskid} is finished, please click `
          })
        })


      }).catch(e => {
            console.log(e)
      }).finally(() => {
        this.taskCheckLoading = false;

      });


    },


    loadCmdOutput() {

      this.cmdOutputJsonValidateMessage = [];
      this.cmdOutputGeneralMessage.show = false;
      this.$store.commit('clearOutputJson');

      if (this.cmdOutput && this.cmdOutput.text) {
        this.cmdOutput.text().then(res => {

          try {
            const tmpcmdOutputJson = JSON.parse(res)
            this.$store.commit('setOutputJson', tmpcmdOutputJson);


            Axios.post(baseURL + "/api/get_snpbarcodes_pos").then(res => {

              // this.cellsnpbarcodes_pos =
              this.$store.state.outputJson.similarity.barcodepos = res.data;

            })

          } catch (e) {
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
          if (!valid) {

            validate.errors.forEach(t => {
              this.cmdOutputJsonValidateMessage.push({
                dataPath: t.dataPath,
                message: t.message,
              })
            })
          } else {
            this.cmdOutputGeneralMessage.message = "The file has been parsed successfully and passed the verification. You will jump to the result page..."
            this.cmdOutputGeneralMessage.show = true;
          }

        })
      }


    },
    genCmdForUserToRun() {
      let tempCmd = ["echo "];
      if (this.cmdUserRun.refver == 'hg19/GRCh37') {
        this.$store.state.cellbarcode.forEach(d => {

          let onePos = ""
          if (this.cmdUserRun.hasPrefix == 'Yes') onePos += 'chr'
          onePos += `${d['hg19chr']}:${d['hg19pos']}-${d['hg19pos']}`
          tempCmd.push(
              onePos
          )
        })
      } else {
        this.$store.state.cellbarcode.forEach(d => {

          let onePos = ""
          if (this.cmdUserRun.hasPrefix == 'Yes') onePos += 'chr'
          onePos += `${d['hg38chr']}:${d['hg38pos']}-${d['hg38pos']}`
          tempCmd.push(
              onePos
          )
        })

      }
      tempCmd.push("| xargs  samtools view -@ 4 -hb -o [output.bam] [input.bam] ")
      this.cmdForUserToRun = tempCmd.join(" ");
    },

  },
  watch: {
    cmdUserRun: {
      handler: function (newval) {
        this.genCmdForUserToRun();
      },
      immediate: true,
      deep: true
    },
    '$store.state.cellbarcode': {
      handler: function (newval) {
        this.genCmdForUserToRun();
      },
      immediate: true,
      deep: true
    }
  },

}
</script>

<style scoped>

</style>