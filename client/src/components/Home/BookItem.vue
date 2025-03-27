<script>
export default {
    name: 'BookItem',
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        handleNavigate() {
            this.$router.push({
                name: 'book',
                params: {
                    id: data.masach,
                },
            });
        },
    },
};
</script>

<template>
    <div class="BookItem m-2">
        <img :src="data.image" alt="" class="image" />
        <div class="d-flex justify-content-between align-items-center p-4">
            <div class="d-flex align-items-start justify-content-center flex-column">
                <h5 class="m-0 title">
                    <router-link :to="`/book/${data.masach}`">
                        {{ data.tensach }}
                    </router-link>
                </h5>
                <span class="author">{{ data.tacgia }}</span>
                <p class="pay">
                    Đơn giá: <span>{{ data.dongia }} đ</span>
                </p>
                <p class="quantity">
                    Số lượng: <span>{{ data?.soquyen - data?.soquyendamuon || 0 }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.BookItem {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    height: 380px;
    max-width: 250px;
    display: flex;
    flex-direction: column;

    .image {
        width: 192px;
        height: 192px;
    }

    .title {
        min-height: 40px;
        font-size: 16px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .author {
        font-size: 15px;
        color: #000000;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .pay {
        font-size: 13px;
        margin-top: 6px;
        span {
            color: #fe1b06;
            font-weight: 600;
            font-size: 18px;
        }
    }

    .quantity {
        font-size: 12px;
        margin: 0px 0 0 0;
        span {
            font-size: 15px;
            font-weight: 400;
        }
    }
}
</style>
