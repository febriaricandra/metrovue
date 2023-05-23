<template>
    <div class="modal fade" id="showVendor" tabindex="-1" aria-hidden="true">
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-scrollable mw-800px mh-700px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header pb-0 border-1 justify-content-end">
            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
            <!--end::Close-->
          </div>
          <!--begin::Modal header-->
          <!--begin::Modal body-->
          <div class="modal-body">
            <div class="d-flex align-items-center position-relative my-1">
              <span class="svg-icon svg-icon-1 position-absolute ms-6">
                <inline-svg src="/media/icons/duotune/general/gen021.svg" />
              </span>
              <input
                type="text"
                class="form-control form-control-solid w-250px ps-14"
                v-model="searchKey"
                placeholder="Vendor Name"
              />
            </div>
            <br />
            <span class="text-sm text-muted">
              *The data displayed is too much, please search by specific vendor name
            </span>
            <br />
            <div class="table-responsive">
              <KTDatatable
                :data="tableData"
                :header="tableHeader"
                :loading="loadingVendor"
                class="vendor-selector"
              >
                <template v-slot:vendor_number="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="clickVendor(val.vendor_number, val.vendor_name)"
                  >
                    {{ val.vendor_number }}
                  </div>
                </template>
                <template v-slot:title="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="clickVendor(val.vendor_number, val.vendor_name)"
                  >
                    {{ val.title }}
                  </div>
                </template>
                <template v-slot:vendor_name="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="clickVendor(val.vendor_number, val.vendor_name)"
                    v-html="highlight(val.vendor_name, searchKey)"
                  ></div>
                </template>
                <template v-slot:city="{ row: val }"
                  ><div
                    data-bs-dismiss="modal"
                    @click="clickVendor(val.vendor_number, val.vendor_name)"
                  >
                    {{ val.city }}
                  </div>
                </template>
                <template v-slot:house_number_street="{ row: val }"
                  ><div
                    data-bs-dismiss="modal"
                    @click="clickVendor(val.vendor_number, val.vendor_name)"
                  >
                    {{ val.house_number_street }}
                  </div>
                </template>
              </KTDatatable>
            </div>
          </div>
          <!--end::Modal body-->
        </div>
        <!--end::Modal content-->
      </div>
      <!--end::Modal dialog-->
    </div>
  </template>
  <script>
  import { inject, ref, computed } from "vue";
  import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
  export default {
    name: "vendor-modal",
    components: {
      KTDatatable,
    },
    setup() {
      let searchKey = ref("");
      let clickVendor = inject("clickVendor");
      let dataVendor = inject("dataVendor");
      let loadingVendor = inject("loadingVendor");
      const tableHeader = ref([
        {
          columnName: "Number",
          columnLabel: "vendor_number",
          sortable: true,
        },
        {
          columnName: "Title",
          columnLabel: "title",
          sortable: true,
        },
        {
          columnName: "Name",
          columnLabel: "vendor_name",
          sortable: true,
        },
        {
          columnName: "City",
          columnLabel: "city",
          sortable: true,
        },
      ]);
      const tableData = computed(() => {
        let data = dataVendor.value;
        let key = searchKey.value;
  
        let item;
        if (key) {
          data = data.filter(function (val) {
            item = val.vendor_name.toUpperCase().indexOf(key.toUpperCase());
            if (item !== -1) {
              return val;
            }
          });
        }
        return data;
      });
      const highlight = (words, query) => {
        function pregQuote(str) {
          return (str.trim() + "").replace(
            /([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,
            "\\$1"
          );
        }
        var iQuery = new RegExp(pregQuote(query), "ig");
        return words.toString().replace(iQuery, function (matchedTxt, a, b) {
          return "<span class='text-primary'>" + matchedTxt + "</span>";
        });
      };
  
      return {
        searchKey,
        dataVendor,
        clickVendor,
        loadingVendor,
        tableHeader,
        tableData,
        highlight,
      };
    },
  };
  </script>
  <style>
  .vendor-selector {
    cursor: pointer;
  }
  </style>
  