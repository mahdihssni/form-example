<template>
    <v-app id="app">
        <v-container>
            <users
                :users="usersLimited"
                :page="page"
                :pages="pages"
                @onPageChanged="onPageChanged"
                @edit="handleEditDialog"
                @create="handleCreateDialog"
                @delete="handleDeleteDialog"
            />
            <edit-user
                :open="isEditOpen"
                :user="editingUser"
                @editDialog="handleEditDialog"
                @update="updateUser"
            />
            <create-user
                :open="isCreateOpen"
                @createDialog="handleCreateDialog"
                @create="createUser"
            />
            <delete-user :open="isDeleteOpen" :user="deletingUser" @deleteDialog="handleDeleteDialog" @delete="deleteUser" />
        </v-container>
    </v-app>
</template>

<script>
import Users from "./components/Users.vue";
import EditUser from "./components/EditUser.vue";
import CreateUser from "./components/CreateUser.vue";
import DeleteUser from "./components/DeleteUser.vue";
import { getData } from "./utils/data";
import "./index.css";

export default {
    name: "App",
    data() {
        return {
            users: getData(50),
            userPerPage: 15,
            page: 1,
            isCreateOpen: false,
            isEditOpen: false,
            editingUser: null,
            isDeleteOpen: false,
            deletingUser: null
        };
    },
    components: {
        Users,
        EditUser,
        CreateUser,
        DeleteUser,
    },
    computed: {
        usersLimited: function () {
            return this.users.slice(
                (this.page - 1) * this.userPerPage,
                this.page * this.userPerPage
            );
        },
        pages: function () {
            return Math.ceil(this.users.length / this.userPerPage);
        },
    },
    methods: {
        handleCreateDialog(value) {
            this.isCreateOpen = value;
        },
        handleEditDialog(value, user = null) {
            this.isEditOpen = value;
            this.editingUser = value ? user : null;
        },
        handleDeleteDialog(value, user = null) {
            this.isDeleteOpen = value;
            this.deletingUser = value ? user : null;
        },
        createUser(newUser) {
            this.users.unshift(newUser);
            this.handleCreateDialog(false);
        },
        updateUser(newUser) {
            this.users = this.users.map((user) => {
                if (user.id === newUser.id) {
                    return newUser;
                } else {
                    return user;
                }
            });

            this.handleEditDialog(false);
        },
        deleteUser(user) {
            const indexOfUser = this.users.findIndex(item => item.id == user.id)
            this.users.splice(indexOfUser, 1)

            this.handleDeleteDialog(false)
        },
        onPageChanged(page) {
            this.page = page;
        },
    },
};
</script>
