<script>
import { ElButton, ElMessage } from 'element-plus';
import BookList from '@/components/Home/BookList.vue';
import Header from '@/components/Header.vue';
import { mapStores } from 'pinia';
import { useBookStore } from '@/stores/book';
import { useUserStore } from '@/stores/user';
import { useBorrowStore } from '@/stores/borrow';

export default {
    name: 'Home',
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        ElButton,
        BookList,
        Header,
    },
    computed: {
        ...mapStores(useBookStore, useUserStore, useBorrowStore),
    },
    data() {
        return {
            quantity: 0,
        };
    },
    methods: {
        handleChange(value) {
            this.quantity = value;
        },
        async handleBorrow() {
            if (!this.userStore.token) {
                ElMessage('Vui lòng đăng nhập để mượn sách!');
                this.$router.push('/login');
                return;
            }
            const data = {
                masach: this.bookStore.getBook(this.id)._id,
            };
            const result = await this.borrowStore.borrowBook(data);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <Header></Header>
    <main class="container">
        <div class="detail-container mt-4">
            <div class="imageBox">
                <img class="image" :src="bookStore.getBook(id).image" alt="" />
            </div>
            <div class="detailInfor">
                <h4 class="title">{{ bookStore.getBook(id).tensach }}</h4>
                <p class="author">Tác giả: {{ bookStore.getBook(id).tacgia }}</p>
                <p class="quantity">
                    Số lượng còn lại:
                    <span>{{ bookStore.getBook(id).soquyen - bookStore.getBook(id).soquyendamuon }}</span>
                </p>
                <p class="pay">{{ bookStore.getBook(id).dongia }} đ</p>
                <div class="borrow-container">
                    <span class="borrow-quantity">Số lượng</span>
                    <el-input-number v-model="quantity" :min="1" :max="1" @change="handleChange" />
                    <!-- <el-input-number v-model="quantity" :min="1" :max="bookStore.getBook(id).soquyen - bookStore.getBook(id).soquyendamuon" @change="handleChange" /> -->
                    <div class="mt-3">
                        <el-button type="warning" plain @click="handleBorrow">Mượn sách</el-button>
                    </div>
                </div>
                <div>
                    <h6 class="title-description">Chi tiết sách:</h6>
                    <p class="detail">Tác giả: {{ bookStore.getBook(id).tacgia }}</p>
                    <p class="detail">Nhà xuất bản: {{ bookStore.getBook(id).manxb.TenNxb }}</p>
                    <p class="detail">Năm xuất bản: {{ new Date(bookStore.getBook(id).namxuatban).getFullYear() }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
main {
    .detail-container {
        padding: 16px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        flex-direction: row;

        .imageBox {
            margin-right: 16px;
            .image {
                max-width: 300px;
            }
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
