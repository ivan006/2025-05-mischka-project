<template>
  <div>
    <template v-if="loading">
      <div class="text-center q-pa-xl">Loading...</div>
    </template>
    <template v-else>

      <div class="q-py-xl">

        <div
          class="container-md"
        >
          <div class="row q-col-gutter-md">


            <!--<div class="col-xl-1 col-md-1 col-sm-12 col-xs-12">-->


            <!--</div>-->

            <div class="col-xl-10 col-md-10 col-sm-12 col-xs-12 offset-md-1 q-px-xl">

              <h1 class="gt-sm text-center text-h3">
                {{item.fields?.['Hero Title']}}
              </h1>
              <h1 class="lt-md text-center text-h4">
                {{item.fields?.['Hero Title']}}
              </h1>
              <h2 class="gt-sm text-center text-h1 text-bold">

                {{item.fields?.['Hero Subtitle']}}
              </h2>
              <h2 class="lt-md text-center text-h2 text-bold">

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

      <div class=" bg-black" style="padding-top: 100px; padding-bottom: 100px;">
        <div
          class="container-md "
        >

          <div class="row">

            <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12">

              <h1 class="text-center text-h3 text-bold">
                About Us
              </h1>

            </div>
            <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12 q-px-xl">
              <div class=" text-h5 ">

                {{item.fields?.['About Us Text']}}
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class=" bg-white text-black">
        <div class="row">

          <div
            class="col-xl-6 col-md-6 col-sm-12 col-xs-12"
          >

            <!--:style="this.item.fields?.['Contact Image'][0].url ? `background-image: url(https://capetownlists.co.za/?url=${this.item.fields?.['Contact Image'][0].url});` : ``"-->
            <!--<div style="height: 500px;">-->

            <!--</div>-->

            <img
              :src="this.item.fields?.['Contact Image'][0].url ? `https://capetownlists.co.za/?url=${this.item.fields?.['Contact Image'][0].url}` : ''"
              style="width: 100%; display: block;"
            >

          </div>
          <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12  " >
            <div class="row full-height items-center q-py-lg q-px-xl ">

              <div class="">



                <h2 class="gt-sm text-h3 text-bold ">

                  {{item.fields?.['Contact Title']}}
                </h2>
                <h2 class="lt-md text-h4 text-bold ">

                  {{item.fields?.['Contact Title']}}
                </h2>
                <div class=" text-h5 q-pb-xl">

                  {{item.fields?.['Contact Email Address']}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </template>
    <HomeSEOController />


  </div>
</template>

<script>
import Home_Page_Singleton from "src/models/orm-api/Home_Page_Singleton";
import { createMetaMixin } from 'quasar'
import HomeSEOController from "src/controllers/HomeSEOController.vue";




export default {
  name: "AboutController.vue",
  components: {HomeSEOController},
  mixins: [
    createMetaMixin(function () {
      const data = {}

      return {
        title: this.item.fields?.['Hero Title'],
        titleTemplate: title => `${title} | ${import.meta.env.VITE_API_SITE_TITLE}`, // prepend site name
        meta: {
          description: {
            name: 'description',
            content: this.item.fields?.['About Us Text']
          },
          ogTitle: {
            property: 'og:title',
            content: this.item.fields?.['Hero Title']
          },
          ogDescription: {
            property: 'og:description',
            content: this.item.fields?.['About Us Text']
          },
          ogImage: {
            property: 'og:image',
            content: this.item.fields?.['Contact Image'][0].url
          },
          ogType: {
            property: 'og:type',
            content: 'website'
          },
          ogSiteName: {
            property: 'og:site_name',
            content: 'By Misch Marketing'
          },
          twitterCard: {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          twitterTitle: {
            name: 'twitter:title',
            content: this.item.fields?.['Hero Title']
          },
          twitterDescription: {
            name: 'twitter:description',
            content: this.item.fields?.['About Us Text']
          },
          twitterImage: {
            name: 'twitter:image',
            content: this.item.fields?.['Contact Image'][0].url
          },
          // robots: {
          //   name: 'robots',
          //   content: 'noindex, follow'
          // },
          keywords: {
            name: 'keywords',
            content: 'business marketing, digital marketing, SEO, branding, social media, Misch Marketing'
          },
        }
      }
    })
  ],
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
