<template>
    <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
            <v-card-title color="blue--text">Edit User</v-card-title>

            <v-container>
                <v-row>
                    <v-col md="6">
                        <v-text-field
                            v-model="state.name"
                            outlined
                            dense
                            label="Name"
                            required
                        />
                    </v-col>
                    <v-col md="6">
                        <v-text-field
                            v-model="state.email"
                            outlined
                            dense
                            label="Email"
                            required
                        />
                    </v-col>
                </v-row>
            </v-container>

            <v-card-actions>
                <v-btn @click="onSubmit" color="primary">Submit</v-btn>
                <v-btn @click="editDialog = false" color="secondary"
                    >Close</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true,
        },
        user: {
            required: true,
        },
    },
    data() {
        return {
            state: {
                name: "",
                email: "",
            },
        };
    },
    computed: {
        editDialog: {
            get() {
                return this.$props.open;
            },
            set(value) {
                if (!value) {
                    this.state.name = "";
                    this.state.email = "";
                }
                this.$emit("editDialog", value);
            },
        },
    },
    watch: {
        user() {
            if (!this.user) return;
            this.state.name = this.user.name;
            this.state.email = this.user.email;
        },
    },
    methods: {
        onSubmit() {            
            const newUser = {
                id: this.user.id,
                name: this.state.name,
                email: this.state.email,
            };
            
            this.$emit("update", newUser);
        },
    },
};
</script>
