<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <div class="container-md row no-wrap items-center bg-primary text-white">

        <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />-->
        <q-avatar>
          <!--<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">-->
          <q-icon name="school" size="lg" style="opacity: 50%" />
        </q-avatar>

        <q-toolbar-title>{{ siteTitle }}</q-toolbar-title>

        <!--<q-btn flat round dense icon="whatshot" />-->
        <MenuItems />
      </div>

    </q-toolbar>

    <!--<img v-if="item.fields" :src="`https://capetownlists.co.za/?url=${item.fields['Site Background Image'][0].url}`" alt="">-->
    <img v-if="item.fields" :src="`${item.fields['Site Background Image'][0].url}`" alt="">
    <div class="container-md">
      <div class="q-px-md">
        <div class="q-pb-md">

          <q-page-container>
            <!--<pre>{{item}}</pre>-->
            <div class="q-mb-md">
              <BreadcrumbsComp />
            </div>
            <router-view />
          </q-page-container>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BreadcrumbsComp from 'src/controllers/BreadcrumbsComp.vue';
import VueCookies from 'vue-cookies';
import MenuItems from 'src/controllers/MenuItems.vue';
import Menu_Items from "src/models/orm-api/Menu_Items";
import Header_Singleton from "src/models/orm-api/Header_Singleton";

export default {
  name: 'GlobalController',
  components: {
    BreadcrumbsComp,
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
