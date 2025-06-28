<template>
  <div>
    <div class="q-py-xl">

      <div
        class="container-md"
      >
        <div class="row q-col-gutter-md">


          <div class="col-xl-3 col-md-3 col-sm-12 col-xs-12">


          </div>

          <div class="col-xl-8 col-md-8 col-sm-12 col-xs-12 offset-md-2">

            <h1 class="text-center text-h3">
              {{item.fields?.['Hero Title']}}
            </h1>
            <h2 class="text-center text-h1 text-bold">

              {{item.fields?.['Hero Subtitle']}}
            </h2>
            <div class="text-center">

              <q-btn
                size="xl"
                class="text-black"
                color="white"
                :href="item.fields?.['Hero CTA URL']"
              >
                {{item.fields?.['Hero CTA Text']}}
              </q-btn>
            </div>
            <!--<pre>{{item}}</pre>-->
          </div>
        </div>
      </div>
    </div>

    <div class="q-py-xl bg-black">
      <div
        class="container-md "
      >

        <div class="row">

          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

            <h1 class="text-center text-h3 text-bold">
              About Us
            </h1>

          </div>
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">
            <div class=" text-h5 ">

              {{item.fields?.['About Us Text']}}
            </div>

          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import Home_Page_Singleton from "src/models/orm-api/Home_Page_Singleton";

export default {
  name: "AboutController.vue",
  data(){
    return {
      loading: true,
      item: {},
    }
  },
  computed: {

    id() {
      // return this.$route.params.rId
      return 'recoIS6KWZ2aqcBJT'
    },
    superTableModel() {
      return Home_Page_Singleton
    },
  },
  methods: {
    fetchData() {
      this.loading = true
      this.superTableModel
        .FetchById(
          this.id,
          // this.relationships,
          [],
          { flags: {}, moreHeaders: {}, rels: [] }
        )
        .then((response) => {
          this.item = response.response.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        });
    },
  },
  mounted(){
    this.fetchData();
  }
}
</script>

<style scoped>

</style>
