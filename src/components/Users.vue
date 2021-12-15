<template>
<div>
    <div v-for="(user, index) in users" :key="user.id" class="mb-4 border-2 flex p-4">
        <p class="mx-2">
            {{ index + 1 }}
        </p >
        <p class="mx-2">
            <span class="text-red-500">name: </span>
            <span>{{user.name}}</span>
        </p>
        <p class="mx-2">
            <span class="text-red-500">email: </span>
            <span>{{user.email}}</span>
        </p>
        <button class="mx-2" @click="onEdit(user)">edit</button>
    </div>
</div>
</template>
<script>
export default {
    props: ['users'],
    methods: {
        onEdit(user) {
            this.$emit('edit', user)
        }
    },
}
</script>