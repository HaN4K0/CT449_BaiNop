import { CustomAxios } from '@/Axios/CustomAxios';
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useBorrowStore = defineStore('borrow', {
    state: () => {
        return {
            borrows: [],
            borrowsAdmin: [],
            fetchAdmin: false,
            fetching: false,
        };
    },
    actions: {
        fetchBorrowAdmin() {
            const token = useUserStore().token;
            return CustomAxios.get('borrow/admin', { headers: { Authorization: token } })
                .then((res) => {
                    this.borrowsAdmin = [...this.borrows, ...res.data.borrows];
                    this.fetching = true;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        fetchBorrow() {
            const token = useUserStore().token;
            return CustomAxios.get('borrow', { headers: { Authorization: token } })
                .then((res) => {
                    this.borrows = [...this.borrows, ...res.data.borrows];
                    this.fetching = true;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        borrowBook(data) {
            const token = useUserStore().token;
            return CustomAxios.post('borrow', data, { headers: { Authorization: token } })
                .then((res) => {
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        deleteBorrowUser(_id) {
            const token = useUserStore().token;
            return CustomAxios.delete(`borrow/user/${_id}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.borrows = this.borrows.filter((borrow) => borrow._id !== _id);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        deleteBorrowAdmin(_id) {
            const token = useUserStore().token;
            return CustomAxios.delete(`borrow/${_id}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.borrowsAdmin = this.borrowsAdmin.filter((borrow) => borrow._id !== _id);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        updateBorrowAdmin(data) {
            const token = useUserStore().token;
            return CustomAxios.patch(`borrow`, data, { headers: { Authorization: token } })
                .then((res) => {
                    this.borrowsAdmin = this.borrowsAdmin.map((item) => {
                        if (item._id === data._id) {
                            item = res.data.borrow;
                        }
                        return item;
                    });
                    return res.data.message;
                })
                .catch((error) => {
                    console.log(error.response.data.error);
                    return error.response.data.error;
                });
        },
    },
});
