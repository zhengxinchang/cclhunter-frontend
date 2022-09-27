<template>
  <v-container class="container--fluid">
    <v-row>
      <v-col class="pa-0" cols="12">
        <v-sheet :style="{
           background: 'url('+bannerimg+')',
           minHeight:'600px',
           paddingBottom:'50px',
           marginTop:'25px',
           marginLeft:'10px',
           marginRight:'10px',
           backgroundPosition: '50% -10px',
           backgroundSize:'115%',
           borderRadius: '5px 5px 5px 5px',
           }"
                 class="mb-4"
                 elevation="4"
        >
          <v-sheet class="z-transparent text-right pt-3 mr-3 ">
            <v-icon class="mdi-spin align--center" color="white">mdi-cog</v-icon>
            <span class="white--text ">Version: 1.0</span>
          </v-sheet>
          <v-row align="center">
            <v-col cols="12" lg="6" md="6" sm="12" xl="6">
              <v-sheet class="z-transparent">
                <v-row>
                  <v-col class="px-16" cols="12">
                    <div>
                      <v-img :src="$store.state.logo" aspect-ratio="16/9" class="mx-auto" contain height="100"></v-img>
                    </div>
                    <div class="text-h5 pb-4 white--text" style="line-height: 65px;">
                      CCLHunter: an accurate, sensitive and easy used cancer cell line authentication toolkit and
                      webserver
                    </div>
                    <div class="text-h5 pb-4 white--text text-left">
                      Introduction
                    </div>
                    <div class="text-body-1 text-justify white--text">
                      Cancer cell lines have become the paradigm of cancer research, and the use of correct,
                      contamination-free cell lines is essential for accurate and reproducible experimental results.
                      Studies have found that at least a quarter of cell lines are used incorrectly in applied research,
                      but judging the validity of cell lines is still underappreciated. Some methods based on SNP or
                      expression have been proposed to authenticate cell lines. Those existing methods are mainly SNP or
                      expression based, which cannot provide accurate resolution from closely related cell lines. We
                      provide a novel improved method called CCLHunter which constructs the maximum unstable unit with
                      priori cell line topology, variant and expression profile to authenticate cell lines. Using BAM as
                      input, CCLHunter can accurately and sensitively authenticate cell lines from the consanguineous
                      lineage or even different tissues in the same individual.
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>

            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12" xl="6">
              <v-sheet class="z-transparent">
                <v-row>
                  <v-col cols="10" offset="1">
                    <v-sheet :elevation="4" class="pa-4" rounded>

                      <v-card :elevation="0" class="pb-4">
                        <v-card-title :style="{'color':$store.state.mainColor}">Statistics</v-card-title>
                        <v-row no-gutters>
                          <v-col cols="6">
                            <v-hover v-for="item in statsdata" :key="item.name" v-slot="{ hover }">
                              <v-card
                                  :elevation="hover?4:0"
                                  :to="item.to"
                                  class="mx-2 my-4 px-3 pt-8"
                                  min-height="150"
                                  tile
                              >

                                <v-sheet class="my-auto">
                                  <v-progress-circular
                                      v-show="$store.state.stats ==null"
                                      :color="$store.state.mainColor"
                                      :size="45"
                                      :width="7"
                                      indeterminate
                                  ></v-progress-circular>
                                  <div v-show="$store.state.stats !=null" :style="{color: $store.state.mainColor}"
                                       class="text-h4"
                                  >
                                    <v-icon :color="$store.state.mainColor">{{ item.icon }} mdi-36px</v-icon>
                                    {{ item.num }}
                                  </div>
                                  <v-divider dark></v-divider>
                                  <h2 :style="{color: $store.state.mainColor}">{{ item.name }}</h2>
                                </v-sheet>

                              </v-card>
                            </v-hover>
                          </v-col>
                          <v-divider vertical></v-divider>
                          <v-col align-self="center" cols="6">


                            <v-hover v-slot="{ hover }">
                              <v-card
                                  :elevation="hover?4:0"

                                  class="mx-2 py-16"
                                  @click="$router.push('/task')">


                                <v-sheet class="my-3">
                                  <div :style="{color: $store.state.mainColor}"
                                       class="text-h4 "

                                  >


                                    <v-icon :color="$store.state.mainColor" size="128">mdi-briefcase-upload-outline
                                    </v-icon>

                                  </div>
                                  <v-divider dark></v-divider>
                                  <h2 :style="{color: $store.state.mainColor}">Submit a task</h2>
                                </v-sheet>


                              </v-card>
                            </v-hover>


                          </v-col>
                        </v-row>
                      </v-card>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>

          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col class="px-16 text-left" cols="12">
                                <span class='white--text'> <b>How to Cite:</b> Database Resources of the National Genomics Data Center, China National Center for Bioinformation in 2022. Nucleic Acids Res 2022, 50(D1):D27-D38. [PMID=<a
                                    href="https://pubmed.ncbi.nlm.nih.gov/34718731/"
                                    style="text-decoration: none;color: white"
                                    target="_blank">34718731</a>][DOI=<a
                                    href="https://doi.org/10.1093/nar/gkab951"
                                    style="text-decoration: none;color: white" target="_blank">10.1093/nar/gkab951</a>]</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="4">
        <v-card height="300">
          <v-card-title>News</v-card-title>
          <v-card-text>
            <v-timeline dense>
              <v-slide-x-reverse-transition
                  group
                  hide-on-leave
              >
                <v-timeline-item

                    v-for="item in news"
                    :key="item.id"
                    :color="$store.state.mainColor"
                    small


                >
                  {{ item.text }}
                </v-timeline-item>
              </v-slide-x-reverse-transition>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="300">
          <v-card-title>Global Visitors</v-card-title>
          <v-card-text>

            <div class="mx-1 my-0 ">
              <v-row>
                <v-col cols="12">
                  <!--                      noclick-->
                  <v-sheet class="px-2 mx-auto overflow-auto">

                    <a href="https://www.revolvermaps.com/livestats/5gefi9e96f9/"><img
                        alt="Map" height="200" src="//rf.revolvermaps.com/h/m/a/0/ff0000/128/10/5gefi9e96f9.png"
                        style="border:0;" width="420"></a>
                  </v-sheet>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="300">
          <v-card-title>Related Resources</v-card-title>
          <v-card-text>

            <div class="mx-1 my-0 ">
              <v-row>
                <v-col cols="12">
                  <v-timeline dense>
                    <v-slide-x-reverse-transition
                        group
                        hide-on-leave
                    >
                      <v-timeline-item

                          v-for="item in related_resource"
                          :key="item.id"
                          :color="$store.state.mainColor"
                          small

                      >
                        <v-row>
                          <v-col class="text-left" cols="12">
                            <a :href="item.link" style="text-decoration: none;color: black" target="_blank">
                              <span class="text-body-1 font-weight-bold">{{ item.text }}</span> <img
                                :src="item.img" :style="{height: '15px',backgroundColor:item.bgcolor}">
                            </img>
                            </a>
                          </v-col>
                        </v-row>


                      </v-timeline-item>
                    </v-slide-x-reverse-transition>
                  </v-timeline>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      bannerimg: require('../assets/img/background-2.jpg'),
      news: [
        {
          id: 1,
          text: "aaa"
        },
        {
          id: 2,
          text: "bbb"
        },
        {
          id: 3,
          text: "ccc"
        },
      ],
      related_resource: [
        {
          id: 1,
          text: "CCAS",
          link: "https://ngdc.cncb.ac.cn/ccas/#/",
          bgcolor: "white",
          img: require("../assets/img/CCASlogo.png")
        },
        {
          id: 2,
          text: "MACdb",
          link: "https://ngdc.cncb.ac.cn/macdb/",
          bgcolor: "#168ad7",
          img: require("../assets/img/MACdblogo.png")
        },
      ]


    }
  },
  computed: {
    statsdata() {
      return [
        {
          to: "/barcodes",
          icon: "mdi-chemical-weapon",
          name: "SNP Barcodes",
          num: this.$store.state.stats && this.$store.state.stats.numofBarcodes.toLocaleString("en-US") || "0"
        },

        {
          to: "/celllinelist",
          icon: "mdi-flask-empty-outline",
          name: "Cancer Cell Lines",
          num: this.$store.state.stats && this.$store.state.stats.numofCellines.toLocaleString("en-US") || "0"
        },
      ]
    }

  },
  created() {

    this.$store.dispatch('loadStats')
    // this.$store.dispatch('loadBarcodePos')
  }
}
</script>

<style lang="scss" scoped>

.z-transparent {
  background-color: transparent !important;
  opacity: 2;
  border-color: transparent !important;
}

.largeIcon {
  font-size: 80px
}

</style>