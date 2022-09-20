<template>
  <div id="ideo-container"></div>
</template>

<script>
import ideogram from 'ideogram'

export default {
  name: "barcodeSubIdeogram",
  props: ['dat', 'refver'],
  // ideogramobject:null,
  mounted() {
    if (this.dat != null && this.dat.length >0) {
      this.draw();
    }
    // this.ideogramobject = new Ideogram();
    // alert("mounted")
  },
  computed: {
    flag() {
      return {
        dat: this.dat,
        reffer: this.refver
      }
    }
  },

  watch:{
    'flag':{
      handler:function(){
        if (this.dat != null && this.dat.length >0){
          this.$nextTick(function () {
            this.draw();
          })

        }
        // alert('datchange')
        // console.log(this.dat)
      },
      immediate:true,
      deep:true,
    }
  },
  methods: {
    draw() {
      let config = {
        organism: 'human',
        chrHeight: 500,
        assembly: this.refver,
        container: '#ideo-container',
        annotations: this.dat
      }
      // let config = {
      //   organism: 'human',
      //   chrHeight: 600,
      //   assembly: this.refver,
      //   container: '#ideo-container',
      //   annotations: [{
      //     name: 'BRCA1',
      //     chr: '17',
      //     start: 43044294,
      //     stop: 43125482
      //   },
      //     {
      //       name: 'BRCA2',
      //       chr: '18',
      //       start: 2233,
      //       stop: 2233
      //     }
      //   ]
      // }


     return  new ideogram(config)
    }
  }
}
</script>

<style scoped>
#ideo-container {
  height: 550px;
  /*width: 100%;*/
  margin: auto;
}
</style>