<template>
    <div class="body">
        <SignUpForm @handleSubmit="login"></SignUpForm>
    </div>
</template>

<style lang="scss">
main {
}
</style>
<script>
import SignUpForm from '@/components/SignUpForm.vue';

export default {
    name: 'Login User',
    components: {
        SignUpForm,
    },
    methods: {
        login(data) {
            // Login user
            console.log(data);
        },
    },
};
</script>
