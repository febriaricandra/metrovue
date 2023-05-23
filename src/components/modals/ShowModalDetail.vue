<template>
    <!--begin::Modal - New Target-->
    <div
      class="modal fade bd-example-modal-lg"
      id="modalDetail"
      aria-modal="true"
      tabindex="-1"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-1000px">
        <!--begin::Modal content-->
        <div class="modal-content rounded">
          <!--begin::Modal header-->
          <div class="modal-header pb-0 border-1 justify-content-end">
            <!--begin::Close-->
            <div
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1 w-100">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
            <!--end::Close-->
          </div>
          <!--begin::Modal header-->
  
          <!--begin::Modal body-->
          <div class="modal-body">
            <!--begin:Form-->
            <div class="row gy-5 g-xl-10">
              <div class="col-xl-12 mb-xl-12">
                <div class="card card-flush h-xl-100">
                  <!--begin::Card body-->
                  <div class="card-body pb-0">
                    <div class="row">
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>No. Document</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="show.document_number"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                          ><span>Type</span></label
                        >
                        <div class="col-sm-8 p-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="show.type"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>Site</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="show.site"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>Start Date</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <input
                            type="date"
                            class="form-control"
                            v-model="show.start_date"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>Department</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="show.dept"
                            disabled
                          />
                        </div>
                      </div>
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>Expired Date</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <input
                            type="date"
                            class="form-control"
                            v-model="show.expired_date"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                        >
                          <span>Vendor</span>
                        </label>
                        <div class="col-sm-8 p-1">
                          <div class="input-group">
                            <input
                              type="text"
                              v-model="show.vendor"
                              class="form-control col-sm-11"
                              disabled
                            />
                            <span class="input-group-append">
                              <button type="button" class="btn btn-primary" disabled>
                                <i class="fa fa-search"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-sm-6 row">
                        <label
                          class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"
                          >Cretaed By</label
                        >
                        <div class="col-sm-8 p-1">
                          <input
                            type="text"
                            class="form-control"
                            v-model="show.created_by"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <label><span>Notes</span></label
                      ><br /><br />
                      <textarea
                        class="form-control"
                        v-model="show.notes"
                        style="height: 120px"
                        disabled
                      ></textarea>
                    </div>
                    <br />
                    <div class="row">
                      <template v-for="file in files" :key="file.doc_id">
                        <a v-bind:href="url + '/GoDoc/' + file.name" target="_blank">
                          <div
                            class="alert alert-dismissible bg-light-primary border border-primary d-flex flex-column flex-sm-row w-90 p-5 mb-10"
                          >
                            <span
                              class="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0"
                            >
                              <inline-svg src="/media/icons/duotune/files/fil003.svg" />
                            </span>
  
                            <!--begin::Content-->
                            <div class="d-flex flex-column">
                              <h1></h1>
                              <span class="align-middle">{{ file.name }}</span>
                            </div>
                            <!--end::Content-->
                          </div>
                        </a>
                      </template>
                    </div>
                  </div>
  
                  <div v-if="showPicList.length != 0">
                    <div class="card-header border-0 pb-0">
                      <h6 class="card-title">PIC List</h6>
                    </div>
                    <div class="card-body p-0">
                      <table class="table table-responsive table-bordered">
                        <thead class="thead-light">
                          <tr class="fw-bolder text-muted bg-light">
                            <th class="text-nowrap text-center">PIC</th>
                            <th class="text-nowrap text-center">Position</th>
                            <th class="text-nowrap text-center">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(pic, index) in showPicList" :key="index">
                            <td class="text-nowrap text-center align-middle">
                              <span class="badge badge-light-success">
                                {{ pic.nik + " - " + pic.EmployeeName }}
                              </span>
                            </td>
                            <td class="text-nowrap text-center align-middle">
                              <span class="badge badge-light-primary">
                                {{ pic.PositionName }}
                              </span>
                            </td>
                            <td class="text-nowrap text-center align-middle">
                              <span class="badge badge-light-danger">
                                {{ pic.email }}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <!--end::Card body-->
                </div>
                <br />
              </div>
            </div>
            <!--end:Form-->
          </div>
          <!--end::Modal body-->
        </div>
        <!--end::Modal content-->
      </div>
      <!--end::Modal dialog-->
    </div>
    <!--end::Modal - New Target-->
  </template>
  
  <script lang="ts">
  import { inject } from "vue";
  import { convertdateTime } from "@/core/helpers/formatandconvert";
  
  export default (await import('vue')).defineComponent({
    name: "modal-card",
  
    setup() {
      let url = "http://10.10.0.223/backend-laravel-api/public";
  
      let showPicList = inject("showPicList");
      let show = inject("show");
      let showDetail = inject("showDetail");
      let files = inject("files");
  
      return {
        url,
        files,
        showPicList,
        show,
        showDetail,
        convertdateTime,
      };
    },
  });
  </script>
  