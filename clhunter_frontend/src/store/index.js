import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mainColor:"#0c2740",
    stats:null,
    currtab:0,
    logo: require('../assets/logo2.png'),
    cellbarcode:null,
    // cellsnpbarcodes_pos:null,
    cellbarcode2ideogram:{
      hg19:[],
      hg38:[]
    },
    outputJson:null,
  },
  mutations: {
    assignStats(state,s){
      state.stats = s;
    },
    setOutputJson(state,s){
      state.outputJson = s;
    },
    clearOutputJson(state){
      state.outputJson = null;
    }
  },
  actions: {
    loadStats(context){

      Axios.post(
        baseURL+"/api/get_stats"
      ).then((response)=>{
        console.log("successfully retrival stats");
        context.commit("assignStats",response.data)
      }).catch((err)=>{
        console.log(err);
      });
    },

    loadBarcodes(context){
      Axios.post(
        baseURL + '/api/get_snpbarcodes',
        {},
        {
          timeout: 60000
        }
      ).then(res => {
        context.state.cellbarcode = res.data;
      });

      }


    // loadBarcodePos(context){
    //   Axios.post(baseURL+"/api/get_snpbarcodes_pos").then(res=>{
    //
    //     context.state.cellsnpbarcodes_pos = res.data;
    //   })
    //
    // }
  },
  modules: {
  }
})
