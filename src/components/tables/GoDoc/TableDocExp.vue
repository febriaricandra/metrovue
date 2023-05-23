<template>
  <!--begin::Tables Document Expired-->
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title align-items-start flex-column">
        <span class="text-muted mt-1 fw-bold fs-7">Documents that will expired</span>
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-0">
      <div class="d-flex align-items-center position-relative my-1">
        <span class="svg-icon svg-icon-1 position-absolute ms-6">
          <inline-svg src="/media/icons/duotune/general/gen021.svg" />
        </span>
        <input type="text" v-model="search" class="form-control form-control-solid w-300px ps-14"
          placeholder="No.Document / Notes" />
      </div>
      <!--begin::Table container-->
      <div class="table-responsive">
        <KTDataTable :table-data="tableData" :table-header="tableHeader" :loading="loading" :rowsPerPage="3">
          <template v-slot:cell-actions="{ row: val }">
            <button @click="showDetail(val.id)" class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
              title="Delete">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="/media/icons/duotune/general/gen021.svg" />
              </span>
            </button>
          </template>
          <template v-slot:cell-status="{ row: val }">
            <span class="badge badge-light-warning" v-if="val.status == 'WAITING APPROVAL' || val.status == 'PENDING'">{{
              val.status }}</span>
            <span class="badge badge-light-danger" v-else-if="val.status == 'REJECTED' || val.status == 'EXPIRED'">{{
              val.status }}</span>
            <span class="badge badge-light-success" v-else>{{ val.status }}</span>
          </template>
          <template v-slot:cell-no_document="{ row: val }">
            {{ val.document_number }}
          </template>
          <template v-slot:cell-expired_date="{ row: val }">
            {{ convertdate(val.expired_date) }}
          </template>
          <template v-slot:cell-notes="{ row: val }">
            {{ val.notes }}
          </template>
        </KTDataTable>
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Document Expired-->
</template>

<script lang="ts">
import { computed, inject, ref } from "vue";
import { convertdate } from "@/core/helpers/formatandconvert";

import KTDataTable from "@/components/kt-datatable/KTDataTable.vue";

export default {
  name: "document-exp",
  components: {
    KTDataTable,
  },
  setup() {
    let loading = inject("loading");
    let posts = inject("posts");
    let showPicList = inject("showPicList");
    let show = inject("show");
    let showDetail = inject("showDetail");

    let search = ref("");

    const tableHeader = ref([
      {
        name: "Action",
        key: "actions",
      },
      {
        name: "Status",
        key: "status",
      },
      {
        name: "Expired Date",
        key: "expired_date",
      },
      {
        name: "No. Document",
        key: "no_document",
      },
      {
        name: "Notes",
        key: "notes",
      },
    ]);

    const tableData = computed(() => {
      let post = posts.value;
      let searchKey = search.value;
      let document, notes;
      if (searchKey) {
        post = post.filter(function (godoc) {
          document = godoc.document_number.toUpperCase().indexOf(searchKey.toUpperCase());
          notes = godoc.notes.indexOf(searchKey);
          if (document !== -1 || notes !== -1) {
            return godoc;
          }
        });
      }
      return post;
    });

    return {
      search,
      posts,
      convertdate,
      loading,
      tableHeader,
      tableData,
      showPicList,
      show,
      showDetail,
    };
  },
};
</script>
