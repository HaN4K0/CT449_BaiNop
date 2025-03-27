<script>
import Header from '@/components/Header.vue';
import { ElButton } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';

export default {
    name: 'Home',
    components: {
        ElButton,
        Header,
        BookList,
    },
};
</script>

<template>
    <Header></Header>
    <main class="container">
        <h1 class="text m-2">Danh sách sách</h1>
        <BookList></BookList>
        
    </main>
    
</template>

<style lang="scss">
main {
    .pagination {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>
