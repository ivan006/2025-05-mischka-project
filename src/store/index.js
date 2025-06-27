import { createStore } from 'vuex'
import VuexORM from '@vuex-orm/core'

// import { DBCrudCacheSet } from 'wizweb-fe';

import User from 'src/models/User'
import Session from 'src/models/Session'
import RouteLineage  from "src/models/RouteLineage";

import Brand from "src/models/orm-api/Brand";
import Global_Settings_Singleton from "src/models/orm-api/Global_Settings_Singleton";
import Header_Singleton from "src/models/orm-api/Header_Singleton";
import Footer_Singleton from "src/models/orm-api/Footer_Singleton";
import Menu_Items from "src/models/orm-api/Menu_Items";
import Social_Menu_Items from "src/models/orm-api/Social_Menu_Items";



// Initialize the database
const database = new VuexORM.Database()

// Register models
// database.register(DBCrudCacheSet);

database.register(User)
database.register(Session)
database.register(RouteLineage)
database.register(Global_Settings_Singleton)
database.register(Header_Singleton)
database.register(Footer_Singleton)
database.register(Menu_Items)
database.register(Social_Menu_Items)

database.register(Brand);


// Create Vuex store
const store = createStore({
  plugins: [VuexORM.install(database)]
})

export default store
