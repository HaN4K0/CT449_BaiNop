import { CustomAxios } from '@/Axios/CustomAxios';
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const nxbStore = defineStore('nxbStore', {
    state: () => {
        return {
            NXB: [],
            fetching: false,
        };
    },
    actions: {
        async getAll() {
            const token = useUserStore().token;

            return await CustomAxios.get('nxb', { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB = [...this.NXB, ...res.data.nxb];
                    this.fetching = true;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },

        async add(data) {
            const token = useUserStore().token;
            return await CustomAxios.post('nxb/add', data, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB.push(res.data.nxb);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async update(data) {
            const token = useUserStore().token;
            return await CustomAxios.patch(`nxb/${data.manxb}`, data, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB.forEach((item) => {
                        if (item.manxb === data.manxb) {
                            item = data;
                        }
                    });
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async delete(manxb) {
            const token = useUserStore().token;
            return await CustomAxios.delete(`nxb/${manxb}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.NXB = this.NXB.filter((item) => item.manxb != manxb);
                    console.log(this.NXB.filter((item) => item.manxb != manxb));
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
    },
    getters: {
        getNXB(state) {
            return (manxb) => state.NXB.find((item) => item.manxb == manxb);
        },
    },
});
