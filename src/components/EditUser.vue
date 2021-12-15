<template>
<div v-if="open" class="p-4">
    <div class="w-full mb-4">
        <button @click="onClose">close</button>
    </div>
    <input v-model="state.name">
    <input v-model="state.email">
    <div class="w-full mt-4">
        <button @click="onSubmit">submit</button>
    </div>
</div>
</template>
<script>
export default {
  props: ['open', 'user'],
  data() {
      return {
          state: {
              name: '',
              email: '',
          }
      }
  },
  watch: {
      user() {
          this.state.name = this.user.name
          this.state.email = this.user.email
      }
  },
  methods: {
      onClose() {
          this.state.name = ''
          this.state.email = ''
          this.$emit('close')
      },
      onSubmit() {
          const newUser = {
              id: this.user.id,
              name: this.state.name,
              email: this.state.email,
          };
          this.$emit('update', newUser)
      }
  }
}
</script>