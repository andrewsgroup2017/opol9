<template>
  <v-app id="404">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <!-- <div class="text-md-center">
            <h1>404</h1>
            <h2 class="my-3 headline ">Sorry, page not found</h2>
            <div>
              <v-btn color="primary" @click="goHome">Go Home</v-btn>
            </div>

          </div>
       -->
    <input v-model="message" placeholder="New Todo">
    <button @click="$pouch.post('todos', {message: message});message=''">Save Todo</button>
    <v-list>
                <v-list-tile
                    v-for="todo in todos"
                    :key="todo.id"
                    avatar
                    @click=""
                >

                   <v-list-tile-content>
                     <v-list-tile-title v-text="todo.id"></v-list-tile-title>
                       </v-list-tile-content>

                  </v-list-tile>
                </v-list>
                <input v-model="todo.id" @change="$pouch.put('todos', todo)">
                 <button @click="$pouch.remove('todos', todo)">Remove</button>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
export default {
     pouch: {
      // The simplest usage. queries all documents from the "todos" pouch database and assigns them to the "todos" vue property.
      todos: {/*empty selector*/}
    },
  created () {
      this.$pouch.sync('todos', 'http://ash:asdf@localhost:5984/todos');
  },
  methods: {
    goHome () {
      this.$router.push({ path: '/' });
    }
  }
};
</script>
<style scoped lang="css">
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
