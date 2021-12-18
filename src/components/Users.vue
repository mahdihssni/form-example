<template>
    <v-card class="p-5">
        <v-row class="d-flex align-center">
            <v-col lg="6">
                <v-card-title> Users List </v-card-title></v-col>    
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
                <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ startRowNumber + index }}</td>
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

        <v-pagination
            class="mt-5"
            @input="onPageChanged"
            :value="page"
            :length="pages"
        />
    </v-card>
</template>
<script>
export default {
    props: {
        users: {
            type: Array,
            require: true,
        },
        page: {
            type: Number,
            require: true,
        },
        pages: {
            type: Number,
            require: true,
        },
    },
    computed: {
        startRowNumber() {
            return ((this.page - 1) * this.usersPerPage) + 1
        }
    },
    methods: {
        onEdit(user) {
            this.$emit("edit", true, user);
        },
        onCreate() {
            this.$emit("create", true)
        },
        onDelete(user) {
            this.$emit("delete", true, user)
        },
        onPageChanged(page) {
            this.$emit("onPageChanged", page);
        },
    },
};
</script>
