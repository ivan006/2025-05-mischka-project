<template>
  <MainLayoutHelper>
    <template v-slot:menu>
      <MenuItems />

    </template>
    <template v-slot:default>
      <q-page-container>


        <div class="q-mb-md">
          <BreadcrumbsComp />
        </div>
        <router-view @route-changed="updateActiveRoute" />
      </q-page-container>
    </template>
  </MainLayoutHelper>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import { useRoute } from 'vue-router';
import MainLayoutHelper from "src/controllers/GlobalHelperController.vue";
import BreadcrumbsComp from "src/controllers/BreadcrumbsComp.vue";
import VueCookies from "vue-cookies";
import MenuItems from "src/controllers/MenuItems.vue";

defineOptions({
  name: 'MainLayout'
});

const route = useRoute();
const activeRoute = ref(route.path);

watch(route, (newRoute) => {
  activeRoute.value = newRoute.path;
});

const session = computed(() => {
  return VueCookies.get('VITE_AUTH');
});





function updateActiveRoute(newRoute) {
  activeRoute.value = newRoute;
}
</script>
