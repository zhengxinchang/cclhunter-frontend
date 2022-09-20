<template>
  <v-app style="margin-top: 0px ;background-color: #ecf0f5;">
    <header-bar app style="position: fixed;width: 100%;top:0px;z-index: 999999"></header-bar>
    <v-sheet
        :color="$store.state.mainColor"
        class="py-4"
        style="position: fixed;width: 100%;z-index: 99999;top:30px"
    >
      <v-row
          align="center"
      >

        <v-col
            class="mx-2 pt-5"
            cols="12"
            lg="2"
            md="12"
            sm="12"
            xl="2"
        >
          <v-sheet :color="$store.state.mainColor" @click="$router.push('/home')">
            <v-img :src="$store.state.logo" aspect-ratio="16/9" contain height="40"></v-img>
          </v-sheet>

        </v-col>
        <v-col class="text-center" lg="8" md="12" sm="12">

          <v-tabs
              v-model="$store.state.currtab"
              :background-color="$store.state.mainColor"
              align="center"
              centered
              dark
              grow
              show-arrows
          >

            <v-tab
                to="/home"
            >
              <v-icon>mdi-home</v-icon> &nbsp; Home
            </v-tab>

            <v-tab
                to="/task"
            >
              <v-icon>mdi-toolbox-outline</v-icon> &nbsp; Task Submission
            </v-tab>
            <v-tab
                to="/barcodes"
            >
              <v-icon>mdi-barcode mdi-rotate-135</v-icon> &nbsp; SNP Barcodes
            </v-tab>



            <v-tab
                to="/celllinelist"
            >
              <v-icon>mdi-satellite-uplink</v-icon> &nbsp; Cell Line List
            </v-tab>

            <v-tab
                to="/downloads"
            >
              <v-icon>mdi-download-box-outline</v-icon> &nbsp; Downloads
            </v-tab>
            <v-tab
                to="/help"
            >
              <v-icon>mdi-heart</v-icon> &nbsp; Help
            </v-tab>

          </v-tabs>
        </v-col>
      </v-row>


    </v-sheet>
    <v-sheet class="transparent" height="100"></v-sheet>

    <router-view/>

    <v-btn v-if="$route.name != 'home' && $route.name != 'home2'" :color="$store.state.mainColor" dark elevation="1" fab
           style="position: fixed;bottom: 100px;right: 50px;z-index: 99999999"
           x-small @click="backToTop">
      <v-icon small>mdi-format-vertical-align-top</v-icon>
    </v-btn>

    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";
import FooterBar from "@/components/FooterBar";

export default {
  components: {FooterBar, HeaderBar},
  data() {
    return {
      logo: require('./assets/logo.png'),

    }
  },
  methods: {

    backToTop() {
      window.scrollTo(0, 0)
    }
  },
  created() {

    this.$store.dispatch('loadBarcodes');
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
