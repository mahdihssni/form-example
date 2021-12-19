<template>
    <v-card class="p-5">
        <v-row class="d-flex align-center">
            <v-col lg="6"> <v-card-title> Users List </v-card-title></v-col>
            <v-col lg="6" class="d-flex justify-end">
                <v-btn @click="onCreate" color="primary">Create User</v-btn>
            </v-col>
        </v-row>

        <v-simple-table fixed-header height="550px">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in usersPaginatedList" :key="user.id">
                    <td>{{ startRowNumberInPage + index }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <v-btn color="primary" x-small icon plain class="mr-2" @click="onEdit(user)">
                            <v-icon>$edit</v-icon>
                        </v-btn>
                        <v-btn color="error" x-small icon plain @click="onDelete(user)">
                            <v-icon>fas fa-trash-alt</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-simple-table>

        <v-pagination class="mt-5" @input="onPageChanged" :value="currentPage" :length="totalPages" :total-visible="visiblePageItems" />
    </v-card>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
    data() {
        return { visiblePageItems: 5 };
    },
    computed: {
        startRowNumberInPage() {
            return (this.$store.state.users.currentPage - 1) * this.$store.state.users.usersPerPage + 1;
        },
        ...mapState({
            currentPage: (state) => state.users.currentPage,
        }),
        ...mapGetters(["usersPaginatedList", "totalPages"]),
    },
    methods: {
        onEdit(user) {
            this.$store.commit("dialogTrigger", { dialogName: "edit", isOpen: true, user });
        },
        onCreate() {
            this.$store.commit("dialogTrigger", { dialogName: "create", isOpen: true });
        },
        onDelete(user) {
            this.$emit("delete", true, user);
        },
        onPageChanged(page) {
            this.$store.commit("changeCurrentPage", page);
        },
    },
};
</script>
