<template>
  <form @submit.prevent="submit">
    <div class="row gy-5 g-xl-10">
      <div class="col-xl-12 mb-xl-12">
        <div class="card card-flush h-xl-100">
          <!--begin::Card body-->
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-sm-6 row">
                <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                  <span class="required">Code</span>
                </label>
                <div class="col-sm-8 p-1">
                  <input type="text" v-model="post.code" class="form-control" placeholder="Code" required />
                </div>
              </div>
              <div class="col-12 col-sm-6 row">
                <label class="col-sm-3 d-sm-flex justify-content-start align-items-center text-sm">
                  <span class="required">Description</span>
                </label>
                <div class="col-sm-8 p-1">
                  <input type="text" v-model="post.description" class="form-control" placeholder="Description" required />
                </div>
              </div>
            </div>
            <br />
          </div>
          <!--end::Card body-->
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
      <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary me-3" type="submit">
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
  </form>
</template>

<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

import { defineComponent, onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "godoc-create",
  setup() {
    onMounted(() => {
      console.log("mounted!");
    });

    const router = useRouter();
    const loading = ref<boolean>(false);
    let headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    let url = "http://10.10.0.223/backend-laravel-api/public/api/"


    let post = reactive({
      code: "",
      description: "",
    });

    const submit = () => {
      loading.value = true;

      axios.post(url + "godoc/master/typeDocument", {
        code: post.code,
        description: post.description,
      }, {
        headers: headers
      }).then((response) => {
        if (response.data.status == "Success") {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            buttonStyling: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          }).then(() => {
            loading.value = false;
            router.push({ name: "godoc-form" });
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.data.message,
            icon: "error",
            buttonStyling: false,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          loading.value = false;
          console.log(response);
        }
      })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: error.response.data.message,
            icon: "error",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          })
          loading.value = false;
        });
    };
    return {
      post,
      submit,
      loading
    }
  }
});
</script>