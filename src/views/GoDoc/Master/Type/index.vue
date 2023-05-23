<template>
    <div class="row gy-5 g-xl-10">
        <div class="col-xl-12 mb-xl-12">
            <div class="card card-flush h-xl-100">
                <!--begin::Card header-->
                <div class="card-header border-0">
                    <div class="d-flex align-items-center">
                        <router-link :to="{ name: 'Add Type Document' }" class="btn btn-sm btn-light-primary">
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
                    <KTDatatable :header="tableHeader" :data="data" :loading="loading">
                        <template v-slot:actions="{ row: data }">
                            <router-link
                            :to="{ name: 'Edit Type Document', params: { id: data.id } }"
                            class="btn btn-sm btn-light-primary">
                                <span class="svg-icon svg-icon-2">
                                    <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
                                </span>
                                Edit
                            </router-link>
                            <button @click="destroy(data.id, data.id)" class="btn btn-sm btn-light-danger">
                                <span
                                    class="svg-icon svg-icon-primary svg-icon-2x"><!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Navigation/Minus.svg--><svg
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1" />
                                        </g>
                                    </svg><!--end::Svg Icon--></span>
                                Delete
                            </button>
                        </template>
                        <template v-slot:code="{ row: code }">
                            <span>{{ code.typeCode }}</span>
                        </template>
                        <template v-slot:description="{ row: description }">
                            <span>{{ description.typeName }}</span>
                        </template>
                    </KTDatatable>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
export default {
    name: "test",
    components: {
        KTDatatable,
    },
    setup() {
        onMounted(() => {
            console.log("mounted");
            indexTypeDocument();
        });

        let sites = ref([]);
        // const data = ref([
        //     {
        //         id: 1,
        //         customer: "Emma Smith",
        //         status: "Active",
        //         color: "success",
        //     },
        //     {
        //         id: 2,
        //         customer: "Melody Macy",
        //         status: "Active",
        //         color: "success",
        //     },
        //     {
        //         id: 3,
        //         customer: "Max Smith",
        //         status: "Active",
        //         color: "primary",
        //     },
        //     {
        //         id: 4,
        //         customer: "Sean Bean",
        //         status: "Expiring",
        //         color: "warning",
        //     },
        //     {
        //         id: 5,
        //         customer: "Brian Cox",
        //         status: "Expiring",
        //         color: "warning",
        //     }
        // ]);
        let data = ref([]);
        let loading = ref();
        let items = ref([]);
        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        let url = "http://10.10.0.223/backend-laravel-api/public/api/"

        const tableHeader = ref([
            {
                columnName: "Action",
                columnLabel: "actions",
            },
            {
                columnName: "Code",
                columnLabel: "code",
            },
            {
                columnName: "Description",
                columnLabel: "description",
            },
        ]);

        const indexTypeDocument = () => {
            loading.value = true;
            axios.get(url + "godoc/master/typeDocument", {
                headers: headers
            })
                .then((res) => {
                    console.log(res);
                    data.value = res.data.data;
                    console.log(data.value);
                    loading.value = false;
                })
                .catch((err) => {
                    console.log(err);
                    loading.value = false;
                });
        };

        const destroy = (id, index) => {
            Swal.fire({
                title: "Are you sure?",
                text: "This record and it`s details will be permanantly deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, Cancel",
                reverseButtons: true,
            }).then(function (result) {
                if (result.value) {
                    axios.delete(url + "godoc/master/TypeDocument/" + id);
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
            tableHeader,
            loading,
            items,
            data,
            destroy
        }
    }
}
</script>