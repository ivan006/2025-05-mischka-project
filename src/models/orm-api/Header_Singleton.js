import { Model } from '@vuex-orm/core'

export default class Global_Settings_Singleton extends Model {
    static entity = 'Global_Settings_Singleton';
    static entityUrl = '/Global_Settings_Singleton';
    static primaryKey = 'id';

    static baseUrl = import.meta.env.VITE_API_BACKEND_URL

    static fields() {
        return {
            'id': this.attr('').nullable(),
            'name': this.attr(''),
            'name_2': this.attr(''),
            'desc': this.attr(''),
            'image': this.attr(''),
            'createdTime': this.attr('').nullable()
        };
    }

  static mergeHeaders(headers) {
    const result = {
      ...headers,
    };

    // const VITE_AUTH = VueCookies.get('VITE_AUTH');
    //
    // if (VITE_AUTH?.token) {
    //   const expireDate = new Date(VITE_AUTH.expireDate);
    //   const currentDate = new Date();
    //
    //   if (currentDate <= expireDate) {
    //     result['Authorization'] = `Bearer ${VITE_AUTH.token}`;
    //   }
    // }


    result['Authorization'] = `Bearer ${import.meta.env.VITE_API_AIRTABLE_KEY}`;


    return result;
  }

  static customApiBase(moreHeaders) {
    // const baseUrlAndHeaders =
    //   CustonMixins.methods.DefaultHeadersAndBaseUrl()
    this.apiConfig = {
      // ...DefaultSISHeadersAndBaseUrl(),
      // baseURL: baseUrlAndHeaders.baseURL,
      baseURL: "",
      headers: {
        // ...baseUrlAndHeaders.headers,
        ...moreHeaders,
      },
    }
    return this.api()
  }

    static FetchAll(relationships = [], flags = {}, moreHeaders = {}, options = { page: 1, limit: 15, filters: {}, clearPrimaryModelOnly: false }) {

      const url = `${this.baseUrl}${this.entityUrl}`
      const headers = this.mergeHeaders(moreHeaders)

      let offset = (options.page - 1) * options.limit
      // todo: note - i hade to put the filters in line because urls can have duplicates keys and objects cans and i needed duplicates key support for the date range filter

      let computedUrl = url
      let preparedRels = {}
      let filtersObj = {}


      // Wrap the actual Airtable URL inside the proxy URL
      // const airtableUrl = `${url}?limit=10&offset=0`;
      // computedUrl = `https://capetownlists.co.za/?url=${encodeURIComponent(airtableUrl)}`;
      // computedUrl = url;
      // computedUrl = `${url}`;

      // preparedRels = Helpers.prepareRelationsForAirtable(relationships);
      // filtersObj = Helpers.prepareFiltersForAirtable(options.filters);

      const result = this.customApiBase(headers)
        .get(computedUrl, {
          persistBy: 'insertOrUpdate',
          params: {
            ...{
              limit: options.limit,
              offset: offset,
            },
            ...flags,
            ...preparedRels,
            ...filtersObj
          },
          dataTransformer: ({ data }) => {
            if (options.clearPrimaryModelOnly) {
              this.deleteAll()
            }
            const result = data
            return result
          },
        })
        // .then((res) => {
        //   return res
        // })
        // .catch((error) => {
        //   // CustonMixins.methods.logNetworkError(error)
        //   // return error // < would this be needed maybe?
        // })

      return result
    }

    static FetchById(id, relationships = [], flags = {}, moreHeaders = {}) {

        return this.customSupabaseApiFetchById(
            `${this.baseUrl}${this.entityUrl}`,
            id,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Store(entity, relationships = [], flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiStore(
            `${this.baseUrl}${this.entityUrl}`,
            entity,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Update(entity, relationships = [], flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiUpdate(
            `${this.baseUrl}${this.entityUrl}`,
            entity,
            [...this.parentWithables, ...relationships],
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }

    static Delete(entityId, flags = {}, moreHeaders = {}) {
        return this.customSupabaseApiDelete(
            `${this.baseUrl}${this.entityUrl}`,
            entityId,
            flags,
            this.mergeHeaders(moreHeaders),
            this
        );
    }
}
