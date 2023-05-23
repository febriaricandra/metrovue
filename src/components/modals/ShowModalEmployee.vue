<template>
    <div class="modal fade" id="showEmployees" tabindex="-1" aria-hidden="true">
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
                placeholder="Search NIK / Name"
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
                :loading="loadingEmployees"
                class="employees-selector"
              >
                <template v-slot:nik="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                    v-html="highlight(val.EmployeeID, searchKey)"
                  ></div>
                </template>
                <template v-slot:name="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                    v-html="highlight(val.EmployeeName, searchKey)"
                  ></div>
                </template>
                <template v-slot:site="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                  >
                    {{ val.SiteId }}
                  </div>
                </template>
                <template v-slot:dept="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                  >
                    {{ val.deptCode }}
                  </div>
                </template>
                <template v-slot:position="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                  >
                    {{ val.PositionName }}
                  </div>
                </template>
                <template v-slot:Email="{ row: val }">
                  <div
                    data-bs-dismiss="modal"
                    @click="
                      clickEmployee(
                        val.EmployeeID,
                        val.EmployeeName,
                        val.EMAIL_ADDRESS,
                        val.PositionName
                      )
                    "
                  >
                    {{ val.EMAIL_ADDRESS ? val.EMAIL_ADDRESS : "Email Belum Terdaftar" }}
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
  <script lang="ts">
  import { inject, ref, computed } from "vue";
  import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
  export default {
    name: "employees-modal",
    components: {
      KTDatatable,
    },
    setup() {
      let searchKey = ref("");
      let clickEmployee = inject("clickEmployee");
      let dataEmployees = inject("dataEmployees");
      let loadingEmployees = inject("loadingEmployees");
  
      const tableHeader = ref([
        {
          columnName: "NIK",
          columnLabel: "nik",
          sortEnabled: true,
        },
        {
          columnName: "Name",
          columnLabel: "name",
          sortEnabled: true,
        },
        {
          columnName: "Site",
          columnLabel: "site",
          sortEnabled: true,
        },
        {
          columnName: "Dept",
          columnLabel: "dept",
          sortEnabled: true,
        },
        {
          columnName: "Position",
          columnLabel: "position",
          sortEnabled: true,
        },
        {
          columnLabel: "Email",
          columnName: "email",
          sortEnabled: true,
        },
      ]);
      const tableData = computed(() => {
        let data = dataEmployees.value;
        let key = searchKey.value;
  
        let nik, name;
        if (key) {
          data = data.filter(function (val) {
            nik = val.EmployeeID.toUpperCase().indexOf(key.toUpperCase());
            name = val.EmployeeName.toUpperCase().indexOf(key.toUpperCase());
            if (nik !== -1 || name !== -1) {
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
        dataEmployees,
        clickEmployee,
        loadingEmployees,
        tableHeader,
        tableData,
        highlight,
      };
    },
  };
  </script>
  <style>
  .employees-selector {
    cursor: pointer;
  }
  </style>
  