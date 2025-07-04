<template>
  <div class="row justify-center" >
    <template v-if="!items.length">
      <template v-if="loading">
        <div class="text-center q-pa-md">Loading...</div>
      </template>
      <template v-else>
        <div class="text-center q-pa-md text-grey-5">None</div>
      </template>
    </template>
    <template v-else>
      <template v-for="item in items" :key="item.id">
        <q-item
          clickable
          :to="item.URL"
          :active-class="'q-item--highlighted'"
          class="q-pl-lg text-h5"
          :style="isActive(item) ? 'border-bottom: white solid 5px;' : 'border-bottom: rgba(0,0,0,0) solid 5px;'"
        >
          <q-item-section>
            <q-item-label :style="isActive(item) ? 'font-weight: bold;': ''">
              {{ item.Label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </template>
  </div>

</template>

<script>
import Menu_Items from 'src/models/orm-api/Menu_Items'

export default {
  name: 'Services_Controller',
  components: {
  },

  props: {
    fetchFlags: {
      type: Object,
      default: () => ({})
    }
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

    isActive(item) {
      return item.URL === this.activeRoute;
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
  watch: {
    '$route.path'(newPath) {
      this.activeRoute = newPath;
    }
  }
}
</script>
