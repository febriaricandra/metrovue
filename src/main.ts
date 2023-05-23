import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";

//imports for app initialization
// import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";
import VueApexCharts from "vue3-apexcharts";


import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
// import excel from 'vue-excel-export'


import "@/core/plugins/prismjs";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.component("apexchart", VueApexCharts);
app.component("EasyDataTable", Vue3EasyDataTable);

app.use(i18n);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
