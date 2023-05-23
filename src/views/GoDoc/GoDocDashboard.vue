<template>
    <!--begin::Dashboard-->
    <div class="row gy-5 g-xl-10">
        <!--begin::Col-->
        <div class="card h-md-100">
            <div class="col-xl-12 mb-xl-10">
                <div class="row justify-content-center align-self-center pt-7">
                    <template v-for="(row, index) in count" :key="index">
                        <div class="col bg-light-primary px-6 py-7 rounded-2 me-7 ms-7 mb-7 mt-7">
                            <div class="d-flex row">
                                <div class="col-sm-3 text-center">
                                    <span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.3"
                                                d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z"
                                                fill="black" />
                                            <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="col-sm-4">
                                    <span class="fs-2hx fw-bolder text-gray-800">{{ row.total }}</span>
                                    &nbsp;
                                    <span class="text-warning fw-bold fs-6 pl-3">{{ row.label }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <br />
    <div class="row gy-5 g-xl-10">
        <div class="col-xl-5">
            <!--begin::Engage widget 1-->
            <div class="card d-flex">
                <!--begin::Body-->
                <div class="card-body">
                    <div class="row justify-content-center align-self-center">
                        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
                    </div>
                </div>
                <!--end::Body-->
            </div>
            <!--end::Engage widget 1-->
        </div>
        <div class="col-xl-7">
            <!-- <TableDocExp></TableDocExp> -->
            <EasyDataTable :headers="tableHeader" :items="items" v-model:server-options="serverOptions" :loading="loading"
                :server-items-length="serverItemsLength" table-class-name="customize-table" buttons-pagination alternating>
                <template #item-actions="item">
                    <span class="style-icon svg-icon svg-icon-3x svg-icon-primary d-block my-2" @click="showDetail(item.id)">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3"
                                d="M19 22H5C4.4 22 4 21.6 4 21V3C4 2.4 4.4 2 5 2H14L20 8V21C20 21.6 19.6 22 19 22ZM15 17C15 16.4 14.6 16 14 16H8C7.4 16 7 16.4 7 17C7 17.6 7.4 18 8 18H14C14.6 18 15 17.6 15 17ZM17 12C17 11.4 16.6 11 16 11H8C7.4 11 7 11.4 7 12C7 12.6 7.4 13 8 13H16C16.6 13 17 12.6 17 12ZM17 7C17 6.4 16.6 6 16 6H8C7.4 6 7 6.4 7 7C7 7.6 7.4 8 8 8H16C16.6 8 17 7.6 17 7Z"
                                fill="white" />
                            <path d="M15 8H20L14 2V7C14 7.6 14.4 8 15 8Z" fill="white" />
                        </svg>
                    </span>
                </template>
                <div id="row-clicked"></div>
            </EasyDataTable>
        </div>
    </div>
    <ShowModalDetail></ShowModalDetail>
</template>
  
<script lang="ts">
import axios from "axios";
// import TableDocExp from "@/components/tables/GoDoc/TableDocExp.vue";
import { Modal } from "bootstrap";
import ShowModalDetail from "@/components/modals/ShowModalDetail.vue";
import { provide, onMounted, reactive, ref, readonly, computed, watch } from "vue";
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";

export default {
    name: "godoc-dashboard",
    components: {
        ShowModalDetail,
        EasyDataTable: window["vue3-easy-data-table"],
    },

    setup() {
        onMounted(() => {
            index();
            loadFromServer();
        });

        let count = ref([]);
        let posts = ref([]);
        let loading = ref();
        let files = ref([]);
        let showPicList = ref([]);
        let show = reactive({
            document_number: "",
            type: "",
            site: "",
            dept: "",
            status: "",
            start_date: "",
            expired_date: "",
            vendor: "",
            need_notif: false,
            need_approval: false,
            notes: "",
            created_by: "",
        });

        const tableHeader = ref([
            {
                text: "Action",
                value: "actions",
            },
            {
                text: "Status",
                value: "status",
            },
            {
                text: "Expired Date",
                value: "expired_date",
            },
            {
                text: "No. Document",
                value: "document_number",
            },
            {
                text: "Notes",
                value: "notes",
            },
        ]);

        let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        let series = ref([]);
        let chartOptions = {
            labels: [],
            colors: ["#4caf50", "#f44336", "#2196f3", "#ffc107"],
            plotOptions: {
                // pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: "Nunito, sans-serif",
                            fontWeight: 600,
                        },
                        value: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: "Nunito, sans-serif",
                            fontWeight: 600,
                        },
                        total: {
                            show: true,
                            label: "Total",
                            color: "#373a3c",
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b;
                                }, 0);
                            },
                        },
                    },
                },
                // },
            },
            chart: {
                id: "chartStatus",
                height: "200px",
                type: "donut",
                toolbar: {
                    show: false,
                },
            },
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: {
                    width: 10,
                    height: 10,
                    radius: 10,
                },
            },
            noData: {
                text: "Data not found",
            },
        };

        let url = "http://10.10.0.223/backend-laravel-api/public/api/"
        let items = ref([]);
        let serverItemsLength = ref(0);
        let serverOptions = ref<ServerOptions>({
            page: 1,
            rowsPerPage: 3,
        });



        // const prevPage = (page) => {
        //     console.log(page);
        // }
        // const nextPage = (page) => {
        //     page = page + 1;
        //     console.log(page);
        // }

        const loadFromServer = async () => {
            loading.value = true;
            const { page } = serverOptions.value;
            const response = await axios.get(url + "godoc/Dashboard?page=" + page, {
                headers: headers
            });
            serverItemsLength.value = response.data.documentWillExpire.total;
            items.value = response.data.documentWillExpire.data;
            loading.value = false;
        };



        const index = () => {
            loading.value = true;
            axios.get(url + "godoc/Dashboard?page=1", {
                headers: headers
            }).then((res) => {
                console.log(res);
                count.value = res.data.chartData;
                posts.value = res.data.documentWillExpire;
                loading.value = false;
                res.data.chartData.forEach((element) => {
                    series.value.push(element.total);
                    chartOptions.labels.push(element.label);
                });
                ApexCharts.exec("chartStatus", "updateSeries", series);
                ApexCharts.exec("chartStatus", "updateOptions", chartOptions);
            }).catch((err) => {
                console.log(err);
                loading.value = false;
            });
        }

        const showDetail = (id) => {
            axios.get(url + "godoc/FormDocument/detail/" + id, {
                headers: headers
            }).then((res) => {
                console.log(res);
                show.document_number = res.data.header.document_number;
                show.type = res.data.header.type_name;
                show.site = res.data.header.siteID + " - " + res.data.header.siteName;
                show.dept = res.data.header.deptCode + " - " + res.data.header.deptName;
                show.status = res.data.header.status;
                show.start_date = res.data.header.start_date;
                show.expired_date = res.data.header.expired_date;
                show.vendor = res.data.header.vendor;
                show.need_notif = res.data.header.notification == "YES" ? true : false;
                show.need_approval = res.data.header.approval == "YES" ? true : false;
                show.notes = res.data.header.notes;
                show.created_by = res.data.header.EmployeeName;

                showPicList.value = res.data.approvalList;
                files.value = res.data.file;

                const modal = new Modal("#modalDetail");
                modal.show();
            }).catch((e) => {
                console.log(e);
            });
        };

        provide("loading", loading);
        provide("posts", posts);
        provide("showDetail", showDetail);
        provide("show", show);
        provide("files", files);
        provide("showPicList", showPicList);

        watch(serverOptions, async (value) => {
            await loadFromServer();
        }, { deep: true });


        return {
            count,
            posts,
            loading,
            series,
            chartOptions,
            show,
            files,
            showPicList,
            showDetail,
            tableHeader,
            items,
            serverOptions,
            serverItemsLength,
        }
    }
}

</script>

<style>
.customize-table {
    --easy-table-border: 1px solid #445269;
    --easy-table-row-border: 1px solid #445269;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #c1cad4;
    --easy-table-header-background-color: #2d3a4f;

    --easy-table-header-item-padding: 10px 15px;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;

    --easy-table-body-row-font-color: #c0c7d2;
    --easy-table-body-row-background-color: #2d3a4f;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;

    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #eee;

    --easy-table-body-item-padding: 10px 15px;

    --easy-table-footer-background-color: #2d3a4f;
    --easy-table-footer-font-color: #c0c7d2;
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;

    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-rows-per-page-selector-z-index: 1;


    --easy-table-scrollbar-track-color: #2d3a4f;
    --easy-table-scrollbar-color: #2d3a4f;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    ;
    --easy-table-scrollbar-corner-color: #2d3a4f;

    --easy-table-loading-mask-background-color: #2d3a4f;
}

.style-icon {
    cursor: pointer;
    width: 20px;
}

.pagination__rows-per-page {}
</style>
  