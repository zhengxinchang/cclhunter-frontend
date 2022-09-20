<template>
  <v-sheet>

    <div :id="chartid" style="height:800px;width:100%;margin: 0 auto;"></div>
    <div>SFUs</div>
  </v-sheet>
</template>

<script>



export default {
  name: "annotatedResultPageSFUPlot",
  props:["options","chartid"],
  data(){
    return {
      myChart: null,
    }
  },
  mounted() {

  },

  methods:{
    resizeChart(){
      if(this.myChart != null){
        this.myChart.resize();
        console.log("resizing....")
      }
    }
  },
  watch:{
    "options":{
      handler:function(){
        // alert("detected changes!")
        if(this.options !=null){
          let chartDom = document.getElementById(this.chartid);
          this.myChart = this.$echarts.init(
              chartDom,
          );
          this.myChart && this.myChart.clear()
          // this.$nextTick(()=>{
          //
          //
          // })
          this.options && this.myChart && this.myChart.setOption(this.options,true);
          window.addEventListener("resize", () => {
            this.myChart.resize();
          });
        }




      },
      deep:true,
      immediate:true
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize",this.resizeChart,true)
  }
}
</script>

<style scoped>

</style>