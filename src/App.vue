<template>
    <v-app id="app">
        <v-container>
            <users
                :users="usersLimited"
                :page="page"
                :pages="pages"
                @onPageChanged="onPageChanged"
                @edit="handleEdit"
            />
            <edit-user
                :open="isEditOpen"
                :user="editingUser"
                @close="handleEditClose"
                @update="updateUser"
            />
        </v-container>
    </v-app>
</template>

<script>
import Users from "./components/Users.vue";
import EditUser from "./components/EditUser.vue";
import { getData } from "./utils/data";
import "./index.css";

export default {
    name: "App",
    data() {
        return {
            users: getData(50),
            userPerPage: 15,
            page: 1,
            isEditOpen: false,
            editingUser: null,
        };
    },
    components: {
        Users,
        EditUser,
    },
    computed: {
        usersLimited: function () {
            return this.users.slice((this.page - 1) * this.userPerPage, this.page * this.userPerPage);
        },
        pages: function () {
            return Math.ceil(this.users.length / this.userPerPage);
        },
    },
    methods: {
        handleEdit(user) {
            this.isEditOpen = true;
            this.editingUser = user;
        },
        handleEditClose() {
            this.isEditOpen = false;
            this.editingUser = null;
        },
        updateUser(newUser) {
            this.users = this.users.map((user) => {
                if (user.id === newUser.id) {
                    return newUser;
                } else {
                    return user;
                }
            });
        },
        onPageChanged(page) {
          this.page = page
        }
    },
};
</script>
