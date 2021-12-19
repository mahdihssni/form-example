<template>
    <v-dialog v-model="createDialog" max-width="500px">
        <v-card>
            <v-card-title class="blue--text">Create User</v-card-title>

            <v-container>
                <v-row>
                    <v-col md="6">
                        <v-text-field v-model="newUser.name" outlined dense label="Name" required />
                    </v-col>
                    <v-col md="6">
                        <v-text-field v-model="newUser.email" outlined dense label="Email" required />
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <v-btn @click="onSubmit" color="primary">Create</v-btn>
                <v-btn @click="createDialog = false" color="secondary">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            newUser: {
                id: "",
                name: "",
                email: "",
            },
        };
    },
    computed: {
        createDialog: {
            get() {
                return this.$store.getters.getDialogStatus("create");
            },
            set(value) {
                if (!value) {
                    this.newUser.name = "";
                    this.newUser.email = "";
                }

                this.$store.commit("dialogTrigger", { dialogName: "create", isOpen: value });
            },
        },
    },
    methods: {
        onSubmit() {
            this.newUser.id = this.uid;
            this.$store.commit('addUser', this.newUser)
            this.$store.commit("dialogTrigger", { dialogName: "create", isOpen: false });
        },
    },
};
</script>
