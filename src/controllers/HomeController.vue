<template>
  <div>
    <div class="row  q-col-gutter-md">
      <div class="col-xl-3 col-md-3 col-sm-12 col-xs-12">


      </div>
      <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

        Home

        <div class="q-mt-sm">
          © Your App
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
