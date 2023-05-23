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
                                        <span class="required">Site</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <select v-model="post.siteID" id="site" class="form-control" required>
                                            <option disabled value="" selected="selected">
                                                Please select one
                                            </option>
                                            <optgroup v-for="(company, index) in sites" :key="index" v-bind:label="index">
                                                <option v-for="site in company" :key="site.siteID" v-bind:value="{
                                                    siteID: site.siteID,
                                                    company: index,
                                                }">
                                                    {{ site.siteID + " - " + site.siteName }}
                                                </option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm"><span
                                            class="required">Type</span></label>
                                    <div class="col-sm-8 p-1">
                                        <select v-model="post.document_type" class="form-control" required>
                                            <option disabled value="" sexlected="selected">
                                                Please select one
                                            </option>
                                            <option v-for="type in types" :key="type.id" v-bind:value="{
                                                id: type.id,
                                                typeCode: type.typeCode,
                                            }">
                                                {{ type.typeCode + " - " + type.typeName }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span class="required">Department</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <select v-model="post.deptID" id="dept" class="form-control" required>
                                            <option disabled value="" selected="selected">
                                                Please select one
                                            </option>
                                            <option v-for="dept in depts" :key="dept.deptID" v-bind:value="{
                                                deptID: dept.deptID,
                                                deptCode: dept.deptCode,
                                            }">
                                                {{ dept.deptCode + " - " + dept.deptName }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span class="required">Start Date</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="date" class="form-control date-picker" @change="expiredDate"
                                            v-model="post.start_date" required />
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
                                            <input v-model="post.vendor_name" type="text"
                                                class="form-control form-control-solid col-sm-11"
                                                placeholder="Search Vendor" readonly />
                                            <span class="input-group-append">
                                                <button type="button" class="btn btn-primary" @click="listVendor">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span class="required">Expired Date</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="date" class="form-control" @change="expiredDate"
                                            v-model="post.expired_date" required />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">PIC
                                        Document</label>
                                    <div class="col-sm-8 d-sm-flex justify-content-start align-items-center">
                                        <div class="form-check">
                                            <input v-model="post.pic_doc" class="form-check-input" type="checkbox" />
                                            <label class="form-check-label" for="checknotif">
                                                <span>
                                                    <i class="badge text-danger">
                                                        Send reminder email to PIC document
                                                    </i>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 row">
                                    <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                                        <span>File</span>
                                    </label>
                                    <div class="col-sm-8 p-1">
                                        <input type="file" accept="application/pdf" class="form-control" multiple
                                            @change="handleFileUploads($event)" />
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="row mb-5">
                                <label><span class="required">Notes</span></label><br /><br />
                                <textarea class="form-control" v-model="post.notes" style="height: 120px"
                                    required></textarea>
                            </div>
                        </div>
                        <!--end::Card body-->
                    </div>
                </div>
            </div>
            <br />
            <div class="row gy-5 g-xl-10" v-if="post.pic_doc">
                <div class="col-xl-12 mb-xl-12">
                    <div class="card card-flush h-xl-100">
                        <div class="row">
                            <div class="card-header pt-5">
                                <h3 class="card-title align-items-start flex-column">
                                    <span class="card-label fw-bolder fs-3 mb-1">List PIC Document</span>
                                </h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <div class="input-group">
                                            <input v-model="post.pic" type="text"
                                                class="form-control form-control-solid col-sm-6"
                                                placeholder="Search Employee" readonly required />
                                            <span class="input-group-append">
                                                <button type="button" class="btn btn-primary" @click="listEmployees()">
                                                    <i class="fa fa-search"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control form-control-solid" v-model="post.position"
                                            placeholder="Position" readonly />
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="text" class="form-control" v-model="post.email"
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
                                            <tr v-for="(app, index) in listPicDoc" :key="index">
                                                <td class="text-nowrap text-center align-middle">
                                                    <button @click.prevent="destroy(index)"
                                                        class="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"
                                                        data-toggle="tooltip" data-placement="top" title="Delete">
                                                        <i class="fas fa-trash-alt"></i>
                                                    </button>
                                                </td>
                                                <td class="text-nowrap text-center align-middle">
                                                    {{ app.pic }}
                                                </td>
                                                <td class="text-nowrap text-center align-middle">
                                                    {{ app.position }}
                                                </td>
                                                <td class="text-nowrap text-center align-middle">
                                                    {{ app.email }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
                        Submit
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
    <ShowModalVendor></ShowModalVendor>
    <ShowModalEmployee></ShowModalEmployee>
</template>

<script lang="ts">
import { onMounted, provide, computed, ref, reactive, readonly } from "vue";
import { convertDateToString } from "@/core/helpers/formatandconvert";
import { Modal } from "bootstrap";

import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import ShowModalDetail from "@/components/modals/ShowModalDetail.vue";
import ShowModalEmployee from "@/components/modals/ShowModalEmployee.vue";
import ShowModalVendor from "@/components/modals/ShowModalVendor.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { useRouter } from "vue-router";

export default {
    name: "form-document",
    components: {
        KTDatatable,
        ShowModalDetail,
        ShowModalEmployee,
        ShowModalVendor,
    },

    setup() {
        onMounted(() => {
            console.log("mounted")
            listDepts();
            listSites();
            listTypes();
        });


        const loading = ref<boolean>(false);
        const loadingEmployees = ref<boolean>(false);
        const loadingVendor = ref<boolean>(false);

        const router = useRouter();

        let files = ref([]);
        let sites = ref([]);
        let types = ref([]);
        let depts = ref([]);
        let listPicDoc = ref([]);
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        let url = "http://10.10.0.223/backend-laravel-api/public/api/"

        let token = localStorage.getItem("token");

        let post = reactive({
            document_type: "",
            siteID: "",
            deptID: "",
            vendor: "",
            vendor_number: "",
            vendor_name: "",
            start_date: "",
            expired_date: "",
            pic_doc: false,
            notes: "",

            pic: "",
            nik: "",
            position: "",
            email: "",
        });

        let alert = reactive({
            size: false,
            type: false,
            required: false,
        });

        const handleFileUploads = (event) => {
            files.value = event.target.files;
        };

        const listSites = () => {
            axios.get(url + "siteListByCompanyGroup", { headers: headers })
                .then((res) => {
                    console.log("list sites: " + res.data);
                    sites.value = res.data;
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        const listTypes = () => {
            axios.get(url + "godoc/typeDocument", { headers: headers })
                .then((res) => {
                    console.log("type: " + res);
                    types.value = res.data;
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        const listDepts = () => {
            axios.get(url + "godoc/department", { headers: headers })
                .then((res) => {
                    console.log(res);
                    depts.value = res.data;
                }).catch((err) => {
                    console.log(err);
                })
        }

        let dataEmployees = ref([]);
        const listEmployees = () => {
            const modal = new Modal("#showEmployees");
            modal.show();
            loadingEmployees.value = true;

            axios.get(url + "AllEmployees", {
                headers: headers,
            }).then((res) => {
                dataEmployees.value = res.data;
                loadingEmployees.value = false;
            }).catch((e) => {
                console.log(e);
                loadingEmployees.value = false;
            })
        }

        let dataVendor = ref([]);
        const listVendor = () => {
            let company = post.siteID["company"];
            if (!company) {
                Swal.fire("Warning", "Harap pilih site terlebih dahulu", "error");
                return false;
            }
            const modal = new Modal("#showVendor");
            modal.show();
            loading.value = true;
            axios.get(url + "godoc/getVendor", {
                params: {
                    company: company,
                },
                headers: headers,
            }).then((res) => {
                dataVendor.value = res.data;
                loading.value = false;
            }).catch((e) => {
                console.log(e);
            })
        }

        const clickVendor = (vendor, vendorName) => {
            post.vendor_number = vendor;
            post.vendor_name = vendor + " - " + vendorName;
        }

        const clickEmployee = (nik, name, email, position) => {
            post.nik = nik;
            post.pic = nik + " - " + name;
            post.email = email;
            post.position = position;
        }

        const expiredDate = () => {
            if (post.expired_date) {
                if (post.expired_date < post.start_date) {
                    Swal.fire(
                        "Error",
                        "Expired Date tidak boleh lebih kecil dari Start Date!",
                        "error"
                    );
                    post.expired_date = "";
                    return false;
                }
            }
        }

        const addListPicDoc = () => {
            if (post.nik == "" || post.nik == null) {
                Swal.fire("Error", "Harap pilih Employee terlebih dahulu", "error");
                return false;
            }

            if (post.email == "" || post.email == null) {
                Swal.fire("Error", "Harap isi email terlebih dahulu", "error");
                return false;
            }

            if (listPicDoc.value.length > 0) {
                console.log(listPicDoc);
                for (let i = 0; i < listPicDoc.value.length; i++) {
                    let pic = listPicDoc.value[i]["nik"];
                    if (pic == post.nik) {
                        Swal.fire("Error", post.pic + " Sudah Ada Di List", "warning");
                        return false;
                    }
                }
            }

            let pic = {
                nik: post.nik,
                pic: post.pic,
                position: post.position,
                email: post.email,
            } as never;
            listPicDoc.value.push(pic);
        };

        const submit = () => {
            if (post.pic_doc && listPicDoc.value.length < 1) {
                Swal.fire("Error", "Harap pilih PIC terlebih dahulu", "error");
                loading.value = false;
                return false;
            }

            loading.value = true;
            let formData = new FormData();
            formData.set("document_type", post.document_type["id"]);
            formData.set("document_code", post.document_type["typeCode"]);
            formData.set("company", post.siteID["company"]);
            formData.set("siteID", post.siteID["siteID"]);
            formData.set("deptID", post.deptID["deptID"]);
            formData.set("dept_code", post.deptID["deptCode"]);
            formData.set("vendor_number", post.vendor_number);
            formData.set("start_date", post.start_date);
            formData.set("expired_date", post.expired_date);
            formData.set("pic", post.pic_doc == true ? "YES" : "NO");
            formData.set("notes", post.notes);

            formData.append("picList", JSON.stringify(listPicDoc.value));

            for (let i = 0; i < files.value.length; i++) {
                let file = files.value[i];
                formData.append("fileUpload[" + i + "]", file);
            }

            axios.post(url + "godoc/FormDocument", formData, {
                headers: headers
            }).then((res) => {
                if (res.data.status === "Success") {
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
                    loading.value = false;
                }
            })
                .catch((e) => {
                    loading.value = false;
                    console.log(e);
                })
        }

        const destroy = (i) => {
            listPicDoc.value.splice(i, 1);
        }

        provide("clickVendor", clickVendor);
        provide("dataVendor", dataVendor);
        provide("loadingVendor", loadingVendor);

        provide("clickEmployee", clickEmployee);
        provide("loadingEmployees", loadingEmployees);
        provide("dataEmployees", dataEmployees);

        return {
            post,
            sites,
            types,
            depts,
            submit,
            alert,
            addListPicDoc,
            listPicDoc,
            loading,
            loadingVendor,
            loadingEmployees,
            listVendor,
            handleFileUploads,
            expiredDate,
            listEmployees,
            dataEmployees,
            dataVendor,
            clickVendor,
            destroy,
        }
    }

}
</script>