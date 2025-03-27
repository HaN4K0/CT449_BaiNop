<script>
import { ElMessage } from 'element-plus';
import BookForm from './BookForm.vue';
import { useBookStore } from '@/stores/book';

export default {
    components: {
        BookForm,
    },

    data: () => {
        return {
            data: {},
        };
    },
    methods: {
        async addBook(data) {
            let result = await useBookStore().addBook(data);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <div>
        <h4 class="m-4 text-center">Thêm Sách</h4>
        <BookForm :book="data" @handleSubmit="addBook" />
    </div>
</template>

<style lang="scss"></style>
