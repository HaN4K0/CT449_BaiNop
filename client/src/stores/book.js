import { defineStore } from 'pinia';
import { CustomAxios } from '@/Axios/CustomAxios';
import { useUserStore } from './user';

export const useBookStore = defineStore('book', {
    state: () => {
        return {
            books: [],
            fetching: false,
            searchTitle: '',
        };
    },
    actions: {
        async getAll() {
            return await CustomAxios.get('book')
                .then((res) => {
                    this.books = [...this.books, ...res.data.books];
                    this.fetching = true;
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async addBook(data) {
            const token = useUserStore().token;
            return await CustomAxios.post('book', data, { headers: { Authorization: token } })
                .then((res) => {
                    console.log(res.data);
                    this.books.push(res.data.book);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async updateBook(data) {
            const token = useUserStore().token;
            return await CustomAxios.patch('book', data, { headers: { Authorization: token } })
                .then((res) => {
                    console.log(res.data.book);

                    this.books = this.books.map((item) => {
                        if (item._id === data._id) {
                            console.log('Có vô đây');
                            item = res.data.book;
                        }
                        return item;
                    });
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
        async delete(masach) {
            const token = useUserStore().token;
            return await CustomAxios.delete(`book/${masach}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.books = this.books.filter((item) => item.masach != masach);
                    return res.data.message;
                })
                .catch((err) => {
                    console.log(err.response.data.error);
                    return err.response.data.error;
                });
        },
    },
    getters: {
        getBook(state) {
            return (masach) => state.books.find((item) => item.masach == masach);
        },
        getBooks(state) {
            return state.books;
        },
        getBooksFromTitle(state) {
            return (title) => state.books.filter((book) => book.tensach.toLowerCase().includes(title.toLowerCase()));
        },
        getFetching(state) {
            return state.fetching;
        },
    },
});
