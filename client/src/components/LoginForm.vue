<script>
export default {
    components: {},
    data: () => {
        return {
            SoDienThoai: '',
            password: '',
        };
    },
    methods: {
        routeBookCheck() {
            return this.$router.currentRoute._value.name;
        },
        submit() {
            this.$emit('handleSubmit', {
                SoDienThoai: this.SoDienThoai,
                password: this.password,
            });
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="loginContainer">
            <div class="loginBox">
                <div>
                    <img src="../assets/img/logo.png" class="logo" />
                </div>
                <div class="flex gap-1 m-4">
                    <input
                        type="text"
                        class="form-control mt-4"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Số điện thoại"
                        v-model="SoDienThoai"
                    />
                    <input
                        type="password"
                        class="form-control mt-3"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        placeholder="Mật khẩu"
                        v-model="password"
                    />
                </div>
                <button type="button" class="btn btn-primary" @click="submit">Đăng nhập</button>
                <span v-if="routeBookCheck() != 'loginmanager'" class="mt-4"
                    >Nếu chưa có tài khoản? <router-link to="/signup"><span>Đăng ký</span></router-link></span
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    .loginContainer {
        min-width: 600;
        min-height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .loginBox {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
                rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 32px 16px;
            border-radius: 4px;
            .logo {
                width: 80px;
            }

            .input {
            }
        }
    }
}
</style>
