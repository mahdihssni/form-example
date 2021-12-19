<template>
    <v-app id="app">
        <v-container>
            <users />
            <edit-user />
            <create-user />
            <delete-user />
        </v-container>
    </v-app>
</template>

<script>
import Users from "./components/Users.vue";
import EditUser from "./components/EditUser.vue";
import CreateUser from "./components/CreateUser.vue";
import DeleteUser from "./components/DeleteUser.vue";
import "./index.css";

export default {
    name: "App",
    components: {
        Users,
        EditUser,
        CreateUser,
        DeleteUser,
    },
};
</script>
