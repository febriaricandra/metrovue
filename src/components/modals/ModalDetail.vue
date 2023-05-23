<script lang="ts">
import { inject } from 'vue';
import { convertdateTime } from '@/core/helpers/formatandconvert';

export default {
    name: 'modal-detail',

    setup() {
        let url = "http://10.10.0.223/backend-laravel-api/public";

        let showPicList = inject('showPicList');
        let show = inject('show');
        let showDetail = inject('showDetail');
        let files = inject('files');

        return {
            url,
            showPicList,
            show,
            showDetail,
            files,
            convertdateTime,
        }
    }
}
</script>

<template>
    <div class="modal fade" tabindex="-1" id="kt_modal_1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal Title</h5>
                    <!-- begin::Close -->
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span class="svg-icon svg-icon-2x">
                        </span>
                    </div>
                    <!-- end::Close -->
                </div>

                <div class="modal-body">
                    <p>Modal Body goes here</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-light-primary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>