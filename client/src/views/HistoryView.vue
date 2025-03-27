<script>
import { ElButton } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';
import Header from '@/components/Header.vue';
import { mapStores } from 'pinia';
import { useBorrowStore } from '@/stores/borrow';

export default {
    name: 'history',
    setup() {
        const borrow = useBorrowStore();
        if (!borrow.fetching) {
            borrow.fetchBorrow();
        }
    },
    components: {
        ElButton,
        BookList,
        Header,
    },
    computed: {
        ...mapStores(useBorrowStore),
    },
    data() {
        return {};
    },
    methods: {
        handleDelete(id) {
            this.borrowStore.deleteBorrowUser(id);
        },
        convertToVN(status) {
            switch (status) {
                case 'pending':
                    return 'Đang chờ';
                case 'borrow':
                    return 'Đang mượn';
                case 'paid':
                    return 'Đã trả';
            }
        },
    },
};
</script>

<template>
    <Header></Header>

    <main class="container">
        <h1 class="text-center m-2">Lịch sử mượn sách</h1>
        <el-table :data="borrowStore.borrows" stripe style="width: 100%">
            <el-table-column prop="mamuon" label="Mã mượn" width="180" />
            <el-table-column prop="masach.tensach" label="Tên sách" width="180">
                <template #default="scope">
                    <router-link :to="`/book/${scope.row.masach.masach}`">
                        {{ scope.row.masach.tensach }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="ngaymuon" label="Ngày mượn">
                <template #default="scope">
                    {{ scope.row?.ngaymuon && new Date(scope.row?.ngaymuon).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="ngaytra" label="Ngày trả">
                <template #default="scope">
                    {{ scope.row?.ngaytra && new Date(scope.row?.ngaytra).toLocaleString() }}
                </template>
            </el-table-column>
            <el-table-column prop="trangthai" label="Trạng thái">
                <template #default="scope">
                    {{ this.convertToVN(scope.row.trangthai) }}
                </template>
            </el-table-column>
            <el-table-column prop="chiphi" label="Chi phí">
                <template #default="scope"> {{ scope.row.chiphi || 0 }} VND </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button
                        v-if="scope.row.trangthai === 'pending'"
                        size="small"
                        @click="handleDelete(scope.row._id)"
                        ><el-icon>
                            <span class="delete-icons"><DeleteFilled /></span></el-icon
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </main>
</template>

<style lang="scss">
main {
    .detail-container {
        padding: 16px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: row;
        .image {
            max-width: 300px;
        }
        .detailInfor {
            .title {
                margin-bottom: 2px;
            }
            .author {
                margin-top: 0;
                margin-bottom: 4px;
                color: #1d9d74;
            }
            .pay {
                font-size: 26px;
                color: #fe642e;
                font-weight: 600;
            }
            .quantity {
                span {
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .borrow-container {
                margin-top: 32px;
                .borrow-quantity {
                    margin-right: 8px;
                }
            }

            .title-description {
                margin-top: 64px;
            }
            .detail {
                margin: 2px;
            }
        }
    }
}
</style>
