<template>
    <v-dialog persistent v-model="deleteDialog" max-width="500px">
        <v-card>
            <v-card-title class="red--text">Delete User</v-card-title>
            <v-card-text>Are you sure about delete {{ user && user.name }}?</v-card-text>

            <v-card-actions>
                <v-btn @click="onSubmit" color="error">Remove</v-btn>
                <v-btn @click="deleteDialog = false" color="secondary">
                    Close
                </v-btn>
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
            required: true
        }
    },
    computed: {
        deleteDialog: {
            get() {
                return this.$props.open;
            },
            set(value) {
                this.$emit("deleteDialog", value);
            },
        },
    },
    methods: {
        onSubmit() {
            this.$emit("delete", this.user)
        }
    }
};
</script>
