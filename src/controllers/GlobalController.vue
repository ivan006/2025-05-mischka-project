<template>
  <GlobalControllerHelper>
    <template v-slot:menu>
      <MenuItems />
    </template>

    <template v-slot:default>
      <q-page-container>
        <div class="q-mb-md">
          <BreadcrumbsComp />
        </div>
        <router-view />
      </q-page-container>
    </template>
  </GlobalControllerHelper>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import GlobalControllerHelper from 'src/controllers/GlobalHelperController.vue';
import BreadcrumbsComp from 'src/controllers/BreadcrumbsComp.vue';
import VueCookies from 'vue-cookies';
import MenuItems from 'src/controllers/MenuItems.vue';
import Menu_Items from "src/models/orm-api/Menu_Items";

export default {
  name: 'GlobalController',
  components: {
    GlobalControllerHelper,
    BreadcrumbsComp,
    MenuItems
  },

  data(){
    return {
      activeRoute: this.$route.path,
      items: [],
      loading: false,
      loadingError: false,
      options: {
        page: 1,
        itemsPerPage: 10,
        sortBy: [],
        groupBy: [],
      },
      filterValsRef: {},
    }
  },
  computed: {
    superTableModel() {
      return Menu_Items
    },
    filterValsComp() {
      const result = {
        ...this.filterValsRef,
      };
      return result;
    },
  },
  methods: {

    isActive(route) {
      return route === this.activeRoute;
    },

    clickRow(item) {

      this.$router.push({
        path: item.URL
        // name: '/lists/brands/:rId/:rName',
        // params: {
        //   rId: pVal,
        //   rName: item.name,
        // },
      })
    },

    async fetchData() {
      try {

        this.loading = true;
        this.loadingError = false;
        let rules = [];


        let extraHeaderComputed = {};
        let flagsComputed = {};

        const response = await this.superTableModel.FetchAll(
          // =========================
          [],
          {
            ...rules,
            ...flagsComputed,
            /// -----------------------
            ...this.fetchFlags,
          },
          extraHeaderComputed,
          {
            page: this.options.page,
            limit: this.options.itemsPerPage,
            //============================
            filters: this.filterValsComp,
            clearPrimaryModelOnly: false,
          },
        );


        this.items = response.response.data.records.map(record => {
          return {
            id: record.id,
            createdTime: record.createdTime,
            ...record.fields
          };
        });


        this.loading = false;

      } catch (error) {
        this.loading = false;
        this.loadingError = true;
      }
    },
  },
  mounted(){
    this.fetchData();
  },
};
</script>
