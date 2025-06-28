<template>
  <div
    :style="this.item.fields?.['Site Background Image'][0].url ? `background-image: url('https://capetownlists.co.za/?url=${this.item.fields?.['Site Background Image'][0].url}');` : ``"
    style="
    color: white;
    min-height: 100vh;
    background-color: rgb(70,70,70);
    "
  >
    <q-toolbar style="height: 100%" class="q-py-md">
      <div class="container-md row no-wrap items-center  text-white ">

        <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <!--<q-avatar large>-->
        <!--  <img :src="this.item.fields?.['Logo Image'][0].url">-->
        <!--  &lt;!&ndash;<q-icon name="school" size="lg" style="opacity: 50%" />&ndash;&gt;-->
        <!--</q-avatar>-->

        <img
          :src="this.item.fields?.['Logo Image'][0].url"
          style="height: 200px;"
        >
        <q-toolbar-title>
          <!--{{ siteTitle }}-->
        </q-toolbar-title>

        <!--<q-btn flat round dense icon="whatshot" />-->
        <MenuItems />
      </div>

    </q-toolbar>




    <!--<img v-if="item.fields" :src="`https://capetownlists.co.za/?url=${item.fields['Site Background Image'][0].url}`" alt="">-->
    <!--<img v-if="item.fields" :src="`${item.fields['Site Background Image'][0].url}`" alt="">-->



    <q-page-container>
      <!--<pre>{{item}}</pre>-->
      <div class="q-mt-md ">
        <!--<BreadcrumbsComp />-->
        <router-view />
      </div>
    </q-page-container>
    <!--<div class="q-pb-md">-->
    <!--</div>-->
    <!--<div class="q-px-md">-->
    <!--</div>-->
  </div>

</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// import BreadcrumbsComp from 'src/controllers/BreadcrumbsComp.vue';
import VueCookies from 'vue-cookies';
import MenuItems from 'src/controllers/MenuItems.vue';
import Menu_Items from "src/models/orm-api/Menu_Items";
import Header_Singleton from "src/models/orm-api/Header_Singleton";

export default {
  name: 'GlobalController',
  components: {
    // BreadcrumbsComp,
    MenuItems
  },

  data(){
    return {
      siteTitle: 'Lorum Ipsum',
      loading: true,
      item: {},
    }
  },
  computed: {

    id() {
      // return this.$route.params.rId
      return 'reci1Y5KdKFBkz3T1'
    },
    superTableModel() {
      return Header_Singleton
    },
    bgUrl() {
      const result = this.item.fields?.['Site Background Image'][0].url
      return result
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
};
</script>
