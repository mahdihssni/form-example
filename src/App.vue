<template>
  <v-app id="app">
    <div class="w-full p-10 flex">
      <users :users="users" class="w-1/2" @edit="handleEdit"/>
      <edit-user :open="isEditOpen" :user="editingUser" @close="handleEditClose" @update="updateUser"/>
    </div>
  </v-app>
</template>

<script>
import Users from './components/Users.vue'
import EditUser from './components/EditUser.vue'
import { getData } from './utils/data'
import './index.css'

export default {
  name: 'App',
  data() {
    return {
      users: getData(50),
      isEditOpen: false,
      editingUser: null,
    }
  },
  components: {
    Users,
    EditUser,
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
          return newUser
        } else {
          return user
        }
      })
    },
  }
}
</script>
