<script>
import { RouterLink, RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
export default {
    components: {},
};
</script>

<template>
    <div id="app">
        <RouterView />

        <Footer />
    </div>
</template>

<style lang="scss">
#app {
    position: relative;
}
</style>
