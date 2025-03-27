<script>
import { useBorrowStore } from '@/stores/borrow';
import { ElButton, ElInput, ElMessage } from 'element-plus';
import { mapStores } from 'pinia';
export default {
    setup() {
        const borrow = useBorrowStore();
        if (!borrow.fetchAdmin) {
            borrow.fetchBorrowAdmin();
        }
    },
    components: {
        ElInput,
    },
    computed: {
        ...mapStores(useBorrowStore),
    },
    data: () => {
        return {
            value: '',
        };
    },
    methods: {
        tinhChiPhi(ngaymuon, dongia) {
            const cngaymuon = new Date(ngaymuon);
            const cngaytra = Date.now();
            const MinusDate = (cngaytra - cngaymuon) / (1000 * 60 * 60 * 24);
            return MinusDate.toFixed(0) * dongia;
        },
        async handleSave(data) {
            const result = await this.borrowStore.updateBorrowAdmin(data);
            ElMessage(result);
        },
        async handleDelete(id) {
            const result = await this.borrowStore.deleteBorrowAdmin(id);
            ElMessage(result);
        },
    },
};
</script>

<template>
    <div class="Book">
        <h4 class="text-center m-2">Quản lý mượn sách</h4>
    </div>
    <div class="container table-container">
        <el-table :data="borrowStore.borrowsAdmin" style="width: 100%">
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="row">
                        <div class="col-6">
                            <h6>Thông tin người mượn:</h6>
                            <p m="t-0 b-2">Tên: {{ scope.row?.madocgia.Ten }}</p>
                            <p m="t-0 b-2">Số điện thoại: {{ scope.row?.madocgia.SoDienThoai }}</p>
                            <p m="t-0 b-2">Giới tính: {{ scope.row?.madocgia.GioiTinh }}</p>
                            <p m="t-0 b-2">Địa chỉ: {{ scope.row?.madocgia.DiaChi }}</p>
                        </div>
                        <div class="col-6">
                            <h6>Thông tin mượn:</h6>
                            <p m="t-0 b-2">
                                Ngày mượn: {{ scope.row?.ngaymuon && new Date(scope.row?.ngaymuon).toLocaleString() }}
                            </p>
                            <p m="t-0 b-2">
                                Ngày trả: {{ scope.row?.ngaytra && new Date(scope.row?.ngaytra).toLocaleString() }}
                            </p>
                            <p m="t-0 b-2">Nhân viên: {{ scope.row?.manhanvien?.HoTenNV }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Mã mượn" prop="mamuon"></el-table-column>
            <el-table-column label="Tên Sách">
                <template #default="scope">
                    <router-link :to="`/book/${scope.row.masach.masach}`">
                        {{ scope.row.masach.tensach }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="Tên người mượn">
                <template #default="scope">
                    {{ scope.row.madocgia.Ten }}
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" prop="trangthai">
                <template #default="scope">
                    <el-select
                        class="w-100"
                        v-model="scope.row.trangthai"
                        placeholder="Chọn nhà xuất bản"
                        size="large"
                        style="width: 240px"
                    >
                        <el-option label="Đang chờ" value="pending" />
                        <el-option label="Đang mượn" value="borrow" />
                        <el-option label="Đã trả" value="paid" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="Đơn giá" prop="chiphi">
                <template #default="scope">
                    {{
                        scope.row.chiphi ||
                        (scope.row.ngaymuon ? tinhChiPhi(scope.row.ngaymuon, scope.row.masach.dongia) : '0')
                    }}
                    VND
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button size="small" @click="handleSave({ _id: scope.row._id, trangthai: scope.row.trangthai })"
                        >Lưu</el-button
                    >
                    <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">Xóa</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss"></style>
