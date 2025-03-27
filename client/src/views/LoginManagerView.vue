<template>
    <div class="body">
        <LoginForm @handleSubmit="submit"></LoginForm>
    </div>
</template>

<style lang="scss">
main {
}
</style>
<script>
import LoginForm from '@/components/LoginForm.vue';
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';

const user = useUserStore();

export default {
    name: 'loginmanager',
    components: {
        LoginForm,
    },
    methods: {
        submit: async function (data) {
            if (data.SoDienThoai && data.password) {
                var result = await user.SignInStaff({ SoDienThoai: data.SoDienThoai, password: data.password });
                if (user.token) {
                    this.$router.push({ name: 'manager-borrow' });
                }
                ElMessage(result);
            }
        },
    },
};
</script>
