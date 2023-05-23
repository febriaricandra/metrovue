<template>
    <form @submit.prevent="submit">
        <div class="scrollable">
            <div class="row gy-5 g-xl-10">
                <div class="col-xl-12 mb-xl-12">
                    <div class="card card-flush h-xl-100">
                        <!--begin::Card body-->
                        <div class="card-body pb-0">
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>No. Document</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="text" class="form-control" v-model="show.document_number" disabled />
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label
                                        class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"><span>Type</span></label>
                                    <div class="col-sm-8 p-1">
                                        <input type="text" class="form-control" v-model="show.type" disabled />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>Site</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="text" class="form-control" v-model="show.site" disabled />
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>Start Date</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="date" class="form-control" @change="expiredDate"
                                            v-model="show.start_date" required />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>Department</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="text" class="form-control" v-model="show.dept" disabled />
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>Expired Date</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="date" class="form-control" @change="expiredDate"
                                            v-model="show.expired_date" required />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>Vendor</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <div class="input-group">
                                            <input type="text" v-model="show.vendor" class="form-control col-sm-11"
                                                disabled />
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
                                        class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">Created
                                        By</label>
                                    <div class="col-sm-8 p-1">
                                        <input type="text" class="form-control" v-model="show.created_by" disabled />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <label><span class="required">Notes</span></label><br /><br />
                                <textarea class="form-control" v-model="show.notes" style="height: 120px"
                                    required></textarea>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span class="required">File</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="file" accept="application/pdf" class="form-control" multiple
                                            @change="handleFileUploads($event)" />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <template v-for="file in exitingFiles" :key="file">
                                    <div
                                        class="alert alert-dismissible bg-light-primary border border-primary d-flex flex-column flex-sm-row w-90 p-5 mb-10">
                                        <span class="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
                                            <inline-svg src="/media/icons/duotune/files/fil003.svg" />
                                        </span>

                                        <!--begin::Content-->
                                        <a v-bind:href="url + '/GoDoc/' + file.name" target="_blank">
                                            <div class="d-flex flex-column">
                                                <h1></h1>
                                                <span class="align-middle">{{ file.name }}</span>
                                            </div>
                                        </a>
                                        <!--end::Content-->

                                        <!--begin::Close-->
                                        <button title="delete file" type="button" @click="deletefile(file.id, file)"
                                            class="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto">
                                            <!-- data-bs-dismiss="alert" -->
                                            <i class="bi bi-x fs-1 text-primary"></i>
                                        </button>
                                        <!--end::Close-->
                                    </div>
                                </template>
                            </div>
                        </div>
                        <!--end::Card body-->
                    </div>
                </div>
            </div>
            <br />
            <div class="row gy-5 g-xl-10" v-if="show.pic_doc">
                <div class="col-xl-12 mb-xl-12">
                    <div class="card card-flush h-xl-100">
                        <div class="card-header pt-5">
                            <h3 class="card-title align-items-start flex-column">
                                <span class="card-label fw-bolder fs-3 mb-1">List PIC Document</span>
                            </h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <div class="input-group">
                                        <input v-model="show.pic" type="text"
                                            class="form-control form-control-solid col-sm-6" placeholder="Search Employee"
                                            readonly required />
                                        <span class="input-group-append">
                                            <button type="button" class="btn btn-primary" @click="listEmployees()">
                                                <i class="fa fa-search"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-solid" v-model="show.position"
                                        placeholder="Position" readonly />
                                </div>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control" v-model="show.email"
                                        placeholder="Email Address" />
                                </div>
                                <button class="col-sm-2 btn btn-primary" @click="addListPicDoc" type="button">
                                    <i class="fa fa-plus-circle"></i>
                                    <span>Add To List</span>
                                </button>
                            </div>
                            <br />
                            <div class="table-responsive mt-2">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr class="fw-bolder text-muted bg-light">
                                            <th class="text-center text-nowrap">Action</th>
                                            <th class="text-center text-nowrap">PIC</th>
                                            <th class="text-center text-nowrap">Position</th>
                                            <th class="text-center text-nowrap">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colspan="13" class="text-center" v-if="listPicDoc.length < 1"
                                                style="color: grey">
                                                Data Empty
                                            </td>
                                        </tr>
                                        <tr v-for="(row, index) in listPicDoc" :key="index">
                                            <td class="text-nowrap text-center align-middle">
                                                <button @click.prevent="deletePic(index)"
                                                    class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                                    data-toggle="tooltip" data-placement="top" title="Delete">
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                            <td class="text-nowrap text-center align-middle">
                                                {{ row.pic ? row.pic : row.nik + "-" + row.EmployeeName }}
                                            </td>
                                            <td class="text-nowrap text-center align-middle">
                                                {{ row.position ? row.position : row.PositionName }}
                                            </td>
                                            <td class="text-nowrap text-center align-middle">
                                                {{ row.email }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <a class="btn btn-secondary" @click="$router.go(-1)">
                    <i class="fa fa-ban"></i>
                    <span>Cancel</span>
                </a>
                &nbsp;
                <!--begin::Button-->
                <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary me-3" ref="submitButton"
                    type="submit">
                    <span v-if="!loading" class="indicator-label">
                        Save Changes
                        <span class="svg-icon svg-icon-3 ms-2 me-0">
                            <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                        </span>
                    </span>
                    <span v-if="loading" class="indicator-progress">
                        Please wait...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                </button>
            </div>
        </div>
    </form>
    <ShowModalEmployee></ShowModalEmployee>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import ShowModalEmployee from "@/components/modals/ShowModalEmployee.vue";

import { onMounted, ref, reactive, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Modal } from "bootstrap";

export default {
    components: {
        KTDatatable,
        ShowModalEmployee,
    },
    setup() {
        onMounted(() => {
            console.log("mounted!");
            showData();
        })
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        let url = "http://10.10.0.223/backend-laravel-api/public/api/"

        const loading = ref<boolean>(false);
        const loadingEmployees = ref<boolean>(false);

        const router = useRouter();
        const route = useRoute();

        let token = localStorage.getItem("token");

        let files = [];
        let listPicDoc = ref([]);

        let show = reactive({
            id: "",
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

            pic: "",
            nik: "",
            position: "",
            email: "",
        });

        const handleFileUploads = (event) => {
            files = event.target.files;
        };

        let dataEmployees = ref([]);
        const listEmployees = () => {
            const modal = new Modal("#showEmployees");
            modal.show();
            loadingEmployees.value = true;

            axios
                .get(url + "AllEmployees", {
                    headers: headers,
                })
                .then((response) => {
                    dataEmployees.value = response.data;
                    loadingEmployees.value = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        let exitingFiles = ref([]);
        const showData = () => {
            axios
                .get(`${url}godoc/FormDocument/detail/${route.params.id}`, {
                    headers: headers,
                })
                .then((res) => {
                    show.id = res.data.header.id;
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
                    show.created_by = res.data.header.EmployeeName;
                    show.notes = res.data.header.notes;

                    exitingFiles.value = res.data.file;

                    listPicDoc.value = res.data.picList;
                })
                .catch((error) => {
                    console.log(error.res.data);
                    loading.value = false;
                });
        };

        const clickEmployee = (nik, name, email, position) => {
            show.nik = nik;
            show.pic = nik + " - " + name;
            show.email = email ? email : null;
            show.position = position;
        };

        const expiredDate = () => {
            if (show.expired_date) {
                if (show.expired_date < show.start_date) {
                    Swal.fire(
                        "Error",
                        "Expired Date tidak boleh lebih kecil dari Start Date!",
                        "error"
                    );
                    show.expired_date = "";
                    return false;
                }
            }
        };

        const addListPicDoc = () => {
            if (show.nik == "" || show.nik == null) {
                Swal.fire("Error", "Harap pilih Employee terlebih dahulu", "error");
                return false;
            }

            if (show.email == "" || show.email == null) {
                Swal.fire("Error", "Harap isi email terlebih dahulu", "error");
                return false;
            }

            if (listPicDoc.value.length > 0) {
                console.log(listPicDoc);
                for (let i = 0; i < listPicDoc.value.length; i++) {
                    let pic = listPicDoc.value[i]["nik"];
                    if (pic == show.nik) {
                        Swal.fire("Error", show.pic + " Sudah Ada Di List", "warning");
                        return false;
                    }
                }
            }

            let pic = {
                nik: show.nik,
                pic: show.pic,
                position: show.position,
                email: show.email,
            } as never;
            listPicDoc.value.push(pic);
        };

        const submit = () => {
            if (exitingFiles.value.length < 1 && files.length < 1) {
                Swal.fire("Error", "Document file wajib di upload", "error");
                loading.value = false;
                return false;
            }

            if (show.pic_doc && listPicDoc.value.length < 1) {
                Swal.fire("Error", "Harap pilih PIC terlebih dahulu", "error");
                loading.value = false;
                return false;
            }

            loading.value = true;

            let formData = new FormData();
            formData.set("id", show.id);
            formData.set("start_date", show.start_date);
            formData.set("expired_date", show.expired_date);
            formData.set("notes", show.notes);
            formData.append("picList", JSON.stringify(listPicDoc.value));

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                formData.append("fileUpload[" + i + "]", file);
            }

            const headersForm = {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            };

            axios
                .post(url + "godoc/FormDocument/update", formData, {
                    headers: headersForm,
                })
                .then((res) => {
                    if (res.data.status == "Success") {
                        Swal.fire({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Confirm me!",
                            customClass: {
                                confirmButton: "btn btn-primary",
                            },
                        }).then(() => {
                            loading.value = false;
                            router.push({ name: "listdocumnet" });
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: res.data.message,
                            showClass: {
                                popup: "animate__animated animate__fadeInDown",
                            },
                            hideClass: {
                                popup: "animate__animated animate__fadeOutUp",
                            },
                        });
                        console.log(res.data);
                        loading.value = false;
                    }
                })
                .catch((error) => {
                    loading.value = false;
                    console.log(error);
                });
        };

        const deletePic = (i) => {
            listPicDoc.value.splice(i, 1);
        };

        const deletefile = (id, i) => {
            Swal.fire({
                title: "Are you sure?",
                text: "This file will be permanantly deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
                .then(function (result) {
                    if (result.value) {
                        axios
                            .delete(url + "godoc/FormDocument/file/" + id, {
                                headers: headers,
                            })
                            .then((res) => {
                                exitingFiles.value.splice(i, 1);
                                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                                router.push({ name: "Edit Document" });
                                setTimeout(showData, 1000);
                            })
                            .catch((error) => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: error,
                                    showClass: {
                                        popup: "animate__animated animate__fadeInDown",
                                    },
                                    hideClass: {
                                        popup: "animate__animated animate__fadeOutUp",
                                    },
                                });
                                console.log(error);
                            });
                    } else if (result.dismiss === "cancel") {
                        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error,
                        showClass: {
                            popup: "animate__animated animate__fadeInDown",
                        },
                        hideClass: {
                            popup: "animate__animated animate__fadeOutUp",
                        },
                    });
                    console.log(error);
                });
        };

        provide("clickEmployee", clickEmployee);
        provide("loadingEmployees", loadingEmployees);
        provide("dataEmployees", dataEmployees);

        return {
            url,
            show,
            submit,
            files,
            exitingFiles,
            addListPicDoc,
            listPicDoc,
            loading,
            loadingEmployees,
            handleFileUploads,
            listEmployees,
            dataEmployees,
            deletePic,
            deletefile,
            expiredDate,
        }
    }
}
</script>

<style>
.vendor-selector {
    cursor: pointer;
}

.modal-backdrop {
    display: none;
}
</style>
