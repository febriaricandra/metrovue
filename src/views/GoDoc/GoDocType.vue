<template>
    <div class="row gy-5 g-xl-10">
      <div class="col-xl-12 mb-xl-12">
        <div class="card card-flush h-xl-100">
          <!--begin::Card header-->
          <div class="card-header border-0">
            <div class="d-flex align-items-center">
              <router-link
                :to="{ name: 'Add Type Document' }"
                class="btn btn-sm btn-light-primary"
              >
                <span class="svg-icon svg-icon-2">
                  <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
                </span>
                Create
              </router-link>
            </div>
          </div>
          <!--end::Card header-->
  
          <!--begin::Card body-->
          <div class="card-body pt-0">
            <KTDatatable :table-data="data" :table-header="tableHeader" :loading="loading">
              <template v-slot:cell-actions="{ row: row }">
                <button
                  @click.prevent="destroy(row.id, index)"
                  class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                  </span>
                </button>
  
                <router-link
                  :to="{ name: 'Edit Type Document', params: { id: row.id } }"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                  </span>
                </router-link>
              </template>
              <template v-slot:cell-code="{ row: val }">
                {{ val.typeCode }}
              </template>
              <template v-slot:cell-description="{ row: val }">
                {{ val.typeName }}
              </template>
            </KTDatatable>
          </div>
          <!--end::Card body-->
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
  
  import axios from "axios";
  import Swal from "sweetalert2/dist/sweetalert2.min.js";
  import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
  
  export default defineComponent({
    components: {
      KTDatatable,
    },
    setup() {
      onMounted(() => {
        setCurrentPageTitle("Type Document");
        indexTypeDocument();
      });
  
      let sites = ref([]);
      let data = ref([]);
      let loading = ref();
  
      const tableHeader = ref([
        {
          name: "Action",
          key: "actions",
        },
        {
          name: "Code",
          key: "code",
        },
        {
          name: "Description",
          key: "description",
        },
      ]);
  
      const indexTypeDocument = () => {
        loading.value = true;
        axios
          .get("/godoc/master/typeDocument")
          .then((response) => {
            loading.value = false;
            data.value = response.data.data;
          })
          .catch((error) => {
            loading.value = false;
            console.log(error);
          });
      };
  
      const destroy = (id, index) => {
        Swal.fire({
          title: "Are you sure?",
          text: "This record and it`s details will be permanantly deleted!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        }).then(function (result) {
          if (result.value) {
            axios.delete("godoc/master/typeDocument/" + id);
            let deleteIndex = data.value.findIndex((row) => row["id"] === id);
            data.value.splice(deleteIndex, 1);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setTimeout(index, 1000);
          } else if (result.dismiss === "cancel") {
            Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
          }
        });
      };
  
      return {
        data,
        sites,
        destroy,
        loading,
        tableHeader,
      };
    },
  });
  </script>
  