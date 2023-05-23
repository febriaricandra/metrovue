<template>
  <!--begin::Page title-->
  <div
    v-if="pageTitleDisplay"
    :class="`page-title d-flex flex-row justify-content-center flex-wrap me-3`"
  >
    <template v-if="pageTitle">
      <!--begin::Title-->
      <router-link to="/" class="text-muted text-hover-primary">Back</router-link>
      <span class="h-20px border-gray-200 border-start ms-3 mx-2"></span>
      <h1
        class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0 mx-4"
      >
        {{ pageTitle }}
      </h1>
      <!--end::Title-->

      <span
        v-if="pageTitleDirection === 'row' && pageTitleBreadcrumbDisplay"
        class="h-20px border-gray-200 border-start mx-3"
      ></span>

      <!--begin::Breadcrumb-->
      <ul
        v-if="breadcrumbs && pageTitleBreadcrumbDisplay"
        class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
      >
        <!--begin::Item-->
        <!-- <li class="breadcrumb-item text-muted">
          <router-link to="/" class="text-muted text-hover-primary"
            >Home</router-link
          >
        </li> -->
        <!--end::Item-->
      </ul>
      <!--end::Breadcrumb-->
    </template>
  </div>
  <div v-else class="align-items-stretch"></div>
  <!--end::Page title-->
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {
  pageTitleBreadcrumbDisplay,
  pageTitleDirection,
  pageTitleDisplay,
} from "@/core/helpers/config";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "layout-page-title",
  components: {},
  setup() {
    const route = useRoute();

    const pageTitle = computed(() => {
      return route.meta.pageTitle;
    });

    const breadcrumbs = computed(() => {
      return route.meta.breadcrumbs;
    });

    return {
      pageTitle,
      breadcrumbs,
      pageTitleDisplay,
      pageTitleBreadcrumbDisplay,
      pageTitleDirection,
    };
  },
});
</script>
