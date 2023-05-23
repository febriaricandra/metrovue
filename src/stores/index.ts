import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import BodyModule from "@/stores/modules/BodyModule";
import BreadcrumbsModule from "@/stores/modules/BreadcrumbsModule";
import ConfigModule from "@/stores/modules/ConfigModule";
import ThemeModeModule from "@/stores/modules/ThemeModeModule";
import FilterKTDatatable from "@/stores/modules/FilterKTDatatable";

config.rawError = true;

const store = createStore({
  modules: {
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ThemeModeModule,
    FilterKTDatatable
  },
});

export default store;
