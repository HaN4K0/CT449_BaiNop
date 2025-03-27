import { CustomAxios } from '@/Axios/CustomAxios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: '',
            userInfor: {},
        };
    },
    actions: {
        SignUp: async function (data) {
            return await CustomAxios.post('auth/signup', data)
                .then((res) => {
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        },
        SignInStaff: async function (data) {
            return await CustomAxios.post('auth/staffSignin', data)
                .then((res) => {
                    this.token = res.data.data?.token;
                    this.userInfor = res.data.data?.user;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        },
        SignIn: async function (data) {
            return await CustomAxios.post('auth/signin', data)
                .then((res) => {
                    this.token = res.data.data?.token;
                    this.userInfor = res.data.data?.user;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                });
        },
        SignOut: function () {
            this.token = '';
            this.userInfor = {};
        },
    },
});
