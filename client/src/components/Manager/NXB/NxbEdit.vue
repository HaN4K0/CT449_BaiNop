<script>
import { ElMessage } from 'element-plus';
import NxbForm from './NxbForm.vue';
import { nxbStore } from '@/stores/nxb';
const nxb = nxbStore();

export default {
    components: {
        NxbForm,
    },
    props: {
        manxb: {
            String: Number,
            default: false,
        },
    },
    data: function () {
        return {
            data: nxb.getNXB(this.manxb),
        };
    },
    methods: {
        async submit(data) {
            const result = await nxb.update(data);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <div>
        <h4 class="m-4 text-center">Chỉnh sửa Nhà Xuất Bản</h4>
        <NxbForm :nxb="data" @handleSubmit="submit" />
    </div>
</template>

<style lang="scss"></style>
