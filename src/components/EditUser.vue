<template>
    <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
            <v-card-title color="blue--text">Edit User</v-card-title>

            <v-container>
                <v-row>
                    <v-col md="6">
                        <v-text-field v-model="state.name" outlined dense label="Name" required />
                    </v-col>
                    <v-col md="6">
                        <v-text-field v-model="state.email" outlined dense label="Email" required />
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <v-btn @click="onSubmit" color="primary">Submit</v-btn>
                <v-btn @click="editDialog = false" color="secondary">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            state: {
                name: "",
                email: "",
            },
        };
    },
    computed: {
        ...mapState({
            selectedUser: (state) => state.users.selectedUser,
        }),
        editDialog: {
            get() {
                return this.$store.getters.getDialogStatus("edit");
            },
            set(value) {
                if (!value) {
                    this.state.name = "";
                    this.state.email = "";
                }

                this.$store.commit("dialogTrigger", { dialogName: "edit", isOpen: value });
            },
        },
    },
    watch: {
        selectedUser() {
            let selectedUser = this.$store.state.users.selectedUser;
            if (!selectedUser) return;
            
            this.state.name = selectedUser.name;
            this.state.email = selectedUser.email;
        },
    },
    methods: {
        onSubmit() {
            this.$store.commit("editUser", { id: this.$store.state.users.selectedUser.id, ...this.state });
            this.$store.commit("modifySelectedUser", { clear: true });
            this.$store.commit("dialogTrigger", { dialogName: "edit", isOpen: false });
        },
    },
};
</script>
