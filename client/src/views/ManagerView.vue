<script>
import Header from '@/components/Manager/Header.vue';
import { RouterView } from 'vue-router';
import { nxbStore } from '@/stores/nxb';

const nxb = nxbStore();

if (!nxb.fetching) {
    console.log('Fetching');
    nxb.getAll();
}

export default {
    name: 'Manager',
    components: {
        Header,
    },
    data() {
        return {};
    },
    methods: {
        login(data) {
            // Login user
            console.log(data);
        },
        routeBookCheck() {
            console.log(this.$router.currentRoute._value.name);
        },
        changeActive(value) {
            this.active = value;
        },
        routeBookCheck() {
            return this.$router.currentRoute._value.name;
        },
    },
    computed: {},
};
</script>

<template>
    <Header></Header>
    <div class="manager">
        <div class="d-flex justify-content-evenly text-center">
            <router-link to="/manager/borrow" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-borrow' ? 'active' : ''}`">
                    Quản lý Mượn Sách
                </div>
            </router-link>
            <router-link to="/manager/book" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-book' ? 'active' : ''}`">Quản lý sách</div>
            </router-link>
            <router-link to="/manager/NXB" class="navigation-link flex-grow-1">
                <div :class="`navigation ${routeBookCheck() == 'manager-nxb' ? 'active' : ''}`">
                    Quản lý Nhà Xuất Bản
                </div>
            </router-link>
        </div>
        <div class="">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
.manager {
    .navigation-link + .navigation-link {
        border-left: 1px solid #e5e5e5;
    }

    .navigation {
        text-decoration: none;
        border-bottom: 1px solid #e5e5e5;
        padding: 2px;
        font-size: 18px;
        font-weight: 600;
        &.active {
            background: #22b2da;
            color: #fff;
        }
    }
}
</style>
