<template>
    <div class="row gy-5 g-xl-10">
      <div class="col-xl-12 mb-xl-12">
        <div class="card card-flush h-xl-100">
          <!--begin::Card header-->
          <div class="card-header border-0 pt-5">
            <div class="d-flex align-items-center position-relative my-1">
              <select
                class="form-select form-select-solid form-control-solid w-150px"
                v-model="filter.siteID"
              >
                <option value="" selected="selected">All Site</option>
                <optgroup
                  v-for="(company, index) in sites"
                  :key="index"
                  v-bind:label="index"
                >
                  <option
                    v-for="site in company"
                    :key="site.siteID"
                    v-bind:value="site.siteID"
                  >
                    {{ site.siteID + " - " + site.siteName }}
                  </option>
                </optgroup>
              </select>
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <select
                v-model="filter.departement"
                id="dept"
                class="form-control form-select form-control-solid w-200px"
              >
                <option disabled value="" selected="selected">All Departement</option>
                <option
                  v-for="dept in depts"
                  :key="dept.deptID"
                  v-bind:value="dept.deptCode"
                >
                  {{ dept.deptCode + " - " + dept.deptName }}
                </option>
              </select>
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <select
                class="form-select form-select-solid form-control-solid w-150px"
                v-model="filter.status"
              >
                <option value="" selected="selected">All Status</option>
                <option value="WAITING APPROVAL">WAITING APPROVAL</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="UPLOADED">UPLOADED</option>
              </select>
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <!-- <vue-excel-xlsx
                :data="tableData"
                :columns="column"
                :file-name="'Document Management System'"
                :file-type="xlsx"
                :sheet-name="sheetName"
              >
              </vue-excel-xlsx> -->
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <span class="svg-icon svg-icon-1 position-absolute ms-6">
                <inline-svg src="/media/icons/duotune/general/gen021.svg" />
              </span>
              <input
                v-model="filter.search"
                type="text"
                class="form-control form-control-solid w-300px ps-14"
                placeholder="No.Document/Vendor/Notes"
              />
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <button
                type="button"
                class="btn btn-light-primary me-3"
                @click="ignoredReminder"
                :disabled="checkedId.length < 1"
              >
                <span class="svg-icon svg-icon-2">
                  <i class="fas fa-check"></i>
                </span>
                Ignored Reminder
                {{ checkedId.length == 0 ? "" : checkedId.length }}
                <span class="indicator-progress">
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
            <div class="d-flex align-items-center position-relative my-1">
              <router-link to="/form-document/create" class="btn btn-light-primary me-3">
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
            <KTDatatable
              :data="data"
              :header="tableHeader"
              :loading="loading"
            >
              <template v-slot:checkbox="{ row: data }">
                <div class="form-check form-check-sm form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :key="data.id"
                    v-bind:value="data.id"
                    v-model="checkedId"
                    :disabled="data.ignored_reminder == 'YES'"
                  />
                </div>
              </template>
              <template v-slot:action="{ row: data }">
                <router-link
                  :to="{ name: 'edit-document', params: { id: data.id } }"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/art/art005.svg" />
                  </span>
                </router-link>
  
                <button
                  @click.prevent="destroy(data.id, index)"
                  class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Delete"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/general/gen027.svg" />
                  </span>
                </button>
  
                <button
                  type="button"
                  @click="showDetail(data.id)"
                  class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Show Detail"
                >
                  <span class="svg-icon svg-icon-3">
                    <inline-svg src="/media/icons/duotune/general/gen021.svg" />
                  </span>
                </button>
              </template>
              <template v-slot:ignored="{ row: ignored }">
                <span
                  class="badge badge-warning"
                  v-if="ignored.ignored_reminder == 'NO'"
                  >{{ ignored.ignored_reminder }}</span
                >
                <span class="badge badge-success" v-else>{{
                  ignored.ignored_reminder
                }}</span>
              </template>
              <template v-slot:status="{ row: status }">
                <span class="badge badge-danger" v-if="status.status == 'EXPIRED'">{{
                  status.status
                }}</span>
                <span class="badge badge-primary" v-else>{{ status.status }}</span>
              </template>
              <template v-slot:document_number="{ row: document_number }">
                <div v-html="highlight(document_number.document_number, filter.search)"></div>
              </template>
              <template v-slot:vendor="{ row: vendor }">
                <div
                  v-html="highlight(vendor.vendor ? vendor.vendor : '', filter.search)"
                ></div>
              </template>
              <template v-slot:type_name="{ row: type_name }">
                {{ type_name.type_name }}
              </template>
              <template v-slot:company="{ row: company }">
                {{ company.company }}
              </template>
              <template v-slot:siteID="{ row: siteID }">
                <div v-html="highlight(siteID.siteID, siteID.siteID)"></div>
              </template>
              <template v-slot:department="{ row: department}">
                {{ department.department }}
              </template>
              <template v-slot:start_date="{ row: start_date }">
                {{ convertDateToString(start_date.start_date) }}
              </template>
              <template v-slot:expired_date="{ row: expired_date }">
                {{ convertDateToString(expired_date.expired_date) }}
              </template>
              <template v-slot:notes="{ row: notes}">
                <div
                  v-html="highlight(notes.notes ? notes.notes : '', filter.search)"
                ></div>
              </template>
            </KTDatatable>
          </div>
        </div>
        <!--end::Card-->
      </div>
    </div>
    <ShowModalDetail></ShowModalDetail>
  </template>

<script lang="ts">
import { onMounted, ref, computed, reactive, provide, readonly } from "vue";
import axios from "axios";
import { Modal } from "bootstrap";
import { convertDateToString } from "@/core/helpers/formatandconvert";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import ShowModalDetail from "@/components/modals/ShowModalDetail.vue";
import { start } from "@popperjs/core";

export default {
    components: {
        ShowModalDetail,
        KTDatatable,
    },

    setup() {
        onMounted(() => {
            console.log("mounted");
            indexList();
            listSites();
            listDepts();
        });

        //reactive state
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        let url = "http://10.10.0.223/backend-laravel-api/public/api/"
        let xlsx, sheetName;
        let checkedId = ref([]);
        let data = ref([]);
        let showPicList = ref([]);
        let files = ref([]);
        let sites = ref([]);
        let filter = reactive({
            siteID: "",
            status: "",
            departement: "",
            search: "",
        });

        const loading = ref(false);

        const column = ref([
            {
                label: "Status",
                field: "status",
            },
            {
                label: "No Document",
                field: "document_number",
            },
            {
                label: "Vendor",
                field: "vendor",
            },
            {
                label: "Type",
                field: "type_name",
            },
            {
                label: "Company",
                field: "company",
            },
            {
                label: "site",
                field: "siteID",
            },
            {
                label: "Departement",
                field: "department",
            },
            {
                label: "Start Date",
                field: "start_date",
            },
            {
                label: "Expired Date",
                field: "expired_date",
            },
            {
                label: "Note",
                field: "notes",
            }
        ])

        let show = reactive({
            document_number: "",
            type: "",
            site: "",
            dept: "",
            status: "",
            start_date: "",
            expired_date: "",
            vendor: "",
            pic_doc: false,
            need_approval: false,
            notes: "",
            ignored_reminder: "NO",
            created_by: "",
        })

        const tableHeader = ref([
            {
                columnName: "Checkbox",
                columnLabel: "checkbox",
                sortEnabled: false,
            },
            {
                columnName: "Ignored",
                columnLabel: "ignored",
                sortEnabled: true,
            },
            {
                columnName: "Action",
                columnLabel: "action",
                sortEnabled: true,
            },
            {
                columnName: "Status",
                columnLabel: "status",
                sortEnabled: true,
            },
            {
                columnName: "No Document",
                columnLabel: "document_number",
                sortEnabled: true,
            },
            {
                columnName: "Vendor",
                columnLabel: "vendor",
                sortEnabled: true,
            },
            {
                columnName: "Type",
                columnLabel: "type_name",
                sortEnabled: true,
            },
            {
                columnName: "Company",
                columnLabel: "company",
                sortEnabled: true,
            },
            {
                columnName: "Site",
                columnLabel: "siteID",
                sortEnabled: true,
            },
            {
                columnName: "Department",
                columnLabel: "department",
                sortEnabled: true,
            },
            {
                columnName: "Start Date",
                columnLabel: "start_date",
                sortEnabled: true,
            },
            {
                columnName: "Expired Date",
                columnLabel: "expired_date",
                sortEnabled: true,
            },
            {
                columnName: "Note",
                columnLabel: "notes",
                sortEnabled: true,
            },
        ]);

        const tableData = computed(() => {
            var site = filter.siteID;
            var post = data.value;

            var item, vendor, document, notes;
            if (filter.search) {
                post = post.filter(function (godoc: any) {
                    document = godoc.document_number.toUpperCase().indexOf(filter.search.toUpperCase());
                    vendor = godoc.vendor
                        ? godoc.vendor.toUpperCase().indexOf(filter.search.toUpperCase())
                        : "";
                    notes = godoc.notes.indexOf(filter.search.toUpperCase());
                    if (vendor !== -1 || document !== -1 || notes !== -1) {
                        return godoc;
                    }
                });
            }

            if (filter.siteID) {
                post = post.filter(function (godoc: any) {
                    item = godoc.siteID.toUpperCase().indexOf(site.toUpperCase());
                    if (item !== -1) {
                        return godoc;
                    }
                });
            }
            if (filter.departement) {
                post = post.filter(function (godoc: any) {
                    item = godoc.departement.indexOf(filter.departement);
                    if (item !== -1) {
                        return godoc;
                    }
                });
            }
            if (filter.status) {
                post = post.filter(function (godoc: any) {
                    item = godoc.status.indexOf(filter.status);
                    if (item !== -1) {
                        return godoc;
                    }
                });
            }
            return post;
        })

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
                    axios.delete(url + "godoc/FormDocument/" + id, {
                        headers: headers
                    });
                    let deleteIndex = data.value.findIndex((row) => row["id"] === id);
                    data.value.splice(deleteIndex, 1);
                    Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    setTimeout(index, 1000);
                } else if (result.dismiss === "cancel") {
                    Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
                }
            })
        }

        const showDetail = (id) => {
            loading.value = true;
            axios.get(url + "godoc/FormDocument/detail/" + id,{
              headers: headers,
            })
                .then((res) => {
                    console.log(res);
                    show.document_number = res.data.header.document_number;
                    show.type = res.data.header.type_name;
                    show.site = res.data.header.siteID + " - " + res.data.header.siteName;
                    show.dept = res.data.header.deptCode + " - " + res.data.header.deptName;
                    show.status = res.data.header.status;
                    show.start_date = res.data.header.start_date;
                    show.expired_date = res.data.header.expired_date;
                    show.vendor =
                        res.data.header.vendor == " " ? "Tidak Ada Vendor" : res.data.header.vendor;
                    show.pic_doc = res.data.header.pic == "YES" ? true : false;
                    show.need_approval = res.data.header.approval == "YES" ? true : false;
                    show.notes = res.data.header.notes;
                    show.created_by = res.data.header.EmployeeName;

                    showPicList.value = res.data.picList;
                    files.value = res.data.file;

                    const modal = new Modal("#modalDetail");
                    modal.show();
                    loading.value = false;
                }).catch((error) => {
                    console.log(error.res.data);
                    loading.value = false;
                });
        }

        const indexList = () => {
            loading.value = true;
            axios
                .get(url + "godoc/FormDocument", {
                    headers: headers,
                })
                .then((response) => {
                  console.log("list index: " + response);
                    data.value = response.data.data;
                    loading.value = false;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        };

        const ignoredReminder = () => {
            Swal.fire({
                title: "Warning",
                html: "Ignore reminder for this document, reminders will not be sent via email again",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Oke",
                reverseButtons: true
            }).then((function (result) {
                if (result.value) {
                    loading.value = true;
                    axios.post(url + "/godoc/FormDocument/ignoredreminder", {
                        listIgnoredId: checkedId.value
                    },
                        {
                            headers: headers
                        }).then((res) => {
                          console.log("ignored reminder: " + res)
                            loading.value = false;
                            Swal.fire({
                                title: "Success",
                                text: res.data.message,
                                icon: "success",
                                buttonStyling: false,
                                confirmButtonText: "Confirm Me!",
                                customClass: {
                                    confirmButton: "btn btn-primary",
                                },
                            })
                            checkedId.value = [];
                            indexList();
                        }).catch((e) => {
                            console.log(e);
                            Swal.fire({
                                icon: "Error",
                                title: "Oops...",
                                text: "Can't be ignored this document, please contact your administrator!",
                            });
                            loading.value = false;
                        })
                }
                loading.value = false;
                return false
            }));
        }

        const listSites = () => {
            axios.get(url + "siteListByCompanyGroup", {
                headers: headers,
            }).then((res) => {
              console.log("list sites: " + res.data)
                sites.value = res.data;
            }).catch((e) => {
                console.log("Gagal: ", e);
            })
        };

        let depts = ref([]);
        const listDepts = async () => {
            axios.get(url + "godoc/department", {
                headers: headers,
            }).then((res) => {
              console.log("list depts: " + res)
                depts.value = res.data;
            }).catch((e) => {
                console.log(e);
            })
        }

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
        }

        provide("showPicList", readonly(showPicList));

        provide("show", readonly(show));
        provide("showDetail", showDetail);

        provide("files", readonly(files));

        return {
            loading,
            depts,
            filter,
            sites,
            indexList,
            data,
            files,
            destroy,
            showDetail,
            Modal,
            tableData,
            tableHeader,
            highlight,
            checkedId,
            xlsx,
            sheetName,
            column,
            ignoredReminder,
            convertDateToString
        }
    }
}

</script>