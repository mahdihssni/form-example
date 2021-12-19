<template>
    <v-dialog persistent v-model="deleteDialog" max-width="500px">
        <v-card>
            <v-card-title class="red--text">Delete User</v-card-title>
            <v-card-text>Are you sure about delete {{ user && user.name }}?</v-card-text>

            <v-card-actions>
                <v-btn @click="onSubmit" color="error">Remove</v-btn>
                <v-btn @click="deleteDialog = false" color="secondary"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';


export default {
    computed: {
        ...mapState({
            user: state => state.users.selectedUser
        }),
        deleteDialog: {
            get() {
                return this.$store.getters.getDialogStatus('delete');
            },
            set(value) {
                this.$store.commit("dialogTrigger", { dialogName: "delete", isOpen: value });
            },
        },
    },
    methods: {
        onSubmit() {
            this.$store.commit("deleteUser", this.$store.state.users.selectedUser);
            this.$store.commit("modifySelectedUser", { clear: true });
            this.$store.commit("dialogTrigger", { dialogName: "delete", isOpen: false });
        },
    },
};
</script>
