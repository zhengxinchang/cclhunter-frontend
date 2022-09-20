<template>
  <v-row class="mt-3">
    <v-col>
      <v-sheet rounded>

        <v-row align="center" no-gutters>
          <v-col cols="10">
            <v-breadcrumbs :items="breadcrumbData" >
              <template v-slot:item="{ item }">
                <v-breadcrumbs-item
                    :disabled="item.disabled"
                    :href="item.href"
                >
                  <span v-if="item.disabled==false" :style="{color:$store.state.mainColor}">{{
                      item.text
                    }}</span>
                  <span v-else :style="{color:'#868585'}">{{ item.text }}</span>
                </v-breadcrumbs-item>
              </template>

            </v-breadcrumbs>
          </v-col>
          <v-col cols="2">
            <slot>

            </slot>
          </v-col>
        </v-row>






      </v-sheet>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "breadCrumb",
  props:['breadcrumbData'],

}
</script>

<style scoped>

</style>
