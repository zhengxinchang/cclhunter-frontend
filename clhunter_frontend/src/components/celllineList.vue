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

                    <b>CCLHunter</b> provides meta data for each cell lines.
                  </div>

                </v-sheet>

                <v-sheet class="pa-8">
                  <vxe-pager
                      :current-page="tablePage.currentPage"
                      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                      :loading="tableLoading"
                      :page-size="tablePage.pageSize"
                      :total="tablePage.totalPage"
                      @page-change="handlePageChange">
                  </vxe-pager>
                  <vxe-table
                      stripe
                      align="left"
                      :column-config="{resizable: true}"
                      :data="tableData"
                      :loading="tableLoading"
                      :export-config="{}"
                      :print-config="{}"
                      border
                      empty-text="Empty"
                      round

                      max-height="600"
                  >

<!--                    <vxe-column type="seq" ></vxe-column>-->
                    <vxe-column field="Accn" title="Accession" min-width="180" >
                      <template #default="{row}">

<!--                        <v-chip color="teal" @click="$router.push({name:'celllinedetail',params:{cid:row.Accn}})"  outlined label>{{row.Accn}}</v-chip>-->
                        <v-chip color="teal" @click="$router.push( `/celllinelist/${row.Accn}` )"  outlined label>{{row.Accn}}</v-chip>
                        <v-chip outlined small class="mx-1">

                        <v-icon color="teal" small @click="$commonfunc.goOuterLinkCellsaurus(row.Accn)" >mdi-share</v-icon>
                        </v-chip>
                      </template>

                    </vxe-column>
                    <vxe-column field="Name" title="Name" min-width="150" >

                      <template #default="{row}">

                        <v-chip color="pink darken-3" outlined label>{{row.Name}}</v-chip>
                      </template>
                    </vxe-column>
                    <vxe-column field="Synon_name" title="Synonymous Names" min-width="300" >
                      <template #default="{row}">



                        <v-chip v-show="item != 'None'" class="ma-1" color="teal" :key="item" outlined label v-for="item in row.Synon_name.split(/; /)" >
                           {{item}}
                        </v-chip>

<!--                        {{row.Synon_name == 'None' ? '-' : row.Synon_name }}-->

                      </template>

                    </vxe-column>
                    <vxe-column field="Sex" title="Sex" min-width="100" >
                      <template #default="{row}">
                        <v-chip :color=" row.Sex == 'Male'? 'red' : 'blue'  " outlined label>{{row.Sex}}</v-chip>
                      </template>

                    </vxe-column>
                    <vxe-column field="Age" title="Age"  min-width="100" >

                      <template #default="{row}">
                        <v-chip class="ma-1"  v-show="row.Age != 'None'"  color="grey darken-4" outlined label >
                          {{row.Age}}
                        </v-chip>
                      </template>


                    </vxe-column>
                    <vxe-column field="Disease" title="Disease" min-width="450" >
                      <template #default="{row}">
                        <v-chip class="ma-1"  v-show="item != 'None'"  :key="item" color="blue" outlined label v-for="item in row.Disease.split(/; /)" >
                          {{item}}
                        </v-chip>
                      </template>


                    </vxe-column>
                    <vxe-column field="paper_count" title="#References" min-width="150" >
                      <template #default="{row}">

                        <v-chip   color="blue darken-1" outlined label>{{row.paper_count}}</v-chip>

                      </template>

                    </vxe-column>
                  </vxe-table>
                  <vxe-pager
                      :current-page="tablePage.currentPage"
                      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                      :loading="tableLoading"
                      :page-size="tablePage.pageSize"
                      :total="tablePage.totalPage"
                      @page-change="handlePageChange">
                  </vxe-pager>
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
import Helpmsg from "@/components/sub/helpmsg";
export default {
  name: "celllineList",
  components: {Helpmsg, BreadCrumb},
  data() {
    return {
      breadcrumbData: [
        {
          text: "CCLHunter",
          disabled: false,
          href: baseURL+ '/home'
        },
        {
          text: "Cell Line List",
          disabled: true,
        },

      ],
      thisClass: {
        lineHight: [
          "mt-2"
        ]
      },
      tableData:[],
      tableLoading:false,
      tablePage:{
        currentPage:1,
        pageSize:10,
        totalPage:10,
      }
    }
  },
  beforeMount() {
    this.loadData();
    },
  methods:{
      loadData(){
        this.tableLoading = true;
        Axios.post(
            baseURL+'/api/get_celllinelist',
            {},
            {
              params:{
                pagenumber:this.tablePage.currentPage,
                pagesize:this.tablePage.pageSize
              },
              timeout: 60000
            }
        ).then(res=>{
          this.tableLoading = false;
          this.tableData = res.data.data;
          this.tablePage.totalPage = res.data.all_count.count;
        }).catch(err=>{
          this.tableLoading = false;
        })

      },
      handlePageChange({currentPage, pageSize}) {
        this.tablePage.currentPage = currentPage
        this.tablePage.pageSize = pageSize
        this.loadData();

    }
  }
}
</script>

<style scoped>

</style>