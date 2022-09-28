<template>
  <div>
    <v-sheet class="ma-4 transparent" rounded>

      <bread-crumb :breadcrumb-data="breadcrumbData"></bread-crumb>
      <v-row class="pt-3">
        <v-col>
          <v-sheet min-height="600" rounded>


            <v-row>
              <v-col cols="10" offset="1">

                <v-tabs
                    :color="$store.state.mainColor"
                v-model="$store.state.downloadTab"
                grow
                >
                  <v-tab style="text-transform: none" >Download CCLHunter standalone program</v-tab>
                  <v-tab style="text-transform: none"> Download metadata of Cancer Cell Lines</v-tab>
                </v-tabs>

                <v-tabs-items
                    v-model="$store.state.downloadTab"
                >

                  <v-tab-item>

                    <v-sheet class="text-left px-2 py-6" min-height="600">

                      <v-sheet class="text-h6">
                        System requirement
                      </v-sheet>
                      <v-sheet color="red">
                        <v-list dense>
                          <v-list-item>
                            1. Operating System: Linux
                          </v-list-item>
                          <v-list-item>
                            2. Python3
                          </v-list-item>
                          <v-list-item>
                            3. Python packages: Pandas, scipy
                          </v-list-item>
                        </v-list>
                      </v-sheet>

                      <v-sheet class="text-h6">
                        Downloads
                      </v-sheet>
                      <v-sheet>
                        <v-row>
                          <v-col cols="12">
                            <v-list >
                              <v-list-item   v-for="(release,idx) in CCLHunterStandaloneList" :key="idx">
                                <v-list-item-content>

                                  <v-list-item-title  class="font-weight-bold grey--text text--darken-2">
                                    {{release.releaseVersion}} &nbsp;&nbsp; Release date: {{release.releaseDate}}
                                  </v-list-item-title>
                                  <v-list-item-subtitle>
                                    Change log:
                                    <v-list dense>

                                      <v-list-item
                                          v-for="(clog,idx2) in release.releaseChangeLog"
                                          :key="idx2"
                                          style="color: grey"
                                      >
                                        <v-icon size="16">mdi-star</v-icon> {{clog}}
                                      </v-list-item>
                                    </v-list>

                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle>
                                    Download:  <a style="text-decoration: none" :href="release.releasePath">{{ release.releaseDownloadName }}</a>
                                  </v-list-item-subtitle>

                                </v-list-item-content>

                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>

                      </v-sheet>

                    </v-sheet>

                  </v-tab-item>

                  <v-tab-item>
                    bbb
                  </v-tab-item>

                </v-tabs-items>

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
export default {
  name: "downloads",
  components: {BreadCrumb},
  data(){
    return {
      breadcrumbData: [
        {
          text: "CCLHunter",
          disabled: false,
          href: baseURL + '/home'
        },

        {
          text: "Downloads",
          disabled: true,
        },
      ],

      CCLHunterStandaloneList:[
        {

          releaseVersion:"v1.1",
          releasePath:baseURL+"/cclhunterStandalone/cclhunter.v1.1.zip",
          releaseDownloadName:"cclhunter.v1.1",
          releaseDate:"2022-09-28",
          releaseChangeLog:[
              "First Release"
          ]
        },
      ],

    }
  }
}
</script>

<style scoped>

</style>