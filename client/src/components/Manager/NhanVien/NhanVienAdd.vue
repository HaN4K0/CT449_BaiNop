<script>
import NxbForm from './NxbForm.vue';

export default {
    components: {
        NxbForm,
    },

    data: () => {
        return {
            test: {},
        };
    },
};
</script>

<template>
    <div>
        <h4 class="m-4 text-center">Thêm Nhà Xuất Bản</h4>
        <NxbForm :nxb="test" @input="value = $event" />
        <div class="d-flex justify-content-center align-items-center">
            <el-button type="primary" plain>Thêm NXB</el-button>
        </div>
    </div>
</template>

<style lang="scss"></style>
