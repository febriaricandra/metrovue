<template>
    <div class="d-flex flex-column flex-lg-row-fluid">
      <div class="d-flex flex-column flex-root" id="background">
        <!--begin::Page bg image-->
  
        <!--end::Page bg image-->
        <!--begin::Authentication - Sign-in -->
        <div class="d-flex flex-column flex-column-fluid flex-lg-row">
          <!--begin::Aside-->
          <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
            <!--begin::Aside-->
            <div class="d-flex flex-center flex-lg-start flex-column">
              <!--begin::Logo-->
              <div class="mb-5">
                <v-lazy-image
                  src="/media/logos/hupgotextgradasi.png"
                  style="height: 55px"
                />
              </div>
              <!--end::Logo-->
              <!--begin::Title-->
              <h2 class="text-white fw-normal m-0">
                Digital Application for Mining Industry
              </h2>
              <!--end::Title-->
            </div>
            <!--begin::Aside-->
          </div>
          <!--begin::Aside-->
          <!--begin::Body-->
          <div
            class="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12 p-lg-20"
          >
            <!--begin::Card-->
            <div
              class="bg-body d-flex flex-column align-items-stretch flex-center rounded-4 w-md-600px p-20"
            >
              <!--begin::Wrapper-->
              <div class="d-flex flex-center flex-column flex-column-fluid px-lg-10 pb-10">
                <!--begin::Form-->
                <Form class="form w-100" @submit="onSubmitLogin" :validation-schema="login">
                  <!--begin::Heading-->
                  <div class="text-center mb-10">
                    <!--begin::Title-->
                    <h1 class="text-dark mb-3">Sign In</h1>
                    <!--end::Title-->
                    <div class="text-gray-400 fw-bold fs-4">Hupgo Integrated System</div>
                  </div>
                  <!--begin::Heading-->
  
                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Label-->
                    <label class="form-label fs-6 fw-bolder text-dark">NIK</label>
                    <!--end::Label-->
  
                    <!--begin::Input-->
                    <Field
                      v-model="post.nik"
                      class="form-control form-control-lg form-control-solid"
                      type="number"
                      name="nik"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="nik" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
  
                  <!--begin::Input group-->
                  <div class="fv-row mb-10">
                    <!--begin::Wrapper-->
                    <div class="d-flex flex-stack mb-2">
                      <!--begin::Label-->
                      <label class="form-label fw-bolder text-dark fs-6 mb-0"
                        >Password</label
                      >
                      <!--end::Label-->
  
                      <!--begin::Link-->
                      <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">
                        Forgot Password ?
                      </router-link>
                      <!--end::Link-->
                    </div>
                    <!--end::Wrapper-->
  
                    <!--begin::Input-->
                    <Field
                      v-model="post.password"
                      class="form-control form-control-lg form-control-solid"
                      type="password"
                      name="password"
                      autocomplete="off"
                    />
                    <!--end::Input-->
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                  <!--end::Input group-->
  
                  <!--begin::Actions-->
                  <div class="text-center">
                    <!--begin::Submit button-->
                    <button
                      type="submit"
                      ref="submitButton"
                      class="btn btn-lg btn-primary w-100 mb-5"
                    >
                      <span class="indicator-label"> Submit </span>
                      <span class="indicator-progress">
                        Please wait...
                        <span
                          class="spinner-border spinner-border-sm align-middle ms-2"
                        ></span>
                      </span>
                    </button>
                    <!--end::Submit button-->
                  </div>
                  <!--end::Actions-->
                </Form>
                <!--end::Form-->
              </div>
              <!--end::Wrapper-->
              <!--begin::Footer-->
              <div class="d-flex flex-center flex-wrap fs-6 p-5 pb-3">
                <div class="text-gray-400 d-flex flex-center fw-bold fs-6">
                  Copyright © {{ new Date().getFullYear() }} - Powered by CMIS
                </div>
              </div>
              <!--end::Footer-->
            </div>
            <!--end::Card-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Authentication - Sign-in-->
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import { ErrorMessage, Field, Form } from "vee-validate";
  import { useRouter } from "vue-router";
  import { getIllustrationsPathAuth } from "@/core/helpers/assets";
  
  import Swal from "sweetalert2/dist/sweetalert2.min.js";
  import * as Yup from "yup";
  import axios from "axios";
  
  export default defineComponent({
    name: "sign-in",
    components: {
      Field,
      Form,
      ErrorMessage,
    },
    setup() {
      const router = useRouter();
  
      const token = "web-hupgo";
  
      const submitButton = ref<HTMLButtonElement | null>(null);
  
      let post = reactive({
        nik: "",
        password: "",
      });
  
      //Create form validation object
      const login = Yup.object().shape({
        nik: Yup.number().required().label("Nik"),
        password: Yup.string().min(4).required().label("Password"),
      });
  
      //Form submit function
      const onSubmitLogin = () => {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate loading indicator
        submitButton.value?.setAttribute("data-kt-indicator", "on");
  
        const env = process.env.VUE_APP_URL;
  
        axios
          .get(`https://mobilecentral.hpu-mining.com/sanctum/csrf-cookie`)
          .then((response) => {
            axios
              .post(`/login`, {
                nik: post.nik,
                password: post.password,
                token: token,
              })
              .then((res) => {
                if (res.data.status == "Success") {
                  Swal.fire({
                    text: "You have successfully logged in!",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                      confirmButton: "btn fw-bold btn-light-primary",
                    },
                  }).then(() => {
                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("token", res.data.content.access_token);
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    localStorage.setItem(
                      "teams",
                      JSON.stringify(res.data.user.Authorization[0])
                    );
  
                    submitButton.value?.removeAttribute("data-kt-indicator");
                    submitButton.value!.disabled = false;
  
                    router.push({ name: "homedashboard" });
                  });
                } else {
                  // Alert then login failed
                  Swal.fire({
                    text: res.data.message,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Try again!",
                    customClass: {
                      confirmButton: "btn fw-bold btn-light-danger",
                    },
                  });
                  submitButton.value?.removeAttribute("data-kt-indicator");
                  submitButton.value!.disabled = false;
                }
              })
              .catch((error) => {
                console.log(error);
                submitButton.value?.removeAttribute("data-kt-indicator");
                submitButton.value!.disabled = false;
              });
          });
      };
  
      return {
        login,
        post,
        submitButton,
        onSubmitLogin,
        getIllustrationsPathAuth,
      };
    },
  });
  </script>
  
  <style>
  .ilustration {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    width: 100%; /* or max-width: 100%; */
    height: auto;
    margin: auto;
  }
  
  #background {
    background-image: url("../../../public/media/coal-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  </style>
  